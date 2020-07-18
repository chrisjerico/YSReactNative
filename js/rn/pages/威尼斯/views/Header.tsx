import React from 'react'
import { Text, View } from 'react-native'
import { Badge } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../public/tools/Scale'

interface HeaderProps {
  name: string;
  logo: string;
}

const Header = ({ name, logo }: HeaderProps) => {
  return (
    <View
      style={{
        width: '100%',
        aspectRatio: 501 / 40,
        backgroundColor: '#BF242A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: scale(10)
      }}
    >
      <FastImage
        source={{
          uri: logo,
        }}
        style={{ width: '30%', height: '100%' }}
        resizeMode={'contain'}
      />
      <View
        style={{
          flexDirection: 'row',
          width: '50%',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Text style={{ fontSize: scale(20), marginRight: scale(10), color: '#ffffff' }}>
          {name}
        </Text>
        {/* <Badge
          value={'0.0000'}
          badgeStyle={{
            width: scale(90),
            marginRight: scale(10),
            borderColor: 'transparent',
          }}
          textStyle={{ fontSize: scale(20) }}
          status={'error'}
        /> */}
        <View style={{ width: scale(80), aspectRatio: 3.5, backgroundColor: '#df2128', borderRadius: scale(20) }}>
          <Text style={{ color: '#ffffff' }}>{'0.0000'}</Text>
        </View>
        <FontAwesome
          name={'commenting'}
          size={scale(25)}
          style={{ marginRight: scale(10) }}
          color={'#ffffff'}
        />
        <MaterialCommunityIcons
          name={'settings-outline'}
          size={scale(25)}
          style={{ marginRight: scale(10) }}
          color={'#ffffff'}
        />
        <Text style={{ fontSize: scale(20), color: '#ffffff' }} >{'菜单'}</Text>
      </View>
    </View>
  )
}

export default Header
