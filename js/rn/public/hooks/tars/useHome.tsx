import { useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { ANHelper, NativeCommand } from '../../define/ANHelper/ANHelper'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'
import { httpClient } from '../../network/httpClient'
import { BannerModel } from '../../network/Model/BannerModel'
import { CouponListModel } from '../../network/Model/CouponListModel'
import { HomeADModel } from '../../network/Model/HomeADModel'
import { HomeGamesModel } from '../../network/Model/HomeGamesModel'
import { LotteryGameModel } from '../../network/Model/LotteryGameModel'
import { LotteryNumberModel } from '../../network/Model/LotteryNumberModel'
import { NoticeModel } from '../../network/Model/NoticeModel'
import { RankListModel } from '../../network/Model/RankListModel'
import { SystemConfigModel } from '../../network/Model/SystemConfigModel'

const routers = [
  'system_rankingList',
  'system_banners',
  'game_homeGames',
  'notice_latest',
  'system_onlineCount',
  'system_promotions',
  'system_config',
  'system_homeAds',
  'lhcdoc_lotteryNumber',
  'game_lotteryGames'
]

// [
//   APIRouter.system_rankingList(),
//   APIRouter.system_banners(),
//   APIRouter.game_homeGames(),
//   APIRouter.notice_latest(),
//   APIRouter.system_onlineCount(),
//   APIRouter.system_promotions(),
//   APIRouter.system_config(),
//   APIRouter.system_homeAds(),
//   APIRouter.lhcdoc_lotteryNumber(),
//   APIRouter.game_lotteryGames()
// ]
const useHome = () => {

  const [loading, setLoading] = useState(true)
  const [rankList, setRankList] = useState<RankListModel>()
  const [banner, setBanner] = useState<BannerModel>()
  const [homeGame, setHomeGame] = useState<HomeGamesModel>()
  const [notice, setNotice] = useState<NoticeModel>()
  const [onlineNum, setOnlineCount] = useState(0)
  const [couponList, setCouponList] = useState<CouponListModel>()
  const [systemConfig, setSystemConfig] = useState<SystemConfigModel>()
  const [homeAd, setHomeAd] = useState<HomeADModel>()
  const [lotteryNumber, setLotteryNumber] = useState<LotteryNumberModel>()
  const [lotteryGames, setLotteryGames] = useState<LotteryGameModel>()

  const init = () => {
    if (Platform.OS == 'ios') {
      OCHelper.call('AppDefine.shared.Host').then((host: string) => {
        httpClient.defaults.baseURL = host
        callApis()
      }).catch(error => {
        console.log("------error-----", error)
      })
    } else if (Platform.OS == 'android') {
      ANHelper.call(NativeCommand.APP_HOST).then((host: string) => {
        httpClient.defaults.baseURL = host
        callApis()
      })
    }
  }

  const apis = routers.map(async (router) => {
    try {
      return await APIRouter[router]()
    } catch (error) {
      // console.log(error)
    }

  })

  const callApis = async () => {
    try {
      const response = await Promise.all(apis)
      response[0] && setRankList(response[0]?.data)
      response[1] && setBanner(response[1]?.data)
      response[2] && setHomeGame(response[2]?.data)
      response[3] && setNotice(response[3]?.data)
      response[4] && setOnlineCount(response[4]?.data?.data?.onlineUserCount)
      response[5] && setCouponList(response[5]?.data)
      response[6] && setSystemConfig(response[6]?.data)
      response[7] && setHomeAd(response[7]?.data)
      response[8] && setLotteryNumber(response[8]?.data)
      response[9] && setLotteryGames(response[9]?.data)
    } catch (error) {
      console.log("--------useHome error--------", error)
    } finally {
      setLoading(false)
    }
  }

  const refreshHome = callApis

  useEffect(() => {
    callApis()
    // setTimeout(() => {
    //   init()
    // }, 1000);
  }, [])

  return {
    loading,
    rankList,
    banner,
    homeGame,
    notice,
    onlineNum,
    couponList,
    systemConfig,
    homeAd,
    lotteryNumber,
    lotteryGames,
    refreshHome
  }

}

export default useHome