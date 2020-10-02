import React from 'react'
import { ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import ActivityComponent from '../../public/components/tars/ActivityComponent'
import AnimatedRankComponent from '../../public/components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import RandomText from '../../public/components/tars/RandomText'
import ReLoadBalanceComponent from '../../public/components/tars/ReLoadBalanceComponent'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { PageName } from '../../public/navigation/Navigation'
import { navigate } from '../../public/navigation/RootNavigation'
import { httpClient } from '../../public/network/httpClient'
import { KSThemeColor } from '../../public/theme/colors/KSThemeColor'
import { scale } from '../../public/tools/Scale'
import { getActivityPosition, useHtml5Image } from '../../public/tools/tars'
import Avatar from '../../public/views/tars/Avatar'
import BannerBlock from '../../public/views/tars/BannerBlock'
import BottomGap from '../../public/views/tars/BottomGap'
import BottomLogo from '../../public/views/tars/BottomLogo'
import Button from '../../public/views/tars/Button'
import CouponBlock from '../../public/views/tars/CouponBlock'
import GameButton from '../../public/views/tars/GameButton'
import LinearBadge from '../../public/views/tars/LinearBadge'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'

const buttonHeight = scale(82)

const JXHHomePage = () => {
  const { getHtml5Image } = useHtml5Image()

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
        <ScrollView
          style={{ backgroundColor: '#000000', paddingHorizontal: scale(10) }}
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
          <BannerBlock
            containerStyle={{ aspectRatio: 540 / 130 }}
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
          <View style={{ width: '100%', aspectRatio: 2.3, backgroundColor: '#111111', borderRadius: scale(10), overflow: 'hidden' }}>
            <View style={{ flex: 1, backgroundColor: '#333333', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: scale(10) }}>
              {uid ? (
                <>
                  <View style={{ flexDirection: 'row' }}>
                    <Avatar size={30} uri={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar} />
                    <Text style={{ color: '#ffffff' }}>{'tars1987'}</Text>
                    <LinearBadge
                      title={'VIP0'}
                      colors={['#cfa461', '#cfa461']}
                      showIcon={false}
                      containerStyle={{ borderRadius: scale(5), width: null, height: scale(25), paddingHorizontal: scale(5) }}
                      textStyle={{ color: '#000000', fontSize: scale(15) }}
                    />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: '#ffffff' }}>{'优惠兑换'}</Text>
                  </View>
                </>
              ) : (
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Avatar size={30} uri={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar} />
                  <Text style={{ color: '#c7c7c7', fontSize: scale(25), marginLeft: scale(10) }}>{'尊敬的来宾，您好，请登录'}</Text>
                </View>
              )}
            </View>

            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <Button title={'登录'} containerStyle={[styles.signButton, { backgroundColor: '#cfa461' }]} titleStyle={{ color: '#ffffff', fontSize: scale(20) }} />
              <Button
                title={'注册'}
                containerStyle={[styles.signButton, { backgroundColor: '#000000', borderColor: '#cfa461', borderWidth: scale(1) }]}
                titleStyle={{ color: '#cfa461', fontSize: scale(20) }}
              />
            </View>
            <View style={{ flex: 1, backgroundColor: '#333333', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <Text style={{ color: '#ffffff' }}>{'忘记密码'}</Text>
              <Text style={{ color: '#cfa461' }}>{'免费试玩'}</Text>
            </View>
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
  signButton: {
    width: '30%',
    aspectRatio: 3,
    borderRadius: scale(5),
  },
})

export default JXHHomePage
