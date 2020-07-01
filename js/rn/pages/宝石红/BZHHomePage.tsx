import React, { useEffect } from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { useSelector } from 'react-redux'
import ActivityComponent from '../../components/ActivityComponent'
import { scale } from '../../helpers/function'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import BannerBlock from '../../views/BannerBlock'
import GameButton from '../../views/GameButton'
import NoticeBlock from '../../views/NoticeBlock'
import ProgressCircle from '../../views/ProgressCircle'
import RankBlock from '../../views/RankBlock'
import TouchableImage from '../../views/TouchableImage'
import GameBlock from './views/homes/GameBlock'
import Header from './views/homes/Header'
import NavBlock from './views/homes/NavBlock'


const BZHHomePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { uid, usr, balance, isTest }: UGUserModel = userStore
  const {
    loading,
    banner,
    homeGames,
    notice,
    onlineNum,
    rankList,
    redBag,
    turntableList,
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

  // data handle
  const roulette = turntableList?.data
  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const navs =
    homeGames?.data?.navs?.sort((nav: any) => -nav.sort).slice(0, 4) ?? []
  const games = homeGames?.data?.icons ?? []
  const lotterys =
    games
      ?.filter((ele) => ele?.name == '彩票')[0]
      ?.list?.filter((ele) => ele.levelType == '1') ?? []
  const chess = games?.filter((ele) => ele?.name == '棋牌')[0]?.list ?? []
  const videos = games?.filter((ele) => ele?.name == '真人')[0]?.list ?? []

  const totalGames = [
    {
      title: '彩票',
      games: lotterys,
    },
    {
      title: '棋牌',
      games: chess,
    },
    {
      title: '视讯',
      games: videos,
    },
  ]

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <ProgressCircle />
      ) : (
          <>
            <Header
              isTest={isTest}
              uid={uid}
              name={usr}
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
              refreshControl={<RefreshControl refreshing={false} />}
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
                      containerStyle={{ width: '25%' }}
                      circleColor={'transparent'}
                      logo={icon ? icon : logo}
                      title={name}
                      onPress={() => PushHelper.pushHomeGame(item)}
                    />
                  )
                }}
              />
              <View style={styles.contentContainer}>
                {totalGames.map((item) => {
                  const { title, games } = item
                  return (
                    <GameBlock
                      onPressTotal={() =>
                        PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
                      }
                      title={title}
                      containerStyle={styles.subComponent}
                      games={games}
                      renderGame={(item, index) => {
                        const { title, logo, name, icon } = item
                        return (
                          <GameButton
                            key={index}
                            containerStyle={{ width: '33.3%' }}
                            circleColor={'transparent'}
                            logo={logo || icon}
                            title={title || name}
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
              <RankBlock
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
      {
        // 紅包活動
        <ActivityComponent
          show={uid && redBagLogo}
          logo={redBagLogo}
          onPress={() => {
            PushHelper.pushRedBag(redBag)
          }}
        />
        /* {
        // 輪盤活動
        (uid && roulette) ? (
          <TouchableImage
            pic={redBagLogo}
            onPress={() => {
              PushHelper.pushWheel(turntableList)
            }}
            containerStyle={styles.redEnvelope}
          />
        ) : null
      } */
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    flex: 1,
  },
  container: {
    backgroundColor: '#f6f6f6',
  },
  contentContainer: {
    paddingHorizontal: scale(5),
    paddingTop: scale(10),
  },
  subComponent: {
    marginTop: scale(10),
    backgroundColor: '#ffffff',
  }
})

export default BZHHomePage
