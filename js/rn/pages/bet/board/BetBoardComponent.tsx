import {
  DeviceEventEmitter,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import * as React from 'react'
import { scale } from '../../../public/tools/Scale'
import Icon from 'react-native-vector-icons/FontAwesome'
import { UGColor } from '../../../public/theme/UGThemeColor'
import UseBetBoard, { CHIP_OPTION } from './UseBetBoard'
import { Slider } from 'react-native-elements'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import CommStyles from '../../base/CommStyles'
import FastImage from 'react-native-fast-image'
import { UGStore } from '../../../redux/store/UGStore'
import { ugLog } from '../../../public/tools/UgLog'
import { GameTab } from '../const/LotteryConst'
import { SelectedPlayModel } from '../../../redux/model/game/SelectedLotteryModel'
import { AsyncStorageKey } from '../../../redux/store/IGlobalStateHelper'
import { dicNull } from '../../../public/tools/Ext'
import { mapTotalCount } from '../util/ArithUtil'
import { EmitterTypes } from '../../../public/define/EmitterTypes'
import { useEffect } from 'react'
import { IEmitterMessage } from './it/IEmitterMessage'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

/**
 * 彩票功能区入参
 */
interface IBetBoardParams {
  lockedItem?: IEmitterMessage // 是否封盘中
  style?: StyleProp<ViewStyle>
}

/**
 * 彩票下注 功能面板
 *
 * @param navigation
 * @constructor
 */
const BetBoardComponent = ({ lockedItem, style }: IBetBoardParams) => {

  const {
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
  } = UseBetBoard()

  useEffect(() => {
    setLockBoard(lockedItem)
  }, [])

  /**
   * 绘制拉条和筹码
   */
  const renderSliderArea = () => <View key={'renderSliderArea'}
                                       style={_styles.extra_container}
                                       pointerEvents={'box-none'}>
    {systemInfo?.activeReturnCoinStatus && renderSliderItem()}
    {renderChipItem()}
  </View>

  /**
   * 追号
   */
  const renderChaseNumber = () => {
    if (systemInfo?.chaseNumber != '1') return null

    // ugLog('systemInfo?.chaseNumber', systemInfo?.chaseNumber)
    // ugLog('systemInfo?.reBetShareModel', reBetShareModel)

    return !dicNull(reBetShareModel)
      ?
      <TouchableWithoutFeedback onPress={() => {
        UGStore.dispatch({ type: 'reset', betShareModel: reBetShareModel })
      }}>
        <UGText style={_styles.bet_again}>追号</UGText>
      </TouchableWithoutFeedback>
      :
      <UGText style={[
        _styles.bet_again,
        {
          backgroundColor: UGColor.TextColor7,
          color: UGColor.TextColor4,
        },
      ]}>追号</UGText>
  }

  /**
   * 机选
   */
  const renderRandomSelected = () => {
    return <TouchableWithoutFeedback onPress={() => DeviceEventEmitter.emit(EmitterTypes.RANDOM_SELECT_LOTTERY)}>
      <UGText style={_styles.bet_again}>机选</UGText>
    </TouchableWithoutFeedback>
  }

  /**
   * 绘制输入功能区
   */
  const renderInputArea = () => {

    return <View style={_styles.input_container}>

      <View>
        {renderChaseNumber()}
        {renderRandomSelected()}
      </View>

      <View style={_styles.middle_container}>
        <View style={_styles.bet_info}>
          <UGText style={_styles.lottery_count_hint}>已选中</UGText>
          <UGText style={_styles.lottery_count_count}>{mapTotalCount(ballSelected)}</UGText>
          <UGText style={_styles.lottery_count_hint}>注</UGText>
          <View style={CommStyles.flex}/>
          <TouchableWithoutFeedback onPress={() => setShowChip(!showChip)}>
            <UGText style={_styles.lottery_count_chip}>筹码</UGText>
          </TouchableWithoutFeedback>
        </View>
        <TextInput value={UGStore.globalProps?.inputMoney?.toString()}
                   style={_styles.input_text}
                   maxLength={11}
                   onChangeText={(s) => {
                     UGStore.dispatch({ type: 'reset', inputMoney: Number(s) })
                   }}
                   keyboardType={'numeric'}/>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={checkShowBetPayment}>
          <UGText style={_styles.start_bet}>下注</UGText>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => {
          DeviceEventEmitter.emit(EmitterTypes.CLEAR_SELECT_LOTTERY)
          UGStore.dispatch({
            type: 'reset',
            selectedData: new Map<string, Map<string, Map<string, SelectedPlayModel>>>(),
          })
        }
        }>
          <UGText style={_styles.start_reset}>重置</UGText>
        </TouchableWithoutFeedback>
      </View>

    </View>
  }

  return (
    <View key={'bet board content'}
          pointerEvents={'box-none'}
          style={[
            _styles.container,
            style,
            gameTabIndex == GameTab.LOTTERY ? null : { height: 0, width: 0, opacity: 0, display: 'none' }, //非彩票界面不需要显示 下注面板
          ]}>
      <View style={_styles.bet_container}>
        {renderSliderArea()}
        {renderInputArea()}
        {renderLock(lockBoard?.hintText)}
      </View>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    // flex: 1,
  },
  bet_container: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'flex-end',
    // backgroundColor: 'blue'
  },
  extra_container: {
    flex: 1,
    height: scale(128),
    justifyContent: 'flex-end',
  },
  ball_container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(4),
  },
  ball_odds: {
    width: scale(76),
    color: UGColor.TextColor7,
    fontSize: scale(18),
    paddingHorizontal: scale(1),
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.transparent4,
    padding: scale(12),
  },
  middle_container: {
    paddingHorizontal: scale(8),
    flex: 1,
  },
  lottery_count_hint: {
    color: 'white',
    fontSize: scale(24),
    textAlign: 'right',
  },
  lottery_count_count: {
    color: UGColor.YellowColor3,
    fontSize: scale(24),
    textAlign: 'right',
    paddingHorizontal: scale(4),
  },
  lottery_count_chip: {
    color: 'white',
    fontSize: scale(24),
    backgroundColor: UGColor.SuccessColor1,
    borderRadius: scale(4),
    paddingHorizontal: scale(16),
    paddingVertical: scale(2),

  },
  lottery_count_number: {
    color: 'white',
    fontSize: scale(24),
    paddingHorizontal: scale(16),
    textAlign: 'right',
  },
  input_text: {
    fontSize: scale(26),
    backgroundColor: 'white',
    color: UGColor.TextColor2,
    borderRadius: scale(4),
    height: scale(48),
    paddingVertical: 0,
  },
  bet_again: {
    fontSize: scale(24),
    backgroundColor: UGColor.YellowColor3,
    color: 'white',
    borderRadius: scale(4),
    width: scale(88),
    paddingVertical: scale(4),
    marginVertical: scale(2),
    textAlign: 'center',
  },
  start_bet: {
    fontSize: scale(24),
    backgroundColor: UGColor.RedColor6,
    color: 'white',
    borderRadius: scale(4),
    height: scale(88),
    textAlign: 'center',
    paddingHorizontal: scale(16),
    textAlignVertical: 'center',
  },
  start_reset: {
    fontSize: scale(22),
    backgroundColor: UGColor.BlueColor7,
    color: 'white',
    borderRadius: scale(4),
    height: scale(88),
    textAlign: 'center',
    paddingHorizontal: scale(12),
    marginLeft: scale(8),
    textAlignVertical: 'center',
  },
  bet_info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(2),
  },


})

export default BetBoardComponent
export { IBetBoardParams }
