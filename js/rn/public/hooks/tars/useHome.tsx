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

  const callApis = () => {
    Promise.all([
      APIRouter.system_rankingList(),
      APIRouter.system_banners(),
      APIRouter.game_homeGames(),
      APIRouter.notice_latest(),
      APIRouter.system_onlineCount(),
      APIRouter.system_promotions(),
      APIRouter.system_config(),
      APIRouter.system_homeAds(),
      APIRouter.lhcdoc_lotteryNumber(),
      APIRouter.game_lotteryGames()
    ]).then((response) => {
      setRankList(response[0]?.data)
      setBanner(response[1]?.data)
      setHomeGame(response[2]?.data)
      setNotice(response[3]?.data)
      setOnlineCount(response[4]?.data?.data?.onlineUserCount)
      setCouponList(response[5]?.data)
      setSystemConfig(response[6]?.data)
      setHomeAd(response[7]?.data)
      setLotteryNumber(response[8]?.data)
      setLotteryGames(response[9]?.data)
    }).catch(error => {
      console.log("--------useHome error--------", error)
    }).finally(() => {
      setLoading(false)
    })
  }

  const refreshHomeInfo = init

  useEffect(() => {
    // callApis()
    setTimeout(() => {
      init()
    }, 1000);
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
    refreshHomeInfo
  }

}

export default useHome