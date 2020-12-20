import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import {
  getColorfulBallColor,
  getHKballColor,
  getSQBallColor,
} from '../../../pages/common/LottoBetting/PlayVIew/lottoSetting'
import { anyEmpty } from '../../tools/Ext'
import { scale } from '../../tools/Scale'
import { UGColor } from '../../theme/UGThemeColor'
import FastImage from 'react-native-fast-image'
import React from 'react'

interface ILotteryBall {
  type?: string, //球的种类 BallType
  size?: number, //球的大小
  ballNumber?: string, //球的数值
  textColor?: string, //球的文字颜色
  ballColor?: string, //球的颜色
  style?: StyleProp<ViewStyle>
}

/**
 * 彩票的球，方格，圆形，纯色，花球
 * @constructor
 */
const LotteryBall = ({
                       type,
                       size,
                       ballNumber,
                       textColor,
                       ballColor,
                     }: ILotteryBall) => {

  const width = anyEmpty(size) ? scale(60) : size //球的大小
  const txColor = !anyEmpty(textColor) ? textColor : 'white' //文字的颜色
  let bColor //球的颜色
  let ballUrl //球的url
  let round //球的圆角

  if (type == BallType.square) {
    bColor = anyEmpty(ballColor) ? getSQBallColor(ballNumber) : ballColor
    round = scale(6)
  } else if (type == BallType.pure) {
    bColor = anyEmpty(ballColor) ? UGColor.BlueColor4 : ballColor
    round = 999
  } else if (type == BallType.colorful) {
    ballUrl = getColorfulBallColor(ballColor)
    round = 0
  } else {
    bColor = anyEmpty(ballColor) ? getHKballColor(ballNumber) : ballColor
    round = 999
  }

  return (
    <View style={[_styles.ball_item, {
      backgroundColor: bColor,
      borderRadius: round,
      width: width,
    }]}>
      {
        type == BallType.colorful ?
          <FastImage style={[
            _styles.colorful_ball_item,
            { width: size }]}
                     resizeMode={'contain'}
                     source={{ uri: ballUrl }}/> :
          null
      }
      <Text style={[_styles.ball_text, { color: txColor }]}>{ballNumber}</Text>
    </View>
  )
}

const _styles = StyleSheet.create({
  ball_item: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorful_ball_item: {
    aspectRatio: 1,
    position: 'absolute',
  },
  ball_text: {
    flex: 1,
    color: 'white',
    fontSize: scale(18),
    textAlign: 'center',
  },

})

/**
 * 球的种类
 */
const BallType = {
  'round': '圆球',
  'square': '方球',
  'colorful': '花球',
  'pure': '纯色球',
}

export default LotteryBall
export { BallType }
