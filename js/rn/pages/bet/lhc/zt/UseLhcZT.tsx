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
 * 六合彩正特
 * @constructor
 */
const UseLhcZT = () => {

  const {
    nextIssueData,
    playOddDetailData,
    curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
  } = UseLotteryHelper()

  const [dataZT, setDataZT] = useState<Array<Array<PlayGroupData>>>(null) //当前重组后的正特数据列表
  const [selectedZodiac, setSelectedZodiac] = useState<Array<ZodiacNum>>([]) //选中了哪些生肖

  const [tabIndex, setTabIndex] = useState(0) //当前选中哪个tab，TAB_A 和 TAB_B

  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //当前彩种数据，特码，连码 等等

  const [curData, setCurData] = useState<Array<PlayGroupData>>(null) //当前选中的TAB数据

  useEffect(() => {
    !anyEmpty(dataZT) && setCurData(dataZT[tabIndex])
  }, [tabIndex, dataZT])

  /**
   * 找出当前彩种数据
   */
  useEffect(() => {
    setPlayOddData(playOddDetailData()?.playOdds?.find(
      (item) => item?.code == LotteryConst.ZT))
  }, [playOddDetailData()])


  useEffect(() => {
    if (arrayLength(playOddData?.playGroups) % 2 == 0) {//长度是偶数
      let newData = new Array<Array<PlayGroupData>>()
      playOddData?.playGroups?.map((item, index) => {
        if (index % 2 == 0) {
          newData.push([
            playOddData?.playGroups[index],
            playOddData?.playGroups[index + 1],
          ])
        }
      })
      //ugLog('newData=', JSON.stringify(newData))
      setDataZT(newData)

    }
  }, [playOddData])

  return {
    tabIndex,
    setTabIndex,
    curData,
    dataZT,
    setDataZT,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcZT

