"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var react_1 = require("react");
var HomeHeaderButtonBar_1 = require("./component/homePage/HomeHeaderButtonBar");
var useGetHomeInfo_1 = require("../../public/hooks/useGetHomeInfo");
var HomeTabView_1 = require("./component/homePage/HomeTabView");
var ImageButton_1 = require("./component/ImageButton");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var PushHelper_1 = require("../../public/define/PushHelper");
var UGStore_1 = require("../../redux/store/UGStore");
var APIRouter_1 = require("../../public/network/APIRouter");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var AppDefine_1 = require("../../public/define/AppDefine");
var IGlobalStateHelper_1 = require("../../redux/store/IGlobalStateHelper");
var httpClient_1 = require("../../public/network/httpClient");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var Navigation_1 = require("../../public/navigation/Navigation");
var RedBagItem_1 = require("../../public/components/RedBagItem");
var hooks_1 = require("@react-native-community/hooks");
var RankList_1 = require("../../public/widget/RankList");
var PromotionsBlock_1 = require("../../public/components/PromotionsBlock");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var ActivityComponent_1 = require("../../public/components/tars/ActivityComponent");
var tars_1 = require("../../public/tools/tars");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
var DataDefine_1 = require("../../public/define/ANHelper/hp/DataDefine");
var LLHomePage = function (_a) {
    var setProps = _a.setProps, navigation = _a.navigation;
    var _b = useGetHomeInfo_1.default(), rankList = _b.rankList, redBag = _b.redBag, onRefresh = _b.onRefresh, loading = _b.loading, floatAds = _b.floatAds;
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _c = userStore.uid, uid = _c === void 0 ? "" : _c;
    var systemStore = UGStore_1.UGStore.globalProps.sysConf;
    var _d = react_1.useState([]), ads = _d[0], setAds = _d[1];
    var _e = UGStore_1.UGStore.globalProps.sysConf, mobile_logo = _e.mobile_logo, m_promote_pos = _e.m_promote_pos, rankingListSwitch = _e.rankingListSwitch;
    react_1.useEffect(function () {
        var timer = setInterval(function () {
            reloadData();
            IGlobalStateHelper_1.updateUserInfo();
        }, 2000);
        return (function () {
            clearInterval(timer);
        });
    }, []);
    react_1.useEffect(function () {
        var unsubscribe = navigation.addListener('focus', function () {
            setProps();
        });
        return unsubscribe;
    }, [navigation]);
    react_1.useEffect(function () {
        (floatAds === null || floatAds === void 0 ? void 0 : floatAds.data) && setAds(floatAds.data);
    }, [floatAds, uid]);
    var reloadData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = react_native_1.Platform.OS;
                    switch (_a) {
                        case "ios": return [3 /*break*/, 1];
                        case "android": return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                case 2:
                    user = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LOAD_DATA, { key: DataDefine_1.NA_DATA.USER_INFO })];
                case 4:
                    user = _b.sent();
                    return [3 /*break*/, 5];
                case 5:
                    if (!user) {
                        UGStore_1.UGStore.dispatch({ type: 'reset', userInfo: {} });
                        UGStore_1.UGStore.save();
                    }
                    else {
                        UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: user });
                        UGStore_1.UGStore.save();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={{ flex: 1 }}>
            <react_native_1.StatusBar barStyle="dark-content" translucent={true}/>
            <react_native_1.SafeAreaView style={{ flex: 1 }}>
                <react_native_1.ScrollView refreshControl={<react_native_1.RefreshControl style={{ backgroundColor: "#ffffff" }} refreshing={loading} onRefresh={onRefresh}/>} style={{ flex: 1 }}>
                    <HomeHeaderButtonBar_1.HomeHeaderButtonBar logoIcon={mobile_logo}/>
                    <HomeTabView_1.HomeTabView />
                    {m_promote_pos &&
        <>
                        <react_native_1.TouchableOpacity style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 8, marginTop: 10 }} onPress={function () {
            RootNavigation_1.push(Navigation_1.PageName.PromotionListPage);
        }}>
                            <FontAwesome_1.default size={16} name={"gift"}/>
                            <react_native_1.Text style={{ fontSize: 16, color: "#333333", padding: 10 }}>优惠活动</react_native_1.Text>
                            <react_native_1.View style={{ flex: 1 }}/>
                            <react_native_1.Text style={{ fontSize: 16, color: "#333333", textAlign: "center" }}>查看更多>></react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                        <react_native_1.View style={{ backgroundColor: "#ffffff" }}>
                            <PromotionsBlock_1.default horizontal={true} titleVisible={false}/>
                        </react_native_1.View>
                    </>}
                    <ImageButton_1.ImageButton imgStyle={{
        height: 131,
        width: react_native_1.Dimensions.get("screen").width - 16,
        marginHorizontal: 8,
        marginTop: 8
    }} onPress={function () {
        uid === "" ?
            PushHelper_1.default.pushLogin() :
            PushHelper_1.default.pushUserCenterType(5);
    }} uri={'http://test05.6yc.com/views/mobileTemplate/20/images/llhhr.png'}/>
                    {rankingListSwitch === 1 ? <react_native_1.SafeAreaView style={{ marginHorizontal: 10 }}>
                            <react_native_1.View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <FontAwesome_1.default style={{ paddingRight: 4 }} size={16} name={'bar-chart-o'}/>
                                <react_native_1.Text style={{
        fontSize: 16,
        lineHeight: 22,
        color: "#3c3c3c",
        marginVertical: 10
    }}>中奖排行榜</react_native_1.Text>
                            </react_native_1.View>
                            <RankList_1.default titleVisible={false} timing={10000} backgroundColor={'white'} textColor={'black'} width={react_native_1.Dimensions.get("screen").width - 24} ranks={rankList}/>
                        </react_native_1.SafeAreaView> :
        <react_native_1.SafeAreaView style={{ marginHorizontal: 10 }}>
                            <react_native_1.View style={{ flexDirection: 'row', alignItems: "center" }}>
                                <FontAwesome_1.default style={{ paddingRight: 4 }} size={16} name={'bar-chart-o'}/>
                                <react_native_1.Text style={{
            fontSize: 16,
            lineHeight: 22,
            color: "#3c3c3c",
            marginVertical: 10
        }}>投注排行榜</react_native_1.Text>
                            </react_native_1.View>
                            <RankList_1.default titleVisible={false} timing={10000} backgroundColor={'white'} textColor={'black'} width={react_native_1.Dimensions.get("screen").width - 24} ranks={rankList}/>
                        </react_native_1.SafeAreaView>}
                    <react_native_1.View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <react_native_1.Text onPress={function () {
        console.log(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
        PushHelper_1.default.openWebView(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
    }} style={{ color: 'black', textAlign: 'center', marginRight: 20, marginBottom: 5 }}>💻 电 脑
                            版</react_native_1.Text>
                        <react_native_1.Text style={{ color: 'black', textAlign: 'center' }} onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.PromotionListPage);
    }}>🎁优惠活动</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.Text style={{ color: 'black', textAlign: 'center' }}>COPYRIGHT
                        © {systemStore.webName} RESERVED</react_native_1.Text>
                    <react_native_1.View style={{ height: 100 }}/>
                </react_native_1.ScrollView>
            </react_native_1.SafeAreaView>
            {uid === "" && <react_native_1.View style={{
        flexDirection: "row",
        justifyContent: "center",
        position: "absolute",
        width: AppDefine_1.default.width,
        bottom: 120
    }}>
                <react_native_linear_gradient_1.default colors={["#df4133", "#fe695b"]} style={{ borderRadius: 40 }}>
                    <react_native_1.View style={{ flexDirection: "row", justifyContent: "center", padding: 8 }}>
                        <react_native_1.TouchableOpacity style={{ height: 40, justifyContent: "center", paddingHorizontal: 30 }} onPress={function () { return RootNavigation_1.navigate(Navigation_1.PageName.LLLoginPage, {}); }}>
                            <react_native_1.Text style={{ fontSize: 20, color: "#ffffff" }}>登录</react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                        <react_native_1.View style={{ width: 1, backgroundColor: "#ffffff", height: 40 }}/>
                        <react_native_1.TouchableOpacity style={{ height: 40, justifyContent: "center", paddingHorizontal: 30 }} onPress={function () { return RootNavigation_1.push(Navigation_1.PageName.LLRegisterPage); }}>
                            <react_native_1.Text style={{ fontSize: 20, color: "#ffffff" }}>注册</react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                    </react_native_1.View>
                </react_native_linear_gradient_1.default>
            </react_native_1.View>}
            {ads.map(function (item, index) {
        var image = item.image, position = item.position, linkCategory = item.linkCategory, linkPosition = item.linkPosition;
        return (<ActivityComponent_1.default key={index} containerStyle={[tars_1.getActivityPosition(position), position % 2 != 0 ? { top: 260 } : { bottom: 260 }]} enableFastImage={true} show={true} logo={image} onPress={function () {
            PushHelper_1.default.pushCategory(linkCategory, linkPosition);
        }}/>);
    })}
            <RedBagItem_1.default redBag={redBag} style={{ top: 200 }}/>
            <TurntableListItem />
        </react_native_1.View>);
};
exports.default = LLHomePage;
var TurntableListItem = function () {
    var _a = hooks_1.useDimensions().screen, width = _a.width, height = _a.height;
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _b = userStore.isTest, isTest = _b === void 0 ? false : _b, _c = userStore.uid, uid = _c === void 0 ? "" : _c;
    var _d = react_1.useState(false), turntableListVisiable = _d[0], setTurntableListVisiable = _d[1];
    var _e = react_1.useState(), turntableList = _e[0], setTurntableList = _e[1];
    react_1.useEffect(function () {
        if (turntableList && turntableList != null) {
            setTurntableListVisiable(true);
        }
    }, [turntableList]);
    var getTurntableList = function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.activity_turntableList()];
                case 1:
                    res = _b.sent();
                    console.log("res111", (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data);
                    (res === null || res === void 0 ? void 0 : res.data) != null && setTurntableList(res === null || res === void 0 ? void 0 : res.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (uid != "") {
            getTurntableList();
        }
    }, [uid]);
    if (turntableListVisiable && uid && uid != "") {
        return (<react_native_1.TouchableWithoutFeedback onPress={function () {
            if (uid == "") {
                react_native_1.Alert.alert("温馨提示", "您还未登录", [
                    {
                        text: "取消",
                        onPress: function () {
                        },
                        style: "cancel"
                    },
                    {
                        text: "马上登录",
                        onPress: function () {
                            RootNavigation_1.navigate(Navigation_1.PageName.LLLoginPage, {});
                        },
                    }
                ]);
            }
            else if (isTest) {
                react_native_1.Alert.alert("温馨提示", "请先登录您的正式帐号", [
                    {
                        text: "取消",
                        onPress: function () {
                        },
                        style: "cancel"
                    },
                    {
                        text: "马上登录",
                        onPress: function () { return RootNavigation_1.navigate(Navigation_1.PageName.LLLoginPage, {}); }
                    }
                ]);
            }
            else {
                PushHelper_1.default.pushWheel(turntableList === null || turntableList === void 0 ? void 0 : turntableList.data);
            }
        }}>
                <react_native_1.ImageBackground style={{ width: 95, height: 95, position: 'absolute', top: height / 2, right: 20 }} source={{ uri: "dzp_btn" }}>
                    <react_native_1.TouchableWithoutFeedback onPress={function () {
            setTurntableListVisiable(false);
        }}>
                        <react_native_1.Image style={{ width: 20, height: 20, right: 0, top: 0, position: 'absolute' }} source={{ uri: "dialog_close" }}/>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.ImageBackground>
            </react_native_1.TouchableWithoutFeedback>);
    }
    else {
        return null;
    }
};
