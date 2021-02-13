import * as React from 'react'
import { useEffect } from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../../lhc/assist/UseLotteryHelper'
import { PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'

/**
 * 定位胆
 * @constructor
 */
const UseCqsscDWD = () => {

  const {
    tabIndex,
    setTabIndex,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    // curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addAndRemoveBallList,
    addOrRemoveBall,
    currentPageData,
  } = UseLotteryHelper()

  return {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addAndRemoveBallList,
    addOrRemoveBall,
    currentPageData,
  }
}

export default UseCqsscDWD

