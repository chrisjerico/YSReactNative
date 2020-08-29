import React, { useEffect } from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import GameSubTypeComponent from '../../public/components/tars/GameSubTypeComponent'
import PushHelper from '../../public/define/PushHelper'
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
import NavBlock from '../../public/views/tars/NavBlock'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import UGSysConfModel, { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { UGStore } from '../../redux/store/UGStore'
import GameBlock from './views/GameBlock'
import HomeHeader from './views/HomeHeader'

const BZHHomePage = () => {
  // yellowBox
  console.disableYellowBox = true
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
    adSliderTimer,
  }: UGSysConfModel = UGStore.globalProps.sysConf

  // effect
  const {
    loading,
    refresh,
    rankList,
    banner,
    homeGame,
    notice,
    onlineNum,
    couponList,
    homeAd,
    roulette,
    redBag,
    floatAd,
    refreshHome,
  } = useHome()

  useEffect(() => {
    if (notice?.data?.popup && !B_DEBUG) {
      PushHelper.pushAnnouncement(announcements)
    }
  }, [notice])
  // data handle
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
      ?.slice(0, 4) ?? []
  const gameBlocks = homeGame?.data?.icons ?? []
  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const coupons = couponList?.data?.list?.slice(0, 5) ?? []
  const ads = homeAd?.data ?? []

  console.log('--------寶石紅渲染--------')
  if (loading) {
    return <ProgressCircle />
  } else {
    return (
      <>
        <SafeAreaHeader
          headerColor={BZHThemeColor.宝石红.themeColor}
        >
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
          style={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={async () => {
                try {
                  await refreshHome()
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
            }}
            textStyle={{ fontSize: scale(18) }}
            containerStyle={{ borderRadius: 0 }}
            notices={notices}
            onPressNotice={({ content }) => {
              PushHelper.pushNoticePopUp(content)
            }}
          />
          <NavBlock
            visible={navs?.length > 0}
            navs={navs}
            renderNav={(item, index) => {
              const { icon, name, logo, gameId } = item
              return (
                <GameButton
                  showSubTitle={false}
                  showSecondLevelIcon={false}
                  key={index}
                  containerStyle={{ width: '25%', marginTop: scale(15) }}
                  imageContainerStyle={{ width: '30%' }}
                  enableCircle={false}
                  logo={icon || logo}
                  title={name}
                  titleStyle={{
                    fontSize: scale(20),
                    fontWeight: '300',
                    paddingTop: scale(5),
                  }}
                  titleContainerStyle={{ aspectRatio: 5 }}
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
          <BannerBlock
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
            style={{ paddingHorizontal: '1%' }}
            removeClippedSubviews={true}
            data={gameBlocks}
            renderItem={({ item }) => {
              const { name, list } = item
              return (
                <GameBlock
                  containerStyle={styles.subComponent}
                  title={name}
                  onPressTotal={() => {
                    if (uid) {
                      PushHelper.pushUserCenterType(UGUserCenterType.游戏大厅)
                    } else {
                      push(PageName.BZHSignInPage)
                    }
                  }}
                  renderGameContent={() => (
                    <GameSubTypeComponent
                      containerStyle={{ paddingTop: scale(20) }}
                      subTypeContainerStyle={{
                        marginBottom: scale(20),
                        paddingHorizontal: scale(20),
                      }}
                      games={list}
                      numColumns={3}
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
                              backgroundColor:
                                BZHThemeColor.宝石红.themeLightColor,
                              paddingVertical: scale(20),
                              borderRadius: scale(5),
                            }}
                            textStyle={{
                              color: '#000000',
                              fontSize: scale(15),
                            }}
                            text={title}
                            onPress={() => {
                              PushHelper.pushHomeGame(item)
                            }}
                          />
                        )
                      }}
                      renderGame={({ item, index, onPressGameSubType }) => {
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
                            key={index}
                            showRightTopFlag={showFlag > 0 && showFlag < 4}
                            showCenterFlag={showFlag == 4}
                            showSecondLevelIcon={subType}
                            flagIcon={hotIcon}
                            resizeMode={'contain'}
                            containerStyle={[
                              styles.gameContainer,
                              {
                                marginLeft: index % 3 == 1 ? '5%' : 0,
                                marginRight: index % 3 == 1 ? '5%' : 0,
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
                              aspectRatio: 2.5,
                            }}
                            onPress={() => {
                              if (subType) {
                                onPressGameSubType(index)
                              } else {
                                PushHelper.pushHomeGame(item)
                              }
                            }}
                          />
                        )
                      }}
                    />
                  )}
                />
              )
            }}
          />
          <CouponBlock
            visible={m_promote_pos}
            onPressMore={goToJDPromotionListPage}
            containerStyle={{
              paddingHorizontal: '1%',
              marginTop: scale(10),
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
            debug={false}
            version={'5000ms'}
          />
          <BottomGap />
        </ScrollView>
        <ActivityComponent
          refresh={refresh}
          containerStyle={{ top: scale(250), right: 0 }}
          show={uid && redBagLogo && !isTest}
          logo={redBagLogo}
          onPress={() => {
            PushHelper.pushRedBag(redBag)
          }}
        />
        <ActivityComponent
          refresh={refresh}
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
              refresh={refresh}
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
  subComponent: {
    marginTop: scale(10),
    backgroundColor: '#ffffff',
  },
  gameContainer: {
    width: '30%',
    height: null,
    marginBottom: scale(20),
  }
})

export default BZHHomePage
