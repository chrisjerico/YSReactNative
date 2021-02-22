import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../../assist/UseLotteryHelper'
import { PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'

/**
 * X字定位
 * @constructor
 */
const UseHoChiMinBL = () => {

  const GAME_TYPE_ARRAY = ['选择号码', '输入号码', '快速选择'] //玩法种类
  const [tabGameIndex, setTabGameIndex] = useState(0) //当前选中第几个玩法

  const {
    sliderValue,
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
    GAME_TYPE_ARRAY,
    tabGameIndex,
    setTabGameIndex,
    sliderValue,
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    currentPageData,
  }
}

export default UseHoChiMinBL

