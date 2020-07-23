import React, { useRef } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AnnouncementModalComponent from '../../public/components/tars/AnnouncementModalComponent'
import PushHelper, { PushRightMenuFrom } from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import BannerBlock from '../../public/views/tars/BannerBlock'
import GameButton from '../../public/views/tars/GameButton'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import HomeHeader from './components/HomeHeader'
import MenuModalComponent from './components/MenuModalComponent'
import RowGameButtom from './components/RowGameButtom'
import TabComponent from './components/TabComponent'

const WNZHomePage = () => {
  const announcementModal = useRef(null)
  const menuModal = useRef(null)
  const { balance, usr }: UGUserModel = useSelector(
    (state: IGlobalState) => state.UserInfoReducer
  )
  const { mobile_logo, webName }: UGSysConfModel = useSelector(
    (state: IGlobalState) => state.SysConfReducer
  )
  const {
    loading,
    banner,
    notice,
    homeGames,
    categoryList,
    rankList,
    lotteryGames,
    systemHomeAds,
    systemConfig
  } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'lhcdoc_categoryList',
    'system_rankingList',
    'game_lotteryGames',
    'system_homeAds',
    'system_config'
  ])


  const announcements = notice?.data?.popup ?? []
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const ads = systemHomeAds?.data ?? []
  const navs =
    homeGames?.data?.navs?.sort((nav: any) => -nav.sort)?.slice(0, 5) ?? []
  let games = []
  homeGames?.data?.icons?.forEach(
    (item) => (games = games.concat(item?.list) ?? [])
  )
  games = games.sort((game: any) => -game.sort)?.slice(0, 24) ?? []
  const rankLists = rankList?.data?.list ?? []
  // 官 信
  const leftGames = categoryList?.data ?? []

  let lotterys = []
  lotteryGames?.data?.forEach(ele => lotterys?.concat(ele?.list))
  console.log("--------lotterys-------", lotterys)
  if (loading) {
    return <ProgressCircle />
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
          <HomeHeader
            name={usr}
            logo={mobile_logo}
            balance={balance}
            onPressMenu={() => {
              PushHelper.pushRightMenu(PushRightMenuFrom.首頁)
            }}
            onPressComment={() => {
              console.log('去六合彩')
            }}
            onPressUser={() => navigate(PageName.WNZMinePage, {})}
          />
        </SafeAreaHeader>
        <ScrollView
          style={styles.container}
          scrollEnabled={true}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                announcementModal?.current?.reload()
                updateUserInfo()
                // onRefresh()
              }}
            />
          }
        >
          <BannerBlock
            onlineNum={0}
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
            containerStyle={{ borderRadius: 0, marginBottom: scale(10) }}
            iconContainerStyle={{
              borderColor: 'red',
              borderWidth: scale(1),
              marginHorizontal: scale(10),
              borderRadius: scale(2),
            }}
            notices={notices}
            onPressNotice={({ value }) => PushHelper.pushNoticePopUp(value)}
            logoTextStyle={{ color: 'red' }}
          />
          <View style={{ flexDirection: 'row' }}>
            {navs.map((item, index) => {
              const { icon, name } = item
              return (
                <GameButton
                  key={index}
                  logo={icon}
                  title={name}
                  containerStyle={{
                    width: '20%',
                    backgroundColor: '#ffffff',
                    height: 115,
                    justifyContent: 'center',
                  }}
                  circleColor={'transparent'}
                />
              )
            })}
          </View>
          <BannerBlock
            showOnlineNum={false}
            banners={ads}
            renderBanner={(item, index) => {
              const { linkCategory, linkPosition, image } = item
              return (
                <TouchableImage
                  key={index}
                  pic={image}
                  onPress={() => {
                    PushHelper.pushCategory(linkCategory, linkPosition)
                  }}
                />
              )
            }}
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {games.map((item, index) => {
              const { logo, name } = item
              return (
                <View key={index} style={styles.gameContainer}>
                  <GameButton
                    logo={logo}
                    title={name}
                    containerStyle={{
                      width: '90%',
                      backgroundColor: '#ffffff',
                      aspectRatio: 0.9,
                      borderRadius: scale(10),
                      justifyContent: 'center',
                    }}
                    titleContainerStyle={{
                      aspectRatio: 5,
                      paddingTop: scale(5),
                    }}
                    enableCircle={false}
                    onPress={() => {
                      PushHelper.pushHomeGame(item)
                    }}
                  />
                </View>
              )
            })}
          </View>
          <TabComponent
            leftGames={leftGames}
            rightGames={leftGames}
            renderLeftGame={(item, index) => {
              const { name, icon, show, id, desc } = item
              return (
                <RowGameButtom
                  key={index}
                  logo={icon}
                  name={name}
                  desc={desc}
                  logoBallText={'官'}
                />
              )
            }}
            renderRightGame={(item, index) => {
              const { name, icon, show, id, desc } = item
              return (
                <RowGameButtom
                  key={index}
                  logo={icon}
                  name={name}
                  desc={desc}
                  logoBallText={'信'}
                />
              )
            }}
          />
          <AnimatedRankComponent
            onPressComputer={() => {
              PushHelper.openWebView(
                httpClient.defaults.baseURL + '/index2.php'
              )
            }}
            onPressPromotion={() => {
              push(PageName.PromotionListPage)
            }}
            rankLists={rankLists}
            containerStyle={{ paddingBottom: scaleHeight(70) }}
            rankContainerStyle={{ borderRadius: 0 }}
            webName={webName}

          />
        </ScrollView>
        <MenuModalComponent menus={[]} renderMenu={() => { }} ref={menuModal} />
        <AnnouncementModalComponent
          ref={announcementModal}
          announcements={announcements}
          color={WNZThemeColor.威尼斯.themeColor}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D0D0D0',
  },
  gameContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(5),
  },
})

export default WNZHomePage
