import React from 'react'
import { StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { useSafeArea } from 'react-native-safe-area-context'
import ReLoadBalanceComponent from '../../../public/components/tars/ReLoadBalanceComponent'
import AppDefine from '../../../public/define/AppDefine'
import { scale } from '../../../public/tools/Scale'
import List from '../../../public/views/tars/List'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface MenuProps {
  menus: any[]
  balance: string
  balanceDecimal: number
  usr: string
  uid: string
}

interface MenuButtonProps {
  title: string
  logo: string
  containerStyle?: StyleProp<ViewStyle>
  onPress?: () => any
}

const MenuButton = ({ title, logo, containerStyle, onPress }: MenuButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[containerStyle, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
        <FastImage source={{ uri: logo }} style={{ width: scale(30), aspectRatio: 1, marginRight: scale(10) }} resizeMode={'contain'} />
        <UGText>{title}</UGText>
      </View>
    </TouchableWithoutFeedback>
  )
}

const Menu = ({ menus, balance, balanceDecimal, usr, uid }: MenuProps) => {
  const { top } = useSafeArea()
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#8d92e4', '#64d0ef']} style={[styles.gradientBlock, { paddingTop: top }]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
        <UGText style={styles.titile}>{'UG集團'}</UGText>
        {uid && <UGText style={styles.titile}>{usr}</UGText>}

        <ReLoadBalanceComponent balance={balance} balanceDecimal={balanceDecimal} currency={'RMB'} iconColor={'#ffffff'} balanceStyle={styles.titile} />
      </LinearGradient>
      <View style={styles.buttonContainer}>
        {menus?.slice(0, 2).map((item, index) => {
          return <MenuButton key={index} containerStyle={index ? { flex: 1 } : { flex: 1, borderRightWidth: AppDefine.onePx, borderColor: '#d9d9d9' }} {...item} />
        })}
      </View>
      <List
        uniqueKey={'ByHomePageMenuList'}
        data={menus?.slice(2, 9)}
        renderItem={({ item }) => {
          return <MenuButton {...item} containerStyle={styles.button} />
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titile: {
    color: '#ffffff',
  },
  gradientBlock: {
    aspectRatio: 1.5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    flexDirection: 'row',
    aspectRatio: 2.5,
    borderBottomWidth: AppDefine.onePx,
    borderColor: '#d9d9d9',
    paddingTop: scale(20),
  },
  button: {
    aspectRatio: 3.5,
    borderBottomWidth: AppDefine.onePx,
    borderColor: '#d9d9d9',
  },
})

export default Menu
