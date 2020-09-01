import { useEffect, useState } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import APIRouter from '../../network/APIRouter'
import { BannerModel } from '../../network/Model/BannerModel'
import { CouponListModel } from '../../network/Model/CouponListModel'
import { HomeADModel } from '../../network/Model/HomeADModel'
import { HomeGamesModel } from '../../network/Model/HomeGamesModel'
import { LotteryGameModel } from '../../network/Model/LotteryGameModel'
import { LotteryNumberModel } from '../../network/Model/LotteryNumberModel'
import { NoticeModel } from '../../network/Model/NoticeModel'
import { RankListModel } from '../../network/Model/RankListModel'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { HomeRecommendModel } from '../../network/Model/HomeRecommendModel'

const routers = [
  'user_info', // global
  'system_config', //global
  'system_rankingList',
  'system_banners',
  'game_homeGames',
  'notice_latest',
  'system_onlineCount',
  'system_promotions',
  'system_homeAds',
  'lhcdoc_lotteryNumber',
  'game_lotteryGames',
  'activity_turntableList',
  'activity_redBagDetail',
  'system_floatAds',
  'game_homeRecommend'
]

const useHome = () => {

  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(true)
  const [rankList, setRankList] = useState<RankListModel>()
  const [banner, setBanner] = useState<BannerModel>()
  const [homeGame, setHomeGame] = useState<HomeGamesModel>()
  const [notice, setNotice] = useState<NoticeModel>()
  const [onlineNum, setOnlineCount] = useState(0)
  const [couponList, setCouponList] = useState<CouponListModel>()
  const [homeAd, setHomeAd] = useState<HomeADModel>()
  const [lotteryNumber, setLotteryNumber] = useState<LotteryNumberModel>()
  const [lotteryGames, setLotteryGames] = useState<LotteryGameModel>()
  const [roulette, setRoulette] = useState()
  const [redBag, setRedBag] = useState<RedBagDetailActivityModel>()
  const [floatAd, setFloatAd] = useState<any[]>()
  const [homeRecommend, setHomeRecommend] = useState<HomeRecommendModel>()

  const apis = routers.map(async (router) => {
    try {
      return await APIRouter[router]()
    } catch (error) {
      // console.log(error)
    }
  })

  const callApis = async () => {
    try {
      !loading && setRefresh(true)
      const response = await Promise.all(apis)
      // console.log("--------response------", response)
      // globals state
      const userInfo = response[0]?.data?.data ?? {}
      const sysConf = response[1]?.data?.data ?? {}
      const { loginVCode, login_to, adSliderTimer, appDownloadUrl } = sysConf
      //@ts-ignore
      UGStore.dispatch({ type: 'merge', userInfo, sysConf: { loginVCode, login_to, adSliderTimer, appDownloadUrl } })
      UGStore.save()
      // local state
      response[2] && setRankList(response[2]?.data)
      response[3] && setBanner(response[3]?.data)
      response[4] && setHomeGame(response[4]?.data)
      response[5] && setNotice(response[5]?.data)
      response[6] && setOnlineCount(response[6]?.data?.data?.onlineUserCount)
      response[7] && setCouponList(response[7]?.data)
      response[8] && setHomeAd(response[8]?.data)
      response[9] && setLotteryNumber(response[9]?.data)
      response[10] && setLotteryGames(response[10]?.data)
      response[11] && setRoulette(response[11]?.data?.data)
      response[12] && setRedBag(response[12]?.data)
      response[13] && setFloatAd(response[13]?.data?.data)
      response[14] && setHomeRecommend(response[14]?.data)
    } catch (error) {
      console.log("--------useHome error--------", error)
    } finally {
      setLoading(false)
      setRefresh(false)
    }
  }

  const refreshHome = callApis

  useEffect(() => {
    callApis()
  }, [])

  return {
    loading,
    refresh,
    rankList,
    banner,
    homeGame,
    notice,
    onlineNum,
    couponList,
    homeAd,
    lotteryNumber,
    lotteryGames,
    roulette,
    redBag,
    floatAd,
    homeRecommend,
    refreshHome
  }

}

export default useHome



  // const init = () => {
  //   if (Platform.OS == 'ios') {
  //     OCHelper.call('AppDefine.shared.Host').then((host: string) => {
  //       httpClient.defaults.baseURL = host
  //       callApis()
  //     }).catch(error => {
  //       console.log("------error-----", error)
  //     })
  //   } else if (Platform.OS == 'android') {
  //     ANHelper.call(NativeCommand.APP_HOST).then((host: string) => {
  //       httpClient.defaults.baseURL = host
  //       callApis()
  //     })
  //   }
  // }