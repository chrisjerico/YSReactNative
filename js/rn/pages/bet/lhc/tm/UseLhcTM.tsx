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
import LotteryConst, { LHC_Tab } from '../../const/LotteryConst'


/**
 * 六合彩特码
 * @constructor
 */
const UseLhcTM = () => {

  const {
    nextIssueData,
    playOddDetailData,
    curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
  } = UseLotteryHelper()

  const [dataTMA, setDataTMA] = useState<Array<PlayGroupData>>(null) //当前特码A数据列表
  const [dataTMB, setDataTMB] = useState<Array<PlayGroupData>>(null) //当前特码B数据列表
  const [zodiacData, setZodiacData] = useState<Array<ZodiacNum>>([]) //生肖数据列表
  const [selectedZodiac, setSelectedZodiac] = useState<Array<ZodiacNum>>([]) //选中了哪些生肖

  const [tabIndex, setTabIndex] = useState(LHC_Tab.TM_B) //当前选中哪个tab，TAB_A 和 TAB_B

  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //当前彩种数据，特码，连码 等等

  /**
   * 找出当前彩种数据
   */
  useEffect(() => {
    setPlayOddData(playOddDetailData()?.playOdds?.find(
      (item) => item?.code == LotteryConst.TM))
  }, [playOddDetailData()])

  // ugLog('playOddData=', playOddData)
  useEffect(() => {
    //特码取前3个数据 特码 两面 色波
    if (!anyEmpty(playOddData?.playGroups)) {
      setDataTMA([playOddData?.playGroups[0], playOddData?.playGroups[1], playOddData?.playGroups[2]])
      setDataTMB([playOddData?.playGroups[3], playOddData?.playGroups[4], playOddData?.playGroups[5]])
      setZodiacData(playOddDetailData()?.setting?.zodiacNums)

    }
  }, [playOddData])

  /**
   * 有选中的数据变化时，计算生肖的选中情况
   */
  useEffect(() => {
    let selArr = []
    zodiacData?.map((zodiac) => {
      let data = tabIndex == LHC_Tab.TM_A ? dataTMA : dataTMB
      const zodiacIds = zodiacBallIds(zodiac, data[0])

      const intersection = selectedBalls?.filter((item) => zodiacIds.includes(item))
      if (arrayLength(intersection) == arrayLength(zodiac.nums)) {
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
    // const checkMap = item.nums.map((item) => ('0' + item).slice(-2))
    let data = tabIndex == LHC_Tab.TM_A ? dataTMA : dataTMB
    const zodiacIds = zodiacBallIds(item, data[0])

    if (selectedZodiac.includes(item)) {
      let newResult = selectedBalls?.filter((item) => !zodiacIds.includes(item))
      setSelectedBalls(newResult)
    } else {
      setSelectedBalls(Array.from(new Set([...selectedBalls, ...zodiacIds])))
    }
  }

  return {
    tabIndex,
    setTabIndex,
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

