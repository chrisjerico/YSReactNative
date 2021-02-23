import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import PushHelper from '../../../../../public/define/PushHelper'
import AppDefine from '../../../../../public/define/AppDefine'
import { anyEmpty, dicNull } from '../../../../../public/tools/Ext'
import APIRouter from '../../../../../public/network/APIRouter'
import { UGStore } from '../../../../../redux/store/UGStore'
import { ugLog } from '../../../../../public/tools/UgLog'
import { doubleDigit } from '../../../../../public/tools/StringUtil'
import { DeviceEventEmitter } from 'react-native'
import { EmitterTypes } from '../../../../../public/define/EmitterTypes'
import { IEmitterMessage } from '../../../board/it/IEmitterMessage'
import { Toast } from '../../../../../public/tools/ToastUtils'

/**
 * 开奖时间显示
 * @constructor
 */
const UseTime = () => {

  const lotteryId = UGStore.globalProps?.lotteryId//彩票数据
  const nextIssueData = UGStore.globalProps.nextIssueData //下期数据

  // const [nextIssueData, setNextIssueData] = useState<NextIssueData>(null) //下期数据
  const [closeTime, setCloseTime] = useState<number>(-1) //封盘时间倒计时
  const [openTime, setOpenTime] = useState<number>(-1) //开奖时间倒计时

  useEffect(() => {
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
        setOpenTime(n => {
          if (n % 3000 == -2000) {//开奖中每2秒取一次数据直到成功
            requestNextData(lotteryId)
          }
          return n - SECOND_1
        })

      }, SECOND_1)

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
      UGStore.dispatch({ type: 'merge', nextIssueData: res?.data })
      DeviceEventEmitter.emit(EmitterTypes.LOCK_BOARD, { locked: false } as IEmitterMessage)
    }

    return res?.code
  }

  //显示封盘时间
  const displayCloseTime = useMemo(() => {
    if (closeTime >= 0) {
      const closeHour = doubleDigit(Math.floor(closeTime / HOUR_1))
      const closeMinute = doubleDigit(Math.floor((closeTime % HOUR_1) / MINUTE_1))
      const closeSecond = doubleDigit(Math.floor((closeTime % MINUTE_1) / SECOND_1))

      return `${closeHour}:${closeMinute}:${closeSecond}`

    } else {
      !dicNull(UGStore.globalProps?.betShareModel) && UGStore.dispatch({ type: 'reset', betShareModel: {} })
      DeviceEventEmitter.emit(EmitterTypes.LOCK_BOARD, { locked: true, hintText: '封盘中...' } as IEmitterMessage)
      return `封盘中`
    }

  }, [closeTime])

  //显示封盘时间
  const displayOpenTime = useMemo<string>(() => {
    if (openTime >= 0) {
      const openHour = doubleDigit(Math.floor(openTime / HOUR_1))
      const openMinute = doubleDigit(Math.floor((openTime % HOUR_1) / MINUTE_1))
      const openSecond = doubleDigit(Math.floor((openTime % MINUTE_1) / SECOND_1))

      return `${openHour}:${openMinute}:${openSecond}`
    } else {
      DeviceEventEmitter.emit(EmitterTypes.LOCK_BOARD, { locked: true, hintText: '开奖中...' } as IEmitterMessage)
      return `开奖中`
    }

  }, [openTime])

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

