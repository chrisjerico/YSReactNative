import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../../assist/UseLotteryHelper'
import { PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'

/**
 * X字定位
 * @constructor
 */
const UsePK10GFWF = () => {

  const optionArray = ['单式', '复式'] //选项
  const [optionIndex, setOptionIndex] = useState(0) //当前选项是 单式 还是 复式

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
    optionArray,
    optionIndex,
    setOptionIndex,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    currentPageData,
  }
}

export default UsePK10GFWF

