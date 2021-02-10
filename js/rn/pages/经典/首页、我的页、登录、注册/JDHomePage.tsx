import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Platform, StyleSheet, View, Image, Text, ImageBackground, Animated, Easing } from 'react-native'
import { Button } from 'react-native-elements'
import FastImage from 'react-native-fast-image'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import LinearGradient from 'react-native-linear-gradient'
import { sub } from 'react-native-reanimated'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { appConfig } from '../../../../../config'
import AnimatedRankComponent from '../../../public/components/tars/AnimatedRankComponent'
import GameSubTypeComponent from '../../../public/components/tars/GameSubTypeComponent'
import MenuModalComponent from '../../../public/components/tars/MenuModalComponent'
import TabComponent, { TabComponentApi } from '../../../public/components/tars/TabComponent'
import { MenuType } from '../../../public/define/ANHelper/hp/GotoDefine'
import AppDefine from '../../../public/define/AppDefine'
import { OCEventType } from '../../../public/define/OCHelper/OCBridge/OCEvent'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'
import PushHelper, { UGLinkPositionType } from '../../../public/define/PushHelper'
import useHomePage from '../../../public/hooks/tars/useHomePage'
import { GameType, RankingListType } from '../../../public/models/Enum'
import { PageName } from '../../../public/navigation/Navigation'
import { push } from '../../../public/navigation/RootNavigation'
import { api } from '../../../public/network/NetworkRequest1/NetworkRequest1'
import { skinColors } from '../../../public/theme/const/UGSkinColor'
import { skin1, Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { anyEmpty } from '../../../public/tools/Ext'
import { deepMergeProps } from '../../../public/tools/FUtils'
import { sc540, scale } from '../../../public/tools/Scale'
import { goToUserCenterType, stringToNumber } from '../../../public/tools/tars'
import { ugLog } from '../../../public/tools/UgLog'
import BannerBlock from '../../../public/views/tars/BannerBlock'
import GameButton from '../../../public/views/tars/GameButton'
import HomePage from '../../../public/views/tars/HomePage'
import List from '../../../public/views/tars/List'
import SafeAreaHeader from '../../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../../public/views/tars/TouchableImage'
import { UGNavigationBar } from '../../../public/widget/UGNavigationBar'
import { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { UGStore } from '../../../redux/store/UGStore'
import { img_assets, img_images, img_platform } from '../../../Res/icon'
import { UGBasePageProps } from '../../base/UGPage'
import MenuButton from '../../WNZ/views/MenuButton'
import RowGameButtom from '../../WNZ/views/RowGameButtom'
import TabBar from '../../WNZ/views/TabBar'
import { ImagePlaceholder } from '../tools/ImagePlaceholder'
import config from './config'
import { HomeFriendReferralCP } from './views/HomeFriendReferralCP'
import HomeHeader from './views/HomeHeader'
import { HomeRightMenuCP } from './views/HomeRightMenuCP'
import NavBlock from './views/NavBlock'

const sc = sc540

const JDHomePage = ({ setProps }: UGBasePageProps) => {
  const menu = useRef(null)
  const { current: v } = useRef<{ willShowAnnouncement: boolean } & TabComponentApi & HomeRightMenuCP>({
    willShowAnnouncement: true
  })

  useEffect(() => {
    setProps({ bgGradientColor: skin1.bgColor })
  }, [])

  OCHelper.removeEvents(OCEventType.UGNotificationLoginComplete)
  OCHelper.addEvent(OCEventType.UGNotificationLoginComplete, () => {
    setTimeout(() => {
      UGUserModel.updateFromYS()
    }, 500);
  })


  const closeMenu = () => {
    menu?.current?.close()
  }

  const { goTo, refresh, info, sign } = useHomePage({
    onSuccessSignOut: closeMenu,
  })

  const { loading, refreshing, userInfo, sysInfo, homeInfo, menus } = info

  const { signOut, tryPlay } = sign

  const { midBanners, navs, officialGames, customiseGames, homeGamesConcat, homeGames, rankLists, announcements } = homeInfo

  const { uid, usr, balance } = userInfo

  const { mobile_logo, midBannerTimer, chatRoomSwitch, appVersion, mobileHomeGameTypeSwitch, rankingListType, switchShowFriendReferral, showNavigationBar, popup_type } = sysInfo

  // @ts-ignore
  const defaultMenus = config.getDefaultMenus()

  if (v.willShowAnnouncement && announcements?.length) {
    if (popup_type == '1' && !uid?.length) {} else {
      PushHelper.pushAnnouncement(announcements)
    }
    v.willShowAnnouncement = false
  }

  const renderGameSubTypeComponent = (games: any[]) => (
    <GameSubTypeComponent
      uniqueKey={'JDHomePage_GameSubTypeComponent'}
      containerStyle={{ marginHorizontal: sc(6.5), paddingVertical: sc(5) }}
      numColumns={3}
      games={games}
      subTypeContainerStyle={{
      }}
      subTypeNumColumns={3}
      renderSubType={({ item, index }) => {
        const { title, name } = item
        return (
          <TouchableOpacity key={index} style={{ marginHorizontal: sc(5), marginVertical: sc(7) }} onPress={() => {
            PushHelper.pushHomeGame(item)
          }}>
            <Image source={{ uri: img_assets('subgame_bg') }} style={{ width: sc(157), height: sc(45), marginHorizontal: sc(5), tintColor: skin1.homeContentSubColor }} resizeMode='contain' />
            <Text style={{ position: 'absolute', marginLeft: sc(6), marginTop: sc(12), width: sc(153), textAlign: 'center', color: '#ffffff', fontSize: sc(18.5), fontWeight: '500' }}>{anyEmpty(title) ? name : title}</Text>
          </TouchableOpacity>
        )
      }}
      renderGame={({ item, index, showGameSubType }) => {
        const { logo, title, name, hotIcon, tipFlag, subType, icon, gameId, subId, subtitle } = item
        const flagType = parseInt(tipFlag)
        return (
          <View style={styles.gameContainer}>
            <GameButton
              logo={icon || logo}
              showSecondLevelIcon={subType ? true : false}
              showRightTopFlag={flagType > 0 && flagType < 4}
              flagIcon={(() => {
                if (hotIcon) return hotIcon
                if (flagType > 0 && flagType < 4) return img_images('hot2x')
                if (flagType == 4) return img_platform('c116', 'zhongdajiang', 'gif')
                return undefined
              })()}
              flagContainer={{ width: sc(50), height: sc(50) }}
              showBigCenterFlag={flagType == 4}
              title={anyEmpty(title) ? name : title}
              showSubTitle={!!subtitle?.length}
              subTitle={subtitle}
              subTitleStyle={{ fontSize: sc(18), color: '#777' }}
              containerStyle={{
                width: '100%',
                backgroundColor: skin1.homeContentColor,
                aspectRatio: 1.04,
                borderRadius: sc(15),
                justifyContent: 'center',
                ...getWhiteBorderStyle(),
              }}
              imageContainerStyle={{ width: sc(95) }}
              titleContainerStyle={{
                height: sc(50),
                aspectRatio: 5,
              }}
              secondLevelIconProps={{
                name: 'appstore1',
                size: sc(23),
                color: '#777',
                style: { marginTop: sc(5), marginRight: -sc(3) },
              }}
              enableCircle={false}
              onPress={() => {
                if (subType) {
                  const isShow = showGameSubType(index)
                  const row = Math.ceil(item?.subType?.length / 3)
                  const subTypeHeight = row * sc(55)
                  v.updateGameSubTypeHeight && v.updateGameSubTypeHeight(isShow ? subTypeHeight : 0)
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
  )

  return (
    <HomePage
      {...homeInfo}
      {...userInfo}
      {...sysInfo}
      {...goTo}
      goToPromotionPage={() => push(PageName.JDPromotionListPage)}
      rankingListType={rankingListType}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      pagekey={'JDHomePage'}
      headerColor={skin1.themeColor}
      noticeBlockStyles={noticeBlockStyles()}
      noticeLogo={img_assets('notice')}
      couponBlockStyles={couponBlockStyles}
      couponStyles={{
        containerStyle: {
          backgroundColor: skin1.homeContentColor, borderRadius: sc(12), marginVertical: sc(13), overflow: 'hidden', padding: sc(12), ...getWhiteBorderStyle()
        },
        titleStyle: { marginVertical: sc(3), fontSize: sc(23), fontWeight: '500' }
      }}
      bannerBadgeStyle={{ paddingHorizontal: sc(15), top: -sc(225), height: sc(40), borderRadius: sc(20), backgroundColor: 'rgba(27,38,116,0.5)' }}
      animatedRankComponentStyles={animatedRankComponentStyles()}
      containerStyle={styles.container}
      bottomLogoStyles={{
        containerStyle: {
          marginTop: 0,
          paddingTop: sc(40),
          paddingBottom: sc(120),
          backgroundColor: sysInfo?.rankingListSwitch == 0 ? 'transparent' : skin1.themeColor,
        },
        titleStyle: { fontSize: sc(18) },
        subTitleStyle: { fontSize: sc(18) },
      }}
      renderHeader={() => (
        // 导航条
        <HomeHeader
          uid={uid}
          name={usr}
          logo={mobile_logo}
          balance={balance}
          onPressTryPlay={tryPlay}
          onPressSignIn={goToUserCenterType.登录页}
          onPressSignUp={goToUserCenterType.注册页}
          showChatRoom={chatRoomSwitch}
          onPressMenu={() => { v.showRightMenuCP && v.showRightMenuCP() }}
          onPressComment={goToUserCenterType.聊天室}
          onPressUser={goToUserCenterType.我的页}
        />
      )}
      renderListHeaderComponent={() => (
        <>
          <HomeFriendReferralCP visible={switchShowFriendReferral == '1' && showNavigationBar == '1'} containerStyle={{ marginLeft: sc(10), width: '96%', marginTop: sc(6) }} />
          {/* 导航按钮 */}
          <NavBlock
            visible={navs?.length > 0}
            containerStyle={{ alignItems: 'center', margin: sc(10), width: '96%', backgroundColor: skin1.homeContentColor, borderRadius: sc(15), ...getWhiteBorderStyle() }}
            navs={navs}
            renderNav={(item, index) => {
              const { icon, name, logo, gameId, onPress, hotIcon, tipFlag } = item
              console.log('item  = ', item);

              return (
                <GameButton
                  key={index}
                  logo={icon || logo}
                  title={name}
                  showRightTopFlag={tipFlag != 0}
                  flagIcon={hotIcon}
                  flagContainer={{ width: sc(40), height: sc(40) }}
                  containerStyle={{
                    flex: 1,
                    backgroundColor: 'transparent',
                  }}
                  imageContainerStyle={{
                    marginTop: -sc(10),
                    width: '63%',
                  }}
                  titleContainerStyle={{ marginTop: -22, height: sc(52) }}
                  titleStyle={{
                    color: 'black',
                    fontWeight: '500',
                    fontSize: sc(18),
                  }}
                  circleContainerStyle={{ width: '85%', height: sc(92) }}
                  circleColor={'transparent'}
                  onPress={() => {
                    ugLog("TEST onPRess: " + item.gameId)
                    if (AppDefine.siteId == 'c245'
                      || (AppDefine.siteId.includes('c108') && !uid)) {
                      if (gameId == 'tryPlay') {
                        tryPlay()
                      } else {
                        onPress()
                      }
                    } else {
                      if (gameId == GameType.优惠活动) {
                        switch (Platform.OS) {
                          case 'ios':
                            push(PageName.JDPromotionListPage)
                            break
                          case 'android':
                            PushHelper.pushHomeGame(item)
                            break
                        }
                      } else {
                        PushHelper.pushHomeGame(item)
                      }
                    }
                  }}
                />
              )
            }}
          />
          <HomeFriendReferralCP visible={switchShowFriendReferral == '1' && showNavigationBar == '0'} containerStyle={{ marginLeft: sc(10), width: '96%', marginBottom: sc(10) }} />
          {/* 腰部广告图 */}
          <BannerBlock
            containerStyle={{ marginHorizontal: sc(10), marginTop: sc(0), marginBottom: sc(15), width: '96%', aspectRatio: 540 / 135 }}
            visible={midBanners?.length > 0}
            autoplayTimeout={midBannerTimer}
            showOnlineNum={false}
            banners={midBanners}
            renderBanner={(item, index) => {
              //@ts-ignore
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
          {/* 游戏列表 */}
          {mobileHomeGameTypeSwitch ? (
            <TabComponent
              c_ref={v}
              tabGames={homeGames}
              itemHeight={sc(172)}
              tabWidth={homeGames?.length > 6 ? (homeGames?.[0]?.name?.length > 3 ? sc(120) : sc(85)) : sc(515 / homeGames?.length)}
              numColumns={3}
              tabBarBackgroundColor={skin1.homeContentColor}
              tabBarStyle={{
                marginHorizontal: sc(5),
                borderRadius: sc(15),
                marginLeft: sc(10),
                width: '96%',
                height: sc(68),
                ...getWhiteBorderStyle(),
              }}
              tabTextStyle={{
                marginTop: 3,
                fontSize: sc(25),
              }}
              enableMinWidth={false}
              showIndicator={false}
              focusTabColor={UGColor.RedColor5}
              renderScene={({ item }) => renderGameSubTypeComponent(item)}
            />
          ) : (
              renderGameSubTypeComponent(homeGamesConcat)
            )}
        </>
      )}
      renderRestComponent={() => (
        // 侧边栏
        <HomeRightMenuCP menus={menus?.length ? menus : defaultMenus} appVersion={appVersion} showDepositAndWithdrawalBtn={!menus?.length} c_ref={v} />
      )}
    />
  )
}

function getWhiteBorderStyle() {
  return appConfig.isHomeWhiteBorder() ? { borderWidth: 1, borderColor: 'white', } : undefined
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  gameContainer: {
    width: '33.3%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: sc(5),
  },
  subComponent: {
    marginTop: sc(10),
    backgroundColor: 'transparent',
  }
})
// 跑马灯
const noticeBlockStyles = () => StyleSheet.create({
  containerStyle: {
    borderRadius: 0,
    marginBottom: sc(5),
    height: sc(62),
    backgroundColor: skin1.homeContentColor,
  },
  iconContainerStyle: {
    marginHorizontal: sc(10),
  },
  logoTextStyle: {
    color: 'red',
    fontSize: sc(16),
    padding: sc(5),
  },
  textStyle: {
    backgroundColor: 'transparent',
    fontSize: sc(20),
  },
  bgContainerStyle: {
    backgroundColor: 'transparent',
  },
})
// 底部优惠活动
const couponBlockStyles = StyleSheet.create({
  containerStyle: styles.subComponent,
  titleContainerStyle: { backgroundColor: 'transparent' },
  titleStyle: { fontSize: sc(22) },
  listContainerStyle: { marginLeft: sc(10), width: '96%', backgroundColor: '#ffffff44' },
})
// 底部排行榜
const animatedRankComponentStyles = () => StyleSheet.create({
  containerStyle: {// 最外层
    marginTop: sc(18),
    backgroundColor: skin1.themeColor,
  },
  iconStyle: { marginLeft: sc(18) },
  iconTitleContainerStyle: { paddingVertical: sc(18) },//标题
  iconTitleStyle: { paddingLeft: sc(5), fontSize: sc(22), },// 标题
  contentContainerStyle: {// 表格
    marginTop: 0,
    borderRadius: sc(5),
    backgroundColor: skin1.homeContentColor,
    borderWidth: 2, borderColor: '#bbb', marginLeft: sc(15), width: '94%',
    paddingHorizontal: 0,
  },
  titleConatinerStyle: { backgroundColor: '#99b7d3', height: sc(55) },// 表格标题
  contentTitleStyle: { fontSize: sc(23), fontWeight: '400' },
  leftItemTextStyle: { color: 'black' },
})

export default JDHomePage
