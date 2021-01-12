import * as React from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import { useState } from 'react'

/**
 * 彩票开奖记录
 * @constructor
 */
const UseBetHistoryList = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const [showHistory, setShowHistory] = useState(false) //是否显示历史记录

  return {
    showHistory,
    setShowHistory,
    systemInfo,
    userInfo,
  }
}

export default UseBetHistoryList

