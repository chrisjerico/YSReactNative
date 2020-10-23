import React from 'react'
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import Entypo from 'react-native-vector-icons/Entypo'
import { scale } from '../../../public/tools/Scale'

const iconSize = scale(30)

const HomeHeader = ({ logo, uid, onPressSignIn, onPressSignUp, onPressTryPlay }) => {
  return (
    <View style={styles.container}>
      <Entypo name={'menu'} color={'#000000'} size={iconSize} />
      <FastImage source={{ uri: logo }} style={styles.logo} resizeMode={'contain'} />
      {uid ? (
        <Entypo name={'message'} color={'#000000'} size={iconSize} />
      ) : (
        <View style={{ flexDirection: 'row' }}>
          <TouchableWithoutFeedback onPress={onPressSignIn}>
            <Text style={styles.rightTitletext}>{'登录'}</Text>
          </TouchableWithoutFeedback>
          <Text style={styles.bar}>{'/'}</Text>
          <TouchableWithoutFeedback onPress={onPressSignUp}>
            <Text style={styles.rightTitletext}>{'注册'}</Text>
          </TouchableWithoutFeedback>

          <Text style={styles.bar}>{'/'}</Text>
          <TouchableWithoutFeedback onPress={onPressTryPlay}>
            <Text style={styles.rightTitletext}>{'试玩'}</Text>
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
