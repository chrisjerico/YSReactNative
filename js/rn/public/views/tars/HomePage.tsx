import React, { ReactElement, useCallback } from 'react'
import { ListRenderItem, StyleSheet } from 'react-native'
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
import ProgressCircle from './ProgressCircle'
import SafeAreaHeader from './SafeAreaHeader'
import TouchableImage from './TouchableImage'

interface HomePageProps {
  themeColor: string
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
  showCoupon: boolean
  goToJDPromotionListPage: () => any
  rankingListType: RankingListType
  webName: string
  couponBlockProps?: { [key: string]: any }
  animatedRankComponentProps?: { [key: string]: any }
  couponProps?: { [key: string]: any }
  bottomLogoProps?: { [key: string]: any }
}

const HomePage = ({
  themeColor,
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
  goToJDPromotionListPage,
  rankingListType,
  webName,
  rankLists,
  couponBlockProps,
  animatedRankComponentProps,
  couponProps,
  bottomLogoProps,
}: HomePageProps) => {
  const renderBanner = useCallback((item, index) => {
    const { linkCategory, linkPosition, pic } = item
    const pushCategory = useCallback(() => {
      PushHelper.pushCategory(linkCategory, linkPosition)
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
        <SafeAreaHeader headerColor={themeColor} />
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={themeColor}>{renderHeader && renderHeader()}</SafeAreaHeader>
        <List
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
              {renderListHeaderComponent && renderListHeaderComponent()}
            </>
          )}
          renderItem={renderItem ? renderItem : () => null}
          ListFooterComponent={() => (
            <>
              {renderListFooterTopComponent && renderListFooterTopComponent()}
              <CouponBlock
                {...couponBlockProps}
                visible={showCoupon}
                onPressMore={goToJDPromotionListPage}
                coupons={coupons}
                renderCoupon={({ item, index }) => {
                  const { pic, linkCategory, linkPosition, title, content, linkUrl } = item
                  return (
                    <AutoHeightCouponComponent
                      {...couponProps}
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
              <AnimatedRankComponent {...animatedRankComponentProps} type={rankingListType} rankLists={rankLists} />
              <BottomLogo
                {...bottomLogoProps}
                webName={webName}
                onPressComputer={() => {
                  PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
                }}
                onPressPromotion={goToJDPromotionListPage}
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
