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
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

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
  flagContainer?: ViewStyle | ViewStyle[];
  circleContainerStyle?: ViewStyle | ViewStyle[];

}

interface DefaultFlag {
  center: boolean;
  flagContainer?: ViewStyle | ViewStyle[];
}

const DefaultFlag = ({ center, flagContainer }: DefaultFlag) => {
  if (center) {
    return (
      <View style={styles.centerFlagContainer}>
        <View style={styles.flag}>
          <UGText style={styles.flagText}>{'热门'}</UGText>
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
          flagContainer
        ]}
      >
        <UGText style={styles.flagText}>{'热门'}</UGText>
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
    useLocalLogo = false,
    flagContainer,
    circleContainerStyle
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
              circleContainerStyle
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

        <View style={[styles.titleContainer, titleContainerStyle]}>
          <View style={styles.textContainer}>
            <UGText style={titleStyle} numberOfLines={1}>
              {title}
            </UGText>
          </View>
          {showSubTitle && (
            <View style={styles.textContainer}>
              <UGText style={[styles.subTitle, subTitleStyle]} numberOfLines={1}>
                {subTitle}
              </UGText>
            </View>
          )}
        </View>
        {
          showUnReadMsg && <View style={styles.unReadMsgContainer}>
            <UGText style={styles.unReadMsgText}>{unreadMsg > 99 ? 99 : unreadMsg}</UGText>
          </View>
        }
        {showRightTopFlag &&
          (flagIcon ? (
            <View style={[styles.rightTopFlag, flagContainer]}
            >
              <FastImage
                style={{ width: '100%', height: '100%' }}
                source={{ uri: flagIcon }}
                resizeMode={'contain'}
              />
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
    padding: scale(5)
  },
  flagText: {
    color: '#ffffff',
    fontSize: scale(18)
    // padding: scale(5),

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
