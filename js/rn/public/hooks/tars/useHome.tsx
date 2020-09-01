import { useEffect, useState } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import APIRouter from '../../network/APIRouter'
import { BannerModel } from '../../network/Model/BannerModel'
import { CouponListModel } from '../../network/Model/CouponListModel'
import { FloatADModel } from '../../network/Model/FloatADModel'
import { HomeADModel } from '../../network/Model/HomeADModel'
import { HomeGamesModel } from '../../network/Model/HomeGamesModel'
import { HomeRecommendModel } from '../../network/Model/HomeRecommendModel'
import { LotteryGameModel } from '../../network/Model/LotteryGameModel'
import { LotteryNumberModel } from '../../network/Model/LotteryNumberModel'
import { NoticeModel } from '../../network/Model/NoticeModel'
import { RankListModel } from '../../network/Model/RankListModel'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { SystemConfigData } from '../../network/Model/SystemConfigModel'
import { TurntableListModel } from '../../network/Model/TurntableListModel'

const routers = [
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
  'game_homeRecommend',
  'system_config', //global
  // 'user_info', // global
]

const useHome = () => {

  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(true)
  // const [userInfo, setUserInfo] = useState<UserInfoModel>()
  // const [sysConfig, setSysConfig] = useState<SystemConfigModel>()
  const [rankList, setRankList] = useState<RankListModel>()
  const [banner, setBanner] = useState<BannerModel>()
  const [homeGame, setHomeGame] = useState<HomeGamesModel>()
  const [notice, setNotice] = useState<NoticeModel>()
  const [onlineNum, setOnlineCount] = useState(0)
  const [couponList, setCouponList] = useState<CouponListModel>()
  const [homeAd, setHomeAd] = useState<HomeADModel>()
  const [lotteryNumber, setLotteryNumber] = useState<LotteryNumberModel>()
  const [lotteryGame, setLotteryGame] = useState<LotteryGameModel>()
  const [turntableList, setTurntableList] = useState<TurntableListModel>()
  const [redBag, setRedBag] = useState<RedBagDetailActivityModel>()
  const [floatAd, setFloatAd] = useState<FloatADModel>()
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
      // globals state
      const sysConf = response[13]?.data?.data as SystemConfigData ?? {} as SystemConfigData
      const {
        loginVCode,
        login_to,
        adSliderTimer,
        appDownloadUrl
      } = sysConf
      UGStore.dispatch({ type: 'merge', sysConf: { loginVCode, login_to, adSliderTimer: parseInt(adSliderTimer), appDownloadUrl } })
      UGStore.save()
      // local state
      response[0] && setRankList(response[0]?.data)
      response[1] && setBanner(response[1]?.data)
      response[2] && setHomeGame(response[2]?.data)
      response[3] && setNotice(response[3]?.data)
      response[4] && setOnlineCount(response[4]?.data?.data?.onlineUserCount)
      response[5] && setCouponList(response[5]?.data)
      response[6] && setHomeAd(response[6]?.data)
      response[7] && setLotteryNumber(response[7]?.data)
      response[8] && setLotteryGame(response[8]?.data)
      response[9] && setTurntableList(response[9]?.data)
      response[10] && setRedBag(response[10]?.data)
      response[11] && setFloatAd(response[11]?.data)
      response[12] && setHomeRecommend(response[12]?.data)
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
    lotteryGame,
    turntableList,
    redBag,
    floatAd,
    homeRecommend,
    refreshHome
  }

}

export default useHome