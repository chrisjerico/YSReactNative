import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../tools/Scale'

interface AvatarProps {
  onPress?: () => any;
  uri: string;
  size?: number;
  containerStyle?: ViewStyle | ViewStyle[];
}

const Avatar = ({ onPress, uri, size = 100, containerStyle }: AvatarProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={containerStyle}>
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
    </TouchableOpacity>
  )
}

export default Avatar
