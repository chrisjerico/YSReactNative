import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';
import {defaultMineButtonImage} from '../helpers/config';
import {scale} from '../helpers/function';

interface MineButtonProps {
  title?: string;
  logo?: string;
  userCenterType?: number;
  onPress?: () => any;
}

const MineButton = ({title = 'title', logo = defaultMineButtonImage, userCenterType = 0, onPress}: MineButtonProps) => {
  const goToUserCenter = () => {
    PushHelper.pushUserCenterType(userCenterType);
  };

  return (
    <TouchableOpacity
      style={{
        width: scale(158),
        aspectRatio: 158 / 60,
        backgroundColor: '#ff861b',
        borderRadius: scale(10),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={onPress || goToUserCenter}>
      <Text style={{paddingRight: scale(5)}}>{title}</Text>
      <Image
        style={{width: '15%', aspectRatio: 1, paddingLeft: scale(5)}}
        resizeMode={'contain'}
        source={{
          uri: logo,
        }}
      />
    </TouchableOpacity>
  );
};

export default MineButton;
