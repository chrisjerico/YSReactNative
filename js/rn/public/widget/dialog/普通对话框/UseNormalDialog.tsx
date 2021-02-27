import * as React from 'react'
import { useEffect, useState } from 'react'
import { UGStore } from '../../../../redux/store/UGStore'
import { api } from '../../../network/NetworkRequest1/NetworkRequest1'
import { LotteryResultData } from '../../../network/Model/lottery/result/LotteryResultModel'
import { NextIssueData } from '../../../network/Model/lottery/NextIssueModel'

/**
 * 对话框
 *
 * @constructor
 */
const UseNormalDialog = () => {

  const [windowShow, setWindowShow] = useState(true) //显示还是隐藏

  return {
    windowShow,
    setWindowShow,
  }
}

export default UseNormalDialog
