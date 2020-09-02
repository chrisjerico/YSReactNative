import React from 'react'
import { ScrollView } from 'react-native'
import PickAvatarComponent from '../../public/components/tars/PickAvatarComponent'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import PushHelper from '../../public/define/PushHelper'
import useMinePage from '../../public/hooks/tars/useMinePage'
import { PageName } from '../../public/navigation/Navigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import BottomGap from '../../public/views/tars/BottomGap'
import Button from '../../public/views/tars/Button'
import FeatureList from '../../public/views/tars/FeatureList'
import GameButton from '../../public/views/tars/GameButton'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import config from './config'
import ProfileBlock from './views/ProfileBlock'

const BZHMinePage = (props: any) => {
  const { setProps } = props
  const { getHtml5Image } = useHtml5Image()
  const {
    balance,
    userCenterItems,
    showBackBtn,
    curLevelGrade,
    usr,
    isTest,
    avatar,
    unreadMsg,
    avatarListLoading,
    avatarListVisible,
    avatarList,
    fetchAvatarList,
    saveAvatar,
    signOut,
    openAvatarList,
    closeAvatarList,
    goBack,
  } = useMinePage({
    setProps,
    homePage: PageName.BZHHomePage,
    defaultUserCenterLogos: config.defaultUserCenterLogos,
  })

  // data handle
  const features = userCenterItems?.slice(0, 4) ?? []
  const featureList = userCenterItems?.slice(4, userCenterItems?.length) ?? []

  return (
    <>
      <SafeAreaHeader
        containerStyle={{
          aspectRatio: 540 / 50,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}
        headerColor={BZHThemeColor.宝石红.themeColor}
      >
        <MineHeader
          showBackBtn={showBackBtn}
          onPressLeftTool={goBack}
          shoeRightTool={false}
          title={'会员中心'}
        />
      </SafeAreaHeader>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
        }}
        refreshControl={<RefreshControlComponent onRefresh={fetchAvatarList} />}
      >
        <ProfileBlock
          balance={balance}
          onPressAvatar={openAvatarList}
          level={curLevelGrade}
          avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
          name={usr}
          features={features}
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
        {featureList?.map((item, index) => {
          const { code, name, logo } = item
          return (
            <FeatureList
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

export default BZHMinePage
