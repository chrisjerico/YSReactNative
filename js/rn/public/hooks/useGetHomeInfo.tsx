import React, { useEffect, useState } from 'react'
import { RedBagDetailActivityModel } from '../network/Model/RedBagDetailActivityModel'
import { FloatADModel } from '../network/Model/FloatADModel'
import { HomeGamesModel } from '../network/Model/HomeGamesModel'
import { BannerModel } from '../network/Model/BannerModel'
import { RankListModel } from '../network/Model/RankListModel'
import { CouponListModel } from '../network/Model/CouponListModel'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { httpClient } from '../network/httpClient'
import Axios from 'axios'
import APIRouter from '../network/APIRouter'
type APIListType = 'game_homeGames' | 'system_banners' | 'notice_latest' | 'system_promotions' | 'system_rankingList' | 'system_onlineCount' | 'activity_redBagDetail'
    | 'system_floatAds'
const useGetHomeInfo = (coustomArray?: APIListType[]) => {
    const [onlineNum, setOnlineNum] = useState(0)
    const [redBag, setRedBag] = useState<RedBagDetailActivityModel>()
    const [redBagVisiable, setRedBagVisiable] = useState(false)
    const [floatAds, setFloatAds] = useState<FloatADModel>()
    const [homeGames, setHomeGames] = useState<HomeGamesModel>()
    const [banner, setBanner] = useState<BannerModel>()
    const [notice, setNotice] = useState<{ label: string, value: string }[]>()
    const [originalNoticeString, setOriginalNoticeString] = useState<string>()
    const [couponListData, setCouponListData] = useState<CouponListModel>()
    const [rankList, setRankList] = useState<RankListModel>()
    const [loading, setLoading] = useState(true)
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
                                        debugger
                                        let noticeString = ""
                                        const noticeData = res[key].data.data.scroll.map((res) => {
                                            noticeString += res.content
                                            return { label: res.id, value: res.title }
                                        })
                                        setOriginalNoticeString(noticeString)
                                        setNotice(noticeData)
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
                APIRouter.system_floatAds()])
                    .then(Axios.spread((...res) => {
                        setHomeGames(res[0].data)
                        setBanner(res[1].data)
                        setCouponListData(res[3].data)
                        setRankList(res[4].data)
                        setRedBag(res[6].data)
                        setFloatAds(res[7].data)
                        let noticeString = ""
                        const noticeData = res[2].data.data.scroll.map((res) => {
                            noticeString += res.content
                            return { label: res.id, value: res.title }
                        })
                        console.log(couponListData.data.list)
                        setOriginalNoticeString(noticeString)
                        setNotice(noticeData)
                        setOnlineNum(res[5].data.data.onlineUserCount)
                        setLoading(false)
                    }))
                    .catch((err) => {
                        setLoading(false)
                    })
            }


        });
    }
    return { onlineNum, redBag, redBagVisiable, floatAds, homeGames, banner, notice, originalNoticeString, rankList, loading, couponListData }
}
export default useGetHomeInfo