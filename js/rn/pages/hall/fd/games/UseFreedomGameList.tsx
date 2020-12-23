import * as React from 'react'
import { UGStore } from '../../../../redux/store/UGStore'

/**
 * 游戏大厅列表
 * @constructor
 */
const UseFreedomGameList = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  return {
    systemInfo,
    userInfo,
  }
}

export default UseFreedomGameList

