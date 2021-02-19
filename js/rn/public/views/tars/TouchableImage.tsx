import React from 'react'
import { Image, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { FastImagePlaceholder, ImagePlaceholder } from '../../../pages/经典/tools/ImagePlaceholder'

interface TouchableImageProps {
  pic: string
  onPress?: () => any
  containerStyle?: StyleProp<ViewStyle>
  resizeMode?: 'cover' | 'contain' | 'stretch'
  enableFastImage?: boolean
  onLoad?: (event: any) => any
  onLoadStart?: () => any
  onLoadEnd?: () => any
  onError?: () => any
}

const TouchableImage = ({ onPress, pic, containerStyle, resizeMode = 'cover', enableFastImage = true, onLoad, onLoadStart, onLoadEnd, onError }: TouchableImageProps) => {
  const ImageComponent = enableFastImage ? FastImagePlaceholder : ImagePlaceholder
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <ImageComponent style={styles.image} source={{ uri: pic }} resizeMode={resizeMode} onLoad={onLoad} onLoadStart={onLoadStart} onLoadEnd={onLoadEnd} onError={onError} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default TouchableImage
