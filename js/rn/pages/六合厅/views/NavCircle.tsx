import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';
import {IGameIconListItem} from '../../../redux/model/home/IGameBean';
import {scale} from '../helpers/function';

interface NavCircleProps {
  containerStyle?: ViewStyle;
  logo?: string;
  title?: string;
  onPress?: () => any;
  nav: IGameIconListItem;
}

const NavCircle = ({logo = 'https://7478.com/img/img_xstj.1c6a8ad8.png', title = '?', containerStyle, onPress, nav}: NavCircleProps) => {
  const goToUserCenter = () => {
    nav && PushHelper.pushHomeGame(nav);
  };

  return (
    <TouchableOpacity style={[styles.container, containerStyle]} onPress={onPress || goToUserCenter}>
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

export default NavCircle;
