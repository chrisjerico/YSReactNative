import { useEffect } from 'react'
import { push } from '../../../public/navigation/RootNavigation'
import { B_DEBUG } from '../../../public/tools/UgLog'
import UGSysConfModel from '../../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { UGStore } from '../../../redux/store/UGStore'
import PushHelper from '../../define/PushHelper'
import { PageName } from '../../navigation/Navigation'
import useHome from './useHome'

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
    turntableList,
    redBag,
    floatAd,
    homeRecommend,
    lotteryGame,
    lotteryNumber,
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
  const recommendGames = homeRecommend?.data
  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const coupons = couponList?.data?.list?.slice(0, 5) ?? []
  const midBanners = homeAd?.data ?? []
  const floatAds = floatAd?.data ?? []
  const roulette = turntableList?.data
  const lotteryDate = lotteryNumber?.data?.issue
  const lotteryNumbers = lotteryNumber?.data?.numbers?.split(',') ?? []
  const numColors = lotteryNumber?.data?.numColor?.split(',') ?? []
  const numSxs = lotteryNumber?.data?.numSx?.split(',') ?? []
  const lotterys = lotteryNumbers?.map((item, index) => { return ({ number: item, color: numColors[index], sx: numSxs[index] }) })
  // 官 信
  let official_customise_games = []
  lotteryGame?.data?.forEach((ele) => (official_customise_games = official_customise_games?.concat(ele?.list)))
  const officialGames = official_customise_games?.filter((ele) => ele?.customise == '0') // 官
  const customiseGames = official_customise_games?.filter((ele) => ele?.customise == '2') // 信


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
    lotteryDate,
    onlineNum,
    bannersInterval,
    lotterys,
    banners,
    notices,
    midBanners,
    announcements,
    navs,
    homeGames,
    recommendGames,
    officialGames,
    customiseGames,
    coupons,
    rankLists,
    redBag,
    redBagLogo,
    roulette,
    floatAds,
    userInfo,
    sysConf
  }
}

export default useHomePage
