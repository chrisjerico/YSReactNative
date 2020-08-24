import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import PushHelper from '../../public/define/PushHelper'
import useLoginOut from '../../public/hooks/useLoginOut'
import useMemberItems from '../../public/hooks/useMemberItems'
import { PageName } from '../../public/navigation/Navigation'
import APIRouter from '../../public/network/APIRouter'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import FeatureList from '../../public/views/tars/FeatureList'
import GameButton from '../../public/views/tars/GameButton'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState, UGStore } from '../../redux/store/UGStore'
import Header from './views/mines/Header'
import PickAvatarComponent from './views/mines/PickAvatarComponent'
import ProfileBlock from './views/mines/ProfileBlock'
import { Toast } from '../../public/tools/ToastUtils'

const BZHMinePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const { loginOut } = useLoginOut(PageName.BZHHomePage)
  const userStore = UGStore.globalProps.userInfo;
  const {
    avatar,
    balance,
    usr,
    isTest,
    unreadMsg,
    curLevelGrade,
  }: UGUserModel = userStore
  const { UGUserCenterItem } = useMemberItems()
  const [visible, setVisible] = useState(false)
  const [avatarList, setAvatarList] = useState([])

  useEffect(() => {
    APIRouter.system_avatarList().then((value) => {
      setAvatarList(value?.data?.data ?? [])
    })
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('-----成為焦點-----')
      updateUserInfo()
    })
    return unsubscribe
  }, [])

  const features = UGUserCenterItem?.slice(0, 4) ?? []
  const featureList = UGUserCenterItem?.slice(4, UGUserCenterItem.length) ?? []

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={'会员中心'} />
      <ScrollView style={styles.container}>
        <ProfileBlock
          onPressAvatar={() => setVisible(true)}
          onPressReload={async () => {
            const { data } = await APIRouter.user_balance_token()
            UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } });
          }}
          level={curLevelGrade}
          avatar={avatar}
          money={balance}
          name={isTest ? '遊客' : usr}
          features={features}
          renderFeature={(item, index) => {
            const { logo, name, code } = item
            return (
              <GameButton
                key={index}
                containerStyle={{ width: '20%' }}
                titleStyle={{ fontSize: scale(25) }}
                enableCircle={false}
                logo={logo}
                title={name}
                onPress={() => PushHelper.pushUserCenterType(code)}
              />
            )
          }}
        />
        {featureList?.map((item, index) => {
          const { code, name, logo } = item
          return (
            <FeatureList
              key={index}
              containerStyle={{ backgroundColor: '#ffffff' }}
              title={name}
              logo={logo}
              unreadMsg={unreadMsg}
              showUnreadMsg={code == 9}
              onPress={() => PushHelper.pushUserCenterType(code)}
            />
          )
        })}
        <Button
          title={'退出登录'}
          buttonStyle={styles.logOutButton}
          titleStyle={styles.logOutTitle}
          onPress={loginOut}
        />
      </ScrollView>
      <PickAvatarComponent
        visible={visible}
        avatars={avatarList}
        onPressSave={({ url, filename }) => {
          setVisible(false)
          UGStore.dispatch({ type: 'merge', userInfo: { avatar: url } });
          APIRouter.task_changeAvatar(filename).then((value) => {
            if (value?.data?.code == 0) {
              Toast('修改头像成功')
            } else {
              Toast('修改头像失败')
            }
          })
        }}
        onPressCancel={() => {
          setVisible(false)
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: BZHThemeColor.宝石红.bgColor?.[0],
  },
  logOutButton: {
    backgroundColor: '#ffffff',
    marginHorizontal: scale(25),
    marginVertical: scale(25),
    marginBottom: scaleHeight(60),
    borderRadius: scale(7),
    height: scale(70),
  },
  logOutTitle: {
    color: '#e53333',
  },
})

export default BZHMinePage
