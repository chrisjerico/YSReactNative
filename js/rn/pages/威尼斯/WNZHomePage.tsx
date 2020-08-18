import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import {
  OCEvent,
  OCEventType
} from '../../public/define/OCHelper/OCBridge/OCEvent'
import PushHelper, { PushRightMenuFrom } from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { updateUserInfo } from '../../public/tools/tars'
import { B_DEBUG } from '../../public/tools/UgLog'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomLogo from '../../public/views/tars/BottomLogo'
import GameButton from '../../public/views/tars/GameButton'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import UGSysConfModel from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { UGStore } from '../../redux/store/UGStore'
import TabComponent from './components/TabComponent'
import HomeHeader from './views/HomeHeader'
import RowGameButtom from './views/RowGameButtom'

const WNZHomePage = (props: any) => {
  const { setProps } = props
  const {
    balance,
    usr,
    uid,
    isTest,
  }: UGUserModel = UGStore.globalProps.userInfo
  const {
    mobile_logo,
    webName,
    rankingListSwitch,
  }: UGSysConfModel = UGStore.globalProps.sysConf
  const {
    systemConfig,
    loading,
    banner,
    notice,
    homeGames,
    rankList,
    lotteryGames,
    systemHomeAds,
    onRefresh,
  } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'lhcdoc_categoryList',
    'system_rankingList',
    'game_lotteryGames',
    'system_homeAds',
    'system_config',
  ])

  const bannersInterval = parseInt(banner?.data?.interval)
  const adSliderTimer = parseInt(systemConfig?.data?.adSliderTimer)
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
  let lotterys = []
  lotteryGames?.data?.forEach((ele) => (lotterys = lotterys.concat(ele?.list)))
  const customiseGames = lotterys.filter((ele) => ele?.customise == '2') // 信
  const officialGames = lotterys.filter((ele) => ele?.customise == '0') // 官
  const announcements =
    notice?.data?.popup?.map((item: any) => {
      return Object.assign(
        { clsName: 'UGNoticeModel', hiddenBottomLine: 'No' },
        item
      )
    }) ?? []

  // const addEvents = (events: OCEventType[] = []) => {
  //   events?.forEach(event => {
  //     OCEvent.addEvent(event, async () => {
  //       try {
  //         await updateUserInfo()
  //         setProps()
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     })
  //   })
  // }

  useEffect(() => {
    OCEvent.addEvent(OCEventType.UGNotificationLoginComplete, async () => {
      try {
        await updateUserInfo()
        setProps()
      } catch (error) {
        console.log(error)
      }
    })
    OCEvent.addEvent(OCEventType.UGNotificationUserLogout, async () => {
      try {
        console.log("----------登出了----------", uid)
        UGStore.dispatch({ type: 'reset', userInfo: {} })
        UGStore.save()
        setProps()
      } catch (error) {
        console.log(error)
      }
    })
    // addEvents([OCEventType.UGNotificationLoginComplete, OCEventType.UGNotificationUserLogout])
    return () => {
      OCEvent.removeEvents(OCEventType.UGNotificationLoginComplete)
      OCEvent.removeEvents(OCEventType.UGNotificationUserLogout)
    }
  })

  useEffect(() => {
    if (notice?.data?.popup) {
      if (!B_DEBUG) {
        PushHelper.pushAnnouncement(announcements)
      }
    }
  }, [notice])

  if (loading) {
    return <ProgressCircle />
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
          <HomeHeader
            showBalance={uid ? true : false}
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
          showsVerticalScrollIndicator={false}
          style={styles.container}
          refreshControl={
            <RefreshControlComponent
              onRefresh={async () => {
                onRefresh()
              }}
            />
          }
        >
          <BannerBlock
            autoplayTimeout={bannersInterval}
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
          <View style={{ flexDirection: 'row', backgroundColor: '#ffffff' }}>
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
            visible={ads?.length > 0}
            autoplayTimeout={adSliderTimer}
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
            elementHeight={scale(100)}
            leftGames={officialGames}
            rightGames={customiseGames}
            renderLeftGame={(item, index) => {
              const { title, pic, openCycle } = item
              return (
                <RowGameButtom
                  key={index}
                  logo={pic}
                  name={title}
                  desc={openCycle}
                  logoBallText={'官'}
                />
              )
            }}
            renderRightGame={(item, index) => {
              const { title, pic, openCycle } = item
              return (
                <RowGameButtom
                  key={index}
                  logo={pic}
                  name={title}
                  desc={openCycle}
                  logoBallText={'信'}
                />
              )
            }}
          />
          <AnimatedRankComponent
            type={rankingListSwitch}
            rankLists={rankLists}
            rankContainerStyle={{ borderRadius: 0 }}
          />
          <BottomLogo
            webName={webName}
            onPressComputer={() => {
              PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
            }}
            onPressPromotion={() => {
              push(PageName.PromotionListPage)
            }}
            debug={true}
            version={'20200815'}
          />
          <View style={styles.bottomComponent} />
        </ScrollView>
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
  bottomComponent: {
    paddingBottom: scaleHeight(70),
  },
})

export default WNZHomePage
