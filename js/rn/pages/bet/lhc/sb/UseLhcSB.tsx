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

  const [dataSB, setDataSB] = useState<Array<PlayGroupData>>(null) //当前特码A数据列表

  useEffect(() => {
    //ugLog('dataTMB 2 =', JSON.stringify(playOddData))
    if (!anyEmpty(playOddData?.playGroups)) {
      setDataSB(playOddData?.playGroups)
    }
  }, [playOddData])

  return {
    setLotteryCode,
    dataSB,
    setDataSB,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcSB

