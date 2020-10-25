import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import ReLoadBalanceComponent from '../../../public/components/tars/ReLoadBalanceComponent'
import { PageName } from '../../../public/navigation/Navigation'
import { navigate } from '../../../public/navigation/RootNavigation'
import { scale } from '../../../public/tools/Scale'
import { useHtml5Image } from '../../../public/tools/tars'
import LinearBadge from '../../../public/views/tars/LinearBadge'
import TouchableImage from '../../../public/views/tars/TouchableImage'

const { getHtml5Image } = useHtml5Image()

const buttonHeight = scale(82)

interface ProfileBlockProps {
  usr?: string
  uid?: string
  curLevelTitle?: string
  balance?: string
  currency?: string
  balanceDecimal?: number
  unreadMsg?: number
  onPressSignUpButton: () => any
  onPressTryPlay: () => any
  onPressUnReadMsg: () => any
}

const ProfileBlock = ({ usr, curLevelTitle, balance, currency, balanceDecimal, unreadMsg, uid, onPressSignUpButton, onPressTryPlay, onPressUnReadMsg }: ProfileBlockProps) => {
  return (
    <View style={[styles.toolBlock, { marginTop: scale(5) }]}>
      {uid ? (
        <LinearGradient
          colors={['#eb5d4d', '#fb2464']}
          style={{ flex: 1, borderRadius: scale(5), marginHorizontal: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: scale(35) }}>
          <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
            <FastImage source={{ uri: getHtml5Image(22, 'touxiang') }} style={{ height: '50%', aspectRatio: 1 }} />
            <View style={{ marginLeft: scale(20), height: '100%' }}>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', marginBottom: scale(1) }}>
                <Text style={{ color: '#ffffff', fontWeight: '600' }}>{usr}</Text>
                <LinearBadge
                  title={curLevelTitle}
                  colors={['#ffffff', '#ffffff']}
                  textStyle={{ color: '#f83060', padding: scale(3), fontSize: scale(18) }}
                  containerStyle={{ borderRadius: scale(5), width: null, marginLeft: scale(5), height: null, aspectRatio: null }}
                  showIcon={false}
                />
              </View>
              <View style={{ flexDirection: 'row', flex: 1, marginTop: scale(1) }}>
                <ReLoadBalanceComponent
                  title={'总金额¥ '}
                  titleStyle={{ color: '#ffffff', fontSize: scale(20), fontWeight: '500' }}
                  balance={balance}
                  balanceStyle={{ color: '#ffffff', fontSize: scale(20), fontWeight: '500' }}
                  iconColor={'#ffffff'}
                  size={20}
                  currency={currency}
                  balanceDecimal={balanceDecimal}
                />
              </View>
            </View>
          </View>
          <View style={{ aspectRatio: 1, height: '50%' }}>
            <TouchableImage pic={getHtml5Image(22, 'xiaoxi')} containerStyle={{ width: '100%', height: '100%' }} resizeMode={'contain'} onPress={onPressUnReadMsg} />
            <View
              style={{
                width: scale(30),
                aspectRatio: 1,
                borderRadius: scale(30),
                position: 'absolute',
                backgroundColor: '#ffffff',
                right: -scale(10),
                top: -scale(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: scale(20), color: '#fe3333' }}>{unreadMsg > 99 ? 99 : unreadMsg}</Text>
            </View>
          </View>
        </LinearGradient>
      ) : (
        <>
          <LinearBadge
            colors={['#3a3a41', '#3a3a41']}
            containerStyle={[styles.toolButton, { marginLeft: '1%' }]}
            title={'登录'}
            textStyle={{ color: '#ffffff', fontSize: scale(22) }}
            showIcon={false}
            onPress={() => {
              navigate(PageName.KSSignInPage)
            }}
          />
          <LinearBadge
            colors={['#eb5d4d', '#fb7a24']}
            containerStyle={styles.toolButton}
            title={'注册'}
            textStyle={{ color: '#ffffff', fontSize: scale(22) }}
            showIcon={false}
            onPress={onPressSignUpButton}
          />
          <LinearBadge
            colors={['#eb5d4d', '#fb2464']}
            containerStyle={[styles.toolButton, { marginRight: '1%' }]}
            title={'试玩'}
            textStyle={{ color: '#ffffff', fontSize: scale(22) }}
            showIcon={false}
            onPress={onPressTryPlay}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  toolBlock: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: scale(8),
    height: buttonHeight,
  },
  toolButton: {
    width: '32%',
    borderRadius: scale(5),
    height: '100%',
    marginHorizontal: '0.5%',
  },
})

export default ProfileBlock
