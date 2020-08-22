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
import PushHelper from '../../public/define/PushHelper'
import useActivity from '../../public/hooks/tars/useActivity'
import useHome from '../../public/hooks/tars/useHome'
import useLogOut from '../../public/hooks/tars/useLogOut'
import useTryPlay from '../../public/hooks/useTryPlay'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import {
  getActivityPosition,
  getHtml5Image,
  ToastError,
  ToastSuccess,
  updateUserInfo
} from '../../public/tools/tars'
import { B_DEBUG } from '../../public/tools/UgLog'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import BottomLogo from '../../public/views/tars/BottomLogo'
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
import config from './config'
import BottomToolBlock from './views/BottomToolBlock'
import HomeHeader from './views/HomeHeader'
import LotteryBall from './views/LotteryBall'
import NavBlock from './views/NavBlock'

const LHTHomePage = (props: any) => {
  // yellowBox
  console.disableYellowBox = true
  // functions
  const { setProps } = props
  const { tryPlay } = useTryPlay({
    onSuccess: () => {
      ToastSuccess('登录成功！')
    },
    onError: (error) => {
      ToastError(error ?? '試玩失败')
    },
  })
  const { logOut } = useLogOut({
    onSuccess: () => {
      setProps()
    },
  })

  const goToJDPromotionListPage = () => {
    push(PageName.JDPromotionListPage, {
      containerStyle: {
        backgroundColor: '#ffffff',
      },
    })
  }
  // states
  const [leftGames, setLeftGames] = useState(config?.preferences)
  // hooks
  const {
    uid,
    avatar,
    usr,
    isTest,
    balance,
  }: UGUserModel = UGStore.globalProps.userInfo
  const {
    mobile_logo,
    webName,
    m_promote_pos,
    rankingListSwitch,
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
    lotteryNumber,
    refreshHomeInfo,
  } = useHome()

  const { roulette, redBag, floatAd, refreshActivity } = useActivity(uid)

  useEffect(() => {
    OCEvent.addEvent(OCEventType.UGNotificationLoginComplete, async () => {
      try {
        await updateUserInfo()
        setProps()
      } catch (error) {
        console.log(error)
      }
    })
    return () => {
      OCEvent.removeEvents(OCEventType.UGNotificationLoginComplete)
    }
  })

  // data handle
  const appDownloadUrl = systemConfig?.data?.appDownloadUrl
  const bannersInterval = parseInt(banner?.data?.interval)
  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const announcements =
    notice?.data?.popup?.map((item: any) => {
      return Object.assign(
        { clsName: 'UGNoticeModel', hiddenBottomLine: 'No' },
        item
      )
    }) ?? []
  const navs =
    homeGame?.data?.navs
      ?.sort((a: any, b: any) => a.sort - b.sort)
      .slice(0, 8) ?? []
  const coupons = couponList?.data?.list ?? []
  const numbers = lotteryNumber?.data?.numbers?.split(',') ?? []
  const numColors = lotteryNumber?.data?.numColor?.split(',') ?? []
  const numSxs = lotteryNumber?.data?.numSx?.split(',') ?? []
  const lotteryDate = lotteryNumber?.data?.issue
  const lotterys = numbers?.map((number, index) => ({
    number,
    color: numColors[index],
    sx: numSxs[index],
  }))

  const plusLotterys = [
    ...lotterys.slice(0, 6),
    {
      showMore: true,
    },
    ...lotterys.slice(6),
  ]
  const rightGames =
    homeGame?.data?.icons?.map((tab) => {
      const { list, name } = tab
      const games = list?.filter((ele) => ele.levelType == '1')
      return { games, name }
    }) ?? []

  useEffect(() => {
    if (notice?.data?.popup) {
      if (!B_DEBUG) {
        PushHelper.pushAnnouncement(announcements)
      }
    }
  }, [notice])
  // render

  if (loading) {
    return <ProgressCircle />
  } else {
    return (
      <>
        <SafeAreaHeader
          headerColor={LHThemeColor.六合厅.themeColor}
          containerStyle={{ paddingHorizontal: scale(10) }}
        >
          <HomeHeader
            avatar={isTest ? getHtml5Image(18, 'money-2') : avatar}
            name={usr}
            showLogout={uid ? true : false}
            leftLogo={mobile_logo}
            rightLogo={getHtml5Image(14, 'top_yhhd')}
            onPressSignOut={logOut}
            onPressSignIn={PushHelper.pushLogin}
            onPressSignUp={PushHelper.pushRegister}
            onPressTryPlay={tryPlay}
            onPressLogo={goToJDPromotionListPage}
          />
        </SafeAreaHeader>
        <ScrollView
          style={styles.container}
          scrollEnabled={true}
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
          <View style={styles.contentContainer}>
            <NoticeBlock
              containerStyle={styles.subComponent}
              notices={notices}
              logo={getHtml5Image(14, 'notice')}
              onPressNotice={({ content }) => {
                PushHelper.pushNoticePopUp(content)
              }}
            />
            <NavBlock
              containerStyle={styles.subComponent}
              navs={navs}
              lotterys={plusLotterys}
              date={lotteryDate}
              advertisement={getHtml5Image(14, 'banner', 'gif')}
              lotteryLogo={getHtml5Image(14, 'tjzx')}
              balance={balance}
              customerServiceLogo={getHtml5Image(14, 'zxkf')}
              onPressSavePoint={() =>
                PushHelper.pushUserCenterType(UGUserCenterType.存款)
              }
              onPressGetPoint={() =>
                PushHelper.pushUserCenterType(UGUserCenterType.取款)
              }
              onPressAd={() =>
                PushHelper.pushUserCenterType(UGUserCenterType.六合彩)
              }
              onPressSmileLogo={() =>
                PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
              }
              renderNav={(item, index) => {
                const { icon, name, logo, gameId } = item
                return (
                  <GameButton
                    key={index}
                    showSecondLevelIcon={false}
                    containerStyle={{ width: '25%', height: '50%' }}
                    imageContainerStyle={{ width: '50%' }}
                    enableCircle={false}
                    logo={icon ? icon : logo}
                    title={name}
                    onPress={() => {
                      if (gameId == 9) {
                        goToJDPromotionListPage()
                      } else {
                        PushHelper.pushHomeGame(item)
                      }
                    }}
                  />
                )
              }}
              renderLottery={(item, index) => {
                const { number, color, sx, showMore } = item
                return (
                  <LotteryBall
                    key={index}
                    score={number}
                    color={color}
                    text={sx}
                    showMore={showMore}
                    onPress={() =>
                      PushHelper.pushUserCenterType(UGUserCenterType.六合彩)
                    }
                  />
                )
              }}
            />
            <TabComponent
              rowHeight={scale(200)}
              activeTabColor={'#ff8610'}
              unActiveTabColor={'#bbbbbb'}
              containerStyle={styles.subComponent}
              leftGames={leftGames?.concat(config?.moreLottery)}
              rightGames={rightGames}
              renderLeftGame={(item, index) => {
                const { title, logo, des, gameType, selected, gameId } = item
                const logoUrl = getHtml5Image(14, logo)
                if (selected) {
                  return (
                    <GameButton
                      showSecondLevelIcon={false}
                      key={index}
                      logo={logoUrl}
                      title={title}
                      subTitle={des}
                      showSubTitle
                      containerStyle={{
                        width: '33.3%',
                        height: scale(180),
                        marginBottom: scale(20),
                      }}
                      titleContainerStyle={{
                        marginTop: scale(5),
                        aspectRatio: 3,
                      }}
                      titleStyle={{ fontSize: scale(23) }}
                      subTitleStyle={{ fontSize: scale(23) }}
                      onPress={() => {
                        if (gameType == 'more') {
                          navigate(PageName.LHTPreferencePage, {
                            initPreferences: leftGames,
                            onPressConfirm: (preferences: any) => {
                              setLeftGames(preferences)
                            },
                          })
                        } else if (gameType == 'clzx') {
                          PushHelper.pushUserCenterType(
                            UGUserCenterType.长龙助手
                          )
                        } else if (gameType == 'lmzs') {
                          PushHelper.pushUserCenterType(UGUserCenterType.开奖网)
                        } else {
                          PushHelper.pushHomeGame(
                            Object.assign(
                              {},
                              {
                                category: '44',
                                clsName: 'GameModel',
                                gameCode: '-1',
                                gameId: gameId,
                                gameType: gameType,
                                isClose: '0',
                                isInstant: '0',
                                isSeal: '0',
                                levelType: '1',
                                name: title,
                                openWay: '0',
                                realName: title,
                                seriesId: '1',
                                subId: gameId,
                                subtitle: des,
                                tipFlag: '4',
                                title: title,
                                url: '',
                              },
                              item
                            )
                          )
                        }
                      }}
                    />
                  )
                } else {
                  return null
                }
              }}
              renderRightGame={(item, index) => {
                const { logo, icon, title, hotIcon, tipFlag, subType } = item
                const showFlag = parseInt(tipFlag)
                return (
                  <GameButton
                    key={index}
                    showRightTopFlag={showFlag > 0 && showFlag < 4}
                    showCenterFlag={showFlag == 4}
                    showSecondLevelIcon={subType}
                    flagIcon={hotIcon}
                    logo={icon || logo}
                    title={title}
                    showSubTitle={false}
                    containerStyle={{
                      width: '33.3%',
                      height: scale(180),
                      marginBottom: scale(20),
                    }}
                    titleContainerStyle={{
                      marginTop: scale(5),
                      aspectRatio: 3,
                    }}
                    titleStyle={{ fontSize: scale(23) }}
                    subTitleStyle={{ fontSize: scale(23) }}
                    onPress={() => PushHelper.pushHomeGame(item)}
                  />
                )
              }}
            />
            <CouponBlock
              visible={m_promote_pos}
              onPressMore={goToJDPromotionListPage}
              containerStyle={styles.subComponent}
              listContainerStyle={{ borderRadius: scale(15) }}
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
              containerStyle={{ marginVertical: scale(10) }}
              iconTitleContainerStyle={styles.rankBlockIconContainerStyle}
              rankLists={rankLists}
              initialAnimatedHeight={scale(0)}
              finalAnimatedHeight={
                scale(195) + scale((rankLists?.length ?? 0) * 50)
              }
            />
            <BottomLogo
              containerStyle={{ marginBottom: scale(30) }}
              webName={webName}
              onPressComputer={() => {
                PushHelper.openWebView(
                  httpClient.defaults.baseURL + '/index2.php'
                )
              }}
              onPressPromotion={goToJDPromotionListPage}
              debug={true}
              version={'修正Banner比例'}
            />
            <BottomToolBlock
              tools={config?.bottomTools}
              renderBottomTool={(item, index) => {
                const { logo, userCenterType } = item
                return (
                  <TouchableImage
                    key={index}
                    containerStyle={{
                      width: '32%',
                      aspectRatio: 165 / 85,
                      flex: null,
                    }}
                    pic={logo}
                    onPress={() => {
                      if (userCenterType) {
                        PushHelper.pushUserCenterType(userCenterType)
                      } else {
                        PushHelper.openWebView(appDownloadUrl)
                      }
                    }}
                  />
                )
              }}
            />
            <BottomGap />
          </View>
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
  contentContainer: {
    paddingHorizontal: scale(16),
    paddingTop: scale(10),
  },
  subComponent: {
    marginBottom: scale(10),
  },
  couponBanner: {
    width: '100%',
    aspectRatio: 2,
  },
  redEnvelope: {
    width: scale(200),
    aspectRatio: 1,
    position: 'absolute',
    top: scale(500),
    right: 0,
  },
  turntables: {
    width: scale(200),
    aspectRatio: 1,
    position: 'absolute',
    top: scale(300),
    right: 0,
  },
  rankBlockIconContainerStyle: {
    paddingLeft: 0,
    paddingVertical: 0,
    marginBottom: scale(10)
  },
})

export default LHTHomePage

{
  /* <DowloadApp
    onPressDowload={() => {
      PushHelper.openWebView(
        'https://fhapp168h.com/ad/index.php?app_id=12?islogin=false'
      )
    }}
  /> */
}

{
  /* <HeadlineBlock
        containerStyle={styles.subComponent}
        headlines={headlines}
        headLineLogo={defaultHeadLineLogo}
        onPressHeadline={({ value }) =>
          PushHelper.pushNoticePopUp(value)
        }
      /> */
}
