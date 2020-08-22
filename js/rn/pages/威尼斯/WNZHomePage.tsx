import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import {
  OCEvent,
  OCEventType
} from '../../public/define/OCHelper/OCBridge/OCEvent'
import PushHelper, { PushRightMenuFrom } from '../../public/define/PushHelper'
import useActivity from '../../public/hooks/tars/useActivity'
import useHome from '../../public/hooks/tars/useHome'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { getActivityPosition, updateUserInfo } from '../../public/tools/tars'
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
import { UGStore } from '../../redux/store/UGStore'
import TabComponent from './components/TabComponent'
import GameBlock, { GameSubType } from './views/GameBlock'
import HomeHeader from './views/HomeHeader'
import RowGameButtom from './views/RowGameButtom'

const WNZHomePage = (props: any) => {
  const { setProps } = props
  // functions
  const goToJDPromotionListPage = () => {
    push(PageName.JDPromotionListPage, {
      containerStyle: {
        backgroundColor: "#ffffff",
      },
    })
  }

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
    m_promote_pos
  }: UGSysConfModel = UGStore.globalProps.sysConf
  const {
    loading,
    rankList,
    banner,
    homeGame,
    notice,
    onlineNum,
    couponList,
    systemConfig,
    homeAd,
    lotteryGames,
    refreshHomeInfo,
  } = useHome()

  const { roulette, redBag, floatAd, refreshActivity } = useActivity(uid)
  const [gameSubType, setGameSubType] = useState<GameSubType>({})

  const coupons = couponList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const bannersInterval = parseInt(banner?.data?.interval)
  const adSliderTimer = parseInt(systemConfig?.data?.adSliderTimer)
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const ads = homeAd?.data ?? []
  const navs =
    homeGame?.data?.navs
      ?.sort((a: any, b: any) => a.sort - b.sort)
      .slice(0, 5) ?? []
  let games = []
  homeGame?.data?.icons?.forEach(
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
            showBackBtn={false}
            showBalance={uid ? true : false}
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
            <RefreshControlComponent
              onRefresh={async () => {
                try {
                  await Promise.all([refreshHomeInfo(), refreshActivity()])
                } catch (error) {
                }
              }}
            />
          }
        >
          <BannerBlock
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
            containerStyle={{ borderRadius: 0, marginBottom: scale(10) }}
            iconContainerStyle={{
              borderColor: 'red',
              borderWidth: scale(1),
              marginHorizontal: scale(10),
              borderRadius: scale(2),
            }}
            notices={notices}
            onPressNotice={({ content }) => {
              PushHelper.pushNoticePopUp(content)
            }}
            logoTextStyle={{ color: 'red' }}
          />
          <View style={{ flexDirection: 'row', backgroundColor: '#ffffff' }}>
            {navs?.map((item, index) => {
              const { icon, name, gameId } = item
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
                  onPress={() => {
                    if (gameId == 9) {
                      goToJDPromotionListPage()
                    } else {
                      PushHelper.pushHomeGame(item as any)
                    }
                  }}
                />
              )
            })}
          </View>
          <BannerBlock
            isMidAd={true}
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
          <GameBlock
            games={games}
            gameSubType={gameSubType}
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
                    marginLeft: index % 4 == 1 || index % 4 == 2 ? '5%' : 0,
                    marginRight: index % 4 == 1 || index % 4 == 2 ? '5%' : 0,
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
            renderGame={(item, index) => {
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
                    secondLevelIconContainerStyle={{ right: -scale(10), top: null, bottom: -scale(25) }}
                    enableCircle={false}
                    onPress={() => {
                      if (subType) {
                        const gemaCutRow = Math.ceil((index + 1) / 4)
                        if (index == gameSubType?.indexHistory) {
                          setGameSubType({})
                        } else {
                          setGameSubType({
                            gemaCutRow,
                            indexHistory: index,
                            subType
                          })
                        }
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
              const { pic, linkCategory, linkPosition, title, content, linkUrl } = item
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
                    }
                    else {
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
              PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
            }}
            onPressPromotion={goToJDPromotionListPage}
            debug={true}
            version={'修正Banner比例'}
          />
          <BottomGap />
        </ScrollView>
        <ActivityComponent
          containerStyle={{ top: scale(250), right: 0 }}
          show={uid && redBagLogo && !isTest}
          logo={redBagLogo}
          onPress={() => {
            PushHelper.pushRedBag(redBag)
          }}
        />
        <ActivityComponent
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
  subComponent: {
    marginTop: scale(10),
    backgroundColor: '#ffffff',
  },
})

export default WNZHomePage