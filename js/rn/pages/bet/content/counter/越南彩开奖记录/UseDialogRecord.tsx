import * as React from 'react'
import { useEffect, useState } from 'react'
import { UGStore } from '../../../../../redux/store/UGStore'
import { api } from '../../../../../public/network/NetworkRequest1/NetworkRequest1'
import { LotteryResultData } from '../../../../../public/network/Model/lottery/result/LotteryResultModel'
import { NextIssueData } from '../../../../../public/network/Model/lottery/NextIssueModel'

/**
 * 开奖结果
 *
 * @constructor
 */
const UseDialogRecord = () => {

  const [nextIssueData, setNextIssueData] = useState<NextIssueData>() //下期数据
  const [counter, setCounter] = useState(0) //倒计时
  const [timer, setTimer] = useState<any>() //时钟
  const [autoBet, setAutoBet] = useState(false) //是否打开自动投注
  const [betResult, setBetResult] = useState<LotteryResultData>(null) //开奖结果
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
    setNextIssueData,
    closeWindow,
    setCloseWindow,
    betResult,
    setBetResult,
    counter,
    autoBet,
    setAutoBet,
  }
}

export default UseDialogRecord
