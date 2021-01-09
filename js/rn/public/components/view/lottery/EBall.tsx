import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { scale } from '../../../tools/Scale'
import { UGColor } from '../../../theme/UGThemeColor'
import LotteryBall, { ILotteryBall } from '../LotteryBall'
import { BallStyles } from '../../../../pages/hall/new/games/HallGameListComponent'

interface IEBall {
  ballType?: ILotteryBall //球风格
  odds?: string, //赔率
  oddsStyle?: StyleProp<TextStyle>, //赔率风格
  style?: StyleProp<ViewStyle>
}

/**
 * 元素球球，一个球、一个文字
 * @constructor
 */
const EBall = ({
                 ballType,
                 odds,
                 oddsStyle,
                 style
               }: IEBall) => {


  return (
    <View key={ballType?.ballNumber + odds}
          style={[
            _styles.container,
            style
          ]}>
      <LotteryBall key={ballType?.ballNumber}
                   {...ballType}/>
      <Text key={odds}
            style={[_styles.ball_odds, oddsStyle]}>{odds}</Text>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ball_odds: {
    flex: 1,
    color: UGColor.TextColor7,
    fontSize: scale(18),
    paddingHorizontal: scale(1),
    textAlign: 'center',
  },

})

export default EBall
export {IEBall}
