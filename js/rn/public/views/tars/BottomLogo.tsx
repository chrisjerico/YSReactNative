import React, { memo } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle, StyleProp, TextStyle } from 'react-native'
import { scale } from '../../tools/Scale'

interface BottomLogo {
  webName: string
  onPressPromotion: () => any
  onPressComputer: () => any
  version?: string
  debug?: boolean
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  subTitleStyle?: StyleProp<TextStyle>
}

const BottomLogo = ({ webName, onPressComputer, onPressPromotion, containerStyle, version, debug = true, titleStyle, subTitleStyle }: BottomLogo) => {
  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableWithoutFeedback onPress={onPressComputer}>
          <Text
            style={[
              {
                color: '#000000',
              },
              titleStyle,
            ]}>
            {'💻电脑版'}
          </Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressPromotion}>
          <Text
            style={[
              {
                color: '#000000',
              },
              titleStyle,
            ]}>
            {' 🎁优惠活动'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
      <Text
        style={[
          {
            color: '#000000',
            textAlign: 'center',
            paddingTop: scale(10),
          },
          subTitleStyle,
        ]}>
        {'COPYRIGHT © ' + webName + 'RESERVED'}
      </Text>
      {debug ? <Text style={{ color: '#000000', textAlign: 'center' }}>{'VERSION : ' + version}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: scale(30),
  },
})

export default memo(BottomLogo)
