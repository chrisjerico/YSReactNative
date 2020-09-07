import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import MineHeaderComponent from '../../public/components/tars/MineHeaderComponent'
import PickAvatarComponent from '../../public/components/tars/PickAvatarComponent'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import BottomGap from '../../public/views/tars/BottomGap'
import Button from '../../public/views/tars/Button'
import FeatureList from '../../public/views/tars/FeatureList'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import config from './config'
import ProfileBlock from './views/ProfileBlock'
import ProfileButton from './views/ProfileButton'

const LHTMinePage = () => {
  const { getHtml5Image } = useHtml5Image()
  const {
    value,
    fetchAvatarList,
    saveAvatar,
    sign,
    openAvatarList,
    closeAvatarList,
  } = useMinePage({
    homePage: PageName.LHTHomePage,
    defaultUserCenterLogos: config.defaultUserCenterLogos,
  })

  const {
    balance,
    userCenterItems,
    curLevelGrade,
    usr,
    isTest,
    avatar,
    unreadMsg,
    avatarListLoading,
    avatarListVisible,
    avatarList,
  } = value

  const { signOut } = sign
  return (
    <>
      <SafeAreaHeader headerColor={LHThemeColor.六合厅.themeColor}>
        <MineHeaderComponent
          title={'会员中心'}
          showCustomerService={true}
          onPressCustomerService={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControlComponent onRefresh={fetchAvatarList} />}
        showsVerticalScrollIndicator={false}
      >
        <ProfileBlock
          shoeSignBadge={false}
          onPressAvatar={openAvatarList}
          profileButtons={config?.profileButtons}
          name={usr}
          avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
          level={curLevelGrade}
          balance={balance}
          onPressDaySign={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
          }}
          onPressTaskCenter={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
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
        {userCenterItems?.map((item, index) => {
          const { code, name, logo } = item
          return (
            <FeatureList
              key={index}
              containerStyle={{
                aspectRatio: 490 / 56,
                width: '95%',
              }}
              titleStyle={{ fontSize: scale(20) }}
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
          containerStyle={styles.logOutButton}
          titleStyle={{ color: '#ffffff' }}
          onPress={signOut}
        />
        <BottomGap />
      </ScrollView>
      <PickAvatarComponent
        color={LHThemeColor.六合厅.themeColor}
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
    backgroundColor: '#ffffff',
  },
  logOutButton: {
    backgroundColor: '#ff6b1b',
    marginHorizontal: scale(25),
    marginVertical: scale(25),
    height: scale(70),
    borderRadius: scale(5),
  }
})

export default LHTMinePage
