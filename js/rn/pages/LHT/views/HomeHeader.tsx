import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { skinColors } from '../../../public/theme/const/UGSkinColor'
import { scale } from '../../../public/tools/Scale'
import Avatar from '../../../public/views/tars/Avatar'
import LinearBadge from '../../../public/views/tars/LinearBadge'

interface HomeHeaderProps {
  name: string
  avatar: string
  leftLogo: string
  rightLogo: string
  showLogout: boolean
  onPressSignOut: () => any
  onPressSignIn: () => any
  onPressSignUp: () => any
  onPressTryPlay: () => any
  onPressLogo: () => any
}

const HomeHeader = ({ avatar = '', name = '', leftLogo = '', rightLogo = '', showLogout = false, onPressSignOut, onPressSignIn, onPressSignUp, onPressTryPlay, onPressLogo }: HomeHeaderProps) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={styles.leftContainer}>
        <FastImage resizeMode={'stretch'} style={styles.image} source={{ uri: leftLogo }} />
      </View>
      <View style={styles.rightContainer}>
        {showLogout ? (
          <>
            <Avatar uri={avatar} size={40} />
            <View style={styles.nameContainer}>
              <Text style={styles.nameText} numberOfLines={1}>
                {name}
              </Text>
            </View>
            <LinearBadge
              showIcon={false}
              title={'退出'}
              colors={['#ffffff', '#ffffff']}
              containerStyle={styles.badgeContainer}
              textStyle={{ color: skinColors.themeColor.六合厅, fontSize: scale(20) }}
              onPress={onPressSignOut}
            />
            <Text style={styles.text}>{' | '}</Text>
            <TouchableWithoutFeedback onPress={onPressLogo}>
              <FastImage style={{ width: scale(40), aspectRatio: 1 }} resizeMode={'contain'} source={{ uri: rightLogo }} />
            </TouchableWithoutFeedback>
          </>
        ) : (
          <>
            <TouchableWithoutFeedback onPress={onPressLogo}>
              <FastImage style={{ width: scale(40), aspectRatio: 1 }} resizeMode={'contain'} source={{ uri: rightLogo }} />
            </TouchableWithoutFeedback>
            <Text style={styles.text}>{' | '}</Text>
            <TouchableWithoutFeedback onPress={onPressSignIn}>
              <Text style={styles.text}>{'登录'}</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.text}>{' | '}</Text>
            <TouchableWithoutFeedback onPress={onPressSignUp}>
              <Text style={styles.text}>{'注册'}</Text>
            </TouchableWithoutFeedback>
            <Text style={styles.text}>{' | '}</Text>
            <TouchableWithoutFeedback onPress={onPressTryPlay}>
              <Text style={styles.text}>{'试玩'}</Text>
            </TouchableWithoutFeedback>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: scale(20),
    color: '#ffffff',
  },
  badgeContainer: {
    backgroundColor: '#ffffff',
    paddingLeft: scale(10),
    paddingRight: scale(10),
    width: scale(75),
    height: scale(32),
    borderRadius: scale(75),
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  nameContainer: {
    maxWidth: scale(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    color: '#ffffff',
    fontSize: scale(23),
    paddingHorizontal: scale(5),
  },
})

export default HomeHeader
