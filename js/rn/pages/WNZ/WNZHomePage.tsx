import React, { useRef } from 'react'
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  View
} from 'react-native'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import GameSubTypeComponent from '../../public/components/tars/GameSubTypeComponent'
import TabComponent from '../../public/components/tars/TabComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import useRerender from '../../public/hooks/tars/useRerender'
import { httpClient } from '../../public/network/httpClient'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale } from '../../public/tools/Scale'
import { getActivityPosition, useHtml5Image, stringToNumber } from '../../public/tools/tars'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import BottomLogo from '../../public/views/tars/BottomLogo'
import Button from '../../public/views/tars/Button'
import CouponBlock from '../../public/views/tars/CouponBlock'
import GameButton from '../../public/views/tars/GameButton'
import List from '../../public/views/tars/List'
import NavBlock from '../../public/views/tars/NavBlock'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import MenuModalComponent from './components/MenuModalComponent'
import config from './config'
import HomeHeader from './views/HomeHeader'
import Menu from './views/Menu'
import RowGameButtom from './views/RowGameButtom'
import TabLabel from './views/TabLabel'

const { getHtml5Image } = useHtml5Image('http://test10.6yc.com')

const WNZHomePage = () => {
  // yellowBox
  console.disableYellowBox = true

  const menu = useRef(null)
  const { rerender } = useRerender()

  const { goTo, refresh, value, sign } = useHomePage({
    onSuccessSignOut: () => {
      menu?.current?.close()
      rerender()
    },
  })

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
    coupons,
    rankLists,
    floatAds,
    redBag,
    redBagLogo,
    roulette,
    officialGames,
    customiseGames
  } = value

  const { signOut } = sign

  const { uid, usr, balance, isTest } = userInfo

  const {
    mobile_logo,
    webName,
    showCoupon,
    rankingListType,
    midBannerTimer
  } = sys

  let homeGamesConcat = []
  homeGames.forEach(
    (item) => (homeGamesConcat = homeGamesConcat.concat(item?.list) ?? [])
  )

  const tabGames = [
    {
      name: '官方玩法',
      logo: getHtml5Image(23, 'home/gfwf'),
      games: officialGames,
    },
    {
      name: '信用玩法',
      logo: getHtml5Image(23, 'home/xywf'),
      games: customiseGames,
    },
  ]

  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor} />
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
          <HomeHeader
            uid={uid}
            showBackBtn={false}
            name={usr}
            logo={mobile_logo}
            balance={balance}
            onPressMenu={() => {
              menu?.current?.open()
            }}
            onPressComment={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.聊天室)
            }}
            onPressUser={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.我的页)
            }}
          />
        </SafeAreaHeader>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
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
            containerStyle={{ aspectRatio: 540 / 240 }}
            badgeStyle={{ top: scale(-230) }}
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
            containerStyle={{
              borderRadius: 0,
              marginBottom: scale(5),
              aspectRatio: 540 / 35,
            }}
            iconContainerStyle={{
              borderColor: '#ef473a',
              borderWidth: scale(1),
              marginHorizontal: scale(10),
              borderRadius: scale(2),
            }}
            notices={notices}
            onPressNotice={({ content }) => {
              PushHelper.pushNoticePopUp(content)
            }}
            logoTextStyle={{
              color: 'red',
              fontSize: scale(16),
              padding: scale(5),
            }}
            textStyle={{ fontSize: scale(16) }}
          />
          <NavBlock
            visible={navs?.length > 0}
            navs={navs}
            renderNav={(item, index) => {
              const { icon, name, logo, gameId } = item
              return (
                <GameButton
                  key={index}
                  logo={icon || logo}
                  title={name}
                  containerStyle={{
                    width: '20%',
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                  }}
                  titleContainerStyle={{ aspectRatio: 5 }}
                  titleStyle={{
                    color: config?.navColors[index],
                    fontSize: scale(23),
                  }}
                  circleColor={'transparent'}
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
            containerStyle={{ aspectRatio: 540 / 110, marginTop: scale(5) }}
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
          <GameSubTypeComponent
            uniqueKey={'WNZHomePage_GameSubTypeComponent'}
            containerStyle={{ paddingVertical: scale(5) }}
            numColumns={4}
            games={homeGamesConcat}
            subTypeContainerStyle={{
              marginTop: scale(10),
              paddingHorizontal: scale(10),
            }}
            subTypeNumColumns={4}
            renderSubType={({ item, index }) => {
              const { title } = item
              return (
                <Button
                  key={index}
                  containerStyle={styles.subTypeButton}
                  titleStyle={{ color: '#ffffff', fontSize: scale(15) }}
                  title={title}
                  onPress={() => {
                    PushHelper.pushHomeGame(item)
                  }}
                />
              )
            }}
            renderGame={({ item, index, showGameSubType }) => {
              const { logo, name, hotIcon, tipFlag, subType, icon } = item
              const flagType = parseInt(tipFlag)
              return (
                <View style={styles.gameContainer}>
                  <GameButton
                    logo={icon || logo}
                    showSecondLevelIcon={subType ? true : false}
                    showRightTopFlag={flagType > 0 && flagType < 4}
                    showCenterFlag={flagType == 4}
                    flagIcon={hotIcon}
                    title={name}
                    containerStyle={{
                      width: '100%',
                      backgroundColor: '#ffffff',
                      aspectRatio: 0.9,
                      borderRadius: scale(10),
                      justifyContent: 'center',
                    }}
                    titleContainerStyle={{
                      aspectRatio: 5,
                      paddingTop: scale(5),
                    }}
                    secondLevelIconContainerStyle={{
                      right: -scale(10),
                      top: null,
                      bottom: 0,
                    }}
                    enableCircle={false}
                    onPress={() => {
                      if (subType) {
                        showGameSubType(index)
                      } else {
                        //@ts-ignore
                        PushHelper.pushHomeGame(item)
                      }
                    }}
                  />
                </View>
              )
            }}
          />
          <TabComponent
            tabGames={tabGames}
            numColumns={2}
            enableAutoScrollTab={false}
            tabScrollEnabled={false}
            initialTabIndex={0}
            baseHeight={scale(100)}
            itemHeight={scale(100)}
            tabStyle={{ height: scale(100) }}
            renderLabel={TabLabel}
            renderScene={({ item, tab }) => {
              return (
                <List
                  uniqueKey={'WNZHomePage' + tab}
                  legacyImplementation={true}
                  removeClippedSubviews={true}
                  style={{ backgroundColor: '#ffffff' }}
                  numColumns={2}
                  //@ts-ignore
                  data={item}
                  renderItem={({ item, index }) => {
                    //@ts-ignore
                    const { title, pic, openCycle, id } = item
                    return (
                      <RowGameButtom
                        showRightBorder={index % 2 == 0}
                        logo={pic}
                        name={title}
                        desc={openCycle}
                        logoBallText={tab == '官方玩法' ? '官' : '信'}
                        onPress={() => {
                          PushHelper.pushLottery(stringToNumber(id))
                        }}
                      />
                    )
                  }}
                />
              )
            }}
          />
          <CouponBlock
            visible={showCoupon}
            onPressMore={goToJDPromotionListPage}
            containerStyle={styles.subComponent}
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
            rankLists={rankLists}
            rankContainerStyle={{ borderRadius: 0 }}
            initialAnimatedHeight={scale(0)}
            finalAnimatedHeight={
              scale(195) + scale((rankLists?.length ?? 0) * 50)
            }
          />
          <BottomLogo
            webName={webName}
            onPressComputer={() => {
              PushHelper.openWebView(
                httpClient.defaults.baseURL + '/index2.php'
              )
            }}
            onPressPromotion={goToJDPromotionListPage}
            debug={true}
            version={'aaaaa'}
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
        <MenuModalComponent
          ref={menu}
          menus={
            uid
              ? config?.menus?.concat(config?.menuSignOut)
              : // @ts-ignore
              config?.menuSignIn?.concat(config?.menus)
          }
          renderMenu={({ item }) => {
            const { title, onPress } = item
            return (
              <Menu
                color={WNZThemeColor.威尼斯.themeColor}
                title={title}
                onPress={() => {
                  if (title == '安全退出') {
                    signOut()
                  } else {
                    menu?.current?.close()
                    onPress && onPress()
                  }
                }}
              />
            )
          }}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
  },
  gameContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(5),
  },
  subComponent: {
    marginTop: scale(10),
    backgroundColor: '#ffffff',
  },
  subTypeButton: {
    width: '20%',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    marginBottom: scale(20),
    backgroundColor: WNZThemeColor.威尼斯.themeColor,
    paddingVertical: scale(20),
    borderRadius: scale(5),
  },
})

export default WNZHomePage
