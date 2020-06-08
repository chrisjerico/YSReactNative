import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';
import {scale} from '../helpers/function';

const MineHeaderComponent = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LHTHomePage');
        }}>
        <Text style={styles.text}>{'<'}</Text>
      </TouchableOpacity>
      <Text style={styles.text}>{'我的'}</Text>
      <TouchableOpacity onPress={() => PushHelper.pushUserCenterType(19)}>
        <Text>{'客服'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 540 / 60,
    backgroundColor: '#2894FF',
    flexDirection: 'row',
    paddingHorizontal: scale(25),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: scale(25),
  },
});

export default MineHeaderComponent;
