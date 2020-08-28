import React from 'react'
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
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import BottomGap from '../../public/views/tars/BottomGap'
import FeatureList from '../../public/views/tars/FeatureList'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import PickAvatarComponent from '../宝石红/components/PickAvatarComponent'
import config from './config'
import ProfileBlock from './views/ProfileBlock'
import ProfileButton from './views/ProfileButton'

const LHTMinePage = (props: any) => {
  const { setProps } = props
  const { getHtml5Image } = useHtml5Image()
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
    goBack,
  } = useMinePage({ setProps, homePage: PageName.LHTHomePage, defaultUserCenterLogos: config.defaultUserCenterLogos })

  return (
    <>
      <SafeAreaHeader headerColor={LHThemeColor.六合厅.themeColor}>
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
          <Text style={styles.headerTitle}>{'我的'}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        >
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <Text style={styles.headerTitle}>{'客服'}</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaHeader>
      <ScrollView
        style={styles.container}
        refreshControl={<RefreshControlComponent onRefresh={fetchAvatarList} />}

      >
        <ProfileBlock
          onPressAvatar={openAvatarList}
          profileButtons={config?.profileButtons}
          name={usr}
          avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
          level={curLevelGrade}
          balance={money}
          onPressDaySign={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
          }}
          onPressTaskCenter={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
          }}
          onPressReload={fetchBalance}
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
          onPress={signOut}
          activeOpacity={1}
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
    backgroundColor: '#ff861b',
    marginHorizontal: scale(25),
    marginVertical: scale(25),
    height: scale(70),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default LHTMinePage
