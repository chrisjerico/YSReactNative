import React, { useState } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { scale } from '../../../public/tools/Scale'
import { UGImageHost, useHtml5Image } from '../../../Res/icon'
import Avatar from '../../../public/views/tars/Avatar'
import Button from '../../../public/views/tars/Button'
import LinearBadge from '../../../public/views/tars/LinearBadge'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

const { getHtml5Image } = useHtml5Image(UGImageHost.t132f)

interface ProfileBlockProps {
  uid: string
  curLevelTitle: string
  isTest: boolean
  avatar: string
  usr: string
  balance: string
  onPressExchange: () => any
  onPressTryPlay: () => any
  onPressLeftButton: () => any
  onPressRightButton: () => any
  onPressSignUpButton: () => any
  onPressSignInButton: () => any
  onPressForgetPassword: () => any
}

const ProfileBlock = ({
  uid,
  curLevelTitle,
  avatar,
  usr,
  balance,
  onPressExchange,
  onPressTryPlay,
  onPressLeftButton,
  onPressRightButton,
  onPressSignUpButton,
  onPressSignInButton,
  onPressForgetPassword,
}: ProfileBlockProps) => {
  const [hideBalance, setHideBalance] = useState(false)
  return (
    <View style={{ width: '100%', aspectRatio: 2.3, backgroundColor: '#111111', borderRadius: scale(10), overflow: 'hidden' }}>
      <View style={{ flex: 1, backgroundColor: '#282828', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: scale(10) }}>
        {uid ? (
          <>
            <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
              <Avatar size={30} uri={avatar} />
              <UGText style={{ color: '#a0a0a0', marginHorizontal: scale(10), fontSize: scale(20) }}>{usr}</UGText>
              <LinearBadge
                title={curLevelTitle}
                colors={['#cfa461', '#cfa461']}
                showIcon={false}
                containerStyle={{ borderRadius: scale(5), width: null, height: scale(25), paddingHorizontal: scale(5) }}
                textStyle={{ color: '#000000', fontSize: scale(15) }}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={onPressExchange}>
                <FastImage source={{ uri: getHtml5Image(18, 'yhdh') }} style={{ height: '100%', aspectRatio: 2 }} resizeMode={'contain'} />
              </TouchableWithoutFeedback>
            </View>
          </>
        ) : (
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Avatar size={30} uri={avatar} />
            <UGText style={{ color: '#a0a0a0', fontSize: scale(20), marginLeft: scale(10) }}>{'尊敬的来宾，您好，请登录'}</UGText>
          </View>
        )}
      </View>
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        {uid ? (
          <View style={{ flex: 1, marginLeft: scale(20) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <UGText style={{ color: '#676767', marginRight: scale(10) }}>{'账户余额'}</UGText>
              <Ionicons
                name={hideBalance ? 'ios-eye-off' : 'ios-eye'}
                color={'#676767'}
                size={25}
                onPress={() => {
                  setHideBalance(!hideBalance)
                }}
              />
            </View>
            <UGText style={{ color: '#cfa461', fontSize: scale(35) }}>{hideBalance ? '*****' : balance}</UGText>
          </View>
        ) : (
          <>
            <Button title={'登录'} containerStyle={[styles.signButton, { backgroundColor: '#cfa461' }]} titleStyle={{ color: '#ffffff', fontSize: scale(20) }} onPress={onPressSignInButton} />
            <Button
              title={'注册'}
              containerStyle={[styles.signButton, { backgroundColor: '#000000', borderColor: '#cfa461', borderWidth: scale(1) }]}
              titleStyle={{ color: '#cfa461', fontSize: scale(20) }}
              onPress={onPressSignUpButton}
            />
          </>
        )}
      </View>
      <View style={{ flex: 1, backgroundColor: '#2a2a2a', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        {uid ? (
          <>
            <Button
              title={'充值'}
              containerStyle={{ width: '50%', height: '100%', flexDirection: 'row' }}
              showLogo={true}
              logo={getHtml5Image(18, 'chong Zhi')}
              logoStyle={{ width: scale(30), aspectRatio: 1 }}
              titleStyle={{ color: '#cfa461', marginLeft: scale(10) }}
              onPress={onPressLeftButton}
            />
            <Button
              title={'提现'}
              containerStyle={{ width: '50%', height: '100%', flexDirection: 'row' }}
              showLogo={true}
              logo={getHtml5Image(18, 'tiSian')}
              logoStyle={{ width: scale(30), aspectRatio: 1 }}
              titleStyle={{ color: '#ffffff', marginLeft: scale(10) }}
              onPress={onPressRightButton}
            />
          </>
        ) : (
          <>
            <TouchableWithoutFeedback onPress={onPressForgetPassword}>
              <UGText style={{ color: '#c7c7c7' }}>{'忘记密码'}</UGText>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPressTryPlay}>
              <UGText style={{ color: '#cfa461' }}>{'免费试玩'}</UGText>
            </TouchableWithoutFeedback>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  signButton: {
    width: '30%',
    aspectRatio: 3,
    borderRadius: scale(5),
  },
})

export default ProfileBlock
