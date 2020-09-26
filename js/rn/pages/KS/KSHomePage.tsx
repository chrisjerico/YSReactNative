import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import PushHelper from '../../public/define/PushHelper'
import useHomePage from '../../public/hooks/tars/useHomePage'
import { KSThemeColor } from '../../public/theme/colors/KSThemeColor'
import { scale } from '../../public/tools/Scale'
import BannerBlock from '../../public/views/tars/BannerBlock'
import LinearBadge from '../../public/views/tars/LinearBadge'
import NoticeBlock from '../../public/views/tars/NoticeBlock'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TouchableImage from '../../public/views/tars/TouchableImage'
import HomeHeader from './views/HomeHeader'

const KSHomePage = () => {
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
  const { mobile_logo, webName, showCoupon, rankingListType, midBannerTimer } = sys

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
        <ScrollView style={{ backgroundColor: KSThemeColor.凯时.themeColor, flex: 1 }} showsVerticalScrollIndicator={false}>
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
            // logo={getHtml5Image(14, 'notice')}
            onPressNotice={({ content }) => {
              PushHelper.pushNoticePopUp(content)
            }}
          />
          <HomeHeader logo={mobile_logo} />
          <View style={styles.toolBlock}>
            <LinearBadge
              colors={['#3a3a41', '#3a3a41']}
              containerStyle={[styles.toolButton, { marginLeft: '1%' }]}
              title={'注册'}
              textStyle={{ color: '#ffffff', fontSize: scale(25) }}
              showIcon={false}
            />
            <LinearBadge colors={['#eb5d4d', '#fb7a24']} containerStyle={styles.toolButton} title={'注册'} textStyle={{ color: '#ffffff', fontSize: scale(25) }} showIcon={false} />
            <LinearBadge
              colors={['#eb5d4d', '#fb2464']}
              containerStyle={[styles.toolButton, { marginRight: '1%' }]}
              title={'试玩'}
              textStyle={{ color: '#ffffff', fontSize: scale(25) }}
              showIcon={false}
            />
          </View>
          <View style={styles.toolBlock}>
            <LinearBadge
              colors={['#eb5d4d', '#fb7a24']}
              containerStyle={[styles.toolButton, { marginLeft: '1%' }]}
              title={'存款'}
              textStyle={{ color: '#ffffff', fontSize: scale(25) }}
              showIcon={false}
            />
            <LinearBadge colors={['#3a3a41', '#3a3a41']} containerStyle={styles.toolButton} title={'存款'} textStyle={{ color: '#ffffff', fontSize: scale(25) }} showIcon={false} />
            <LinearBadge
              colors={['#3a3a41', '#3a3a41']}
              containerStyle={[styles.toolButton, { marginRight: '1%' }]}
              title={'存款'}
              textStyle={{ color: '#ffffff', fontSize: scale(25) }}
              showIcon={false}
            />
          </View>
          <View style={styles.toolBlock}>
            <View style={{ alignItems: 'center', marginLeft: '1%', marginRight: '0.5%', width: '32%' }}>
              <LinearBadge
                colors={['#3a3a41', '#3a3a41']}
                containerStyle={[styles.toolButton, { marginHorizontal: null, width: '100%', marginBottom: scale(10) }]}
                title={'存款'}
                textStyle={{ color: '#ffffff', fontSize: scale(25) }}
                showIcon={false}
              />
              <LinearBadge
                colors={['#3a3a41', '#3a3a41']}
                containerStyle={[styles.toolButton, { marginHorizontal: null, width: '100%' }]}
                title={'存款'}
                textStyle={{ color: '#ffffff', fontSize: scale(25) }}
                showIcon={false}
              />
            </View>
            <BannerBlock
              containerStyle={{ marginLeft: '0.5%', width: '65%', marginRight: '1%', height: '100%', aspectRatio: null }}
              autoplayTimeout={bannersInterval}
              badgeStyle={{ top: -scale(170) }}
              onlineNum={onlineNum}
              showOnlineNum={true}
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
          </View>
        </ScrollView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  toolBlock: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: scale(10),
  },
  toolButton: {
    width: '32%',
    aspectRatio: 2,
    backgroundColor: '#3a3a41',
    borderRadius: scale(5),
    height: null,
    marginHorizontal: '0.5%',
  },
})

export default KSHomePage
