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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var HomeHeaderButtonBar_1 = require("./component/homePage/HomeHeaderButtonBar");
var HomeTabView_1 = require("./component/homePage/homeTabView/HomeTabView");
var useGetHomeInfo_1 = require("../../public/hooks/useGetHomeInfo");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var Navigation_1 = require("../../public/navigation/Navigation");
var hooks_1 = require("@react-native-community/hooks");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var APIRouter_1 = require("../../public/network/APIRouter");
var usePopUpView_1 = require("../../public/hooks/usePopUpView");
var react_native_autoheight_webview_1 = require("react-native-autoheight-webview");
var react_native_fast_image_1 = require("react-native-fast-image");
var RedBagItem_1 = require("../../public/components/RedBagItem");
var UGStore_1 = require("../../redux/store/UGStore");
var OCCall_1 = require("../../public/define/OCHelper/OCBridge/OCCall");
var AppDefine_1 = require("../../public/define/AppDefine");
var PushHelper_1 = require("../../public/define/PushHelper");
var IGlobalStateHelper_1 = require("../../redux/store/IGlobalStateHelper");
var ActionTypes_1 = require("../../redux/store/ActionTypes");
var PromotionsBlock_1 = require("../../public/components/PromotionsBlock");
var RankList_1 = require("../../public/widget/RankList");
var react_native_marquee_ab_1 = require("react-native-marquee-ab");
var react_native_banner_carousel_1 = require("react-native-banner-carousel");
var httpClient_1 = require("../../public/network/httpClient");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
var DataDefine_1 = require("../../public/define/ANHelper/hp/DataDefine");
var GameButton_1 = require("../../public/views/tars/GameButton");
var Scale_1 = require("../../public/tools/Scale");
var NavBlock_1 = require("./component/homePage/NavBlock");
var LCHomePage = function (_a) {
    var _b, _c, _d, _e, _f;
    var navigation = _a.navigation;
    var _g = useGetHomeInfo_1.default(), banner = _g.banner, notice = _g.notice, rankList = _g.rankList, redBag = _g.redBag, onlineNum = _g.onlineNum, onRefresh = _g.onRefresh, loading = _g.loading, systemHomeAds = _g.systemHomeAds, homeGames = _g.homeGames;
    var _h = react_1.useState(), categories = _h[0], setCategories = _h[1];
    var _j = UGStore_1.UGStore.globalProps.sysConf, webName = _j.webName, rankingListSwitch = _j.rankingListSwitch;
    var _k = react_1.useState(), promotionData = _k[0], setPromotionData = _k[1];
    var width = hooks_1.useDimensions().screen.width;
    var _l = react_1.useState(), originalNoticeString = _l[0], setOriginalNoticeString = _l[1];
    var _m = react_1.useState(), noticeFormat = _m[0], setnoticeFormat = _m[1];
    var _o = react_1.useState(false), show = _o[0], setShow = _o[1];
    var _p = react_1.useState(""), content = _p[0], setContent = _p[1];
    var _q = react_1.useState("\u00A5 2" + (Math.random() * 100000).toFixed(2)), randomString = _q[0], setRandomString = _q[1];
    react_1.useEffect(function () {
        initPromotions();
        var timer = setInterval(function () {
            getRandomString();
        }, 500);
        return (function () { return clearInterval(timer); });
    }, []);
    var getRandomString = function () {
        var num = ((2 + Math.random()) * 100000).toFixed(2);
        setRandomString("¥ " + num);
    };
    react_1.useEffect(function () {
        var _a, _b, _c, _d;
        var string = "";
        var noticeData = (_c = (_b = (_a = notice === null || notice === void 0 ? void 0 : notice.data) === null || _a === void 0 ? void 0 : _a.scroll) === null || _b === void 0 ? void 0 : _b.map(function (res) {
            string += res.content;
            return { label: res.id, value: res.title };
        })) !== null && _c !== void 0 ? _c : [];
        if ((_d = notice === null || notice === void 0 ? void 0 : notice.data) === null || _d === void 0 ? void 0 : _d.popup) {
            openPopup(notice);
        }
        setnoticeFormat(noticeData);
        setOriginalNoticeString(string);
    }, [notice]);
    var openPopup = function (data) {
        var _a;
        var dataModel = (_a = data.data) === null || _a === void 0 ? void 0 : _a.popup.map(function (item, index) {
            return Object.assign({ clsName: 'UGNoticeModel', hiddenBottomLine: 'No' }, item);
        });
        switch (react_native_1.Platform.OS) {
            case "ios":
                OCHelper_1.OCHelper.call('UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show', [OCCall_1.NSValue.CGRectMake(20, 60, AppDefine_1.default.width - 40, AppDefine_1.default.height * 0.8)], [dataModel]);
                break;
            case "android":
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_POP_NOTICE, data.data);
                break;
        }
    };
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
                        UGStore_1.UGStore.dispatch({ type: ActionTypes_1.ActionType.Clear_User, });
                        UGStore_1.UGStore.save();
                    }
                    else {
                        UGStore_1.UGStore.dispatch({ type: ActionTypes_1.ActionType.UpdateUserInfo, props: user });
                        UGStore_1.UGStore.save();
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        var timer = setInterval(function () {
            reloadData();
            IGlobalStateHelper_1.updateUserInfo();
        }, 2000);
        return (function () {
            clearInterval(timer);
        });
    }, []);
    var initPromotions = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, categoriesArray_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.system_promotions()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_1 = _a.status;
                    debugger;
                    setPromotionData(data);
                    categoriesArray_1 = [];
                    data.data.list.map(function (res) {
                        categoriesArray_1.push(res.category);
                    });
                    categoriesArray_1 = __spreadArrays(new Set(categoriesArray_1));
                    categoriesArray_1.sort();
                    setCategories(categoriesArray_1);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={{ flex: 1 }}>
            <HomeHeaderButtonBar_1.HomeHeaderButtonBar />
            <react_native_1.ScrollView showsVerticalScrollIndicator={false} refreshControl={<react_native_1.RefreshControl style={{ backgroundColor: "#ffffff" }} refreshing={loading} onRefresh={onRefresh}/>}>
                <Banner onlineNum={onlineNum} bannerData={banner}/>
                <react_native_1.View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "white",
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 16,
        paddingLeft: 5
    }}>
                    <react_native_fast_image_1.default source={{ uri: "http://test61f.fhptcdn.com/views/mobileTemplate/19/images/notice.png" }} style={{ width: 12, height: 12, marginRight: 4 }}/>
                    <react_native_marquee_ab_1.MarqueeHorizontal textStyle={{ color: "black", fontSize: 16 }} bgContainerStyle={{ backgroundColor: "white" }} width={width - 50} height={18} speed={60} onTextClick={function () {
        setShow(true);
        setContent(originalNoticeString);
        // PushHelper.pushNoticePopUp(originalNoticeString)
    }} textList={noticeFormat}/>
                </react_native_1.View>
                {(systemHomeAds === null || systemHomeAds === void 0 ? void 0 : systemHomeAds.data) && <Banner onlineNum={onlineNum} bannerData={systemHomeAds} showOnlineCount={false} customHeight={150}/>}
                {((_c = (_b = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _b === void 0 ? void 0 : _b.navs) === null || _c === void 0 ? void 0 : _c.length) > 0 && (<NavBlock_1.default navs={(_f = (_e = (_d = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _d === void 0 ? void 0 : _d.navs) === null || _e === void 0 ? void 0 : _e.sort(function (a, b) { return a.sort - b.sort; })) === null || _f === void 0 ? void 0 : _f.slice(0, 4)} containerStyle={{ alignItems: 'center' }} renderNav={function (item, index) {
        var icon = item.icon, name = item.name, logo = item.logo, gameId = item.gameId;
        return (<GameButton_1.default showSecondLevelIcon={false} key={index} containerStyle={{ width: '25%' }} imageContainerStyle={{ width: '45%' }} enableCircle={false} logo={icon ? icon : logo} title={name} titleStyle={{ fontSize: Scale_1.scale(25) }} titleContainerStyle={{ aspectRatio: 3 }} onPress={function () {
            if (gameId == 9) {
                RootNavigation_1.push(Navigation_1.PageName.JDPromotionListPage, {
                    containerStyle: {
                        backgroundColor: '#ffffff',
                    },
                });
            }
            else {
                PushHelper_1.default.pushHomeGame(item);
            }
        }}/>);
    }}/>)}
                <HomeTabView_1.HomeTabView />
                <react_native_1.View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10 }}>
                    <FontAwesome_1.default style={{ paddingRight: 4 }} size={16} name={"gift"}/>
                    <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.PromotionListPage);
    }}>
                        <react_native_1.Text style={{ fontSize: 16, color: "#333333", lineHeight: 22, marginVertical: 10 }}>优惠活动</react_native_1.Text>
                    </react_native_1.TouchableWithoutFeedback>
                    <react_native_1.View style={{ flex: 1 }}/>
                    <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.PromotionListPage);
    }}>
                        <react_native_1.Text style={{ fontSize: 16, color: "#333333", textAlign: "center" }}>查看更多>></react_native_1.Text>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>
                <react_native_1.View>
                    <PromotionsBlock_1.default />
                </react_native_1.View>
                {rankingListSwitch === 1 ? <react_native_1.SafeAreaView style={{ marginHorizontal: 10 }}>
                        <react_native_1.View style={{ flexDirection: 'row', alignItems: "center" }}>
                            <FontAwesome_1.default style={{ paddingRight: 4 }} size={16} name={'bar-chart-o'}/>
                            <react_native_1.Text style={{ fontSize: 16, lineHeight: 22, color: "#3c3c3c", marginVertical: 10 }}>中奖排行榜</react_native_1.Text>
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
                        <RankList_1.default titleVisible={false} timing={5000} backgroundColor={'white'} textColor={'black'} width={react_native_1.Dimensions.get("screen").width - 24} ranks={rankList}/>
                    </react_native_1.SafeAreaView>}
                <react_native_1.View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                    <react_native_1.Text onPress={function () {
        PushHelper_1.default.openWebView(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
    }} style={{ color: 'black', textAlign: 'center', marginRight: 20, marginBottom: 5 }}>💻 电 脑 版</react_native_1.Text>
                    <react_native_1.Text style={{ color: 'black', textAlign: 'center' }} onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.PromotionListPage);
    }}>🎁优惠活动</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.Text style={{ color: 'black', textAlign: 'center' }}>COPYRIGHT © {webName} RESERVED</react_native_1.Text>
                <react_native_1.Text style={{ color: '#000000', textAlign: 'center' }}>{'VERSION : 01'}</react_native_1.Text>
                <react_native_1.View style={{ height: 100 }}/>
            </react_native_1.ScrollView>
            <RedBagItem_1.default redBag={redBag}/>
            <TurntableListItem />
            <MarqueePopupView onPress={function () {
        setShow(false);
    }} content={content} show={show} onDismiss={function () {
        setShow(false);
    }}/>
        </react_native_1.View>);
};
var PromotionLists = function (_a) {
    var _b;
    var dataSource = _a.dataSource, filter = _a.filter, promotionData = _a.promotionData;
    var _c = react_1.useState(-1), selectId = _c[0], setSelectedId = _c[1];
    var width = hooks_1.useDimensions().window.width;
    var onPopViewPress = usePopUpView_1.default().onPopViewPress;
    var webViewSource = function (item) {
        return {
            html: "<head>\n            <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>\n            <style>img{width:auto !important;max-width:100%;height:auto !important}</style>\n            <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>\n          </head>" +
                "<script>\n            window.onload = function () {\n              window.location.hash = 1;\n              document.title = document.body.scrollHeight;\n            }\n          </script>" + item.content
        };
    };
    return (<react_native_1.FlatList style={{ backgroundColor: "#ffffff", borderRadius: 10 }} keyExtractor={function (item, index) { return "LCHome" + item.id + index; }} data={filter != "0" ? dataSource.data.list.filter(function (res, index) { return res.category == filter; }) : (_b = dataSource === null || dataSource === void 0 ? void 0 : dataSource.data) === null || _b === void 0 ? void 0 : _b.list} renderItem={function (_a) {
        var _b, _c;
        var item = _a.item, index = _a.index;
        return <react_native_1.View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
                    <react_native_1.TouchableWithoutFeedback onPress={onPopViewPress.bind(null, item, (_c = (_b = promotionData === null || promotionData === void 0 ? void 0 : promotionData.data) === null || _b === void 0 ? void 0 : _b.style) !== null && _c !== void 0 ? _c : 'popup', function () {
            if (selectId == index) {
                setSelectedId(-1);
            }
            else {
                setSelectedId(index);
            }
        })}>
                        <react_native_1.View style={{}}>
                            <react_native_1.Text style={{
            fontSize: 16,
            marginBottom: 5,
        }}>{item.title}</react_native_1.Text>
                            <react_native_fast_image_1.default style={{ width: react_native_1.Dimensions.get("screen").width - 16, height: 350 }} source={{ uri: item.pic }}/>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                    {selectId == index ? <react_native_autoheight_webview_1.default style={{ width: width - 20, backgroundColor: 'white' }} viewportContent={'width=device-width, user-scalable=no'} source={webViewSource(item)}/> : null}
                </react_native_1.View>;
    }}/>);
};
var MarqueePopupView = function (_a) {
    var content = _a.content, show = _a.show, onPress = _a.onPress, onDismiss = _a.onDismiss;
    var _b = hooks_1.useDimensions().screen, width = _b.width, height = _b.height;
    if (show) {
        return (<react_native_1.View style={{
            width: width,
            height: height,
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            marginBottom: 10
        }}>
                <react_native_1.View style={{ width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 15 }}>
                    <react_native_1.View style={{
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomColor: "gray",
            borderBottomWidth: 0.5
        }}>
                        <react_native_1.Text style={{ fontSize: 16, fontWeight: "bold" }}>公告详情</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <react_native_autoheight_webview_1.default style={{ width: width * 0.9 - 20 }} source={{ html: content }}></react_native_autoheight_webview_1.default>
                    </react_native_1.View>
                    <react_native_1.View style={{
            height: 70,
            paddingBottom: 10,
            paddingHorizontal: 5,
            justifyContent: 'space-between',
            width: "100%",
            flexDirection: 'row'
        }}>
                        <react_native_1.TouchableWithoutFeedback onPress={onDismiss} style={{
            justifyContent: 'center', alignItems: 'center',
            width: "47%", height: 50, backgroundColor: 'white',
            borderRadius: 5, borderColor: "gray", borderWidth: 0.5
        }}>
                            <react_native_1.Text>取消</react_native_1.Text>
                        </react_native_1.TouchableWithoutFeedback>
                        <react_native_1.TouchableWithoutFeedback onPress={onPress} style={{
            justifyContent: 'center',
            alignItems: 'center', width: "47%", height: 50,
            backgroundColor: '#46A3FF', borderRadius: 5,
            borderColor: "gray", borderWidth: 0.5
        }}>
                            <react_native_1.Text style={{ color: 'white' }}>确定</react_native_1.Text>
                        </react_native_1.TouchableWithoutFeedback>
                    </react_native_1.View>
                </react_native_1.View>

            </react_native_1.View>);
    }
    else {
        return null;
    }
};
var TurntableListItem = function () {
    var _a = hooks_1.useDimensions().screen, width = _a.width, height = _a.height;
    var _b = UGStore_1.UGStore.globalProps.userInfo, _c = _b.isTest, isTest = _c === void 0 ? false : _c, _d = _b.uid, uid = _d === void 0 ? "" : _d;
    var _e = react_1.useState(false), turntableListVisiable = _e[0], setTurntableListVisiable = _e[1];
    var _f = react_1.useState(), turntableList = _f[0], setTurntableList = _f[1];
    react_1.useEffect(function () {
        if (turntableList && turntableList != null) {
            setTurntableListVisiable(true);
        }
    }, [turntableList]);
    var getTurntableList = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_2, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.activity_turntableList()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_2 = _a.status;
                    setTurntableList(data.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
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
    if (turntableListVisiable) {
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
                            RootNavigation_1.navigate(Navigation_1.PageName.ZLLoginPage, {});
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
                        onPress: function () { return PushHelper_1.default.pushLogin(); }
                    }
                ]);
            }
            else {
                if (react_native_1.Platform.OS != 'ios')
                    return;
                var turntableListModel_1 = Object.assign({ clsName: 'DZPModel' }, turntableList === null || turntableList === void 0 ? void 0 : turntableList[0]);
                OCHelper_1.OCHelper.call(function (_a) {
                    var vc = _a.vc;
                    return ({
                        vc: {
                            selectors: 'DZPMainView.alloc.initWithFrame:[setItem:]',
                            args1: [OCCall_1.NSValue.CGRectMake(100, 100, AppDefine_1.default.width - 60, AppDefine_1.default.height - 60),],
                            args2: [turntableListModel_1]
                        },
                        ret: {
                            selectors: 'SGBrowserView.showMoveView:yDistance:',
                            args1: [vc, 100],
                        },
                    });
                });
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
var Banner = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h;
    var bannerData = _a.bannerData, _j = _a.onlineNum, onlineNum = _j === void 0 ? 0 : _j, _k = _a.showOnlineCount, showOnlineCount = _k === void 0 ? true : _k, customHeight = _a.customHeight;
    var width = hooks_1.useDimensions().window.width;
    var BannerRef = React.useRef();
    var _l = react_1.useState(100), height = _l[0], setHeight = _l[1];
    react_1.useEffect(function () {
        var _a, _b, _c, _d;
        var timer = setInterval(function () {
            var _a;
            //@ts-ignore
            (_a = BannerRef === null || BannerRef === void 0 ? void 0 : BannerRef.current) === null || _a === void 0 ? void 0 : _a.gotoNextPage();
        }, ((_a = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _a === void 0 ? void 0 : _a.interval) ?
            parseInt((_b = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _b === void 0 ? void 0 : _b.interval) : parseInt((_c = bannerData === null || bannerData === void 0 ? void 0 : bannerData.info) === null || _c === void 0 ? void 0 : _c.runtime) ? parseInt((_d = bannerData === null || bannerData === void 0 ? void 0 : bannerData.info) === null || _d === void 0 ? void 0 : _d.runtime) : 2000);
        return (function () {
            clearInterval(timer);
        });
    }, [bannerData]);
    react_1.useEffect(function () {
        customHeight && setHeight(customHeight);
    }, [customHeight]);
    if (((_c = (_b = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _b === void 0 ? void 0 : _b.list) === null || _c === void 0 ? void 0 : _c.length) > 0 || ((_d = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _d === void 0 ? void 0 : _d.length) > 0) {
        return (<react_native_1.View style={{ marginBottom: 10, }}>
                <react_native_banner_carousel_1.default autoplay index={0} ref={BannerRef} loop pageSize={width}>
                    {((_e = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _e === void 0 ? void 0 : _e.list) ? (_g = (_f = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _f === void 0 ? void 0 : _f.list) === null || _g === void 0 ? void 0 : _g.map(function (res, index) {
            return (<react_native_1.TouchableWithoutFeedback onPress={function () {
                PushHelper_1.default.pushCategory(res.linkCategory, res.linkPosition);
            }}>
                                <react_native_fast_image_1.default onLoad={function (e) {
                setHeight(e.nativeEvent.height * ((width) / e.nativeEvent.width));
            }} key={'banner' + index} style={{ width: width, height: height, }} source={{ uri: res.pic }}>

                                </react_native_fast_image_1.default>
                            </react_native_1.TouchableWithoutFeedback>);
        }) : (_h = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _h === void 0 ? void 0 : _h.map(function (res, index) {
            return (<react_native_1.TouchableWithoutFeedback onPress={function () {
                PushHelper_1.default.pushCategory(res.linkCategory, res.linkPosition);
            }}>
                                <react_native_fast_image_1.default onLoad={function (e) {
                setHeight(e.nativeEvent.height * ((width) / e.nativeEvent.width));
            }} key={'banner' + index} style={{ width: width, height: height, }} source={{ uri: res.image }}>

                                </react_native_fast_image_1.default>
                            </react_native_1.TouchableWithoutFeedback>);
        })}
                </react_native_banner_carousel_1.default>
                {showOnlineCount && <react_native_1.View style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: "rgba(0,0,0,0.2)",
            borderRadius: 16,
            padding: 5
        }}>
                    <react_native_1.Text style={{ color: 'white' }}>当前在线:{onlineNum}</react_native_1.Text>
                </react_native_1.View>}
            </react_native_1.View>);
    }
    else {
        return <react_native_1.View style={{ height: (react_native_1.Dimensions.get("screen").width) / 2 }}/>;
    }
};
exports.default = LCHomePage;
