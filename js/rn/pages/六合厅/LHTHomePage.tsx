import React, { useEffect, useRef, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AnnouncementModalComponent from '../../public/components/tars/AnnouncementModalComponent'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import useLoginOut from '../../public/hooks/useLoginOut'
import useTryPlay from '../../public/hooks/useTryPlay'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import BannerBlock from '../../public/views/tars/BannerBlock'
import CouponBlock from '../../public/views/tars/CouponBlock'
import GameButton from '../../public/views/tars/GameButton'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import UGSysConfModel, { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
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

const LHTHomePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const { tryPlay } = useTryPlay({
    onSuccess: () => {
      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！'])
    },
    onError: (error) => {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error ?? '試玩失败'])
    },
  })
  const { loginOut } = useLoginOut(PageName.LHTHomePage)
  // stores
  const { mobile_logo, webName }: UGSysConfModel = useSelector(
    (state: IGlobalState) => state.SysConfReducer
  )
  const { uid, avatar, usr, isTest }: UGUserModel = useSelector(
    (state: IGlobalState) => state.UserInfoReducer
  )

  // states
  const announcementModal = useRef(null)
  const [roulette, setRoulette] = useState(null)
  // effects
  const {
    loading,
    banner,
    homeGames,
    notice,
    lotteryNumber,
    categoryList,
    onlineNum,
    couponListData,
    redBag,
    rankList,
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
  ])

  const getTurntableList = async () => {
    try {
      const value = await APIRouter.activity_turntableList()
      const roulette = value?.data?.data
      setRoulette(roulette)
    } catch (err) {
    } finally {
    }
  }

  useEffect(() => {
    if (uid) {
      getTurntableList()
    }
  }, [uid])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('------focus------')
      updateUserInfo()
    })
    return unsubscribe
  }, [])

  // data handle
  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const announcements = notice?.data?.popup ?? []
  const navs =
    homeGames?.data?.navs?.sort((nav: any) => -nav.sort)?.slice(0, 8) ?? []
  const icons = homeGames?.data?.icons ?? []
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
  const leftGames = categoryList?.data ?? []
  const rightGames =
    icons?.map((tab) => {
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
        <SafeAreaHeader headerColor={LHThemeColor.六合厅.themeColor}>
          <HomeHeader
            avatar={avatar}
            name={isTest ? '遊客' : usr}
            showLogout={uid ? true : false}
            leftLogo={mobile_logo}
            rightLogo={defaultHomeHeaderRightLogo}
            onPressSignOut={loginOut}
            onPressSignIn={PushHelper.pushLogin}
            onPressSignUp={PushHelper.pushRegister}
            onPressTryPlay={tryPlay}
            onPressLogo={() => {
              push(PageName.JDPromotionListPage)
            }}
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
          <View style={styles.contentContainer}>
            <NoticeBlock
              containerStyle={styles.subComponent}
              notices={notices}
              logo={defaultNoticeLogo}
              onPressNotice={({ value }) => PushHelper.pushNoticePopUp(value)}
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
                console.log('-----showMore-----', showMore)
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
              leftGames={leftGames}
              rightGames={rightGames}
              renderLeftGame={(item, index) => {
                const { name, icon, show, id, desc } = item
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
                    titleStyle={{ fontSize: scale(23), fontWeight: '600' }}
                    subTitleStyle={{ fontSize: scale(17) }}
                    onPress={() => {
                      PushHelper.pushUserCenterType(parseInt(id))
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
                    titleStyle={{ fontSize: scale(23), fontWeight: '600' }}
                    subTitleStyle={{ fontSize: scale(17) }}
                    onPress={() => PushHelper.pushHomeGame(item)}
                  />
                )
              }}
            />
            <CouponBlock
              onPressMore={() => {
                push(PageName.PromotionListPage)
              }}
              containerStyle={styles.subComponent}
              coupons={coupons}
              renderCoupon={(item, index) => {
                const { pic, linkCategory, linkPosition } = item
                return (
                  <TouchableImage
                    key={index}
                    pic={pic}
                    containerStyle={styles.couponBanner}
                    resizeMode={'contain'}
                    onPress={() =>
                      PushHelper.pushCategory(linkCategory, linkPosition)
                    }
                  />
                )
              }}
            />
            <AnimatedRankComponent
              onPressComputer={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.开奖网)

              }}
              onPressPromotion={() => {
                push(PageName.PromotionListPage)
              }}
              containerStyle={styles.subComponent}
              iconContainerStyle={styles.rankBlockIconContainerStyle}
              rankLists={rankLists}
              webName={webName}
            />
            <BottomToolBlock
              tools={defaultBottomTools}
              containerStyle={{ paddingBottom: scaleHeight(60) }}
              renderBottomTool={(item, index) => {
                const { logo, userCenterType } = item
                return (
                  <TouchableImage
                    key={index}
                    containerStyle={{
                      width: '32%',
                      aspectRatio: 165 / 85,
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
        <AnnouncementModalComponent
          ref={announcementModal}
          announcements={announcements}
          color={LHThemeColor.六合厅.themeColor}
        />
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
