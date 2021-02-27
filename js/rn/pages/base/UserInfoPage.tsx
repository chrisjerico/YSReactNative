import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import Dash from 'react-native-dash'
import AppDefine from '../../public/define/AppDefine'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import Avatar from '../../public/views/tars/Avatar'
import Button from '../../public/views/tars/Button'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/temp/MineHeader'
import { UGStore } from '../../redux/store/UGStore'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const UserInfoPage = () => {
  const userInfo = UGStore.globalProps.userInfo
  const { avatar, isTest, usr, qq, phone, email, fullName } = userInfo
  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'我的资料(RN)'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <View>
        <ImageBackground source={{ uri: 'xiawu' }} style={{ width: '100%', aspectRatio: 2 }}>
          <View style={{ flex: 2, flexDirection: 'row', paddingLeft: '5%', marginTop: '3%' }}>
            <Avatar uri={isTest || !avatar ? AppDefine.defaultAvatar : avatar} />
            <View style={{ height: '50%', justifyContent: 'space-around', marginTop: '2%', marginLeft: '2%' }}>
              <UGText>{usr}</UGText>
              <UGText>{'2020.12.02 13.21'}</UGText>
            </View>
          </View>
          <View style={{ flex: 1.5, backgroundColor: 'rgba(0,0,0,0.3)', paddingLeft: '3%' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <UGText style={{ color: '#ffffff', fontSize: 20 }}>{'下午好'}</UGText>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <UGText style={{ color: '#ffffff' }}>{'下午，补充能量继续战斗'}</UGText>
            </View>
          </View>
        </ImageBackground>
        <View style={{ marginHorizontal: '5%', marginTop: '5%' }}>
          <UGText style={{ fontSize: 25, marginBottom: 20 }}>{'我的资料'}</UGText>
          <UGText style={{ fontSize: 20, marginBottom: 10 }}>{'帐号 : ' + usr}</UGText>
          <Dash style={styles.dash} dashGap={2} dashLength={4} dashThickness={1} dashColor={'#d9d9d9'} />
          <UGText style={{ fontSize: 20, marginVertical: 10 }}>{'真实姓名 : ' + fullName}</UGText>
          <Dash style={styles.dash} dashGap={2} dashLength={4} dashThickness={1} dashColor={'#d9d9d9'} />
          <UGText style={{ fontSize: 20, marginVertical: 10 }}>{'QQ : ' + qq}</UGText>
          <Dash style={styles.dash} dashGap={2} dashLength={4} dashThickness={1} dashColor={'#d9d9d9'} />
          <UGText style={{ fontSize: 20, marginVertical: 10 }}>{'手机 : ' + phone}</UGText>
          <Dash style={styles.dash} dashGap={2} dashLength={4} dashThickness={1} dashColor={'#d9d9d9'} />
          <UGText style={{ fontSize: 20, marginVertical: 10 }}>{'邮箱 : ' + email}</UGText>
          <Dash style={styles.dash} dashGap={2} dashLength={4} dashThickness={1} dashColor={'#d9d9d9'} />
          <UGText style={{ fontSize: 20, marginVertical: 10 }}>{'币别 : RMB'}</UGText>
          <Dash style={styles.dash} dashGap={2} dashLength={4} dashThickness={1} dashColor={'#d9d9d9'} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <UGText style={{ fontSize: 20, marginVertical: 10 }}>{'Facebook : '}</UGText>
            <Button title={'未绑定FB'} containerStyle={{ width: 100, height: 30, backgroundColor: '#ADADAD' }} titleStyle={{ color: '#ffffff' }} />
          </View>
          <Dash style={styles.dash} dashGap={2} dashLength={4} dashThickness={1} dashColor={'#d9d9d9'} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  dash: {
    width: '100%',
    height: 1,
  },
})

export default UserInfoPage
