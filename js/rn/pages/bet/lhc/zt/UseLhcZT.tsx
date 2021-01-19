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


/**
 * 六合彩 正特 正码 等等
 * @constructor
 */
const UseLhcZT = () => {

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
    zodiacBallIds,
  } = UseLotteryHelper()

  const [selectedZodiac, setSelectedZodiac] = useState<Array<ZodiacNum>>([]) //选中了哪些生肖

  useEffect(() => {
    !anyEmpty(pageData) && setCurData(pageData[tabIndex])
  }, [tabIndex, pageData])

  useEffect(() => {
    if (arrayLength(playOddData?.playGroups) % 2 == 0) {//长度是偶数
      let newData = new Array<Array<PlayGroupData>>()
      playOddData?.playGroups?.map((item, index) => {
        if (index % 2 == 0) {
          newData.push([
            playOddData?.playGroups[index],
            playOddData?.playGroups[index + 1],
          ])
        }
      })
      //ugLog('newData=', JSON.stringify(newData))
      setPageData(newData)

    }
  }, [playOddData])

  return {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    setLotteryCode,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcZT

