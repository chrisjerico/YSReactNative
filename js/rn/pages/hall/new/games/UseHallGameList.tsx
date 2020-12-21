import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { DepositListData } from '../../../../../network/Model/wd/HallGameModel'
import APIRouter from '../../../../../network/APIRouter'
import { anyEmpty, arrayEmpty } from '../../../../../tools/Ext'
import { ugLog } from '../../../../../tools/UgLog'
import { Toast } from '../../../../../tools/ToastUtils'
import { HallGameListData } from '../../../../public/network/Model/game/HallGameModel'
import { UGStore } from '../../../../redux/store/UGStore'

/**
 * 游戏大厅列表
 * @constructor
 */
const UseHallGameList = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  return {
    systemInfo,
    userInfo,
  }
}

export default UseHallGameList

