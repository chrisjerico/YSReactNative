import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { scale } from '../../../tools/Scale'
import { UGColor } from '../../../theme/UGThemeColor'

interface IERect {
  title?: string, //名字
  titleStyle?: StyleProp<TextStyle> //文字风格
  odds?: string, //赔率
  oddsStyle?: StyleProp<TextStyle> //赔率风格
}

/**
 * 元素方格子
 * @constructor
 */
const ERect = ({
                 title,
                 titleStyle,
                 odds,
                 oddsStyle,
               }: IERect) => {


  return (
    <View key={title + odds}
          style={_styles.container}>
      <Text key={title}
            style={[_styles.title_text, titleStyle]}>{title}</Text>
      <Text key={odds}
            style={[_styles.odds_text, oddsStyle]}>{odds}</Text>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title_text: {
    fontSize: scale(22),
    color: UGColor.TextColor7,
    textAlign: 'center',
  },
  odds_text: {
    color: UGColor.TextColor7,
    fontSize: scale(18),
    textAlign: 'center',
  },

})

export default ERect
