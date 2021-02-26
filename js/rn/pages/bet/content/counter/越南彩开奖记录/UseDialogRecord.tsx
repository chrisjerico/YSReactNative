import * as React from 'react'
import { useEffect, useState } from 'react'
import { UGStore } from '../../../../../redux/store/UGStore'
import { api } from '../../../../../public/network/NetworkRequest1/NetworkRequest1'
import { LotteryResultData } from '../../../../../public/network/Model/lottery/result/LotteryResultModel'
import { NextIssueData } from '../../../../../public/network/Model/lottery/NextIssueModel'

/**
 * 开奖结果
 *
 * @constructor
 */
const UseDialogRecord = () => {

  const [windowShow, setWindowShow] = useState(true) //显示还是隐藏

  return {
    windowShow,
    setWindowShow,
  }
}

export default UseDialogRecord
