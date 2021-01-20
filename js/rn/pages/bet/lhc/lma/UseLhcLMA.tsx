import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../../util/UseLotteryHelper'
import { PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ILotteryEBallItem } from '../../widget/LotteryEBall'


/**
 * 六合彩连码
 * @constructor
 */
const UseLhcLMA = () => {

  const {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
  } = UseLotteryHelper()

  const [ballArray, setBallArray] = useState<Array<ILotteryEBallItem>>(null) //当前生成的数据

  useEffect(() => {
    if (!anyEmpty(pageData) && !anyEmpty(pageData[tabIndex][0].plays)) {
      const data = pageData[tabIndex][0]

      let arr: Array<ILotteryEBallItem>
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
      setCurData(pageData[tabIndex])
    }
  }, [tabIndex, pageData])

  /**
   * 更新数据
   * @param playOddData
   */
  const updatePlayOddData = (playOddData?: PlayOddData) => {
    setPlayOddData(playOddData)
    setPageData(playOddData?.playGroups?.map((item) => [item]))
  }

  return {
    ballArray,
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    updatePlayOddData,
  }
}

export default UseLhcLMA

