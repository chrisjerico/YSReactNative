import * as React from 'react'
import { useEffect, useState } from 'react'
import { PlayOddData, ZodiacNum } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../hp/UseLotteryHelper'

/**
 * 六合彩 合肖 等等
 * @constructor
 */
const UseLhcHX = () => {

  const {
    tabIndex,
    setTabIndex,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    selectedBalls,
    setSelectedBalls,
    currentPageData,
    addOrRemoveBall,
  } = UseLotteryHelper()

  return {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    currentPageData,
    addOrRemoveBall,
  }
}

export default UseLhcHX

