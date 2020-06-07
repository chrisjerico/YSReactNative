import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PushHelper from '../../../public/define/PushHelper';
import {scale} from '../helpers/function';
import {placeholderLogo} from '../helpers/config';

interface TabCircleProps {
  logo?: string;
  mainTitle?: string;
  subTitle?: string;
  showSubTitle?: boolean;
  onPress?: any;
  category?: string;
  gameId?: string;
  show?: boolean;
}

const TabCircle = ({logo = placeholderLogo, mainTitle = '?', subTitle = '?', showSubTitle = false, onPress, category = '0', gameId = '0', show = true}: TabCircleProps) => {
  const goToCategory = () => PushHelper.pushCategory(category, gameId);
  return (
    <TouchableOpacity style={[styles.conatiner, show ? {} : {opacity: 0}]} onPress={onPress || goToCategory} activeOpacity={show ? 0.2 : 0}>
      <View style={styles.circleContainer}>
        <Image style={styles.image} source={{uri: logo}} resizeMode={'contain'} />
      </View>
      <View style={styles.titleContainer}>
        <Text>{mainTitle.length > 0 ? mainTitle : '?'}</Text>
        {showSubTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    width: scale(150),
    aspectRatio: 150 / 200,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  circleContainer: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: '#A6A6D2',
    borderRadius: scale(85),
  },
  titleContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 150 / 60,
  },
  subTitle: {
    color: '#999999',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: scale(85),
  },
});

export default TabCircle;
