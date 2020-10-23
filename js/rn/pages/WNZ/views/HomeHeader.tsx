import React, { useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppDefine from '../../../public/define/AppDefine'
import { scale } from '../../../public/tools/Scale'

export interface HomeHeaderProps {
  name: string
  logo: string
  balance: string
  onPressMenu: () => any
  onPressComment: () => any
  onPressUser: () => any
  showBackBtn?: boolean
  uid: string
  onPressBackBtn?: () => any
}

const HomeHeader = ({ name, logo, balance, onPressMenu, onPressComment, onPressUser, uid, onPressBackBtn }: HomeHeaderProps) => {
  const [showBackBtn, setShowBackBtn] = useState(false)
  AppDefine.checkHeaderShowBackButton((show) => {
    show != showBackBtn && setShowBackBtn(show)
  })
  return (
    <View style={styles.container}>
      {showBackBtn ? (
        <AntDesign name={'left'} color={'#ffffff'} size={scale(25)} onPress={onPressBackBtn} />
      ) : uid ? (
        <FastImage
          source={{
            uri: logo,
          }}
          style={{ width: '35%', height: '100%' }}
          resizeMode={'contain'}
        />
      ) : (
        <View style={{ flex: 1 }} />
      )}
      {!uid && !showBackBtn && (
        <FastImage
          source={{
            uri: logo,
          }}
          style={{ width: '35%', height: '100%' }}
          resizeMode={'contain'}
        />
      )}
      {
        <View style={styles.rightContainer}>
          {uid && (
            <TouchableWithoutFeedback onPress={onPressUser}>
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}>
                <Text style={styles.nameText} numberOfLines={1}>
                  {name}
                </Text>
                <View style={styles.balanceContainer}>
                  <Text style={styles.balanceText}>{balance}</Text>
                  <AntDesign name={'pluscircle'} color={'#ffffff'} style={{ margin: 0, padding: 0, marginLeft: scale(5) }} />
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
          <TouchableWithoutFeedback onPress={onPressComment}>
            <View
              style={{
                marginRight: scale(5),
                height: '100%',
                justifyContent: 'center',
              }}>
              <FontAwesome name={'commenting'} size={scale(20)} color={'#ffffff'} />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onPressMenu}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: '100%',
              }}>
              <MaterialCommunityIcons name={'settings-outline'} size={scale(20)} style={{ marginRight: scale(5) }} color={'#ffffff'} />
              <Text style={{ fontSize: scale(20), color: '#ffffff' }}>{'菜单'}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    height: '100%',
  },
  balanceContainer: {
    backgroundColor: '#df2128',
    borderRadius: scale(20),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scale(5),
    paddingVertical: scale(5),
    marginRight: scale(10),
  },
  nameText: {
    fontSize: scale(18),
    marginRight: scale(5),
    color: '#ffffff',
    width: '30%',
    textAlign: 'right',
  },
  balanceText: {
    color: '#ffffff',
    fontSize: scale(16),
  },
})

export default HomeHeader
