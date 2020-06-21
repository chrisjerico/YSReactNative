import React from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';

interface TouchableImageProps {
  pic: string;
  onPress: () => any;
  containerStyle?: ViewStyle
}

const TouchableImage = ({ onPress, pic, containerStyle }: TouchableImageProps) => {
  return (
    <TouchableOpacity style={containerStyle ? containerStyle : styles.container} onPress={onPress}>
      <FastImage style={styles.image} source={{ uri: pic }} resizeMode={'cover'} />
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
