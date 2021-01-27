import chroma from 'chroma-js'
import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button, ButtonProps } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'
import { sc, scale } from '../../../../public/tools/Scale'
import { img_assets, img_mobileTemplate } from '../../../../Res/icon'

const iconSize = sc(35)

const HomeHeader = ({ logo, uid, onPressSignIn, onPressSignUp, onPressTryPlay, onPressMenu, onPressMessege }) => {
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: logo }} style={styles.logo} resizeMode={'contain'} />
      {uid ? (
        <Entypo name={'message'} color={'#000000'} size={iconSize} onPress={onPressMessege} />
      ) : (
          <View style={{ flexDirection: 'row', alignItems:'center' }}>
            <Button title='试玩' onPress={onPressTryPlay} {...rightButton} icon={<FastImage source={{ uri: img_assets('huabanfuben') }} style={{ width: sc(34), height: sc(34), marginRight: 3, marginBottom:2 }} />} />
            <Button title='登录' onPress={onPressSignIn} {...rightButton} icon={<FastImage source={{ uri: img_assets('denglu') }} style={{ width: sc(31), height: sc(31), marginRight: 2 }} />} />
            <Button title='注册' onPress={onPressSignUp} {...rightButton} icon={<FastImage source={{ uri: img_assets('zhuce') }} style={{ width: sc(29), height: sc(29), marginRight: 2 }} />} />
          </View>
        )}
    </View>
  )
}

export default HomeHeader


const rightButton: ButtonProps = {
  buttonStyle: {
    backgroundColor: 'transparent',
    paddingHorizontal: 2,
  },
  style: {},
  titleStyle: {
    fontSize: sc(19)
  },
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor:'#fff',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    height: '100%',
    aspectRatio: 3.7,
  },
  bar: {
    fontSize: sc(20),
  },
})
