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
import { HomeGamesModel } from '../../public/network/Model/HomeGamesModel'
import StringUtils from '../../public/tools/StringUtils'
import UGProgressCircle from '../../public/widget/progress/UGProgressCircle'
import { IGameIconListItem } from '../../redux/model/home/IGameBean'
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
  defaultHeadLines,
  defaultHomeHeaderLeftLogo,
  defaultHomeHeaderRightLogo,
  defaultMarkSixLogo,
  defaultNavs,
  defaultNoticeLogo,
  defaultNotices
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
    couponListData
  } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'lhcdoc_lotteryNumber',
    'lhcdoc_categoryList',
    'system_onlineCount',
    'system_promotions'
  ])
  const { loginOut } = useLoginOut(PageName.LHTHomePage)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateUserInfo()
    })
    return unsubscribe
  }, [])

  // data handle
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? defaultNotices
  const navs = homeGames?.data?.navs?.sort((nav: any) => -nav.sort) ?? defaultNavs
  const headlines = notice?.data?.popup ?? defaultHeadLines
  const leftGames = three(categoryList?.data ?? [])
  const icons = homeGames?.data?.icons ?? []
  const coupons = couponListData?.data?.list
  const numbers = lotteryNumber?.numbers?.split(',') ?? []
  const numColors = lotteryNumber?.numColor?.split(',') ?? []
  const numSxs = lotteryNumber?.numSx?.split(',') ?? []
  let lotterys: any[] = numbers?.map((number, index) => ({
    number,
    color: numColors[index],
    sx: numSxs[index],
  }))

  lotterys = [
    ...lotterys.slice(0, 6),
    {
      showMore: true,
    },
    ...lotterys.slice(6),
  ]
  const lotteryDate = lotteryNumber?.issue

  const rightGames = icons.map((tab) => {
    const { list } = tab;
    const games = three(list?.filter(ele => ele.levelType == '1'));
    return games
  })
  const subTabs = icons.map((tab, index) => ({ key: index, title: StringUtils.getInstance().deleteHtml(tab.name) }))

  // functions
  const gotoUserCenter = (userCenterType: UGUserCenterType) => {
    PushHelper.pushUserCenterType(userCenterType)
  }

  const gotoCategory = (
    category: string | number,
    position: string | number
  ) => {
    PushHelper.pushCategory(category, position)
  }

  const gotoHomeGame = (game: HomeGamesModel | IGameIconListItem) => {
    PushHelper.pushHomeGame(game)
  }

  const goToNotice = (message: string) => {
    PushHelper.pushNoticePopUp(message)
  }

  const gotoWebView = (url: string) => {
    PushHelper.openWebView(url)
  }

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
              onPressTryPlay={() => { }}
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
                        gotoCategory(linkCategory, linkPosition)
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
                  onPressNotice={({ value }) => goToNotice(value)}
                />
                <NavBlock
                  containerStyle={styles.subComponent}
                  navs={navs}
                  lotterys={lotterys}
                  date={lotteryDate}
                  advertisement={defaultAdvertisement}
                  markSixLogo={defaultMarkSixLogo}
                  customerServiceLogo={defaultCustomerServiceLogo}
                  onPressSavePoint={() => gotoUserCenter(UGUserCenterType.存款)}
                  onPressGetPoint={() => gotoUserCenter(UGUserCenterType.取款)}
                  onPressAd={() => gotoUserCenter(UGUserCenterType.六合彩)}
                  onPressSmileLogo={() =>
                    gotoUserCenter(UGUserCenterType.在线客服)
                  }
                  renderNav={(item, index) => {
                    const { icon, name, logo } = item
                    return (
                      <NavButton
                        key={index}
                        logo={icon ? icon : logo}
                        title={name}
                        nav={item}
                        onPress={() => gotoHomeGame(item)}
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
                        onPress={() => gotoUserCenter(UGUserCenterType.六合彩)}
                      />
                    )
                  }}
                />
                <HeadlineBlock
                  containerStyle={styles.subComponent}
                  headlines={headlines}
                  headLineLogo={defaultHeadLineLogo}
                  onPressHeadline={({ value }) => goToNotice(value)}
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
                        onPress={() => gotoHomeGame(item)}
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
                      <TouchableImage key={index} pic={pic} containerStyle={styles.couponBanner} onPress={() => gotoCategory(linkCategory, linkPosition)} />
                    )
                  }} />
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
                            gotoUserCenter(userCenterType)
                          } else {
                            gotoWebView(defaultDowloadUrl)
                          }
                        }}
                      />
                    )
                  }}
                />
              </View>
            </ScrollView>
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
    aspectRatio: 2
  }
})

export default LHTHomePage
