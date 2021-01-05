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

/**
 * 六合彩特码
 * @constructor
 */
const UseLhcLM = () => {

  const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)

  const [dataLM, setDataLM] = useState<Array<PlayGroupData>>(null) //当前特码A数据列表
  const [selectedBalls, setSelectedBalls] = useState<Array<string>>([]) //选中了哪些球

  // ugLog('playOddData=', playOddData)
  useEffect(() => {
    ugLog('dataTMB 2 =', JSON.stringify(playOddData()))
    //特码取前3个数据
    if (!anyEmpty(playOddData()?.playGroups)) {
      setDataLM([playOddData()?.playGroups[0]])
    }
  }, [playOddData()])

  /**
   * 添加或移除选中的球
   * @param ball
   */
  const addOrRemoveBall = (ball?: string) => {
    //重组数字
    if (selectedBalls.includes(ball)) {
      let newResult = selectedBalls?.filter((item) => item != ball)
      setSelectedBalls(newResult)
    } else {
      setSelectedBalls([...selectedBalls, ball])
    }
  }

  return {
    dataLM,
    setDataLM,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcLM

