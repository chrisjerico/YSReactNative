import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { RefreshControl, Text, View } from 'react-native'
import { NextIssueData } from '../../../public/network/Model/lottery/NextIssueModel'
import { PlayOddDetailData } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import BetLotteryContext from '../BetLotteryContext'
import CommStyles from '../../base/CommStyles'

/**
 * 开奖时间显示
 * @constructor
 */
const UseTime = () => {

  const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)

  const [displayCloseTime, setDisplayCloseTime] = useState<number>(0) //显示封盘时间
  const [displayOpenTime, setDisplayOpenTime] = useState<number>(0) //显示开奖时间

  useEffect(()=>{
    //非即开彩有倒计时
    if (nextIssueData()?.isInstant != '1') {

      setdis

      const timer = setInterval(() => {
        setDisplayCloseTime(n => n - 1)
        setDisplayOpenTime(n => n - 1)
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [])

  return {
    displayCloseTime,
    displayOpenTime,
  }
}

export default UseTime

