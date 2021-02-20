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
  } = UseBetBoard()

  useEffect(() => {
    setLockBoard(lockedItem)
  }, [])

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

  //拉条步进大小
  const sliderStep = systemInfo?.activeReturnCoinRatio / 20
  /**
   * 绘制退水
   */
  const renderSliderArea = () => <View key={'renderSliderArea'}
                                       style={_styles.extra_container}
                                       pointerEvents={'box-none'}>
    {
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

          <Text key={'renderSliderArea slider tx'}
                style={_styles.sub_title_text}>{`退水: ${sliderValue?.toFixed(2)}%`}</Text>

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

    }
    {
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
    }
  </View>

  /**
   * 追号
   */
  const renderChaseNumber = () => {
    if (systemInfo?.chaseNumber != '1') return null

    ugLog('systemInfo?.chaseNumber', systemInfo?.chaseNumber)
    ugLog('systemInfo?.reBetShareModel', reBetShareModel)

    return !dicNull(reBetShareModel)
      ?
      <TouchableWithoutFeedback onPress={() => {
        UGStore.dispatch({ type: 'reset', betShareModel: reBetShareModel })
      }}>
        <Text style={_styles.bet_again}>追号</Text>
      </TouchableWithoutFeedback>
      :
      <Text style={[
        _styles.bet_again,
        {
          backgroundColor: UGColor.TextColor7,
          color: UGColor.TextColor4,
        },
      ]}>追号</Text>
  }

  /**
   * 机选
   */
  const renderRandomSelected = () => {
    return <TouchableWithoutFeedback onPress={() => DeviceEventEmitter.emit(EmitterTypes.RANDOM_SELECT_LOTTERY)}>
      <Text style={_styles.bet_again}>机选</Text>
    </TouchableWithoutFeedback>
  }

  /**
   * 绘制输入功能区
   */
  const renderInputArea = () => {

    return <View key={'renderInputArea'}
                 style={_styles.input_container}>

      <View key={'renderInputArea 追号 机选'}>
        {renderChaseNumber()}
        {renderRandomSelected()}
      </View>

      <View key={'renderInputArea middle'}
            style={_styles.middle_container}>
        <View key={'renderInputArea sub middle'}
              style={_styles.bet_info}>
          <Text key={'renderInputArea middle 已选中'}
                style={_styles.lottery_count_hint}>已选中</Text>
          <Text key={'renderInputArea middle 0'}
                style={_styles.lottery_count_count}>{mapTotalCount(ballSelected)}</Text>
          <Text key={'renderInputArea middle 注'}
                style={_styles.lottery_count_hint}>注</Text>
          <View key={'renderInputArea ct'}
                style={CommStyles.flex}/>
          <TouchableWithoutFeedback key={'renderInputArea 筹码'}
                                    onPress={() => setShowChip(!showChip)}>
            <Text key={'renderInputArea 筹码'}
                  style={_styles.lottery_count_chip}>筹码</Text>
          </TouchableWithoutFeedback>
        </View>
        <TextInput key={'renderInputArea input'}
                   value={UGStore.globalProps?.inputMoney?.toString()}
                   style={_styles.input_text}
                   maxLength={11}
                   onChangeText={(s) => {
                     UGStore.dispatch({ type: 'reset', inputMoney: Number(s) })
                   }}
                   keyboardType={'numeric'}/>
      </View>

      <View key={'renderInputArea input 下注 重置'}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={checkShowBetPayment}>
          <Text key={'renderInputArea input 下注'}
                style={_styles.start_bet}>下注</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => {
          ugLog('clear selected')
          DeviceEventEmitter.emit(EmitterTypes.CLEAR_SELECT_LOTTERY)
          UGStore.dispatch({
            type: 'reset',
            selectedData: new Map<string, Map<string, Map<string, SelectedPlayModel>>>(),
          })
        }
        }>
          <Text key={'renderInputArea input 重置'}
                style={_styles.start_reset}>重置</Text>
        </TouchableWithoutFeedback>
      </View>

    </View>
  }

  /**
   * 绘制封盘中
   */
  const renderLock = (item?: string) => {
    return <View key={'renderLock'}
                 style={_styles.lock_container}>
      <View key={'renderLock sub'}
            style={_styles.lock_content}>
        <Text key={'renderLock 封盘中'}
              style={_styles.lock_text}>
          {item}
        </Text>
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
        {systemInfo?.activeReturnCoinStatus && renderSliderArea()}
        {renderInputArea()}
        {lockBoard?.locked ? renderLock(lockBoard?.hintText) : null}
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
  tab_title_tb: {
    width: '100%',
    alignItems: 'center',
  },
  tab_title: {
    color: UGColor.TextColor2,
    fontSize: scale(24),
    padding: scale(6),
  },
  tab_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.LineColor3,
    borderRadius: scale(8),
  },
  sv_container: {
    flex: 1,
  },
  tab_title_content: {
    flexDirection: 'row',
  },
  tab_item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(4),
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
  },
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },
  slider: {
    width: scale(200),
    height: scale(56),
    marginHorizontal: scale(4),
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

export default BetBoardComponent
export { IBetBoardParams }
