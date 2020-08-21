import React from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
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
  imageContainerStyle?: ViewStyle[] | ViewStyle
  circleColor?: string;
  containerStyle?: ViewStyle[] | ViewStyle;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  titleContainerStyle?: ViewStyle;
  resizeMode?: 'cover' | 'contain';
  enableCircle?: boolean;
  showFlag?: boolean;
  hotIcon?: string;
}

const GameButton = (props: GameButtonProps) => {
  const {
    circleColor,
    imageContainerStyle,
    logo = '',
    title = '',
    subTitle = '',
    showSubTitle = false,
    onPress,
    containerStyle,
    titleStyle,
    subTitleStyle,
    titleContainerStyle,
    resizeMode = 'contain',
    enableCircle = true,
    showFlag,
    hotIcon = '',
  } = props
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.conatiner, containerStyle]}>
        {enableCircle ? (
          <View
            style={[
              styles.circleContainer,
              {
                backgroundColor: circleColor ? circleColor : '#ACD6FF',
              },
            ]}
          >
            <View style={[styles.imageContainer, imageContainerStyle]}>
              <FastImage
                style={styles.image}
                source={{ uri: logo }}
                resizeMode={resizeMode}
              />
              <FastImage
                source={{ uri: hotIcon }}
                style={[styles.image, { position: 'absolute' }]}
              />
            </View>
          </View>
        ) : (
            <View style={[styles.imageContainer, imageContainerStyle]}>
              <FastImage
                style={styles.image}
                source={{ uri: logo }}
                resizeMode={resizeMode}
              />
              <FastImage
                source={{ uri: hotIcon }}
                style={[styles.image, { position: 'absolute' }]}
              />
            </View>
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
        {showFlag && (
          <View style={styles.flagContainer}>
            <Text style={styles.flagText}>{'热门'}</Text>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
  imageContainer: {
    width: '75%',
    aspectRatio: 1,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    right: 0,
    top: scale(5),
    borderRadius: scale(5),
  },
  flagText: {
    color: '#ffffff',
    padding: scale(5),
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

export default GameButton
