import React from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { scale } from '../../tools/Scale'

interface GameButtonProps {
  logo?: string;
  title?: string;
  subTitle?: string;
  showSubTitle?: boolean;
  onPress?: () => any;
  category?: string;
  gameId?: string;
  show?: boolean;
  imageStyle?: any;
  circleColor?: string;
  containerStyle?: ViewStyle[] | ViewStyle;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  titleContainerStyle?: ViewStyle;
  resizeMode?: 'cover' | 'contain';
  enableCircle?: boolean;
}

const GameButton = (props: GameButtonProps) => {
  const {
    circleColor,
    imageStyle,
    logo = 'logo',
    title = '',
    subTitle = '',
    showSubTitle = false,
    onPress = () => { },
    containerStyle,
    titleStyle,
    subTitleStyle,
    titleContainerStyle,
    resizeMode = 'contain',
    enableCircle = true,
  } = props
  return (
    <TouchableOpacity
      style={[styles.conatiner, containerStyle]}
      onPress={onPress}
    >
      {enableCircle ? (
        <View
          style={[
            styles.circleContainer,
            {
              backgroundColor: circleColor ? circleColor : '#ACD6FF',
            },
          ]}
        >
          <FastImage
            style={[styles.image, imageStyle]}
            source={{ uri: logo }}
            resizeMode={resizeMode}
          />
        </View>
      ) : (
          <FastImage
            style={[styles.image, imageStyle]}
            source={{ uri: logo }}
            resizeMode={resizeMode}
          />
        )}
      <View style={[styles.titleContainer, titleContainerStyle]}>
        <View style={styles.textContainer}>
          <Text style={titleStyle} numberOfLines={1}>
            {title}
          </Text>
        </View>
        {showSubTitle && (
          <View style={styles.textContainer}>
            <Text style={[styles.subTitle, subTitleStyle]} numberOfLines={1}>
              {subTitle}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  conatiner: {
    width: scale(150),
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
    aspectRatio: 2,
  },
  subTitle: {
    color: '#999999',
  },
  image: {
    width: '75%',
    aspectRatio: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default GameButton