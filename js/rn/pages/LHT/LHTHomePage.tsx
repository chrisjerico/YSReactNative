import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import AppDefine from '../../public/define/AppDefine'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { GameType } from '../../public/models/Enum'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import { goToUserCenterType, UGImageHost, stringToNumber, useHtml5Image } from '../../public/tools/tars'
import GameButton from '../../public/views/tars/GameButton'
import HomePage from '../../public/views/tars/HomePage'
import TouchableImage from '../../public/views/tars/TouchableImage'
import { LotteryType } from '../../redux/model/全局/UGLotteryModel'
import HomeGameComponent from './components/HomeGameComponent'
import config from './config'
import BottomToolBlock from './views/BottomToolBlock'
import HomeHeader from './views/HomeHeader'
import LotteryBall from './views/LotteryBall'
import NavBlock from './views/NavBlock'

const { getHtml5Image } = useHtml5Image(UGImageHost.test5)

const LHTHomePage = () => {
  // states
  const [preferenceGames, setPreferenceGames] = useState(config?.preferences)
  // functions

  const { goTo, info, sign, refresh } = useHomePage({})

  const { signOut, tryPlay } = sign
  const { goToPromotionPage } = goTo

  const { loading, refreshing, userInfo, homeInfo, sysInfo } = info

  const { lotteryDate, lotterys, navs, homeGames } = homeInfo
  const { uid, usr, balance, isTest, avatar } = userInfo

  const { mobile_logo, appDownloadUrl, currency, balanceDecimal } = sysInfo

  const plusLotterys = [
    ...lotterys.slice(0, 6),
    {
      showMore: true,
    },
    ...lotterys.slice(6),
  ]

  const chooseGames = preferenceGames?.concat(config?.moreLottery)?.filter((item) => item.selected)

  return (
    <HomePage
      {...homeInfo}
      {...userInfo}
      {...sysInfo}
      {...goTo}
      equalFactor={JSON.stringify(chooseGames?.map((ele) => ele?.gameId))}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      pagekey={'LHTHomePage'}
      headerColor={LHThemeColor.六合厅.themeColor}
      noticeBlockStyles={noticeBlockStyles}
      couponBlockStyles={couponBlockStyles}
      animatedRankComponentStyles={animatedRankComponentStyles}
      bottomLogoStyles={bottomLogoStyles}
      noticeLogo={config.noticeLogo}
      renderHeader={() => (
        <HomeHeader
          avatar={isTest || !avatar ? AppDefine.defaultAvatar : avatar}
          name={usr}
          showLogout={uid ? true : false}
          leftLogo={mobile_logo}
          rightLogo={config.homeHeaderRightLogo}
          onPressSignOut={signOut}
          onPressSignIn={() => push(PageName.LHTSignInPage)}
          onPressSignUp={() => push(PageName.LHTSignUpPage)}
          onPressTryPlay={tryPlay}
          onPressLogo={goToPromotionPage}
        />
      )}
      renderListHeaderComponent={() => (
        <View style={styles.contentContainer}>
          <NavBlock
            containerStyle={[styles.subComponent, { borderRadius: scale(20) }]}
            navs={navs?.slice(0, 8)}
            lotterys={plusLotterys}
            date={lotteryDate}
            advertisement={config.advertisementLogo}
            lotteryLogo={config.lotteryLogo}
            balanceLogo={config.balanceLogo}
            balance={balance}
            currency={currency}
            showK={currency == 'VND' ? true : false}
            balanceDecimal={balanceDecimal}
            customerServiceLogo={config.customerServiceLogo}
            onPressSavePoint={goToUserCenterType.存款}
            onPressGetPoint={goToUserCenterType.取款}
            onPressAd={() => PushHelper.pushLottery(LotteryType.新加坡六合彩)}
            onPressSmileLogo={goToUserCenterType.在线客服}
            renderNav={(item, index) => {
              const { icon, name, logo, gameId, subId } = item
              return (
                <GameButton
                  key={index}
                  showSecondLevelIcon={false}
                  containerStyle={{ width: '25%', height: '50%' }}
                  imageContainerStyle={{ width: '50%' }}
                  enableCircle={false}
                  logo={icon ? icon : logo}
                  title={name}
                  onPress={() => {
                    if (gameId == GameType.大厅) {
                      navigate(PageName.SeriesLobbyPage, { gameId, subId, name, headerColor: LHThemeColor.六合厅.themeColor, homePage: PageName.LHTHomePage })
                    } else if (gameId == GameType.优惠活动) {
                      goToPromotionPage()
                    } else {
                      //@ts-ignore
                      PushHelper.pushHomeGame(item)
                    }
                  }}
                />
              )
            }}
            renderLottery={(item, index) => {
              const { number, color, sx, showMore } = item
              return <LotteryBall key={index} score={number} color={color} text={sx} showMore={showMore} onPress={goToUserCenterType.彩票大厅} />
            }}
          />
          <HomeGameComponent
            itemHeight={scale(200)}
            leftIcon={config.homeGameLeftIcon}
            rightIcon={config.homeGameRightIcon}
            activeTabColor={'#ff6b1b'}
            unActiveTabColor={'#bbbbbb'}
            containerStyle={styles.subComponent}
            leftGames={chooseGames}
            rightGames={homeGames}
            renderLeftGame={({ item, index }) => {
              const { title, logo, des, gameType, gameId } = item
              const logoUrl = getHtml5Image(14, logo)
              return (
                <GameButton
                  key={index}
                  showSecondLevelIcon={false}
                  circleColor={'#b3cde6'}
                  logo={logoUrl}
                  title={title}
                  subTitle={des}
                  showSubTitle
                  containerStyle={{
                    width: '33.3%',
                    marginBottom: scale(20),
                  }}
                  titleContainerStyle={{
                    marginTop: scale(5),
                    aspectRatio: 3,
                  }}
                  imageContainerStyle={{
                    width: logo == 'gdcz' ? '50%' : '90%',
                    alignSelf: 'center',
                  }}
                  titleStyle={{ fontSize: scale(20), fontWeight: '300' }}
                  subTitleStyle={{ fontSize: scale(19) }}
                  onPress={() => {
                    if (gameType == 'more') {
                      navigate(PageName.LHTPreferencePage, {
                        initPreferences: preferenceGames,
                        onPressConfirm: (preferences: any) => {
                          setPreferenceGames(preferences)
                        },
                      })
                    } else if (gameType == 'clzx') {
                      goToUserCenterType.长龙助手()
                    } else if (gameType == 'lmzs') {
                      goToUserCenterType.开奖网()
                    } else {
                      PushHelper.pushLottery(gameId)
                    }
                  }}
                />
              )
            }}
            renderRightGame={({ item, index }) => {
              const { logo, icon, title, hotIcon, tipFlag, gameId, subId, name } = item
              const showFlag = stringToNumber(tipFlag)
              return (
                <GameButton
                  key={index}
                  circleColor={'#b3cde6'}
                  showRightTopFlag={showFlag > 0 && showFlag < 4}
                  showCenterFlag={showFlag == 4}
                  showSecondLevelIcon={false}
                  flagIcon={hotIcon}
                  logo={icon || logo}
                  title={title || name}
                  showSubTitle={false}
                  containerStyle={{
                    width: '33.3%',
                    height: scale(180),
                    marginBottom: scale(20),
                  }}
                  titleContainerStyle={{
                    marginTop: scale(5),
                    aspectRatio: 3,
                  }}
                  flagContainer={{
                    right: scale(15),
                    top: scale(-5),
                  }}
                  titleStyle={{ fontSize: scale(23) }}
                  subTitleStyle={{ fontSize: scale(23) }}
                  onPress={() => {
                    if (!gameId) {
                      navigate(PageName.SeriesLobbyPage, { subId, name, headerColor: LHThemeColor.六合厅.themeColor })
                    } else {
                      PushHelper.pushHomeGame(item)
                    }
                  }}
                />
              )
            }}
          />
        </View>
      )}
      renderListFooterBottomComponent={() => (
        <BottomToolBlock
          tools={config?.bottomTools}
          renderBottomTool={(item, index) => {
            const { logo, userCenterType } = item
            return (
              <TouchableImage
                key={index}
                containerStyle={{
                  width: '32%',
                  aspectRatio: 165 / 85,
                  flex: null,
                }}
                pic={logo}
                onPress={() => {
                  if (userCenterType) {
                    PushHelper.pushUserCenterType(userCenterType)
                  } else {
                    PushHelper.openWebView(appDownloadUrl)
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
    backgroundColor: LHThemeColor.六合厅.homeContentSubColor,
  },
  contentContainer: {
    paddingHorizontal: scale(10),
  },
  subComponent: {
    marginBottom: scale(10),
  },
})

const noticeBlockStyles = StyleSheet.create({
  containerStyle: {
    borderRadius: scale(100),
    marginVertical: scale(10),
    marginHorizontal: scale(10),
  },
  iconContainerStyle: {
    width: scale(20),
    marginHorizontal: scale(15),
  },
})

const couponBlockStyles = StyleSheet.create({
  containerStyle: {
    marginBottom: scale(10),
  },
  listContainerStyle: {
    borderRadius: scale(15),
    marginHorizontal: scale(10),
  },
})

const animatedRankComponentStyles = StyleSheet.create({
  containerStyle: {
    marginVertical: scale(10),
    marginHorizontal: scale(10),
  },
  iconTitleContainerStyle: {
    paddingLeft: 0,
    paddingVertical: 0,
    marginBottom: scale(10),
  },
})

const bottomLogoStyles = StyleSheet.create({
  containerStyle: { marginBottom: scale(30) },
})

export default LHTHomePage
