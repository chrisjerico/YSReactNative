import React, { useRef, useState } from 'react'
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal from 'react-native-modal'
import { useSafeArea } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AnnouncementModal from '../../public/components/tars/AnnouncementModal'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import { PageName } from '../../public/navigation/Navigation'
import { navigate } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import BannerBlock from '../../public/views/tars/BannerBlock'
import GameButton from '../../public/views/tars/GameButton'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import TouchableImage from '../../public/views/tars/TouchableImage'
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import TabComponent from './components/TabComponent'
import Header from './views/Header'
import RowGameButtom from './views/RowGameButtom'

const WNZHomePage = () => {
  const announcementModal = useRef(null)
  const [menuIsVisible, setMenuIsVisible] = useState(false)
  const safeArea = useSafeArea()
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const SystemStore = useSelector((state: IGlobalState) => state.SysConfReducer)
  const { avatar, balance, usr }: UGUserModel = userStore
  const { mobile_logo }: UGSysConfModel = SystemStore
  const {
    loading,
    banner,
    notice,
    homeGames,
    categoryList,
    rankList,
    lotteryGames,
    systemHomeAds,
  } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'lhcdoc_categoryList',
    'system_rankingList',
    'game_lotteryGames',
    'system_homeAds',
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

  if (loading) {
    return <ProgressCircle />
  } else {
    return (
      <>
        <Header
          marginTop={safeArea?.top}
          backgroundColor={WNZThemeColor.威尼斯.themeColor}
          name={usr}
          logo={mobile_logo}
          balance={balance}
          onPressMenu={() => {
            setMenuIsVisible(true)
          }}
          onPressComment={() => {
            console.log('去六合彩')
          }}
          onPressUser={() => navigate(PageName.WNZMinePage, {})}
        />
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
          <TouchableImage
            pic={ads[0]?.image}
            onPress={() => {
              PushHelper.pushCategory(
                ads[0]?.linkCategory,
                ads[0]?.linkPosition
              )
            }}
            containerStyle={{ width: '100%', aspectRatio: 4 }}
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
            rankLists={rankLists}
            containerStyle={{ paddingBottom: scaleHeight(70) }}
            rankContainerStyle={{ borderRadius: 0 }}
          />
        </ScrollView>
        <Modal
          isVisible={menuIsVisible}
          animationIn={'slideInRight'}
          animationOut={'slideOutRight'}
          style={{ width: '100%' }}
        >
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                setMenuIsVisible(false)
              }}
            />
            <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
              <Text>{'dsdd'}</Text>
            </View>
          </View>
        </Modal>
        <AnnouncementModal
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
