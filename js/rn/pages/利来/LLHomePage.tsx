import {
    Alert,
    Dimensions,
    Image,
    ImageBackground,
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import * as React from "react";
import {useEffect, useState} from "react";
import {HomeHeaderButtonBar} from "./component/homePage/HomeHeaderButtonBar";
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo";
import {HomeTabView} from "./component/homePage/HomeTabView";
import {ImageButton} from "./component/ImageButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import PushHelper from "../../public/define/PushHelper";
import {UGStore} from "../../redux/store/UGStore";
import APIRouter from "../../public/network/APIRouter";
import {PromotionsModel} from "../../public/network/Model/PromotionsModel";
import {OCHelper} from "../../public/define/OCHelper/OCHelper";
import {NSValue} from "../../public/define/OCHelper/OCBridge/OCCall";
import AppDefine from "../../public/define/AppDefine";
import {updateUserInfo} from "../../redux/store/IGlobalStateHelper";
import {httpClient} from "../../public/network/httpClient";
import {navigate, push} from "../../public/navigation/RootNavigation";
import {PageName} from "../../public/navigation/Navigation";
import RedBagItem from "../../public/components/RedBagItem";
import MarqueePopupView from "../common/MarqueePopupView";
import {useDimensions} from "@react-native-community/hooks";
import RankListCP from "../../public/widget/RankList";
import PromotionsBlock from "../../public/components/PromotionsBlock";
import LinearGradient from "react-native-linear-gradient";
import UGUserModel from "../../redux/model/全局/UGUserModel";

const LLHomePage = ({setProps, navigation}) => {
    const {banner, notice, rankList, redBag, onlineNum, onRefresh, loading} = useGetHomeInfo()
    const userStore = UGStore.globalProps.userInfo;
    const { uid = "", usr, balance, isTest }: UGUserModel = userStore
    const sysStore = UGStore.globalProps.sysConf;
    const { mobile_logo = "", rankingListSwitch } = sysStore
    const [originalNoticeString, setOriginalNoticeString] = useState<string>()
    const [noticeFormat, setnoticeFormat] = useState<{ label: string, value: string }[]>()
    const [show, setShow] = useState(false)
    const [content, setContent] = useState("")
    const [promotionData, setPromotionData] = useState<PromotionsModel>()
    const [categories, setCategories] = useState<string[]>()
    const systemStore = UGStore.globalProps.sysConf

    useEffect(() => {
        initPromotions()
        const timer = setInterval(() => {
            reloadData()
            updateUserInfo()
        }, 2000)
        return (() => {
            clearInterval(timer)
        })
    }, [])
    useEffect(() => {
        let string = ""
        const noticeData = notice?.data?.scroll?.map((res) => {
            string += res.content
            return {label: res.id, value: res.title}
        }) ?? []
        if (notice?.data?.popup) {
            openPopup(notice)
        }
        setnoticeFormat(noticeData)
        setOriginalNoticeString(string)
    }, [notice])

    const reloadData = async () => {
        const user = await OCHelper.call('UGUserModel.currentUser');
        if (!user) {
            UGStore.dispatch({ type: 'reset', userInfo:{}});
            UGStore.save();
        } else {
            UGStore.dispatch({ type: 'merge', userInfo:user });
            UGStore.save();
        }
    }
    const openPopup = (data: any) => {
        const dataModel = data.data?.popup.map((item, index) => {
            return Object.assign({clsName: 'UGNoticeModel', hiddenBottomLine: 'No'}, item);

        })
        if (Platform.OS != 'ios') return;
        OCHelper.call('UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show', [NSValue.CGRectMake(20, 60, AppDefine.width - 40, AppDefine.height * 0.8)], [dataModel]);
    }

    const initPromotions = async () => {
        try {
            const {data, status} = await APIRouter.system_promotions()
            debugger
            setPromotionData(data)
            let categoriesArray = []
            data.data.list.map((res) => {
                categoriesArray.push(res.category)
            })
            categoriesArray = [...new Set(categoriesArray)];
            categoriesArray.sort()
            setCategories(categoriesArray)
        } catch (error) {
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setProps()
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{flex: 1}}>
            <ScrollView refreshControl={<RefreshControl style={{backgroundColor: "#ffffff"}} refreshing={loading}
                                                        onRefresh={onRefresh}/>}
                        style={{flex: 1}}>
                <HomeHeaderButtonBar logoIcon={mobile_logo}/>
                <HomeTabView/>
                {sysStore.m_promote_pos && <TouchableOpacity
                    style={{flexDirection: "row", alignItems: "center", marginHorizontal: 8, marginTop: 10}}
                    onPress={() => {
                        push(PageName.PromotionListPage)
                    }}>
                    <Icon size={16} name={"gift"}/>
                    <Text style={{fontSize: 16, color: "#333333", padding: 10}}>优惠活动</Text>
                    <View style={{flex: 1}}/>
                    <Text style={{fontSize: 16, color: "#333333", textAlign: "center"}}>查看更多>></Text>
                </TouchableOpacity>}
                <View style={{backgroundColor: "#ffffff"}}>
                    <PromotionsBlock horizontal={true} titleVisible={false}/>
                </View>
                <ImageButton
                    imgStyle={{
                        height: 131,
                        width: Dimensions.get("screen").width - 16,
                        marginHorizontal: 8,
                        marginTop: 8
                    }}
                    onPress={() => {
                        uid === "" ?
                            PushHelper.pushLogin() :
                            PushHelper.pushUserCenterType(5)
                    }} uri={'http://test05.6yc.com/views/mobileTemplate/20/images/llhhr.png'}/>
                {rankingListSwitch === 1 ? <SafeAreaView style={{marginHorizontal: 10}}>
                        <View style={{flexDirection: 'row', alignItems: "center"}}>
                            <Icon style={{paddingRight: 4}} size={16} name={'bar-chart-o'}/>
                            <Text style={{fontSize: 16, lineHeight: 22, color: "#3c3c3c", marginVertical: 10}}>中奖排行榜</Text>
                        </View>
                        <RankListCP titleVisible={false} timing={10000} backgroundColor={'white'} textColor={'black'}
                                    width={Dimensions.get("screen").width - 24} ranks={rankList}/>
                    </SafeAreaView> :
                    <SafeAreaView style={{marginHorizontal: 10}}>
                        <View style={{flexDirection: 'row', alignItems: "center"}}>
                            <Icon style={{paddingRight: 4}} size={16} name={'bar-chart-o'}/>
                            <Text style={{
                                fontSize: 16,
                                lineHeight: 22,
                                color: "#3c3c3c",
                                marginVertical: 10
                            }}>投注排行榜</Text>
                        </View>
                        <RankListCP titleVisible={false} timing={10000} backgroundColor={'white'} textColor={'black'}
                                    width={Dimensions.get("screen").width - 24} ranks={rankList}/>
                    </SafeAreaView>}
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
                    <Text onPress={() => {
                        console.log(httpClient.defaults.baseURL + '/index2.php')
                        PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
                    }} style={{color: 'black', textAlign: 'center', marginRight: 20, marginBottom: 5}}>💻 电 脑 版</Text>
                    <Text style={{color: 'black', textAlign: 'center'}} onPress={() => {
                        push(PageName.PromotionListPage)
                    }}>🎁优惠活动</Text>
                </View>
                <Text style={{color: 'black', textAlign: 'center'}}>COPYRIGHT © {systemStore.webName} RESERVED</Text>
                <View style={{height: 100}}/>
            </ScrollView>
            {uid === "" && <View style={{
                flexDirection: "row",
                justifyContent: "center",
                position: "absolute",
                width: AppDefine.width,
                bottom: 120
            }}>
                <LinearGradient colors={["#df4133", "#fe695b"]} style={{borderRadius: 40}}>
                    <View style={{flexDirection: "row", justifyContent: "center", padding: 8}}>
                        <TouchableOpacity style={{height: 40, justifyContent: "center", paddingHorizontal: 30}}
                                          onPress={() => navigate(PageName.LLLoginPage, {})}>
                            <Text style={{fontSize: 20, color: "#ffffff"}}>登录</Text>
                        </TouchableOpacity>
                        <View style={{width: 1, backgroundColor: "#ffffff", height: 40}}/>
                        <TouchableOpacity style={{height: 40, justifyContent: "center", paddingHorizontal: 30}}
                                          onPress={() => push(PageName.LLRegisterPage)}>
                            <Text style={{fontSize: 20, color: "#ffffff"}}>注册</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>}
            <RedBagItem redBag={redBag} style={{top: 200}}/>
            <TurntableListItem/>
            <MarqueePopupView onPress={() => {
                setShow(false)
            }} content={content} show={show} onDismiss={() => {
                setShow(false)
            }}/>
        </View>
    )

}

export default LLHomePage

const TurntableListItem = () => {
    const {width, height} = useDimensions().screen
    const userStore = UGStore.globalProps.userInfo
    const {isTest = false, uid = ""} = userStore
    const [turntableListVisiable, setTurntableListVisiable] = useState(false)
    const [turntableList, setTurntableList] = useState<any>()
    useEffect(() => {
        if (turntableList && turntableList != null) {
            setTurntableListVisiable(true)
        }
    }, [turntableList])
    const getTurntableList = async () => {
        try {
            const res = await APIRouter.activity_turntableList()
            setTurntableList(res.data)
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
                        {
                            text: "取消", onPress: () => {
                            }, style: "cancel"
                        },
                        {
                            text: "马上登录", onPress: () => {
                                navigate(PageName.ZLLoginPage, {})
                            },
                        }
                    ])
                } else if (isTest) {
                    Alert.alert("温馨提示", "请先登录您的正式帐号", [
                        {
                            text: "取消", onPress: () => {
                            }, style: "cancel"
                        },
                        {
                            text: "马上登录", onPress: () => PushHelper.pushLogin()
                        }
                    ])
                } else {
                    if (Platform.OS != 'ios') return;
                    const turntableListModel = Object.assign({clsName: 'DZPModel'}, turntableList?.[0]);
                    OCHelper.call(({vc}) => ({
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
                <ImageBackground style={{width: 95, height: 95, position: 'absolute', top: height / 2, right: 20}}
                                 source={{uri: "dzp_btn"}}>
                    <TouchableWithoutFeedback onPress={() => {
                        setTurntableListVisiable(false)
                    }}>
                        <Image style={{width: 20, height: 20, right: 0, top: 0, position: 'absolute'}}
                               source={{uri: "dialog_close"}}/>
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </TouchableWithoutFeedback>)
    } else {
        return null
    }

}
