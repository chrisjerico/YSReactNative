import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import GameSubTypeComponent from '../../public/components/tars/GameSubTypeComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import { goToUserCenterType } from '../../public/tools/tars'
import BannerBlock from '../../public/views/tars/BannerBlock'
import Button from '../../public/views/tars/Button'
import GameButton from '../../public/views/tars/GameButton'
import HomePage from '../../public/views/tars/HomePage'
import NavBlock from '../../public/views/tars/NavBlock'
import TouchableImage from '../../public/views/tars/TouchableImage'
import GameBlock from './views/GameBlock'
import HomeHeader from './views/HomeHeader'

const onPressSignIn = () => push(PageName.BZHSignInPage)
const onPressSignUp = () => push(PageName.BZHSignUpPage)
const BZHHomePage = () => {
  const { goTo, refresh, value } = useHomePage({})
  const { goToPromotionPage } = goTo
  const { loading, refreshing, userInfo, sysInfo, homeInfo } = value

  const { midBanners, navs, homeGames, gameLobby } = homeInfo
  const { uid, usr, balance, isTest } = userInfo
  const { mobile_logo, midBannerTimer } = sysInfo

  const recommendGameTabs = gameLobby?.map((item) => item?.categoryName) ?? []

  return (
    <HomePage
      {...homeInfo}
      {...userInfo}
      {...sysInfo}
      {...goTo}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      pagekey={'BZHHomePage'}
      headerColor={BZHThemeColor.宝石红.themeColor}
      items={homeGames}
      noticeBlockStyles={noticeBlockStyles}
      couponBlockStyles={couponBlockStyles}
      couponStyles={couponStyles}
      animatedRankComponentStyles={animatedRankComponentStyles}
      bottomLogoStyles={bottomLogoStyles}
      renderHeader={() => (
        <HomeHeader logo={mobile_logo} isTest={isTest} uid={uid} name={usr} balance={balance} onPressSignIn={onPressSignIn} onPressSignUp={onPressSignUp} onPressUser={goToUserCenterType.我的页} />
      )}
      renderListHeaderComponent={() => (
        <>
          <NavBlock
            visible={navs?.length > 0}
            navs={navs}
            renderNav={(item, index) => {
              const { icon, name, logo, gameId } = item
              const memoizedOnPressGameButton = useCallback(() => {
                if (gameId == 9) {
                  goToPromotionPage()
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
              // @ts-ignore
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

const noticeBlockStyles = StyleSheet.create({
  logoTextStyle: {
    fontSize: scale(18),
    paddingHorizontal: scale(10),
  },
  textStyle: {
    fontSize: scale(18),
  },
  containerStyle: {
    borderRadius: 0,
  },
})

const couponBlockStyles = StyleSheet.create({
  containerStyle: {
    paddingHorizontal: '1%',
    marginTop: scale(10),
  },
  titleContainerStyle: {
    backgroundColor: '#ffffff',
  },
})

const couponStyles = StyleSheet.create({
  titleStyle: { alignSelf: 'center' },
  containerStyle: {
    borderColor: '#d9d9d9',
    borderWidth: scale(1),
    marginBottom: scale(20),
    padding: scale(5),
    borderRadius: scale(5),
    paddingBottom: scale(20),
  },
})

const animatedRankComponentStyles = StyleSheet.create({
  containerStyle: {
    marginTop: scale(10),
    backgroundColor: '#ffffff',
  },
  iconTitleContainerStyle: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#d9d9d9',
    borderBottomWidth: scale(1),
  },
  contentContainerStyle: {
    width: '95%',
    borderWidth: scale(1),
    borderColor: '#d9d9d9',
    alignSelf: 'center',
    marginBottom: scale(20),
  },
})

const bottomLogoStyles = StyleSheet.create({
  containerStyle: {
    marginBottom: scale(5),
  },
})

export default BZHHomePage
