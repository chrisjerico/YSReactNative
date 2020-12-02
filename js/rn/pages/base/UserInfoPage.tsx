import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/temp/MineHeader'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { pop } from '../../public/navigation/RootNavigation'
import Avatar from '../../public/views/tars/Avatar'
import { UGStore } from '../../redux/store/UGStore'
import AppDefine from '../../public/define/AppDefine'

const UserInfoPage = () => {
  const userInfo = UGStore.globalProps.userInfo
  const { avatar, isTest, usr } = userInfo

  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'我的资料'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <View>
        <ImageBackground source={{ uri: 'xiawu' }} style={{ width: '100%', aspectRatio: 2 }}>
          <View style={{ flex: 2, flexDirection: 'row', paddingLeft: '5%', marginTop: '3%' }}>
            <Avatar uri={isTest || !avatar ? AppDefine.defaultAvatar : avatar} />
            <View style={{ height: '50%', justifyContent: 'space-around', marginTop: '2%', marginLeft: '2%' }}>
              <Text>{usr}</Text>
              <Text>{'2020.12.02 13.21'}</Text>
            </View>
          </View>
          <View style={{ flex: 1.5, backgroundColor: 'rgba(0,0,0,0.3)', paddingLeft: '3%' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: '#ffffff', fontSize: 20 }}>{'下午好'}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ color: '#ffffff' }}>{'下午，补充能量继续战斗'}</Text>
            </View>
          </View>
        </ImageBackground>
        <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
          <Text style={{ fontSize: 25 }}>{'我的资料'}</Text>
        </View>
      </View>
    </>
  )
}

export default UserInfoPage
