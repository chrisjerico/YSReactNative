import React from 'react'
import { View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../tools/Scale'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface AvatarProps {
  onPress?: () => any;
  uri: string;
  size?: number;
  containerStyle?: ViewStyle | ViewStyle[];
}

const Avatar = ({ onPress, uri, size = 100, containerStyle }: AvatarProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={containerStyle}>
        <FastImage
          source={{ uri: uri }}
          style={{
            width: scale(size),
            aspectRatio: 1,
            borderRadius: scale(size),
            backgroundColor: '#9D9D9D',
          }}
          resizeMode={'contain'}
        />
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Avatar
