import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import BackBtnComponent from '../../public/components/tars/BackBtnComponent'
import PickAvatarComponent from '../../public/components/tars/PickAvatarComponent'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import AppDefine from '../../public/define/AppDefine'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import { goToUserCenterType, useHtml5Image } from '../../public/tools/tars'
import BottomGap from '../../public/views/tars/BottomGap'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import UserCenterItem from '../../public/views/tars/UserCenterItem'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import config from './config'
import ProfileBlock from './views/ProfileBlock'
import ProfileButton from './views/ProfileButton'

const LHTMinePage = () => {
  const { pickAvatarComponentRef, onPressAvatar, onSaveAvatarSuccess, value, sign } = useMinePage({
    homePage: PageName.LHTHomePage,
    defaultUserCenterLogos: config.defaultUserCenterLogos,
  })

  const { userInfo, sysInfo } = value
  const { balance, curLevelGrade, usr, isTest, avatar, unreadMsg } = userInfo
  const { userCenterItems, showSign, currency, balanceDecimal } = sysInfo
  const { signOut } = sign
  return (
    <>
      <SafeAreaHeader headerColor={LHThemeColor.六合厅.themeColor}>
        <BackBtnComponent homePage={PageName.LHTMinePage} renderHeader={(props) => <MineHeader {...props} title={'会员中心'} onPressRightTitle={goToUserCenterType.在线客服} />} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} refreshControl={<RefreshControlComponent onRefresh={() => {}} />} showsVerticalScrollIndicator={false}>
        <ProfileBlock
          showSignBadge={showSign}
          onPressAvatar={onPressAvatar}
          profileButtons={config?.profileButtons}
          name={usr}
          showK={currency == 'VND'}
          balanceDecimal={balanceDecimal}
          avatar={isTest || !avatar ? AppDefine.defaultAvatar : avatar}
          level={curLevelGrade}
          balance={balance}
          currency={currency}
          onPressDaySign={goToUserCenterType.每日签到}
          onPressTaskCenter={goToUserCenterType.任务中心}
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
            <UserCenterItem
              key={index}
              containerStyle={{
                aspectRatio: 490 / 56,
                width: '95%',
              }}
              titleStyle={{ fontSize: scale(20) }}
              title={name}
              logo={logo}
              unreadMsg={unreadMsg || 0}
              showUnReadMsg={code == UGUserCenterType.站内信 && unreadMsg > 0}
              onPress={() => PushHelper.pushUserCenterType(code)}
            />
          )
        })}
        <Button title={'退出登录'} containerStyle={styles.logOutButton} titleStyle={{ color: '#ffffff' }} onPress={signOut} />
        <BottomGap />
      </ScrollView>
      <PickAvatarComponent
        ref={pickAvatarComponentRef}
        color={LHThemeColor.六合厅.themeColor}
        initAvatar={isTest || !avatar ? AppDefine.defaultAvatar : avatar}
        onSaveAvatarSuccess={onSaveAvatarSuccess}
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
  },
})

export default LHTMinePage
