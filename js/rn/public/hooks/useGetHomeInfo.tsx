import Axios from 'axios'
import { useEffect, useState } from 'react'
import { OCHelper } from '../define/OCHelper/OCHelper'
import APIRouter from '../network/APIRouter'
import { httpClient } from '../network/httpClient'
import { BannerModel } from '../network/Model/BannerModel'
import { CouponListModel } from '../network/Model/CouponListModel'
import { FloatADModel } from '../network/Model/FloatADModel'
import { HomeADModel } from '../network/Model/HomeADModel'
import { HomeGamesModel } from '../network/Model/HomeGamesModel'
import { LhcdocCategoryListModel } from '../network/Model/LhcdocCategoryListModel'
import { LotteryGameModel } from '../network/Model/LotteryGameModel'
import { LotteryNumberModel } from '../network/Model/LotteryNumberModel'
import { NoticeModel } from '../network/Model/NoticeModel'
import { RankListModel } from '../network/Model/RankListModel'
import { RedBagDetailActivityModel } from '../network/Model/RedBagDetailActivityModel'
import { SystemConfigModel } from '../network/Model/SystemConfigModel'
import { TurntableListModel } from '../network/Model/TurntableListModel'
import { Platform } from 'react-native'
import AppDefine from '../define/AppDefine'
import { NSValue } from '../define/OCHelper/OCBridge/OCCall'
import {ANHelper} from "../define/ANHelper/ANHelper";
import {CMD} from "../define/ANHelper/hp/CmdDefine";

type APIListType =
  | 'game_homeGames'
  | 'system_banners'
  | 'notice_latest'
  | 'system_promotions'
  | 'system_rankingList'
  | 'system_onlineCount'
  | 'activity_redBagDetail'
  | 'system_floatAds'
  | 'lhcdoc_lotteryNumber'
  | 'lhcdoc_categoryList'
  | 'activity_turntableList'
  | 'game_lotteryGames'
  | 'system_config'
  | 'system_homeAds'
const useGetHomeInfo = (coustomArray?: APIListType[]) => {
  const [onlineNum, setOnlineNum] = useState(0)
  const [onlineSwitch, setOnlineSwitch] = useState(0)
  const [redBag, setRedBag] = useState<RedBagDetailActivityModel>()
  const [floatAds, setFloatAds] = useState<FloatADModel>()
  const [homeGames, setHomeGames] = useState<HomeGamesModel>()
  const [banner, setBanner] = useState<BannerModel>()
  const [notice, setNotice] = useState<NoticeModel>()
  const [couponListData, setCouponListData] = useState<CouponListModel>()
  const [rankList, setRankList] = useState<RankListModel>()
  const [loading, setLoading] = useState(true)
  const [lotteryNumber, setLotteryNumber] = useState<LotteryNumberModel>()
  const [categoryList, setCategoryList] = useState<LhcdocCategoryListModel>()
  const [turntableList, setTurntableList] = useState<TurntableListModel>()
  const [lotteryGames, setLotteryGames] = useState<LotteryGameModel>()
  const [systemConfig, setSystemConfig] = useState<SystemConfigModel>()
  const [systemHomeAds, setSystemHomeAds] = useState<HomeADModel>()
  const [originalNoticeString, setOriginalNoticeString] = useState<string>()
  const [noticeFormat, setnoticeFormat] = useState<{ label: string, value: string }[]>()
  useEffect(() => {
    setTimeout(() => {
      init()
    }, 1000);
  }, [])
  useEffect(() => {
    let string = ""
    const noticeData = notice?.data?.scroll?.map((res) => {
      string += res.content
      return { label: res.id, value: res.title }
    }) ?? []
    if (notice?.data?.popup) {
      // openPopup(notice)
    }
    setnoticeFormat(noticeData)
    setOriginalNoticeString(string)
  }, [notice])
  const openPopup = (data: any) => {
    const dataModel = data.data?.popup.map((item, index) => {
      return Object.assign({ clsName: 'UGNoticeModel', hiddenBottomLine: 'No' }, item);

    })
    if (Platform.OS != 'ios') return;
    OCHelper.call('UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show', [NSValue.CGRectMake(20, 60, AppDefine.width - 40, AppDefine.height * 0.8)], [dataModel]);
  }
  const init = () => {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('AppDefine.shared.Host').then((host: string) => {
          initHost(host)
        })
        break;
      case 'android':
        ANHelper.callAsync(CMD.APP_HOST).then((host: string) => {
          initHost(host)
        })
        break;
    }
  }

  const initHost = (host: string) => {
    httpClient.defaults.baseURL = host
    if (coustomArray?.length > 0) {
      let requests = []
      for (const key in coustomArray) {
        if (coustomArray.hasOwnProperty(key)) {
          const element = coustomArray[key]
          requests.push(APIRouter[element]())
        }
      }
      Axios.all(requests)
        .then(
          Axios.spread((...res) => {
            for (const key in coustomArray) {
              if (coustomArray.hasOwnProperty(key)) {
                const element: APIListType = coustomArray[key]
                switch (element) {
                  case 'game_homeGames':
                    setHomeGames(res[key]?.data)
                    break
                  case 'system_banners':
                    setBanner(res[key]?.data)
                    break
                  case 'notice_latest':
                    setNotice(res[key]?.data)
                    break
                  case 'system_promotions':
                    setCouponListData(res[key]?.data)
                    break
                  case 'system_rankingList':
                    setRankList(res[key]?.data)
                    break
                  case 'activity_redBagDetail':
                    setRedBag(res[key]?.data)
                    break
                  case 'system_floatAds':
                    setFloatAds(res[key]?.data)
                    break
                  case 'system_onlineCount':
                    setOnlineNum(res[key]?.data?.data?.onlineUserCount)
                    setOnlineSwitch(res[key]?.data?.data?.onlineSwitch)
                    break
                  case 'lhcdoc_lotteryNumber':
                    setLotteryNumber(res[key]?.data)
                    break
                  case 'lhcdoc_categoryList':
                    setCategoryList(res[key]?.data)
                    break
                  case 'activity_turntableList':
                    setTurntableList(res[key]?.data)
                    break
                  case 'game_lotteryGames':
                    setLotteryGames(res[key]?.data)
                    break
                  case 'system_config':
                    setSystemConfig(res[key]?.data)
                    break
                  case 'system_homeAds':
                    setSystemHomeAds(res[key]?.data)
                    break
                  default:
                    break
                }
              }
              setLoading(false)
            }
          })
        )
        .catch(error => {
          setLoading(false)
          console.log(error)
        })
    } else {
      Axios.all([
        APIRouter.game_homeGames(),
        APIRouter.system_banners(),
        APIRouter.notice_latest(),
        APIRouter.system_promotions(),
        APIRouter.system_rankingList(),
        APIRouter.system_onlineCount(),
        APIRouter.activity_redBagDetail(),
        APIRouter.system_floatAds(),
      ])
        .then(
          Axios.spread((...res) => {
            setHomeGames(res?.[0]?.data)
            setBanner(res?.[1]?.data)
            setCouponListData(res?.[3]?.data)
            setRankList(res?.[4]?.data)
            setRedBag(res?.[6]?.data)
            setFloatAds(res?.[7]?.data)
            setNotice(res?.[2]?.data)
            setOnlineNum(res?.[5]?.data?.data?.onlineUserCount)
            setOnlineSwitch(res[5]?.data?.data?.onlineSwitch)
            setLoading(false)
          })
        )
        .catch(err => {
          setLoading(false)
        })
    }

  }

  const onRefresh = () => {
    init()
  }
  return {
    onlineNum,
    redBag,
    floatAds,
    homeGames,
    banner,
    notice,
    rankList,
    loading,
    couponListData,
    lotteryNumber,
    categoryList,
    turntableList,
    lotteryGames,
    systemConfig,
    systemHomeAds,
    onRefresh,
    noticeFormat,
    originalNoticeString,
    onlineSwitch
  }
}
export default useGetHomeInfo
