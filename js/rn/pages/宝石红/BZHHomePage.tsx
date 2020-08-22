import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, View } from 'react-native'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import RefreshControlComponent from '../../public/components/tars/RefreshControlComponent'
import PushHelper from '../../public/define/PushHelper'
import useActivity from '../../public/hooks/tars/useActivity'
import useHome from '../../public/hooks/tars/useHome'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import { getActivityPosition } from '../../public/tools/tars'
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
import GameBlock, { GameSubType } from './views/GameBlock'
import HomeHeader from './views/HomeHeader'
import NavBlock from './views/NavBlock'

const BZHHomePage = () => {
  // yellowBox
  console.disableYellowBox = true
  const [gameSubTypes, setGameSubTypes] = useState<GameSubType[]>([])
  // functions
  const goToJDPromotionListPage = () => {
    push(PageName.JDPromotionListPage, {
      containerStyle: {
        backgroundColor: '#ffffff',
      },
    })
  }
  // stores
  const {
    uid,
    usr,
    balance,
    isTest,
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
    homeAd,
    refreshHomeInfo,
  } = useHome()

  const { roulette, redBag, floatAd, refreshActivity } = useActivity(uid)

  // data
  const adSliderTimer = parseInt(systemConfig?.data?.adSliderTimer)
  const bannersInterval = parseInt(banner?.data?.interval)
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
      .slice(0, 4) ?? []
  const gameBlocks = homeGame?.data?.icons ?? []
  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const coupons = couponList?.data?.list ?? []
  const ads = homeAd?.data ?? []

  useEffect(() => {
    if (notice?.data?.popup) {
      if (!B_DEBUG) {
        PushHelper.pushAnnouncement(announcements)
      }
    }
  }, [notice])

  console.log('------BZH重複選染-----')
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
            name={usr}
            balance={balance}
            onPressSignIn={() => push(PageName.BZHSignInPage)}
            onPressSignUp={() => push(PageName.BZHRegisterPage)}
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
                } catch (error) { }
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
            containerStyle={{ borderRadius: 0 }}
            notices={notices}
            onPressNotice={({ content }) => {
              PushHelper.pushNoticePopUp(content)
            }}
          />
          {navs?.length > 0 && (
            <NavBlock
              navs={navs}
              containerStyle={{ alignItems: 'center' }}
              renderNav={(item, index) => {
                const { icon, name, logo, gameId } = item
                return (
                  <GameButton
                    showSecondLevelIcon={false}
                    key={index}
                    containerStyle={{ width: '25%' }}
                    imageContainerStyle={{ width: '45%' }}
                    enableCircle={false}
                    logo={icon ? icon : logo}
                    title={name}
                    titleStyle={{ fontSize: scale(25) }}
                    titleContainerStyle={{ aspectRatio: 3 }}
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
            />
          )}
          <BannerBlock
            containerStyle={{ aspectRatio: 540 / 135 }}
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
          <FlatList
            style={{ paddingHorizontal: scale(5) }}
            data={gameBlocks}
            renderItem={({ item, index: blockIndex }) => {
              const { name, list } = item
              return (
                <GameBlock
                  onPressTotal={() => {
                    if (uid) {
                      PushHelper.pushUserCenterType(UGUserCenterType.游戏大厅)
                    } else {
                      push(PageName.BZHSignInPage)
                    }
                  }}
                  title={name}
                  containerStyle={styles.subComponent}
                  contentContainerStyle={{ paddingTop: scale(20) }}
                  subTypeContainerStyle={{
                    marginBottom: scale(20),
                    paddingHorizontal: scale(20),
                  }}
                  games={list}
                  gameSubType={gameSubTypes[blockIndex]}
                  renderSubType={(item, index) => {
                    const { title } = item
                    return (
                      <Button
                        key={index}
                        containerStyle={{
                          width: '27%',
                          marginLeft: index % 3 == 1 ? '9.5%' : 0,
                          marginRight: index % 3 == 1 ? '9.5%' : 0,
                          marginBottom: scale(20),
                          backgroundColor: BZHThemeColor.宝石红.themeLightColor,
                          paddingVertical: scale(20),
                          borderRadius: scale(5),
                        }}
                        textStyle={{ color: '#000000', fontSize: scale(15) }}
                        text={title}
                        onPress={() => {
                          PushHelper.pushHomeGame(item)
                        }}
                      />
                    )
                  }}
                  renderGame={(item, gameIndex) => {
                    const {
                      title,
                      logo,
                      icon,
                      name,
                      subtitle,
                      tipFlag,
                      hotIcon,
                      subType,
                    } = item
                    const showFlag = parseInt(tipFlag)
                    return (
                      <GameButton
                        key={gameIndex}
                        showRightTopFlag={showFlag > 0 && showFlag < 4}
                        showCenterFlag={showFlag == 4}
                        showSecondLevelIcon={subType}
                        flagIcon={hotIcon}
                        resizeMode={'contain'}
                        containerStyle={[
                          styles.gameContainer,
                          {
                            marginLeft: gameIndex % 3 == 1 ? '5%' : 0,
                            marginRight: gameIndex % 3 == 1 ? '5%' : 0,
                          },
                        ]}
                        imageContainerStyle={{ width: '60%' }}
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
                          if (subType) {
                            const gemaCutRow = Math.ceil((gameIndex + 1) / 3)
                            const updateGameSubTypes =
                              gameBlocks?.map((_, index) => {
                                if (index == blockIndex) {
                                  return {
                                    gemaCutRow,
                                    subType:
                                      gameIndex ==
                                        gameSubTypes[index]?.indexHistory
                                        ? []
                                        : subType,
                                    indexHistory:
                                      gameIndex ==
                                        gameSubTypes[index]?.indexHistory
                                        ? undefined
                                        : gameIndex,
                                  }
                                } else {
                                  return gameSubTypes[index] ?? {}
                                }
                              }) ?? []
                            setGameSubTypes(updateGameSubTypes)
                          } else {
                            PushHelper.pushHomeGame(item)
                          }
                        }}
                      />
                    )
                  }}
                />
              )
            }}
          />
          <CouponBlock
            visible={m_promote_pos}
            onPressMore={goToJDPromotionListPage}
            containerStyle={{
              paddingHorizontal: scale(5), marginTop: scale(10),
            }}
            titleContainerStyle={{ backgroundColor: '#ffffff' }}
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
            type={rankingListSwitch}
            containerStyle={styles.subComponent}
            iconTitleContainerStyle={{
              backgroundColor: '#ffffff',
              borderBottomColor: '#d9d9d9',
              borderBottomWidth: scale(1),
            }}
            rankContainerStyle={{
              width: '95%',
              borderWidth: scale(1),
              borderColor: '#d9d9d9',
              alignSelf: 'center',
              marginBottom: scale(20),
            }}
            rankLists={rankLists}
            initialAnimatedHeight={scale(0)}
            finalAnimatedHeight={
              scale(195) + scale((rankLists?.length ?? 0) * 50)
            }
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
    backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
  },
  paddingContainer: {
    paddingHorizontal: scale(5),
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
  couponBanner: {
    width: '100%',
    aspectRatio: 2,
  },
})

export default BZHHomePage
