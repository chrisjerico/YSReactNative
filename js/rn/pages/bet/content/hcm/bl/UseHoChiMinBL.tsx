import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../../assist/UseLotteryHelper'
import { PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { DeviceEventEmitter } from 'react-native'
import { EmitterTypes } from '../../../../../public/define/EmitterTypes'
import { UGStore } from '../../../../../redux/store/UGStore'
import { HoChiMin, HoChiMinSub } from '../../../const/LotteryConst'

/**
 * X胡志明
 * @constructor
 */
const UseHoChiMinBL = () => {

  const [tabHochimin, setTabHochimin] = useState<string>(null) // HcmTabIndex, 当前选中哪个玩法 选择号码，输入号码，快速选择
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

  }, [tabHochimin, ballTypeIndex])

  //不同玩法 不同种类
  const GAME_TYPE_ARRAY = useMemo(() => {
    const tabCode = currentPageData()[0]?.plays[0]?.code //当前TAB是哪一个
    if(anyEmpty(tabCode)) return null

    const gameCode = playOddData?.code //当前是 哪个彩种，宝路 头尾
    switch (true) {
      case gameCode == HoChiMin.DDQX: //地段倾斜
      case gameCode == HoChiMin.CQ: //抽签
        setTabHochimin(HcmTabIndex.输入号码)
        return [HcmTabIndex.输入号码, HcmTabIndex.快速选择]

      case gameCode == HoChiMin.TW: //头尾
        setTabHochimin(HcmTabIndex.选择号码)
        return [HcmTabIndex.选择号码]

      case gameCode == HoChiMin.H_4GD: //4更多
      case tabCode == HoChiMinSub.PIHAO4: //批号4
        return [HcmTabIndex.选择号码, HcmTabIndex.输入号码]

    }

    setTabHochimin(HcmTabIndex.选择号码)
    return [HcmTabIndex.选择号码, HcmTabIndex.输入号码, HcmTabIndex.快速选择]
  }, [currentPageData()])

  return {
    GAME_TYPE_ARRAY,
    ballTypeIndex,
    setBallTypeIndex,
    HcmTabIndex,
    blInputNumber,
    setBlInputNumber,
    tabHochimin,
    setTabHochimin,
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

enum HcmTabIndex {
  选择号码 = '选择号码', //选择号码
  输入号码 = '输入号码', //输入号码
  快速选择 = '快速选择', //快速选择
}

export default UseHoChiMinBL

