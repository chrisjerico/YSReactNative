import * as React from 'react'
import { useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import {
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
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
  const [dataTMA, setDataTMA] = useState<Array<PlayGroupData>>(null) //当前特码A数据列表
  const [dataTMB, setDataTMB] = useState<Array<PlayGroupData>>(null) //当前特码B数据列表
  const [zodiacData, setZodiacData] = useState<Array<ZodiacNum>>([]) //生肖数据列表
  const [selectedZodiac, setSelectedZodiac] = useState<Array<ZodiacNum>>([]) //选中了哪些生肖

  const [selectedBalls, setSelectedBalls] = useState<Array<string>>([]) //选中了哪些球

  // ugLog('playOddData=', playOddData)
  useEffect(()=>{
    //特码取前3个数据
    if (!anyEmpty(playOddData?.playGroups)) {
      setDataTMA([playOddData?.playGroups[0], playOddData?.playGroups[1], playOddData?.playGroups[2]])
      setDataTMB([playOddData?.playGroups[3], playOddData?.playGroups[4], playOddData?.playGroups[5]])
      setZodiacData(playOddDetailData?.setting?.zodiacNums)

    }
  }, [playOddData])

  /**
   * 生肖有变化
   */
  useEffect(()=>{
    // setSelectedBalls(null)
    // selectedZodiac?.map((zodiac) => {
    //   let itemArr = zodiac?.nums.map((item) => ('0' + item).slice(-2))
    //   setSelectedBalls([...selectedBalls, ...itemArr])
    // })
  }, [selectedZodiac])

  return {
    nextIssueData,
    setNextIssueData,
    playOddDetailData,
    setPlayOddDetailData,
    playOddData,
    setPlayOddData,
    dataTMA,
    setDataTMA,
    dataTMB,
    setDataTMB,
    zodiacData,
    setZodiacData,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls
  }
}

export default UseLhcTM

