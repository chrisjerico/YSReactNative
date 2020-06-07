import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';
import {defaultMineListLogo} from '../helpers/config';
import {scale} from '../helpers/function';

interface MineListProps {
  logo?: string;
  title?: string;
  userCenterType?: number;
  onPress?: () => any;
}

const MineList = ({logo = defaultMineListLogo, title = '我的钱包', userCenterType = 0, onPress}: MineListProps) => {
  const goToUserCenter = () => {
    PushHelper.pushUserCenterType(userCenterType);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress || goToUserCenter}>
      <View style={styles.imageContainer}>
        <Image resizeMode={'contain'} style={styles.image} source={{uri: logo}} />
        <Text style={[styles.text, {paddingLeft: scale(25)}]}>{title}</Text>
      </View>
      <Text style={styles.text}>{'>'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 490 / 75,
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: 1,
    paddingHorizontal: scale(25),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  image: {
    width: scale(25),
    aspectRatio: 1,
  },
  text: {
    fontSize: scale(25),
  },
});

export default MineList;
