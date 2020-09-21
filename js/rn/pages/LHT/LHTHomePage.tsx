import React, { useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import useRerender from '../../public/hooks/tars/useRerender'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import { getActivityPosition, useHtml5Image } from '../../public/tools/tars'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import BottomLogo from '../../public/views/tars/BottomLogo'
import CouponBlock from '../../public/views/tars/CouponBlock'
import GameButton from '../../public/views/tars/GameButton'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import { LotteryType } from '../../redux/model/全局/UGLotteryModel'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import HomeGameComponent from './components/HomeGameComponent'
import config from './config'
import BottomToolBlock from './views/BottomToolBlock'
import HomeHeader from './views/HomeHeader'
import LotteryBall from './views/LotteryBall'
import NavBlock from './views/NavBlock'

const LHTHomePage = () => {
  // yellowBox
  console.disableYellowBox = true
  // states
  const [preferenceGames, setPreferenceGames] = useState(config?.preferences)
  // functions
  const { getHtml5Image } = useHtml5Image()

  const { rerender } = useRerender()
  const { goTo, value, sign, refresh } = useHomePage({
    onSuccessTryPlay: rerender,
    onSuccessSignOut: rerender,
  })

  const { signOut, tryPlay } = sign
  const { goToJDPromotionListPage } = goTo

  const {
    loading,
    refreshing,
    userInfo,
    lotteryDate,
    bannersInterval,
    onlineNum,
    lotterys,
    banners,
    notices,
    midBanners,
    announcements,
    navs,
    homeGames,
    coupons,
    rankLists,
    floatAds,
    redBag,
    redBagLogo,
    roulette,
    sys
  } = value
  const { uid, usr, balance, isTest, avatar } = userInfo

  const {
    mobile_logo,
    webName,
    showCoupon,
    rankingListType,
    appDownloadUrl
  } = sys

  const plusLotterys = [
    ...lotterys.slice(0, 6),
    {
      showMore: true,
    },
    ...lotterys.slice(6),
  ]

  const chooseGames = preferenceGames
    ?.concat(config?.moreLottery)
    ?.filter((item) => item.selected)

  if (loading) {
    return <ProgressCircle />
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={LHThemeColor.六合厅.themeColor}>
          <HomeHeader
            avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
            name={usr}
            showLogout={uid ? true : false}
            leftLogo={mobile_logo}
            rightLogo={getHtml5Image(14, 'top_yhhd')}
            onPressSignOut={signOut}
            onPressSignIn={() => push(PageName.LHTSignInPage)}
            onPressSignUp={() => push(PageName.LHTSignUpPage)}
            onPressTryPlay={tryPlay}
            onPressLogo={goToJDPromotionListPage}
          />
        </SafeAreaHeader>
        <ScrollView
          style={styles.container}
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
            containerStyle={{ aspectRatio: 540 / 230 }}
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
              containerStyle={[
                styles.subComponent,
                { borderRadius: scale(100) },
              ]}
              iconContainerStyle={{
                width: scale(20),
                marginHorizontal: scale(15),
              }}
              notices={notices}
              logo={getHtml5Image(14, 'notice')}
              onPressNotice={({ content }) => {
                PushHelper.pushNoticePopUp(content)
              }}
            />
            <NavBlock
              containerStyle={[
                styles.subComponent,
                { borderRadius: scale(20) },
              ]}
              navs={navs}
              lotterys={plusLotterys}
              date={lotteryDate}
              advertisement={getHtml5Image(14, 'banner', 'gif')}
              lotteryLogo={getHtml5Image(14, 'tjzx')}
              balanceLogo={getHtml5Image(14, 'yue')}
              balance={balance}
              customerServiceLogo={getHtml5Image(14, 'zxkf')}
              onPressSavePoint={() =>
                PushHelper.pushUserCenterType(UGUserCenterType.存款)
              }
              onPressGetPoint={() =>
                PushHelper.pushUserCenterType(UGUserCenterType.取款)
              }
              onPressAd={() => PushHelper.pushLottery(LotteryType.新加坡六合彩)}
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
            <HomeGameComponent
              itemHeight={scale(200)}
              leftIcon={getHtml5Image(14, 'hot_icon')}
              rightIcon={getHtml5Image(14, 'cai_icon')}
              activeTabColor={'#ff6b1b'}
              unActiveTabColor={'#bbbbbb'}
              containerStyle={styles.subComponent}
              leftGames={chooseGames}
              rightGames={homeGames}
              renderLeftGame={({ item, index }) => {
                const { title, logo, des, gameType, selected, gameId } = item
                const logoUrl = getHtml5Image(14, logo)
                return (
                  <GameButton
                    key={index}
                    showSecondLevelIcon={false}
                    circleColor={'#b3cde6'}
                    logo={logoUrl}
                    title={title}
                    subTitle={des}
                    showSubTitle
                    containerStyle={{
                      width: '33.3%',
                      marginBottom: scale(20),
                    }}
                    titleContainerStyle={{
                      marginTop: scale(5),
                      aspectRatio: 3,
                    }}
                    imageContainerStyle={{
                      width: logo == 'gdcz' ? '50%' : '90%',
                      alignSelf: 'center',
                    }}
                    titleStyle={{ fontSize: scale(20), fontWeight: '300' }}
                    subTitleStyle={{ fontSize: scale(19) }}
                    onPress={() => {
                      if (gameType == 'more') {
                        navigate(PageName.LHTPreferencePage, {
                          initPreferences: preferenceGames,
                          onPressConfirm: (preferences: any) => {
                            setPreferenceGames(preferences)
                          },
                        })
                      } else if (gameType == 'clzx') {
                        PushHelper.pushUserCenterType(UGUserCenterType.长龙助手)
                      } else if (gameType == 'lmzs') {
                        PushHelper.pushUserCenterType(UGUserCenterType.开奖网)
                      } else {
                        PushHelper.pushLottery(gameId)
                      }
                    }}
                  />
                )
              }}
              renderRightGame={({ item, index }) => {
                const { logo, icon, title, hotIcon, tipFlag, subType } = item
                const showFlag = parseInt(tipFlag)
                return (
                  <GameButton
                    key={index}
                    circleColor={'#b3cde6'}
                    showRightTopFlag={showFlag > 0 && showFlag < 4}
                    showCenterFlag={showFlag == 4}
                    showSecondLevelIcon={false} // subType ? true : false
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
              visible={showCoupon}
              onPressMore={goToJDPromotionListPage}
              containerStyle={styles.subComponent}
              listContainerStyle={{ borderRadius: scale(15) }}
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
              type={rankingListType}
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
              debug={false}
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
          logo={'dzp_btn'}
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: LHThemeColor.六合厅.homeContentSubColor,
  },
  contentContainer: {
    paddingHorizontal: scale(10),
    paddingTop: scale(10),
  },
  subComponent: {
    marginBottom: scale(10),
  },
  rankBlockIconContainerStyle: {
    paddingLeft: 0,
    paddingVertical: 0,
    marginBottom: scale(10),
  },
})

export default LHTHomePage

// {
//   /* <HeadlineBlock
//         containerStyle={styles.subComponent}
//         headlines={headlines}
//         headLineLogo={defaultHeadLineLogo}
//         onPressHeadline={({ value }) =>
//           PushHelper.pushNoticePopUp(value)
//         }
//       /> */
// }

// PushHelper.pushHomeGame(
//   Object.assign(
//     {},
//     {
//       category: '7',
//       clsName: 'GameModel',
//       gameCode: '-1',
//       gameId: gameId,
//       gameType: gameType,
//       isClose: '0',
//       isInstant: '0',
//       isSeal: '0',
//       levelType: '1',
//       name: title,
//       openWay: '0',
//       realName: title,
//       seriesId: '1',
//       subId: gameId,
//       subtitle: des,
//       tipFlag: '4',
//       title: title,
//       url: '',
//     },
//     item
//   )
// )
