import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { RefreshControl } from 'react-native'
import { NextIssueData } from '../../../public/network/Model/lottery/NextIssueModel'
import {
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../public/tools/Ext'
import APIRouter from '../../../public/network/APIRouter'
import { ugLog } from '../../../public/tools/UgLog'
import BetLotteryContext from '../BetLotteryContext'
import ISelBall, { isSelectedBallOnId } from '../const/ISelBall'
import UseLotteryHelper from '../util/UseLotteryHelper'
import { bool } from 'prop-types'
import { Res } from '../../../Res/icon/Res'
import { UGStore } from '../../../redux/store/UGStore'


/**
 * 彩票下注 功能面板
 * @constructor
 */
const UseLhcBoard = () => {

  const [sliderValue, setSliderValue] = useState<number>(0) //拉条进度
  const [inputMoney, setInputMoney] = useState<string>(null) //输入的金额
  const [showSlider, setShowSlider] = useState<boolean>(false) //是否显示拉条
  const [showChip, setShowChip] = useState<boolean>(false) //是否显示筹码
  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  useEffect(() => {
  }, [])

  return {
    userInfo,
    systemInfo,
    showSlider,
    setShowSlider,
    sliderValue,
    setSliderValue,
    inputMoney,
    setInputMoney,
    showChip,
    setShowChip,
  }
}

//筹码金额
const CHIP_OPTION = {
  10: Res.a10,
  100: Res.a100,
  1000: Res.a1k,
  5000: Res.a5k,
  10000: Res.a10k,
  50000: Res.a50k,
  'c': Res.clr,
}

interface ILMABallArray {
  id: string//球的id + 编号组成
  name?: string
  odds?: string
}

export default UseLhcBoard
export { ILMABallArray, CHIP_OPTION }

