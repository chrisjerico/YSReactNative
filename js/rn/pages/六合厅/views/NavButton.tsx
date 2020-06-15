import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, ViewStyle, View } from 'react-native';
import { IGameIconListItem } from '../../../redux/model/home/IGameBean';
import { scale } from '../helpers/function';

interface NavButtonProps {
  containerStyle?: ViewStyle;
  logo: string;
  title: string;
  onPress: () => any;
  nav: IGameIconListItem;
}

const NavButton = ({ logo = '', title = '?', containerStyle, onPress, nav }: NavButtonProps) => {
  return (
    <TouchableOpacity style={styles.navContainer} onPress={onPress}>
      <View style={[styles.container, containerStyle]} >
        <Image resizeMode={'contain'} style={{ width: '65%', aspectRatio: 1 }} source={{ uri: logo }} />
        <Text style={{ paddingVertical: 5 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    width: '25%',
    height: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    width: scale(85),
    aspectRatio: 85 / 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavButton;
