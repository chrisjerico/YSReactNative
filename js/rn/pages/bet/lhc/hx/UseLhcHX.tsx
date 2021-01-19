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
import ISelBall, { isSelectedBallOnId } from '../../const/ISelBall'
import UseLotteryHelper from '../../util/UseLotteryHelper'
import LotteryConst from '../../const/LotteryConst'
import LotteryData from '../../const/LotteryData'

/**
 * 六合彩 平特一肖, 平特尾数, 头尾数, 特肖 等等
 * @constructor
 */
const UseLhcHX = () => {

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
    // curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLotteryHelper()

  const [zodiacData, setZodiacData] = useState<Array<ZodiacNum>>([]) //选中了生肖数据

  useEffect(() => {
    !anyEmpty(pageData) && setCurData(pageData[tabIndex])
  }, [tabIndex, pageData])

  useEffect(() => {
    //平特一肖 和 平特尾数 只有1个数组，头尾数有2个
    if (!anyEmpty(playOddData?.playGroups)) {
      setPageData([playOddData?.playGroups])
    }
  }, [playOddData])

  useEffect(() => {
    //取出生肖数据，生成对应的数据
    !anyEmpty(curData) && setZodiacData(playOddDetailData()?.setting?.zodiacNums?.map((item) => ({
      ...item,
      id: curData[0]?.id + item?.name
    })))
  }, [curData])

  return {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    setLotteryCode,
    zodiacData,
    setZodiacData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcHX

