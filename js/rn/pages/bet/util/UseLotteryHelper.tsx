import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
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
import ISelBall, { isSelectedBall, isSelectedBallOnId } from '../const/ISelBall'
import { LHC_Tab } from '../const/LotteryConst'

/**
 * 彩票公共处理类
 * @constructor
 */
const UseLotteryHelper = () => {

  const {
    nextIssueData, // 下一期数据
    playOddDetailData, //彩票数据
    playOddData, //当前选中的，特码 连码 等等
  } = useContext(BetLotteryContext)

  const [selectedBalls, setSelectedBalls] = useState<Array<string>>([]) //选中了哪些球

  /**
   * 添加或移除选中的球
   * @param ballId 球的ID
   */
  const addOrRemoveBall = (ballId?: string) => {
    //重组数字
    if (isSelectedBallOnId(selectedBalls, ballId)) {
      let newResult = selectedBalls?.filter((item) => item != ballId)
      setSelectedBalls(newResult)
    } else {
      setSelectedBalls([...selectedBalls, ballId])
    }
  }

  /**
   * 根据生肖数字取出对应的球ID
   * @param zodiac
   */
  const zodiacBallIds = (zodiac?: ZodiacNum,
                         groupData?: PlayGroupData): string[] => {
    //重组数字
    const checkMap = zodiac.nums.map((item) => ('0' + item).slice(-2))

    const zodiacIds = groupData?.plays?.filter((item) => checkMap?.includes(item?.name))
      .map((item) => item?.id)

    ugLog('checkMap=', JSON.stringify(checkMap))
    ugLog('data=', JSON.stringify(groupData))

    return zodiacIds
  }

  return {
    nextIssueData,
    playOddDetailData,
    playOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
  }
}

export default UseLotteryHelper

