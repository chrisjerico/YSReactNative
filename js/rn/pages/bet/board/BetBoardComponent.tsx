import { StyleProp, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewStyle } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../public/tools/Scale'
import Icon from 'react-native-vector-icons/FontAwesome'
import { UGColor } from '../../../public/theme/UGThemeColor'
import UseLhcBoard, { CHIP_OPTION } from './UseLhcBoard'
import { Slider } from 'react-native-elements'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import CommStyles from '../../base/CommStyles'
import FastImage from 'react-native-fast-image'
import { anyEmpty } from '../../../public/tools/Ext'

/**
 * 彩票功能区入参
 */
interface IBetBoardParams {
  locked?: boolean // 是否封盘中
  lockStr?: string // 封盘文字提醒
  style?: StyleProp<ViewStyle>
}

/**
 * 彩票下注 功能面板
 *
 * @param navigation
 * @constructor
 */
const BetBoardComponent = ({ locked, lockStr, style }: IBetBoardParams) => {

  const {
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
  } = UseLhcBoard()

  useEffect(() => {

  }, [])

  /**
   * 绘制退水
   */
  const renderSliderArea = () => <View key={'renderSliderArea'}
                                       style={_styles.extra_container}
                                       pointerEvents={'box-none'}>
    {
      showSlider ?
        <View key={'renderSliderArea slider'}
              style={_styles.slider_container}>

          <Icon key={'renderSliderArea slider icon'}
                size={scale(28)}
                onPress={() => {
                  setShowSlider(!showSlider)
                }}
                style={_styles.slider_arrow}
                color={'white'}
                name={'chevron-down'}/>

          <Text key={'renderSliderArea slider tx'}
                style={_styles.sub_title_text}>{'退水: 0%'}</Text>

          <Icon key={'renderSliderArea slider icon2'}
                size={scale(48)}
                color={'white'}
                style={_styles.slider_plus}
                name={'plus-circle'}/>

          <Slider
            key={'renderSliderArea slider bar'}
            style={_styles.slider}
            minimumValue={0}
            maximumValue={systemInfo?.activeReturnCoinRatio ?? 0}
            minimumTrackTintColor={Skin1.themeColor}
            thumbTintColor={Skin1.themeColor}
            maximumTrackTintColor={UGColor.LineColor4}/>

          <Icon key={'renderSliderArea slider icon 3'}
                size={scale(48)}
                color={'white'}
                style={_styles.slider_minus}
                name={'minus-circle'}/>
        </View> :
        <View key={'renderSliderArea slider arrow up'}>
          <Icon key={'renderSliderArea slider icon up'}
                size={scale(36)}
                style={_styles.slider_button}
                onPress={() => {
                  setShowSlider(!showSlider)
                }}
                color={Skin1.themeColor}
                name={'chevron-up'}/>
        </View>

    }
    {
      showChip ?
        <View key={'renderSliderArea chip'}
              style={_styles.chip_container}>
          <View key={'renderSliderArea chip sub'}
                style={_styles.chip_content}>
            {
              Object.keys(CHIP_OPTION).map((money) =>
                <TouchableOpacity key={'renderSliderArea chip' + money}
                                  onPress={() => setInputMoney(money == 'c' ? '0' : money)}>
                  <FastImage key={'renderSliderArea chip' + money}
                             source={{ uri: CHIP_OPTION[money] }}
                             style={_styles.chip_img}
                             resizeMode={'contain'}/>
                </TouchableOpacity>)
            }
          </View>
        </View> :
        null
    }
  </View>
  /**
   * 绘制输入功能区
   */
  const renderInputArea = () => <View key={'renderInputArea'}
                                      style={_styles.input_container}>

    <View key={'renderInputArea 追号 机选'}>
      <Text style={_styles.bet_again}>追号</Text>
      <Text style={_styles.bet_again}>机选</Text>
    </View>

    <View key={'renderInputArea middle'}
          style={_styles.middle_container}>
      <View key={'renderInputArea sub middle'}
            style={_styles.bet_info}>
        <Text key={'renderInputArea middle 已选中'}
              style={_styles.lottery_count_hint}>已选中</Text>
        <Text key={'renderInputArea middle 0'}
              style={_styles.lottery_count_count}>0</Text>
        <Text key={'renderInputArea middle 注'}
              style={_styles.lottery_count_hint}>注</Text>
        <View key={'renderInputArea ct'}
              style={CommStyles.flex}/>
        <TouchableOpacity key={'renderInputArea 筹码'}
                          onPress={() => setShowChip(!showChip)}>
          <Text key={'renderInputArea 筹码'}
                style={_styles.lottery_count_chip}>筹码</Text>
        </TouchableOpacity>
      </View>
      <TextInput key={'renderInputArea input'}
                 style={_styles.input_text}
                 defaultValue={inputMoney}
                 onChangeText={(s) => setInputMoney(s)}
                 keyboardType={'numeric'}/>
    </View>

    <View key={'renderInputArea input 下注 重置'}
          style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text key={'renderInputArea input 下注'}
            style={_styles.start_bet}>下注</Text>
      <Text key={'renderInputArea input 重置'}
            style={_styles.start_reset}>重置</Text>
    </View>

  </View>

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
          style={[_styles.bet_container, style]}>
      {systemInfo?.activeReturnCoinStatus && renderSliderArea()}
      {renderInputArea()}
      {
        locked ?
          renderLock(lockStr) :
          null
      }
    </View>
  )
}

const _styles = StyleSheet.create({
  bet_container: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'flex-end',
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
    borderRadius: scale(8),
    paddingVertical: scale(8),
    paddingHorizontal: scale(30),
  },
  tab_title_item_text: {
    color: UGColor.TextColor3,
    fontSize: scale(22),
    paddingLeft: scale(6),
  },
  slider: {
    width: scale(220),
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
