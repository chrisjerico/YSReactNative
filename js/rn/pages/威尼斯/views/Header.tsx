import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { scale } from '../../../public/tools/Scale'
import AntDesign from 'react-native-vector-icons/AntDesign'

interface HeaderProps {
  name: string;
  logo: string;
  balance: string;
  onPressMenu: () => any;
  marginTop: number;
  backgroundColor: string;
  onPressComment: () => any;
  onPressUser: () => any;
}

const Header = ({
  name,
  logo,
  balance,
  onPressMenu,
  marginTop,
  backgroundColor,
  onPressComment,
  onPressUser
}: HeaderProps) => {
  return (
    <View style={{ backgroundColor: backgroundColor }}>
      <View
        style={[
          styles.container,
          {
            marginTop: marginTop,
            backgroundColor: backgroundColor,
          },
        ]}
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
          <TouchableOpacity style={{ flexDirection: 'row' }} onPress={onPressUser}>
            <Text
              style={{
                fontSize: scale(20),
                marginRight: scale(5),
                color: '#ffffff',
              }}
            >
              {name}
            </Text>
            <View
              style={{
                backgroundColor: '#df2128',
                borderRadius: scale(20),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: scale(5),
                paddingHorizontal: scale(5)
              }}
            >
              <Text style={{ color: '#ffffff' }}>{balance}</Text>
              <AntDesign
                name={'pluscircle'}
                color={'#ffffff'}
                style={{ margin: 0, padding: 0, marginLeft: scale(5) }}
              />
            </View>
          </TouchableOpacity>
          <FontAwesome
            name={'commenting'}
            size={scale(25)}
            style={{ marginRight: scale(10) }}
            color={'#ffffff'}
            onPress={onPressComment}
          />
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={onPressMenu}
          >
            <MaterialCommunityIcons
              name={'settings-outline'}
              size={scale(25)}
              style={{ marginRight: scale(10) }}
              color={'#ffffff'}
            />
            <Text style={{ fontSize: scale(20), color: '#ffffff' }}>
              {'菜单'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 501 / 40,
    backgroundColor: '#BF242A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: scale(10),
  },
})

export default Header
