import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

interface CircleButtonProps {
  logo?: string;
  title?: string;
}

const CircleButton = ({logo = 'https://7478.com/img/img_xstj.1c6a8ad8.png', title = '?'}: CircleButtonProps) => (
  <TouchableOpacity style={{width: '25%', height: '50%', alignItems: 'center'}}>
    <Image resizeMode={'contain'} style={{width: '65%', aspectRatio: 1}} source={{uri: logo}} />
    <Text style={{paddingVertical: 5}}>{title}</Text>
  </TouchableOpacity>
);

export default CircleButton;
