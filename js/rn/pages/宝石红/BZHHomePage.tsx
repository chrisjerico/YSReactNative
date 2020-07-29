import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AnnouncementModalComponent from '../../public/components/tars/AnnouncementModalComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import PushHelper from '../../public/define/PushHelper'
import useGetHomeInfo from '../../public/hooks/useGetHomeInfo'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import BannerBlock from '../../public/views/tars/BannerBlock'
import CouponBlock from '../../public/views/tars/CouponBlock'
import GameButton from '../../public/views/tars/GameButton'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import UGSysConfModel, {
  UGUserCenterType,
} from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { IGlobalState } from '../../redux/store/UGStore'
import GameBlock from './components/GameBlock'
import HomeHeader from './components/HomeHeader'
import NavBlock from './components/NavBlock'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'

const BZHHomePage = () => {
  // yellowBox
  console.disableYellowBox = true
  // stores
  const { uid, usr, balance, isTest }: UGUserModel = useSelector(
    (state: IGlobalState) => state.UserInfoReducer
  )
  const { mobile_logo, webName }: UGSysConfModel = useSelector(
    (state: IGlobalState) => state.SysConfReducer
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
    onlineNum,
    rankList,
    redBag,
    couponListData,
    systemConfig
  } = useGetHomeInfo([
    'system_banners',
    'notice_latest',
    'game_homeGames',
    'system_onlineCount',
    'system_rankingList',
    'activity_redBagDetail',
    'activity_turntableList',
    'system_promotions',
    'system_config'
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

  // data
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const announcements = notice?.data?.popup ?? []
  const navs =
    homeGames?.data?.navs
      ?.sort((a: any, b: any) => a.sort - b.sort)
      .slice(0, 4) ?? []
  const games = homeGames?.data?.icons ?? []
  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const coupons = couponListData?.data?.list ?? []
  const userTabIndex = systemConfig?.data.mobileMenu.findIndex(ele => ele?.path == '\/user')
  // .map((coupon) => {
  //   return Object.assign({}, coupon, { style: couponListData?.data?.style })
  // })
  if (loading) {
    return <ProgressCircle />
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor}>
          <HomeHeader
            logo={mobile_logo}
            isTest={isTest}
            uid={uid}
            name={isTest ? '遊客' : usr}
            money={balance}
            onPressSignIn={() => push(PageName.BZHSignInPage)}
            onPressSignUp={() => push(PageName.BZHRegisterPage)}
            onPressUser={() => {
              navigate(PageName.BZHHomePage, { index: userTabIndex })
            }}
          />
        </SafeAreaHeader>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
          refreshControl={
            <RefreshControlComponent
              onRefresh={() => {
                updateUserInfo()
                announcementModal?.current?.reload()
                // onRefresh()
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
          <NoticeBlock
            containerStyle={{ borderRadius: 0 }}
            notices={notices}
            onPressNotice={({ value }) => PushHelper.pushNoticePopUp(value)}
          />
          <NavBlock
            navs={navs}
            containerStyle={{ alignItems: 'center' }}
            renderNav={(item, index) => {
              const { icon, name, logo } = item
              return (
                <GameButton
                  key={index}
                  containerStyle={{ width: '25%' }}
                  imageStyle={{ width: '45%' }}
                  enableCircle={false}
                  logo={icon ? icon : logo}
                  title={name}
                  titleStyle={{ fontSize: scale(20) }}
                  onPress={() => {
                    PushHelper.pushHomeGame(item)
                  }}
                />
              )
            }}
          />
          <View style={styles.contentContainer}>
            {games.map((item) => {
              const { name, list } = item
              return (
                <GameBlock
                  onPressTotal={() =>
                    PushHelper.pushUserCenterType(UGUserCenterType.游戏大厅)
                  }
                  title={name}
                  containerStyle={styles.subComponent}
                  contentContainerStyle={{ paddingTop: scale(20) }}
                  games={list}
                  renderGame={(item, index) => {
                    const { title, logo, icon, name, subtitle, tipFlag } = item
                    return (
                      <GameButton
                        key={index}
                        showFlag={parseInt(tipFlag) ? true : false}
                        resizeMode={'contain'}
                        containerStyle={[
                          styles.gameContainer,
                          {
                            marginLeft: index % 3 == 1 ? '5%' : 0,
                            marginRight: index % 3 == 1 ? '5%' : 0,
                          },
                        ]}
                        imageStyle={{ width: '60%' }}
                        enableCircle={false}
                        logo={icon || logo}
                        title={name || title}
                        subTitle={subtitle}
                        showSubTitle
                        titleStyle={{
                          fontSize: scale(25),
                        }}
                        subTitleStyle={{
                          fontSize: scale(20),
                        }}
                        titleContainerStyle={{
                          marginTop: scale(5),
                          aspectRatio: 2,
                        }}
                        onPress={() => {
                          PushHelper.pushHomeGame(item)
                        }}
                      />
                    )
                  }}
                />
              )
            })}
            <CouponBlock
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
                      console.log(item)
                      PushHelper.pushCategory(linkCategory, linkPosition)
                    }}
                  />
                )
              }}
            />
          </View>
          <AnimatedRankComponent
            onPressComputer={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.开奖网)
            }}
            onPressPromotion={() => {
              push(PageName.PromotionListPage)
            }}
            containerStyle={[styles.subComponent, styles.bottomComponent]}
            rankContainerStyle={{
              width: '95%',
              borderWidth: scale(1),
              borderColor: '#d9d9d9',
              alignSelf: 'center',
            }}
            iconContainerStyle={{
              backgroundColor: '#ffffff',
              borderBottomColor: '#d9d9d9',
              borderBottomWidth: scale(1),
            }}
            rankLists={rankLists}
            webName={webName}
          />
        </ScrollView>
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
          color={BZHThemeColor.宝石红.themeColor}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
  },
  contentContainer: {
    paddingHorizontal: scale(5),
    paddingTop: scale(10),
  },
  subComponent: {
    marginTop: scale(10),
    backgroundColor: '#ffffff',
  },
  gameContainer: {
    width: '30%',
    height: null,
    marginBottom: scale(20),
  },
  bottomComponent: {
    paddingBottom: scaleHeight(70),
  },
  couponBanner: {
    width: '100%',
    aspectRatio: 2,
  },
})

export default BZHHomePage
