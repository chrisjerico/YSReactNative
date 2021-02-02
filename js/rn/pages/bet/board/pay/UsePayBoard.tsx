import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { UGStore } from '../../../../redux/store/UGStore'
import { anyEmpty, arrayLength, dicNull } from '../../../../public/tools/Ext'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../public/tools/UgLog'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'
import { BetLotteryData, IBetLotteryParams } from '../../../../public/network/it/bet/IBetLotteryParams'
import moment from 'moment'
import { CqsscCode, LhcCode } from '../../const/LotteryConst'
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
          case LhcCode.TM:  //特码
          case LhcCode.LM: //两面
          case LhcCode.ZM: //正码
          case LhcCode.ZT:  //正特
          case LhcCode.ZM1_6: //正码1T6
          case LhcCode.SB: //色波
          case LhcCode.ZOX://总肖
          case LhcCode.WX:  //五行 或 五星
          case LhcCode.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
          case LhcCode.TX: //特肖
          case LhcCode.ZX: //正肖
          case LhcCode.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
          case LhcCode.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
          case LhcCode.LX: //连肖
          case LhcCode.LW: //连尾
          case CqsscCode.ALL:  //1-5球
          case CqsscCode.Q1:  //第1球
          case CqsscCode.Q2:  //第2球
          case CqsscCode.Q3:  //第3球
          case CqsscCode.Q4:  //第4球
          case CqsscCode.Q5:  //第5球
          case CqsscCode.QZH:  //前中后
          case CqsscCode.DN:  //斗牛
          case CqsscCode.SH:  //梭哈
          case CqsscCode.LHD:  //龙虎斗
            selModel?.plays?.map((playData) => {
              betBean.push({
                money: numberToFloatString(moneyMap[playData?.exId ?? playData?.id]),
                odds: playData?.odds,
                playId: playData?.id,
                playIds: nextIssueData?.id,
              } as BetLotteryData)
            })
            break

          case LhcCode.HX://合肖
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

          case LhcCode.LMA:  //连码
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

          case LhcCode.ZXBZ:  //自选不中
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
