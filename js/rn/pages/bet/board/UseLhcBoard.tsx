import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { Res } from '../../../Res/icon/Res'
import { UGStore } from '../../../redux/store/UGStore'
import BetLotteryContext from '../BetLotteryContext'


/**
 * 彩票下注 功能面板
 * @constructor
 */
const UseLhcBoard = () => {

  const [sliderValue, setSliderValue] = useState<number>(0) //拉条数据
  const [inputMoney, setInputMoney] = useState<string>(null) //输入的金额
  const [showBetPayment, setShowBetPayment] = useState<boolean>(false) //是否显示下注
  const [showSlider, setShowSlider] = useState<boolean>(false) //是否显示拉条
  const [showChip, setShowChip] = useState<boolean>(false) //是否显示筹码
  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const {
    playOddDetailData
  } = useContext(BetLotteryContext)

  useEffect(() => {
  }, [])

  return {
    showBetPayment,
    setShowBetPayment,
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
    playOddDetailData,
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

export default UseLhcBoard
export { CHIP_OPTION }

