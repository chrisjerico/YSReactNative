import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';

interface CircleButtonProps {
  uri?: string;
  title?: string;
}

const CircleButton = ({uri = 'https://7478.com/img/img_xstj.1c6a8ad8.png', title = '小心推荐'}: CircleButtonProps) => (
  <TouchableOpacity style={{width: '25%', height: '50%', alignItems: 'center'}}>
    <Image resizeMode={'contain'} style={{width: '65%', aspectRatio: 1}} source={{uri}} />
    <Text style={{paddingVertical: 5}}>{title}</Text>
  </TouchableOpacity>
);

export default CircleButton;
