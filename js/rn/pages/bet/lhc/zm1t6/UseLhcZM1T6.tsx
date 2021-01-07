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

/**
 * 六合彩正码1t6
 * @constructor
 */
const UseLhcZM1T6 = () => {

  const {
    nextIssueData,
    playOddDetailData,
    playOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLotteryHelper()

  const [dataZM1T6, setDataZM1T6] = useState<Array<PlayGroupData>>(null) //当前特码A数据列表

  // ugLog('playOddData=', playOddData)
  useEffect(() => {
    //ugLog('dataTMB 2 =', JSON.stringify(playOddData()))
    //特码取前3个数据
    if (!anyEmpty(playOddData()?.playGroups)) {
      setDataZM1T6(playOddData()?.playGroups)
    }
  }, [playOddData()])

  return {
    dataZM1T6,
    setDataZM1T6,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcZM1T6

