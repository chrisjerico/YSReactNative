import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import { PlayGroupData, PlayOddData, PlayOddDetailData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'
import APIRouter from '../../../../public/network/APIRouter'
import { ugLog } from '../../../../public/tools/UgLog'

/**
 * 六合彩特码
 * @constructor
 */
const UseLhcTM = () => {

  const [nextIssueData, setNextIssueData] = useState<NextIssueData>(null) //当前期数据
  const [playOddDetailData, setPlayOddDetailData] = useState<PlayOddDetailData>(null) //彩票数据
  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //彩票彩种数据
  const [playGroupData, setPlayGroupData] = useState<Array<PlayGroupData>>(null) //当前数据列表

  ugLog('playOddData=', playOddData)
  useEffect(()=>{
    //特码取前3个数据
    setPlayGroupData([playOddData?.playGroups[0], playOddData?.playGroups[1], playOddData?.playGroups[2]])
  }, [playOddData])

  return {
    nextIssueData,
    setNextIssueData,
    playOddDetailData,
    setPlayOddDetailData,
    playOddData,
    setPlayOddData,
    playGroupData,
    setPlayGroupData,
  }
}

export default UseLhcTM

