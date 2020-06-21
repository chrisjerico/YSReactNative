import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from '../../../helpers/function';
import { IGameIconListItem } from '../../../redux/model/home/IGameBean';

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
        <FastImage resizeMode={'contain'} style={{ width: '65%', aspectRatio: 1 }} source={{ uri: logo }} />
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
