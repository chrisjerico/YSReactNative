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
import useLogOut from '../../public/hooks/tars/useLogOut'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import useTryPlay from '../../public/hooks/useTryPlay'
import { PageName } from '../../public/navigation/Navigation'
import { push, navigate } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import {
  ToastError,
  ToastSuccess,
  updateUserInfo
} from '../../public/tools/tars'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomBlank from '../../public/views/tars/BottomBlank'
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
import BottomToolBlock from './components/BottomToolBlock'
import HomeHeader from './components/HomeHeader'
import LotteryBall from './components/LotteryBall'
import NavBlock from './components/NavBlock'
import TabComponent from './components/TabComponent'
import {
  defaultAdvertisement,
  defaultBottomTools,
  defaultCustomerServiceLogo,
  defaultDowloadUrl,
  defaultHomeHeaderRightLogo,
  defaultLotteryLogo,
  defaultNoticeLogo
} from './helpers/config'

const LHTHomePage = (props) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
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
  // stores
  const { uid, avatar, usr, isTest }: UGUserModel = UGStore.globalProps.userInfo
  const {
    mobile_logo,
    webName,
    m_promote_pos,
    rankingListSwitch,
  }: UGSysConfModel = UGStore.globalProps.sysConf

  // states
  // const announcementModal = useRef(null)
  const [roulette, setRoulette] = useState(null)
  // effects
  const {
    loading,
    banner,
    homeGames,
    notice,
    lotteryNumber,
    // categoryList,
    onlineNum,
    couponListData,
    redBag,
    rankList,
    onRefresh,
  } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'lhcdoc_lotteryNumber',
    'lhcdoc_categoryList',
    'system_onlineCount',
    'system_promotions',
    'activity_redBagDetail',
    'system_rankingList',
    'system_config',
  ])

  const getTurntableList = async () => {
    try {
      const value = await APIRouter.activity_turntableList()
      const roulette = value?.data?.data
      setRoulette(roulette)
    } catch (err) { }
  }

  useEffect(() => {
    if (uid) {
      getTurntableList()
    }
  }, [uid])

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
  // const announce_first = parseInt(systemConfig?.data?.announce_first)
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
    homeGames?.data?.navs?.sort((nav: any) => -nav.sort)?.slice(0, 8) ?? []
  const coupons = couponListData?.data?.list ?? []
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
  // const leftGames = categoryList?.data ?? []
  const rightGames =
    homeGames?.data?.icons?.map((tab) => {
      const { list, name } = tab
      const games = list?.filter((ele) => ele.levelType == '1')
      return { games, name }
    }) ?? []

  // render
  if (loading) {
    return <ProgressCircle />
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={LHThemeColor.六合厅.themeColor} containerStyle={{ paddingHorizontal: scale(10) }}>
          <HomeHeader
            avatar={avatar}
            name={usr}
            showLogout={uid ? true : false}
            leftLogo={mobile_logo}
            rightLogo={defaultHomeHeaderRightLogo}
            onPressSignOut={logOut}
            onPressSignIn={PushHelper.pushLogin}
            onPressSignUp={PushHelper.pushRegister}
            onPressTryPlay={tryPlay}
            onPressLogo={() => {
              push(PageName.PromotionListPage)
            }}
          />
        </SafeAreaHeader>
        <ScrollView
          style={styles.container}
          scrollEnabled={true}
          refreshControl={
            <RefreshControlComponent
              onRefresh={() => {
                onRefresh()
                PushHelper.pushAnnouncement(announcements)
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
              logo={defaultNoticeLogo}
              onPressNotice={({ content }) => {
                PushHelper.pushNoticePopUp(content)
              }}
            />
            <NavBlock
              containerStyle={styles.subComponent}
              navs={navs}
              lotterys={plusLotterys}
              date={lotteryDate}
              advertisement={defaultAdvertisement}
              lotteryLogo={defaultLotteryLogo}
              customerServiceLogo={defaultCustomerServiceLogo}
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
                const { icon, name, logo } = item
                return (
                  <GameButton
                    key={index}
                    containerStyle={{ width: '25%', height: '50%' }}
                    imageStyle={{ width: '50%' }}
                    enableCircle={false}
                    logo={icon ? icon : logo}
                    title={name}
                    onPress={() => PushHelper.pushHomeGame(item)}
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
            {/* <HeadlineBlock
        containerStyle={styles.subComponent}
        headlines={headlines}
        headLineLogo={defaultHeadLineLogo}
        onPressHeadline={({ value }) =>
          PushHelper.pushNoticePopUp(value)
        }
      /> */}
            <TabComponent
              rowHeight={scale(200)}
              activeTabColor={'#ff8610'}
              unActiveTabColor={'#bbbbbb'}
              containerStyle={styles.subComponent}
              leftGames={[{ name: '更多彩种', desc: '好挣好玩', icon: 'http://test05.6yc.com/views/mobileTemplate/14/images/gdcz.png' }]}
              rightGames={rightGames}
              renderLeftGame={(item, index) => {
                const { name, icon, id, desc } = item
                return (
                  <GameButton
                    key={index}
                    logo={icon}
                    title={name}
                    subTitle={desc}
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
                      navigate(PageName.LHTPreferencePage, {})
                      //PushHelper.pushUserCenterType(parseInt(id))
                    }}
                  />
                )
              }}
              renderRightGame={(item, index) => {
                const { logo, icon, title } = item
                return (
                  <GameButton
                    key={index}
                    logo={logo ? logo : icon}
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
              onPressMore={() => {
                push(PageName.PromotionListPage)
              }}
              containerStyle={styles.subComponent}
              coupons={coupons}
              renderCoupon={(item, index) => {
                const { pic, linkCategory, linkPosition, title, content } = item
                return (
                  <AutoHeightCouponComponent
                    key={index}
                    enableOnPressPop={linkCategory == 0}
                    title={title}
                    pic={pic}
                    content={content}
                    onPress={() => {
                      PushHelper.pushCategory(linkCategory, linkPosition)
                    }}
                  />
                )
              }}
            />
            <AnimatedRankComponent
              type={rankingListSwitch}
              containerStyle={styles.subComponent}
              iconContainerStyle={styles.rankBlockIconContainerStyle}
              rankLists={rankLists}
            />
            <BottomLogo
              containerStyle={{ marginBottom: scale(30) }}
              webName={webName}
              onPressComputer={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.开奖网)
              }}
              onPressPromotion={() => {
                push(PageName.PromotionListPage)
              }}
              debug={false}
            />
            <BottomToolBlock
              tools={defaultBottomTools}
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
                        PushHelper.openWebView(defaultDowloadUrl)
                      }
                    }}
                  />
                )
              }}
            />
            <BottomBlank />
          </View>
        </ScrollView>
        {/* <DowloadApp
    onPressDowload={() => {
      PushHelper.openWebView(
        'https://fhapp168h.com/ad/index.php?app_id=12?islogin=false'
      )
    }}
  /> */}
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
        {/* <AnnouncementModalComponent
          ref={announcementModal}
          announcements={announcements}
          color={LHThemeColor.六合厅.themeColor}
          announceFirst={announce_first}
        /> */}
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
  },
})

export default LHTHomePage
