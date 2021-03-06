import { Image, SafeAreaView, StatusBar, Text, TouchableWithoutFeedback, View } from 'react-native'
import { LoginButtonBar } from './LoginButtonBar'
import * as React from 'react'
import { UGStore } from '../../../../redux/store/UGStore'
import FastImage from 'react-native-fast-image'
import { httpClient } from '../../../../public/network/httpClient'
import PushHelper from '../../../../public/define/PushHelper'
import { UGUserCenterType } from '../../../../redux/model/全局/UGSysConfModel'
import { UGText } from '../../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const HomeHeaderButtonBar = ({info}) => {
  const { userInfo } = info
  const { balance, uid } = userInfo
  const sysStore = UGStore.globalProps.sysConf
  const { mobile_logo = '' } = sysStore

  return (
    <SafeAreaView style={{ backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <View style={{ flexDirection: 'row', marginHorizontal: 10, backgroundColor: '#FFFFFF' }}>
        <FastImage resizeMode={'contain'} style={{ width: 127, height: 40 }} source={{ uri: mobile_logo }} />
        <View style={{ flex: 1 }} />
        {!uid ? <LoginButtonBar /> :
          <TouchableWithoutFeedback onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.存款)
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
              <Image style={{ width: 20, height: 20 }}
                     source={{ uri: httpClient.defaults.baseURL + '/views/mobileTemplate/19/images/coin.png' }} />
              <UGText style={{ marginLeft: 10 }}>{balance || '0.000'}</UGText>
            </View>
          </TouchableWithoutFeedback>
        }
      </View>
    </SafeAreaView>
  )
}
