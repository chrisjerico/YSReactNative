import React, { memo, ReactElement, useCallback } from 'react'
import { ListRenderItem, Platform, RefreshControl, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import AnimatedRankComponent from '../../components/tars/AnimatedRankComponent'
import AutoHeightCouponComponent from '../../components/tars/AutoHeightCouponComponent'
import { ANHelper } from '../../define/ANHelper/ANHelper'
import { CMD } from '../../define/ANHelper/hp/CmdDefine'
import PushHelper from '../../define/PushHelper'
import { RankingListType } from '../../models/Enum'
import { httpClient } from '../../network/httpClient'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { sc540, scale } from '../../tools/Scale'
import Activitys, { FloatAd, GoldenEgg, Roulette } from './Activitys'
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
  goldenEggs: GoldenEgg[]
  scratchs: unknown
  showOnlineNum: boolean
  bannersInterval: number
  onlineNum: number
  banners: any[]
  coupons: any[]
  rankLists: any[]
  notices: any[]
  showCoupon: boolean
  goToPromotionPage: () => any
  rankingListType: RankingListType//底部排行榜
  webName: string
  couponBlockStyles?: CouponBlockStyles//底部优惠活动
  animatedRankComponentStyles?: AnimatedRankComponentStyles//底部排行榜
  couponStyles?: CouponStyles//底部优惠活动
  couponClickStyle?: 'slide' | 'popup' | 'page'; // slide折叠、popup弹窗、page内页
  bottomLogoStyles?: BottomLogoStyles//底部商标
  containerStyle?: StyleProp<ViewStyle>
  noticeBlockStyles?: NoticeBlockStyles // 跑马灯
  noticeLogo?: string//跑马灯
  showBannerBlock?: boolean
  refreshTintColor?: string
  equalFactor?: any
  bannerBadgeStyle?: StyleProp<ViewStyle>// 在线人数
}

interface CouponBlockStyles {
  containerStyle?: StyleProp<ViewStyle>
  listContainerStyle?: StyleProp<ViewStyle>
  titleContainerStyle?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}
interface AnimatedRankComponentStyles {
  containerStyle?: StyleProp<ViewStyle>//最外层
  iconStyle?: StyleProp<TextStyle>//标题icon
  iconTitleContainerStyle?: StyleProp<ViewStyle>//标题
  iconTitleStyle?: StyleProp<TextStyle>//标题
  contentContainerStyle?: StyleProp<ViewStyle>//表格
  titleConatinerStyle?: StyleProp<ViewStyle>//表格标题
  contentTitleStyle?: StyleProp<TextStyle>//表格标题
  leftItemTextStyle?: StyleProp<TextStyle>//行文本
  rightItemTextStyle?: StyleProp<TextStyle>//行文本
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


let couponSelectedIndex = -1
const couponRef = { reRenderCoupon: () => { } }

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
  goldenEggs,
  scratchs,
  showOnlineNum,//在线人数
  bannersInterval,//顶部横幅
  onlineNum,//在线人数
  banners,
  showCoupon,
  coupons,
  notices,
  goToPromotionPage,
  rankingListType,
  webName,
  rankLists,
  couponBlockStyles,//底部优惠活动
  animatedRankComponentStyles,//底部排行榜
  couponStyles,//底部优惠活动
  couponClickStyle,
  bottomLogoStyles,//底部商标
  containerStyle,
  noticeBlockStyles,//跑马灯
  noticeLogo,//跑马灯
  showBannerBlock = true,
  refreshTintColor = '#000000',
  bannerBadgeStyle,
}: HomePageProps) => {
  const onPressNotice = useCallback(({ content }) => {
    PushHelper.pushNoticePopUp(content)
  }, [])

  const renderBanner = useCallback((item, index) => {
    const { linkCategory, linkPosition, pic, url } = item
    const pushCategory = useCallback(() => {
      if (url?.length) {
        PushHelper.openWebView(url)
      } else {
        PushHelper.pushCategory(linkCategory, linkPosition)
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
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={refreshTintColor} />}
          ListHeaderComponent={() => (
            <>
              {showBannerBlock && (
                <BannerBlock
                  showOnlineNum={showOnlineNum}
                  containerStyle={styles.bannerContainer}
                  badgeStyle={{...styles.bannerBadge, ...bannerBadgeStyle}}
                  autoplayTimeout={bannersInterval}
                  onlineNum={onlineNum}
                  banners={banners}
                  renderBanner={renderBanner}
                />
              )}
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
                c_ref={couponRef}
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
                      slide={couponClickStyle == 'slide' && couponSelectedIndex == index}
                      content={content}
                      onPress={(setShowPop) => {
                        if (linkUrl) {
                          PushHelper.openWebView(linkUrl)
                          return
                        } else if (linkCategory || linkPosition) {
                          PushHelper.pushCategory(linkCategory, linkPosition)
                          return
                        }

                        switch (Platform.OS) {
                          case 'ios':
                            switch (couponClickStyle) {
                              // 内页
                              case 'page': {
                                PushHelper.pushPromoteDetail({ clsName: 'UGPromoteModel', ...item })
                                break
                              }
                              // 弹框
                              case 'popup': {
                                setShowPop(true)
                                break
                              }
                              case 'slide': {
                                if (index == couponSelectedIndex) {
                                  couponSelectedIndex = -1
                                  couponRef?.reRenderCoupon && couponRef?.reRenderCoupon()
                                } else {
                                  couponSelectedIndex = index
                                  couponRef?.reRenderCoupon && couponRef?.reRenderCoupon()
                                }
                                break
                              }
                            }
                            break
                          case 'android':
                            // 弹框
                            ANHelper.callAsync(CMD.OPEN_COUPON, {
                              ...item,
                              couponClickStyle,
                            })
                            break
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
                version={'version'}
                debug={false}
              />
              {renderListFooterBottomComponent && renderListFooterBottomComponent()}
              <BottomGap />
            </>
          )}
        />
        <Activitys uid={uid} isTest={isTest} refreshing={refreshing} redBagLogo={redBagLogo} redBag={redBag} roulette={roulette} floatAds={floatAds} goldenEggs={goldenEggs} scratchs={scratchs} />
        {renderRestComponent && renderRestComponent()}
      </>
    )
  }
}

const areEqual = (prevProps, nextProps) => {
  if (prevProps?.loading !== nextProps?.loading || prevProps?.refreshing !== nextProps?.refreshing || prevProps?.uid !== nextProps?.uid || prevProps?.equalFactor !== nextProps?.equalFactor) {
    return false
  } else {
    return true
  }
}

const styles = StyleSheet.create({
  bannerContainer: {
    aspectRatio: 540 / 237,
  },
  bannerBadge: {
    top: scale(-210),
  },
})
export default memo(HomePage, areEqual)
