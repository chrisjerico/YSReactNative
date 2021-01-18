import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { NextIssueData } from '../../../public/network/Model/lottery/NextIssueModel'
import {
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../public/tools/Ext'
import APIRouter from '../../../public/network/APIRouter'
import { ugLog } from '../../../public/tools/UgLog'
import BetLotteryContext from '../BetLotteryContext'
import ISelBall, { isSelectedBallOnId } from '../const/ISelBall'
import UseLotteryHelper from '../util/UseLotteryHelper'
import LotteryConst from '../const/LotteryConst'
import LotteryData from '../const/LotteryData'

/**
 * 六合彩 左侧菜单列表
 * @constructor
 */
const UseLeftComponent = () => {

  const {
    nextIssueData, // 下一期数据
    playOddDetailData, //彩票数据
    // curPlayOddData, //当前选中的，特码 连码 等等
  } = useContext(BetLotteryContext)

  const [leftColumnIndex, setLeftColumnIndex] = useState(0) // 左边大类选择了哪个，特码 正码 双面

  return {
    leftColumnIndex,
    setLeftColumnIndex,
    playOddDetailData,
  }
}

export default UseLeftComponent

