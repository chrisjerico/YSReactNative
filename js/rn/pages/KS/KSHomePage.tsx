import React from 'react'
import { ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import RandomText from '../../public/components/tars/RandomText'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { httpClient } from '../../public/network/httpClient'
import { KSThemeColor } from '../../public/theme/colors/KSThemeColor'
import { scale } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import BottomLogo from '../../public/views/tars/BottomLogo'
import CouponBlock from '../../public/views/tars/CouponBlock'
import GameButton from '../../public/views/tars/GameButton'
import LinearBadge from '../../public/views/tars/LinearBadge'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import CoverButton from './views/CoverButton'
import HomeHeader from './views/HomeHeader'

const buttonHeight = scale(82)

const KSHomePage = () => {
  const { getHtml5Image } = useHtml5Image()
  const { goTo, refresh, value } = useHomePage({})
  const { goToJDPromotionListPage } = goTo
  const {
    loading,
    refreshing,
    userInfo,
    sys,
    bannersInterval,
    onlineNum,
    banners,
    notices,
    midBanners,
    announcements,
    navs,
    homeGames,
    gameLobby,
    coupons,
    rankLists,
    floatAds,
    redBag,
    redBagLogo,
    roulette,
  } = value

  const { uid, usr, balance, isTest } = userInfo
  const { mobile_logo, webName, showCoupon, rankingListType, midBannerTimer } = sys

  const lotterys = homeGames[0]?.list
  const smallLotterys = lotterys?.slice(4, 8) ?? []
  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={KSThemeColor.凯时.themeColor} />
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={KSThemeColor.凯时.themeColor}></SafeAreaHeader>
        <ScrollView
          style={{ backgroundColor: KSThemeColor.凯时.themeColor }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              tintColor={'#ffffff'}
              refreshing={refreshing}
              onRefresh={async () => {
                try {
                  await refresh()
                  PushHelper.pushAnnouncement(announcements)
                } catch (error) {
                  console.log('-------error------', error)
                }
              }}
            />
          }>
          <NoticeBlock
            containerStyle={{ backgroundColor: KSThemeColor.凯时.themeColor, borderRadius: 0 }}
            bgContainerStyle={{ backgroundColor: KSThemeColor.凯时.themeColor }}
            logoTextStyle={{
              color: '#95979f',
              fontSize: scale(20),
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
          <HomeHeader logo={mobile_logo} />
          <View style={[styles.toolBlock, { marginTop: scale(5) }]}>
            <LinearBadge
              colors={['#3a3a41', '#3a3a41']}
              containerStyle={[styles.toolButton, { marginLeft: '1%' }]}
              title={'登录'}
              textStyle={{ color: '#ffffff', fontSize: scale(22) }}
              showIcon={false}
            />
            <LinearBadge colors={['#eb5d4d', '#fb7a24']} containerStyle={styles.toolButton} title={'注册'} textStyle={{ color: '#ffffff', fontSize: scale(22) }} showIcon={false} />
            <LinearBadge
              colors={['#eb5d4d', '#fb2464']}
              containerStyle={[styles.toolButton, { marginRight: '1%' }]}
              title={'试玩'}
              textStyle={{ color: '#ffffff', fontSize: scale(22) }}
              showIcon={false}
            />
          </View>
          <View style={styles.toolBlock}>
            <LinearBadge
              colors={['#eb5d4d', '#fb7a24']}
              containerStyle={[styles.toolButton, { marginLeft: '1%' }]}
              title={'存款'}
              textStyle={{ color: '#ffffff', fontSize: scale(20) }}
              showIcon={false}
              showLogo={true}
              logo={getHtml5Image(22, 'depositlogo')}
            />
            <LinearBadge
              colors={['#3a3a41', '#3a3a41']}
              containerStyle={styles.toolButton}
              title={'额度转换'}
              textStyle={{ color: '#ffffff', fontSize: scale(20) }}
              showIcon={false}
              showLogo={true}
              logo={getHtml5Image(22, 'xima')}
            />
            <LinearBadge
              colors={['#3a3a41', '#3a3a41']}
              containerStyle={[styles.toolButton, { marginRight: '1%' }]}
              title={'存款'}
              textStyle={{ color: '#ffffff', fontSize: scale(20) }}
              showIcon={false}
              showLogo={true}
              logo={getHtml5Image(22, 'withdrawlogo')}
            />
          </View>
          <View style={[styles.toolBlock, { height: scale(158) }]}>
            <View style={{ alignItems: 'center', marginLeft: '1%', marginRight: '0.5%', width: '32%', justifyContent: 'space-between' }}>
              <LinearBadge
                colors={['#3a3a41', '#3a3a41']}
                containerStyle={[styles.toolButton, { marginHorizontal: null, width: '100%', height: scale(76) }]}
                title={'利息宝'}
                textStyle={{ color: '#ffffff', fontSize: scale(20) }}
                showIcon={false}
                showLogo={true}
                logo={getHtml5Image(22, 'lxb')}
              />
              <LinearBadge
                colors={['#3a3a41', '#3a3a41']}
                containerStyle={[styles.toolButton, { marginHorizontal: null, width: '100%', height: scale(76) }]}
                title={'游戏大厅'}
                textStyle={{ color: '#ffffff', fontSize: scale(20) }}
                showIcon={false}
                showLogo={true}
                logo={getHtml5Image(22, 'yxdt')}
              />
            </View>
            <BannerBlock
              containerStyle={{ marginLeft: '0.5%', width: '65%', marginRight: '1%', aspectRatio: null, height: '100%' }}
              autoplayTimeout={bannersInterval}
              badgeStyle={{ top: -scale(150) }}
              onlineNum={onlineNum}
              showOnlineNum={true}
              banners={banners}
              renderBanner={(item, index) => {
                const { linkCategory, linkPosition, pic } = item
                return (
                  <TouchableImage
                    key={index}
                    pic={pic}
                    containerStyle={{ width: '100%', height: '100%' }}
                    resizeMode={'stretch'}
                    onPress={() => {
                      PushHelper.pushCategory(linkCategory, linkPosition)
                    }}
                  />
                )
              }}
            />
          </View>
          <View style={[styles.toolBlock, { height: scale(212) }]}>
            <CoverButton
              logo={lotterys[0]?.logo}
              title={lotterys[0]?.name}
              containerStyle={{ marginLeft: '1%', width: '60%', marginRight: '0.5%', height: '100%', backgroundColor: '#3a3a41', borderRadius: scale(5) }}
              titleStyle={{ fontSize: scale(25) }}
            />
            <View style={{ alignItems: 'center', marginRight: '1%', marginLeft: '0.5%', width: '37%', justifyContent: 'space-between' }}>
              <CoverButton
                logo={lotterys[1]?.logo}
                title={lotterys[1]?.name}
                containerStyle={{ width: '100%', height: scale(102), backgroundColor: '#3a3a41', borderRadius: scale(5) }}
                titleStyle={{ fontSize: scale(25) }}
              />

              <CoverButton
                logo={lotterys[2]?.logo}
                title={lotterys[2]?.name}
                containerStyle={{ width: '100%', height: scale(102), backgroundColor: '#3a3a41', borderRadius: scale(5) }}
                titleStyle={{ fontSize: scale(25) }}
              />
            </View>
          </View>
          <View style={[styles.toolBlock, { height: scale(205) }]}>
            <View style={{ marginLeft: '1%', width: '77%', marginRight: '0.5%', height: '100%', backgroundColor: '#3a3a41', borderRadius: scale(5) }}>
              <View style={{ flex: 1 }}>
                <ImageBackground source={{ uri: 'https://a06frontweb.cathayfund.com/cdn/A06FM/img/pmd.57681c5.gif' }} style={{ width: '100%', height: '100%' }} resizeMode={'stretch'}>
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ fontSize: scale(15), color: '#ffffff', marginBottom: scale(5) }}>{'电子游戏'}</Text>
                      <Text style={{ fontSize: scale(15), color: '#ffffff', marginTop: scale(5) }}>{'总奖金池'}</Text>
                    </View>
                    <View style={{ flex: 7, justifyContent: 'center', alignItems: 'flex-start' }}>
                      <RandomText style={{ color: '#ffb029', fontSize: scale(25) }} />
                    </View>
                  </View>
                </ImageBackground>
              </View>
              <View style={{ flex: 1.5, flexDirection: 'row' }}>
                {smallLotterys?.map((item) => {
                  const { logo, name } = item
                  return (
                    <GameButton
                      containerStyle={{ width: '25%', height: '100%', marginTop: scale(5) }}
                      imageContainerStyle={{ width: '70%', aspectRatio: 1 }}
                      titleStyle={{ color: '#97989d' }}
                      enableCircle={false}
                      logo={logo}
                      title={name}
                      showSecondLevelIcon={false}
                      showSubTitle={false}
                      showUnReadMsg={false}
                      showCenterFlag={false}
                      showRightTopFlag={false}
                    />
                  )
                })}
              </View>
            </View>
            <CoverButton
              logo={lotterys[3]?.logo}
              title={lotterys[3]?.name}
              containerStyle={{ marginRight: '1%', marginLeft: '0.5%', width: '20%', height: '100%', backgroundColor: '#3a3a41', borderRadius: scale(5) }}
              titleStyle={{ fontSize: scale(25) }}
            />
          </View>
          <CouponBlock
            visible={showCoupon}
            onPressMore={goToJDPromotionListPage}
            containerStyle={{
              marginHorizontal: '1%',
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
            containerStyle={{ marginTop: scale(10), backgroundColor: '#3a3a41', marginHorizontal: '1%', borderRadius: scale(10) }}
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
        </ScrollView>
        <ActivityComponent
          refreshing={refreshing}
          containerStyle={{ top: scale(250), right: 0 }}
          show={uid && redBagLogo && !isTest}
          logo={redBagLogo}
          onPress={() => {
            PushHelper.pushRedBag(redBag)
          }}
        />
        <ActivityComponent
          refreshing={refreshing}
          containerStyle={{ top: scale(400), right: 0 }}
          enableFastImage={false}
          show={uid && roulette && !isTest}
          logo={'dzp_btn'}
          onPress={() => {
            PushHelper.pushWheel(roulette)
          }}
        />
        {floatAds?.map((item: any, index) => {
          const { image, position, linkCategory, linkPosition } = item
          return (
            <ActivityComponent
              key={index}
              refreshing={refreshing}
              containerStyle={getActivityPosition(position)}
              enableFastImage={true}
              show={uid && !isTest}
              logo={image}
              onPress={() => {
                PushHelper.pushCategory(linkCategory, linkPosition)
              }}
            />
          )
        })}
      </>
    )
  }
}

const styles = StyleSheet.create({
  toolBlock: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: scale(8),
    height: buttonHeight,
  },
  toolButton: {
    width: '32%',
    backgroundColor: '#3a3a41',
    borderRadius: scale(5),
    height: '100%',
    marginHorizontal: '0.5%',
  },
})

export default KSHomePage
