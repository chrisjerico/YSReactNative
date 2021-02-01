import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { UGStore } from '../../../../../redux/store/UGStore'
import { anyEmpty, arrayLength, dicNull } from '../../../../../public/tools/Ext'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ugLog } from '../../../../../public/tools/UgLog'
import { api } from '../../../../../public/network/NetworkRequest1/NetworkRequest1'
import { BetLotteryData, IBetLotteryParams } from '../../../../../public/network/it/bet/IBetLotteryParams'
import moment from 'moment'
import LotteryConst from '../../../const/LotteryConst'
import { numberToFloatString } from '../../../../../public/tools/StringUtil'
import { calculateItemCount, gatherSelectedItems, initItemMoney } from '../../tl/BetUtil'
import { zodiacPlayX } from '../../tl/hx/BetHXUtil'
import { playDataX } from '../../tl/zxbz/BetZXBZUtil'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
import { Toast } from '../../../../../public/tools/ToastUtils'
import { NormalModel } from '../../../../../public/network/Model/NormalModel'
import { hideLoading, showLoading } from '../../../../../public/widget/UGLoadingCP'
import APIRouter from '../../../../../public/network/APIRouter'
import { syncUserInfo } from '../../../../../public/tools/user/UserTools'
import { LotteryResultData } from '../../../../../public/network/Model/lottery/result/LotteryResultModel'

/**
 * 下注结果
 *
 * @constructor
 */
const UsePayResult = () => {

  const nextIssueData = UGStore.globalProps?.nextIssueData

  const [counter, setCounter] = useState(0) //倒计时
  const [timer, setTimer] = useState<any>() //时钟
  const [autoBet, setAutoBet] = useState(false) //是否打开自动投注
  const [betResult, setBetResult] = useState<LotteryResultData>(null) //是否打开自动投注
  const [closeWindow, setCloseWindow] = useState(false) //是否关闭

  useEffect(() => {
    if (autoBet) {
      const timer = setInterval(() => {
        setCounter(n => {
          if (n % 4 == 2) {
            api.user.userGameBetWithParams(betResult?.betParams)
              ?.useSuccess( ({data, code}) =>
              {
                // ugLog('res?.data?.data = ', JSON.stringify(data))
                code == 0 && setBetResult({ ...data, betParams: betResult?.betParams })
              })
          }
          return n + 1
        })
      }, 1000)

      setTimer(timer)
    } else {
      setCounter(0)
      clearInterval(timer)
    }

    return () => {
      clearInterval(timer)
    }
  }, [autoBet])

  return {
    nextIssueData,
    closeWindow,
    setCloseWindow,
    betResult,
    setBetResult,
    counter,
    autoBet,
    setAutoBet,
  }
}

export default UsePayResult
