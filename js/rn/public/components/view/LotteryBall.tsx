import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import {
  getColorfulBallPic,
  getHKballColor,
  getSQBallColor,
  getSZBallPic,
  getVegetableBallPic,
} from '../../../pages/common/LottoBetting/PlayVIew/lottoSetting'
import { anyEmpty } from '../../tools/Ext'
import { scale } from '../../tools/Scale'
import { UGColor } from '../../theme/UGThemeColor'
import FastImage from 'react-native-fast-image'
import React from 'react'
import { BallType } from '../../../pages/bet/const/LotteryConst'

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

  const key = 'renderBalls' + type + ballNumber

  const width = anyEmpty(size) ? scale(40) : size //球的大小
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
    ballUrl = getColorfulBallPic(ballNumber)
    round = 0
    txColor = UGColor.TextColor2
  } else if (type == BallType.sz) {
    ballUrl = getSZBallPic(ballNumber)
    round = 0
  } else if (type == BallType.vegetable) {
    ballUrl = getVegetableBallPic(ballNumber)
    round = 0
  } else if (type == BallType.black_white) {
    txColor = UGColor.TextColor1
    bColor = anyEmpty(ballColor) ? '#eee' : ballColor
    round = 999
  } else if (type == BallType.rectangle) {
    txColor = 'white'
    bColor = anyEmpty(ballColor) ? UGColor.linkColor1 : ballColor
    round = scale(4)
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
          <FastImage key={key + ballUrl}
                     style={[
                       _styles.colorful_ball_item,
                       { width: width }]}
                     resizeMode={'contain'}
                     source={{ uri: ballUrl }}/>,
          <Text key={key}
                style={[
                  _styles.ball_colorful_text,
                  { color: txColor, fontSize: width * 3 / 7 },
                ]}>{ballNumber}</Text>,
        ]
      case BallType.sz:
      case BallType.vegetable:
        return <FastImage key={key + ballUrl}
                          style={[
                            _styles.colorful_ball_item,
                            { width: width }]}
                          resizeMode={'contain'}
                          source={{ uri: ballUrl }}/>
      default:
        return <Text key={key + 'text'}
                     style={[_styles.ball_text,
                       { color: txColor, fontSize: width * 4 / 7 }]}>{ballNumber}</Text>
    }
  }

  return (
    <View key={key + 'content'}
          style={[_styles.ball_item,
            {
              backgroundColor: bColor,
              borderRadius: round,
              width: width,
              margin: scale(1),
            },
            type == BallType.rectangle ? { aspectRatio: 1.4, width: null, height: width } : null,
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
    fontWeight: 'bold',
  },
  ball_colorful_text: {
    fontSize: scale(18),
    textAlign: 'center',
  },

})

export default LotteryBall
export { ILotteryBall }
