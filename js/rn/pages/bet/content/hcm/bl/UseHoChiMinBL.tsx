import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { anyEmpty } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../../assist/UseLotteryHelper'
import { UGStore } from '../../../../../redux/store/UGStore'
import { HcmTabIndex, HoChiMin, HoChiMinSub } from '../../../const/LotteryConst'
import { tabGroupData } from '../../../util/select/ParseSelectedUtil'
import { ugLog } from '../../../../../public/tools/UgLog'

/**
 * X胡志明
 * @constructor
 */
const UseHoChiMinBL = () => {

  const [tabHochimin, setTabHochimin] = useState<HcmTabIndex>(null) // HcmTabIndex, 当前选中哪个玩法 选择号码，输入号码，快速选择
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
  }, [ballTypeIndex])

  useEffect(() => {
    //Tab有变化就清除选择的数据
    UGStore.dispatch({ type: 'reset', fastTabIndex: tabHochimin })
    setSelectedBalls([])
  }, [tabHochimin])

  //不同的TAB，输入框提示语
  const inputHint = useMemo<string>(() => {
    const tabCode = tabGroupData(tabIndex)[0]?.plays[0]?.code //当前TAB是哪一个
    if(anyEmpty(tabCode)) return null
    // const gameCode = playOddData?.code //当前是 哪个彩种，宝路 头尾

    switch (true) {
      case tabCode == HoChiMinSub.PIHAO2: //批号2
      case tabCode == HoChiMinSub.DIDUAN2: //地段2 1K
      case tabCode == HoChiMinSub.LOT2FIRST: //Lot2第一个号码"
      case tabCode == HoChiMinSub.BIAOTI: //标题
      case tabCode == HoChiMinSub.ZHUANTI: //专题
      case tabCode == HoChiMinSub.TEBIEBIAOTI: //特别标题
      case tabCode == HoChiMinSub.BIAOTIWB: //标题尾巴
      case tabCode == HoChiMinSub.ZHUZHANG7: //主张7
      case tabCode == HoChiMinSub.YIDENGJIANG: //一等奖
      case tabCode == HoChiMinSub.CHUANSHAO4: //串烧4
        return '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔。\n例如：15;12,10 19'

      case tabCode == HoChiMinSub.PIHAO3: //批号3
        return '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔。\n例如：001;015,123'

      case tabCode == HoChiMinSub.PIHAO4: //批号4
        return '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔。\n例如：0001;0015;0099'

      case tabCode == HoChiMinSub.PIANXIE2: //偏斜2
        return '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔组数之间用“|”分隔。\n例如：01;15|02;16'

      case tabCode == HoChiMinSub.PIANXIE3: //偏斜3
        return '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔组数之间用“|”分隔。\n例如：01;15;30|02;16;99'

      case tabCode == HoChiMinSub.PIANXIE4: //偏斜4
        return '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔组数之间用“|”分隔。\n例如：01;15;30;36|02;16;99;81'

      case tabCode == HoChiMinSub.H_3YINJIE: //3个音阶
      case tabCode == HoChiMinSub.H_3GTEBIE: //3更特别
      case tabCode == HoChiMinSub.H_3WBDJT: //3尾巴的尽头
        return '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔。\n例如：001;015,123'

      case tabCode == HoChiMinSub.H_4GTEBIE: //4更特别
        return '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔。\n例如：0001;0015;1234'

      case tabCode == HoChiMinSub.CHUANSHAO8: //串烧8
        return '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔。\n例如：01,02;03,06;15;12,10 19'

      case tabCode == HoChiMinSub.CHUANSHAO10: //串烧10
        return '怎么玩\n在每个下注号码之间用分号“;”或逗号“,”或空格分隔。\n例如：01,02;03;06;07,09,15;12,10 19'

    }

    return ''
  }, [tabIndex, currentPageData()])

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
        setTabHochimin(HcmTabIndex.选择号码)
        return [HcmTabIndex.选择号码, HcmTabIndex.输入号码]

    }

    setTabHochimin(HcmTabIndex.选择号码)
    return [HcmTabIndex.选择号码, HcmTabIndex.输入号码, HcmTabIndex.快速选择]
  }, [currentPageData()])

  return {
    inputHint,
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

export default UseHoChiMinBL

