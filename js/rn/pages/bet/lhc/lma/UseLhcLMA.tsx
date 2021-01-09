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
 * 六合彩连码
 * @constructor
 */
const UseLhcLMA = () => {

  const {
    nextIssueData,
    playOddDetailData,
    curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
  } = UseLotteryHelper()

  const [dataLMA, setDataLMA] = useState<Array<PlayGroupData>>(null) //当前重组后的正特数据列表
  const [selectedZodiac, setSelectedZodiac] = useState<Array<ZodiacNum>>([]) //选中了哪些生肖

  const [tabIndex, setTabIndex] = useState(0) //当前选中哪个tab，TAB_A 和 TAB_B

  const [playOddData, setPlayOddData] = useState<PlayOddData>(null) //当前彩种数据，特码，连码 等等

  const [curData, setCurData] = useState<PlayGroupData>(null) //当前TAB选中的数据
  const [ballArray, setBallArray] = useState<Array<ILMABallArray>>(null) //当前TAB选中的数据

  useEffect(() => {
    if (!anyEmpty(dataLMA) &&
      !anyEmpty(!anyEmpty(dataLMA[tabIndex].plays))) {
      const data = dataLMA[tabIndex]

      let arr: Array<ILMABallArray>
      const play0 = data?.plays[0]
      //多个赔率的生成47个球，否则49个球
      if (arrayLength(data?.plays) > 1) {
        arr = new Array(
          47,
        ).fill(0).map((item, index) => {
          let ballIndex = ('0' + index).slice(-2)
          return (
            {
              id: play0?.id + ballIndex,
              name: ballIndex,
              odds: `${play0?.odds}\n${data?.plays[1]?.odds}`,
            }
          )
        })
      } else {
        arr = new Array(
          49,
        ).fill(0).map((item, index) => {
          let ballIndex = ('0' + index).slice(-2)
          return (
            {
              id: play0?.id + ballIndex,
              name: ballIndex,
              odds: play0?.odds,
            }
          )
        })
      }

      setBallArray(arr)
      setCurData(data)
    }
  }, [tabIndex, dataLMA])

  /**
   * 找出当前彩种数据
   */
  useEffect(() => {
    setPlayOddData(playOddDetailData()?.playOdds?.find(
      (item) => item?.code == LotteryConst.LMA))
  }, [playOddDetailData()])

  // ugLog('playOddData=', playOddData)
  useEffect(() => {
    setDataLMA(playOddData?.playGroups)
    playOddData?.playGroups?.map((item) => {
      if (arrayLength(item.plays) > 1) {//多个赔率的生成47个球，否则49个球

      } else if (arrayLength(item.plays) > 1) {//多个赔率的生成47个球，否则49个球

      }
    })
  }, [playOddData])

  return {
    tabIndex,
    setTabIndex,
    curData,
    ballArray,
    dataLMA,
    setDataLMA,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

interface ILMABallArray {
  id?: string//球的id + 编号组成
  name?: string
  odds?: string
}

export default UseLhcLMA
export { ILMABallArray }

