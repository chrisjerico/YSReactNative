import React, { useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import GameSubTypeComponent from '../../public/components/tars/GameSubTypeComponent'
import MenuModalComponent from '../../public/components/tars/MenuModalComponent'
import TabComponent from '../../public/components/tars/TabComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { PageName } from '../../public/navigation/Navigation'
import { push } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import Activitys from '../../public/views/tars/Activitys'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import BottomLogo from '../../public/views/tars/BottomLogo'
import Button from '../../public/views/tars/Button'
import CouponBlock from '../../public/views/tars/CouponBlock'
import GameButton from '../../public/views/tars/GameButton'
import HomePage from '../../public/views/tars/HomePage'
import List from '../../public/views/tars/List'
import NavBlock from '../../public/views/tars/NavBlock'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import Menu from './views/Menu'
import config from './config'
import HomeHeader from './views/HomeHeader'
import FastImage from 'react-native-fast-image'
import AppDefine from '../../public/define/AppDefine'
import GameRowButton from './views/GameRowButton'

const onPressSignIn = () => push(PageName.BYSignInPage)
const onPressSignUp = () => push(PageName.BYSignUpPage)

const BYHomePage = () => {
  const menu = useRef(null)

  const { goTo, refresh, value, sign } = useHomePage({
    onSuccessSignOut: () => {
      menu?.current?.close()
    },
  })
  const { goToJDPromotionListPage } = goTo
  const { loading, refreshing, userInfo, sysInfo, homeInfo } = value

  const { bannersInterval, onlineNum, banners, notices, midBanners, announcements, navs, homeGames, gameLobby, coupons, rankLists, floatAds, redBag, redBagLogo, roulette } = homeInfo
  const { uid, usr, balance, isTest } = userInfo
  const { mobile_logo, webName, showCoupon, rankingListType, midBannerTimer, balanceDecimal } = sysInfo

  const { signOut, tryPlay } = sign

  const recommendGameTabs = gameLobby?.map((item) => item?.categoryName) ?? []

  console.log('-------homeGames-----', homeGames)

  const menus = config.menus.concat([
    {
      title: '退出登录',
      onPress: signOut,
    },
  ])

  return (
    <HomePage
      {...homeInfo}
      {...userInfo}
      {...sysInfo}
      {...goTo}
      pagekey={'BYHomePage'}
      themeColor={'#ffffff'}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      items={homeGames}
      renderHeader={() => <HomeHeader logo={mobile_logo} uid={uid} onPressSignIn={onPressSignIn} onPressSignUp={onPressSignUp} onPressTryPlay={tryPlay} onPressMenu={() => menu?.current?.open()} />}
      renderListHeaderComponent={() => (
        <>
          <List
            uniqueKey={'BYHomePage_Navs'}
            horizontal={true}
            scrollEnabled={true}
            data={homeGames}
            style={{ backgroundColor: '#ffffff', borderRadius: scale(10), marginHorizontal: '1%', marginTop: scale(10) }}
            renderItem={({ item }) => {
              const { logo, name } = item
              return (
                <GameButton
                  logo={logo}
                  title={name}
                  showSubTitle={false}
                  enableCircle={false}
                  titleContainerStyle={{ aspectRatio: 5 }}
                  containerStyle={{
                    marginBottom: scale(30),
                    marginTop: scale(10),
                  }}
                  onPress={() => {
                    PushHelper.pushHomeGame(item)
                  }}
                />
              )
            }}
          />
          <TabComponent
            numColumns={1}
            tabGames={homeGames}
            renderScene={({ item, index }) => <List uniqueKey={'BYHomePageTabComponent' + index} data={item} renderItem={({ item }) => <GameRowButton {...item} />} />}
            itemHeight={scale(150)}
            focusTabColor={'#387ef5'}
            containerStyle={{ backgroundColor: '#ffffff', marginHorizontal: '1%', marginTop: scale(10), borderRadius: scale(10) }}
          />
        </>
      )}
      renderItem={() => null}
      renderRestComponent={() => (
        <MenuModalComponent
          ref={menu}
          direction={'left'}
          listStyle={{ marginTop: 0, marginBottom: 0 }}
          renderMenu={() => <Menu menus={menus} balanceDecimal={balanceDecimal} balance={balance} usr={usr} uid={uid} />}
        />
      )}
    />
  )
}

export default BYHomePage
