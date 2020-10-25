import { useEffect, useMemo } from 'react'
import { push } from '../../../public/navigation/RootNavigation'
import { B_DEBUG } from '../../../public/tools/UgLog'
import { UGStore } from '../../../redux/store/UGStore'
import PushHelper from '../../define/PushHelper'
import { PageName } from '../../navigation/Navigation'
import { showLoading, UGLoadingType } from '../../widget/UGLoadingCP'
import useHomeInfo from './useHomeInfo'
import useRerender from './useRerender'
import useSignOut from './useSignOut'
import useSysInfo from './useSysInfo'
import useTryPlay from './useTryPlay'

interface UseHomePage {
  onSuccessSignOut?: () => any
  onSuccessTryPlay?: () => any
}

const useHomePage = ({ onSuccessSignOut, onSuccessTryPlay }: UseHomePage) => {
  const { loading, refreshing, rankList, homeGame, notice, onlineNum, showOnlineNum, couponList, homeAd, turntableList, redBag, floatAd, lotteryGame, lotteryNumber, refresh } = useHomeInfo()

  const { reRender } = useRerender()

  const goToPromotionPage = () => {
    push(PageName.PromotionPage, {
      showBackBtn: true,
    })
  }

  const { tryPlay } = useTryPlay({
    onStart: () => {
      showLoading({ type: UGLoadingType.Loading, text: '正在登录...' })
    },
    onSuccess: () => {
      showLoading({ type: UGLoadingType.Success, text: '登录成功' })
      reRender()
      onSuccessTryPlay && onSuccessTryPlay()
    },
    onError: (error) => {
      showLoading({ type: UGLoadingType.Error, text: error ?? '試玩失败' })
    },
  })

  const { signOut } = useSignOut({
    onStart: () => {
      showLoading({ type: UGLoadingType.Loading, text: '正在退出...' })
    },
    onSuccess: () => {
      showLoading({ type: UGLoadingType.Success, text: '退出成功' })
      reRender()
      onSuccessSignOut && onSuccessSignOut()
    },
    onError: (error) => {
      showLoading({ type: UGLoadingType.Error, text: error ?? '退出失败' })
    },
  })

  // infos
  const userInfo = UGStore.globalProps.userInfo
  const { sysInfo } = useSysInfo({})
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

  const homeGameData = useMemo(() => {
    const navs = homeGame?.data?.navs?.sort((a: any, b: any) => a.sort - b.sort) ?? []
    const homeGames = homeGame?.data?.icons ?? []
    const homeGamesConcat = homeGames?.flatMap((ele) => ele?.list)

    return { navs, homeGames, homeGamesConcat }
  }, [homeGame])

  const lotteryData = useMemo(() => {
    const lotteryDate = lotteryNumber?.data?.issue
    const lotteryNumbers = lotteryNumber?.data?.numbers?.split(',') ?? []
    const numColors = lotteryNumber?.data?.numColor?.split(',') ?? []
    const numSxs = lotteryNumber?.data?.numSx?.split(',') ?? []
    const lotterys = lotteryNumbers?.map((item, index) => {
      return { number: item, color: numColors[index], sx: numSxs[index] }
    })
    return {
      lotteryDate,
      lotterys,
    }
  }, [lotteryNumber])

  const official_customise_Games = useMemo(() => {
    const official_customise_games = lotteryGame?.data?.flatMap((ele) => ele?.list)
    const officialGames = official_customise_games?.filter((ele) => ele?.customise == '0') // 官
    const customiseGames = official_customise_games?.filter((ele) => ele?.customise == '2') // 信
    return { officialGames, customiseGames }
  }, [lotteryGame])

  const coupons = useMemo(() => {
    return couponList?.data?.list?.slice(0, 5) ?? []
  }, [couponList])

  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const midBanners = homeAd?.data ?? []
  const floatAds = floatAd?.data ?? []
  const roulette = turntableList?.data

  useEffect(() => {
    if (notice?.data?.popup && !B_DEBUG) {
      PushHelper.pushAnnouncement(announcements)
    }
  }, [notice])

  const goTo = {
    goToPromotionPage,
  }

  const sign = {
    tryPlay,
    signOut,
  }

  const homeInfo = {
    onlineNum,
    showOnlineNum,
    bannersInterval,
    banners,
    notices,
    midBanners,
    announcements,
    gameLobby,
    coupons,
    rankLists,
    redBag,
    redBagLogo,
    roulette,
    floatAds,
    ...homeGameData,
    ...lotteryData,
    ...official_customise_Games,
  }

  const value = {
    loading,
    refreshing,
    homeInfo,
    userInfo,
    sysInfo,
  }

  return {
    goTo,
    sign,
    value,
    refresh,
  }
}

export default useHomePage
