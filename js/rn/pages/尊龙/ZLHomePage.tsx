import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, StyleSheet, Dimensions, Alert, ImageBackground, Platform, RefreshControl } from "react-native"
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import FastImage, { FastImageProperties } from "react-native-fast-image"
import { colorEnum, } from "./enum/colorEnum"
import LinearGradient from "react-native-linear-gradient"
import PushHelper from "../../public/define/PushHelper"
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import { UGUserCenterType } from "../../redux/model/全局/UGSysConfModel"
import { PageName } from '../../public/navigation/Navigation';
import { IGlobalState, UGStore } from "../../redux/store/UGStore";
import APIRouter from '../../public/network/APIRouter';
import { BannerModel } from "../../public/network/Model/BannerModel"
import { Icon, Button } from 'react-native-elements';
import { httpClient } from "../../public/network/httpClient"
import Carousel from 'react-native-banner-carousel';
import usePopUpView from "../../public/hooks/usePopUpView"
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
import RankListCP from "../../public/widget/RankList";
/**
 * 
 * @param param0     UGLotterySelectController * vc = [UGLotterySelectController new];
    vc.didSelectedItemBlock = ^(UGNextIssueModel *nextModel) {
        [NavController1 pushViewControllerWithNextIssueModel:nextModel];
    };
    UGNavigationController * nav = [[UGNavigationController alloc] initWithRootViewController:vc];
    [self presentViewController:nav animated:true completion:nil];
 */
const ZLHomePage = ({ navigation }) => {
    const { width, } = useDimensions().window
    const { onPopViewPress } = usePopUpView()
    const userStore = UGStore.globalProps.userInfo;
    const { uid = "" } = userStore
    const systemStore = UGStore.globalProps.sysConf;
    const [randomString, setRandomString] = useState(`¥ 2${(Math.random() * 100000).toFixed(2)}`)
    const { banner, notice, homeGames, couponListData, rankList, redBag, floatAds, onlineNum, loading, onRefresh, onlineSwitch } = useGetHomeInfo()
    const [originalNoticeString, setOriginalNoticeString] = useState<string>()
    const [noticeFormat, setnoticeFormat] = useState<{ label: string, value: string }[]>()
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
    }
    const init = async () => {
        try {
            // const {data } = await APIRouter.system_config()
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
    const thirdPartGamePress = (index: number) => {
        if (uid == '') {
            navigate(PageName.ZLLoginPage, {})
        } else {
            PushHelper.pushHomeGame(homeGames?.data?.icons?.[0]?.list?.[index])
        }

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <ZLHeader />
            <ScrollView refreshControl={
                <RefreshControl style={{ backgroundColor: 'black' }} tintColor={'white'} refreshing={loading} onRefresh={onRefresh} />
            } style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'black' }}>
                {/* <Marquee/> */}
                <UserStatusBar />
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colorEnum.marqueeBg, paddingLeft: 5 }}>
                    <Icon name="ios-volume-high" type="ionicon" color="white" size={24} />
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
                <Banner onlineNum={onlineNum} bannerData={banner} onlineSwitch={onlineSwitch} />
                <View style={{ flex: 1, height: 223 / 375 * width, flexDirection: 'row', }}>
                    <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 0)}>
                        <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[0]?.icon }} style={{
                            flex: 0.6,
                            marginRight: 8,
                            borderRadius: 10, paddingLeft: 5, paddingTop: 10,
                            justifyContent: 'space-between'
                        }} >
                            <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>{homeGames?.data?.icons?.[0]?.list?.[0]?.name}</Text>
                            <Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[0]?.subtitle}</Text>
                        </FastImage>
                    </TouchableWithoutFeedback>

                    <View style={{ flexDirection: 'column', flex: 0.4, justifyContent: 'space-between', borderRadius: 10, }}>
                        <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 1)}>
                            <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[1]?.icon }} style={{ flex: 6, marginBottom: 8, borderRadius: 10, paddingLeft: 5, paddingTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>{homeGames?.data?.icons?.[0]?.list?.[1]?.name}</Text>
                                <Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[1]?.subtitle}</Text>
                            </FastImage>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 2)}>
                            <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[2]?.icon }} style={{ flex: 4, borderRadius: 10, paddingLeft: 5, paddingTop: 10, justifyContent: 'space-between' }}>
                                <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>{homeGames?.data?.icons?.[0]?.list?.[2]?.name}</Text>
                                <Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[2]?.subtitle}</Text>
                            </FastImage>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 136, marginTop: 10 }}>
                    <View style={{ flex: 0.65, backgroundColor: colorEnum.gameitemBgColor, borderRadius: 10, marginRight: 8, padding: 5 }}>
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
                            <TouchableOpacity onPress={thirdPartGamePress.bind(null, 3)} style={{ alignItems: 'center' }}>
                                <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: homeGames?.data?.icons?.[0]?.list?.[3]?.icon }} />
                                <Text style={{ fontSize: 12, color: "#97989d" }}>{homeGames?.data?.icons?.[0]?.list?.[3]?.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={thirdPartGamePress.bind(null, 4)} style={{ alignItems: 'center' }}>
                                <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: homeGames?.data?.icons?.[0]?.list?.[4]?.icon }} />
                                <Text style={{ fontSize: 12, color: "#97989d" }}>{homeGames?.data?.icons?.[0]?.list?.[4]?.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={thirdPartGamePress.bind(null, 5)} style={{ alignItems: 'center' }}>
                                <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: homeGames?.data?.icons?.[0]?.list?.[5]?.icon }} />
                                <Text style={{ fontSize: 12, color: "#97989d" }}>{homeGames?.data?.icons?.[0]?.list?.[5]?.name}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={thirdPartGamePress.bind(null, 6)} style={{ alignItems: 'center' }}>
                                <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: homeGames?.data?.icons?.[0]?.list?.[6]?.icon }} />
                                <Text style={{ fontSize: 12, color: "#97989d" }}>{homeGames?.data?.icons?.[0]?.list?.[6]?.name}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 7)}>
                        <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[7]?.icon }}
                            style={{ flex: 0.35, borderRadius: 10, paddingLeft: 5, paddingTop: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>{homeGames?.data?.icons?.[0]?.list?.[7]?.name}</Text>
                            <Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[7]?.subtitle}</Text>
                        </FastImage>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ flexDirection: 'row', height: 67, marginTop: 7 }}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 8)}>
                        <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[8]?.icon }}
                            style={{ borderRadius: 10, paddingVertical: 10, paddingLeft: 5, height: 67, }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[8]?.name}</Text>
                            <Text style={{ color: "rgba(167,171,179,.99)", fontSize: 12, marginTop: 10 }}>{homeGames?.data?.icons?.[0]?.list?.[8]?.subtitle}</Text>
                        </FastImage>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 9)}>
                        <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[9]?.icon }}
                            style={{ borderRadius: 10, height: 67, paddingLeft: 5, paddingTop: 10 }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[9]?.name}</Text>
                            <Text style={{ color: "rgba(167,171,179,.99)", fontSize: 12, marginTop: 10 }}>{homeGames?.data?.icons?.[0]?.list?.[9]?.subtitle}</Text>
                        </FastImage>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 10)}>
                        <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[10]?.icon }}
                            style={{ flex: 1, borderRadius: 10, paddingLeft: 5, paddingTop: 10, height: 67, }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[10]?.name}</Text>
                            <Text style={{ color: "rgba(167,171,179,.99)", fontSize: 12, marginTop: 10 }}>{homeGames?.data?.icons?.[0]?.list?.[10]?.subtitle}</Text>
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

                <FlatList style={{ marginTop: 10 }} data={couponListData?.data?.list?.filter((res, index) => index < 5)} renderItem={({ item, index }) => {
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


                <RankListCP timing={10000} backgroundColor={'black'} textColor={'white'} width={width - 24} ranks={rankList} />

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
    const { isTest = false, uid = "" } = UGStore.globalProps.userInfo;
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
                    if (Platform.OS != 'ios') return;
                    const turntableListModel = Object.assign({ clsName: 'DZPModel' }, turntableList?.[0]);
                    OCHelper.call(({ vc }) => ({
                        vc: {
                            selectors: 'DZPMainView.alloc.initWithFrame:[setItem:]',
                            args1: [NSValue.CGRectMake(100, 100, AppDefine.width - 60, AppDefine.height - 60),],
                            args2: [turntableListModel]
                        },
                        ret: {
                            selectors: 'SGBrowserView.showMoveView:yDistance:',
                            args1: [vc, 100],
                        },
                    }));
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
    const userStore = UGStore.globalProps.userInfo;
    const { uid = "", unreadMsg } = userStore
    const sysStore = UGStore.globalProps.sysConf;
    const { mobile_logo = "" } = sysStore
    return (
        <View style={{
            width, height: 68 + insets.top, paddingTop: insets.top, backgroundColor: colorEnum.mainColor, justifyContent: 'space-between',
            flexDirection: 'row', shadowColor: "#444", borderBottomWidth: 0.5, alignItems: 'center', borderColor: "#444"
        }}>
            <FastImage resizeMode={'contain'} style={{ width: 210, height: 58 }} source={{ uri: mobile_logo }} />
            <View style={{ flexDirection: 'row' }}>
                {
                    uid != "" ? <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.站内信)
                    }} style={{ flexDirection: 'column', marginRight: 20 }}>
                        <Icon type={'materialIcon'} color={'white'} name={"notifications"} size={25} />
                        <Text style={{ color: "#8c9ea7", marginTop: 3 }}>消息</Text>
                        {unreadMsg > 0 ? <View style={{
                            position: 'absolute', right: 0, top: 0, backgroundColor: 'red',
                            height: 15, width: 15,
                            borderRadius: 7.5, justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Text style={{ color: 'white', fontSize: 10 }}>{unreadMsg}</Text>
                        </View> : null}

                    </TouchableOpacity> : null
                }

                <TouchableOpacity onPress={() => {
                    PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
                }} style={{ flexDirection: 'column', marginRight: 20 }}>
                    <FastImage style={{ width: 27, height: 24 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/service1.png" }} />
                    <Text style={{ color: "#8c9ea7", marginTop: 3 }}>客服</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const UserStatusBar = () => {
    const userStore = UGStore.globalProps.userInfo
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
                    PushHelper.pushUserCenterType(UGUserCenterType.我的页);
                }} style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1, paddingLeft: 10 }}>

                    <FastImage style={{ width: 47, aspectRatio: 1, justifyContent: 'flex-end', alignItems: 'center' }}
                        source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/memberGrade2.png" }} >
                        <Text style={{ marginBottom: 5, color: '#d68b74' }}>{userStore.curLevelGrade}</Text>
                    </FastImage>
                    <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between', height: 47 }}>
                        <Text style={{ color: 'white', fontSize: 16 }}>{usr}</Text>
                        <Text style={{ color: 'white', fontSize: 14, fontWeight: "400" }}>{parseInt(userStore.nextLevelInt) - parseInt(userStore.taskRewardTotal) <= 0 ? "恭喜您已经是最高等级" : "距离下一级还差" + (parseInt(userStore.nextLevelInt) - parseInt(userStore.taskRewardTotal)).toFixed(2) + "分"}</Text>
                    </View>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 10
                    }}>
                        <Icon name="chevron-right" type="materialIcon" color="#8c9ba7" size={27} />
                    </TouchableOpacity>
                </TouchableOpacity>}

        </LinearGradient>
    )
}
const Banner = ({ bannerData, onlineNum = 0, onlineSwitch, }: { bannerData: BannerModel, onlineNum: number, onlineSwitch: number, }) => {
    const { width, } = useDimensions().window
    const BannerRef = useRef<Carousel>()
    const [height, setHeight] = useState(100)
    useEffect(() => {
        let timer = null
        if (parseFloat(bannerData?.data?.interval) > 0) {
            timer = setInterval(() => {
                //@ts-ignore
                BannerRef?.current?.gotoNextPage()
            }, parseFloat(bannerData?.data?.interval) * 1000);
        }

        return (() => {
            clearInterval(timer)
        })
    }, [bannerData,])
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
                {onlineSwitch == 1 ? <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 5 }}>
                    <Text style={{ color: 'white' }}>当前在线:{onlineNum}</Text>
                </View> : null}

            </View>
        )

    } else {
        return <View style={{ height: (Dimensions.get("screen").width - 20) / 2, }}></View>
    }

}

const AcctountDetail = () => {
    const userStore = UGStore.globalProps.userInfo
    const { uid = "", balance = 0, isTest } = userStore

    const requestBalance = async () => {
        try {
            OCHelper.call('SVProgressHUD.showWithStatus:', ['正在刷新金额...']);
            //@ts-ignore
            const { data, status } = await APIRouter.user_balance_token()
            UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } })
            OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['刷新成功！']);
        } catch (error) {
            OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '刷新失败请稍后再试']);
        }
    }
    if (uid != "") {
        return (
            <LinearGradient start={{ x: 0.5, y: 0.7 }} colors={colorEnum.gradientColor}
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