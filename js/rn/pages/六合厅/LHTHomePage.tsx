import React, { useEffect } from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import { useSelector } from 'react-redux'
import { scale, three } from '../../helpers/function'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import useLoginOut from '../../public/hooks/useLoginOut'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import StringUtils from '../../public/tools/StringUtils'
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { IGlobalState } from '../../redux/store/UGStore'
import BannerBlock from '../../views/BannerBlock'
import TabComponent from './components/TabComponent'
import {
  defaultAdvertisement,
  defaultBottomTools,
  defaultCustomerServiceLogo,
  defaultDowloadUrl,
  defaultHeadLineLogo,
  defaultHomeHeaderLeftLogo,
  defaultHomeHeaderRightLogo,
  defaultLotteryLogo,
  defaultNoticeLogo
} from './helpers/config'
import BottomToolBlock from './views/homes/BottomToolBlock'
import CouponBlock from './views/homes/CouponBlock'
import Header from './views/homes/Header'
import HeadlineBlock from './views/homes/HeadlineBlock'
import NavBlock from './views/homes/NavBlock'
import NoticeBlock from './views/homes/NoticeBlock'
import WinningBlock from './views/homes/WinningBlock'
import LotteryBall from './views/LotteryBall'
import NavButton from './views/NavButton'
import TabButton from './views/TabButton'
import TouchableImage from './views/TouchableImage'

const LHTHomePage = ({ navigation }) => {
  // yellowBox
  console.disableYellowBox = true
  // hooks
  const { loginOut } = useLoginOut(PageName.LHTHomePage)
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { uid, avatar, usr }: UGUserModel = userStore
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
  } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'lhcdoc_lotteryNumber',
    'lhcdoc_categoryList',
    'system_onlineCount',
    'system_promotions',
    'activity_redBagDetail',
  ])
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateUserInfo()
    })
    return unsubscribe
  }, [])

  // data handle
  const redBags = redBag?.data
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const navs =
    homeGames?.data?.navs?.sort((nav: any) => -nav.sort) ?? []
  const headlines = notice?.data?.popup ?? []
  const leftGames = three(categoryList?.data ?? [])
  const icons = homeGames?.data?.icons ?? []
  const coupons = couponListData?.data?.list ?? []
  const numbers = lotteryNumber?.numbers?.split(',') ?? []
  const numColors = lotteryNumber?.numColor?.split(',') ?? []
  const numSxs = lotteryNumber?.numSx?.split(',') ?? []
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
  const lotteryDate = lotteryNumber?.issue

  const rightGames = icons?.map((tab) => {
    const { list } = tab
    const games = three(list?.filter((ele) => ele.levelType == '1'))
    return games
  }) ?? []
  const subTabs = icons?.map((tab, index) => ({
    key: index,
    title: StringUtils.getInstance().deleteHtml(tab.name),
  })) ?? []

  return (
    <SafeAreaView style={loading ? styles.loadingSafeArea : styles.safeArea}>
      {loading ? (
        <UGProgressCircle />
      ) : (
          <>
            <Header
              avatar={avatar}
              name={usr}
              showLogout={uid ? true : false}
              leftLogo={defaultHomeHeaderLeftLogo}
              rightLogo={defaultHomeHeaderRightLogo}
              onPressSignOut={loginOut}
              onPressSignIn={PushHelper.pushLogin}
              onPressSignUp={PushHelper.pushRegister}
              onPressTryPlay={() => {
                console.log('試玩')
              }}
              onPressLogo={() => {
                push(PageName.JDPromotionListPage)
              }}
            />
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
                  onPressSavePoint={() => PushHelper.pushUserCenterType(UGUserCenterType.存款)}
                  onPressGetPoint={() => PushHelper.pushUserCenterType(UGUserCenterType.取款)}
                  onPressAd={() => PushHelper.pushUserCenterType(UGUserCenterType.六合彩)}
                  onPressSmileLogo={() =>
                    PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
                  }
                  renderNav={(item, index) => {
                    const { icon, name, logo } = item
                    return (
                      <NavButton
                        key={index}
                        logo={icon ? icon : logo}
                        title={name}
                        nav={item}
                        onPress={() => PushHelper.pushHomeGame(item)}
                      />
                    )
                  }}
                  renderLottery={(item, index) => {
                    const { number, color, sx } = item
                    return (
                      <LotteryBall
                        key={index}
                        score={number}
                        color={color}
                        text={sx}
                        showMore={index == 6}
                        onPress={() => PushHelper.pushUserCenterType(UGUserCenterType.六合彩)}
                      />
                    )
                  }}
                />
                <HeadlineBlock
                  containerStyle={styles.subComponent}
                  headlines={headlines}
                  headLineLogo={defaultHeadLineLogo}
                  onPressHeadline={({ value }) => PushHelper.pushNoticePopUp(value)}
                />
                <TabComponent
                  containerStyle={styles.subComponent}
                  subTabs={subTabs}
                  leftGames={leftGames}
                  rightGames={rightGames}
                  renderLeftGame={(item, index) => {
                    const { name, icon, show } = item
                    return (
                      <TabButton
                        key={index}
                        logo={icon}
                        mainTitle={name}
                        show={show}
                        onPress={() => {
                          // console.log("-----不知道要跳到哪----", item)
                        }}
                      />
                    )
                  }}
                  renderRightGame={(item, index) => {
                    const { logo, icon, title, show } = item
                    return (
                      <TabButton
                        key={index}
                        logo={logo ? logo : icon}
                        mainTitle={title}
                        show={show}
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
                        onPress={() => PushHelper.pushCategory(linkCategory, linkPosition)}
                      />
                    )
                  }}
                />
                <WinningBlock containerStyle={styles.subComponent} />
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
            {
              // 紅包活動
              uid ? (
                <TouchableImage
                  pic={redBags?.redBagLogo}
                  onPress={() => {
                    PushHelper.pushRedBag(redBag)
                  }}
                  containerStyle={styles.redEnvelope}
                />
              ) : null
            }
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
    backgroundColor: '#2894FF',
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
})

export default LHTHomePage
