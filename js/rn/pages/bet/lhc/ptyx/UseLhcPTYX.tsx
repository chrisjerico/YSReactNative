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

/**
 * 六合彩特码
 * @constructor
 */
const UseLhcPTYX = () => {

  const {
    nextIssueData,
    playOddDetailData,
    curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLotteryHelper()

  const [dataPTYX, setDataPTYX] = useState<Array<PlayGroupData>>(null) //当前正码数据列表
  const [zodiacData, setZodiacData] = useState<Array<ZodiacNum>>([]) //选中了生肖数据

  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //当前彩种数据，特码，连码 等等

  /**
   * 找出当前彩种数据
   */
  useEffect(() => {
    setPlayOddData(playOddDetailData()?.playOdds?.find(
      (item) => item?.code == LotteryConst.YX))
  }, [playOddDetailData()])

  // ugLog('playOddData=', playOddData)
  useEffect(() => {
    //取出生肖数据
    if (!anyEmpty(playOddData?.playGroups)) {
      setZodiacData(playOddData?.playGroups[0]?.plays.map((item) =>
        playOddDetailData()?.setting?.zodiacNums?.find((zodiac) =>
          zodiac?.name == item?.name)))
      setDataPTYX(playOddData?.playGroups)
    }
  }, [playOddData])

  return {
    dataPTYX,
    setDataPTYX,
    zodiacData,
    setZodiacData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcPTYX

