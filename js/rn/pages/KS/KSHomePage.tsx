import React from 'react'
import { ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import RandomTextComponent from '../../public/components/tars/RandomTextComponent'
import ReLoadBalanceComponent from '../../public/components/tars/ReLoadBalanceComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { PageName } from '../../public/navigation/Navigation'
import { navigate } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { KSThemeColor } from '../../public/theme/colors/KSThemeColor'
import { scale } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import Activitys from '../../public/views/tars/Activitys'
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
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import CoverButton from './views/CoverButton'
import HomeHeader from './views/HomeHeader'
import MoreGameButton from './views/MoreGameButton'

const buttonHeight = scale(82)
const { getHtml5Image } = useHtml5Image()

const KSHomePage = () => {
  const { goTo, refresh, value, sign } = useHomePage({})

  const { goToJDPromotionListPage } = goTo
  const { loading, refreshing, userInfo, sysInfo, homeInfo } = value

  const { bannersInterval, onlineNum, banners, notices, announcements, homeGames, coupons, rankLists, floatAds, redBag, redBagLogo, roulette } = homeInfo
  const { uid, usr, balance, isTest, curLevelTitle, unreadMsg } = userInfo
  const { mobile_logo, webName, showCoupon, rankingListType, currency, balanceDecimal } = sysInfo

  const lotterys = homeGames[0]?.list ?? []
  const smallLotterys = lotterys?.slice(4, 8) ?? []
  const moreGames = lotterys?.slice(8, lotterys?.length) ?? []
  const { tryPlay } = sign

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
            {uid ? (
              <LinearGradient
                colors={['#eb5d4d', '#fb2464']}
                style={{ flex: 1, borderRadius: scale(5), marginHorizontal: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: scale(35) }}>
                <View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                  <FastImage source={{ uri: getHtml5Image(22, 'touxiang') }} style={{ height: '50%', aspectRatio: 1 }} />
                  <View style={{ marginLeft: scale(20), height: '100%' }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', marginBottom: scale(1) }}>
                      <Text style={{ color: '#ffffff', fontWeight: '600' }}>{usr}</Text>
                      <LinearBadge
                        title={curLevelTitle}
                        colors={['#ffffff', '#ffffff']}
                        textStyle={{ color: '#f83060', padding: scale(3), fontSize: scale(18) }}
                        containerStyle={{ borderRadius: scale(5), width: null, marginLeft: scale(5), height: null, aspectRatio: null }}
                        showIcon={false}
                      />
                    </View>
                    <View style={{ flexDirection: 'row', flex: 1, marginTop: scale(1) }}>
                      <ReLoadBalanceComponent
                        title={'总金额¥ '}
                        titleStyle={{ color: '#ffffff', fontSize: scale(20), fontWeight: '500' }}
                        balance={balance}
                        balanceStyle={{ color: '#ffffff', fontSize: scale(20), fontWeight: '500' }}
                        color={'#ffffff'}
                        size={20}
                        currency={currency}
                        balanceDecimal={balanceDecimal}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ aspectRatio: 1, height: '50%' }}>
                  <FastImage source={{ uri: getHtml5Image(22, 'xiaoxi') }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'} />
                  <View
                    style={{
                      width: scale(30),
                      aspectRatio: 1,
                      borderRadius: scale(30),
                      position: 'absolute',
                      backgroundColor: '#ffffff',
                      right: -scale(10),
                      top: -scale(10),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{ fontSize: scale(20), color: '#fe3333' }}>{unreadMsg > 99 ? 99 : unreadMsg}</Text>
                  </View>
                </View>
              </LinearGradient>
            ) : (
              <>
                <LinearBadge
                  colors={['#3a3a41', '#3a3a41']}
                  containerStyle={[styles.toolButton, { marginLeft: '1%' }]}
                  title={'登录'}
                  textStyle={{ color: '#ffffff', fontSize: scale(22) }}
                  showIcon={false}
                  onPress={() => {
                    navigate(PageName.KSSignInPage)
                  }}
                />
                <LinearBadge
                  colors={['#eb5d4d', '#fb7a24']}
                  containerStyle={styles.toolButton}
                  title={'注册'}
                  textStyle={{ color: '#ffffff', fontSize: scale(22) }}
                  showIcon={false}
                  onPress={() => {
                    navigate(PageName.KSSignUpPage)
                  }}
                />
                <LinearBadge
                  colors={['#eb5d4d', '#fb2464']}
                  containerStyle={[styles.toolButton, { marginRight: '1%' }]}
                  title={'试玩'}
                  textStyle={{ color: '#ffffff', fontSize: scale(22) }}
                  showIcon={false}
                  onPress={tryPlay}
                />
              </>
            )}
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
              onPress={() => PushHelper.pushUserCenterType(UGUserCenterType.存款)}
            />
            <LinearBadge
              colors={['#3a3a41', '#3a3a41']}
              containerStyle={styles.toolButton}
              title={'额度转换'}
              textStyle={{ color: '#ffffff', fontSize: scale(20) }}
              showIcon={false}
              showLogo={true}
              logo={getHtml5Image(22, 'xima')}
              onPress={() => PushHelper.pushUserCenterType(UGUserCenterType.额度转换)}
            />
            <LinearBadge
              colors={['#3a3a41', '#3a3a41']}
              containerStyle={[styles.toolButton, { marginRight: '1%' }]}
              title={'取款'}
              textStyle={{ color: '#ffffff', fontSize: scale(20) }}
              showIcon={false}
              showLogo={true}
              logo={getHtml5Image(22, 'withdrawlogo')}
              onPress={() => PushHelper.pushUserCenterType(UGUserCenterType.取款)}
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
                onPress={() => PushHelper.pushUserCenterType(UGUserCenterType.利息宝)}
              />
              <LinearBadge
                colors={['#3a3a41', '#3a3a41']}
                containerStyle={[styles.toolButton, { marginHorizontal: null, width: '100%', height: scale(76) }]}
                title={'游戏大厅'}
                textStyle={{ color: '#ffffff', fontSize: scale(20) }}
                showIcon={false}
                showLogo={true}
                logo={getHtml5Image(22, 'yxdt')}
                onPress={() => PushHelper.pushUserCenterType(UGUserCenterType.彩票大厅)}
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
              logo={lotterys[0]?.logo || lotterys[0]?.icon}
              title={lotterys[0]?.name || lotterys[0]?.title}
              containerStyle={{ marginLeft: '1%', width: '60%', marginRight: '0.5%', height: '100%', backgroundColor: '#3a3a41', borderRadius: scale(5) }}
              titleStyle={{ fontSize: scale(25) }}
              onPress={() => PushHelper.pushHomeGame(lotterys[0])}
            />
            <View style={{ alignItems: 'center', marginRight: '1%', marginLeft: '0.5%', width: '37%', justifyContent: 'space-between' }}>
              <CoverButton
                logo={lotterys[1]?.logo || lotterys[1]?.icon}
                title={lotterys[1]?.name || lotterys[1]?.title}
                containerStyle={{ width: '100%', height: scale(102), backgroundColor: '#3a3a41', borderRadius: scale(5) }}
                titleStyle={{ fontSize: scale(25) }}
                onPress={() => PushHelper.pushHomeGame(lotterys[1])}
              />
              <CoverButton
                logo={lotterys[2]?.logo || lotterys[2]?.icon}
                title={lotterys[2]?.name || lotterys[2]?.title}
                containerStyle={{ width: '100%', height: scale(102), backgroundColor: '#3a3a41', borderRadius: scale(5) }}
                titleStyle={{ fontSize: scale(25) }}
                onPress={() => PushHelper.pushHomeGame(lotterys[2])}
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
                      <RandomTextComponent style={{ color: '#ffb029', fontSize: scale(25) }} />
                    </View>
                  </View>
                </ImageBackground>
              </View>
              <View style={{ flex: 1.5, flexDirection: 'row' }}>
                {smallLotterys?.map((item, index) => {
                  const { logo, name, icon, title } = item
                  return (
                    <GameButton
                      key={index}
                      containerStyle={{ width: '25%', height: '100%', marginTop: scale(5) }}
                      imageContainerStyle={{ width: '70%', aspectRatio: 1 }}
                      titleStyle={{ color: '#97989d' }}
                      enableCircle={false}
                      logo={logo || icon}
                      title={name || title}
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
              logo={lotterys[3]?.logo || lotterys[3]?.icon}
              title={lotterys[3]?.name || lotterys[3]?.title}
              containerStyle={{ marginRight: '1%', marginLeft: '0.5%', width: '20%', height: '100%', backgroundColor: '#3a3a41', borderRadius: scale(5) }}
              titleStyle={{ fontSize: scale(25) }}
              onPress={() => PushHelper.pushHomeGame(lotterys[3])}
            />
          </View>
          <View style={[styles.toolBlock, { backgroundColor: '#3a3a41', marginHorizontal: '1%', borderRadius: scale(5), flexDirection: 'column', width: null, height: null, alignItems: 'center' }]}>
            <View style={{ width: '90%' }}>
              <Text style={{ color: '#ffffff', fontSize: scale(22), marginVertical: scale(20), fontWeight: '500' }}>{'更多游戏'}</Text>
            </View>
            {moreGames?.map((item, index) => {
              const { name, logo, title, icon } = item
              return (
                <MoreGameButton
                  key={index}
                  title={name || title}
                  logo={logo || icon}
                  onPress={() => {
                    PushHelper.pushHomeGame(item)
                  }}
                />
              )
            })}
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
        <Activitys uid={uid} isTest={isTest} refreshing={refreshing} redBagLogo={redBagLogo} redBag={redBag} roulette={roulette} floatAds={floatAds} />
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
    borderRadius: scale(5),
    height: '100%',
    marginHorizontal: '0.5%',
  },
})

export default KSHomePage
