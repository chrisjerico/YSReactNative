import {View, Text, StyleSheet} from "react-native"
import * as React from 'react'
import Button from "../../../../../../public/views/tars/Button";
import {scale} from "../../../../../../public/tools/Scale";
import {BALL_STYLES} from "../LotteryStyles";
import {getHKballColor} from "../../lottoSetting";
import {anyLength} from "../../../../../../public/tools/Ext";
import FastImage from "react-native-fast-image";
import { UGImageHost, useHtml5Image } from "../../../../../../Res/icon";
import { UGText } from '../../../../../../../doy/public/Button之类的基础组件/DoyButton'

const {img_assets} = useHtml5Image(UGImageHost.test5)

const BALL_TYPE = {
  ROUND_LINE: '圆形边框',
  ROUND_FILLED: '圆形实心',
  ROUND_COLORFUL: '圆形彩色',
  SQUARE_FILLED: '方形',
}

interface IBallItem {
  text?: string,
  ballStyle?: string
}

const _BALL_COLOR_RECT = {
  '00': '#E1D463',
  '01': '#E1D463',
  '02': '#008BF9',
  '03': '#4C4D51',
  '04': '#F47A00',
  '05': '#63D2D2',
  '06': '#420AFF',
  '07': '#AEA6A6',
  '08': '#FF0400',
  '09': '#770100',
  '10': '#2BC610',
}

//方形球
const _squareBall = (text: string) => {
  if (anyLength(text) < 2) {
    text = '0' + text
  }

  return _BALL_COLOR_RECT[text]
}

//圆形球
const _roundBall = (text: string) => {
  if (anyLength(text) < 2) {
    text = '0' + text
  }

  const redSet = ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "30", "34", "35", "40", "45", "46"]
  const blueSet = ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"]
  const greenSet = ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"]

  if (redSet.includes(text)) {
    return '#e23'
  } else if (blueSet.includes(text)) {
    return '#4bf'
  } else {
    return '#3b6'
  }
}

//圆形球图
const _roundBallPic = (text: string) => {
  if (anyLength(text) < 2) {
    text = '0' + text
  }

  const redSet = ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "30", "34", "35", "40", "45", "46"]
  const blueSet = ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"]
  const greenSet = ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"]

  if (redSet.includes(text)) {
    return img_assets('ball_red')
  } else if (blueSet.includes(text)) {
    return img_assets('ball_blue')
  } else {
    return img_assets('ball_green')
  }
}

/**
 * 绘制选择框
 * @param onPress
 */
const BallItem = ({text, ballStyle}: IBallItem) => {
  switch (ballStyle) {
    case BALL_TYPE.ROUND_LINE:
      return <View style={[BALL_STYLES.grid_ball_round,
        {
          borderColor: _roundBall(text),
        }]}>
        <UGText style={[_styles.ball_text,
          {color: _roundBall(text)}]}>{text}</UGText>
      </View>
    case BALL_TYPE.ROUND_FILLED:
      return <View style={[BALL_STYLES.grid_ball_round,
        {
          borderColor: _roundBall(text),
          backgroundColor: _roundBall(text)
        }]}>
        <UGText style={_styles.ball_text}>{text}</UGText>
      </View>
    case BALL_TYPE.SQUARE_FILLED:
      return <View style={[BALL_STYLES.grid_ball_rect,
        {
          borderColor: _squareBall(text),
          backgroundColor: _squareBall(text),
        }]}>
        <UGText style={_styles.ball_text}>{text}</UGText>
      </View>
    default:
      return <FastImage style={[BALL_STYLES.grid_ball_round, { borderWidth: 0 }]}
                        source={{uri: _roundBallPic(text)}}>
        <UGText style={[_styles.ball_text,
          {color: 'black'}]}>{text}</UGText>
      </FastImage>

  }
}

const _styles = StyleSheet.create({
    ball_text: {
      color: 'white',
      fontSize: scale(28),
      fontWeight: 'bold'
    },
  }
)

export {BALL_TYPE}
export default BallItem
