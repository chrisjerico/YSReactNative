import React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../public/tools/Scale'

interface SignHeaderProps {
  onPressLeftTool: () => any;
  onPressMenu: () => any;
  onPressSign: () => any;
}

const SignHeader = ({
  onPressLeftTool,
  onPressMenu,
  onPressSign,
}: SignHeaderProps) => {
  return (
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <TouchableWithoutFeedback onPress={onPressLeftTool}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}
        >
          <AntDesign name={'left'} color={'#ffffff'} size={scale(25)} />
          <Text
            style={{
              color: '#ffffff',
              paddingLeft: scale(10),
              fontSize: scale(20),
            }}
          >
            {'返回'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={onPressSign}>
          <View
            style={{
              paddingRight: scale(10),
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#ffffff', fontSize: scale(20) }}>
              {'登录/注册'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressMenu}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <MaterialCommunityIcons
              name={'settings-outline'}
              size={scale(20)}
              style={{ marginRight: scale(5) }}
              color={'#ffffff'}
            />
            <Text style={{ fontSize: scale(20), color: '#ffffff' }}>
              {'菜单'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default SignHeader
