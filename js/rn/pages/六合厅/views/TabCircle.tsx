import React from 'react';
import {Image, ImageStyle, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {placeholderLogo} from '../helpers/config';
import {scale} from '../helpers/function';

interface TabCircleProps {
  logo?: string;
  mainTitle?: string;
  subTitle?: string;
  showSubTitle?: boolean;
  onPress?: (props: TabCircleProps) => any;
  category?: string;
  gameId?: string;
  show?: boolean;
  imageStyle?: ImageStyle;
  backgroundColor?: string;
}

const TabCircle = (props: TabCircleProps) => {
  const {backgroundColor, imageStyle, logo = placeholderLogo, mainTitle = '?', subTitle = '?', showSubTitle = false, onPress = () => {}, show = true} = props;
  return (
    <TouchableOpacity style={[styles.conatiner, show ? {} : {opacity: 0}]} activeOpacity={show ? 0.2 : 0} onPress={() => onPress && onPress(props)}>
      <View
        style={[
          styles.circleContainer,
          {
            backgroundColor: backgroundColor ? backgroundColor : '#ACD6FF',
          },
        ]}>
        <Image style={[styles.image, imageStyle]} source={{uri: logo}} resizeMode={'contain'} />
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
    borderRadius: scale(85),
    justifyContent: 'center',
    alignItems: 'center',
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
    width: '75%',
    height: '75%',
    borderRadius: scale(85),
  },
});

export default TabCircle;
