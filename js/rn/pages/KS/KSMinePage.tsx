import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import MineHeaderComponent from '../../public/components/tars/MineHeaderComponent'
import PickAvatarComponent from '../../public/components/tars/PickAvatarComponent'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import LinearBadge from '../../public/views/tars/LinearBadge'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import config from './config'

const KSMinePage = () => {
  const { getHtml5Image } = useHtml5Image()
  const { pickAvatarComponentRef, onPressAvatar, onSaveAvatarSuccess, value, sign } = useMinePage({
    homePage: PageName.BZHHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })

  const { balance, userCenterItems, curLevelGrade, usr, isTest, avatar, unreadMsg } = value

  const { signOut } = sign

  // data handle
  const profileUserCenterItems = userCenterItems?.slice(0, 4) ?? []
  const listUserCenterItems = userCenterItems?.slice(4, userCenterItems?.length) ?? []

  const badges = [
    {
      title: '实名认证',
      logo: getHtml5Image(22, 'smrz'),
    },
    {
      title: '帐户安全',
      logo: getHtml5Image(22, 'qkzh'),
    },
    {
      title: '取款帐户',
      logo: getHtml5Image(22, 'qkzh'),
    },
  ]
  return (
    <>
      <SafeAreaHeader headerColor={'#000000'}>
        <MineHeaderComponent title={'会员中心'} showRightTitle={false} />
      </SafeAreaHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#000000',
          paddingHorizontal: scale(20),
        }}
        // refreshControl={<RefreshControlComponent onRefresh={() => { }} />} 暂时注释掉
      >
        <LinearGradient colors={['#eb5d4d', '#fb2464']} style={{ borderRadius: scale(10), width: '100%', aspectRatio: 2, paddingHorizontal: scale(20) }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ color: '#ffffff', fontSize: scale(30) }}>{usr}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <FastImage source={{ uri: getHtml5Image(22, 'touxiang') }} style={{ height: '50%', aspectRatio: 1 }} />
              <Text style={{ color: '#ffffff', marginLeft: scale(20), fontSize: scale(25) }}>{curLevelGrade}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <FastImage source={{ uri: 'http://t132f.fhptcdn.com/images/task.svg' }} style={{ height: '50%', aspectRatio: 1 }} />
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {badges?.map((item, index) => {
              const { title, logo } = item
              return <LinearBadge key={index} colors={['transparent', 'transparent']} title={title} containerStyle={{ borderRadius: 0 }} showIcon={false} logo={logo} showLogo={true} />
            })}
          </View>
        </LinearGradient>
      </ScrollView>
      <PickAvatarComponent
        ref={pickAvatarComponentRef}
        color={BZHThemeColor.宝石红.themeColor}
        initAvatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
        onSaveAvatarSuccess={onSaveAvatarSuccess}
      />
    </>
  )
}

export default KSMinePage
