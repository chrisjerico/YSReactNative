import * as React from 'react'
import { useEffect, useState } from 'react'
import APIRouter from '../../public/network/APIRouter'
import { anyEmpty } from '../../public/tools/Ext'
import { NextIssueData } from '../../public/network/Model/lottery/NextIssueModel'
import { PlayOddDetailData } from '../../public/network/Model/lottery/PlayOddDetailModel'
import { UGStore } from '../../redux/store/UGStore'
import moment from 'moment'
import { LotteryHistoryData } from '../../public/network/Model/lottery/LotteryHistoryModel'
import { ugLog } from '../../public/tools/UgLog'
import { hideLoading, showLoading } from '../../public/widget/UGLoadingCP'

/**
 * 彩票下注
 * @constructor
 */
const UseBetLottery = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const [lotteryId, setLotteryId] = useState(null)
  const [historyData, setHistoryData] = useState<LotteryHistoryData>(null) //当前期数据
  const [nextIssueData, setNextIssueData] = useState<NextIssueData>(null) //当前期数据
  const [playOddDetailData, setPlayOddDetailData] = useState<PlayOddDetailData>(null) //彩票数据

  useEffect(() => {
    requestNextData(lotteryId)
    requestLotteryData(lotteryId)
  }, [lotteryId])

  /**
   * 下一期的数据
   */
  const requestNextData = async (id?: string) => {
    if (anyEmpty(id)) return null

    const res = await APIRouter.game_nextIssue(id)
      .then(({ data: res }) => res)
    //ugLog('requestNextData data res=', JSON.stringify(res?.data))

    if (res?.code == 0) {
      setNextIssueData(res?.data)
      requestHistory(lotteryId)
    }

    return res?.code
  }

  /**
   * 开奖记录
   */
  const requestHistory = async (id?: string) => {
    if (anyEmpty(id)) return null

    const pms = //nextIssueData?.lowFreq != '1' ?
      {
        id: lotteryId,
      }
    // :
    //   {
    //     id: lotteryId,
    //     date: moment().format('YYYY-MM-DD'),
    //   }

    showLoading()

    const res = await APIRouter.game_lotteryHistory(pms)
      .then(({ data: res }) => res)
    // ugLog('requestHistory data res=', JSON.stringify(res?.data))

    hideLoading()

    if (res?.code == 0) {
      let data = res?.data
      //抹去生肖数据，历史记录不显示生肖
      setHistoryData({
        ...data,
        list: data?.list?.map((item) => ({
          ...item,
          result: null,
        }))
      })
    }


    return res?.code
  }

  /**
   * 彩票详情
   */
  const requestLotteryData = async (id?: string) => {
    if (anyEmpty(id)) return null

    const res = await APIRouter.game_playOdds(id)
      .then(({ data: res }) => res)
    //ugLog('requestLotteryData data res=', JSON.stringify(res?.data))

    if (res?.code == 0) {
      setPlayOddDetailData(res?.data)
    }

    return res?.code
  }

  return {
    userInfo,
    systemInfo,
    setLotteryId,
    nextIssueData,
    playOddDetailData,
    historyData,
    setHistoryData,
    requestNextData,
    requestLotteryData,
  }
}

export default UseBetLottery

