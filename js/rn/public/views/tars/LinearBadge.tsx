import React, { memo } from 'react'
import { StyleSheet, Text, TextStyle, TouchableWithoutFeedback, ViewStyle, StyleProp, View } from 'react-native'
import { Icon } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { scale } from '../../tools/Scale'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface LinearBadgeProps {
  title: string
  colors: any[]
  onPress?: () => any
  showIcon?: boolean
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  size?: number
  showLogo?: boolean
  logoStyle?: StyleProp<ViewStyle>
  logo?: string
}

const LinearBadge = ({ title, colors, onPress, showIcon = true, containerStyle, textStyle, size = 1, showLogo, logoStyle, logo }: LinearBadgeProps) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={colors} // ['#9393FF', 'rgb(91, 91, 220)']
      style={[
        styles.container,
        {
          width: scale(125 * size),
          borderRadius: scale(50 * size),
        },
        containerStyle,
      ]}>
      {showLogo && (
        <View style={[styles.logo, logoStyle]}>
          <FastImage style={{ width: '100%', height: '100%' }} resizeMode={'contain'} source={{ uri: logo }} />
        </View>
      )}
      <UGText style={[styles.text, textStyle]} numberOfLines={1}>
        {title}
      </UGText>
      {showIcon && <Icon style={{ marginLeft: scale(5) }} type={'AntDesign'} name={'link'} size={scale(20)} color={'#ffffff'} />}
    </LinearGradient>
  </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
  container: {
    height: scale(33),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: scale(20)
  },
  logo: {
    width: scale(30),
    height: scale(30),
    marginRight: scale(10),
  },
})

export default memo(LinearBadge)
