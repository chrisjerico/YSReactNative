import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale } from '../../public/tools/Scale'
import { stringToNumber, useHtml5Image } from '../../public/tools/tars'
import GameButton from '../../public/views/tars/GameButton'
import HomePage from '../../public/views/tars/HomePage'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import TouchableImage from '../../public/views/tars/TouchableImage'
import { LotteryType } from '../../redux/model/全局/UGLotteryModel'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import HomeGameComponent from './components/HomeGameComponent'
import config from './config'
import BottomToolBlock from './views/BottomToolBlock'
import HomeHeader from './views/HomeHeader'
import LotteryBall from './views/LotteryBall'
import NavBlock from './views/NavBlock'

const LHTHomePage = () => {
  // states
  const [preferenceGames, setPreferenceGames] = useState(config?.preferences)
  // functions
  const { getHtml5Image } = useHtml5Image()

  const { goTo, value, sign, refresh } = useHomePage({})

  const { signOut, tryPlay } = sign
  const { goToJDPromotionListPage } = goTo

  const { loading, refreshing, userInfo, homeInfo, sysInfo } = value

  const { lotteryDate, lotterys, notices, navs, homeGames } = homeInfo
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
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      pagekey={'LHTHomePage'}
      themeColor={LHThemeColor.六合厅.themeColor}
      couponBlockStyles={couponBlockStyles}
      animatedRankComponentStyles={animatedRankComponentStyles}
      bottomLogoStyles={bottomLogoStyles}
      renderHeader={() => (
        <HomeHeader
          avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}
          name={usr}
          showLogout={uid ? true : false}
          leftLogo={mobile_logo}
          rightLogo={getHtml5Image(14, 'top_yhhd')}
          onPressSignOut={signOut}
          onPressSignIn={() => push(PageName.LHTSignInPage)}
          onPressSignUp={() => push(PageName.LHTSignUpPage)}
          onPressTryPlay={tryPlay}
          onPressLogo={goToJDPromotionListPage}
        />
      )}
      renderListHeaderComponent={() => (
        <View style={styles.contentContainer}>
          <NoticeBlock
            containerStyle={[styles.subComponent, { borderRadius: scale(100) }]}
            iconContainerStyle={{
              width: scale(20),
              marginHorizontal: scale(15),
            }}
            notices={notices}
            logo={getHtml5Image(14, 'notice')}
            onPressNotice={({ content }) => {
              PushHelper.pushNoticePopUp(content)
            }}
          />
          <NavBlock
            containerStyle={[styles.subComponent, { borderRadius: scale(20) }]}
            navs={navs}
            lotterys={plusLotterys}
            date={lotteryDate}
            advertisement={getHtml5Image(14, 'banner', 'gif')}
            lotteryLogo={getHtml5Image(14, 'tjzx')}
            balanceLogo={getHtml5Image(14, 'yue')}
            balance={balance}
            currency={currency}
            showK={currency == 'VND' ? true : false}
            balanceDecimal={balanceDecimal}
            customerServiceLogo={getHtml5Image(14, 'zxkf')}
            onPressSavePoint={() => PushHelper.pushUserCenterType(UGUserCenterType.存款)}
            onPressGetPoint={() => PushHelper.pushUserCenterType(UGUserCenterType.取款)}
            onPressAd={() => PushHelper.pushLottery(LotteryType.新加坡六合彩)}
            onPressSmileLogo={() => PushHelper.pushUserCenterType(UGUserCenterType.在线客服)}
            renderNav={(item, index) => {
              const { icon, name, logo, gameId } = item
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
                    if (gameId == 9) {
                      goToJDPromotionListPage()
                    } else {
                      PushHelper.pushHomeGame(item)
                    }
                  }}
                />
              )
            }}
            renderLottery={(item, index) => {
              const { number, color, sx, showMore } = item
              return <LotteryBall key={index} score={number} color={color} text={sx} showMore={showMore} onPress={() => PushHelper.pushUserCenterType(UGUserCenterType.彩票大厅)} />
            }}
          />
          <HomeGameComponent
            itemHeight={scale(200)}
            leftIcon={getHtml5Image(14, 'hot_icon')}
            rightIcon={getHtml5Image(14, 'cai_icon')}
            activeTabColor={'#ff6b1b'}
            unActiveTabColor={'#bbbbbb'}
            containerStyle={styles.subComponent}
            leftGames={chooseGames}
            rightGames={homeGames}
            renderLeftGame={({ item, index }) => {
              const { title, logo, des, gameType, selected, gameId } = item
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
                      PushHelper.pushUserCenterType(UGUserCenterType.长龙助手)
                    } else if (gameType == 'lmzs') {
                      PushHelper.pushUserCenterType(UGUserCenterType.开奖网)
                    } else {
                      PushHelper.pushLottery(gameId)
                    }
                  }}
                />
              )
            }}
            renderRightGame={({ item, index }) => {
              const { logo, icon, title, hotIcon, tipFlag } = item
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
                  title={title}
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
                  onPress={() => PushHelper.pushHomeGame(item)}
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
    paddingTop: scale(10),
  },
  subComponent: {
    marginBottom: scale(10),
  },
})

const couponBlockStyles = StyleSheet.create({
  containerStyle: styles.subComponent,
  listContainerStyle: { borderRadius: scale(15) },
})

const animatedRankComponentStyles = StyleSheet.create({
  containerStyle: { marginVertical: scale(10) },
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
