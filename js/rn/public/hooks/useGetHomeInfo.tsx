import Axios from 'axios'
import { useEffect, useState } from 'react'
import { OCHelper } from '../define/OCHelper/OCHelper'
import APIRouter from '../network/APIRouter'
import { httpClient } from '../network/httpClient'
import { BannerModel } from '../network/Model/BannerModel'
import { CouponListModel } from '../network/Model/CouponListModel'
import { FloatADModel } from '../network/Model/FloatADModel'
import { HomeGamesModel } from '../network/Model/HomeGamesModel'
import { LotteryNumberModel } from '../network/Model/LotteryNumberModel'
import { RankListModel } from '../network/Model/RankListModel'
import { RedBagDetailActivityModel } from '../network/Model/RedBagDetailActivityModel'
import { NoticeModel } from '../network/Model/NoticeModel'
import { LhcdocCategoryListModel } from '../network/Model/LhcdocCategoryListModel'

type APIListType = 'game_homeGames' | 'system_banners' | 'notice_latest' | 'system_promotions' | 'system_rankingList' | 'system_onlineCount' | 'activity_redBagDetail'
    | 'system_floatAds' | 'lhcdoc_lotteryNumber' | 'lhcdoc_categoryList' 
const useGetHomeInfo = (coustomArray?: APIListType[]) => {
    const [onlineNum, setOnlineNum] = useState(0)
    const [redBag, setRedBag] = useState<RedBagDetailActivityModel>()
    const [floatAds, setFloatAds] = useState<FloatADModel>()
    const [homeGames, setHomeGames] = useState<HomeGamesModel>()
    const [banner, setBanner] = useState<BannerModel>()
    const [notice, setNotice] = useState<NoticeModel>()
    const [couponListData, setCouponListData] = useState<CouponListModel>()
    const [rankList, setRankList] = useState<RankListModel>()
    const [loading, setLoading] = useState(true)
    const [lotteryNumber, setLotteryNumber] = useState<LotteryNumberModel>()
    const[categoryList,setCategoryList]  = useState<LhcdocCategoryListModel>()
    useEffect(() => {
        init()
        console.log("render")
    }, [])
    const init = () => {
        OCHelper.call('AppDefine.shared.Host').then((host: string) => {
            httpClient.defaults.baseURL = host
            if (coustomArray?.length > 0) {
                let requests = []
                for (const key in coustomArray) {
                    if (coustomArray.hasOwnProperty(key)) {
                        const element = coustomArray[key];
                        requests.push(APIRouter[element]())
                    }
                }
                Axios.all(requests)
                    .then(Axios.spread((...res) => {
                        for (const key in coustomArray) {
                            if (coustomArray.hasOwnProperty(key)) {
                                const element: APIListType = coustomArray[key];
                                switch (element) {
                                    case 'game_homeGames':
                                        console.log(res[key].data)
                                        setHomeGames(res[key].data)
                                        break;
                                    case 'system_banners':
                                        setBanner(res[key].data)
                                        break
                                    case 'notice_latest':
                                        setNotice(res[key].data)
                                        break
                                    case 'system_promotions':
                                        setCouponListData(res[key].data)
                                        break
                                    case 'system_rankingList':
                                        setRankList(res[key].data)
                                        break
                                    case 'activity_redBagDetail':
                                        setRedBag(res[key].data)
                                        break
                                    case 'system_floatAds':
                                        setFloatAds(res[key].data)
                                        break
                                    case 'system_onlineCount':
                                        setOnlineNum(res[key].data.data.onlineUserCount)
                                        break
                                    case 'activity_redBagDetail':
                                        setRedBag(res[key].data)
                                        break
                                    case 'lhcdoc_lotteryNumber':
                                        setLotteryNumber(res[key].data)
                                        break
                                    case 'lhcdoc_categoryList':
                                        setCategoryList(res[key].data)
                                        break
                                    default:
                                        break;
                                }
                            }
                        }
                        setLoading(false)
                    }))
                    .catch((error) => {
                        setLoading(false)
                        console.log(error)
                    })
            } else {
                Axios.all([APIRouter.game_homeGames(),
                APIRouter.system_banners(),
                APIRouter.notice_latest(),
                APIRouter.system_promotions(),
                APIRouter.system_rankingList(),
                APIRouter.system_onlineCount(),
                APIRouter.activity_redBagDetail(),
                APIRouter.system_floatAds(),])
                    .then(Axios.spread((...res) => {
                        setHomeGames(res[0].data)
                        setBanner(res[1].data)
                        setCouponListData(res[3].data)
                        setRankList(res[4].data)
                        setRedBag(res[6].data)
                        setFloatAds(res[7].data)
                        setNotice(res[2].data)
                        setOnlineNum(res[5].data.data.onlineUserCount)
                        setLoading(false)
                    }))
                    .catch((err) => {
                        setLoading(false)
                    })
            }


        });
    }
    return { onlineNum, redBag, floatAds, homeGames, banner, notice, rankList, loading, couponListData, lotteryNumber,categoryList }
}
export default useGetHomeInfo