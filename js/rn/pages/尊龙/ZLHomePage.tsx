import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, StyleSheet, Dimensions, Alert, ImageBackground, Platform } from "react-native"
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import FastImage, { FastImageProperties } from "react-native-fast-image"
import { colorEnum, } from "./enum/colorEnum"
import LinearGradient from "react-native-linear-gradient"
import PushHelper from "../../public/define/PushHelper"
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import { UGUserCenterType } from "../../redux/model/全局/UGSysConfModel"
import { PageName } from '../../public/navigation/Navigation';
import { useSelector, useDispatch } from "react-redux"
import { IGlobalState } from "../../redux/store/UGStore";
import APIRouter from '../../public/network/APIRouter';
import { BannerModel } from "../../public/network/Model/BannerModel"
import { Icon, Button } from 'react-native-elements';
import { httpClient } from "../../public/network/httpClient"
import Carousel from 'react-native-banner-carousel';
import usePopUpView from "../../public/hooks/usePopUpView"
import { ActionType } from "../../redux/store/ActionTypes"
import UGUserModel from "../../redux/model/全局/UGUserModel"
import { push, navigate } from "../../public/navigation/RootNavigation"
import AppDefine from "../../public/define/AppDefine"
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo"
import { useDimensions } from '@react-native-community/hooks'
import useAutoRenewUserInfo from "../../public/hooks/useAutoReNewUserInfo"
import { RedBagDetailActivityModel } from "../../public/network/Model/RedBagDetailActivityModel"
import { OCHelper } from "../../public/define/OCHelper/OCHelper"
import { NSValue } from "../../public/define/OCHelper/OCBridge/OCCall"
import { TurntableListModel } from "../../public/network/Model/TurntableListModel"
import RedBagItem from "../../public/components/RedBagItem"
import { useNavigationState } from "@react-navigation/native"
import AutoHeightWebView from 'react-native-autoheight-webview'
const ZLHomePage = ({ navigation }) => {
    const { width, } = useDimensions().window
    const { onPopViewPress } = usePopUpView()
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const { uid = "" } = userStore
    const systemStore = useSelector((state: IGlobalState) => state.SysConfReducer)
    const [randomString, setRandomString] = useState(`¥ 2${(Math.random() * 100000).toFixed(2)}`)
    const { banner, notice, homeGames, couponListData, rankList, redBag, floatAds, onlineNum, loading, } = useGetHomeInfo()
    const [originalNoticeString, setOriginalNoticeString] = useState<string>()
    const [noticeFormat, setnoticeFormat] = useState<{ label: string, value: string }[]>()
    const state = useNavigationState(state => state);
    const [selectId, setSelectedId] = useState(-1)
    const [show, setShow] = useState(false)
    const [content, setContent] = useState("")
    useEffect(() => {
        let string = ""
        const noticeData = notice?.data?.scroll?.map((res) => {
            string += res.content
            return { label: res.id, value: res.title }
        }) ?? []
        if (notice?.data?.popup) {
            openPopup(notice)
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
        // OCHelper.call("[[UGPlatformNoticeView alloc] initWithFrame:CGRectMake(20, 120, UGScreenW - 40, UGScerrnH - APP.StatusBarHeight - APP.BottomSafeHeight - 160)];")
    }
    const init = async () => {
        try {
            // const { } = await APIRouter.system_config()
            // OCHelper.call("NSNotificationCenter.defaultCenter.postNotificationName:[object:]", ["UGNotificationGetSystemConfigComplete", "nil"])
        } catch (error) {

        }
    }
    const [] = useAutoRenewUserInfo(navigation)
    useEffect(() => {
        init()
        const timer = setInterval(() => {
            getRandomString()
        }, 500)
        return (() => clearInterval(timer))
    }, [])
    const getRandomString = () => {
        const num = ((2 + Math.random()) * 100000).toFixed(2)
        setRandomString("¥ " + num)
    }
    const thirdPartGamePress = (id: string, gameID?: string) => {
        if (uid != "") {
            console.log(homeGames.data.icons)
            const result = homeGames.data.icons.filter((res) => res.id == id)
            if (gameID && result.length > 0) {
                const gameData = result[0].list.filter((res) => res.id == gameID)
                //@ts-ignore
                PushHelper.pushHomeGame(gameData[0])
            } else if (!gameID && result.length > 0) {

            } else {

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
                        speed={40}
                        onTextClick={() => {
                            setShow(true)
                            setContent(originalNoticeString)
                            // PushHelper.pushNoticePopUp(originalNoticeString)
                        }}

                        textList={noticeFormat} />
                </View>

                <AcctountDetail />
                <Banner onlineNum={onlineNum} bannerData={banner} />
                <View style={{ flex: 1, height: 233 / 375 * width, flexDirection: 'row', }}>
                    <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, "2", "38")}>
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
                        <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, "2", "39")}>
                            <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/aggjt.png" }} style={{ flex: 6, marginBottom: 5, borderRadius: 10, paddingLeft: 5, paddingTop: 10, }}>
                                <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>AG国际厅</Text>
                            </FastImage>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, "5", "68")}>
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
                    <TouchableWithoutFeedback style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, "3", "51")}>
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
                    <TouchableOpacity style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, "2", "43")}>
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
                        push(PageName.PromotionListPage)
                    }}>
                        <Text style={{ color: 'white', fontWeight: "bold" }}>{"查看更多>>"}</Text>
                    </TouchableWithoutFeedback>
                </View>

                <FlatList style={{ marginTop: 10 }} data={couponListData?.data?.list?.filter((res, index) => index < 3)} renderItem={({ item, index }) => {
                    return <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                        <TouchableWithoutFeedback onPress={onPopViewPress.bind(null, item, couponListData?.data?.style ?? 'popup', () => {
                            if (selectId == index) {
                                setSelectedId(-1)
                            } else {
                                setSelectedId(index)
                            }
                        })}>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5, color: 'white' }}>{item.title}</Text>
                                <FastImageAutoHeight source={{ uri: item.pic }} />
                            </View>
                        </TouchableWithoutFeedback>
                        {selectId == index ? <AutoHeightWebView
                            style={{ width: width - 20, backgroundColor: 'white' }}
                            // scalesPageToFit={true}
                            viewportContent={'width=device-width, user-scalable=no'}
                            source={{
                                html: `<head>
                        <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>
                        <style>img{width:auto !important;max-width:100%;height:auto !important}</style>
                        <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>
                      </head>` +
                                    `<script>
                        window.onload = function () {
                          window.location.hash = 1;
                          document.title = document.body.scrollHeight;
                        }
                      </script>`+ item.content
                            }}></AutoHeightWebView> : null
                        }

                    </View >
                }} />

                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
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
                        push(PageName.PromotionListPage)
                    }}>🎁优惠活动</Text>
                </View>
                <Text style={{ color: 'white', textAlign: 'center' }}>COPYRIGHT © {systemStore.webName} RESERVED</Text>
                <View style={{ height: 100 }}></View>
            </ScrollView>
            <RedBagItem loginPage={PageName.ZLHomePage} redBag={redBag} />
            <TurntableListItem />
            <MarqueePopupView onPress={() => {
                setShow(false)
            }} content={content} show={show} onDismiss={() => {
                setShow(false)
            }} />
        </View >
    )
}

const TurntableListItem = () => {
    const { width, height } = useDimensions().screen
    const { isTest = false, uid = "" } = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const [turntableListVisiable, setTurntableListVisiable] = useState(false)
    const [turntableList, setTurntableList] = useState<TurntableListModel>()
    useEffect(() => {
        if (turntableList && turntableList != null) {
            setTurntableListVisiable(true)
        }
    }, [turntableList])
    const getTurntableList = async () => {
        try {
            const { data, status } = await APIRouter.activity_turntableList()
            setTurntableList(data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        if (uid != "") {
            getTurntableList()
        }
    }, [uid])
    if (turntableListVisiable) {
        return (
            <TouchableWithoutFeedback onPress={() => {
                if (uid == "") {
                    Alert.alert("温馨提示", "您还未登录", [
                        { text: "取消", onPress: () => { }, style: "cancel" },
                        {
                            text: "马上登录", onPress: () => {
                                navigate(PageName.ZLLoginPage, {})
                            },
                        }
                    ])
                } else if (isTest) {
                    Alert.alert("温馨提示", "请先登录您的正式帐号", [
                        { text: "取消", onPress: () => { }, style: "cancel" },
                        {
                            text: "马上登录", onPress: () => {
                                navigate(PageName.ZLLoginPage, {})
                            },
                        }
                    ])
                } else {
                    PushHelper.pushWheel(turntableList)
                }
            }}>
                <ImageBackground style={{ width: 95, height: 95, position: 'absolute', top: height / 2, right: 20 }} source={{ uri: "dzp_btn" }} >
                    <TouchableWithoutFeedback onPress={() => {
                        setTurntableListVisiable(false)
                    }}>
                        <Image style={{ width: 20, height: 20, right: 0, top: 0, position: 'absolute' }} source={{ uri: "dialog_close" }} />
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </TouchableWithoutFeedback>)
    } else {
        return null
    }

}
const ZLHeader = () => {
    const { width, height } = useDimensions().window
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
    const sysConf = useSelector((state: IGlobalState) => state.SysConfReducer)
    const { mobileMenu } = sysConf
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
                    let index = -1
                    mobileMenu.map((item, i) => {
                        if (item?.path == '/user') {
                            index = i
                        }
                    })
                    navigate(PageName.ZLMinePage, { index: index != -1 ? index : undefined })
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
    const { width, } = useDimensions().window
    const BannerRef = useRef<Carousel>()
    const [height, setHeight] = useState(100)
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
                        return (
                            <TouchableWithoutFeedback onPress={() => {
                                PushHelper.pushCategory(res.linkCategory, res.linkPosition)
                            }}>
                                <FastImage onLoad={(e) => {
                                    console.log(e.nativeEvent.height, e.nativeEvent.width, e.nativeEvent.height * ((width - 20) / e.nativeEvent.width))
                                    setHeight(e.nativeEvent.height * ((width - 20) / e.nativeEvent.width))

                                }} key={'banner' + index} style={{ width: width - 20, height: height, borderRadius: 10 }} source={{ uri: res.pic }} >

                                </FastImage>
                            </TouchableWithoutFeedback>)
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
    const { uid = "", balance = 0, isTest } = userStore
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
                        if (isTest) {
                            Alert.alert("温馨提示", "请先登录您的正式帐号", [
                                { text: "取消", onPress: () => { }, style: "cancel" },
                                {
                                    text: "马上登录", onPress: () => {
                                        navigate(PageName.ZLLoginPage, {})
                                    },
                                }
                            ])
                        } else {
                            PushHelper.pushUserCenterType(UGUserCenterType.存款)
                        }

                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/depositlogo.png" }} />
                        <Text style={{ color: 'white', fontSize: 15.5 }}> 存款</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        if (isTest) {
                            Alert.alert("温馨提示", "请先登录您的正式帐号", [
                                { text: "取消", onPress: () => { }, style: "cancel" },
                                {
                                    text: "马上登录", onPress: () => {
                                        navigate(PageName.ZLLoginPage, {})
                                    },
                                }
                            ])
                        } else {
                            PushHelper.pushUserCenterType(UGUserCenterType.额度转换)
                        }

                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/xima.png" }} />
                        <Text style={{ color: 'white', fontSize: 15.5 }}> 额度转换</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if (isTest) {
                            Alert.alert("温馨提示", "请先登录您的正式帐号", [
                                { text: "取消", onPress: () => { }, style: "cancel" },
                                {
                                    text: "马上登录", onPress: () => {
                                        navigate(PageName.ZLLoginPage, {})
                                    },
                                }
                            ])
                        } else {
                            PushHelper.pushUserCenterType(UGUserCenterType.取款)
                        }

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
const MarqueePopupView = ({ content, show, onPress, onDismiss }) => {
    const { width, height } = useDimensions().screen
    if (show) {
        return (
            <View style={{ width, height, position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1000, marginBottom: 10 }}>
                <View style={{ width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 15 }}>
                    <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
                        <Text style={{ fontSize: 16, fontWeight: "bold" }}>公告详情</Text>
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <AutoHeightWebView style={{ width: width * 0.9 - 20 }} source={{ html: content }}></AutoHeightWebView>
                    </View>
                    <View style={{ height: 70, paddingBottom: 10, paddingHorizontal: 5, justifyContent: 'space-between', width: "100%", flexDirection: 'row' }}>
                        <TouchableOpacity onPress={onDismiss} style={{
                            justifyContent: 'center', alignItems: 'center',
                            width: "47%", height: 50, backgroundColor: 'white',
                            borderRadius: 5, borderColor: "gray", borderWidth: 0.5
                        }}>
                            <Text>取消</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPress} style={{
                            justifyContent: 'center',
                            alignItems: 'center', width: "47%", height: 50,
                            backgroundColor: '#46A3FF', borderRadius: 5,
                            borderColor: "gray", borderWidth: 0.5
                        }}>
                            <Text style={{ color: 'white' }}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
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