import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../../util/UseLotteryHelper'
import { PlayGroupData, PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'


/**
 * 六合彩 自选不中
 * @constructor
 */
const UseLhcZXBZ = () => {

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

      const play0 = data?.plays[0]
      let arr = new Array(
        49,
      ).fill(0).map((item, index) => {
        let ballIndex = ('0' + index).slice(-2)
        return (
          {
            id: play0?.id + ballIndex,
            name: ballIndex,
          }
        )
      })

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

interface ILMABallArray {
  id: string//球的id + 编号组成
  name?: string
  odds?: string
}

export default UseLhcZXBZ
export { ILMABallArray }

