import React, { useState } from 'react'
import { ImageBackground, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import PickAvatarComponent from '../../public/components/tars/PickAvatarComponent'
import AppDefine from '../../public/define/AppDefine'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { scale } from '../../public/tools/Scale'
import { UGImageHost, useHtml5Image } from '../../Res/icon'
import Avatar from '../../public/views/tars/Avatar'
import BottomGap from '../../public/views/tars/BottomGap'
import Button from '../../public/views/tars/Button'
import GameButton from '../../public/views/tars/GameButton'
import List from '../../public/views/tars/List'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import config from './config'
import { goToUserCenterType } from '../../public/tools/tars'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const { getHtml5Image } = useHtml5Image(UGImageHost.t132f)

const JXHMinePage = () => {
  const { info, sign, pickAvatarComponentRef, onPressAvatar, onSaveAvatarSuccess } = useMinePage({
    homePage: PageName.JXHHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })

  const { userInfo, sysInfo } = info

  const { balance, curLevelGrade, usr, unreadMsg, avatar, isTest } = userInfo
  const { userCenterItems } = sysInfo

  const { signOut } = sign

  // data handle
  const JXHuserCenterItems = userCenterItems.concat([
    {
      logo: getHtml5Image(18, 'logoout'),
      name: '退出登录',
      code: -1,
    },
  ] as any)
  const [hideBalance, setHideBalance] = useState(false)

  return (
    <>
      <SafeAreaHeader headerColor={'#000000'} />
      <ImageBackground style={{ flex: 1 }} source={{uri:config.homeBg}}>
        <List
          uniqueKey={'JXHMinePage'}
          scrollEnabled={true}
          style={{ backgroundColor: 'transparent', paddingHorizontal: '1%' }}
          data={JXHuserCenterItems}
          numColumns={3}
          ListHeaderComponent={() => (
            <>
              <View style={{ aspectRatio: 4, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', height: '100%' }}>
                  <Avatar uri={isTest || !avatar ? AppDefine.defaultAvatar : avatar} onPress={onPressAvatar} />
                  <View style={{ height: '100%', justifyContent: 'space-between', paddingVertical: '8%', marginLeft: scale(10) }}>
                    <UGText style={{ color: '#a0a0a0', fontSize: scale(20) }}>{usr}</UGText>
                    <UGText style={{ color: '#cfa461', fontSize: scale(20) }}>{curLevelGrade}</UGText>
                  </View>
                </View>
                <TouchableWithoutFeedback onPress={goToUserCenterType.每日签到}>
                  <View style={{ flex: 1, height: '100%' }}>
                    <FastImage source={{ uri: 'http://t132f.fhptcdn.com/static/vuePublic/images/my/userInfo/dailysign.png' }} style={{ height: '100%', width: '100%' }} resizeMode={'contain'} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{ backgroundColor: '#111111', aspectRatio: 3, borderRadius: scale(5) }}>
                <View style={{ flex: 1, paddingLeft: scale(20), alignItems: 'center', flexDirection: 'row' }}>
                  <UGText style={{ color: '#676767', marginRight: scale(10) }}>{'账户余额'}</UGText>
                  <Ionicons
                    name={hideBalance ? 'ios-eye-off' : 'ios-eye'}
                    color={'#676767'}
                    size={20}
                    onPress={() => {
                      setHideBalance(!hideBalance)
                    }}
                  />
                </View>
                <View style={{ flex: 1.5, paddingLeft: scale(20) }}>
                  <UGText style={{ color: '#cfa461', fontSize: scale(35) }}>{hideBalance ? '*****' : balance}</UGText>
                </View>
                <View style={{ flexDirection: 'row', width: '100%', flex: 1, backgroundColor: '#2a2a2a' }}>
                  <Button
                    title={'充值'}
                    containerStyle={{ width: '50%', height: '100%', flexDirection: 'row' }}
                    showLogo={true}
                    logo={getHtml5Image(18, 'chong Zhi')}
                    logoStyle={{ width: scale(30), aspectRatio: 1 }}
                    titleStyle={{ color: '#cfa461', marginLeft: scale(10) }}
                    onPress={goToUserCenterType.存款}
                  />
                  <Button
                    title={'提现'}
                    containerStyle={{ width: '50%', height: '100%', flexDirection: 'row' }}
                    showLogo={true}
                    logo={getHtml5Image(18, 'tiSian')}
                    logoStyle={{ width: scale(30), aspectRatio: 1 }}
                    titleStyle={{ color: '#ffffff', marginLeft: scale(10) }}
                    onPress={goToUserCenterType.取款}
                  />
                </View>
              </View>
            </>
          )}
          renderItem={({ item, index }) => {
            const { name, logo, code } = item
            return (
              <GameButton
                key={index}
                title={name}
                enableCircle={false}
                logo={logo}
                titleStyle={{ color: '#ffffff' }}
                showSubTitle={false}
                titleContainerStyle={{ aspectRatio: 5 }}
                imageContainerStyle={{ width: '50%' }}
                containerStyle={{ marginVertical: scale(15), width: '33%' }}
                showUnReadMsg={code == UGUserCenterType.站内信 && unreadMsg > 0}
                unreadMsg={unreadMsg || 0}
                onPress={
                  code == -1
                    ? signOut
                    : () => {
                        PushHelper.pushUserCenterType(code)
                      }
                }
              />
            )
          }}
          ListFooterComponent={() => <BottomGap />}
        />
      </ImageBackground>
      <PickAvatarComponent ref={pickAvatarComponentRef} color={'#333333'} initAvatar={isTest || !avatar ? AppDefine.defaultAvatar : avatar} onSaveAvatarSuccess={onSaveAvatarSuccess} />
    </>
  )
}

export default JXHMinePage
