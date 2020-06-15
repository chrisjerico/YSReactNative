import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';

interface BottomToolProps {
  logo: string;
  onPress: () => any;
}
const BottomTool = ({logo, onPress}: BottomToolProps) => (
  <TouchableOpacity style={styles.toolContainer} onPress={onPress}>
    <Image style={styles.image} source={{uri: logo}} resizeMode={'contain'} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolContainer: {
    width: '32%',
    aspectRatio: 165 / 85,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default BottomTool;
