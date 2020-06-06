import React from 'react';
import {Text, View} from 'react-native';
import {scale} from '../helpers/function';

const MineHeaderComponent = () => {
  return (
    <View
      style={{
        width: '100%',
        aspectRatio: 540 / 60,
        backgroundColor: '#2894FF',
        flexDirection: 'row',
        paddingHorizontal: scale(25),
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Text style={{color: '#ffffff', fontSize: scale(25)}}>{'<'}</Text>
      <Text style={{color: '#ffffff', fontSize: scale(25)}}>{'我的'}</Text>
      <Text>{'客服'}</Text>
    </View>
  );
};

export default MineHeaderComponent;
