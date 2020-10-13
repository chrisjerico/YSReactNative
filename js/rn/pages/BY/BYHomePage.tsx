import React from 'react'
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

const BYHomePage = () => {
  const { goTo, refresh, value } = useHomePage({})
  const { goToJDPromotionListPage } = goTo
  const { loading, refreshing, userInfo, sysInfo, homeInfo } = value

  const { bannersInterval, onlineNum, banners, notices, midBanners, announcements, navs, homeGames, gameLobby, coupons, rankLists, floatAds, redBag, redBagLogo, roulette } = homeInfo
  const { uid, usr, balance, isTest } = userInfo
  const { mobile_logo, webName, showCoupon, rankingListType, midBannerTimer } = sysInfo

  const recommendGameTabs = gameLobby?.map((item) => item?.categoryName) ?? []

  return (
    <HomePage
      {...homeInfo}
      {...userInfo}
      {...sysInfo}
      pagekey={'BYHomePage'}
      themeColor={'#ffffff'}
      loading={loading}
      refreshing={refreshing}
      refresh={refresh}
      items={homeGames}
      renderItem={() => null}
      ListHeaderComponent={null}
      ListFooterComponent={null}
    />
  )
}

export default BYHomePage
