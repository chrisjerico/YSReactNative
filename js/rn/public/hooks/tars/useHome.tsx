import { useEffect, useState } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import APIRouter from '../../network/APIRouter'
import { BannerModel } from '../../network/Model/BannerModel'
import { CouponListModel } from '../../network/Model/CouponListModel'
import { HomeADModel } from '../../network/Model/HomeADModel'
import { HomeGamesModel } from '../../network/Model/HomeGamesModel'
import { HomeRecommendModel } from '../../network/Model/HomeRecommendModel'
import { LotteryGameModel } from '../../network/Model/LotteryGameModel'
import { LotteryNumberModel } from '../../network/Model/LotteryNumberModel'
import { NoticeModel } from '../../network/Model/NoticeModel'
import { RankListModel } from '../../network/Model/RankListModel'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { SystemConfigData } from '../../network/Model/SystemConfigModel'
import { UserInfoData } from '../../network/Model/UserInfoModel'
import { FloatADModel } from '../../network/Model/FloatADModel'
import { TurntableListModel } from '../../network/Model/TurntableListModel'

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
      // console.log("--------response------", response)
      // globals state
      const userInfo = response[0]?.data?.data as UserInfoData ?? {} as UserInfoData
      const sysConf = response[1]?.data?.data as SystemConfigData ?? {} as SystemConfigData
      const { loginVCode, login_to, adSliderTimer, appDownloadUrl } = sysConf
      //@ts-ignore
      UGStore.dispatch({ type: 'merge', userInfo, sysConf: { loginVCode, login_to, adSliderTimer: parseInt(adSliderTimer), appDownloadUrl } })
      UGStore.save()
      // local state
      // response[0] && setUserInfo(response[0]?.data)
      // response[1] && setSysConfig(response[1]?.data)
      response[2] && setRankList(response[2]?.data)
      response[3] && setBanner(response[3]?.data)
      response[4] && setHomeGame(response[4]?.data)
      response[5] && setNotice(response[5]?.data)
      response[6] && setOnlineCount(response[6]?.data?.data?.onlineUserCount)
      response[7] && setCouponList(response[7]?.data)
      response[8] && setHomeAd(response[8]?.data)
      response[9] && setLotteryNumber(response[9]?.data)
      response[10] && setLotteryGame(response[10]?.data)
      response[11] && setTurntableList(response[11]?.data)
      response[12] && setRedBag(response[12]?.data)
      response[13] && setFloatAd(response[13]?.data)
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
    lotteryGame,
    turntableList,
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