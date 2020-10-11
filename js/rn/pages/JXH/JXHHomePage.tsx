import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import TabComponent from '../../public/components/tars/TabComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { httpClient } from '../../public/network/httpClient'
import { KSThemeColor } from '../../public/theme/colors/KSThemeColor'
import { scale } from '../../public/tools/Scale'
import Activitys from '../../public/views/tars/Activitys'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import BottomLogo from '../../public/views/tars/BottomLogo'
import CouponBlock from '../../public/views/tars/CouponBlock'
import List from '../../public/views/tars/List'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import ProfileBlock from './views/ProfileBlock'

const JXHHomePage = () => {
  const { goTo, refresh, value, sign } = useHomePage({})

  const { goToJDPromotionListPage } = goTo
  const { loading, refreshing, userInfo, sysInfo, homeInfo } = value

  const { bannersInterval, onlineNum, banners, notices, announcements, homeGames, coupons, rankLists, floatAds, redBag, redBagLogo, roulette } = homeInfo
  const { uid, usr, balance, isTest, curLevelTitle, unreadMsg, avatar } = userInfo
  const { mobile_logo, webName, showCoupon, rankingListType } = sysInfo

  const lotterys = homeGames[0]?.list ?? []
  const smallLotterys = lotterys?.slice(4, 8) ?? []
  const moreGames = lotterys?.slice(8, lotterys?.length) ?? []
  const { tryPlay } = sign

  const renderGame = useCallback(({ item }) => {
    const { logo, icon } = item
    return (
      <TouchableImage
        pic={icon || logo}
        onPress={() => {
          PushHelper.pushHomeGame(item)
        }}
        containerStyle={{ width: '50%', height: scale(180), marginVertical: scale(10), flex: null }}
        resizeMode={'contain'}
      />
    )
  }, [])

  const renderScene = useCallback(({ item }) => {
    return <List uniqueKey={'JXHHomePageTabScene'} style={{}} data={item} renderItem={renderGame} numColumns={2} />
  }, [])

  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={'#000000'} />
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={'#000000'} />
        <List
          uniqueKey={'JXHHomePage'}
          data={[]}
          style={styles.container}
          scrollEnabled
          removeClippedSubviews
          refreshing={refreshing}
          onRefresh={async () => {
            try {
              await refresh()
              PushHelper.pushAnnouncement(announcements)
            } catch (error) {}
          }}
          renderItem={() => null}
          ListHeaderComponent={
            <>
              <BannerBlock
                containerStyle={{ aspectRatio: 540 / 218 }}
                badgeStyle={{ top: scale(-210) }}
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
                containerStyle={{ backgroundColor: KSThemeColor.凯时.themeColor, borderRadius: 0 }}
                bgContainerStyle={{ backgroundColor: KSThemeColor.凯时.themeColor }}
                logoTextStyle={{
                  color: '#95979f',
                  fontSize: scale(18),
                  paddingHorizontal: scale(5),
                }}
                textStyle={{
                  color: '#95979f',
                  fontSize: scale(18),
                }}
                notices={notices}
                onPressNotice={({ content }) => {
                  PushHelper.pushNoticePopUp(content)
                }}
              />
              <ProfileBlock {...(userInfo as any)} onPressTryPlay={tryPlay} />
              <TabComponent
                tabBarBackgroundColor={'#000000'}
                tabTextColor={'#ffffff'}
                numColumns={2}
                initialTabIndex={0}
                focusTabColor={'#cfa461'}
                tabGames={homeGames}
                itemHeight={scale(200)}
                renderScene={renderScene}
              />
              <CouponBlock
                visible={showCoupon}
                onPressMore={goToJDPromotionListPage}
                containerStyle={{
                  marginTop: scale(10),
                  width: null,
                }}
                titleContainerStyle={{ backgroundColor: '#3a3a41', borderTopLeftRadius: scale(10), borderTopRightRadius: scale(10) }}
                listContainerStyle={{ backgroundColor: '#3a3a41', borderBottomLeftRadius: scale(10), borderBottomRightRadius: scale(10) }}
                titleStyle={{ color: '#ffffff' }}
                coupons={coupons}
                renderCoupon={({ item, index }) => {
                  const { pic, linkCategory, linkPosition, title, content, linkUrl } = item
                  return (
                    <AutoHeightCouponComponent
                      titleStyle={{ alignSelf: 'center', color: '#ffffff' }}
                      containerStyle={{
                        borderColor: '#d9d9d9',
                        borderWidth: scale(1),
                        marginBottom: scale(20),
                        padding: scale(5),
                        borderRadius: scale(5),
                        paddingBottom: scale(20),
                      }}
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
                iconColor={'#ffffff'}
                iconTitleStyle={{ color: '#ffffff' }}
                containerStyle={{ marginTop: scale(10), backgroundColor: '#3a3a41', borderRadius: scale(10) }}
                contentTitleStyle={{ color: '#ffffff' }}
                iconTitleContainerStyle={{
                  backgroundColor: '#3a3a41',
                  borderTopLeftRadius: scale(10),
                  borderTopRightRadius: scale(10),
                }}
                contentContainerStyle={{
                  width: '95%',
                  alignSelf: 'center',
                  marginBottom: scale(20),
                  backgroundColor: '#3a3a41',
                }}
                rankLists={rankLists}
              />
              <BottomLogo
                webName={webName}
                containerStyle={{ marginBottom: scale(5) }}
                titleStyle={{ color: '#ffffff' }}
                subTitleStyle={{ color: '#97989d' }}
                onPressComputer={() => {
                  PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
                }}
                onPressPromotion={goToJDPromotionListPage}
                debug={false}
              />
              <BottomGap />
            </>
          }
        />
        <Activitys uid={uid} isTest={isTest} refreshing={refreshing} redBagLogo={redBagLogo} redBag={redBag} roulette={roulette} floatAds={floatAds} />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    paddingHorizontal: '1%',
  },
})

export default JXHHomePage
