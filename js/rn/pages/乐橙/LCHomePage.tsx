import * as React from "react";
import {useEffect, useState} from "react";
import {
    Alert,
    Dimensions,
    FlatList, Image, ImageBackground, Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {BannerView} from "./component/homePage/BannerView";
import {MarqueeView} from "./component/homePage/MarqueeView";
import {HomeHeaderButtonBar} from "./component/homePage/HomeHeaderButtonBar";
import {WinningListView} from "./component/homePage/WinningListView";
import {HomeTabView} from "./component/homePage/homeTabView/HomeTabView";
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo";
import {navigate, push} from "../../public/navigation/RootNavigation";
import {PageName} from "../../public/navigation/Navigation";
import Icon from "react-native-vector-icons/FontAwesome"
import {useDimensions} from "@react-native-community/hooks";
import {useSafeArea} from "react-native-safe-area-context";
import {useNavigationState} from "@react-navigation/native";
import {OCHelper} from "../../public/define/OCHelper/OCHelper";
import {PromotionsModel} from "../../public/network/Model/PromotionsModel";
import APIRouter from "../../public/network/APIRouter";
import ScrollableTabView from "react-native-scrollable-tab-view";
import usePopUpView from "../../public/hooks/usePopUpView";
import AutoHeightWebView from "react-native-autoheight-webview";
import FastImage from "react-native-fast-image";
import RedBagItem from "../../public/components/RedBagItem";
import {useSelector} from "react-redux";
import {IGlobalState} from "../../redux/store/UGStore";
import {TurntableListModel} from "../../public/network/Model/TurntableListModel";
import {NSValue} from "../../public/define/OCHelper/OCBridge/OCCall";
import AppDefine from "../../public/define/AppDefine";
import PushHelper from "../../public/define/PushHelper";

const LCHomePage = () => {
    const {banner, notice, rankList, redBag} = useGetHomeInfo()
    const [marquee, setMarquee] = useState<string[]>([])
    const state = useNavigationState(state => state);
    const [categories, setCategories] = useState<string[]>()
    const [promotionData, setPromotionData] = useState<PromotionsModel>()
    const [currentNativeSelectedTab, setCurrentNativeSelectedTab] = useState(-1)
    useEffect(() => {
        notice && getMarquee()
    }, [notice])

    useEffect(() => {
        initPromotions()
    }, [])

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

    const getMarquee = () => {
        let arr = []
        notice && notice.data && notice.data.scroll.map((item) => {
            arr.push(item.content)
        })
        setMarquee(arr)
    }

    return (
        <ScrollView bounces={false} style={{flex: 1}}>
            <HomeHeaderButtonBar/>
            <BannerView
                list={banner && banner.data ? banner.data.list : []}/>
            <MarqueeView textArr={marquee}/>
            <HomeTabView/>
            <SafeAreaView style={{marginHorizontal: 10}}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Icon size={16} name={"gift"}/>
                    <Text style={{fontSize: 16, color: "#333333", padding: 10}} onPress={() => {
                        push(PageName.PromotionListPage)
                    }}>优惠活动</Text>
                    <View style={{flex: 1}}/>
                    <Text style={{fontSize: 16, color: "#333333", textAlign: "center"}}>查看更多>></Text>
                </View>
                <View>
                    {categories?.map((res) => {
                        return <PromotionLists promotionData={promotionData}
                                               dataSource={promotionData} filter={res}/>
                    })}
                </View>
                <Text style={{fontSize: 16, lineHeight: 22, color: "#3c3c3c", marginVertical: 10}}>中奖排行榜</Text>
                <WinningListView data={rankList ? rankList.data.list : []}/>
                <RedBagItem redBag={redBag} />
                <TurntableListItem />
            </SafeAreaView>
        </ScrollView>
    )
}

const PromotionLists = ({dataSource, filter, promotionData}: { dataSource: PromotionsModel, filter?: string, promotionData: PromotionsModel }) => {
    const [selectId, setSelectedId] = useState(-1)
    const {width} = useDimensions().window
    const {onPopViewPress} = usePopUpView()
    const webViewSource = (item: any) => {
        return {
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
          </script>` + item.content
        }
    }
    return (
        <FlatList
            style={{backgroundColor: "#ffffff", borderRadius: 10}}
            keyExtractor={(item, index) => `LCHome` + item.id + index}
            data={filter != "0" ? dataSource.data.list.filter((res) => res.category == filter) : dataSource?.data?.list}
            renderItem={({item, index}) => {
                return <View style={{paddingHorizontal: 10, marginBottom: 20}}>
                    <TouchableWithoutFeedback
                        onPress={onPopViewPress.bind(null, item, promotionData?.data?.style ?? 'popup', () => {
                            if (selectId == index) {
                                setSelectedId(-1)
                            } else {
                                setSelectedId(index)
                            }
                        })}>
                        <View style={{}}>
                            <Text style={{
                                fontSize: 16,
                                marginBottom: 5,
                            }}>{item.title}</Text>
                            <FastImage style={{width: Dimensions.get("screen").width - 16, height: 350}}
                                       source={{uri: item.pic}}/>
                        </View>
                    </TouchableWithoutFeedback>
                    {selectId == index ? <AutoHeightWebView
                        style={{width: width - 20, backgroundColor: 'white'}}
                        viewportContent={'width=device-width, user-scalable=no'}
                        source={webViewSource(item)}/> : null
                    }
                </View>
            }}/>
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
                            text: "马上登录", onPress: () => PushHelper.pushLogin()
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

export default LCHomePage
