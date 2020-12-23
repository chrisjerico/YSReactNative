import * as React from 'react'
import { UGStore } from '../../../redux/store/UGStore'

/**
 * 自由游戏大厅
 * @constructor
 */
const UseFreedomHall = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  return {
    systemInfo,
    userInfo,
  }
}

export default UseFreedomHall

