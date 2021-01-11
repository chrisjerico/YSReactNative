import React from 'react'
import { ScrollView } from 'react-native'
import BackBtnComponent from '../../public/components/tars/BackBtnComponent'
import PickAvatarComponent from '../../public/components/tars/PickAvatarComponent'
import AppDefine from '../../public/define/AppDefine'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { scale } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import BottomGap from '../../public/views/tars/BottomGap'
import Button from '../../public/views/tars/Button'
import GameButton from '../../public/views/tars/GameButton'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import UserCenterItem from '../../public/views/tars/UserCenterItem'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import config from './config'
import ProfileBlock from './views/ProfileBlock'

const BZHMinePage = () => {
  const { pickAvatarComponentRef, onPressAvatar, onSaveAvatarSuccess, info, sign } = useMinePage({
    homePage: PageName.BZHHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })

  const { userInfo, sysInfo } = info

  const { balance, curLevelGrade, usr, isTest, avatar, unreadMsg } = userInfo
  const { userCenterItems, currency, balanceDecimal } = sysInfo

  const { signOut } = sign

  // data handle
  const profileUserCenterItems = userCenterItems?.slice(0, 4) ?? []
  const listUserCenterItems = userCenterItems?.slice(4, userCenterItems?.length) ?? []

  return (
    <>
      <SafeAreaHeader headerColor={skinColors.themeColor.宝石红}>
        <BackBtnComponent homePage={PageName.BZHHomePage} renderHeader={(props) => <MineHeader {...props} title={'会员中心'} showRightTitle={false} onPressBackBtn={() =>
          OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0])} />
        } />
      </SafeAreaHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: skinColors.homeContentSubColor.宝石红,
        }}
        // refreshControl={<RefreshControlComponent onRefresh={() => { }} />} 暂时注释掉
      >
        <ProfileBlock
          balance={balance}
          onPressAvatar={onPressAvatar}
          level={curLevelGrade}
          avatar={isTest || !avatar ? AppDefine.defaultAvatar : avatar}
          name={usr}
          currency={currency}
          features={profileUserCenterItems}
          balanceDecimal={balanceDecimal}
          renderFeature={(item, index) => {
            const { logo, name, code } = item
            return (
              <GameButton
                key={index}
                showSecondLevelIcon={false}
                containerStyle={{ width: '25%' }}
                imageContainerStyle={{ width: '50%' }}
                titleContainerStyle={{ aspectRatio: 3.5 }}
                titleStyle={{ fontSize: scale(22), fontWeight: '300' }}
                enableCircle={false}
                logo={logo}
                title={name}
                onPress={() => PushHelper.pushUserCenterType(code)}
              />
            )
          }}
        />
        {listUserCenterItems?.map((item, index) => {
          const { code, name, logo } = item
          return (
            <UserCenterItem
              key={index}
              containerStyle={{
                backgroundColor: '#ffffff',
                aspectRatio: 490 / 68,
              }}
              arrowColor={'#d82e2f'}
              titleStyle={{ fontSize: scale(22) }}
              title={name}
              logo={logo}
              unreadMsg={unreadMsg || 0}
              showUnReadMsg={code == UGUserCenterType.站内信 && unreadMsg > 0}
              onPress={() => {
                PushHelper.pushUserCenterType(code)
              }}
            />
          )
        })}
        <Button
          title={'退出登录'}
          containerStyle={{
            backgroundColor: '#ffffff',
            marginHorizontal: scale(25),
            marginVertical: scale(15),
            borderRadius: scale(7),
            height: scale(70),
          }}
          titleStyle={{ color: '#db6372', fontSize: scale(21) }}
          onPress={signOut}
        />
        <BottomGap />
      </ScrollView>
      <PickAvatarComponent
        ref={pickAvatarComponentRef}
        color={skinColors.themeColor.宝石红}
        initAvatar={isTest || !avatar ? AppDefine.defaultAvatar : avatar}
        onSaveAvatarSuccess={onSaveAvatarSuccess}
      />
    </>
  )
}

export default BZHMinePage
