import React from 'react';
import {View, Text} from 'react-native';
import {scale} from '../helpers/function';
import {useSafeArea} from 'react-native-safe-area-context';

const MineHeaderComponent = () => {
  const {top} = useSafeArea();

  return (
    <View
      style={{
        paddingTop: top,
        width: '100%',
        height: 44 + top,
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
