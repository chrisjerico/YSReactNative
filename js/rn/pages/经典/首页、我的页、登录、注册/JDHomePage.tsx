import React, { useCallback, useEffect, useRef, useState } from 'react'
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
import { sc, scale } from '../../../public/tools/Scale'
import { goToUserCenterType, stringToNumber } from '../../../public/tools/tars'
import { ugLog } from '../../../public/tools/UgLog'
import BannerBlock from '../../../public/views/tars/BannerBlock'
import GameButton from '../../../public/views/tars/GameButton'
import HomePage from '../../../public/views/tars/HomePage'
import List from '../../../public/views/tars/List'
import NavBlock from '../../../public/views/tars/NavBlock'
import SafeAreaHeader from '../../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../../public/views/tars/TouchableImage'
import { UGNavigationBar } from '../../../public/widget/UGNavigationBar'
import { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../../redux/store/UGStore'
import { img_assets, img_images, img_platform } from '../../../Res/icon'
import { UGBasePageProps } from '../../base/UGPage'
import MenuButton from '../../WNZ/views/MenuButton'
import RowGameButtom from '../../WNZ/views/RowGameButtom'
import TabBar from '../../WNZ/views/TabBar'
import { ImagePlaceholder } from '../tools/ImagePlaceholder'
import config from './config'
import HomeHeader from './views/HomeHeader'
import { HomeRightMenuCP } from './views/HomeRightMenuCP'

const JDHomePage = ({ setProps }: UGBasePageProps) => {
  const menu = useRef(null)
  const { current: v } = useRef<{} & TabComponentApi & HomeRightMenuCP>({})

  useEffect(() => {
    setProps({ bgGradientColor: skin1.bgColor })
  }, [])

  const openMenu = () => {
    menu?.current?.open()
  }

  const closeMenu = () => {
    menu?.current?.close()
  }

  const { goTo, refresh, info, sign } = useHomePage({
    onSuccessSignOut: closeMenu,
  })

  const { loading, refreshing, userInfo, sysInfo, homeInfo, menus } = info

  const { signOut, tryPlay } = sign

  const { midBanners, navs, officialGames, customiseGames, homeGamesConcat, homeGames, rankLists } = homeInfo

  const { uid, usr, balance } = userInfo

  const { mobile_logo, midBannerTimer, chatRoomSwitch, appVersion, mobileHomeGameTypeSwitch, rankingListType } = sysInfo

  // @ts-ignore
  const defaultMenus = config.getDefaultMenus()

  const renderGameSubTypeComponent = (games: any[]) => (
    <GameSubTypeComponent
      uniqueKey={'JDHomePage_GameSubTypeComponent'}
      containerStyle={{ marginHorizontal: sc(6.5), paddingVertical: scale(5) }}
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
        const { logo, title, name, hotIcon, tipFlag, subType, icon, gameId, subId } = item
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
              containerStyle={{
                width: '100%',
                backgroundColor: skin1.homeContentColor,
                aspectRatio: 1.04,
                borderRadius: scale(15),
                justifyContent: 'center',
              }}
              imageContainerStyle={{ width: sc(95) }}
              titleContainerStyle={{
                aspectRatio: 5,
                paddingTop: scale(5),
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
                  //ugLog('GameType item=', JSON.stringify(item))
                  if (gameId == GameType.大厅
                    && (subId != MenuType.CQK &&
                      subId != MenuType.CZ &&
                      subId != MenuType.TX &&
                      subId != MenuType.ZHGL &&
                      subId != MenuType.CZJL &&
                      subId != MenuType.TXJL)) {
                    if (subId == 47) {//彩票大厅
                      PushHelper.pushUserCenterType(UGUserCenterType.彩票大厅)
                    } else {
                      push(PageName.SeriesLobbyPage,
                        {
                          gameId,
                          subId,
                          name,
                          headerColor: Skin1.themeColor,
                          homePage: PageName.JDHomePage
                        })
                    }
                  } else {
                    //@ts-ignore
                    PushHelper.pushHomeGame(item)
                  }
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
      noticeBlockStyles={noticeBlockStyles}
      noticeLogo={img_assets('notice')}
      couponBlockStyles={couponBlockStyles}
      couponStyles={{
        containerStyle: {
          backgroundColor: skin1.homeContentColor, borderRadius: sc(12), marginVertical: sc(13), overflow: 'hidden', padding: sc(12), ...getWhiteBorderStyle()
        },
        titleStyle: { marginVertical: sc(3), fontSize: sc(23), fontWeight: '500' }
      }}
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
          {/* 导航按钮 */}
          <NavBlock
            visible={navs?.length > 0}
            navCounts={5}
            containerStyle={{ alignItems: 'center', margin: sc(10), width: '96%', backgroundColor: skin1.homeContentColor, borderRadius: sc(15), aspectRatio: undefined, ...getWhiteBorderStyle() }}
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
                  titleContainerStyle={{ marginTop: -22 }}
                  titleStyle={{
                    color: 'black',
                    fontWeight: '500',
                    fontSize: scale(18),
                  }}
                  circleContainerStyle={{ width: '85%' }}
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
          {/* 腰部广告图 */}
          <BannerBlock
            containerStyle={{ marginHorizontal: sc(10), marginTop: scale(0), marginBottom: scale(15), width: '96%', aspectRatio: 540 / 135 }}
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
              itemHeight={scale(172)}
              tabWidth={sc(85)}
              numColumns={3}
              tabBarBackgroundColor={skin1.homeContentColor}
              tabBarStyle={{
                marginHorizontal: scale(5),
                borderRadius: sc(15),
                marginLeft: sc(10),
                width: '96%',
                height: sc(68),
                ...getWhiteBorderStyle(),
              }}
              tabTextStyle={{
                marginTop: 3,
                fontSize: scale(25),
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
    padding: scale(5),
  },
  subComponent: {
    marginTop: scale(10),
    backgroundColor: 'transparent',
  }
})
// 跑马灯
const noticeBlockStyles = StyleSheet.create({
  containerStyle: {
    borderRadius: 0,
    marginBottom: scale(5),
    height: sc(62),
    backgroundColor: skinColors.homeContentColor.经典1蓝,
  },
  iconContainerStyle: {
    marginHorizontal: scale(10),
  },
  logoTextStyle: {
    color: 'red',
    fontSize: scale(16),
    padding: scale(5),
  },
  textStyle: {
    backgroundColor: 'transparent',
    fontSize: scale(20),
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
