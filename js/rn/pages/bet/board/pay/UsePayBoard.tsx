import { useContext, useEffect, useMemo, useState } from 'react'
import BetLotteryContext from '../../BetLotteryContext'
import { UGStore } from '../../../../redux/store/UGStore'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import { PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../public/tools/UgLog'
import { Toast } from '../../../../public/tools/ToastUtils'
import { calculateItemCount } from '../../util/LotteryUtil'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'
import { BetLotteryData, IBetLotteryParams } from '../../../../public/network/it/bet/IBetLotteryParams'
import moment from 'moment'
import LotteryConst from '../../const/LotteryConst'
import { Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { scale } from '../../../../public/tools/Scale'
import { Skin1 } from '../../../../public/theme/UGSkinManagers'
import * as React from 'react'
import { numberToFloatString } from '../../../../public/tools/StringUtil'

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

    //总共有多少条数据
    setItemCount(calculateItemCount(selectedData))

    //只有第1次需要初始化
    if (anyEmpty(moneyMap)) {
      const dataMap = new Map<string, number>()
      const defaultMoney = UGStore.globalProps?.selectedLotteryModel?.inputMoney ?? 1

      const groupValueArr: Array<Array<PlayGroupData>> = Object.values(selectedData)
      ugLog('groupValueArr = ', JSON.stringify(groupValueArr))
      const newGroupData = anyEmpty(groupValueArr) ? null : groupValueArr?.flat(2)
      newGroupData?.map((groupData) => {
        groupData?.plays?.map((playData) => {
          dataMap[playData?.id] = defaultMoney
        })
      })
      setMoneyMap(dataMap)
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
    const money = anyEmpty(moneyMap) ? 0 : Object.values(moneyMap)?.reduce((previousValue, currentValue) => previousValue + currentValue)
    setTotalMoney(money)
  }, [moneyMap])

  /**
   * 开始下注
   */
  const startBetting = () => {
    const betBean: Array<BetLotteryData> = []

    Object.keys(selectedData).map((key) => {
      const groupDataArr: Array<PlayGroupData> = selectedData[key]
      return groupDataArr?.map((groupData) => {
        switch (key) {
          case LotteryConst.TM:  //特码
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
            return null

          case LotteryConst.ZM: //正码
          case LotteryConst.ZT:  //正特
            return null

          case LotteryConst.LMA:  //连码
            return null

          case LotteryConst.LM: //两面
          case LotteryConst.ZM1_6: //正码1T6
          case LotteryConst.SB: //色波
          case LotteryConst.ZOX://总肖
          case LotteryConst.WX:  //五行
            return null

          case LotteryConst.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
          case LotteryConst.TX: //特肖
          case LotteryConst.ZX: //正肖
          case LotteryConst.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
          case LotteryConst.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
            return null

          case LotteryConst.LX: //连肖
            return null

          case LotteryConst.LW: //连尾
            return null

          case LotteryConst.ZXBZ:  //自选不中
            return null
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
      isInstant: nextIssueData?.isInstant
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
