import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

const iconSize = scale(35)

const HomeHeader = ({ logo, uid, onPressSignIn, onPressSignUp, onPressTryPlay, onPressMenu, onPressMessege }) => {
  return (
    <View style={styles.container}>
      <Entypo name={'menu'} color={'#000000'} size={iconSize} onPress={onPressMenu} />
      <FastImage source={{ uri: logo }} style={styles.logo} resizeMode={'contain'} />
      {uid ? (
        <Entypo name={'message'} color={'#000000'} size={iconSize} onPress={onPressMessege} />
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <TouchableWithoutFeedback onPress={onPressSignIn}>
            <UGText style={styles.rightTitletext}>{'登录'}</UGText>
          </TouchableWithoutFeedback>
          <UGText style={styles.bar}>{'/'}</UGText>
          <TouchableWithoutFeedback onPress={onPressSignUp}>
            <UGText style={styles.rightTitletext}>{'注册'}</UGText>
          </TouchableWithoutFeedback>
          <UGText style={styles.bar}>{'/'}</UGText>
          <TouchableWithoutFeedback onPress={onPressTryPlay}>
            <UGText style={styles.rightTitletext}>{'试玩'}</UGText>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: '100%',
    aspectRatio: 1,
  },
  rightTitletext: {
    color: '#646f95',
    fontSize: scale(25),
  },
  bar: {
    fontSize: scale(20),
  },
})
