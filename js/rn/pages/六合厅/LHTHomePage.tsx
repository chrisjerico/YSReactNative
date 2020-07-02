import React, { useEffect, useState } from 'react'
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
import useLoginOut from '../../public/hooks/useLoginOut'
import useTryPlay from '../../public/hooks/useTryPlay'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
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
import DowloadApp from './components/DowloadApp'
import TabComponent from './components/TabComponent'
import {
  defaultAdvertisement,
  defaultBottomTools,
  defaultCustomerServiceLogo,
  defaultDowloadUrl,
  defaultHomeHeaderLeftLogo,
  defaultHomeHeaderRightLogo,
  defaultLotteryLogo,
  defaultNoticeLogo
} from './helpers/config'
import BottomToolBlock from './views/homes/BottomToolBlock'
import CouponBlock from './views/homes/CouponBlock'
import Header from './views/homes/Header'
import NavBlock from './views/homes/NavBlock'
import LotteryBall from './views/LotteryBall'

const LHTHomePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const [roulette, setRoulette] = useState(null)
  const { tryPlay } = useTryPlay({ enablePop: false })
  const { loginOut } = useLoginOut(PageName.LHTHomePage)
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { uid, avatar, usr, isTest }: UGUserModel = userStore
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
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('------focus------')
      updateUserInfo()
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (uid) {
      APIRouter.activity_turntableList().then((value) => {
        setRoulette(value?.data?.data)
      })
    }
  }, [uid])

  // data handle
  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  // const headlines = notice?.data?.popup ?? []
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
  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <ProgressCircle />
      ) : (
          <>
            <Header
              avatar={avatar}
              name={isTest ? '遊客' : usr}
              showLogout={uid ? true : false}
              leftLogo={defaultHomeHeaderLeftLogo}
              rightLogo={defaultHomeHeaderRightLogo}
              onPressSignOut={loginOut}
              onPressSignIn={PushHelper.pushLogin}
              onPressSignUp={PushHelper.pushRegister}
              onPressTryPlay={tryPlay}
              onPressLogo={() => {
                push(PageName.JDPromotionListPage)
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
                        circleColor={'transparent'}
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
                        }}
                        titleStyle={{
                          marginTop: scale(10),
                        }}
                        subTitleStyle={{
                          marginTop: scale(10),
                        }}
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
                        containerStyle={{
                          width: '33.3%',
                        }}
                        titleStyle={{
                          marginTop: scale(10),
                        }}
                        onPress={() => PushHelper.pushHomeGame(item)}
                      />
                    )
                  }}
                />
                <CouponBlock
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
                <RankBlock
                  containerStyle={styles.subComponent}
                  iconContainerStyle={styles.rankBlockIconContainerStyle}
                  rankLists={rankLists}
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
            <DowloadApp
              onPressDowload={() => {
                PushHelper.openWebView(
                  'https://fhapp168h.com/ad/index.php?app_id=12?islogin=false'
                )
              }}
            />
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
          </>
        )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: LHThemeColor.六合厅.themeColor,
    flex: 1,
  },
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
