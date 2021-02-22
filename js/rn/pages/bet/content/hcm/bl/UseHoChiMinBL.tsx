import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../../assist/UseLotteryHelper'
import { PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { DeviceEventEmitter } from 'react-native'
import { EmitterTypes } from '../../../../../public/define/EmitterTypes'
import { UGStore } from '../../../../../redux/store/UGStore'

/**
 * X胡志明
 * @constructor
 */
const UseHoChiMinBL = () => {

  const [tabGameIndex, setTabGameIndex] = useState(GameTabIndex.SEL_NUMBER) //当前选中第几个玩法
  const [blInputNumber, setBlInputNumber] = useState<string>(null) //输入的号码

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



  useEffect(() => {

    //Tab有变化就清除选择的数据
    UGStore.dispatch({ type: 'reset', lotteryTabIndex: tabIndex })
    setSelectedBalls([])

  }, [tabGameIndex])

  return {
    GAME_TYPE_ARRAY,
    GameTabIndex,
    blInputNumber,
    setBlInputNumber,
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

const GAME_TYPE_ARRAY = ['选择号码', '输入号码', '快速选择'] //玩法种类
enum GameTabIndex {
  SEL_NUMBER, //选择号码
  INPUT_NUMBER, //输入号码
  SEL_FAST, //快速选择
}

export default UseHoChiMinBL

