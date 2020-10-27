import React from 'react'
import { StyleProp, Text, TextStyle, View, ViewStyle, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../../public/tools/Scale'

interface CoverButtonProps {
  logo: string
  title?: string
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  onPress?: () => any
}

const CoverButton = ({ logo, title, containerStyle, titleStyle, onPress }: CoverButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[containerStyle]}>
        <FastImage source={{ uri: logo }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
        <Text style={[styles.title, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  title: {
    color: '#ffffff',
    position: 'absolute',
    left: scale(15),
    top: scale(15),
    width: '90%',
  },
})

export default CoverButton
