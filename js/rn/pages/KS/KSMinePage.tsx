import React from 'react'
import { ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import BackBtnComponent from '../../public/components/tars/BackBtnComponent'
import ReLoadBalanceComponent from '../../public/components/tars/ReLoadBalanceComponent'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { scale } from '../../public/tools/Scale'
import { getIbbImage, goToUserCenterType, useHtml5Image } from '../../public/tools/tars'
import BottomGap from '../../public/views/tars/BottomGap'
import Button from '../../public/views/tars/Button'
import GameButton from '../../public/views/tars/GameButton'
import LinearBadge from '../../public/views/tars/LinearBadge'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import config from './config'

const { getHtml5Image } = useHtml5Image('http://t132f.fhptcdn.com/')

const KSMinePage = () => {
  const { value, sign } = useMinePage({
    homePage: PageName.KSHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })

  const { userInfo, sysInfo } = value

  const { balance, curLevelGrade, usr, unreadMsg } = userInfo
  const { userCenterItems, currency, balanceDecimal } = sysInfo

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
      <SafeAreaHeader headerColor={'#000000'}>
        <BackBtnComponent homePage={PageName.KSHomePage} renderHeader={(props) => <MineHeader {...props} title={'会员中心'} showRightTitle={false} />} />
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
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TouchableWithoutFeedback onPress={goToUserCenterType.任务中心}>
                <FastImage source={{ uri: getIbbImage('dkQCr80/task') }} style={{ height: '50%', aspectRatio: 3 }} resizeMode={'contain'} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={goToUserCenterType.每日签到}>
                <FastImage source={{ uri: getIbbImage('R4c4wv6/signup') }} style={{ height: '50%', aspectRatio: 3 }} resizeMode={'contain'} />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {badges?.map((item, index) => {
              const { title, logo, code } = item
              return (
                <LinearBadge
                  key={index}
                  colors={['transparent', 'transparent']}
                  title={title}
                  containerStyle={{ borderRadius: 0 }}
                  showIcon={false}
                  logo={logo}
                  showLogo={true}
                  onPress={() => {
                    PushHelper.pushUserCenterType(code)
                  }}
                />
              )
            })}
          </View>
        </LinearGradient>
        <View style={{ width: '100%', aspectRatio: 4, justifyContent: 'space-evenly', paddingLeft: scale(20) }}>
          <Text style={{ color: '#ffffff', fontSize: scale(30), fontWeight: '500' }}>{'总资产'}</Text>
          <ReLoadBalanceComponent
            title={'¥ '}
            titleStyle={{ color: '#ffffff', fontSize: scale(30), fontWeight: '500' }}
            balance={balance}
            balanceStyle={{ color: '#ffffff', fontSize: scale(30), fontWeight: '500' }}
            iconColor={'#ffffff'}
            size={30}
            currency={currency}
            balanceDecimal={balanceDecimal}
          />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {topUserCenterItems.map((item, index) => {
            const { logo, name, code } = item
            return (
              <LinearBadge
                key={index}
                colors={index ? ['#3a3a41', '#3a3a41'] : ['#eb5d4d', '#fb7a24']}
                containerStyle={{ width: '31%', aspectRatio: 2, borderRadius: scale(10), alignItems: 'center', height: null }}
                title={name}
                textStyle={{ color: '#ffffff', fontSize: scale(20), maxWidth: '60%' }}
                showIcon={false}
                showLogo={true}
                logo={logo}
                onPress={() => {
                  PushHelper.pushUserCenterType(code)
                }}
              />
            )
          })}
        </View>
        <List
          uniqueKey={'KSMinePage'}
          numColumns={3}
          style={{ backgroundColor: '#3a3a41', marginTop: scale(10), borderRadius: scale(10), paddingVertical: scale(15) }}
          data={listUserCenterItems}
          renderItem={({ item }) => {
            const { name, logo, code } = item
            return (
              <GameButton
                title={name}
                logo={logo}
                enableCircle={false}
                titleStyle={{ color: '#ffffff' }}
                containerStyle={{ width: '33%', marginVertical: scale(15) }}
                imageContainerStyle={{ width: '50%' }}
                titleContainerStyle={{ aspectRatio: 5 }}
                unreadMsg={unreadMsg || 0}
                showUnReadMsg={code == UGUserCenterType.站内信 && unreadMsg > 0}
                showSubTitle={false}
                onPress={() => {
                  PushHelper.pushUserCenterType(code)
                }}
              />
            )
          }}
        />
        <Button
          title={'退出登录'}
          titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
          containerStyle={{ width: '100%', aspectRatio: 7, backgroundColor: '#3a3a41', marginTop: scale(10), borderRadius: scale(5), marginBottom: scale(20) }}
          onPress={signOut}
        />
        <BottomGap />
      </ScrollView>
    </>
  )
}

export default KSMinePage
