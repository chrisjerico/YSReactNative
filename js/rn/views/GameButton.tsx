import React from 'react';
import { ImageStyle, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import FastImage from 'react-native-fast-image';
import { scale } from '../helpers/function';

interface GameButtonProps {
  logo?: string;
  title?: string;
  subTitle?: string;
  showSubTitle?: boolean;
  onPress?: () => any;
  category?: string;
  gameId?: string;
  show?: boolean;
  imageStyle?: ImageStyle;
  circleColor?: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  resizeMode?: 'cover' | 'contain'
}

const GameButton = (props: GameButtonProps) => {
  const { circleColor, imageStyle, logo = 'logo', title = '?', subTitle = '?', showSubTitle = false, onPress = () => { }, containerStyle, titleStyle, subTitleStyle, resizeMode = 'cover' } = props;
  return (
    <TouchableOpacity style={[styles.conatiner, containerStyle]} onPress={onPress}>
      <View
        style={[
          styles.circleContainer,
          {
            backgroundColor: circleColor ? circleColor : '#ACD6FF',
          },
        ]}>
        <FastImage style={[styles.image, imageStyle]} source={{ uri: logo }} resizeMode={resizeMode} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={titleStyle}>{title.length > 0 ? title : '?'}</Text>
        {showSubTitle && <Text style={[styles.subTitle, subTitleStyle]} numberOfLines={1}>{subTitle}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    width: scale(150),
    height: scale(200),
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  circleContainer: {
    width: '70%',
    aspectRatio: 1,
    borderRadius: scale(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'flex-start',
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

export default GameButton;
