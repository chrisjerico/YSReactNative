import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../../util/UseLotteryHelper'


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
    lotteryCode,
    playOddDetailData,
    // curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
  } = UseLotteryHelper()

  const [ballArray, setBallArray] = useState<Array<ILMABallArray>>(null) //当前生成的数据

  useEffect(() => {
    if (!anyEmpty(pageData) && !anyEmpty(pageData[tabIndex][0].plays)) {
      const data = pageData[tabIndex][0]

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
      setCurData(pageData[tabIndex])
    }
  }, [tabIndex, pageData])

  useEffect(() => {
    setPageData(playOddData?.playGroups?.map((item) => [item]))
  }, [playOddData])

  return {
    lotteryCode,
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
  }
}

interface ILMABallArray {
  id?: string//球的id + 编号组成
  name?: string
  odds?: string
}

export default UseLhcLMA
export { ILMABallArray }

