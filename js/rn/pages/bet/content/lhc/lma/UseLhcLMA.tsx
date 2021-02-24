import * as React from 'react'
import UseLotteryHelper from '../../assist/UseLotteryHelper'


/**
 * 六合彩连码
 * @constructor
 */
const UseLhcLMA = () => {

  const {
    sliderValue,
    tabIndex,
    setTabIndex,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    selectedBalls,
    setSelectedBalls,
    currentPageData,
    addOrRemoveBall,
    zodiacBallIds,
  } = UseLotteryHelper()

  return {
    sliderValue,
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    currentPageData,
    addOrRemoveBall,
  }
}

export default UseLhcLMA

