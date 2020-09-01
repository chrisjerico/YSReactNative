import { useEffect } from 'react'
import { push } from '../../../public/navigation/RootNavigation'
import { B_DEBUG } from '../../../public/tools/UgLog'
import PushHelper from '../../define/PushHelper'
import { PageName } from '../../navigation/Navigation'
import { SystemConfigData } from '../../../public/network/Model/SystemConfigModel'
import { UserInfoData } from '../../../public/network/Model/UserInfoModel'
import useHome from './useHome'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import UGSysConfModel from '../../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../../redux/store/UGStore'

const useHomePage = () => {
  const goToJDPromotionListPage = () => {
    push(PageName.JDPromotionListPage, {
      containerStyle: {
        backgroundColor: '#ffffff',
      },
    })
  }

  const {
    loading,
    refresh,
    rankList,
    banner,
    homeGame,
    notice,
    onlineNum,
    couponList,
    homeAd,
    roulette,
    redBag,
    floatAd,
    homeRecommend,
    refreshHome,
  } = useHome()

  // stores
  const userInfo: UGUserModel = UGStore.globalProps.userInfo
  const sysConf: UGSysConfModel = UGStore.globalProps.sysConf
  // data handle
  const bannersInterval = parseInt(banner?.data?.interval)
  const banners = banner?.data?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const announcements =
    notice?.data?.popup?.map((item: any) => {
      return Object.assign(
        { clsName: 'UGNoticeModel', hiddenBottomLine: 'No' },
        item
      )
    }) ?? []
  const navs =
    homeGame?.data?.navs
      ?.sort((a: any, b: any) => a.sort - b.sort)
      ?.slice(0, 4) ?? []
  const homeGames = homeGame?.data?.icons ?? []
  const lobbyGames = homeRecommend?.data
  const lobbys = lobbyGames?.map((item) => item?.categoryName) ?? []
  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const coupons = couponList?.data?.list?.slice(0, 5) ?? []
  const midBanners = homeAd?.data ?? []

  useEffect(() => {
    if (notice?.data?.popup && !B_DEBUG) {
      PushHelper.pushAnnouncement(announcements)
    }
  }, [notice])

  return {
    goToJDPromotionListPage,
    refreshHome,
    loading,
    refresh,
    onlineNum,
    bannersInterval,
    banners,
    notices,
    midBanners,
    announcements,
    navs,
    homeGames,
    lobbys,
    lobbyGames,
    coupons,
    rankLists,
    redBag,
    redBagLogo,
    roulette,
    floatAd,
    userInfo,
    sysConf
  }
}

export default useHomePage
