import React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../public/tools/Scale'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface SignHeaderProps {
  onPressLeftTool: () => any
  onPressMenu: () => any
  onPressSign: () => any
}

const SignHeader = ({ onPressLeftTool, onPressMenu, onPressSign }: SignHeaderProps) => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableWithoutFeedback onPress={onPressLeftTool}>
        <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
          <AntDesign name={'left'} color={'#ffffff'} size={scale(25)} />
          <UGText
            style={{
              color: '#ffffff',
              paddingLeft: scale(10),
              fontSize: scale(20),
            }}>
            {'返回'}
          </UGText>
        </View>
      </TouchableWithoutFeedback>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableWithoutFeedback onPress={onPressSign}>
          <View
            style={{
              paddingRight: scale(10),
              height: '100%',
              justifyContent: 'center',
            }}>
            <UGText style={{ color: 'white', fontSize: scale(20) }}>{'登录'}</UGText>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default SignHeader
