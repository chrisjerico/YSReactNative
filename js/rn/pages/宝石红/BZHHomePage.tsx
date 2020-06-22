import React, { useEffect } from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { useSelector } from 'react-redux'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import BannerBlock from '../../views/BannerBlock'
import NoticeBlock from '../../views/NoticeBlock'
import RankBlock from '../../views/RankBlock'
import TouchableImage from '../../views/TouchableImage'
import { scale, three } from './helpers/function'
import GameBlock from './views/homes/GameBlock'
import Header from './views/homes/Header'
import NavBlock from './views/homes/NavBlock'
import NavButton from './views/NavButton'
import TabButton from './views/TabButton'

const BZHHomePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { usr, balance }: UGUserModel = userStore
  const { loading, banner, homeGames, notice, onlineNum } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'system_onlineCount',
  ])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateUserInfo()
    })
    return unsubscribe
  }, [])

  // data handle
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
  const videos = games?.filter((ele) => ele?.name == '视讯')[0]?.list ?? []
  const threeLotterys = three(lotterys)
  const threeChess = three(chess)
  const threeVideos = three(videos)

  const totalGames = [
    {
      title: '彩票',
      games: threeLotterys,
    },
    {
      title: '棋牌',
      games: threeChess,
    },
    {
      title: '视讯',
      games: threeVideos,
    },
  ]

  return (
    <SafeAreaView style={loading ? styles.loadingSafeArea : styles.safeArea}>
      {loading ? (
        <UGProgressCircle />
      ) : (
          <>
            <Header name={usr} money={balance} />
            <ScrollView
              style={[styles.container]}
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
                notices={notices}
                onPressNotice={({ value }) => PushHelper.pushNoticePopUp(value)}
              />
              <NavBlock
                navs={navs}
                renderNav={(item, index) => {
                  const { icon, name, logo } = item
                  return (
                    <NavButton
                      key={index}
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
                      title={title}
                      containerStyle={styles.subComponent}
                      games={games}
                      renderGame={(item, index) => {
                        const { title, logo, show } = item
                        return (
                          <TabButton
                            key={index}
                            logo={logo}
                            mainTitle={title}
                            show={show}
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
                rankLists={[]}
              />
            </ScrollView>
          </>
        )}
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
    backgroundColor: '#e53333',
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
  },
})

export default BZHHomePage
