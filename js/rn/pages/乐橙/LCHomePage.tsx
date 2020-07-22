import * as React from "react";
import { useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    ImageBackground,
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { BannerView } from "./component/homePage/BannerView";
import { HomeHeaderButtonBar } from "./component/homePage/HomeHeaderButtonBar";
import { HomeTabView } from "./component/homePage/homeTabView/HomeTabView";
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo";
import { navigate, push } from "../../public/navigation/RootNavigation";
import { PageName } from "../../public/navigation/Navigation";
import Icon from "react-native-vector-icons/FontAwesome"
import { useDimensions } from "@react-native-community/hooks";
import { OCHelper } from "../../public/define/OCHelper/OCHelper";
import { PromotionsModel } from "../../public/network/Model/PromotionsModel";
import APIRouter from "../../public/network/APIRouter";
import usePopUpView from "../../public/hooks/usePopUpView";
import AutoHeightWebView from "react-native-autoheight-webview";
import FastImage from "react-native-fast-image";
import RedBagItem from "../../public/components/RedBagItem";
import { useSelector } from "react-redux";
import { IGlobalState, UGStore } from "../../redux/store/UGStore";
import { TurntableListModel } from "../../public/network/Model/TurntableListModel";
import { NSValue } from "../../public/define/OCHelper/OCBridge/OCCall";
import AppDefine from "../../public/define/AppDefine";
import PushHelper from "../../public/define/PushHelper";
import { WinningList } from "../../public/components/WinningList";
import { updateUserInfo } from "../../redux/store/IGlobalStateHelper";
import { ActionType } from "../../redux/store/ActionTypes";
import PromotionsBlock from "../../public/components/PromotionsBlock";
import RankListCP from "../../public/widget/RankList";

const LCHomePage = ({ navigation }) => {
    const { banner, notice, rankList, redBag, onlineNum, onRefresh, loading } = useGetHomeInfo()
    const [categories, setCategories] = useState<string[]>()
    const [promotionData, setPromotionData] = useState<PromotionsModel>()
    const { width } = useDimensions().screen
    useEffect(() => {
        initPromotions()
    }, [])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            setTimeout(async () => {
                const user = await OCHelper.call('UGUserModel.currentUser');
                console.log('currrent' + JSON.stringify(user))
                if (!user) {
                    UGStore.dispatch({ type: ActionType.Clear_User, });
                    UGStore.save();
                } else {
                    UGStore.dispatch({ type: ActionType.UpdateUserInfo, props: user });
                    UGStore.save();
                }
            }, 100);


        })
        return unsubscribe
    }, [])
    const initPromotions = async () => {
        try {
            const { data, status } = await APIRouter.system_promotions()
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

    return (
        <View style={{ flex: 1 }}>
            <ScrollView refreshControl={<RefreshControl style={{ backgroundColor: "#ffffff" }} refreshing={loading}
                onRefresh={onRefresh} />}
                style={{ flex: 1 }}>
                <HomeHeaderButtonBar />
                <BannerView
                    list={banner && banner.data ? banner.data.list : []} />
                <View style={{
                    position: 'absolute',
                    top: 90,
                    right: 10,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    borderRadius: 16,
                    padding: 5
                }}>
                    <Text style={{ color: 'white' }}>当前在线:{onlineNum}</Text>
                </View>
                {/*<MarqueeView notice={notice && notice.data ? notice.data.scroll : []}/>*/}
                <HomeTabView />

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon size={16} name={"gift"} />
                    <Text style={{ fontSize: 16, color: "#333333", padding: 10 }} onPress={() => {
                        push(PageName.PromotionListPage)
                    }}>优惠活动</Text>
                    <View style={{ flex: 1 }} />
                    <Text style={{ fontSize: 16, color: "#333333", textAlign: "center" }}>查看更多>></Text>
                </View>
                <View>

                    <PromotionsBlock />
                </View>
                <RankListCP timing={10000} backgroundColor={'white'} textColor={'black'} width={width - 24} ranks={rankList} />
                {/* {rankList && rankList.data.list.length > 0 &&
                    <Text style={{ fontSize: 16, lineHeight: 22, color: "#3c3c3c", marginVertical: 10 }}>中奖排行榜</Text>} */}
                {/* <WinningList data={rankList ? rankList.data.list : []} /> */}

                <View style={{ height: 100 }}></View>
            </ScrollView>

            <RedBagItem redBag={redBag} />
            <TurntableListItem />
        </View>
    )
}

const PromotionLists = ({ dataSource, filter, promotionData }: { dataSource: PromotionsModel, filter?: string, promotionData: PromotionsModel }) => {
    const [selectId, setSelectedId] = useState(-1)
    const { width } = useDimensions().window
    const { onPopViewPress } = usePopUpView()
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
            style={{ backgroundColor: "#ffffff", borderRadius: 10 }}
            keyExtractor={(item, index) => `LCHome` + item.id + index}
            data={filter != "0" ? dataSource.data.list.filter((res, index) => res.category == filter) : dataSource?.data?.list}
            renderItem={({ item, index }) => {
                return <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
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
                            <FastImage style={{ width: Dimensions.get("screen").width - 16, height: 350 }}
                                source={{ uri: item.pic }} />
                        </View>
                    </TouchableWithoutFeedback>
                    {selectId == index ? <AutoHeightWebView
                        style={{ width: width - 20, backgroundColor: 'white' }}
                        viewportContent={'width=device-width, user-scalable=no'}
                        source={webViewSource(item)} /> : null
                    }
                </View>
            }} />
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
                <ImageBackground style={{ width: 95, height: 95, position: 'absolute', top: height / 2, right: 20 }}
                    source={{ uri: "dzp_btn" }}>
                    <TouchableWithoutFeedback onPress={() => {
                        setTurntableListVisiable(false)
                    }}>
                        <Image style={{ width: 20, height: 20, right: 0, top: 0, position: 'absolute' }}
                            source={{ uri: "dialog_close" }} />
                    </TouchableWithoutFeedback>
                </ImageBackground>
            </TouchableWithoutFeedback>)
    } else {
        return null
    }

}

export default LCHomePage
