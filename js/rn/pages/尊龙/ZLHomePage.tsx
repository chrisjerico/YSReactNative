import { View, useWindowDimensions, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, StyleSheet, Dimensions } from "react-native"
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import FastImage, { FastImageProperties } from "react-native-fast-image"
import { colorEnum, } from "./enum/colorEnum"
import LinearGradient from "react-native-linear-gradient"
import PushHelper from "../../public/define/PushHelper"
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import { UGUserCenterType } from "../../redux/model/全局/UGSysConfModel"
import { Navigation, PageName } from '../../public/navigation/Navigation';
import { useSelector, useDispatch } from "react-redux"
import { IGlobalState } from "../../redux/store/UGStore";
import APIRouter from '../../public/network/APIRouter';
import { HomeGamesModel } from "../../public/network/Model/HomeGamesModel"
import Axios from "axios"
import { BannerModel } from "../../public/network/Model/BannerModel"
import { Icon, Button } from 'react-native-elements';
import { CouponListModel } from "../../public/network/Model/CouponListModel"
import { RankListModel } from "../../public/network/Model/RankListModel"
import { OCHelper } from "../../public/define/OCHelper/OCHelper"
import { httpClient } from "../../public/network/httpClient"
import Carousel from 'react-native-banner-carousel';
import usePopUpView from "../../public/hooks/usePopUpView"
import { IGlobalStateHelper } from "../../redux/store/IGlobalStateHelper"
import { ActionType } from "../../redux/store/ActionTypes"
import UGUserModel from "../../redux/model/全局/UGUserModel"
import { push, navigate } from "../../public/navigation/RootNavigation"
import AppDefine from "../../public/define/AppDefine"
import { RedBagDetailActivityModel } from "../../public/network/Model/RedBagDetailActivityModel"
import { FloatADModel } from "../../public/network/Model/FloatADModel"
const ZLHomePage = ({ navigation }) => {
    const { width, } = useWindowDimensions()
    const [homeGames, setHomeGames] = useState<HomeGamesModel>()
    const [banner, setBanner] = useState<BannerModel>()
    const [notice, setNotice] = useState<{ label: string, value: string }[]>()
    const [originalNoticeString, setOriginalNoticeString] = useState<string>()
    const [couponListData, setCouponListData] = useState<CouponListModel>()
    const [rankList, setRankList] = useState<RankListModel>()
    const { onPopViewPress } = usePopUpView()
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const { uid = "" } = userStore
    const systemStore = useSelector((state: IGlobalState) => state.SysConfReducer)
    const [randomString, setRandomString] = useState(`¥ 2${(Math.random() * 100000).toFixed(2)}`)
    const [onlineNum, setOnlineNum] = useState(0)
    const [redBag, setRedBag] = useState<RedBagDetailActivityModel>()
    const [redBagVisiable, setRedBagVisiable] = useState(false)
    const [floatAds, setFloatAds] = useState<FloatADModel>()
    const init = async () => {
        await OCHelper.call('AppDefine.shared.Host').then((host: string) => {
            httpClient.defaults.baseURL = host

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
                    debugger
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

                }))
                .catch((err) => {
                })
        });

    }

    useEffect(() => {
        const timer = setInterval(() => {
            getRandomString()
        }, 500)
        return (() => clearInterval(timer))
    }, [])
    const getRandomString = () => {
        const num = ((2 + Math.random()) * 100000).toFixed(2)
        setRandomString("¥ " + num)
    }
    useEffect(() => {
        init()
    }, [])
    const thirdPartGamePress = (index1: number, index2: number) => {
        if (uid != "") {
            if (homeGames?.data?.icons?.[index1]?.list?.[index2]) {
                //@ts-ignore
                PushHelper.pushHomeGame(homeGames.data.icons[index1].list[index2])
            }
        } else {
            push(PageName.ZLLoginPage)
        }


    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <ZLHeader />
            <ScrollView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'black' }}>
                {/* <Marquee/> */}
                <UserStatusBar />
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colorEnum.marqueeBg }}>
                    <Icon name="volume-up" type="materialIcon" color="white" size={24} />
                    <MarqueeHorizontal textStyle={{ color: "white", fontSize: 13.2 }} bgContainerStyle={{ backgroundColor: colorEnum.marqueeBg }}
                        width={width - 60}
                        height={34}
                        speed={60}
                        onTextClick={() => {
                            PushHelper.pushNoticePopUp(originalNoticeString)
                        }}

                        textList={notice} />
                </View>

                <AcctountDetail />
                <Banner onlineNum={onlineNum} bannerData={banner} />
                <View style={{ flex: 1, height: 233 / 375 * width, flexDirection: 'row', }}>
                    <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 0, 1)}>
                        <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/agqjt.png" }} style={{
                            flex: 0.6,
                            backgroundColor: 'white', marginRight: 5,
                            borderRadius: 10, paddingLeft: 5, paddingTop: 10,
                            justifyContent: 'space-between'
                        }} >
                            <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>AG旗舰厅</Text>
                            <Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>百家乐 轮盘 骰宝 {'\n'}高额投注 豪客专享</Text>
                        </FastImage>
                    </TouchableWithoutFeedback>

                    <View style={{ flexDirection: 'column', flex: 0.4, justifyContent: 'space-between', borderRadius: 10, }}>
                        <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 0, 1)}>
                            <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/aggjt.png" }} style={{ flex: 6, marginBottom: 5, borderRadius: 10, paddingLeft: 5, paddingTop: 10, }}>
                                <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>AG国际厅</Text>
                            </FastImage>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 3, 0)}>
                            <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/aszrqp.png" }} style={{ flex: 4, borderRadius: 10, paddingLeft: 5, paddingTop: 10, }}>
                                <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>开元棋牌</Text>
                            </FastImage>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 136, marginTop: 7 }}>
                    <View style={{ flex: 0.65, backgroundColor: colorEnum.gameitemBgColor, borderRadius: 10, marginRight: 5, padding: 5 }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <View>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: "#d19881", letterSpacing: 2, marginBottom: 5 }}>电子游戏</Text>
                                <Text style={{ textAlign: 'center', fontSize: 12, color: "#d19881", letterSpacing: 2 }}>奖金池</Text>
                            </View>
                            <View style={{
                                height: "100%", width: "70%", borderRadius: 20,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.8,
                                shadowRadius: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ color: 'white', fontSize: 15 }}>{randomString}</Text>
                            </View>
                        </View>
                        <View style={{ height: 0.5, width: "100%", backgroundColor: "#97989d" }}></View>
                        <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                PushHelper.pushCategory(1, 0)
                            }} style={{ alignItems: 'center' }}>
                                <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/cshj.png" }} />
                                <Text style={{ fontSize: 12, color: "#97989d" }}>财神黄金</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                PushHelper.pushCategory(1, 0)
                            }} style={{ alignItems: 'center' }}>
                                <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/fffl.png" }} />
                                <Text style={{ fontSize: 12, color: "#97989d" }}>发发发龙</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                PushHelper.pushCategory(1, 0)
                            }} style={{ alignItems: 'center' }}>
                                <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/sgbp.png" }} />
                                <Text style={{ fontSize: 12, color: "#97989d" }}>水果爆破</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                PushHelper.pushCategory(1, 0)
                            }} style={{ alignItems: 'center' }}>
                                <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/gdyx.png" }} />
                                <Text style={{ fontSize: 12, color: "#97989d" }}>更多</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 5, 4)}>
                        <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/agbyw.png" }}
                            style={{ flex: 0.35, backgroundColor: 'red', borderRadius: 10, paddingLeft: 5, paddingTop: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>AG捕鱼王</Text>
                            <Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>花式捕鱼 爽快捞金</Text>
                        </FastImage>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flexDirection: 'row', height: 67, marginTop: 7 }}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                        PushHelper.pushCategory(1, 0)
                    }}>
                        <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/lottery.png" }}
                            style={{ borderRadius: 10, paddingVertical: 10, paddingLeft: 5, }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>彩票</Text>
                            <Text style={{ color: "rgba(167,171,179,.99)", fontSize: 12, marginTop: 10 }}>六合彩{'\n'}刮刮乐</Text>
                        </FastImage>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => {
                        PushHelper.pushCategory(6, 1)
                    }}>
                        <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/sport.png" }}
                            style={{ borderRadius: 10, height: 67, paddingLeft: 5, paddingTop: 10 }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>体育</Text>
                        </FastImage>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 1, 3)}>
                        <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/bbinzr.png" }}
                            style={{ flex: 1, backgroundColor: 'red', borderRadius: 10, paddingLeft: 5, paddingTop: 10, }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>BBIN真人</Text>

                        </FastImage>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <View style={{ flexDirection: 'row' }} >
                        <Image style={{ width: 13, height: 13, tintColor: 'white', marginRight: 5 }} source={{ uri: "礼品-(1)" }} />
                        <Text style={{ color: 'white', fontWeight: "bold" }}>优惠活动</Text>
                    </View>
                    <TouchableWithoutFeedback onPress={() => {
                        push(PageName.JDPromotionListPage)
                    }}>
                        <Text style={{ color: 'white', fontWeight: "bold" }}>查看更多>></Text>
                    </TouchableWithoutFeedback>
                </View>
                <FlatList style={{ marginTop: 20 }} data={couponListData?.data?.list?.filter((res, index) => index < 3)} renderItem={({ item }) => {
                    return <TouchableWithoutFeedback onPress={onPopViewPress.bind(null, item, couponListData?.data?.style ?? 'popup')}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', alignSelf: 'flex-start', marginLeft: 10, marginBottom: 5 }}>{item.title}</Text>
                            <FastImageAutoHeight resizeMode={"contain"} style={{ width: width - 40, marginBottom: 10 }} source={{ uri: item.pic }} />
                        </View>
                    </TouchableWithoutFeedback>
                }} />

                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <Image style={{ width: 15, height: 15, tintColor: 'white', marginRight: 5 }} source={{ uri: "outline_analytics_black_18dp" }} />
                    <Text style={{ color: 'white', fontWeight: "bold" }}>投注排行榜</Text>
                </View>
                {systemStore.rankingListSwitch == 0 ? null : <View >
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>用户名称</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>游戏名称</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white' }}>投注金额</Text>
                        </View>
                    </View>
                    <FlatList keyExtractor={(item, index) => {
                        return item.username + index
                    }} style={{ marginTop: 20, height: 200 }} data={rankList?.data?.list ?? []} renderItem={({ item }) => {
                        return <View style={{ flexDirection: 'row', }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>{item.username}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>{item.type}</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'white' }}>{item.coin}</Text>
                            </View>
                        </View>
                    }} />
                </View>}

                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Text onPress={() => {
                        console.log(httpClient.defaults.baseURL + '/index2.php')
                        PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
                    }} style={{ color: 'white', textAlign: 'center', marginRight: 20, marginBottom: 5 }} >💻电脑版</Text>
                    <Text style={{ color: 'white', textAlign: 'center' }} onPress={() => {
                        push(PageName.JDPromotionListPage)
                    }}>🎁优惠活动</Text>
                </View>
                <Text style={{ color: 'white', textAlign: 'center' }}>COPYRIGHT © {systemStore.webName} RESERVED</Text>
                <View style={{ height: 100 }}></View>
            </ScrollView>
        </View >
    )
}
const ZLHeader = () => {
    const { width, height } = useWindowDimensions()
    const insets = useSafeArea();
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const { uid = "" } = userStore
    const sysStore = useSelector((state: IGlobalState) => state.SysConfReducer)
    const { mobile_logo = "" } = sysStore
    return (
        <View style={{
            width, height: 68 + insets.top, paddingTop: insets.top, backgroundColor: colorEnum.mainColor, justifyContent: 'space-between',
            flexDirection: 'row', shadowColor: "white", borderBottomWidth: 0.5, alignItems: 'center'
        }}>
            <FastImage resizeMode={'contain'} style={{ width: 210, height: 58 }} source={{ uri: mobile_logo }} />
            <View style={{ flexDirection: 'row' }}>
                {
                    uid != "" ? <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.站内信)
                    }} style={{ flexDirection: 'column', marginRight: 20 }}>
                        <Icon type={'materialIcon'} color={'white'} name={"notifications"} size={25} />
                        <Text style={{ color: "#8c9ea7" }}>消息</Text>
                    </TouchableOpacity> : null
                }

                <TouchableOpacity onPress={() => {
                    PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
                }} style={{ flexDirection: 'column', marginRight: 20 }}>
                    <FastImage style={{ width: 27, height: 24 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/service1.png" }} />
                    <Text style={{ color: "#8c9ea7" }}>客服</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const UserStatusBar = () => {
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const { uid = "", curLevelTitle, usr, curLevelInt, nextLevelInt } = userStore
    return (
        <LinearGradient colors={colorEnum.gradientColor} style={{ height: 62, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {uid == "" ? <>
                <TouchableWithoutFeedback onPress={() => {
                    push(PageName.ZLLoginPage);
                }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'white' }}>登录</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                    push(PageName.ZLRegisterPage);
                }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: 'white' }}>注册</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        push(PageName.ZLLoginPage);
                    }} style={{ width: '90%', height: "70%", backgroundColor: '#B47265', borderRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <>
                            <Icon name="credit-card" type="materialIcon" color="white" size={24} />
                            <View style={{ backgroundColor: 'white', height: '40%', width: 1 }}></View>
                            <Text style={{ color: 'white' }}>取款</Text>
                        </>
                    </TouchableOpacity >
                </View></> : <TouchableOpacity onPress={() => {
                    navigate(PageName.ZLMinePage, { index: 4 })
                }} style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1, paddingLeft: 10 }}>

                    <FastImage style={{ width: 47, aspectRatio: 1, justifyContent: 'flex-end', alignItems: 'center' }}
                        source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/memberGrade2.png" }} >
                        <Text style={{ marginBottom: 5, color: '#d68b74' }}>{curLevelTitle}</Text>
                    </FastImage>
                    <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between', height: 47 }}>
                        <Text style={{ color: 'white', fontSize: 17 }}>{usr}</Text>
                        <Text style={{ color: 'white', fontSize: 17 }}>距离下一级还差{(parseFloat(nextLevelInt) - parseFloat(curLevelInt)).toFixed(2)}分   </Text>
                    </View>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 20
                    }}>
                        <Icon name="chevron-right" type="materialIcon" color="#8c9ba7" size={24} />
                    </TouchableOpacity>
                </TouchableOpacity>}

        </LinearGradient>
    )
}
const Banner = ({ bannerData, onlineNum = 0 }: { bannerData: BannerModel, onlineNum: number }) => {
    const { width, } = useWindowDimensions()
    const BannerRef = useRef<Carousel>()
    useEffect(() => {
        const timer = setInterval(() => {
            //@ts-ignore
            BannerRef?.current?.gotoNextPage()
        }, 2000);
        return (() => {
            clearInterval(timer)
        })
    }, [bannerData])
    if (bannerData?.data?.list?.length > 0) {
        return (
            <View style={{ marginBottom: 10, }}>

                <Carousel
                    autoplay
                    index={0}
                    ref={BannerRef}
                    loop
                    pageSize={width - 20}
                >
                    {bannerData?.data?.list?.map((res, index) => {
                        return <FastImage key={'banner' + index} style={{ width: width - 20, aspectRatio: 2, borderRadius: 10 }} source={{ uri: res.pic }} >

                        </FastImage>
                    })}
                </Carousel>
                <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 5 }}>
                    <Text style={{ color: 'white' }}>当前在线:{onlineNum}</Text>
                </View>
            </View>
        )

    } else {
        return <View style={{ height: (Dimensions.get("screen").width - 20) / 2, }}></View>
    }

}

const AcctountDetail = () => {
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const { uid = "", balance = 0 } = userStore
    const dispatch = useDispatch()
    const updateUserInfo = useCallback(
        (props: UGUserModel) => dispatch({ type: ActionType.UpdateUserInfo, props: props }),
        [dispatch]
    )

    const requestBalance = async () => {
        try {
            //@ts-ignore
            const { data, status } = await APIRouter.user_balance_token()
            updateUserInfo({ ...userStore, balance: data.data.balance })
        } catch (error) {

        }
    }
    if (uid != "") {
        return (
            <LinearGradient colors={colorEnum.gradientColor}
                style={{ height: 110, marginBottom: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, marginTop: 10, }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: 'space-between', paddingHorizontal: 10, }}>
                    <Text style={{ fontSize: 15, color: 'white', }}>我的账户</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: 'white', marginRight: 20 }}> ¥ {balance}</Text>
                        <TouchableWithoutFeedback onPress={requestBalance}>
                            <Icon name="refresh" type="materialIcon" color="#8c9ba7" size={24} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{ width: "95%", height: 0.5, backgroundColor: "#8c9ba7" }}></View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.存款)
                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/depositlogo.png" }} />
                        <Text style={{ color: 'white', fontSize: 15.5 }}> 存款</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.额度转换)
                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/xima.png" }} />
                        <Text style={{ color: 'white', fontSize: 15.5 }}> 额度转换</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.取款)
                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/withdrawlogo.png" }} />
                        <Text style={{ color: 'white', fontSize: 15.5 }}> 取款</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        )
    } else {
        return null
    }

}
const FastImageAutoHeight = (props: FastImageProperties) => {
    const [picHeight, setPicHeight] = useState(100)
    const { cardMargin, marginHorizontal } = usePopUpView()
    return (
        <FastImage {...props} style={[props.style, { height: picHeight }]} onLoad={(e) => {
            setPicHeight(((AppDefine.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height)
        }} />
    )
}
const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        marginRight: 5,
    }
})
export default ZLHomePage