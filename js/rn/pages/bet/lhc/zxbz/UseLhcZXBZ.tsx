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
 * 六合彩 自选不中
 * @constructor
 */
const UseLhcZXBZ = () => {

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

  const [ballArray, setBallArray] = useState<Array<ILMABallArray>>(null) //当前生成的数据

  useEffect(() => {
    if (!anyEmpty(pageData) && !anyEmpty(pageData[tabIndex][0].plays)) {
      const data = pageData[tabIndex][0]

      const play0 = data?.plays[0]
      let arr = new Array(
        49,
      ).fill(0).map((item, index) => {
        let ballIndex = ('0' + index).slice(-2)
        return (
          {
            id: play0?.id + ballIndex,
            name: ballIndex,
          }
        )
      })

      setBallArray(arr)
      setCurData(pageData[tabIndex])
    }
  }, [tabIndex, pageData])

  useEffect(() => {
    setPageData(playOddData?.playGroups?.map((item) => [item]))
  }, [playOddData])

  return {
    setLotteryCode,
    ballArray,
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

interface ILMABallArray {
  id: string//球的id + 编号组成
  name?: string
  odds?: string
}

export default UseLhcZXBZ
export { ILMABallArray }

