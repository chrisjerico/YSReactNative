import * as React from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import { useContext, useState } from 'react'
import { LotteryHistoryData } from '../../../public/network/Model/lottery/LotteryHistoryModel'
import { anyEmpty } from '../../../public/tools/Ext'
import { hideLoading, showLoading } from '../../../public/widget/UGLoadingCP'
import APIRouter from '../../../public/network/APIRouter'
import BetLotteryContext from '../BetLotteryContext'

/**
 * 彩票开奖记录
 * @constructor
 */
const UseBetHistoryList = () => {

  const {
    nextIssueData,
    playOddDetailData,
    // curPlayOddData,
  } = useContext(BetLotteryContext)

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const [showHistory, setShowHistory] = useState(false) //是否显示历史记录
  const [historyData, setHistoryData] = useState<LotteryHistoryData>(null) //历史数据

  /**
   * 打开或者关闭数据
   */
  const toggleHistory = () => {
    if (showHistory) {
      setShowHistory(false)
    } else {
      setShowHistory(true)
      requestHistory(nextIssueData()?.id)
    }
  }

  /**
   * 开奖记录
   */
  const requestHistory = async (id?: string) => {
    if (anyEmpty(id)) return null

    const pms = //nextIssueData?.lowFreq != '1' ?
      {
        id: nextIssueData()?.id,
      }
    // :
    //   {
    //     id: lotteryId,
    //     date: moment().format('YYYY-MM-DD'),
    //   }

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
    toggleHistory,
  }
}

export default UseBetHistoryList

