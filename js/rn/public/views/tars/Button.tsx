import React, { memo } from 'react'
import { Image, StyleProp, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface Button {
  containerStyle?: StyleProp<ViewStyle>
  disabledContainerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  title?: string
  numberOfLines?: number
  onPress?: () => any
  disabled?: boolean
  logo?: string
  showLogo?: boolean
  logoStyle?: StyleProp<unknown>
  useFastImage?: boolean
}

const Button = ({ containerStyle, disabledContainerStyle, titleStyle, title, numberOfLines = 1, onPress, disabled = false, logo, showLogo = false, logoStyle, useFastImage = true }: Button) => {
  return (
    <TouchableWithoutFeedback onPress={disabled ? null : onPress}>
      <View style={disabled ? [styles.disabledContainer, disabledContainerStyle] : [styles.container, containerStyle]}>
        {showLogo && (useFastImage ? <FastImage source={{ uri: logo }} style={logoStyle} resizeMode={'contain'} /> : <Image source={{ uri: logo }} style={logoStyle} resizeMode={'contain'} />)}
        <UGText style={[styles.title, titleStyle]} numberOfLines={numberOfLines}>
          {title}
        </UGText>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {},
  disabledContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c6c6c6',
  },
})

export default memo(Button)
