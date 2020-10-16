import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
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
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import BottomLogo from '../../public/views/tars/BottomLogo'
import Button from '../../public/views/tars/Button'
import CouponBlock from '../../public/views/tars/CouponBlock'
import GameButton from '../../public/views/tars/GameButton'
import HomePage from '../../public/views/tars/HomePage'
import NavBlock from '../../public/views/tars/NavBlock'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import TouchableImage from '../../public/views/tars/TouchableImage'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import GameBlock from './views/GameBlock'
import HomeHeader from './views/HomeHeader'

const BZHHomePage = () => {
  const { goTo, refresh, value } = useHomePage({})
  const { goToJDPromotionListPage } = goTo
  const { loading, refreshing, userInfo, sysInfo, homeInfo } = value

  const { bannersInterval, onlineNum, banners, notices, midBanners, navs, homeGames, gameLobby, coupons, rankLists, showOnlineNum } = homeInfo
  const { uid, usr, balance, isTest } = userInfo
  const { mobile_logo, webName, showCoupon, rankingListType, midBannerTimer } = sysInfo

  const recommendGameTabs = gameLobby?.map((item) => item?.categoryName) ?? []

  const memoizedOnPressSignIn = useCallback(() => push(PageName.BZHSignInPage), [])
  const memoizedOnPressSignUp = useCallback(() => push(PageName.BZHSignUpPage), [])
  const memoizedOnPressUser = useCallback(() => PushHelper.pushUserCenterType(UGUserCenterType.我的页), [])

  const memoizedRenderBanner = useCallback((item, index) => {
    const { linkCategory, linkPosition, pic } = item
    const memoizedPushCategory = useCallback(() => {
      PushHelper.pushCategory(linkCategory, linkPosition)
    }, [])
    return <TouchableImage key={index} pic={pic} resizeMode={'stretch'} onPress={memoizedPushCategory} />
  }, [])

  const memoizedOnPressNotice = useCallback(({ content }) => {
    PushHelper.pushNoticePopUp(content)
  }, [])

  return (
    <HomePage
      {...homeInfo}
      {...userInfo}
      {...sysInfo}
      pagekey={'BZHHomePage'}
      themeColor={BZHThemeColor.宝石红.themeColor}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      items={homeGames}
      renderHeader={() => (
        <HomeHeader
          logo={mobile_logo}
          isTest={isTest}
          uid={uid}
          name={usr}
          balance={balance}
          onPressSignIn={memoizedOnPressSignIn}
          onPressSignUp={memoizedOnPressSignUp}
          onPressUser={memoizedOnPressUser}
        />
      )}
      ListHeaderComponent={() => (
        <>
          <BannerBlock
            showOnlineNum={showOnlineNum}
            containerStyle={styles.bannerContainer}
            badgeStyle={styles.bannerBadge}
            autoplayTimeout={bannersInterval}
            onlineNum={onlineNum}
            banners={banners}
            renderBanner={memoizedRenderBanner}
          />
          <NoticeBlock logoTextStyle={styles.noticeLogoText} textStyle={styles.noticeText} containerStyle={styles.noticeContainer} notices={notices} onPressNotice={memoizedOnPressNotice} />
          <NavBlock
            visible={navs?.length > 0}
            navs={navs}
            renderNav={(item, index) => {
              const { icon, name, logo, gameId } = item
              const memoizedOnPressGameButton = useCallback(() => {
                if (gameId == 9) {
                  goToJDPromotionListPage()
                } else {
                  PushHelper.pushHomeGame(item)
                }
              }, [])
              return (
                <GameButton
                  showSubTitle={false}
                  showSecondLevelIcon={false}
                  key={index}
                  containerStyle={styles.gameButtonContainer}
                  imageContainerStyle={styles.imageContainer}
                  enableCircle={false}
                  logo={icon ?? logo}
                  title={name}
                  titleStyle={styles.gameButtonTitle}
                  titleContainerStyle={styles.titleContainer}
                  onPress={memoizedOnPressGameButton}
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
              const memoizedPushCategory = useCallback(() => {
                PushHelper.pushCategory(linkCategory, linkPosition)
              }, [])
              return <TouchableImage key={index} pic={image} resizeMode={'stretch'} onPress={memoizedPushCategory} />
            }}
          />
        </>
      )}
      renderItem={({ item, index }) => {
        const { name, list } = item
        return (
          <GameBlock
            containerStyle={[
              styles.subComponent,
              {
                marginHorizontal: '1%',
              },
            ]}
            title={name}
            onPressTotal={() => {
              if (uid) {
                let index = 0
                if (name == '视讯') {
                  index = recommendGameTabs?.findIndex((item) => item == '真人' || item == '视讯')
                } else {
                  index = recommendGameTabs?.findIndex((item) => item == name)
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
                uniqueKey={index.toString()}
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
                        backgroundColor: BZHThemeColor.宝石红.themeLightColor,
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
                  const { title, logo, icon, name, subtitle, tipFlag, hotIcon, subType } = item
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
                      imageContainerStyle={{ width: '50%' }}
                      enableCircle={false}
                      logo={icon || logo}
                      title={name || title}
                      subTitle={subtitle}
                      showSubTitle
                      titleStyle={{
                        fontSize: scale(21),
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
                          //@ts-ignore
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
      ListFooterComponent={() => (
        <>
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
              const { pic, linkCategory, linkPosition, title, content, linkUrl } = item
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
              PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
            }}
            onPressPromotion={goToJDPromotionListPage}
            debug={false}
            version={'測試dev設定'}
          />
          <BottomGap />
        </>
      )}
    />
  )
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
  bannerContainer: {
    aspectRatio: 540 / 218,
  },
  bannerBadge: {
    top: scale(-210),
  },
  noticeLogoText: {
    fontSize: scale(18),
    paddingHorizontal: scale(10),
  },
  noticeText: {
    fontSize: scale(18),
  },
  noticeContainer: {
    borderRadius: 0,
  },
  gameButtonTitle: {
    fontSize: scale(20),
    fontWeight: '300',
    paddingTop: scale(5),
  },
  gameButtonContainer: {
    width: '25%',
    marginTop: scale(15),
  },
  imageContainer: {
    width: '30%',
  },
  titleContainer: {
    aspectRatio: 5,
  },
})

export default BZHHomePage
