import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import PushHelper from '../../public/define/PushHelper'
import useLoginOut from '../../public/hooks/useLoginOut'
import useMemberItems from '../../public/hooks/useMemberItems'
import { PageName } from '../../public/navigation/Navigation'
import APIRouter from '../../public/network/APIRouter'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import { Toast } from '../../public/tools/ToastUtils'
import BottomBlank from '../../public/views/tars/BottomBlank'
import FeatureList from '../../public/views/tars/FeatureList'
import GameButton from '../../public/views/tars/GameButton'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { UGStore } from '../../redux/store/UGStore'
import PickAvatarComponent from './components/PickAvatarComponent'
import ProfileBlock from './components/ProfileBlock'

const BZHMinePage = () => {
  // yellowBox
  console.disableYellowBox = true
  // hooks

  const { loginOut } = useLoginOut(PageName.BZHHomePage)
  const { UGUserCenterItem } = useMemberItems()
  // stores
  const {
    avatar,
    balance,
    usr,
    isTest,
    unreadMsg,
    curLevelGrade,
  }: UGUserModel = UGStore.globalProps.userInfo
  // states
  const [visible, setVisible] = useState(false)
  const [avatarList, setAvatarList] = useState([])
  const [avatarListLoading, setAvatarListLoading] = useState(true)
  // effects
  const getAvatarList = async () => {
    try {
      setAvatarListLoading(true)
      const value = await APIRouter.system_avatarList()
      const avatarList = value?.data?.data ?? []
      setAvatarList(avatarList)
    } catch (err) {
    } finally {
      setAvatarListLoading(false)
    }
  }

  useEffect(() => {
    getAvatarList()
  }, [])

  // data
  const features = UGUserCenterItem?.slice(0, 4) ?? []
  const featureList = UGUserCenterItem?.slice(4, UGUserCenterItem.length) ?? []

  return (
    <>
      <SafeAreaHeader
        containerStyle={styles.headerContainer}
        headerColor={BZHThemeColor.宝石红.themeColor}
      >
        <Text style={styles.headerTitle}>{'会员中心'}</Text>
      </SafeAreaHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControlComponent
            onRefresh={async () => {
              await updateUserInfo()
              await getAvatarList()
            }}
          />
        }
      >
        <ProfileBlock
          onPressAvatar={() => !isTest && setVisible(true)}
          onPressReload={async () => {
            const { data } = await APIRouter.user_balance_token()
            UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } });
          }}
          level={curLevelGrade}
          avatar={isTest ? 'http://test05.6yc.com/views/mobileTemplate/18/images/money-2.png' : avatar}
          money={balance}
          name={usr}
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
              unreadMsg={unreadMsg || 0}
              showUnreadMsg={code == 9}
              onPress={() => {
                PushHelper.pushUserCenterType(code)
              }}
            />
          )
        })}
        <Button
          activeOpacity={1}
          title={'退出登录'}
          buttonStyle={styles.logOutButton}
          titleStyle={styles.logOutTitle}
          onPress={loginOut}
        />
        <BottomBlank />
      </ScrollView>
      <PickAvatarComponent
        loading={avatarListLoading}
        visible={visible}
        avatars={avatarList}
        onPressSave={async ({ url, filename }) => {
          try {
            UGStore.dispatch({ type: 'merge', userInfo: { avatar: url } });
            const value = await APIRouter.task_changeAvatar(filename)
            if (value?.data?.code == 0) {
              Toast('修改头像成功')
            } else {
              Toast('修改头像失败')
            }
          } catch (err) {
            Toast(err)
          } finally {
            setVisible(false)
          }
        }}
        onPressCancel={() => {
          setVisible(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
  },
  logOutButton: {
    backgroundColor: '#ffffff',
    marginHorizontal: scale(25),
    marginVertical: scale(25),
    borderRadius: scale(7),
    height: scale(70),
  },
  logOutTitle: {
    color: '#e53333',
  },
  headerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default BZHMinePage
