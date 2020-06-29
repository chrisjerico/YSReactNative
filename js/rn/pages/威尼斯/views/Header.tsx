import React from 'react'
import { View, Text } from 'react-native'
import { scale } from '../../../helpers/function'
import FastImage from 'react-native-fast-image'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Badge } from 'react-native-elements'

interface HeaderProps {
  name: string
}

const Header = ({ name }: HeaderProps) => {
  return (
    <View
      style={{
        width: '100%',
        aspectRatio: 501 / 40,
        backgroundColor: '#BF242A',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}
    >
      <FastImage
        source={{
          uri:
            'https://cdn01.tianmeilai.com.cn/upload/t010/customise/images/m_logo.jpg?v=1578471928',
        }}
        style={{ width: '30%', height: '100%' }}
        resizeMode={'contain'}
      />
      <View style={{ flexDirection: 'row', width: '50%', alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text style={{ fontSize: scale(25), marginRight: scale(10) }}>{name}</Text>
        <Badge value={'0.0000'} badgeStyle={{ width: scale(60), marginRight: scale(10), borderColor: 'transparent' }} status={'error'} />
        <FontAwesome5 name={'comment-dots'} size={scale(25)} style={{ marginRight: scale(10) }} />
        <MaterialCommunityIcons name={'settings-outline'} size={scale(25)} style={{ marginRight: scale(10) }} />
        <Text style={{ fontSize: scale(25) }}>{'菜单'}</Text>
      </View>
    </View>
  )
}

export default Header
