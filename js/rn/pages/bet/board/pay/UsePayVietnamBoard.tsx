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
import UsePayBoard from './UsePayBoard'

/**
 * 越南彩下注面板
 *
 * @constructor
 */
const UsePayVietnamBoard = () => {
  const {
    totalMoney,
    setTotalMoney,
    averageMoney,
    setAverageMoney,
    moneyMap,
    setMoneyMap,
    betShareModel,
    setBetShareModel,
  } = UsePayBoard()

  const [betCount, setBetCount] = useState(1) //下注数量

  //下注数量至少1
  useEffect(() => {
    setTotalMoney(averageMoney * betCount)
    betCount < 1 && setBetCount(1)
  }, [betCount, betShareModel?.betCount])



  /**
   *
   * 开始下注
   */
  const startBetting = async (): Promise<LotteryResultModel> => {
    //一注有多少组
    const arrLen = arrayLength(betShareModel?.playNameArray[0]?.vieName)

    let pms: IBetLotteryParams = {
      activeReturnCoinRatio: betShareModel?.activeReturnCoinRatio,
      betBean: betShareModel?.betBean?.map((item) => {
        return {
          ...item,
          money: numberToFloatString(Number(item?.money) / arrLen),
          exFlag: null,
        } as BetLotteryData
      }),
      betIssue: betShareModel?.turnNum,
      endTime: betShareModel?.ftime,
      gameId: betShareModel?.gameId,
      totalNum: arrLen.toString(),
      betMultiple: betCount.toString(),
      totalMoney: numberToFloatString(totalMoney),
      isInstant: betShareModel?.isInstant,
      tag: betShareModel?.tag,
    }

    const { data } = await api.user.userGameBetWithParams(pms).promise
    syncUserInfo(false)
    hideLoading()

    if (data?.code == 0) {//下注成功

    } else {//异常数据
      Toast(data?.msg)
    }

    return { ...data, data: { ...data?.data, betParams: pms, betShareModel: betShareModel } }

  }

  return {
    totalMoney,
    setTotalMoney,
    averageMoney,
    setAverageMoney,
    moneyMap,
    setMoneyMap,
    betShareModel,
    setBetShareModel,
    betCount,
    setBetCount,
    startBetting,
  }
}

export default UsePayVietnamBoard
