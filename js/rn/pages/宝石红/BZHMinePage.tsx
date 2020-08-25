import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Button } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import { getHtml5Image } from '../../public/tools/tars'
import BottomGap from '../../public/views/tars/BottomGap'
import FeatureList from '../../public/views/tars/FeatureList'
import GameButton from '../../public/views/tars/GameButton'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import PickAvatarComponent from './components/PickAvatarComponent'
import ProfileBlock from './views/ProfileBlock'

const BZHMinePage = (props: any) => {
  const { setProps } = props
  const {
    userCenterItems,
    showBackBtn,
    curLevelGrade,
    money,
    usr,
    isTest,
    avatar,
    unreadMsg,
    avatarListLoading,
    avatarListVisible,
    avatarList,
    fetchAvatarList,
    fetchBalance,
    saveAvatar,
    signOut,
    openAvatarList,
    closeAvatarList,
    goBack
  } = useMinePage({ setProps, homePage: PageName.BZHHomePage })

  // data handle
  const features = userCenterItems?.slice(0, 4) ?? []
  const featureList = userCenterItems?.slice(4, userCenterItems?.length) ?? []

  return (
    <>
      <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor}>
        {showBackBtn ? (
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <AntDesign
              name={'left'}
              color={'#ffffff'}
              size={scale(25)}
              onPress={goBack}
            />
          </View>
        ) : (
            <View style={{ flex: 1 }} />
          )}
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.headerTitle}>{'会员中心'}</Text>
        </View>
        <View style={{ flex: 1 }} />
      </SafeAreaHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        refreshControl={
          <RefreshControlComponent
            onRefresh={fetchAvatarList}
          />
        }
      >
        <ProfileBlock
          onPressAvatar={openAvatarList}
          onPressReload={fetchBalance}
          level={curLevelGrade}
          avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
          money={money}
          name={usr}
          features={features}
          renderFeature={(item, index) => {
            const { logo, name, code } = item
            return (
              <GameButton
                key={index}
                showSecondLevelIcon={false}
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
          onPress={signOut}
        />
        <BottomGap />
      </ScrollView>
      <PickAvatarComponent
        color={BZHThemeColor.宝石红.themeColor}
        loading={avatarListLoading}
        visible={avatarListVisible}
        initAvatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
        avatars={avatarList}
        onPressSave={saveAvatar}
        onPressCancel={closeAvatarList}
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
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default BZHMinePage
