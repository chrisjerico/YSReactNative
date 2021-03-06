import { useEffect, useMemo, useRef } from 'react'
import { push } from '../../../public/navigation/RootNavigation'
import { UGStore } from '../../../redux/store/UGStore'
import PushHelper from '../../define/PushHelper'
import { AnnouncementType } from '../../models/Enum'
import { PageName } from '../../navigation/Navigation'
import { hideLoading, showError, showLoading, showSuccess } from '../../widget/UGLoadingCP'
import useHomeInfo from './useHomeInfo'
import useRerender from './useRerender'
import useSignOut from './useSignOut'
import useSysInfo from './useSysInfo'
import useTryPlay from './useTryPlay'
import { Platform } from 'react-native'
import { ANHelper } from '../../define/ANHelper/ANHelper'
import { CMD } from '../../define/ANHelper/hp/CmdDefine'
import { MenuType } from '../../define/ANHelper/hp/GotoDefine'
import { ugLog } from '../../tools/UgLog'

interface UseHomePage {
  onSuccessSignOut?: () => any
  onSuccessTryPlay?: () => any
}

const useHomePage = ({ onSuccessSignOut, onSuccessTryPlay }: UseHomePage) => {
  const firstAnnouncement = useRef(false)

  // infos
  const userInfo = UGStore.globalProps.userInfo
  const gameLobby = UGStore.globalProps.gameLobby
  const banner = UGStore.globalProps.banner
  const menus = UGStore.globalProps.rightMenu
  const { sysInfo } = useSysInfo({})
  const { uid } = userInfo
  const { announcementType } = sysInfo

  const {
    loading,
    refreshing,
    rankList,
    homeGame,
    notice,
    onlineNum,
    showOnlineNum,
    couponList,
    homeAd,
    turntableList,
    redBag,
    activitySetting,
    floatAd,
    goldenEggList,
    scratchList,
    lotteryGame,
    lotteryNumber,
    refresh,
  } = useHomeInfo([uid])

  const { reRender } = useRerender()

  const goToPromotionPage = () => {
    push(PageName.PromotionPage, {
      showBackBtn: true,
    })
  }

  const { tryPlay } = useMemo(
    () =>
      useTryPlay({
        onStart: () => {
          showLoading('正在登录...')
        },
        onSuccess: () => {
          showSuccess('登录成功')
          reRender()
          onSuccessTryPlay && onSuccessTryPlay()
        },
        onError: (error) => {
          showError(error ?? '試玩失败')
        },
      }),
    []
  )

  const { signOut } = useMemo(
    () =>
      useSignOut({
        onStart: () => {
          showLoading('正在退出...')
        },
        onSuccess: () => {
          hideLoading()
          reRender()
          onSuccessSignOut && onSuccessSignOut()
        },
        onError: (error) => {
          showError(error ?? '退出失败')
        },
      }),
    []
  )

  // data handle
  const bannersInterval = parseInt(banner?.interval)
  const banners = banner?.list ?? []
  const notices = notice?.data?.scroll ?? []
  const announcements =
    notice?.data?.popup?.map((item: any) => {
      return Object.assign({ clsName: 'UGNoticeModel', hiddenBottomLine: 'No' }, item)
    }) ?? []
  const popupSwitch = notice?.data?.popupSwitch

  const homeGameData = useMemo(() => {
    const navs = homeGame?.data?.navs?.sort((a: any, b: any) => a.sort - b.sort) ?? []
    const homeGames = homeGame?.data?.icons ?? []
    //@ts-ignore
    const homeGamesConcat = homeGames?.flatMap((ele) => ele?.list)

    // ugLog('homeGamesConcat ==========================',JSON.stringify(homeGamesConcat))
    const homeGamesHot = homeGamesConcat?.filter((ele) => ele?.is_hot == '1') // 官
    ugLog('homeGamesHot ==========================',JSON.stringify(homeGamesHot))

    return { navs, homeGames, homeGamesConcat,homeGamesHot}
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
    // @ts-ignore
    const official_customise_games = lotteryGame?.data?.flatMap((ele) => ele?.list)
    const officialGames = official_customise_games?.filter((ele) => ele?.customise == '0') // 官
    const customiseGames = official_customise_games?.filter((ele) => ele?.customise == '2') // 信
    return { officialGames, customiseGames }
  }, [lotteryGame])

  const coupons = useMemo(() => {
    return couponList?.data?.list?.slice(0, 5) ?? []
  }, [couponList])

  const couponStyle = useMemo(() => {
    return couponList?.data?.style
  }, [couponList])

  const rankLists = rankList?.data?.list ?? []
  const redBagLogo = redBag?.data?.redBagLogo
  const midBanners = homeAd?.data ?? []
  const floatAds = floatAd?.data ?? []
  const roulette = turntableList?.data
  const goldenEggs = goldenEggList?.data
  const scratchs = scratchList?.data
  useEffect(() => {
    if (notice?.data?.popup) {
      if (announcementType == AnnouncementType.登录后弹出 && uid) {
        PushHelper.pushAnnouncement(announcements)
      } else if (announcementType == AnnouncementType.直接弹出) {
        !firstAnnouncement.current && PushHelper.pushAnnouncement(announcements)
        firstAnnouncement.current = true
      } else {
        //
      }
    }
  }, [uid])

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
    popupSwitch,
    gameLobby,
    coupons,
    couponStyle,
    rankLists,
    redBag,
    activitySetting,
    redBagLogo,
    roulette,
    floatAds,
    goldenEggs,
    scratchs,
    ...homeGameData,
    ...lotteryData,
    ...official_customise_Games,
  }

  const info = {
    loading,
    refreshing,
    menus,
    homeInfo,
    userInfo,
    sysInfo,
  }

  return {
    goTo,
    sign,
    info,
    refresh,
  }
}

export default useHomePage
