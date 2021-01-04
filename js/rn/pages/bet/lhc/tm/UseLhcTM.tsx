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
const UseLhcTM = () => {

  const { nextIssueData, playOddDetailData, playOddData} = useContext(BetLotteryContext)

  const [dataTMA, setDataTMA] = useState<Array<PlayGroupData>>(null) //当前特码A数据列表
  const [dataTMB, setDataTMB] = useState<Array<PlayGroupData>>(null) //当前特码B数据列表
  const [zodiacData, setZodiacData] = useState<Array<ZodiacNum>>([]) //生肖数据列表
  const [selectedZodiac, setSelectedZodiac] = useState<Array<ZodiacNum>>([]) //选中了哪些生肖

  const [selectedBalls, setSelectedBalls] = useState<Array<string>>([]) //选中了哪些球

  // ugLog('playOddData=', playOddData)
  useEffect(() => {
    //特码取前3个数据
    if (!anyEmpty(playOddData()?.playGroups)) {
      setDataTMA([playOddData()?.playGroups[0], playOddData()?.playGroups[1], playOddData()?.playGroups[2]])
      setDataTMB([playOddData()?.playGroups[3], playOddData()?.playGroups[4], playOddData()?.playGroups[5]])
      setZodiacData(playOddDetailData()?.setting?.zodiacNums)

    }
  }, [playOddData()])

  // /**
  //  * 生肖有变化，重新计算球球
  //  */
  // useEffect(()=>{
  //   setSelectedBalls(null)
  //   let newBalls = []
  //   selectedZodiac?.map((zodiac) => {
  //     let itemArr = zodiac?.nums.map((item) => ('0' + item).slice(-2))
  //     newBalls = [...newBalls, ...itemArr]
  //   })
  //   setSelectedBalls([...selectedBalls, ...newBalls])
  // }, [selectedZodiac])

  /**
   * 有选中的数据变化时，计算生肖的选中情况
   */
  useEffect(() => {
    let selArr = []
    zodiacData?.map((zodiac) => {
      //重组数字
      const checkMap = zodiac.nums.map((item) => ('0' + item).slice(-2))
      //ugLog('checkMap=', checkMap)
      const intersection = selectedBalls?.filter((item) => checkMap.includes(item))
      if (arrayLength(intersection) == arrayLength(checkMap)) {
        selArr = [...selArr, zodiac]
      }
    })

    setSelectedZodiac(selArr)
  }, [selectedBalls])

  /**
   * 添加或移除生肖
   * @param item
   */
  const addOrRemoveZodiac = (item: ZodiacNum) => {
    //重组数字
    const checkMap = item.nums.map((item) => ('0' + item).slice(-2))
    ugLog('checkMap2=', checkMap)
    if (selectedZodiac.includes(item)) {
      let newResult = selectedBalls?.filter((item) => !checkMap.includes(item))
      setSelectedBalls(newResult)
    } else {
      setSelectedBalls([...selectedBalls,
        ...checkMap.filter((item) => !selectedBalls.includes(item))])
    }
  }

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
    dataTMA,
    setDataTMA,
    dataTMB,
    setDataTMB,
    zodiacData,
    setZodiacData,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveZodiac,
    addOrRemoveBall,
  }
}

export default UseLhcTM

