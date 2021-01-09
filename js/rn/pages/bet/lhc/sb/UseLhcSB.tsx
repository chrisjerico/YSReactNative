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
 * 色波
 * @constructor
 */
const UseLhcSB = () => {

  const {
    nextIssueData,
    playOddDetailData,
    curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLotteryHelper()

  const [dataSB, setDataSB] = useState<Array<PlayGroupData>>(null) //当前特码A数据列表

  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //当前彩种数据，特码，连码 等等

  /**
   * 找出当前彩种数据
   */
  useEffect(() => {
    setPlayOddData(playOddDetailData()?.playOdds?.find(
      (item) => item?.code == LotteryConst.SB))
  }, [playOddDetailData()])

  // ugLog('playOddData=', playOddData)
  useEffect(() => {
    //ugLog('dataTMB 2 =', JSON.stringify(playOddData))
    //特码取前3个数据
    if (!anyEmpty(playOddData?.playGroups)) {
      setDataSB(playOddData?.playGroups)
    }
  }, [playOddData])

  return {
    dataSB,
    setDataSB,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcSB

