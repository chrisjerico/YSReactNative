import React, { useEffect } from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector } from 'react-redux'
import { scale } from '../../helpers/function'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import useLoginOut from '../../public/hooks/useLoginOut'
import useMemberItems from '../../public/hooks/useMemberItems'
import { PageName } from '../../public/navigation/Navigation'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import {
  IGlobalStateHelper,
  updateUserInfo
} from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import FeatureList from '../../views/FeatureList'
import Header from './views/mines/Header'
import ProfileBlock from './views/mines/ProfileBlock'
import NavButton from './views/NavButton'

const BZHMinePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const { loginOut } = useLoginOut(PageName.BZHHomePage)
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { avatar, balance, usr }: UGUserModel = userStore
  const { UGUserCenterItem } = useMemberItems()

  const {
    //loading,
    homeGames,
  } = useGetHomeInfo(['game_homeGames'])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateUserInfo()
    })
    return unsubscribe
  }, [])

  const navs =
    homeGames?.data?.navs?.sort((nav: any) => -nav.sort).slice(0, 4) ?? []

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('-----成為焦點-----')
      IGlobalStateHelper.updateUserInfo()
    })
    return unsubscribe
  }, [])

  // functions
  const gotoHome = () => {
    navigation.navigate('LHTHomePage')
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={'会员中心'} />
      <ScrollView
        style={styles.container}
        scrollEnabled={true}
        refreshControl={<RefreshControl refreshing={false} />}
      >
        <ProfileBlock
          containerStyle={{ paddingBottom: scale(30) }}
          avatar={avatar}
          money={balance}
          name={usr}
          features={navs}
          renderFeature={(item, index) => {
            const { icon, title } = item
            return (
              <NavButton
                key={index}
                logo={icon}
                title={title}
                onPress={() => PushHelper.pushHomeGame(item)}
              />
            )
          }}
        />
        {UGUserCenterItem?.map((item, index) => {
          const { code, name, logo } = item
          return (
            <FeatureList
              key={index}
              containerStyle={{ backgroundColor: '#ffffff' }}
              title={name}
              logo={logo}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#e53333',
    flex: 1,
  },
  container: {
    backgroundColor: '#d9d9d9',
  },
  logOutButton: {
    backgroundColor: '#ffffff',
    marginHorizontal: scale(25),
    marginVertical: scale(25),
    height: scale(70),
  },
})

export default BZHMinePage
