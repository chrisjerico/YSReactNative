import React from 'react'
import { ScrollView, Text, View, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import AntDesign from 'react-native-vector-icons/AntDesign'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { scale } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import Avatar from '../../public/views/tars/Avatar'
import BottomGap from '../../public/views/tars/BottomGap'
import Button from '../../public/views/tars/Button'
import GameButton from '../../public/views/tars/GameButton'
import List from '../../public/views/tars/List'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import config from './config'

const JXHMinePage = () => {
  const { getHtml5Image } = useHtml5Image()
  const { value, sign } = useMinePage({
    homePage: PageName.JXHHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })

  const { userInfo, sysInfo } = value

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
            <Avatar uri={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar} />
            <View style={{ height: '100%', justifyContent: 'space-between', paddingVertical: '8%', marginLeft: scale(10) }}>
              <Text style={{ color: '#a0a0a0', fontSize: scale(20) }}>{usr}</Text>
              <Text style={{ color: '#cfa461', fontSize: scale(20) }}>{curLevelGrade}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
            }}>
            <View style={{ flex: 1, height: '100%' }}>
              <FastImage source={{ uri: 'http://t132f.fhptcdn.com/static/vuePublic/images/my/userInfo/dailysign.png' }} style={{ height: '100%', width: '100%' }} resizeMode={'contain'} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ backgroundColor: '#333333', aspectRatio: 3, borderRadius: scale(5) }}>
          <View style={{ flex: 1, paddingLeft: scale(20), alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: '#676767', marginRight: scale(10) }}>{'账户余额'}</Text>
            <AntDesign name={'eye'} color={'#676767'} size={20} />
          </View>
          <View style={{ flex: 1.5, paddingLeft: scale(20) }}>
            <Text style={{ color: '#cfa461', fontSize: scale(35) }}>{balance}</Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
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
          </View>
        </View>
        <List
          uniqueKey={'JXHMinePage'}
          style={{ paddingVertical: scale(15) }}
          data={JXHuserCenterItems}
          numColumns={3}
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
                containerStyle={{ marginVertical: scale(15) }}
                showUnReadMsg={code == UGUserCenterType.站内信}
                unreadMsg={unreadMsg || 0}
                onPress={code == -1 ? signOut : () => {}}
              />
            )
          }}
        />
        <BottomGap />
      </ScrollView>
    </>
  )
}

export default JXHMinePage
