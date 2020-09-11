import React from 'react'
import {
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../public/tools/Scale'

interface SignHeaderProps {
  onPressLeftTool: () => any;
  onPressMenu: () => any;
  onPressSign: () => any;
}

const SignHeader = ({ onPressLeftTool, onPressMenu, onPressSign }: SignHeaderProps) => {
  return (
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AntDesign
          name={'left'}
          color={'#ffffff'}
          size={scale(25)}
          onPress={onPressLeftTool}
        />
        <Text style={{ color: '#ffffff', paddingLeft: scale(10), fontSize: scale(20) }}>
          {'返回'}
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={onPressSign}>
          <Text style={{ color: '#ffffff', paddingRight: scale(10), fontSize: scale(20) }}>{'登录/注册'}</Text>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onPressMenu}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcons
              name={'settings-outline'}
              size={scale(20)}
              style={{ marginRight: scale(5) }}
              color={'#ffffff'}
            />
            <Text style={{ fontSize: scale(25), color: '#ffffff' }}>
              {'菜单'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default SignHeader
