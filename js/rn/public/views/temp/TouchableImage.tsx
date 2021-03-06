import React from 'react';
import { Image, StyleSheet, View, ViewStyle, TouchableWithoutFeedback } from 'react-native';
import FastImage from 'react-native-fast-image';

interface TouchableImageProps {
  pic: string;
  onPress: () => any;
  containerStyle?: ViewStyle | ViewStyle[];
  resizeMode?: 'cover' | 'contain' | 'stretch';
  enableFastImage?: boolean;
  onLoad?: (event: any) => any;
  onLoadStart?: () => any;
  onLoadEnd?: () => any;
  onError?: () => any;
}

const TouchableImage = ({ onPress, pic, containerStyle, resizeMode = 'cover', enableFastImage = true, onLoad, onLoadStart, onLoadEnd, onError }: TouchableImageProps) => {
  const ImageComponent = enableFastImage ? FastImage : Image
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, containerStyle]}>
        <ImageComponent style={styles.image} source={{ uri: pic }} resizeMode={resizeMode} onLoad={onLoad} onLoadStart={onLoadStart} onLoadEnd={onLoadEnd} onError={onError} />
      </View>
    </TouchableWithoutFeedback>
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
