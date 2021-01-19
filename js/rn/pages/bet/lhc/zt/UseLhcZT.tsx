import * as React from 'react'
import { useEffect, useState } from 'react'
import { PlayGroupData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../../util/UseLotteryHelper'


/**
 * 六合彩 正特 正码 等等
 * @constructor
 */
const UseLhcZT = () => {

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

  const [selectedZodiac, setSelectedZodiac] = useState<Array<ZodiacNum>>([]) //选中了哪些生肖

  useEffect(() => {
    !anyEmpty(pageData) && setCurData(pageData[tabIndex])
  }, [tabIndex, pageData])

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
      setPageData(newData)

    }
  }, [playOddData])

  return {
    lotteryCode,
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    selectedZodiac,
    setSelectedZodiac,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  }
}

export default UseLhcZT

