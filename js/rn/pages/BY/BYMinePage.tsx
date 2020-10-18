import React from 'react'
import BackBtnComponent from '../../public/components/tars/BackBtnComponent'
import { PageName } from '../../public/navigation/Navigation'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { StyleSheet, View, Text } from 'react-native'
import { scale } from '../../public/tools/Scale'
import Avatar from '../../public/views/tars/Avatar'
import config from './config'
import useMinePage from '../../public/hooks/tars/useMinePage'

const BYMinePage = () => {
  const { pickAvatarComponentRef, onPressAvatar, onSaveAvatarSuccess, value, sign } = useMinePage({
    homePage: PageName.BZHHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })

  const { userInfo, sysInfo } = value

  const { balance, curLevelGrade, usr, isTest, avatar, unreadMsg } = userInfo
  const { userCenterItems, currency, balanceDecimal } = sysInfo

  const { signOut } = sign

  return (
    <>
      <SafeAreaHeader headerColor={'#ffffff'}>
        <BackBtnComponent
          homePage={PageName.BYHomePage}
          renderHeader={(props) => <MineHeader {...props} title={'我的'} showRightTitle={false} titleStyle={{ color: '#000000' }} backBtnColor={'#000000'} />}
        />
      </SafeAreaHeader>
      <View style={{ aspectRatio: 5, backgroundColor: '#ffffff', margin: scale(10), flex: 1 }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Avatar size={50} uri={avatar} />
          <View>
            <Text>{usr}</Text>
            <Text>{curLevelGrade}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>
    </>
  )
}

export default BYMinePage
