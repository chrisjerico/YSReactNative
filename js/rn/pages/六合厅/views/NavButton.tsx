import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {IGameIconListItem} from '../../../redux/model/home/IGameBean';
import {scale} from '../helpers/function';

interface NavButtonProps {
  containerStyle?: ViewStyle;
  logo: string;
  title: string;
  onPress: () => any;
  nav: IGameIconListItem;
}

const NavButton = ({logo = '', title = '?', containerStyle, onPress, nav}: NavButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress}>
      <Image resizeMode={'contain'} style={{width: '65%', aspectRatio: 1}} source={{uri: logo}} />
      <Text style={{paddingVertical: 5}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(85),
    aspectRatio: 85 / 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavButton;
