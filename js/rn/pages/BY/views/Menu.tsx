import React, { useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useSafeArea } from 'react-native-safe-area-context'
import ReLoadBalanceComponent from '../../../public/components/tars/ReLoadBalanceComponent'
import { scale } from '../../../public/tools/Scale'
import Button from '../../../public/views/tars/Button'
import List from '../../../public/views/tars/List'

interface MenuProps {
  menus: any[]
  balance: string
  balanceDecimal: number
  usr: string
  uid: string
}

const Menu = ({ menus, balance, balanceDecimal, usr, uid }: MenuProps) => {
  const { top } = useSafeArea()
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#8d92e4', '#64d0ef']} style={[styles.gradientBlock, { paddingTop: top }]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.titile}>{'UG集團'}</Text>
        {uid && <Text style={styles.titile}>{usr}</Text>}

        <ReLoadBalanceComponent balance={balance} balanceDecimal={balanceDecimal} currency={'RMB'} color={'#ffffff'} balanceStyle={styles.titile} />
      </LinearGradient>
      <View style={styles.buttonContainer}>
        <Button containerStyle={{ flex: 1, borderRightWidth: scale(1), borderColor: '#d9d9d9' }} title={'充值'} />
        <Button containerStyle={{ flex: 1 }} title={'提现'} />
      </View>
      <List
        uniqueKey={'ByHomePageMenuList'}
        data={menus}
        renderItem={({ item }) => {
          return <Button {...item} containerStyle={{ aspectRatio: 3, borderBottomWidth: scale(1), borderColor: '#d9d9d9' }} />
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
    aspectRatio: 2,
    borderBottomWidth: scale(1),
    borderColor: '#d9d9d9',
    paddingTop: scale(20),
  },
})

export default Menu
