import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { UGStore } from '../../../../redux/store/UGStore'
import { LotteryHistoryData } from '../../../../public/network/Model/lottery/LotteryHistoryModel'
import { anyEmpty } from '../../../../public/tools/Ext'
import APIRouter from '../../../../public/network/APIRouter'
import moment from 'moment'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import BetLotteryContext from '../../BetLotteryContext'

/**
 * 彩票开奖记录
 * @constructor
 */
const UseBetRecordHeader = () => {

  const {
    lotteryId,
  } = useContext(BetLotteryContext)

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  const [nextIssueData, setNextIssueData] = useState<NextIssueData>(null) //下期数据
  const [showHistory, setShowHistory] = useState(false) //是否显示历史记录
  const [historyData, setHistoryData] = useState<LotteryHistoryData>(null) //历史数据

  useEffect(()=>{
    requestNextData(lotteryId())
  }, [])

  /**
   * 打开或者关闭数据
   */
  const toggleHistory = () => {
    if (showHistory) {
      setShowHistory(false)
    } else {
      setShowHistory(true)
      requestHistory()
    }
  }

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
    }

    return res?.code
  }

  /**
   * 开奖记录
   */
  const requestHistory = async () => {
    const lotteryId = nextIssueData?.id
    if (anyEmpty(lotteryId)) return null

    const pms = nextIssueData?.lowFreq == '1' ?
      {
        id: lotteryId,
      } :
      {
        id: lotteryId,
        date: moment().format('YYYY-MM-DD'),
      }

    const res = await APIRouter.game_lotteryHistory(pms)
      .then(({ data: res }) => res)
    // ugLog('requestHistory data res=', JSON.stringify(res?.data))

    if (res?.code == 0) {
      let data = res?.data
      //抹去生肖数据，历史记录不显示生肖
      setHistoryData({
        ...data,
        list: data?.list?.map((item) => ({
          ...item,
          result: null,
        })),
      })

    }


    return res?.code
  }

  return {
    showHistory,
    setShowHistory,
    historyData,
    setHistoryData,
    systemInfo,
    userInfo,
    nextIssueData,
    setNextIssueData,
    toggleHistory,
  }
}

export default UseBetRecordHeader
