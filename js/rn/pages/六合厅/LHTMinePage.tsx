import React, { useEffect } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Button } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import PushHelper from '../../public/define/PushHelper'
import useLogOut from '../../public/hooks/tars/useLogOut'
import useMemberItems from '../../public/hooks/useMemberItems'
import { PageName } from '../../public/navigation/Navigation'
import { navigate } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import BottomGap from '../../public/views/tars/BottomGap'
import FeatureList from '../../public/views/tars/FeatureList'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { UGStore } from '../../redux/store/UGStore'
import config from './config.json'
import ProfileBlock from './views/ProfileBlock'
import ProfileButton from './views/ProfileButton'

const LHTMinePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const { logOut } = useLogOut({
    onSuccess: () => {
      navigate(PageName.LHTHomePage, {})
    },
  }) // stores
  const {
    avatar,
    usr,
    balance,
    unreadMsg,
    isTest,
  }: UGUserModel = UGStore.globalProps.userInfo

  // effects
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
    <>
      <SafeAreaHeader headerColor={LHThemeColor.六合厅.themeColor}>
        <TouchableWithoutFeedback style={styles.headerLeft} onPress={gotoHome}>
          <AntDesign name={'left'} color={'#ffffff'} size={scale(25)} />
        </TouchableWithoutFeedback>
        <View style={styles.headerMid}>
          <Text style={styles.headerTitle}>{'我的'}</Text>
        </View>

        <TouchableWithoutFeedback
          style={styles.headerRight}
          onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        >
          <Text style={styles.headerTitle}>{'客服'}</Text>
        </TouchableWithoutFeedback>
      </SafeAreaHeader>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControlComponent />}
      >
        <ProfileBlock
          profileButtons={config?.profileButtons}
          name={isTest ? '遊客' : usr}
          avatar={avatar}
          // level={curLevelGrade}
          balance={balance}
          onPressDaySign={() => {
            PushHelper.openWebView(
              'http://test10.6yc.com/html/qiandao/index.html'
            )
          }}
          onPressTaskCenter={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
          }}
          onPressReload={async () => {
            const { data } = await APIRouter.user_balance_token()
            UGStore.dispatch({
              type: 'merge',
              userInfo: { balance: data.data.balance },
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
          onPress={logOut}
          activeOpacity={1}
        />
        <BottomGap />
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  logOutButton: {
    backgroundColor: '#ff861b',
    marginHorizontal: scale(25),
    marginVertical: scale(25),
    height: scale(70),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  headerMid: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default LHTMinePage
