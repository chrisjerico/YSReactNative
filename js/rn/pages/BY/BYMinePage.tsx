import React, { useCallback } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import BackBtnComponent from '../../public/components/tars/BackBtnComponent'
import PickAvatarComponent from '../../public/components/tars/PickAvatarComponent'
import ReLoadBalanceComponent from '../../public/components/tars/ReLoadBalanceComponent'
import AppDefine from '../../public/define/AppDefine'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { scale } from '../../public/tools/Scale'
import Avatar from '../../public/views/tars/Avatar'
import BottomGap from '../../public/views/tars/BottomGap'
import GameButton from '../../public/views/tars/GameButton'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import UserCenterItem from '../../public/views/tars/UserCenterItem'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import config from './config'
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'

const BYMinePage = () => {
  const { pickAvatarComponentRef, onPressAvatar, onSaveAvatarSuccess, info } = useMinePage({
    homePage: PageName.BZHHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })

  const { userInfo, sysInfo } = info

  const { balance, curLevelGrade, usr, isTest, avatar, unreadMsg, curLevelInt } = userInfo
  const { userCenterItems, currency, balanceDecimal } = sysInfo

  const navUserCenterItems = userCenterItems?.slice(0, 4)

  const firstUserCenterItems = userCenterItems?.slice(4, 8)
  const secondUserCenterItems = userCenterItems?.slice(8, 14)
  const thirdUserCenterItems = userCenterItems?.slice(14, 17)
  const forthUserCenterItems = userCenterItems?.slice(17, userCenterItems?.length)

  return (
    <>
      <SafeAreaHeader headerColor={'#ffffff'}>
        <BackBtnComponent
          homePage={PageName.BYHomePage}
          renderHeader={(props) => <MineHeader {...props} title={'我的'} showRightTitle={false} titleStyle={{ color: '#000000' }} backBtnColor={'#000000'} />}
        />
      </SafeAreaHeader>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }} style={{ flex: 1, backgroundColor: '#E0E0E0' }} showsVerticalScrollIndicator={false}>
        <View style={{ aspectRatio: 2, backgroundColor: '#ffffff', marginVertical: scale(10), width: '98%' }}>
          <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: AppDefine.onePx, borderColor: '#d9d9d9', alignItems: 'center', paddingLeft: scale(20) }}>
            <Avatar size={100} uri={isTest || !avatar ? AppDefine.defaultAvatar : avatar} onPress={onPressAvatar} />
            <View style={{ marginLeft: scale(20) }}>
              <UGText style={{ fontSize: scale(25) }}>{usr}</UGText>
              <UGText style={{ fontSize: scale(25) }}>{curLevelGrade}</UGText>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row', paddingBottom: scale(20) }}>
            <View style={{ flex: 1, borderRightWidth: AppDefine.onePx, borderColor: '#d9d9d9', justifyContent: 'space-between', paddingVertical: scale(20), paddingLeft: scale(10) }}>
              <UGText style={{ fontSize: scale(20), color: '#8e8e93' }}>{'余额(RMB)>'}</UGText>
              <ReLoadBalanceComponent balance={balance} balanceDecimal={balanceDecimal} currency={currency} iconColor={'#007aff'} balanceStyle={{ fontWeight: '600', fontSize: scale(25) }} />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: scale(20), paddingLeft: scale(10) }}>
              <UGText style={styles.title}>{'积分>'}</UGText>
              <UGText style={{ fontWeight: '600', fontSize: scale(25), color: '#007aff' }}>{curLevelInt}</UGText>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '98%', backgroundColor: '#ffffff', alignItems: 'center', aspectRatio: 3.5, borderRadius: scale(5) }}>
          {navUserCenterItems?.map((item, index) => {
            const onPress = useCallback(() => {
              PushHelper.pushUserCenterType(code)
            }, [])
            const { logo, code, name } = item
            return <GameButton key={index} logo={logo} containerStyle={{ flex: 1 }} imageContainerStyle={{ width: '30%' }} showSubTitle={false} enableCircle={false} title={name} onPress={onPress} />
          })}
        </View>
        <List
          uniqueKey={'BYMinePageUserCenterItems'}
          contentContainerStyle={{ width: '98%', marginTop: scale(10) }}
          data={[firstUserCenterItems, secondUserCenterItems, thirdUserCenterItems, forthUserCenterItems]}
          renderItem={({ item, index }) => {
            return (
              <List
                uniqueKey={'BYMinePageUserCenterItems' + index}
                style={{ borderRadius: scale(5), marginBottom: scale(10), overflow: 'hidden' }}
                data={item}
                renderItem={({ item }) => {
                  const { logo, code, name } = item
                  return (
                    <UserCenterItem
                      containerStyle={{
                        backgroundColor: '#ffffff',
                        aspectRatio: 490 / 68,
                      }}
                      arrowColor={'#47535b'}
                      titleStyle={{ fontSize: scale(22) }}
                      title={name}
                      logo={logo}
                      unreadMsg={unreadMsg || 0}
                      showUnReadMsg={code == UGUserCenterType.站内信 && unreadMsg > 0}
                      onPress={() => {
                        PushHelper.pushUserCenterType(code)
                      }}
                    />
                  )
                }}
              />
            )
          }}
        />
        <BottomGap />
      </ScrollView>
      <PickAvatarComponent ref={pickAvatarComponentRef} color={'red'} initAvatar={isTest || !avatar ? AppDefine.defaultAvatar : avatar} onSaveAvatarSuccess={onSaveAvatarSuccess} />
    </>
  )
}

const styles = StyleSheet.create({
  title: { fontSize: scale(20), color: '#8e8e93' },
})

export default BYMinePage
