import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { scale } from '../../../tools/Scale'
import { UGColor } from '../../../theme/UGThemeColor'
import { UGText } from '../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface IERect {
  title?: string, //名字
  titleStyle?: StyleProp<TextStyle> //文字风格
  odds?: string, //赔率
  oddsStyle?: StyleProp<TextStyle> //赔率风格
  containerStyle?: StyleProp<ViewStyle> //容器风格
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
                 containerStyle,
               }: IERect) => {
  const key = 'ERect = 元素方格子' + title

  return (
    <View key={key}
          style={[
            _styles.container,
            containerStyle
          ]}>
      <UGText key={key + 'title'}
            style={[_styles.title_text, titleStyle]}>{title}</UGText>
      <UGText key={key + 'odds'}
            style={[_styles.odds_text, oddsStyle]}>{odds}</UGText>
    </View>
  )
}

const _styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title_text: {
    fontSize: scale(24),
    color: UGColor.TextColor7,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  odds_text: {
    color: UGColor.TextColor7,
    fontSize: scale(18),
    paddingLeft: scale(2),
    textAlign: 'center',
  },

})

export default ERect
