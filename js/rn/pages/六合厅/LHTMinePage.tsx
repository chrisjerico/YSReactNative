import React, { useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import PushHelper from '../../public/define/PushHelper'
import useLoginOut from '../../public/hooks/useLoginOut'
import useMemberItems from '../../public/hooks/useMemberItems'
import { PageName } from '../../public/navigation/Navigation'
import APIRouter from '../../public/network/APIRouter'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import FeatureList from '../../public/views/tars/FeatureList'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { ActionType } from '../../redux/store/ActionTypes'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import { defaultDaySignUrl, defaultProfileButtons } from './helpers/config'
import Header from './views/mines/Header'
import ProfileBlock from './views/mines/ProfileBlock'
import ProfileButton from './views/ProfileButton'

const LHTMinePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const dispatch = useDispatch()
  const { loginOut } = useLoginOut(PageName.LHTHomePage)
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const {
    avatar,
    usr,
    curLevelGrade,
    balance,
    unreadMsg,
    isTest,
  }: UGUserModel = userStore
  const { UGUserCenterItem } = useMemberItems()
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateUserInfo()
    })
    return unsubscribe
  }, [])

  // functions
  const gotoHome = () => {
    navigation.navigate('LHTHomePage')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        onPressBack={gotoHome}
        onPressCustomerService={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.QQ客服)
        }}
      />
      <ScrollView
        style={styles.container}
      >
        <ProfileBlock
          profileButtons={defaultProfileButtons}
          name={isTest ? '遊客' : usr}
          avatar={avatar}
          level={curLevelGrade}
          balance={balance}
          onPressDaySign={() => {
            PushHelper.openWebView(defaultDaySignUrl)
          }}
          onPressTaskCenter={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
          }}
          onPressReload={async () => {
            const { data } = await APIRouter.user_balance_token()
            dispatch({
              type: ActionType.UpdateUserInfo,
              props: { balance: data.data.balance },
            })
          }}
          renderProfileButton={(item, index) => {
            const { title, logo, userCenterType } = item
            return (
              <ProfileButton
                key={index}
                title={title}
                logo={logo}
                onPress={() => {
                  PushHelper.pushUserCenterType(userCenterType)
                }}
              />
            )
          }}
        />
        {UGUserCenterItem?.map((item, index) => {
          const { code, name, logo } = item
          return (
            <FeatureList
              key={index}
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
          onPress={loginOut}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: LHThemeColor.六合厅.themeColor,
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffff',
  },
  logOutButton: {
    backgroundColor: '#ff861b',
    marginHorizontal: scale(25),
    marginVertical: scale(25),
    height: scale(70),
  },
})

export default LHTMinePage
