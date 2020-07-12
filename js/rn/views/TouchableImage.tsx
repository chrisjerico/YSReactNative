import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle, Image } from 'react-native';
import FastImage from 'react-native-fast-image';

interface TouchableImageProps {
  pic: string;
  onPress: () => any;
  containerStyle?: ViewStyle;
  resizeMode?: 'cover' | 'contain'
  enableFastImage?: boolean
}

const TouchableImage = ({ onPress, pic, containerStyle, resizeMode = 'cover', enableFastImage = true }: TouchableImageProps) => {
  const ImageComponent = enableFastImage ? FastImage : Image
  return (
    <TouchableOpacity style={containerStyle ? containerStyle : styles.container} onPress={onPress}>
      <ImageComponent style={styles.image} source={{ uri: pic }} resizeMode={resizeMode} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default TouchableImage;
