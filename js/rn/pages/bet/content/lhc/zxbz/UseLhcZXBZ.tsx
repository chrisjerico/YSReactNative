import * as React from 'react'
import UseLotteryHelper from '../../assist/UseLotteryHelper'


/**
 * 六合彩 自选不中
 * @constructor
 */
const UseLhcZXBZ = () => {

  const {
    tabIndex,
    setTabIndex,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    // curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
    currentPageData,
  } = UseLotteryHelper()

  return {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    currentPageData,
  }
}

export default UseLhcZXBZ

