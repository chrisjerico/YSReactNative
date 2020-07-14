import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import PushHelper from '../../public/define/PushHelper'
import useLoginOut from '../../public/hooks/useLoginOut'
import useMemberItems from '../../public/hooks/useMemberItems'
import { PageName } from '../../public/navigation/Navigation'
import APIRouter from '../../public/network/APIRouter'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import FeatureList from '../../public/views/tars/FeatureList'
import GameButton from '../../public/views/tars/GameButton'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { ActionType } from '../../redux/store/ActionTypes'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import Header from './views/mines/Header'
import PickAvatarComponent from './views/mines/PickAvatarComponent'
import ProfileBlock from './views/mines/ProfileBlock'

const defaultAvatars = [
  'http://test05.6yc.com/images/face/memberFace1.jpg',
  'http://test05.6yc.com/images/face/memberFace2.jpg',
  'http://test05.6yc.com/images/face/memberFace3.jpg',
  'http://test05.6yc.com/images/face/memberFace4.jpg',
  'http://test05.6yc.com/images/face/memberFace5.jpg',
  'http://test05.6yc.com/images/face/memberFace6.jpg'
]

const BZHMinePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const dispatch = useDispatch()
  const { loginOut } = useLoginOut(PageName.BZHHomePage)
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const {
    // avatar,
    balance,
    usr,
    isTest,
    unreadMsg,
    curLevelGrade,
  }: UGUserModel = userStore
  const { UGUserCenterItem } = useMemberItems()
  const [visible, setVisible] = useState(false)
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
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
            dispatch({
              type: ActionType.UpdateUserInfo,
              props: { balance: data.data.balance },
            })
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
          titleStyle={{ color: '#e53333' }}
          onPress={loginOut}
        />
      </ScrollView>
      <PickAvatarComponent visible={visible} avatars={defaultAvatars} onPressSave={(avatar) => {
        setAvatar(avatar)
        setVisible(false)
      }} onPressCancel={() => { setVisible(false) }} />
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
    marginBottom: scale(70)
  },
  logOutButton: {
    backgroundColor: '#ffffff',
    marginHorizontal: scale(25),
    marginVertical: scale(25),
    borderRadius: scale(7),
    height: scale(70),
  },
})

export default BZHMinePage
