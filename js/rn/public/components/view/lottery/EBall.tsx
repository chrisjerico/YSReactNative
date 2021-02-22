import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { scale } from '../../../tools/Scale'
import { UGColor } from '../../../theme/UGThemeColor'
import LotteryBall, { ILotteryBall } from '../LotteryBall'
import { anyEmpty } from '../../../tools/Ext'
import { UGText } from '../../../../../doy/public/Button之类的基础组件/DoyButton'

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
  const key = 'EBall=' + ballType?.ballNumber

  return (
    <View key={key}
          style={[
            _styles.container,
            style
          ]}>
      <LotteryBall key={key + 'ct'}
                   {...ballType}/>
      {
        !anyEmpty(odds) && <UGText key={key + 'text'}
              style={[_styles.ball_odds, oddsStyle]}>{odds}</UGText>
      }
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
