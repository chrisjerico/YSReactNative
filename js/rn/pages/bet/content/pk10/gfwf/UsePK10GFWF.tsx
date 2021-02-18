import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../../assist/UseLotteryHelper'
import { PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { UGStore } from '../../../../../redux/store/UGStore'
import { SingleOption } from '../../../const/LotteryConst'

/**
 * X字定位
 * @constructor
 */
const UsePK10GFWF = () => {

  const optionArray = ['单式', '复式'] //选项
  const [optionIndex, setOptionIndex] = useState(SingleOption.SINGLE) //当前选项是 单式 还是 复式

  useEffect(() => {
    //Tab有变化就清除选择的数据
    UGStore.dispatch({ type: 'reset', singleTabIndex: optionIndex })
    setSelectedBalls([])
  }, [optionIndex])

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

