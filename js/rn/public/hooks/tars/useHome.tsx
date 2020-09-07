import { useEffect, useState } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import APIRouter from '../../network/APIRouter'
import { CouponListModel } from '../../network/Model/CouponListModel'
import { FloatADModel } from '../../network/Model/FloatADModel'
import { HomeADModel } from '../../network/Model/HomeADModel'
import { HomeGamesModel } from '../../network/Model/HomeGamesModel'
import { LotteryGameModel } from '../../network/Model/LotteryGameModel'
import { LotteryNumberModel } from '../../network/Model/LotteryNumberModel'
import { NoticeModel } from '../../network/Model/NoticeModel'
import { RankListModel } from '../../network/Model/RankListModel'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { SystemConfig } from '../../network/Model/SystemConfigModel'
import { TurntableListModel } from '../../network/Model/TurntableListModel'

const routers = [
  'system_rankingList',
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
]

const globalRouters = [
  'game_homeRecommend',
  'system_config',
  'system_banners',
]

const useHome = () => {

  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [rankList, setRankList] = useState<RankListModel>()
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

  const apis = routers.map(async (router) => {
    try {
      return await APIRouter[router]()
    } catch (error) {
      // console.log(error)
    }
  })

  const globalApis = globalRouters.map(async (router) => {
    try {
      return await APIRouter[router]()
    } catch (error) {
      // console.log(error)
    }
  })

  const callGloableApis = async () => {
    try {
      const response = await Promise.all(globalApis)
      // globals state
      const gameLobby = response[0]?.data?.data ?? []
      const sysConf = response[1]?.data?.data as SystemConfig ?? {} as SystemConfig
      const {
        loginVCode,
        login_to,
        adSliderTimer,
        appDownloadUrl
      } = sysConf
      const banner = response[2]?.data?.data
      UGStore.dispatch({ type: 'merge', sysConf: { loginVCode, login_to, adSliderTimer: parseInt(adSliderTimer), appDownloadUrl }, gameLobby, banner })
      UGStore.save()
    } catch (error) {
      console.log("--------useHome callGloableApis error--------", error)
    } finally {

    }
  }

  const callApis = async () => {
    try {
      const response = await Promise.all(apis)
      response[0] && setRankList(response[0]?.data)
      response[1] && setHomeGame(response[1]?.data)
      response[2] && setNotice(response[2]?.data)
      response[3] && setOnlineCount(response[3]?.data?.data?.onlineUserCount)
      response[4] && setCouponList(response[4]?.data)
      response[5] && setHomeAd(response[5]?.data)
      response[6] && setLotteryNumber(response[6]?.data)
      response[7] && setLotteryGame(response[7]?.data)
      response[8] && setTurntableList(response[8]?.data)
      response[9] && setRedBag(response[9]?.data)
      response[10] && setFloatAd(response[10]?.data)
    } catch (error) {
      console.log("--------useHome callApis error--------", error)
    } finally {
      setLoading(false)
    }
  }

  const refresh = async () => {
    try {
      setRefreshing(true)
      await Promise.all([callGloableApis(), callApis()])
    } catch (error) {

    } finally {
      setRefreshing(false)

    }
  }

  useEffect(() => {
    callApis()
  }, [])

  return {
    loading,
    refreshing,
    rankList,
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
    refresh
  }

}

export default useHome