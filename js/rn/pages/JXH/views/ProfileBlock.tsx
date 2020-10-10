import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { PageName } from '../../../public/navigation/Navigation'
import { navigate } from '../../../public/navigation/RootNavigation'
import { scale } from '../../../public/tools/Scale'
import { useHtml5Image } from '../../../public/tools/tars'
import Avatar from '../../../public/views/tars/Avatar'
import Button from '../../../public/views/tars/Button'
import LinearBadge from '../../../public/views/tars/LinearBadge'

const { getHtml5Image } = useHtml5Image()

interface ProfileBlockProps {
  uid: string
  curLevelTitle: string
  isTest: boolean
  avatar: string
  usr: string
  balance: string
  onPressExchange: () => any
  onPressTryPlay: () => any
}

const ProfileBlock = ({ uid, curLevelTitle, isTest, avatar, usr, balance, onPressExchange, onPressTryPlay }: ProfileBlockProps) => {
  return (
    <View style={{ width: '100%', aspectRatio: 2.3, backgroundColor: '#111111', borderRadius: scale(10), overflow: 'hidden' }}>
      <View style={{ flex: 1, backgroundColor: '#333333', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: scale(10) }}>
        {uid ? (
          <>
            <View style={{ flexDirection: 'row' }}>
              <Avatar size={30} uri={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar} />
              <Text style={{ color: '#ffffff', marginHorizontal: scale(10) }}>{usr}</Text>
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
            <Avatar size={30} uri={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar} />
            <Text style={{ color: '#c7c7c7', fontSize: scale(18), marginLeft: scale(10) }}>{'尊敬的来宾，您好，请登录'}</Text>
          </View>
        )}
      </View>
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        {uid ? (
          <View style={{ flex: 1, marginLeft: scale(20) }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: '#676767', marginRight: scale(10) }}>{'账户余额'}</Text>
              <AntDesign name={'eye'} color={'#676767'} size={20} />
            </View>
            <Text style={{ color: '#cfa461', fontSize: scale(35) }}>{balance}</Text>
          </View>
        ) : (
          <>
            <Button
              title={'登录'}
              containerStyle={[styles.signButton, { backgroundColor: '#cfa461' }]}
              titleStyle={{ color: '#ffffff', fontSize: scale(20) }}
              onPress={() => {
                navigate(PageName.JXHSignInPage)
              }}
            />
            <Button
              title={'注册'}
              containerStyle={[styles.signButton, { backgroundColor: '#000000', borderColor: '#cfa461', borderWidth: scale(1) }]}
              titleStyle={{ color: '#cfa461', fontSize: scale(20) }}
              onPress={() => {
                navigate(PageName.JXHSignUpPage)
              }}
            />
          </>
        )}
      </View>
      <View style={{ flex: 1, backgroundColor: '#333333', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        {uid ? (
          <>
            <Button
              title={'充值'}
              containerStyle={{ width: '50%', height: '100%', flexDirection: 'row' }}
              showLogo={true}
              logo={getHtml5Image(18, 'chong Zhi')}
              logoStyle={{ width: scale(30), aspectRatio: 1 }}
            />
            <Button
              title={'提现'}
              containerStyle={{ width: '50%', height: '100%', flexDirection: 'row' }}
              showLogo={true}
              logo={getHtml5Image(18, 'tiSian')}
              logoStyle={{ width: scale(30), aspectRatio: 1 }}
            />
          </>
        ) : (
          <>
            <Text style={{ color: '#c7c7c7' }}>{'忘记密码'}</Text>
            <TouchableWithoutFeedback onPress={onPressTryPlay}>
              <Text style={{ color: '#cfa461' }}>{'免费试玩'}</Text>
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
