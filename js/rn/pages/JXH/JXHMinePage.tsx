import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { scale } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import Avatar from '../../public/views/tars/Avatar'
import BottomGap from '../../public/views/tars/BottomGap'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import config from './config'

const JXHMinePage = () => {
  const { getHtml5Image } = useHtml5Image()
  const { value, sign } = useMinePage({
    homePage: PageName.KSHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })

  const { userInfo, sysInfo } = value

  const { balance, curLevelGrade, usr, unreadMsg, avatar } = userInfo
  const { userCenterItems } = sysInfo

  const { signOut } = sign

  // data handle
  const topUserCenterItems = userCenterItems?.slice(0, 3) ?? []
  const listUserCenterItems = userCenterItems?.slice(3, userCenterItems?.length) ?? []

  const badges = [
    {
      title: '实名认证',
      logo: getHtml5Image(22, 'smrz'),
      code: UGUserCenterType.个人信息,
    },
    {
      title: '帐户安全',
      logo: getHtml5Image(22, 'qkzh'),
      code: UGUserCenterType.安全中心,
    },
    {
      title: '取款帐户',
      logo: getHtml5Image(22, 'qkzh'),
      code: UGUserCenterType.存款纪录,
    },
  ]
  return (
    <>
      <SafeAreaHeader headerColor={'#000000'} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#000000',
          paddingHorizontal: scale(20),
        }}
        // refreshControl={<RefreshControlComponent onRefresh={() => { }} />} 暂时注释掉
      >
        <View style={{ aspectRatio: 4, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 3, flexDirection: 'row', alignItems: 'center', height: '100%' }}>
            <Avatar uri={avatar} />
            <View style={{ height: '100%', justifyContent: 'space-between', paddingVertical: '8%', marginLeft: scale(10) }}>
              <Text style={{ color: '#a0a0a0', fontSize: scale(20) }}>{usr}</Text>
              <Text style={{ color: '#cfa461', fontSize: scale(20) }}>{curLevelGrade}</Text>
            </View>
          </View>
          <FastImage source={{ uri: 'http://t132f.fhptcdn.com/static/vuePublic/images/my/userInfo/dailysign.png' }} style={{ flex: 1, height: '100%' }} resizeMode={'contain'} />
        </View>
        <View></View>
        <BottomGap />
      </ScrollView>
    </>
  )
}

export default JXHMinePage
