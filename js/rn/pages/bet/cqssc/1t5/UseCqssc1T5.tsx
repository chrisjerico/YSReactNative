import * as React from 'react'
import { useEffect } from 'react'
import { anyEmpty } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../../lhc/hp/UseLotteryHelper'
import { PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'

/**
 * 1-5球
 * @constructor
 */
const UseCqssc1T5 = () => {

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

export default UseCqssc1T5

