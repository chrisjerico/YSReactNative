import React, {useEffect} from 'react'
import {Platform, RefreshControl, ScrollView, StyleSheet} from 'react-native'
import ActivityComponent from '../../public/components/temp/ActivityComponent'
import AnimatedRankComponent from '../../public/components/temp/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/temp/AutoHeightCouponComponent'
import GameSubTypeComponent from '../../public/components/temp/GameSubTypeComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/temp/useHomePage'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import { getActivityPosition } from '../../public/tools/tars'
import BannerBlock from '../../public/views/temp/BannerBlock'
import BottomGap from '../../public/views/temp/BottomGap'
import BottomLogo from '../../public/views/temp/BottomLogo'
import Button from '../../public/views/temp/Button'
import CouponBlock from '../../public/views/temp/CouponBlock'
import GameButton from '../../public/views/temp/GameButton'
import List from '../../public/views/temp/List'
import NavBlock from '../../public/views/temp/NavBlock'
import NoticeBlock from '../../public/views/temp/NoticeBlock'
import ProgressCircle from '../../public/views/temp/ProgressCircle'
import SafeAreaHeader from '../../public/views/temp/SafeAreaHeader'
import TouchableImage from '../../public/views/temp/TouchableImage'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import GameBlock from './views/GameBlock'
import HomeHeader from './views/HomeHeader'
import {ANHelper} from "../../public/define/ANHelper/ANHelper";
import {CMD} from "../../public/define/ANHelper/hp/CmdDefine";
import {LEFThemeColor} from "../../public/theme/colors/LEFThemeColor";
import {ugLog} from "../../public/tools/UgLog";
import {HomeTabView} from "./views/HomeTabView";
import {FuncTab} from "./views/FuncTab";

const LEFHomePage = ({navigation, setProps}) => {

  const { goTo, refresh, value } = useHomePage({})
  const { goToJDPromotionListPage } = goTo
  const {
    loading,
    refreshing,
    userInfo,
    sys,
    bannersInterval,
    onlineNum,
    banners,
    notices,
    midBanners,
    announcements,
    navs,
    homeGames,
    gameLobby,
    coupons,
    rankLists,
    floatAds,
    redBag,
    redBagLogo,
    roulette,
  } = value

  //ugLog('gameLobby= ', JSON.stringify(gameLobby))

  const { uid, usr, balance, isTest } = userInfo
  const {
    mobile_logo,
    webName,
    showCoupon,
    rankingListType,
    midBannerTimer
  } = sys

  useEffect(() => {
    setProps({
      didFocus: async () => {
        switch (Platform.OS) {
          case 'android':
            ANHelper.callAsync(CMD.VISIBLE_MAIN_TAB, {visibility: 0});
            break;
        }

      }
    })
  }, [])

  const recommendGameTabs = gameLobby?.map((item) => item?.categoryName) ?? []

  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={LEFThemeColor.乐FUN.themeColor} />
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={LEFThemeColor.乐FUN.themeColor}>
          <HomeHeader
            logo={mobile_logo}
            isTest={isTest}
            uid={uid}
            name={usr}
            balance={balance}
            onPressSignIn={() => push(PageName.LEFSignInPage)}
            onPressSignUp={() => push(PageName.LEFSignUpPage)}
            onPressUser={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.我的页)
            }}
          />
        </SafeAreaHeader>
        <ScrollView
          style={_styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                try {
                  await refresh()
                  PushHelper.pushAnnouncement(announcements)
                } catch (error) {
                  console.log('-------error------', error)
                }
              }}
            />
          }
        >
          <BannerBlock
            containerStyle={{ aspectRatio: 540 / 218 }}
            badgeStyle={{ top: scale(-210) }}
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
            logoTextStyle={{
              fontSize: scale(18),
              paddingHorizontal: scale(10),
              color: 'white'
            }}
            textStyle={{ fontSize: scale(18), color: 'white' }}
            containerStyle={_styles.notice}
            notices={notices}
            onPressNotice={({ content }) => {
              PushHelper.pushNoticePopUp(content)
            }}
          />

          <FuncTab/>
          <HomeTabView/>

          <CouponBlock
            visible={showCoupon}
            onPressMore={goToJDPromotionListPage}
            containerStyle={{
              paddingHorizontal: '1%',
              marginTop: scale(10),
            }}
            titleContainerStyle={_styles.coupon_title}
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
                  titleStyle={{ alignSelf: 'center' }}
                  containerStyle={{
                    borderColor: '#d9d9d9',
                    borderWidth: scale(1),
                    marginBottom: scale(20),
                    padding: scale(5),
                    borderRadius: scale(5),
                    paddingBottom: scale(20),
                  }}
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
            type={rankingListType}
            containerStyle={_styles.subComponent}
            iconTitleContainerStyle={{
              backgroundColor: '#ffffff',
              borderBottomColor: '#d9d9d9',
              borderBottomWidth: scale(1),
            }}
            contentContainerStyle={{
              width: '95%',
              borderWidth: scale(1),
              borderColor: '#d9d9d9',
              alignSelf: 'center',
              marginBottom: scale(20),
            }}
            rankLists={rankLists}
          />
          <BottomLogo
            webName={webName}
            containerStyle={{ marginBottom: scale(5) }}
            onPressComputer={() => {
              PushHelper.openWebView(
                httpClient.defaults.baseURL + '/index2.php'
              )
            }}
            onPressPromotion={goToJDPromotionListPage}
            debug={false}
            version={'5000ms'}
          />
          <BottomGap />
        </ScrollView>
        <ActivityComponent
          refreshing={refreshing}
          containerStyle={{ top: scale(250), right: 0 }}
          show={uid && redBagLogo && !isTest}
          logo={redBagLogo}
          onPress={() => {
            PushHelper.pushRedBag(redBag)
          }}
        />
        <ActivityComponent
          refreshing={refreshing}
          containerStyle={{ top: scale(400), right: 0 }}
          enableFastImage={false}
          show={uid && roulette && !isTest}
          logo={'https://cdn01.mlqman.cn/views/home/images/c018dzp.gif'}
          onPress={() => {
            PushHelper.pushWheel(roulette)
          }}
        />
        {floatAds?.map((item: any, index) => {
          const { image, position, linkCategory, linkPosition } = item
          return (
            <ActivityComponent
              key={index}
              refreshing={refreshing}
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

const _styles = StyleSheet.create({
  container: {
    backgroundColor: LEFThemeColor.乐FUN.homeContentSubColor,
  },
  notice: {
    backgroundColor: '#999999',
    borderRadius: 0,
  },
  subComponent: {
    marginTop: scale(10),
    backgroundColor: 'white',
  },
  coupon_title: {
    backgroundColor: 'white',
  },
})

export default LEFHomePage
