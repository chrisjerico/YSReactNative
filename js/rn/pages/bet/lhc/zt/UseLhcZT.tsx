import * as React from 'react'
import { useEffect, useState } from 'react'
import { PlayGroupData, PlayOddData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
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
    playOddDetailData,
    // curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
  } = UseLotteryHelper()

  const [selectedZodiac, setSelectedZodiac] = useState<Array<ZodiacNum>>([]) //选中了哪些生肖

  useEffect(() => {
    setCurData(playOddData?.pageData?.groupTri[tabIndex])
  }, [tabIndex])

  return {
    setPlayOddData,
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

