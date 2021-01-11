import { StyleSheet, Text, TextInput, View } from 'react-native'
import * as React from 'react'
import { useEffect } from 'react'
import { scale } from '../../../public/tools/Scale'
import Icon from 'react-native-vector-icons/FontAwesome'
import { UGColor } from '../../../public/theme/UGThemeColor'
import UseLhcBoard from './UseLhcBoard'
import { IBetBoardParams } from '../const/LotteryConst'
import { Slider } from 'react-native-elements'
import { Skin1 } from '../../../public/theme/UGSkinManagers'


/**
 * 彩票下注 功能面板
 *
 * @param navigation
 * @constructor
 */
const BetBoardComponent = ({ style }: IBetBoardParams) => {

  const {
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
  const renderSliderArea = () => <View style={_styles.slider_container}>

    <Icon size={scale(28)}
          onPress={() => {
          }}
          color={'white'}
          name={'chevron-down'}/>

    <Text style={_styles.sub_title_text}>{'退水: 0%'}</Text>

    <Icon size={scale(36)}
          color={'white'}
          name={'plus-circle'}/>

    <Slider
      style={_styles.slider}
      minimumValue={0}
      maximumValue={100}
      minimumTrackTintColor={Skin1.themeColor}
      thumbTintColor={Skin1.themeColor}
      maximumTrackTintColor={UGColor.LineColor4}/>

    <Icon size={scale(36)}
          color={'white'}
          name={'minus-circle'}/>
  </View>

  /**
   * 绘制输入功能区
   */
  const renderInputArea = () => <View style={_styles.input_container}>

    <View>
      <Text style={_styles.bet_again}>追号</Text>
      <Text style={_styles.bet_again}>机选</Text>
    </View>

    <View style={_styles.middle_container}>
      <View style={_styles.bet_info}>
        <Text style={_styles.lottery_count_hint}>已选中</Text>
        <Text style={_styles.lottery_count_hint}>0</Text>
        <Text style={_styles.lottery_count_hint}>注</Text>
        <Text style={_styles.lottery_count_chip}>筹码</Text>
      </View>
      <TextInput style={_styles.input_text}
                 keyboardType={'numeric'}/>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={_styles.start_bet}>下注</Text>
      <Text style={_styles.start_reset}>重置</Text>
    </View>

  </View>


  return (
    <View style={style}>
      {renderSliderArea()}
      {renderInputArea()}
    </View>

  )
}

const _styles = StyleSheet.create({
  slider_container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UGColor.BackgroundColor5,
    padding: scale(12),
    borderTopLeftRadius: scale(16),
    borderTopRightRadius: scale(16),
  },
  sub_title_text: {
    flex: 1,
    color: 'white',
    fontSize: scale(24),
    paddingHorizontal: scale(16),
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
    backgroundColor: UGColor.BackgroundColor6,
    padding: scale(12),
  },
  middle_container: {
    paddingHorizontal: scale(8),
  },
  lottery_count_hint: {
    color: 'white',
    fontSize: scale(24),
    paddingHorizontal: scale(16),
    textAlign: 'right',
  },
  lottery_count_chip: {
    color: 'white',
    fontSize: scale(24),
    backgroundColor: UGColor.GreenColor5,
    borderRadius: scale(4)

  },
  lottery_count_number: {
    color: 'white',
    fontSize: scale(24),
    paddingHorizontal: scale(16),
    textAlign: 'right',
  },
  input_text: {
    fontSize: scale(24),
    backgroundColor: 'white',
    color: UGColor.TextColor2,
    borderRadius: scale(12),
  },
  bet_again: {
    fontSize: scale(24),
    backgroundColor: UGColor.YellowColor3,
    color: 'white',
    borderRadius: scale(4),
    width: scale(88),
    paddingVertical: scale(6),
    marginVertical: scale(4),
    textAlign: 'center',
  },
  start_bet: {
    fontSize: scale(24),
    backgroundColor: 'white',
    color: UGColor.TextColor2,
    borderRadius: scale(12),
  },
  start_reset: {
    fontSize: scale(24),
    backgroundColor: 'white',
    color: UGColor.TextColor2,
    borderRadius: scale(12),
  },
  bet_info: {
    flexDirection: 'row',
    alignItems: 'center',
  },


})

export default BetBoardComponent
