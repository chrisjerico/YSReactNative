import React, { useEffect, useRef, useState } from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AnnouncementModal from '../../public/components/tars/AnnouncementModal'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import BannerBlock from '../../public/views/tars/BannerBlock'
import GameButton from '../../public/views/tars/GameButton'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import TouchableImage from '../../public/views/tars/TouchableImage'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import GameBlock from './views/homes/GameBlock'
import Header from './views/homes/Header'
import NavBlock from './views/homes/NavBlock'

const BZHHomePage = ({ navigation }) => {
  // yellowBox edededededededededededededededededed
  console.disableYellowBox = true
  // hooks
  const announcementModal = useRef(null)
  const [roulette, setRoulette] = useState(null)
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const SystemStore = useSelector((state: IGlobalState) => state.SysConfReducer)
  const { uid, usr, balance, isTest }: UGUserModel = userStore
  const { mobile_logo } = SystemStore
  const {
    loading,
    banner,
    homeGames,
    notice,
    onlineNum,
    rankList,
    redBag,
  } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'system_onlineCount',
    'system_rankingList',
    'activity_redBagDetail',
    'activity_turntableList',
  ])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateUserInfo()
      console.log('------focus------')
    })
    return unsubscribe
  }, [])
  useEffect(() => {
    if (uid) {
      APIRouter.activity_turntableList().then((value) => {
        setRoulette(value?.data?.data)
      })
    }
  }, [uid])

  // data handle
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const announcements = notice?.data?.popup ?? []
  const navs =
    homeGames?.data?.navs
      ?.sort((a: any, b: any) => a.sort - b.sort)
      .slice(0, 4) ?? []
  const games = homeGames?.data?.icons?.slice(0, 3) ?? []
  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <ProgressCircle />
      ) : (
          <>
            <Header
              logo={mobile_logo}
              isTest={isTest}
              uid={uid}
              name={isTest ? '遊客' : usr}
              money={balance}
              onPressSignIn={() => push(PageName.BZHSignInPage)}
              onPressSignUp={() => push(PageName.BZHRegisterPage)}
              onPressUser={() => {
                navigate(PageName.BZHHomePage, { index: 4 })
              }}
            />
            <ScrollView
              style={styles.container}
              scrollEnabled={true}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={() => {
                    announcementModal?.current?.reload()
                  }}
                />
              }
            >
              <BannerBlock
                onlineNum={onlineNum}
                banners={banners}
                renderBanner={(item, index) => {
                  const { linkCategory, linkPosition, pic } = item
                  return (
                    <TouchableImage
                      key={index}
                      pic={pic}
                      onPress={() => {
                        PushHelper.pushCategory(linkCategory, linkPosition)
                      }}
                    />
                  )
                }}
              />
              <NoticeBlock
                containerStyle={{ borderRadius: 0 }}
                notices={notices}
                onPressNotice={({ value }) => PushHelper.pushNoticePopUp(value)}
              />
              <NavBlock
                navs={navs}
                renderNav={(item, index) => {
                  const { icon, name, logo } = item
                  return (
                    <GameButton
                      key={index}
                      containerStyle={{ width: '20%' }}
                      enableCircle={false}
                      logo={icon ? icon : logo}
                      title={name}
                      titleStyle={{ fontSize: scale(25) }}
                      onPress={() => {
                        PushHelper.pushHomeGame(item)
                      }}
                    />
                  )
                }}
              />
              <View style={styles.contentContainer}>
                {games.map((item) => {
                  const { name, list } = item
                  return (
                    <GameBlock
                      onPressTotal={() =>
                        PushHelper.pushUserCenterType(UGUserCenterType.游戏大厅)
                      }
                      title={name}
                      containerStyle={styles.subComponent}
                      contentContainerStyle={{ paddingTop: scale(20) }}
                      games={list}
                      renderGame={(item, index) => {
                        const { title, logo, icon, name, subtitle } = item
                        return (
                          <GameButton
                            key={index}
                            resizeMode={'contain'}
                            containerStyle={[
                              styles.gameContainer,
                              {
                                marginLeft: index % 3 == 1 ? '5%' : 0,
                                marginRight: index % 3 == 1 ? '5%' : 0,
                              },
                            ]}
                            enableCircle={false}
                            logo={icon || logo}
                            title={name || title}
                            subTitle={subtitle}
                            showSubTitle
                            titleStyle={{
                              fontSize: scale(27)
                            }}
                            subTitleStyle={{
                              fontSize: scale(23),
                            }}
                            titleContainerStyle={{
                              marginTop: scale(5)
                            }}
                            onPress={() => {
                              PushHelper.pushHomeGame(item)
                            }}
                          />
                        )
                      }}
                    />
                  )
                })}
              </View>
              <AnimatedRankComponent
                containerStyle={styles.subComponent}
                rankContainerStyle={{
                  width: '95%',
                  borderWidth: scale(1),
                  borderColor: '#d9d9d9',
                  alignSelf: 'center',
                }}
                iconContainerStyle={{
                  backgroundColor: '#ffffff',
                  borderBottomColor: '#d9d9d9',
                  borderBottomWidth: scale(1),
                }}
                rankLists={rankLists}
              />
            </ScrollView>
          </>
        )}
      <ActivityComponent
        show={uid && redBagLogo && !isTest}
        logo={redBagLogo}
        onPress={() => {
          PushHelper.pushRedBag(redBag)
        }}
      />
      <ActivityComponent
        containerStyle={{ top: 100 }}
        enableFastImage={false}
        show={uid && roulette && !isTest}
        logo={'dzp_btn'}
        onPress={() => {
          PushHelper.pushWheel(roulette)
        }}
      />
      <AnnouncementModal
        ref={announcementModal}
        announcements={announcements}
        color={BZHThemeColor.宝石红.themeColor}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    flex: 1,
  },
  container: {
    backgroundColor: BZHThemeColor.宝石红.bgColor?.[0],
    marginBottom: scale(70)
  },
  contentContainer: {
    paddingHorizontal: scale(5),
    paddingTop: scale(10),
  },
  subComponent: {
    marginTop: scale(10),
    backgroundColor: '#ffffff',
  },
  gameContainer: {
    width: '30%',
    height: null,
    marginBottom: scale(20),
  },
})

export default BZHHomePage
