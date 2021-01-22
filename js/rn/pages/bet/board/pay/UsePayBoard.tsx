import { useContext, useEffect, useMemo, useState } from 'react'
import BetLotteryContext from '../../BetLotteryContext'
import { UGStore } from '../../../../redux/store/UGStore'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import { PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../public/tools/UgLog'
import { Toast } from '../../../../public/tools/ToastUtils'
import { calculateItemCount } from '../../util/LotteryUtil'

/**
 * 下注面板
 *
 * @constructor
 */
const UsePayBoard = () => {

  const {
    playOddDetailData,//彩票数据
  } = useContext(BetLotteryContext)

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
    if(selectedData == null) return

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
