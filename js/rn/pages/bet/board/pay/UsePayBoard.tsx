import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { UGStore } from '../../../../redux/store/UGStore'
import { anyEmpty, arrayLength, dicNull } from '../../../../public/tools/Ext'
import { ugLog } from '../../../../public/tools/UgLog'
import { api } from '../../../../public/network/NetworkRequest1/NetworkRequest1'
import { BetLotteryData, IBetLotteryParams } from '../../../../public/network/it/bet/IBetLotteryParams'
import { numberToFloatString } from '../../../../public/tools/StringUtil'
import { hideLoading } from '../../../../public/widget/UGLoadingCP'
import { syncUserInfo } from '../../../../public/tools/user/UserTools'
import { LotteryResultModel } from '../../../../public/network/Model/lottery/result/LotteryResultModel'
import { BetShareModel } from '../../../../redux/model/game/bet/BetShareModel'
import { Toast } from '../../../../public/tools/ToastUtils'
import { AsyncStorageKey } from '../../../../redux/store/IGlobalStateHelper'
import { mapTotalCount } from '../../util/ArithUtil'

/**
 * 下注面板
 *
 * @constructor
 */
const UsePayBoard = () => {
  const orgBetShareModel = UGStore.globalProps.betShareModel //下注数据

  const [betShareModel, setBetShareModel] = useState<BetShareModel>() //下注数据结构
  const [totalMoney, setTotalMoney] = useState(0) //计算总价格
  const [averageMoney, setAverageMoney] = useState(1) //输入平均价格
  // const [itemCount, setItemCount] = useState(0) //选中的条目数据
  const [moneyMap, setMoneyMap] = useState<Map<string, number>>(null) //输入单项价格列表，id -> money

  /**
   * 计算下注的数量
   */
  const betCount = useMemo(() => {
    let count = 0
    if (!dicNull(betShareModel?.totalNums)) { //有的彩种计算数量特别，比如 广东11选5 的 前2组选
      count = Number(betShareModel?.totalNums)
    } else {
      count = arrayLength(betShareModel?.betBean)
    }
    return count
  }, [betShareModel?.betBean])

  useEffect(() => {
    //初始化默认金额
    setAverageMoney(Number(orgBetShareModel?.singleAmount)) //平均价格

    const moneyMap = new Map<string, number>()
    orgBetShareModel?.betBean?.map((bet) => {
      moneyMap[bet?.exFlag] = Number(orgBetShareModel?.singleAmount)
    })
    setMoneyMap(moneyMap)

    setBetShareModel(orgBetShareModel)

  }, [])

  /**
   * 平均价格变化时重新计算金额
   */
  useEffect(() => {
    const moneyMap = new Map<string, number>()
    betShareModel?.betBean?.map((bet) => {
      moneyMap[bet?.exFlag] = averageMoney
    })
    setMoneyMap(moneyMap)
  }, [averageMoney])

  /**
   * 价格列表变化时重新计算总金额
   */
  useEffect(() => {
    if (!dicNull(betShareModel?.totalNums)) { //有的彩种计算数量特别，比如 广东11选5 的 前2组选
      const money = averageMoney * Number(betShareModel?.totalNums)
      setTotalMoney(money)
      ugLog('moneyMap total money = ', money)
    } else {
      //遍历每一个条目金额，累加起来
      const money = dicNull(moneyMap) ? 0 : mapTotalCount(moneyMap)
      ugLog('moneyMap total money = ', money, moneyMap && JSON.stringify(Object.values(moneyMap)))
      setTotalMoney(money)
    }
  }, [moneyMap])

  /**
   *
   * 开始下注
   */
  const startBetting = async (): Promise<LotteryResultModel> => {
    const pms: IBetLotteryParams = {
      activeReturnCoinRatio: betShareModel?.activeReturnCoinRatio,
      betBean: betShareModel?.betBean?.map((item) => {
        return {
          ...item,
          money: numberToFloatString(Number(item?.money)),
          exFlag: null,
        } as BetLotteryData
      }),
      betIssue: betShareModel?.turnNum,
      endTime: betShareModel?.ftime,
      gameId: betShareModel?.gameId,
      totalNum: betCount.toString(),
      totalMoney: numberToFloatString(totalMoney),
      isInstant: betShareModel?.isInstant,
      tag: betShareModel?.tag,
    }

    const { data } = await api.user.userGameBetWithParams(pms).promise
    syncUserInfo(false)
    hideLoading()

    if (data?.code == 0) {//下注成功 数据保留 用于 追号
      const betMap = new Map<string, BetShareModel>()
      betMap[UGStore.globalProps?.lotteryId] = betShareModel
      UGStore.dispatch({ type: 'merge', betChaseMap: betMap })
    } else {//异常数据
      Toast(data?.msg)
    }

    return { ...data, data: { ...data?.data, betParams: pms, betShareModel: betShareModel } }

  }

  return {
    betCount,
    totalMoney,
    setTotalMoney,
    averageMoney,
    setAverageMoney,
    moneyMap,
    setMoneyMap,
    betShareModel,
    setBetShareModel,
    startBetting,
  }
}

export default UsePayBoard
