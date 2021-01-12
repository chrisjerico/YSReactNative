import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import {
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import APIRouter from '../../../../public/network/APIRouter'
import { ugLog } from '../../../../public/tools/UgLog'
import BetLotteryContext from '../../BetLotteryContext'
import ISelBall, { isSelectedBall, isSelectedBallOnId } from '../../const/ISelBall'
import UseLotteryHelper from '../../util/UseLotteryHelper'
import LotteryConst from '../../const/LotteryConst'

/**
 * 色波, 两面, 正码1-6, 总肖, 五行
 * @constructor
 */
const UseLhcSB = () => {

  const {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    playOddData,
    setPlayOddData,
    lotteryCode,
    setLotteryCode,
    nextIssueData,
    playOddDetailData,
    curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLotteryHelper()

  useEffect(() => {
    !anyEmpty(playOddData?.playGroups) && setPageData([playOddData?.playGroups])
  }, [playOddData])

  useEffect(() => {
    !anyEmpty(pageData) && setCurData(pageData[tabIndex])
  }, [tabIndex, pageData])

  return {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    setLotteryCode,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcSB

