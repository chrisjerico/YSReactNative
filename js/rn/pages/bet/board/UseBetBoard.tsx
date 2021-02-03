import * as React from 'react'
import { useEffect, useState } from 'react'
import { Res } from '../../../Res/icon/Res'
import { UGStore } from '../../../redux/store/UGStore'
import SelectedLotteryModel from '../../../redux/model/game/SelectedLotteryModel'
import { anyEmpty } from '../../../public/tools/Ext'
import { Toast } from '../../../public/tools/ToastUtils'
import { checkBetCount } from './tools/BetUtil'
import { LotteryResultData } from '../../../public/network/Model/lottery/result/LotteryResultModel'


/**
 * 彩票下注 功能面板
 * @constructor
 */
const UseBetBoard = () => {

  const [sliderValue, setSliderValue] = useState<number>(0) //拉条数据
  const [inputMoney, setInputMoney] = useState<string>(null) //输入的金额
  const [showBetPayment, setShowBetPayment] = useState<boolean>(false) //是否显示下注
  const [betResult, setBetResult] = useState<LotteryResultData>(null) //下注结果
  const [showSlider, setShowSlider] = useState<boolean>(false) //是否显示拉条
  const [showChip, setShowChip] = useState<boolean>(false) //是否显示筹码
  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息
  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据

  // const nextIssueData = UGStore.globalProps.nextIssueData //下期数据

  /**
   * 输入金额有变化
   */
  useEffect(() => {
    const selectedLotteryModel: SelectedLotteryModel = { inputMoney: Number.parseFloat(inputMoney) }
    UGStore.dispatch({ type: 'merge', selectedLotteryModel })
  }, [inputMoney])

  /**
   * 开始下注
   */
  const checkShowBetPayment = () => {
    if (anyEmpty(inputMoney)) {
      Toast('请输入投注金额')
    // } else if (count <= 0) {
    //   Toast('请选择玩法')
    } else if(checkBetCount(true)) {
      setShowBetPayment(true)
    }
  }

  return {
    betResult,
    setBetResult,
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
    checkShowBetPayment,
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

export default UseBetBoard
export { CHIP_OPTION }

