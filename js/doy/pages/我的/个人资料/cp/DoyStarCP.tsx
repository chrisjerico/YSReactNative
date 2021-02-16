import React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { View } from "react-native-animatable"
import FastImage, { ImageStyle } from "react-native-fast-image"
import { sc375 } from "../../../../../rn/public/tools/Scale"
import { img_doy } from "../../../../../rn/Res/icon"

const sc = sc375

interface DoyStarCP {
  totalStarCnt?: number// 总共几颗星
  selectedStarCnt?: number// 选中几颗星
  size?: number//星星大小
  space?: number  // 星星间距
  unSelectDarkColor?: boolean//未选中星星是否深色

  containerStyle?: StyleProp<ViewStyle>
  starStyle?: StyleProp<ImageStyle>
}

export const DoyStarCP = (p: DoyStarCP) => {
  const { totalStarCnt = 5, selectedStarCnt = 0, size = sc(8), space = sc(2), unSelectDarkColor, } = p
  const { containerStyle, starStyle, } = p
  const unSelectIcon = unSelectDarkColor == true ? img_doy('星星_未激活(深)@3x') : img_doy('星星_未激活(浅)@3x')
  const containerWidth = size * totalStarCnt + space * (totalStarCnt - 1)

  const stars = []
  for (let i = 0; i < totalStarCnt; i++) {
    const uri = i < selectedStarCnt ? img_doy('星星@3x') : unSelectIcon
    stars.push(<FastImage source={{ uri }} style={[{ width: size, aspectRatio: 1, }, starStyle]} />)
  }
  return <View style={[{ flexDirection: 'row', justifyContent: 'space-between', width: containerWidth }, containerStyle]}>
    {stars}
  </View>
}