import React, { useRef } from 'react'
import { Platform, StyleSheet, View } from 'react-native'
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
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { anyEmpty } from '../../public/tools/Ext'
import { scale } from '../../public/tools/Scale'
import { goToUserCenterType, stringToNumber } from '../../public/tools/tars'
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
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { ugLog } from '../../public/tools/UgLog'

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

  const { midBanners, navs, officialGames, customiseGames, homeGamesConcat, homeGames, rankLists } = homeInfo

  const { uid, usr, balance } = userInfo

  const { mobile_logo, midBannerTimer, chatRoomSwitch, appVersion, mobileHomeGameTypeSwitch, rankingListType } = sysInfo
  const tabGames = [
    {
      // @ts-ignore
      games: officialGames?.slice(0, 9).concat(config?.moreGame),
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
                  if (gameId == GameType.大厅) {
                    if (subId == 47 && sysInfo?.mobileGameHall == '1') {//新彩票大厅
                      push(PageName.GameHallPage, { showBackButton: true })

                    } else if (subId == 47 && sysInfo?.mobileGameHall == '2') {//自由彩票大厅
                      push(PageName.FreedomHallPage, { showBackButton: true })

                    } else {
                      push(PageName.SeriesLobbyPage,
                        { gameId,
                          subId,
                          name,
                          headerColor: Skin1.themeColor,
                          homePage: PageName.WNZHomePage })
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
      rankingListType={AppDefine.siteId == 'c245' ? RankingListType.不顯示 : rankingListType}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      pagekey={'WNZHomePage'}
      headerColor={WNZThemeColor.威尼斯.themeColor}
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
            navs={AppDefine.siteId == 'c245' ? (uid ? config.c245AuthNavs : config.c245UnAuthNavs) : navs}
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
                  }}
                  imageContainerStyle={{
                    width: '100%',
                  }}
                  titleContainerStyle={{ aspectRatio: 4 }}
                  titleStyle={{
                    color: AppDefine.siteId == 'c245' ? '#000000' : config?.navColors[index],
                    fontSize: scale(18),
                  }}
<<<<<<< HEAD
                  circleContainerStyle = {{ width: '95%'}}
=======
                  circleContainerStyle = {{ width: '85%'}}
>>>>>>> c0aef14f... 135929 c108 nav image larger
                  circleColor={'transparent'}
                  onPress={() => {
                    if (AppDefine.siteId == 'c245') {
                      if (gameId == 'tryPlay') {
                        tryPlay()
                      } else {
                        onPress()
                      }
                    } else {
                      if (gameId == GameType.优惠活动) {
                        switch (Platform.OS) {
                          case 'ios':
                            goToPromotionPage()
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
              }}
              tabTextStyle={{
                fontSize: scale(20),
              }}
              enableMinWidth={false}
              showIndicator={false}
              focusTabColor={WNZThemeColor.威尼斯.themeColor}
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
            fixedHeight={AppDefine.siteId == 'c245' ? [null, 350] : []}
            renderTabBar={TabBar}
            renderScene={({ item, index: sceneIndex }) => {
              if (AppDefine.siteId == 'c245' && sceneIndex) {
                return <AnimatedRankComponent rankLists={rankLists} type={rankingListType} containerStyle={{ backgroundColor: '#ffffff' }} iconTitleContainerStyle={{ height: 0 }} />
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
                          logoBallText={sceneIndex ? '信' : AppDefine.siteId == 'c245' ? '热' : '官'}
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
                      PushHelper.pushHomeGame(item)
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
    backgroundColor: WNZThemeColor.威尼斯.themeColor,
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
