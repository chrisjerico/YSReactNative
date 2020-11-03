import { useEffect, useState } from 'react'
import { UGStore } from '../../../redux/store/UGStore'
import APIRouter from '../../network/APIRouter'
import { CouponListModel } from '../../network/Model/CouponListModel'
import { FloatADModel } from '../../network/Model/FloatADModel'
import { GoldenEggListModel } from '../../network/Model/GoldenEggListModel'
import { HomeADModel } from '../../network/Model/HomeADModel'
import { HomeGamesModel } from '../../network/Model/HomeGamesModel'
import { LotteryGameModel } from '../../network/Model/LotteryGameModel'
import { LotteryNumberModel } from '../../network/Model/LotteryNumberModel'
import { NoticeModel } from '../../network/Model/NoticeModel'
import { RankListModel } from '../../network/Model/RankListModel'
import { RedBagDetailActivityModel } from '../../network/Model/RedBagDetailActivityModel'
import { ScratchListModel } from '../../network/Model/ScratchListModel'
import { TurntableListModel } from '../../network/Model/TurntableListModel'

const localRouters = [
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
  'activity_goldenEggList',
  'activity_scratchList',
  'system_floatAds',
]

const globalRouters = ['game_homeRecommend', 'system_config', 'system_banners', 'system_mobileRight']

interface Value {
  rankList?: RankListModel
  homeGame?: HomeGamesModel
  notice?: NoticeModel
  onlineNum?: number
  couponList?: CouponListModel
  homeAd?: HomeADModel
  lotteryNumber?: LotteryNumberModel
  lotteryGame?: LotteryGameModel
  turntableList?: TurntableListModel
  redBag?: RedBagDetailActivityModel
  floatAd?: FloatADModel
  showOnlineNum?: boolean
  goldenEggList?: GoldenEggListModel
  scratchList?: ScratchListModel
}

const useHome = () => {
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [value, setValue] = useState<Value>({})

  const updateStore = (response: any[]) => {
    const gameLobby = response[13]?.data?.data ?? UGStore.globalProps.gameLobby
    const sys = response[14]?.data?.data ?? UGStore.globalProps.sys
    const banner = response[15]?.data?.data ?? UGStore.globalProps.banner
    const rightMenu = response[16]?.data?.data ?? UGStore.globalProps.rightMenu
    UGStore.dispatch({ type: 'merge', gameLobby, banner, sys, rightMenu })
    UGStore.save()
  }

  const callApis = async () => {
    try {
      !loading && setRefreshing(true)
      const routers = loading ? localRouters : localRouters.concat(globalRouters)
      const response = await Promise.all(
        routers.map(async (router) => {
          try {
            return await APIRouter[router]()
          } catch (error) {
            console.log(router + ' : ' + error)
          }
        })
      )
      !loading && updateStore(response)
      setValue({
        rankList: response[0] ? response[0]?.data : value?.rankList,
        homeGame: response[1] ? response[1]?.data : value?.homeGame,
        notice: response[2] ? response[2]?.data : value?.notice,
        onlineNum: response[3] ? response[3]?.data?.data?.onlineUserCount : value?.onlineNum,
        showOnlineNum: response[3] ? Boolean(response[3]?.data?.data?.onlineSwitch) : Boolean(value?.showOnlineNum),
        couponList: response[4] ? response[4]?.data : value?.couponList,
        homeAd: response[5] ? response[5]?.data : value?.homeAd,
        lotteryNumber: response[6] ? response[6]?.data : value?.lotteryNumber,
        lotteryGame: response[7] ? response[7]?.data : value?.lotteryGame,
        turntableList: response[8] ? response[8]?.data : value?.turntableList,
        redBag: response[9] ? response[9]?.data : value?.redBag,
        goldenEggList: response[10] ? response[10]?.data : value?.goldenEggList,
        scratchList: response[11] ? response[11]?.data : value?.scratchList,
        floatAd: response[12] ? response[12]?.data : value?.floatAd,
      })
    } catch (error) {
      console.log('--------useHome init error--------', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const refresh = callApis

  useEffect(() => {
    callApis()
  }, [])

  return {
    ...value,
    loading,
    refreshing,
    refresh,
  }
}

export default useHome
