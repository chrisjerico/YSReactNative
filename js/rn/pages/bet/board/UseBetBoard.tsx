import * as React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Res } from '../../../Res/icon/Res'
import { UGStore } from '../../../redux/store/UGStore'
import { anyEmpty } from '../../../public/tools/Ext'
import { Toast } from '../../../public/tools/ToastUtils'
import { checkBetCount, generateBetArray } from './tools/BetUtil'
import { LotteryResultData } from '../../../public/network/Model/lottery/result/LotteryResultModel'
import { AsyncStorageKey } from '../../../redux/store/IGlobalStateHelper'
import { BetShareModel } from '../../../redux/model/game/bet/BetShareModel'
import { ugLog } from '../../../public/tools/UgLog'
import { filterSelectedData } from '../util/LotteryUtil'
import { DeviceEventEmitter } from 'react-native'
import { EmitterTypes } from '../../../public/define/EmitterTypes'
import { IEmitterMessage } from './it/IEmitterMessage'


/**
 * 彩票下注 功能面板
 * @constructor
 */
const UseBetBoard = () => {

  const [sliderValue, setSliderValue] = useState<number>(0) //拉条数据
  const [showSlider, setShowSlider] = useState<boolean>(false) //是否显示拉条
  const [showChip, setShowChip] = useState<boolean>(false) //是否显示筹码
  const [lockBoard, setLockBoard] = useState<IEmitterMessage>(null) //是否封盘

  const userInfo = UGStore.globalProps.userInfo //用户信息
  const systemInfo = UGStore.globalProps.sysConf //系统信息

  const nextIssueData = UGStore.globalProps?.nextIssueData// 下期彩票数据
  const selectedData = UGStore.globalProps?.selectedData//选中的数据
  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据
  const gameTabIndex = UGStore.globalProps?.gameTabIndex //GameTab 当前TAB是 彩票0 还是 聊天室1
  const betShareModel = UGStore.globalProps.betShareModel //下注数据
  const reBetShareModel = UGStore.globalProps.betChaseMap && UGStore.globalProps.betChaseMap[UGStore.globalProps?.lotteryId] //追号的下注数据

  // //收到消息封盘
  // const emitterCallback = useCallback((item?: IEmitterMessage) => {
  //   setLockBoard(n => item)
  // }, [])

  useEffect(() => {
    //收到消息封盘或解封
    const lisRandom = DeviceEventEmitter.addListener(EmitterTypes.LOCK_BOARD, (item?: IEmitterMessage) => {
      ugLog('item item = ', JSON.stringify(item))
      setLockBoard(n => item)
    })

    return () => {
      lisRandom.remove()
    }
  }, [])

  //各彩种选中的数量
  const ballSelected = useMemo(() => {
    return filterSelectedData(UGStore.globalProps?.selectedData)
  }, [UGStore.globalProps?.selectedData])

  /**
   * 拉条有变化
   */
  useEffect(() => {
    UGStore.dispatch({ type: 'reset', sliderValue: sliderValue })
  }, [sliderValue])

  /**
   * 开始下注
   */
  const checkShowBetPayment = () => {
    const inputMoney = UGStore.globalProps?.inputMoney

    if (!inputMoney || inputMoney <= 0) {
      Toast('请输入投注金额')
      // } else if (count <= 0) {
      //   Toast('请选择玩法')
    } else if (checkBetCount()) {
      const newData = generateBetArray(nextIssueData, UGStore.globalProps?.sliderValue?.toString(), inputMoney?.toString(), selectedData)
      UGStore.dispatch({ type: 'reset', betShareModel: newData })
    }
  }

  return {
    lockBoard,
    setLockBoard,
    gameTabIndex,
    betShareModel,
    userInfo,
    systemInfo,
    showSlider,
    setShowSlider,
    sliderValue,
    setSliderValue,
    showChip,
    setShowChip,
    playOddDetailData,
    reBetShareModel,
    ballSelected,
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

