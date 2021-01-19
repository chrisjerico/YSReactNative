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
import { UGStore } from '../../../redux/store/UGStore'

/**
 * 六合彩 彩球 列表内容
 * @constructor
 */
const UseLotteryListComponent = () => {

  const {
    nextIssueData, // 下一期数据
    playOddDetailData, //彩票数据
    // curPlayOddData, //当前选中的，特码 连码 等等
  } = useContext(BetLotteryContext)

  // const lotteryColumnIndex = UGStore.globalProps.lotteryColumnIndex //彩票选中哪一个种类
  const lotteryModel = UGStore.globalProps.lotteryModel //彩票信息

  return {
    // lotteryColumnIndex,
    lotteryModel,
    playOddDetailData,
  }
}

export default UseLotteryListComponent

