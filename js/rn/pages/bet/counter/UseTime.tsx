import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { NextIssueData } from '../../../public/network/Model/lottery/NextIssueModel'
import moment from 'moment'
import PushHelper from '../../../public/define/PushHelper'
import AppDefine from '../../../public/define/AppDefine'
import { anyEmpty } from '../../../public/tools/Ext'
import APIRouter from '../../../public/network/APIRouter'
import { UGStore } from '../../../redux/store/UGStore'
import { ugLog } from '../../../public/tools/UgLog'

/**
 * 开奖时间显示
 * @constructor
 */
const UseTime = () => {

  const lotteryId = UGStore.globalProps?.lotteryId//彩票数据
  const nextIssueData = UGStore.globalProps.nextIssueData //下期数据

  // const [nextIssueData, setNextIssueData] = useState<NextIssueData>(null) //下期数据
  const [displayCloseTime, setDisplayCloseTime] = useState<string>(null) //显示封盘时间
  const [displayOpenTime, setDisplayOpenTime] = useState<string>(null) //显示开奖时间
  const [closeTime, setCloseTime] = useState<number>(-1) //封盘时间倒计时
  const [openTime, setOpenTime] = useState<number>(-1) //开奖时间倒计时

  useEffect(()=>{
    requestNextData(lotteryId)
  }, [])

  useEffect(() => {
    // ugLog('nextIssueData()?.isInstant=', nextIssueData())
    //非即开彩有倒计时
    if (nextIssueData?.isInstant != '1') {

      const serverTime = moment(nextIssueData?.serverTime).toDate().getTime()
      const closeTime = moment(nextIssueData?.curCloseTime).toDate().getTime() - serverTime
      const openTime = moment(nextIssueData?.curOpenTime).toDate().getTime() - serverTime

      setCloseTime(closeTime)
      setOpenTime(openTime)

      const timer = setInterval(() => {
        setCloseTime(n => n - SECOND_1)
        setOpenTime(n => n - SECOND_1)

      }, 1000)

      return () => clearInterval(timer)
    }
  }, [nextIssueData])

  /**
   * 下一期的数据
   */
  const requestNextData = async (id?: string) => {
    if (anyEmpty(id)) return null

    const res = await APIRouter.game_nextIssue(id)
      .then(({ data: res }) => res)
    ugLog('requestNextData data res=', JSON.stringify(res?.data))

    if (res?.code == 0) {
      UGStore.dispatch({type: 'merge', nextIssueData: res?.data})
    }

    return res?.code
  }

  /**
   * 计算开奖时间封盘时间的显示
   */
  useEffect(() => {
    if (closeTime >= 0) {
      const closeHour = ('0' + Math.floor(closeTime / HOUR_1)).slice(-2)
      const closeMinute = ('0' + Math.floor((closeTime % HOUR_1) / MINUTE_1)).slice(-2)
      const closeSecond = ('0' + Math.floor((closeTime % MINUTE_1) / SECOND_1)).slice(-2)

      setDisplayCloseTime(`${closeHour}:${closeMinute}:${closeSecond}`)

    } else {
      setDisplayCloseTime(`封盘中`)
    }

    let timer

    if (openTime >= 0) {
      const openHour = ('0' + Math.floor(openTime / HOUR_1)).slice(-2)
      const openMinute = ('0' + Math.floor((openTime % HOUR_1) / MINUTE_1)).slice(-2)
      const openSecond = ('0' + Math.floor((openTime % MINUTE_1) / SECOND_1)).slice(-2)

      setDisplayOpenTime(`${openHour}:${openMinute}:${openSecond}`)
    } else {
      setDisplayOpenTime(`开奖中`)

      //开奖中每2秒取一次数据直到成功
      timer = setInterval(()=>{
        requestNextData(lotteryId).then((code) => {
          code == 0 && clearInterval(timer)
        })
      }, 2000)
    }

    return () => clearInterval(timer)
  }, [closeTime, openTime])

  /**
   * 跳转开奖网
   */
  const gotoOpenNet = () => {
    PushHelper.openWebView(
      AppDefine.host + '/open_prize/history.mobile.html?id=' + nextIssueData?.id + '&navhidden=1',
    )
  }
  /**
   * 跳转在线TV
   */
  const gotoLive = () => {
    PushHelper.openWebView(
      AppDefine.host + '/open_prize/video.html?id=' + nextIssueData?.id + '&&gameType=' + nextIssueData?.gameType + '&&navhidden=1',
    )
  }

  return {
    displayCloseTime,
    displayOpenTime,
    nextIssueData,
    gotoOpenNet,
    gotoLive,
  }
}

const SECOND_1 = 1000
const MINUTE_1 = 60 * SECOND_1
const HOUR_1 = 60 * MINUTE_1

export default UseTime

