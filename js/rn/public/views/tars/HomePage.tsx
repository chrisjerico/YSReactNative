import React, { ReactElement, useCallback } from 'react'
import { ListRenderItem, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import AnimatedRankComponent from '../../components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../components/tars/AutoHeightCouponComponent'
import PushHelper from '../../define/PushHelper'
import { RankingListType } from '../../models/Enum'
import { httpClient } from '../../network/httpClient'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { scale } from '../../tools/Scale'
import Activitys, { FloatAd, Roulette } from './Activitys'
import BannerBlock from './BannerBlock'
import BottomGap from './BottomGap'
import BottomLogo from './BottomLogo'
import CouponBlock from './CouponBlock'
import List from './List'
import NoticeBlock from './NoticeBlock'
import ProgressCircle from './ProgressCircle'
import SafeAreaHeader from './SafeAreaHeader'
import TouchableImage from './TouchableImage'

interface HomePageProps {
  headerColor: string
  loading: boolean
  pagekey: string
  refreshing: boolean
  refresh: () => any
  announcements: any[]
  items?: readonly any[]
  renderHeader: () => ReactElement
  renderListHeaderComponent: () => ReactElement
  renderItem?: ListRenderItem<any>
  renderListFooterTopComponent?: () => ReactElement
  renderListFooterBottomComponent?: () => ReactElement
  renderRestComponent?: () => ReactElement
  uid?: string
  isTest?: boolean
  redBagLogo: string
  redBag: RedBagDetailActivityModel
  roulette: Roulette[]
  floatAds: FloatAd[]
  showOnlineNum: boolean
  bannersInterval: number
  onlineNum: number
  banners: any[]
  coupons: any[]
  rankLists: any[]
  notices: any[]
  showCoupon: boolean
  goToPromotionPage: () => any
  rankingListType: RankingListType
  webName: string
  couponBlockStyles?: CouponBlockStyles
  animatedRankComponentStyles?: AnimatedRankComponentStyles
  couponStyles?: CouponStyles
  bottomLogoStyles?: BottomLogoStyles
  containerStyle?: StyleProp<ViewStyle>
  noticeBlockStyles?: NoticeBlockStyles
  noticeLogo?: string
}

interface CouponBlockStyles {
  containerStyle?: StyleProp<ViewStyle>
  listContainerStyle?: StyleProp<ViewStyle>
  titleContainerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}
interface AnimatedRankComponentStyles {
  containerStyle?: StyleProp<ViewStyle>
  iconTitleContainerStyle?: StyleProp<ViewStyle>
  contentContainerStyle?: StyleProp<ViewStyle>
  titleConatinerStyle?: StyleProp<ViewStyle>
  iconTitleStyle?: StyleProp<TextStyle>
  contentTitleStyle?: StyleProp<TextStyle>
  iconStyle?: StyleProp<TextStyle>
}

interface CouponStyles {
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}

interface BottomLogoStyles {
  containerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
  subTitleStyle?: StyleProp<TextStyle>
}

interface NoticeBlockStyles {
  iconContainerStyle?: StyleProp<ViewStyle>
  logoTextStyle?: StyleProp<TextStyle>
  textStyle?: StyleProp<TextStyle>
  bgContainerStyle?: StyleProp<TextStyle>
  containerStyle?: StyleProp<ViewStyle>
}

const HomePage = ({
  headerColor,
  loading,
  pagekey,
  refreshing,
  announcements,
  refresh,
  items,
  renderItem,
  renderListHeaderComponent,
  renderListFooterTopComponent,
  renderListFooterBottomComponent,
  renderRestComponent,
  renderHeader,
  uid,
  isTest,
  redBagLogo,
  redBag,
  roulette,
  floatAds,
  showOnlineNum,
  bannersInterval,
  onlineNum,
  banners,
  showCoupon,
  coupons,
  notices,
  goToPromotionPage,
  rankingListType,
  webName,
  rankLists,
  couponBlockStyles,
  animatedRankComponentStyles,
  couponStyles,
  bottomLogoStyles,
  containerStyle,
  noticeBlockStyles,
  noticeLogo,
}: HomePageProps) => {
  const onPressNotice = useCallback(({ content }) => {
    PushHelper.pushNoticePopUp(content)
  }, [])

  const renderBanner = useCallback((item, index) => {
    const { linkCategory, linkPosition, pic, url } = item
    const pushCategory = useCallback(() => {
      if (url?.length) {
        PushHelper.pushCategory(linkCategory, linkPosition)
      } else {
        PushHelper.openWebView(url)
      }
    }, [])
    return <TouchableImage key={index} pic={pic} resizeMode={'stretch'} onPress={pushCategory} />
  }, [])

  const onRefresh = useCallback(async () => {
    try {
      await refresh()
      PushHelper.pushAnnouncement(announcements)
    } catch (error) {}
  }, [announcements])

  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={headerColor} />
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={headerColor}>{renderHeader && renderHeader()}</SafeAreaHeader>
        <List
          style={containerStyle}
          uniqueKey={pagekey}
          scrollEnabled={true}
          removeClippedSubviews={true}
          data={items ?? []}
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListHeaderComponent={() => (
            <>
              <BannerBlock
                showOnlineNum={showOnlineNum}
                containerStyle={styles.bannerContainer}
                badgeStyle={styles.bannerBadge}
                autoplayTimeout={bannersInterval}
                onlineNum={onlineNum}
                banners={banners}
                renderBanner={renderBanner}
              />
              <NoticeBlock {...noticeBlockStyles} notices={notices} logo={noticeLogo} onPressNotice={onPressNotice} />
              {renderListHeaderComponent && renderListHeaderComponent()}
            </>
          )}
          renderItem={renderItem ? renderItem : () => null}
          ListFooterComponent={() => (
            <>
              {renderListFooterTopComponent && renderListFooterTopComponent()}
              <CouponBlock
                {...couponBlockStyles}
                visible={showCoupon}
                onPressMore={goToPromotionPage}
                coupons={coupons}
                renderCoupon={({ item, index }) => {
                  const { pic, linkCategory, linkPosition, title, content, linkUrl } = item
                  return (
                    <AutoHeightCouponComponent
                      {...couponStyles}
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
              <AnimatedRankComponent {...animatedRankComponentStyles} type={rankingListType} rankLists={rankLists} />
              <BottomLogo
                {...bottomLogoStyles}
                webName={webName}
                onPressComputer={() => {
                  PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
                }}
                onPressPromotion={goToPromotionPage}
                debug={false}
              />
              {renderListFooterBottomComponent && renderListFooterBottomComponent()}
              <BottomGap />
            </>
          )}
        />
        <Activitys uid={uid} isTest={isTest} refreshing={refreshing} redBagLogo={redBagLogo} redBag={redBag} roulette={roulette} floatAds={floatAds} />
        {renderRestComponent && renderRestComponent()}
      </>
    )
  }
}

const styles = StyleSheet.create({
  bannerContainer: {
    aspectRatio: 540 / 218,
  },
  bannerBadge: {
    top: scale(-210),
  },
})
export default HomePage
