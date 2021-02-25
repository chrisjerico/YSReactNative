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
import { DeviceEventEmitter, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { EmitterTypes } from '../../../public/define/EmitterTypes'
import { IEmitterMessage } from './it/IEmitterMessage'
import Icon from 'react-native-vector-icons/FontAwesome'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'
import { Slider } from 'react-native-elements'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import FastImage from 'react-native-fast-image'


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

  //拉条步进大小
  const sliderStep = systemInfo?.activeReturnCoinRatio / 20

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
   * 加大拉条
   */
  const increaseSlider = () => {
    let value = sliderValue + sliderStep
    value = value > systemInfo?.activeReturnCoinRatio ? systemInfo?.activeReturnCoinRatio : value
    setSliderValue(value)
  }

  /**
   * 减小拉条
   */
  const decreaseSlider = () => {
    let value = sliderValue - sliderStep
    value = value < 0 ? 0 : value
    setSliderValue(value)
  }

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


  /**
   * 绘制拉条
   */
  const renderSliderItem = () => {
    return (
      showSlider
        ?
        <View key={'renderSliderArea slider'}
              style={_styles.slider_container}>

          <Icon key={'renderSliderArea slider icon'}
                size={scale(28)}
                onPress={() => {
                  setShowSlider(false)
                }}
                style={_styles.slider_arrow}
                color={'white'}
                name={'chevron-down'}/>

          <UGText key={'renderSliderArea slider tx'}
                  style={_styles.sub_title_text}>{`退水: ${sliderValue?.toFixed(2)}%`}</UGText>

          <Icon key={'renderSliderArea slider icon2'}
                size={scale(48)}
                color={'white'}
                onPress={decreaseSlider}
                style={_styles.slider_plus}
                name={'minus-circle'}/>

          <Slider
            key={'renderSliderArea slider bar'}
            style={_styles.slider}
            minimumValue={0}
            value={sliderValue}
            step={sliderStep}
            onValueChange={(value => setSliderValue(value))}
            maximumValue={systemInfo?.activeReturnCoinRatio ?? 0}
            minimumTrackTintColor={Skin1.themeColor}
            thumbTintColor={Skin1.themeColor}
            maximumTrackTintColor={UGColor.LineColor4}/>

          <Icon key={'renderSliderArea slider icon 3'}
                size={scale(48)}
                color={'white'}
                onPress={increaseSlider}
                style={_styles.slider_minus}
                name={'plus-circle'}/>
        </View>
        :
        <View key={'renderSliderArea slider arrow up'}
              style={_styles.slider_button_container}>
          <Icon key={'renderSliderArea slider icon up'}
                size={scale(36)}
                style={_styles.slider_button}
                onPress={() => {
                  setShowSlider(true)
                }}
                color={Skin1.themeColor}
                name={'chevron-up'}/>
        </View>

    )
  }

  /**
   * 绘制筹码
   */
  const renderChipItem = () => {
    return (
      showChip && <View key={'renderSliderArea chip'}
                        style={_styles.chip_container}>
        <View key={'renderSliderArea chip sub'}
              style={_styles.chip_content}>
          {
            Object.keys(CHIP_OPTION).map((money) =>
              <TouchableWithoutFeedback key={'renderSliderArea chip' + money}
                                        onPress={() => UGStore.dispatch({
                                          type: 'reset',
                                          inputMoney: money == 'c' ? 0 : Number(money),
                                        })}>
                <FastImage key={'renderSliderArea chip' + money}
                           source={{ uri: CHIP_OPTION[money] }}
                           style={_styles.chip_img}
                           resizeMode={'contain'}/>
              </TouchableWithoutFeedback>)
          }
        </View>
      </View>

    )
  }

  /**
   * 绘制封盘中
   */
  const renderLock = (item?: string) => {
    return (
      lockBoard?.locked && <View key={'renderLock'}
                                 style={_styles.lock_container}>
        <View key={'renderLock sub'}
              style={_styles.lock_content}>
          <UGText key={'renderLock 封盘中'}
                  style={_styles.lock_text}>
            {item}
          </UGText>
        </View>
      </View>
    )
  }

  return {
    sliderStep,
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
    increaseSlider,
    decreaseSlider,
    checkShowBetPayment,
    renderSliderItem,
    renderChipItem,
    renderLock,
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

const _styles = StyleSheet.create({

  chip_container: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
  },
  chip_content: {
    backgroundColor: UGColor.transparent3,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: scale(48),
  },
  chip_img: {
    width: scale(76),
    aspectRatio: 1,
  },
  slider_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.transparent3,
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
  },
  slider_arrow: {
    padding: scale(12),
  },
  slider_plus: {
    paddingLeft: scale(12),
  },
  slider_minus: {
    paddingRight: scale(12),
  },
  slider_button_container: {
    width: scale(52),
    aspectRatio: 1,
  },
  slider_button: {
    padding: scale(8),
  },
  sub_title_text: {
    flex: 1,
    color: 'white',
    fontSize: scale(24),
    textAlign: 'right',
  },
  slider: {
    width: scale(200),
    height: scale(56),
    marginHorizontal: scale(4),
  },
  lock_container: {
    position: 'absolute',
    width: '100%',
    height: scale(120),
    justifyContent: 'flex-end',
  },
  lock_content: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: UGColor.transparent3,
    position: 'absolute',
  },
  lock_text: {
    color: 'white',
    fontSize: scale(30),
  },

})


export default UseBetBoard
export { CHIP_OPTION }

