import React, { useEffect } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import GameSubTypeComponent from '../../public/components/tars/GameSubTypeComponent'
import {
  OCEvent,
  OCEventType
} from '../../public/define/OCHelper/OCBridge/OCEvent'
import PushHelper, { PushRightMenuFrom } from '../../public/define/PushHelper'
import useHome from '../../public/hooks/tars/useHome'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { getActivityPosition, ToastError } from '../../public/tools/tars'
import { B_DEBUG } from '../../public/tools/UgLog'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import BottomLogo from '../../public/views/tars/BottomLogo'
import Button from '../../public/views/tars/Button'
import CouponBlock from '../../public/views/tars/CouponBlock'
import GameButton from '../../public/views/tars/GameButton'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import UGSysConfModel, { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { UGStore } from '../../redux/store/UGStore'
import TabComponent from './components/TabComponent'
import config from './config'
import HomeHeader from './views/HomeHeader'
import RowGameButtom from './views/RowGameButtom'
import NavBlock from '../../public/views/tars/NavBlock'


const WNZHomePage = (props: any) => {
  // yellowBox
  console.disableYellowBox = true
  // functions
  const { setProps } = props
  const goToJDPromotionListPage = () => {
    push(PageName.JDPromotionListPage, {
      containerStyle: {
        backgroundColor: '#ffffff',
      },
    })
  }
  // stores
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
    m_promote_pos,
    adSliderTimer,
  }: UGSysConfModel = UGStore.globalProps.sysConf

  // effect
  const {
    loading,
    refresh,
    rankList,
    banner,
    homeGame,
    notice,
    onlineNum,
    couponList,
    homeAd,
    lotteryGames,
    refreshHome,
    roulette,
    redBag,
    floatAd,
  } = useHome()

  useEffect(() => {
    OCEvent.addEvent(OCEventType.UGNotificationLoginComplete, async () => {
      try {
        await updateUserInfo()
        setProps()
      } catch (error) {
        ToastError('登录失败')
        console.log(error)
      }
    })
    OCEvent.addEvent(OCEventType.UGNotificationUserLogout, async () => {
      try {
        UGStore.dispatch({ type: 'reset', userInfo: {} })
        UGStore.save()
        setProps()
      } catch (error) {
        ToastError('登出失败')
        console.log(error)
      }
    })
    return () => {
      OCEvent.removeEvents(OCEventType.UGNotificationLoginComplete)
      OCEvent.removeEvents(OCEventType.UGNotificationUserLogout)
    }
  }, [])

  useEffect(() => {
    if (notice?.data?.popup && !B_DEBUG) {
      PushHelper.pushAnnouncement(announcements)
    }
  }, [notice])
  // data handle
  const coupons = couponList?.data?.list?.slice(0, 5) ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const bannersInterval = parseInt(banner?.data?.interval)
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const ads = homeAd?.data ?? []
  const navs =
    homeGame?.data?.navs
      ?.sort((a: any, b: any) => a.sort - b.sort)
      ?.slice(0, 5) ?? []
  let games = []
  homeGame?.data?.icons?.forEach(
    (item) => (games = games.concat(item?.list) ?? [])
  )
  games = games?.sort((game: any) => -game.sort)?.slice(0, 24) ?? []
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

  if (loading) {
    return <ProgressCircle />
  } else {
    return (
      <>
        <SafeAreaHeader
          headerColor={WNZThemeColor.威尼斯.themeColor}>
          <HomeHeader
            uid={uid}
            showBackBtn={false}
            name={usr}
            logo={mobile_logo}
            balance={balance}
            onPressMenu={() => {
              PushHelper.pushRightMenu(PushRightMenuFrom.首頁)
            }}
            onPressComment={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.聊天室)
            }}
            onPressUser={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.我的页)
            }}
          />
        </SafeAreaHeader>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={async () => {
                try {
                  await refreshHome()
                  PushHelper.pushAnnouncement(announcements)
                } catch (error) {
                  console.log("-------error------", error)
                }
              }}
            />
          }
        >
          <BannerBlock
            containerStyle={{ aspectRatio: 540 / 240 }}
            autoplayTimeout={bannersInterval}
            onlineNum={onlineNum}
            banners={banners}
            renderBanner={(item, index) => {
              const { linkCategory, linkPosition, pic } = item
              return (
                <TouchableImage
                  key={index}
                  pic={pic}
                  resizeMode={'stretch'}
                  onPress={() => {
                    PushHelper.pushCategory(linkCategory, linkPosition)
                  }}
                />
              )
            }}
          />
          <NoticeBlock
            containerStyle={{ borderRadius: 0, marginBottom: scale(5), aspectRatio: 540 / 35 }}
            iconContainerStyle={{
              borderColor: '#ef473a',
              borderWidth: scale(1),
              marginHorizontal: scale(10),
              borderRadius: scale(2),
            }}
            notices={notices}
            onPressNotice={({ content }) => {
              PushHelper.pushNoticePopUp(content)
            }}
            logoTextStyle={{ color: 'red', fontSize: scale(16), padding: scale(5) }}
            textStyle={{ fontSize: scale(16) }}
          />
          <NavBlock
            visible={navs?.length > 0}
            navs={navs}
            renderNav={(item, index) => {
              const { icon, name, logo, gameId } = item
              return (
                <GameButton
                  key={index}
                  logo={icon || logo}
                  title={name}
                  containerStyle={{
                    width: '20%',
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                  }}
                  titleContainerStyle={{ aspectRatio: 5 }}
                  titleStyle={{ color: config?.navColors[index], fontSize: scale(23) }}
                  circleColor={'transparent'}
                  onPress={() => {
                    if (gameId == 9) {
                      goToJDPromotionListPage()
                    } else {
                      PushHelper.pushHomeGame(item as any)
                    }
                  }}
                />
              )
            }}
          />
          <BannerBlock
            containerStyle={{ aspectRatio: 540 / 110, marginTop: scale(5) }}
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
                  resizeMode={'stretch'}
                  onPress={() => {
                    PushHelper.pushCategory(linkCategory, linkPosition)
                  }}
                />
              )
            }}
          />
          <GameSubTypeComponent
            containerStyle={{ paddingVertical: scale(5) }}
            numColumns={4}
            games={games}
            subTypeContainerStyle={{
              paddingHorizontal: scale(10),
            }}
            renderSubType={(item, index) => {
              const { title } = item
              return (
                <Button
                  key={index}
                  containerStyle={{
                    width: '20%',
                    marginLeft: '2.5%',
                    marginRight: '2.5%',
                    marginBottom: scale(20),
                    backgroundColor: WNZThemeColor.威尼斯.themeColor,
                    paddingVertical: scale(20),
                    borderRadius: scale(5),
                  }}
                  textStyle={{ color: '#ffffff', fontSize: scale(15) }}
                  text={title}
                  onPress={() => {
                    PushHelper.pushHomeGame(item)
                  }}
                />
              )
            }}
            renderGame={({ item, index, onPressGameSubType }) => {
              const { logo, name, hotIcon, tipFlag, subType, icon } = item
              const flagType = parseInt(tipFlag)
              return (
                <View key={index} style={styles.gameContainer}>
                  <GameButton
                    logo={icon || logo}
                    showSecondLevelIcon={subType}
                    showRightTopFlag={flagType > 0 && flagType < 4}
                    showCenterFlag={flagType == 4}
                    flagIcon={hotIcon}
                    title={name}
                    containerStyle={{
                      width: '100%',
                      backgroundColor: '#ffffff',
                      aspectRatio: 0.9,
                      borderRadius: scale(10),
                      justifyContent: 'center',
                    }}
                    titleContainerStyle={{
                      aspectRatio: 5,
                      paddingTop: scale(5),
                    }}
                    secondLevelIconContainerStyle={{
                      right: -scale(10),
                      top: null,
                      bottom: 0,
                    }}
                    enableCircle={false}
                    onPress={() => {
                      if (subType) {
                        onPressGameSubType(index)
                      } else {
                        PushHelper.pushHomeGame(item)
                      }
                    }}
                  />
                </View>
              )
            }}
          />
          <TabComponent
            elementHeight={scale(100)}
            leftGames={officialGames}
            rightGames={customiseGames}
            renderLeftGame={(item, index) => {
              const { title, pic, openCycle, id, gameType } = item
              return (
                <RowGameButtom
                  key={index}
                  showRightBorder={index % 2 == 0}
                  logo={pic}
                  name={title}
                  desc={openCycle}
                  logoBallText={'官'}
                  onPress={() => {
                    PushHelper.pushLottery(id)
                  }}
                />
              )
            }}
            renderRightGame={(item, index) => {
              const { title, pic, openCycle, id } = item
              return (
                <RowGameButtom
                  key={index}
                  showRightBorder={index % 2 == 0}
                  logo={pic}
                  name={title}
                  desc={openCycle}
                  logoBallText={'信'}
                  onPress={() => {
                    PushHelper.pushLottery(id)
                  }}
                />
              )
            }}
          />
          <CouponBlock
            visible={m_promote_pos}
            onPressMore={goToJDPromotionListPage}
            containerStyle={styles.subComponent}
            coupons={coupons}
            renderCoupon={({ item, index }) => {
              const {
                pic,
                linkCategory,
                linkPosition,
                title,
                content,
                linkUrl,
              } = item
              return (
                <AutoHeightCouponComponent
                  key={index}
                  title={title}
                  pic={pic}
                  content={content}
                  onPress={(setShowPop) => {
                    if (linkUrl) {
                      PushHelper.openWebView(linkUrl)
                    } else if (!linkCategory && !linkPosition) {
                      setShowPop(true)
                    } else {
                      PushHelper.pushCategory(linkCategory, linkPosition)
                    }
                  }}
                />
              )
            }}
          />
          <AnimatedRankComponent
            type={rankingListSwitch}
            rankLists={rankLists}
            rankContainerStyle={{ borderRadius: 0 }}
            initialAnimatedHeight={scale(0)}
            finalAnimatedHeight={
              scale(195) + scale((rankLists?.length ?? 0) * 50)
            }
          />
          <BottomLogo
            webName={webName}
            onPressComputer={() => {
              PushHelper.openWebView(
                httpClient.defaults.baseURL + '/index2.php'
              )
            }}
            onPressPromotion={goToJDPromotionListPage}
            debug={false}
            version={'修正Banner比例'}
          />
          <BottomGap />
        </ScrollView>
        <ActivityComponent
          refresh={refresh}
          containerStyle={{ top: scale(250), right: 0 }}
          show={uid && redBagLogo && !isTest}
          logo={redBagLogo}
          onPress={() => {
            PushHelper.pushRedBag(redBag)
          }}
        />
        <ActivityComponent
          refresh={refresh}
          containerStyle={{ top: scale(400), right: 0 }}
          enableFastImage={false}
          show={uid && roulette && !isTest}
          logo={'dzp_btn'}
          onPress={() => {
            PushHelper.pushWheel(roulette)
          }}
        />
        {floatAd?.map((item: any, index) => {
          const { image, position, linkCategory, linkPosition } = item
          return (
            <ActivityComponent
              key={index}
              refresh={refresh}
              containerStyle={getActivityPosition(position)}
              enableFastImage={true}
              show={uid && !isTest}
              logo={image}
              onPress={() => {
                PushHelper.pushCategory(linkCategory, linkPosition)
              }}
            />
          )
        })}
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
  },
  gameContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(5)
  },
  subComponent: {
    marginTop: scale(10),
    backgroundColor: '#ffffff',
  },
})

export default WNZHomePage
