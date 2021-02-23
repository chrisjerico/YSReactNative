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

  const [tabHcmIndex, setTabHcmIndex] = useState<HcmTabIndex>(HcmTabIndex.SEL_NUMBER) //当前选中第几个玩法 选择号码，输入号码，快速选择
  const [ballTypeIndex, setBallTypeIndex] = useState(0) //当前单个球从 0 ~ 999 的类别，比如 批号3
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
    addAndRemoveBallList,
    currentPageData,
  } = UseLotteryHelper()

  useEffect(() => {
    //Tab有变化就清除选择的数据
    setSelectedBalls([])

  }, [tabHcmIndex, ballTypeIndex])

  return {
    GAME_TYPE_ARRAY,
    ballTypeIndex,
    setBallTypeIndex,
    HcmTabIndex,
    blInputNumber,
    setBlInputNumber,
    tabHcmIndex,
    setTabHcmIndex,
    sliderValue,
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    addAndRemoveBallList,
    currentPageData,
  }
}

const GAME_TYPE_ARRAY = ['选择号码', '输入号码', '快速选择'] //玩法种类
enum HcmTabIndex {
  SEL_NUMBER, //选择号码
  INPUT_NUMBER, //输入号码
  SEL_FAST, //快速选择
}

export default UseHoChiMinBL

