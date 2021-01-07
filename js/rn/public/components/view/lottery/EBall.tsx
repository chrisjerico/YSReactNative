import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { scale } from '../../../tools/Scale'
import { UGColor } from '../../../theme/UGThemeColor'
import LotteryBall, { ILotteryBall } from '../LotteryBall'
import { BallStyles } from '../../../../pages/hall/new/games/HallGameListComponent'

interface IEBall {
  ballType?: ILotteryBall //球风格
  odds?: string, //赔率
  oddsStyle?: StyleProp<TextStyle> //赔率风格
}

/**
 * 元素球球，一个球、一个文字
 * @constructor
 */
const EBall = ({
                 ballType,
                 odds,
                 oddsStyle,
               }: IEBall) => {


  return (
    <View style={_styles.container}>
      <LotteryBall {...ballType}/>
      <Text numberOfLines={1}
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
    color: UGColor.TextColor7,
    fontSize: scale(18),
    paddingHorizontal: scale(1),
  },

})

export default EBall
export {IEBall}
