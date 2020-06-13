import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scale } from '../helpers/function';

interface NavButtonProps {
  logo: string;
  title: string;
  onPress: () => any;
}

const NavButton = ({ logo = '', title = '?', onPress }: NavButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.navContainer]} >
        <Image resizeMode={'contain'} style={{ width: '65%', aspectRatio: 1 }} source={{ uri: logo }} />
        <Text style={{ paddingVertical: 5 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navContainer: {
    width: scale(85),
    aspectRatio: 85 / 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavButton;
