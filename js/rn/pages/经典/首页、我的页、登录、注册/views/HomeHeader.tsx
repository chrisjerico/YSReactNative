import chroma from 'chroma-js'
import React from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { Button, ButtonProps } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import PushHelper from '../../../../public/define/PushHelper'
import { sc540, scale } from '../../../../public/tools/Scale'
import { UGUserCenterType } from '../../../../redux/model/全局/UGSysConfModel'
import { img_assets, img_mobileTemplate } from '../../../../Res/icon'

const HomeHeader = ({ logo, uid, name, onPressSignIn, onPressSignUp, onPressTryPlay, onPressMenu, onPressMessege }) => {
  return (
    <View style={styles.container}>
      <FastImage source={{ uri: logo }} style={styles.logo} resizeMode={'contain'} />
      {uid ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Text style={{ color: 'white', fontSize:sc540(19.5),  flex: 1, textAlign:'right', marginRight:sc540(7)}} numberOfLines={1} onPress={()=>{PushHelper.pushUserCenterType(UGUserCenterType.我的页)}}>{name}</Text>
          <Feather name='menu' color={'white'} size={sc540(45)} style={{marginRight:sc540(5)}} onPress={onPressMenu} />
        </View>
      ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button title='试玩' onPress={onPressTryPlay} {...rightButton} icon={<FastImage source={{ uri: img_assets('huabanfuben') }} style={{ width: sc540(34), height: sc540(34), marginRight: 3, marginBottom: 2 }} />} />
            <Button title='登录' onPress={onPressSignIn} {...rightButton} icon={<FastImage source={{ uri: img_assets('denglu') }} style={{ width: sc540(31), height: sc540(31), marginRight: 2 }} />} />
            <Button title='注册' onPress={onPressSignUp} {...rightButton} icon={<FastImage source={{ uri: img_assets('zhuce') }} style={{ width: sc540(29), height: sc540(29), marginRight: 2 }} />} />
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
    fontSize: sc540(19)
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
    height: '95%',
    aspectRatio: 3.7,
  },
  bar: {
    fontSize: sc540(20),
  },
})
