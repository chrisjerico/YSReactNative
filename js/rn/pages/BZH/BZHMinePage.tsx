import React from 'react'
import { ScrollView } from 'react-native'
import MineHeaderComponent from '../../public/components/tars/MineHeaderComponent'
import PickAvatarComponent from '../../public/components/tars/PickAvatarComponent'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import { ugLog } from '../../public/tools/UgLog'
import BottomGap from '../../public/views/tars/BottomGap'
import Button from '../../public/views/tars/Button'
import GameButton from '../../public/views/tars/GameButton'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import UserCenterItem from '../../public/views/tars/UserCenterItem'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import config from './config'
import ProfileBlock from './views/ProfileBlock'

const BZHMinePage = () => {
  const { getHtml5Image } = useHtml5Image()
  const { pickAvatarComponentRef, onPressAvatar, onSaveAvatarSuccess, value, sign } = useMinePage({
    homePage: PageName.BZHHomePage,
    defaultUserCenterLogos: config?.defaultUserCenterLogos,
  })

  const { balance, userCenterItems, curLevelGrade, usr, isTest, avatar, unreadMsg } = value

  const { signOut } = sign

  // data handle
  const profileUserCenterItems = userCenterItems?.slice(0, 4) ?? []
  const listUserCenterItems = userCenterItems?.slice(4, userCenterItems?.length) ?? []

  return (
    <>
      <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor}>
        <MineHeaderComponent
          title={'会员中心'}
          showCustomerService={false}
          onPressCustomerService={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
        }}
      // refreshControl={<RefreshControlComponent onRefresh={() => { }} />} 暂时注释掉
      >
        <ProfileBlock
          balance={balance}
          onPressAvatar={onPressAvatar}
          level={curLevelGrade}
          avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
          name={usr}
          features={profileUserCenterItems}
          renderFeature={(item, index) => {
            const { logo, name, code } = item

            ugLog('features item=', item)
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
              showUnreadMsg={code == 9}
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
        color={BZHThemeColor.宝石红.themeColor}
        initAvatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
        onSaveAvatarSuccess={onSaveAvatarSuccess}
      />
    </>
  )
}

export default BZHMinePage
