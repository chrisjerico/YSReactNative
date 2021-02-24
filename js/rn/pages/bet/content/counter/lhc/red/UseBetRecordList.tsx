import * as React from 'react'
import { useState } from 'react'
import { UGStore } from '../../../../../../redux/store/UGStore'
import { LotteryHistoryData } from '../../../../../../public/network/Model/lottery/LotteryHistoryModel'
import { anyEmpty } from '../../../../../../public/tools/Ext'
import APIRouter from '../../../../../../public/network/APIRouter'
import moment from 'moment'
import { NextIssueData } from '../../../../../../public/network/Model/lottery/NextIssueModel'

/**
 * 彩票开奖记录
 * @constructor
 */
const UseBetRecordList = () => {

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息


  return {
    systemInfo,
    userInfo,
  }
}

export default UseBetRecordList

