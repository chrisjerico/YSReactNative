import React from 'react'
import { FlatList, RefreshControl, ScrollView, StyleSheet } from 'react-native'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import GameSubTypeComponent from '../../public/components/tars/GameSubTypeComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import { getActivityPosition } from '../../public/tools/tars'
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
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import GameBlock from './views/GameBlock'
import HomeHeader from './views/HomeHeader'

const BZHHomePage = () => {

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

  const { uid, usr, balance, isTest } = userInfo
  const {
    mobile_logo,
    webName,
    showCoupon,
    rankingListType,
    midBannerTimer
  } = sys

  const recommendGameTabs = gameLobby?.map((item) => item?.categoryName) ?? []

  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor} />
        <ProgressCircle />
      </>
    )
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
            onPressSignUp={() => push(PageName.BZHSignUpPage)}
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
            visible={midBanners?.length > 0}
            autoplayTimeout={midBannerTimer}
            showOnlineNum={false}
            banners={midBanners}
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
            listKey={'6633dwdd'}
            style={{ paddingHorizontal: '1%' }}
            keyExtractor={(item) => item?.name}
            removeClippedSubviews={true}
            data={homeGames}
            renderItem={({ item }) => {
              const { name, list } = item
              return (
                <GameBlock
                  containerStyle={styles.subComponent}
                  title={name}
                  onPressTotal={() => {
                    if (uid) {
                      let index = 0
                      if (name == '视讯') {
                        index = recommendGameTabs?.findIndex(
                          (item) => item == '真人'
                        )
                      } else {
                        index = recommendGameTabs?.findIndex(
                          (item) => item == name
                        )
                      }
                      const initialTabIndex = index < 0 ? 0 : index
                      push(PageName.BZHGameLobbyPage, {
                        initialTabIndex,
                      })
                    } else {
                      push(PageName.BZHSignInPage)
                    }
                  }}
                  renderGameContent={() => (
                    <GameSubTypeComponent
                      listKey={name}
                      containerStyle={{ paddingTop: scale(20) }}
                      subTypeContainerStyle={{
                        marginBottom: scale(20),
                        paddingHorizontal: scale(20),
                      }}
                      games={list}
                      numColumns={3}
                      subTypeNumColumns={3}
                      renderSubType={({ item, index }) => {
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
                            titleStyle={{
                              color: '#000000',
                              fontSize: scale(15),
                            }}
                            title={title}
                            onPress={() => {
                              PushHelper.pushHomeGame(item)
                            }}
                          />
                        )
                      }}
                      renderGame={({ item, index, showGameSubType }) => {
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
                            showSecondLevelIcon={subType ? true : false}
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
                                showGameSubType(index)
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
            visible={showCoupon}
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
            type={rankingListType}
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
  },
})

export default BZHHomePage
