import React, { memo } from 'react'
import { StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle, StyleProp } from 'react-native'
import FastImage from 'react-native-fast-image'
import { sc540, scale } from '../../tools/Scale'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { img_platform } from '../../../Res/icon'
import { IconProps } from 'react-native-vector-icons/Icon'
import { FastImagePlaceholder } from '../../../pages/经典/tools/ImagePlaceholder'

interface GameButtonProps {
  logo?: string
  title?: string
  subTitle?: string
  showSubTitle?: boolean
  onPress?: () => any
  category?: string
  gameId?: string
  show?: boolean
  imageContainerStyle?: StyleProp<ViewStyle>
  circleColor?: string
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  subTitleStyle?: StyleProp<TextStyle>
  titleContainerStyle?: StyleProp<ViewStyle>
  resizeMode?: 'cover' | 'contain'
  enableCircle?: boolean
  showRightTopFlag?: boolean
  showCenterFlag?: boolean
  showBigCenterFlag?: boolean
  flagIcon?: string
  showSecondLevelIcon?: boolean
  secondLevelIconContainerStyle?: StyleProp<ViewStyle>
  secondLevelIconProps?: IconProps
  showUnReadMsg?: boolean
  unreadMsg?: number
  localLogo?: any
  useLocalLogo?: boolean
  flagContainer?: StyleProp<ViewStyle>
  circleContainerStyle?: StyleProp<ViewStyle>
}

interface DefaultFlag {
  center: boolean
  flagContainer?: StyleProp<ViewStyle>
}

const DefaultFlag = ({ center, flagContainer }: DefaultFlag) => {
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
          flagContainer,
        ]}>
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
    secondLevelIconProps,
    showUnReadMsg = false,
    showBigCenterFlag = false,
    unreadMsg,
    localLogo,
    useLocalLogo = false,
    flagContainer,
    circleContainerStyle,
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
              circleContainerStyle,
            ]}>
            <View style={[styles.imageContainer, imageContainerStyle]}>
              <FastImagePlaceholder style={styles.image} source={useLocalLogo ? localLogo : { uri: logo }} resizeMode={resizeMode} placeholderStyle={{ borderRadius: sc540(50), overflow:'hidden' }} />
              {showCenterFlag && (flagIcon ? <FastImage source={{ uri: flagIcon }} style={[styles.image, { position: 'absolute' }]} /> : <DefaultFlag center={true} />)}
              {showSecondLevelIcon && <AntDesign name={'appstore1'} size={scale(25)} {...secondLevelIconProps} style={[styles.secondLevelIcon, secondLevelIconProps?.style, secondLevelIconContainerStyle]} />}
            </View>
          </View>
        ) : (
          <View style={[styles.imageContainer, imageContainerStyle]}>
            <FastImagePlaceholder style={styles.image} source={useLocalLogo ? localLogo : { uri: logo }} resizeMode={resizeMode} placeholderStyle={{ borderRadius: sc540(50), overflow:'hidden' }} />
            {showCenterFlag && (flagIcon ? <FastImage source={{ uri: flagIcon }} style={[styles.image, { position: 'absolute' }]} /> : <DefaultFlag center={true} />)}
            {showSecondLevelIcon && <AntDesign name={'appstore1'} size={scale(25)} {...secondLevelIconProps} style={[styles.secondLevelIcon, secondLevelIconProps?.style, secondLevelIconContainerStyle]} />}
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
        {showBigCenterFlag && <FastImage source={{ uri: flagIcon ? flagIcon : img_platform('c116', 'zhongdajiang', 'gif') }} style={[styles.image, { position: 'absolute' }]} />}
        {showUnReadMsg && (
          <View style={styles.unReadMsgContainer}>
            <Text style={styles.unReadMsgText}>{unreadMsg > 99 ? 99 : unreadMsg}</Text>
          </View>
        )}
        {showRightTopFlag &&
          (flagIcon ? (
            <View style={[styles.rightTopFlag, flagContainer]}>
              <FastImage style={{ width: '100%', height: '100%' }} source={{ uri: flagIcon }} resizeMode={'contain'} />
            </View>
          ) : (
            <DefaultFlag center={false} flagContainer={flagContainer} />
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
    width: '50%',
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
    padding: scale(5),
  },
  flagText: {
    color: '#ffffff',
    fontSize: scale(18),
    // padding: scale(5),
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'stretch'
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
    top: '50%',
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

export default memo(GameButton)
