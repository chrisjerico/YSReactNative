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
import AntDesign from 'react-native-vector-icons/AntDesign'

interface GameButtonProps {
  logo?: string;
  title?: string;
  subTitle?: string;
  showSubTitle?: boolean;
  onPress?: () => any;
  category?: string;
  gameId?: string;
  show?: boolean;
  imageContainerStyle?: ViewStyle[] | ViewStyle;
  circleColor?: string;
  containerStyle?: ViewStyle[] | ViewStyle;
  titleStyle?: TextStyle;
  subTitleStyle?: TextStyle;
  titleContainerStyle?: ViewStyle;
  resizeMode?: 'cover' | 'contain';
  enableCircle?: boolean;
  showRightTopFlag?: boolean;
  showCenterFlag?: boolean;
  flagIcon?: string;
  showSecondLevelIcon?: boolean;
  secondLevelIconContainerStyle?: ViewStyle | ViewStyle;
  showUnReadMsg?: boolean;
  unreadMsg?: number;
  localLogo?: any;
  useLocalLogo?: boolean;
}

interface DefaultFlag {
  center: boolean;
}

const DefaultFlag = ({ center }: DefaultFlag) => {
  if (center) {
    return (
      <View style={styles.centerFlagContainer}>
        <View style={styles.flag}>
          <Text style={styles.flagText}>{'热门'}</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View
        style={[
          styles.flag,
          {
            position: 'absolute',
            right: 0,
            top: scale(5),
          },
        ]}
      >
        <Text style={styles.flagText}>{'热门'}</Text>
      </View>
    )
  }
}

const GameButton = (props: GameButtonProps) => {
  const {
    circleColor,
    imageContainerStyle,
    logo,
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
    showRightTopFlag,
    showCenterFlag,
    flagIcon,
    showSecondLevelIcon,
    secondLevelIconContainerStyle,
    showUnReadMsg = false,
    unreadMsg,
    localLogo,
    useLocalLogo = false
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
                source={useLocalLogo ? localLogo : { uri: logo }}
                resizeMode={resizeMode}
              />
              {showCenterFlag &&
                (flagIcon ? (
                  <FastImage
                    source={{ uri: flagIcon }}
                    style={[styles.image, { position: 'absolute' }]}
                  />
                ) : (
                    <DefaultFlag center={true} />
                  ))}
              {showSecondLevelIcon && (
                <AntDesign
                  name={'appstore1'}
                  style={[styles.secondLevelIcon, secondLevelIconContainerStyle]}
                  size={scale(25)}
                />
              )}
            </View>
          </View>
        ) : (
            <View style={[styles.imageContainer, imageContainerStyle]}>
              <FastImage
                style={styles.image}
                source={useLocalLogo ? localLogo : { uri: logo }}
                resizeMode={resizeMode}
              />
              {showCenterFlag &&
                (flagIcon ? (
                  <FastImage
                    source={{ uri: flagIcon }}
                    style={[styles.image, { position: 'absolute' }]}
                  />
                ) : (
                    <DefaultFlag center={true} />
                  ))}
              {showSecondLevelIcon && (
                <AntDesign
                  name={'appstore1'}
                  style={[styles.secondLevelIcon, secondLevelIconContainerStyle]}
                  size={scale(25)}
                />
              )}
            </View>
          )}
        {
          showUnReadMsg && <View style={styles.unReadMsgContainer}>
            <Text style={styles.unReadMsgText}>{unreadMsg > 99 ? 99 : unreadMsg}</Text>
          </View>
        }
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
        {showRightTopFlag &&
          (flagIcon ? (
            <FastImage
              source={{ uri: flagIcon }}
              style={styles.rightTopFlag}
              resizeMode={'contain'}
            />
          ) : (
              <DefaultFlag center={false} />
            ))}
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
  flag: {
    width: scale(50),
    backgroundColor: 'red',
    borderRadius: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagText: {
    color: '#ffffff',
    padding: scale(5),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  rightTopFlag: {
    position: 'absolute',
    width: '30%',
    aspectRatio: 1,
    right: 0,
    top: 0,
  },
  centerFlagContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  secondLevelIcon: {
    position: 'absolute',
    right: -scale(30),
    top: '50%'
  },
  unReadMsgContainer: {
    width: scale(25),
    aspectRatio: 1,
    borderRadius: scale(200),
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: scale(30),
    top: -scale(10),
  },
  unReadMsgText: { color: '#ffffff', fontSize: scale(15), textAlign: 'center' },
})

export default GameButton
