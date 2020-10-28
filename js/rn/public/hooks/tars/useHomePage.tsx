import { useEffect } from 'react'
import { push } from '../../../public/navigation/RootNavigation'
import { B_DEBUG } from '../../../public/tools/UgLog'
import { UGStore } from '../../../redux/store/UGStore'
import PushHelper from '../../define/PushHelper'
import { PageName } from '../../navigation/Navigation'
import { ToastError, ToastSuccess } from '../../tools/tars'
import { hideLoading, showLoading, UGLoadingType } from '../../widget/UGLoadingCP'
import useTryPlay from './useTryPlay'
import useHome from './useHome'
import useLogOut from './useLogOut'
import useRerender from './useRerender'
import useSys from './useSys'

interface UseHomePage {
  onSuccessSignOut?: () => any
  onSuccessTryPlay?: () => any
}

const useHomePage = ({ onSuccessSignOut, onSuccessTryPlay }: UseHomePage) => {
  const { loading, refreshing, rankList, homeGame, notice, onlineNum, couponList, homeAd, turntableList, redBag, floatAd, lotteryGame, lotteryNumber, refresh } = useHome()

  const { rerender } = useRerender()

  const goToJDPromotionListPage = () => {
    push(PageName.JDPromotionListPage, {
      containerStyle: {
        backgroundColor: '#ffffff',
      },
    })
  }

  const { tryPlay } = useTryPlay({
    onStart: () => {
      showLoading()
    },
    onSuccess: () => {
      hideLoading()
      ToastSuccess('登录成功！')
      rerender()
      onSuccessTryPlay && onSuccessTryPlay()
    },
    onError: (error) => {
      hideLoading()
      ToastError(error ?? '試玩失败')
    },
  })

  const { logOut } = useLogOut({
    onStart: () => {
      showLoading()
    },
    onSuccess: () => {
      hideLoading()
      rerender()
      onSuccessSignOut && onSuccessSignOut()
    },
    onError: (error) => {
      hideLoading()
      ToastError(error || '登出失败')
    },
  })
  const signOut = logOut

  const { sys } = useSys({})
  // stores
  const userInfo = UGStore.globalProps.userInfo
  const gameLobby = UGStore.globalProps.gameLobby
  const banner = UGStore.globalProps.banner
  // data handle
  const bannersInterval = parseInt(banner?.interval)
  const banners = banner?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const announcements =
    notice?.data?.popup?.map((item: any) => {
      return Object.assign({ clsName: 'UGNoticeModel', hiddenBottomLine: 'No' }, item)
    }) ?? []
  const navs = homeGame?.data?.navs?.sort((a: any, b: any) => a.sort - b.sort)?.slice(0, 4) ?? []
  const homeGames = homeGame?.data?.icons ?? []
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
  const lotterys = lotteryNumbers?.map((item, index) => {
    return { number: item, color: numColors[index], sx: numSxs[index] }
  })
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

  const goTo = {
    goToJDPromotionListPage,
  }

  const sign = {
    tryPlay,
    signOut,
  }

  const homeInfo = {
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
    gameLobby,
    officialGames,
    customiseGames,
    coupons,
    rankLists,
    redBag,
    redBagLogo,
    roulette,
    floatAds,
  }

  const value = {
    loading,
    refreshing,
    homeInfo,
    userInfo,
    sysInfo: sys,
  }

  return {
    goTo,
    sign,
    value,
    refresh,
  }
}

export default useHomePage
