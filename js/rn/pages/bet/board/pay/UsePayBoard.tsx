import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import BetLotteryContext from '../../BetLotteryContext'
import { UGStore } from '../../../../redux/store/UGStore'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import { PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../public/tools/UgLog'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'
import { BetLotteryData, IBetLotteryParams } from '../../../../public/network/it/bet/IBetLotteryParams'
import moment from 'moment'
import LotteryConst from '../../const/LotteryConst'
import { numberToFloatString } from '../../../../public/tools/StringUtil'
import { calculateItemCount, calculateItemMoney } from '../tl/BetUtil'
import { zodiacPlayX } from '../tl/hx/BetHXUtil'
import { playDataX } from '../tl/zxbz/BetZXBZUtil'

/**
 * 下注面板
 *
 * @constructor
 */
const UsePayBoard = () => {

  const {
    playOddDetailData,//彩票数据
  } = useContext(BetLotteryContext)

  const nextIssueData = UGStore.globalProps.nextIssueData //下期数据

  const [selectedData, setSelectedData] = useState<Map<string, Array<PlayGroupData>>>(null) //当前选中的数据
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

    ugLog(' calculate selectedData  =', JSON.stringify(selectedData))

    if (nextIssueData?.gameType == 'lhc') {
      //总共有多少条数据
      setItemCount(calculateItemCount(selectedData))

      //只有第1次需要初始化
      if (anyEmpty(moneyMap)) {
        setMoneyMap(calculateItemMoney(selectedData))
      }

    } else {

    }

  }, [selectedData])

  /**
   * 价格变化时重新计算总金额
   */
  useEffect(() => {
    ugLog('total money = ', totalMoney)
    setTotalMoney(itemCount * averageMoney)
  }, [averageMoney, itemCount])

  /**
   * 价格变化时重新计算总金额
   */
  useEffect(() => {
    ugLog('total money = ', moneyMap && JSON.stringify(Object.values(moneyMap)))
    const money = anyEmpty(moneyMap) ?
      0 :
      Object.values(moneyMap)?.reduce((previousValue, currentValue) =>
        previousValue + currentValue)
    setTotalMoney(money)
  }, [moneyMap])

  /**
   *
   * 开始下注
   */
  const startBetting = () => {
    const betBean: Array<BetLotteryData> = []

    Object.keys(selectedData).map((key) => {
      const groupDataArr: Array<PlayGroupData> = selectedData[key]
      return groupDataArr?.map((groupData) => {
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
            groupData?.plays?.map((playData) => {
              betBean.push({
                money: numberToFloatString(moneyMap[playData?.id]),
                odds: playData?.odds,
                playId: playData?.id,
                playIds: nextIssueData?.id,
              } as BetLotteryData)
            })
            break

          case LotteryConst.HX://合肖
          {
            const playX = zodiacPlayX(groupData)

            betBean.push({
              money: numberToFloatString(moneyMap[playX?.id]),
              odds: playX?.odds,
              playId: playX?.id,
              betInfo: groupData?.exZodiacs?.map((item) => item?.name).toString(),
            } as BetLotteryData)
          }
            break

          case LotteryConst.LMA:  //连码
          {
            const play0 = groupData?.plays[0]
            betBean.push({
              money: numberToFloatString(moneyMap[play0?.id]),
              playId: play0?.id,
              playIds: nextIssueData?.id,
              betInfo: groupData?.exPlays?.map((item) => item?.name).toString(),
            } as BetLotteryData)
          }
            break

          case LotteryConst.ZXBZ:  //自选不中
          {
            const playX = playDataX(groupData)

            betBean.push({
              money: numberToFloatString(moneyMap[playX?.id]),
              odds: playX?.odds,
              playId: playX?.id,
              betInfo: groupData?.exPlays?.map((item) => item?.name).toString(),
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
    api.user.userGameBetWithParams(pms)
  }

  return {
    totalMoney,
    averageMoney,
    setAverageMoney,
    moneyMap,
    setMoneyMap,
    itemCount,
    playOddDetailData,
    selectedData,
    setSelectedData,
    calculateItemCount,
    startBetting,
  }
}

export default UsePayBoard
