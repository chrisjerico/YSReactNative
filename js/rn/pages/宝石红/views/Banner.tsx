import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

interface BannerProps {
  pic: string;
  onPress: () => any;
}

const Banner = ({onPress, pic}: BannerProps) => {
  return (
    <TouchableOpacity style={styles.bannerContainer} onPress={onPress}>
      <Image style={styles.bannerImage} source={{uri: pic}} resizeMode={'cover'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 217,
  },
  bannerContainer: {
    flex: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});

export default Banner;
