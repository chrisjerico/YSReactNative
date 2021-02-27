import React, { useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import GameSubTypeComponent from '../../public/components/tars/GameSubTypeComponent'
import MenuModalComponent from '../../public/components/tars/MenuModalComponent'
import TabComponent from '../../public/components/tars/TabComponent'
import AppDefine from '../../public/define/AppDefine'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { GameType, RankingListType } from '../../public/models/Enum'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import { anyEmpty } from '../../public/tools/Ext'
import { scale } from '../../public/tools/Scale'
import BannerBlock from '../../public/views/tars/BannerBlock'
import Button from '../../public/views/tars/Button'
import GameButton from '../../public/views/tars/GameButton'
import HomePage from '../../public/views/tars/HomePage'
import List from '../../public/views/tars/List'
import NavBlock from '../../public/views/tars/NavBlock'
import TouchableImage from '../../public/views/tars/TouchableImage'
import config from './config'
import HomeHeader from './views/HomeHeader'
import MenuButton from './views/MenuButton'
import RowGameButtom from './views/RowGameButtom'
import TabBar from './views/TabBar'
import { ugLog } from '../../public/tools/UgLog'
import { MenuType } from '../../public/define/ANHelper/hp/GotoDefine'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { appConfig } from '../../../../config'
import { goToUserCenterType, stringToNumber } from '../../public/tools/tars'
import { PushHomeGame } from '../../public/models/Interface'
import { Icon } from '../../public/network/Model/HomeGamesModel'
import { httpClient } from '../../public/network/httpClient'
import { img_assets } from '../../Res/icon'

const WNZHomePage = () => {
  const menu = useRef(null)

  const openMenu = () => {
    menu?.current?.open()
  }

  const closeMenu = () => {
    menu?.current?.close()
  }

  const { goTo, refresh, info, sign } = useHomePage({
    onSuccessSignOut: closeMenu,
  })

  const { goToPromotionPage } = goTo

  const { loading, refreshing, userInfo, sysInfo, homeInfo, menus } = info

  const { signOut, tryPlay } = sign

  const { midBanners, navs, officialGames, customiseGames, homeGamesConcat, homeGames, homeGamesHot, rankLists } = homeInfo

  const getNavs = () => {
    if (AppDefine.siteId == 'c245') {
      var newNavs = uid ? config.c245AuthNavs : config.c245UnAuthNavs
      newNavs.forEach((ele) => {
        ele.icon = navs?.find((e) => e?.name == ele?.name)?.icon
      })
      return newNavs
    }
    if (AppDefine.siteId.includes('c108') && !uid) return config.c108UnAuthNavs
    return navs
  }

  const { uid, usr, balance } = userInfo

  const { mobile_logo, midBannerTimer, chatRoomSwitch, appVersion, mobileHomeGameTypeSwitch, rankingListType } = sysInfo

  const getTabGames = () => {
    let res = []
    if (officialGames && (officialGames.length > 0 || customiseGames.length > 0)) {
      const OMLHC = officialGames.find((item) => item.title == '澳门六合彩') || customiseGames.find((item) => item.title == '澳门六合彩')
      const HKLHC = officialGames.find((item) => item.title == '香港六合彩') || customiseGames.find((item) => item.title == '香港六合彩')
      const EMLHC = officialGames.find((item) => item.title == '一分六合彩') || customiseGames.find((item) => item.title == '一分六合彩')
      const EMSSC = officialGames.find((item) => item.title == '一分时时彩') || customiseGames.find((item) => item.title == '一分时时彩')
      const EMPK10 = officialGames.find((item) => item.title == '一分PK拾') || customiseGames.find((item) => item.title == '一分PK拾')
      const EMK3 = officialGames.find((item) => item.title == '一分快三') || customiseGames.find((item) => item.title == '一分快三')
      const EMLB = officialGames.find((item) => item.title == '一分幸运飞艇') || customiseGames.find((item) => item.title == '一分幸运飞艇')
      const EMPCDD = officialGames.find((item) => item.title == '一分PC蛋蛋') || customiseGames.find((item) => item.title == '一分PC蛋蛋')
      const LHLHC = officialGames.find((item) => item.title == '台湾六合彩' || '六合秒秒彩')
      if (OMLHC) {
        OMLHC.pic = 'https://cdn01.pjyusei.com/views/mobileTemplate/23/images/home/amlhc.png'
        res.push(OMLHC)
      }
      if (HKLHC) {
        HKLHC.pic = img_assets('HKLHC_games_logo')
        console.log(img_assets('HKLHC_games_logo'))
        res.push(HKLHC)
      }
      if (EMLHC) {
        EMLHC.pic = 'https://cdn01.pjyusei.com/views/mobileTemplate/23/images/home/yflhc.png'
        res.push(EMLHC)
      }
      if (EMSSC) {
        EMSSC.pic = 'https://cdn01.pjyusei.com/views/mobileTemplate/23/images/home/yfssc.png'
        res.push(EMSSC)
      }
      if (EMPK10) {
        EMPK10.pic = 'https://cdn01.pjyusei.com/views/mobileTemplate/23/images/home/yfpk10.png'
        res.push(EMPK10)
      }
      if (EMK3) {
        EMK3.pic = 'https://cdn01.pjyusei.com/views/mobileTemplate/23/images/home/yfk3.png'
        res.push(EMK3)
      }
      if (EMLB) {
        EMLB.pic = img_assets('luckyAirship')
        res.push(EMLB)
      }
      if (EMPCDD) {
        EMPCDD.pic = 'https://cdn01.pjyusei.com/views/mobileTemplate/23/images/home/yfpcdd.png'
        res.push(EMPCDD)
      }
      if (LHLHC) {
        LHLHC.title = '六合秒秒彩'
        LHLHC.pic = 'https://cdn01.pjyusei.com/platform/c245/images/lhmmc.png'
        res.push(LHLHC)
      }
    }
    return res
  }

  const tabGames = [
    {
      // @ts-ignore
      // games: homeGamesHot.concat(config?.moreGame),
      games: AppDefine.siteId == 'c245' ? getTabGames().concat(config?.moreGame) : officialGames?.slice(0, 9).concat(config?.moreGame),
    },
    {
      // @ts-ignore
      games: customiseGames?.slice(0, 9).concat(config?.moreGame),
    },
  ]

  // @ts-ignore
  const defaultMenus = uid ? config.menuSignOut.concat(config.menus) : config.menuSignIn.concat(config.menus)
  const renderGameSubTypeComponent = (games: any[]) => (
    <GameSubTypeComponent
      uniqueKey={'WNZHomePage_GameSubTypeComponent'}
      containerStyle={{ paddingVertical: scale(5) }}
      numColumns={4}
      games={games}
      subTypeContainerStyle={{
        marginTop: scale(10),
        paddingHorizontal: scale(10),
      }}
      subTypeNumColumns={4}
      renderSubType={({ item, index }) => {
        const { title, name } = item
        return (
          <Button
            key={index}
            containerStyle={styles.subTypeButton}
            titleStyle={{ color: '#ffffff', fontSize: scale(15) }}
            title={anyEmpty(title) ? name : title}
            onPress={() => {
              PushHelper.pushHomeGame(item)
            }}
          />
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
              showCenterFlag={flagType == 4}
              flagIcon={hotIcon}
              title={anyEmpty(title) ? name : title}
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
                  ugLog('GameType item=', JSON.stringify(item))
                  if (
                    gameId == GameType.大厅 &&
                    subId != MenuType.CQK &&
                    subId != MenuType.CZ &&
                    subId != MenuType.TX &&
                    subId != MenuType.ZHGL &&
                    subId != MenuType.CZJL &&
                    subId != MenuType.TXJL &&
                    subId != MenuType.YHDD
                  ) {
                    if (subId == 47 && sysInfo?.mobileGameHall == '1') {
                      //新彩票大厅
                      push(PageName.GameHallPage, { showBackButton: true })
                    } else if (subId == 47 && sysInfo?.mobileGameHall == '2') {
                      //自由彩票大厅
                      push(PageName.FreedomHallPage, { showBackButton: true })
                    } else if (subId == 9) {
                      //自由彩票大厅
                      push(PageName.FreedomHallPage, { showBackButton: true })
                    } else {
                      let game: PushHomeGame = {
                        category: item.category,
                        seriesId: item.seriesId,
                        gameId: item.gameId,
                        subId: item.subId,
                      }
                      PushHelper.pushHomeGame(game)
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
      rankingListType={appConfig.isWNZBottomTabHot() ? RankingListType.不顯示 : rankingListType}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      pagekey={'WNZHomePage'}
      headerColor={skinColors.themeColor.威尼斯}
      noticeBlockStyles={noticeBlockStyles}
      couponBlockStyles={couponBlockStyles}
      animatedRankComponentStyles={animatedRankComponentStyles}
      containerStyle={styles.container}
      renderHeader={() => (
        <HomeHeader
          uid={uid}
          showBackBtn={false}
          name={usr}
          logo={mobile_logo}
          balance={balance}
          showChatRoom={chatRoomSwitch}
          onPressMenu={openMenu}
          onPressComment={goToUserCenterType.聊天室}
          onPressUser={goToUserCenterType.我的页}
        />
      )}
      renderListHeaderComponent={() => (
        <>
          <NavBlock
            visible={navs?.length > 0}
            navCounts={5}
            containerStyle={{ alignItems: 'center' }}
            navs={getNavs()}
            renderNav={(item, index) => {
              const { icon, name, logo, gameId, onPress } = item
              return (
                <GameButton
                  key={index}
                  logo={icon || logo}
                  title={name}
                  containerStyle={{
                    padding: 5,
                    width: '20%',
                    backgroundColor: '#ffffff',
                    justifyContent: 'center',
                    borderRightWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: '#F1F1F1',
                  }}
                  imageContainerStyle={{
                    width: '75%',
                  }}
                  titleContainerStyle={{ aspectRatio: 4 }}
                  titleStyle={{
                    color: AppDefine.siteId == 'c245' ? '#000000' : config?.navColors[index],
                    fontSize: scale(18),
                  }}
                  circleContainerStyle={{ width: '85%' }}
                  circleColor={'transparent'}
                  onPress={() => {
                    ugLog('TEST onPRess: ' + item.gameId)
                    if (AppDefine.siteId == 'c245' || (AppDefine.siteId.includes('c108') && !uid)) {
                      if (gameId == 'tryPlay') {
                        tryPlay()
                      } else {
                        onPress()
                      }
                    } else {
                      if (gameId == GameType.优惠活动) {
                        goToPromotionPage()
                      } else {
                        PushHelper.pushHomeGame(item)
                      }
                    }
                  }}
                />
              )
            }}
          />
          <BannerBlock
            containerStyle={{ aspectRatio: 540 / 110, marginTop: scale(5), marginBottom: scale(10) }}
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
          {mobileHomeGameTypeSwitch ? (
            <TabComponent
              tabGames={homeGames}
              baseHeight={scale(65)}
              itemHeight={scale(150)}
              numColumns={4}
              tabBarBackgroundColor={'#ffffff'}
              tabBarStyle={{
                marginHorizontal: scale(5),
                marginTop: scale(5),
              }}
              tabTextStyle={{
                fontSize: scale(20),
              }}
              enableMinWidth={false}
              showIndicator={false}
              focusTabColor={skinColors.themeColor.威尼斯}
              renderScene={({ item }) => renderGameSubTypeComponent(item)}
            />
          ) : (
            renderGameSubTypeComponent(homeGamesConcat)
          )}
          <TabComponent
            tabGames={tabGames}
            numColumns={2}
            enableAutoScrollTab={false}
            tabBarScrollEnabled={false}
            initialTabIndex={1}
            baseHeight={scale(82)}
            itemHeight={scale(100)}
            fixedHeight={appConfig.isWNZBottomTabHot() ? [null, 350] : []}
            renderTabBar={TabBar}
            renderScene={({ item, index: sceneIndex }) => {
              if (appConfig.isWNZBottomTabHot() && sceneIndex) {
                return <AnimatedRankComponent rankLists={rankLists} type={rankingListType}
                                              containerStyle={{ backgroundColor: '#ffffff' }}
                                              iconTitleContainerStyle={{ height: 0 }} />
              } else {
                return (
                  <List
                    uniqueKey={'WNZHomePageTabComponent' + sceneIndex}
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
                          showLogoBall={title == '更多游戏' ? false : true}
                          logo={pic}
                          name={title}
                          desc={openCycle}
                          logoBallText={sceneIndex ? '信' : appConfig.isWNZBottomTabHot() ? '热' : '官'}
                          onPress={
                            title == '更多游戏'
                              ? goToUserCenterType.游戏大厅
                              : () => {
                                PushHelper.pushLottery(stringToNumber(id))
                              }
                          }
                        />
                      )
                    }}
                  />
                )
              }
            }}
          />
        </>
      )}
      renderRestComponent={() => (
        <MenuModalComponent
          ref={menu}
          menus={menus?.length ? menus : defaultMenus}
          renderMenuItem={({ item }) => {
            const { name, gameId, title, onPress } = item
            return (
              <MenuButton
                title={name ?? title}
                subTitle={'(' + appVersion + ')'}
                showSubTitle={gameId == GameType.APP版本号}
                onPress={() => {
                  if (gameId == GameType.登出) {
                    signOut()
                  } else {
                    closeMenu()
                    if (onPress) {
                      onPress()
                    } else {
                      //ugLog('GameType item=', JSON.stringify(item))
                      const { subId } = item
                      if (subId == GameType.游戏大厅) {
                        //游戏大厅
                        push(PageName.GameLobbyPage, { showBackButton: true })
                      } else {
                        PushHelper.pushHomeGame(item)
                      }
                    }
                  }
                }}
              />
            )
          }}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E0E0E0',
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
    backgroundColor: skinColors.themeColor.威尼斯,
    paddingVertical: scale(20),
    borderRadius: scale(5),
  },
})

const noticeBlockStyles = StyleSheet.create({
  containerStyle: {
    borderRadius: 0,
    marginBottom: scale(5),
    aspectRatio: 540 / 35,
  },
  iconContainerStyle: {
    borderColor: '#ef473a',
    borderWidth: scale(1),
    marginHorizontal: scale(10),
    borderRadius: scale(2),
  },
  logoTextStyle: {
    color: 'red',
    fontSize: scale(16),
    padding: scale(5),
  },
  textStyle: {
    fontSize: scale(16),
  },
})
const couponBlockStyles = StyleSheet.create({
  containerStyle: styles.subComponent,
})

const animatedRankComponentStyles = StyleSheet.create({
  contentContainerStyle: {
    borderRadius: 0,
  },
})

export default WNZHomePage
