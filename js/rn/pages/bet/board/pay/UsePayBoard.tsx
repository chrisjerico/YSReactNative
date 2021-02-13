import * as React from 'react'
import { useEffect, useState } from 'react'
import { UGStore } from '../../../../redux/store/UGStore'
import { arrayLength, dicNull } from '../../../../public/tools/Ext'
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

  useEffect(() => {
    // const copyData = JSON.parse(JSON.stringify(UGStore.globalProps?.selectedData))
    // const betData = generateBetArray(nextIssueData, copyData)

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
    const money = dicNull(moneyMap) ?
      0 :
      Object.values(moneyMap)?.reduce((previousValue, currentValue) => previousValue + currentValue)

    ugLog('moneyMap total money = ', moneyMap && JSON.stringify(Object.values(moneyMap)))

    setTotalMoney(money)
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
        } as BetLotteryData
      }),
      betIssue: betShareModel?.turnNum,
      endTime: betShareModel?.ftime,
      gameId: betShareModel?.gameId,
      totalNum: arrayLength(betShareModel?.betBean)?.toString(),
      totalMoney: numberToFloatString(totalMoney),
      isInstant: betShareModel?.isInstant,
    }

    const { data } = await api.user.userGameBetWithParams(pms).promise
    await syncUserInfo(false)
    hideLoading()


    if (data?.code == 0) {//下注成功 数据保留 用于 追号
      ugLog('当前追号 存下：', AsyncStorageKey.RE_BET_INFO + UGStore.globalProps?.lotteryId)
      UGStore.save(AsyncStorageKey.RE_BET_INFO + UGStore.globalProps?.lotteryId, JSON.stringify(betShareModel))
    } else {//异常数据
      Toast(data?.msg)
    }

    return { ...data, data: { ...data?.data, betParams: pms, betShareModel: betShareModel } }

  }

  return {
    totalMoney,
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
