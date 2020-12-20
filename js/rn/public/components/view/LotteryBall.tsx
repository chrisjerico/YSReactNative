import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import {
  getColorfulBallColor,
  getHKballColor,
  getSQBallColor, getSZBallColor, getVegetableBallColor,
} from '../../../pages/common/LottoBetting/PlayVIew/lottoSetting'
import { anyEmpty } from '../../tools/Ext'
import { scale } from '../../tools/Scale'
import { UGColor } from '../../theme/UGThemeColor'
import FastImage from 'react-native-fast-image'
import React from 'react'
import { ugLog } from '../../tools/UgLog'

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
                       style,
                     }: ILotteryBall) => {

  const width = anyEmpty(size) ? scale(44) : size //球的大小
  let txColor = !anyEmpty(textColor) ? textColor : 'white' //文字的颜色
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
    ballUrl = getColorfulBallColor(ballNumber)
    round = 0
    txColor = UGColor.TextColor2
  } else if (type == BallType.sz) {
    ballUrl = getSZBallColor(ballNumber)
    round = 0
  } else if (type == BallType.vegetable) {
    ballUrl = getVegetableBallColor(ballNumber)
    round = 0
  } else {
    bColor = anyEmpty(ballColor) ? getHKballColor(ballNumber) : ballColor
    round = 999
  }

  /**
   * 绘制球
   * @param type 球的类型
   */
  const renderBalls = (type?: string) => {
    switch (type) {
      case BallType.colorful:
        return [
          <FastImage style={[
            _styles.colorful_ball_item,
            { width: width }]}
                     resizeMode={'contain'}
                     source={{ uri: ballUrl }}/>,
          <Text style={[_styles.ball_colorful_text, { color: txColor, fontSize: width * 3 / 7 }]}>{ballNumber}</Text>,
        ]
      case BallType.sz:
      case BallType.vegetable:
        return <FastImage style={[
          _styles.colorful_ball_item,
          { width: width }]}
                          resizeMode={'contain'}
                          source={{ uri: ballUrl }}/>
      default:
        return <Text style={[_styles.ball_text, { color: txColor, fontSize: width / 2 }]}>{ballNumber}</Text>
    }
  }

  return (
    <View style={[_styles.ball_item,
      {
        backgroundColor: bColor,
        borderRadius: round,
        width: width,
        margin: scale(2),
      },
      style]}>
      {
        renderBalls(type)
      }
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
    fontSize: scale(18),
    textAlign: 'center',
  },
  ball_colorful_text: {
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
  'vegetable': '蔬菜',
  'sz': '骰子',
}

export default LotteryBall
export { BallType }
