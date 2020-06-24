import React, { useEffect } from 'react'
import { RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from 'react-redux'
import { scale } from '../../helpers/function'
import PushHelper from '../../public/define/PushHelper'
import useLoginOut from '../../public/hooks/useLoginOut'
import useMemberItems from '../../public/hooks/useMemberItems'
import { PageName } from '../../public/navigation/Navigation'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import FeatureList from '../../views/FeatureList'
import { defaultDaySignUrl, defaultProfileButtons } from './helpers/config'
import Header from './views/mines/Header'
import ProfileBlock from './views/mines/ProfileBlock'
import ProfileButton from './views/ProfileButton'
import APIRouter from '../../public/network/APIRouter'
import { ActionType } from '../../redux/store/ActionTypes'

const LHTMinePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const dispatch = useDispatch()
  const { loginOut } = useLoginOut(PageName.LHTHomePage)
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { avatar, usr, curLevelGrade, balance }: UGUserModel = userStore
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
        scrollEnabled={true}
        refreshControl={<RefreshControl refreshing={false} />}
      >
        <ProfileBlock
          profileButtons={defaultProfileButtons}
          name={usr}
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
            dispatch({ type: ActionType.UpdateUserInfo, props: { balance: data.data.balance } })
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
    backgroundColor: '#2894FF',
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
