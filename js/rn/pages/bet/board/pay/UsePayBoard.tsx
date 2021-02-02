import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { UGStore } from '../../../../redux/store/UGStore'
import { anyEmpty, arrayLength, dicNull } from '../../../../public/tools/Ext'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../public/tools/UgLog'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'
import { BetLotteryData, IBetLotteryParams } from '../../../../public/network/it/bet/IBetLotteryParams'
import moment from 'moment'
import {LotteryConst} from '../../const/LotteryConst'
import { numberToFloatString } from '../../../../public/tools/StringUtil'
import { calculateItemCount, gatherSelectedItems, initItemMoney } from '../tl/BetUtil'
import { zodiacPlayX } from '../tl/hx/BetHXUtil'
import { playDataX } from '../tl/zxbz/BetZXBZUtil'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { Toast } from '../../../../public/tools/ToastUtils'
import { NormalModel } from '../../../../public/network/Model/NormalModel'
import { hideLoading, showLoading } from '../../../../public/widget/UGLoadingCP'
import APIRouter from '../../../../public/network/APIRouter'
import { syncUserInfo } from '../../../../public/tools/user/UserTools'
import { LotteryResultModel } from '../../../../public/network/Model/lottery/result/LotteryResultModel'

/**
 * 下注面板
 *
 * @constructor
 */
const UsePayBoard = () => {

  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据
  const nextIssueData = UGStore.globalProps.nextIssueData //下期数据

  const [selectedData, setSelectedData] = useState<Map<string, Map<string, Map<string, SelectedPlayModel>>>>(null) //当前选中的数据 结构和SelectedLotteryModel一样
  const [totalMoney, setTotalMoney] = useState(0) //计算总价格
  const [averageMoney, setAverageMoney] = useState(1) //输入平均价格
  const [itemCount, setItemCount] = useState(0) //选中的条目数据
  const [moneyMap, setMoneyMap] = useState<Map<string, number>>(null) //输入单项价格列表，id -> money

  useEffect(() => {
    setSelectedData(JSON.parse(JSON.stringify(UGStore.globalProps?.selectedLotteryModel?.selectedData)))
  }, [])

  useEffect(() => {
    const defaultMoney = UGStore.globalProps?.selectedLotteryModel?.inputMoney ?? 1
    setAverageMoney(defaultMoney)
  }, [UGStore.globalProps?.selectedLotteryModel?.inputMoney])

  /**
   * 选中的数据变化时重新计算条目
   */
  useEffect(() => {
    if (selectedData == null) return
    // ugLog(' calculate selectedData  =', JSON.stringify(selectedData))

    //总共有多少条数据
    setItemCount(calculateItemCount(selectedData))

    //第1次需要初始化
    if (anyEmpty(moneyMap)) {
      setMoneyMap(initItemMoney(selectedData))
    }

  }, [selectedData])

  /**
   * 平均价格和条目变化时重新计算总金额
   */
  useEffect(() => {
    ugLog('averageMoney total money = ', totalMoney)
    setTotalMoney(itemCount * averageMoney)
  }, [averageMoney, itemCount])

  /**
   * 价格变化时重新计算总金额
   */
  useEffect(() => {
    ugLog('moneyMap total money = ', moneyMap && JSON.stringify(Object.values(moneyMap)))
    const money = dicNull(moneyMap) ?
      0 :
      Object.values(moneyMap)?.reduce((previousValue, currentValue) =>
        previousValue + currentValue)
    setTotalMoney(money)
  }, [moneyMap])

  /**
   *
   * 开始下注
   */
  const startBetting = async (): Promise<LotteryResultModel> => {
    const betBean: Array<BetLotteryData> = []

    //Map<string, Map<string, Map<string, SelectedPlayModel>>>
    Object.keys(selectedData).map((key) => {
      const selItems = gatherSelectedItems(key, selectedData)
      return selItems?.map((selModel) => {
        switch (key) {
          case LotteryConst.TM:  //特码
          case LotteryConst.LM: //两面
          case LotteryConst.ZM: //正码
          case LotteryConst.ZT:  //正特
          case LotteryConst.ZM1_6: //正码1T6
          case LotteryConst.SB: //色波
          case LotteryConst.ZOX://总肖
          case LotteryConst.WX:  //五行
          case LotteryConst.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
          case LotteryConst.TX: //特肖
          case LotteryConst.ZX: //正肖
          case LotteryConst.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
          case LotteryConst.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
          case LotteryConst.LX: //连肖
          case LotteryConst.LW: //连尾
            selModel?.plays?.map((playData) => {
              betBean.push({
                money: numberToFloatString(moneyMap[playData?.exId ?? playData?.id]),
                odds: playData?.odds,
                playId: playData?.id,
                playIds: nextIssueData?.id,
              } as BetLotteryData)
            })
            break

          case LotteryConst.HX://合肖
          {
            const playX = zodiacPlayX(selModel)

            betBean.push({
              money: numberToFloatString(moneyMap[playX?.exId ?? playX?.id]),
              odds: playX?.odds,
              playId: playX?.id,
              betInfo: selModel?.zodiacs?.map((item) => item?.name).toString(),
            } as BetLotteryData)
          }
            break

          case LotteryConst.LMA:  //连码
          {
            const play0 = selModel?.plays[0]
            betBean.push({
              money: numberToFloatString(moneyMap[play0?.exId ?? play0?.id]),
              playId: play0?.id,
              playIds: nextIssueData?.id,
              betInfo: selModel?.plays?.map((item) => item?.name).toString(),
            } as BetLotteryData)
          }
            break

          case LotteryConst.ZXBZ:  //自选不中
          {
            const playX = playDataX(selModel)

            betBean.push({
              money: numberToFloatString(moneyMap[playX?.exId ?? playX?.id]),
              odds: playX?.odds,
              playId: playX?.id,
              betInfo: selModel?.plays?.map((item) => item?.name).toString(),
            } as BetLotteryData)
          }
          break
        }

      })

    })

    const pms: IBetLotteryParams = {
      activeReturnCoinRatio: '0',
      betBean: betBean,
      betIssue: nextIssueData?.curIssue,
      endTime: (moment(nextIssueData?.curCloseTime).toDate().getTime() / 1000).toString(),
      gameId: nextIssueData?.id,
      totalNum: itemCount?.toString(),
      totalMoney: numberToFloatString(totalMoney),
      isInstant: nextIssueData?.isInstant,
    }
    // api.user.userGameBetWithParams(pms).useSuccess(((res, sm) =>
    // ))
    showLoading()
    const { data } = await api.user.userGameBetWithParams(pms).promise
    hideLoading()

    const newData = {...data, data: {...data?.data, betParams: pms}}

    syncUserInfo()

    return newData

    // const { data } = await api.user.myFeedback(0, date, true, 1, 20).promise
  }

  return {
    totalMoney,
    averageMoney,
    setAverageMoney,
    moneyMap,
    setMoneyMap,
    itemCount,
    nextIssueData,
    playOddDetailData,
    selectedData,
    setSelectedData,
    startBetting,
  }
}

export default UsePayBoard
