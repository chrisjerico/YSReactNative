import React, { useEffect } from 'react'
import { RefreshControl, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import PushHelper from '../../public/define/PushHelper'
import useMemberItems from '../../public/hooks/useMemberItems'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import { defaultProfileButtons } from './helpers/config'
import FeatureList from './views/FeatureList'
import Header from './views/mines/Header'
import ProfileBlock from './views/mines/ProfileBlock'
import ProfileButton from './views/ProfileButton'

const LHTMinePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
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

  const gotoUserCenter = (userCenterType: UGUserCenterType) => {
    PushHelper.pushUserCenterType(userCenterType)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        onPressBack={gotoHome}
        onPressCustomerService={() => {
          gotoUserCenter(UGUserCenterType.QQ客服)
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
          renderProfileButton={(item, index) => {
            const { title, logo, userCenterType } = item
            return (
              <ProfileButton
                key={index}
                title={title}
                logo={logo}
                onPress={() => {
                  gotoUserCenter(userCenterType)
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
              onPress={() => gotoUserCenter(code)}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loadingSafeArea: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#2894FF',
    flex: 1,
  },
  container: {
    backgroundColor: '#ffffff',
  },
})

export default LHTMinePage
