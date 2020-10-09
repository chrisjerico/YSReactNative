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
var react_1 = require("react");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_native_fast_image_1 = require("react-native-fast-image");
var colorEnum_1 = require("./enum/colorEnum");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var PushHelper_1 = require("../../public/define/PushHelper");
var react_native_marquee_ab_1 = require("react-native-marquee-ab");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var Navigation_1 = require("../../public/navigation/Navigation");
var UGStore_1 = require("../../redux/store/UGStore");
var APIRouter_1 = require("../../public/network/APIRouter");
var react_native_elements_1 = require("react-native-elements");
var httpClient_1 = require("../../public/network/httpClient");
var usePopUpView_1 = require("../../public/hooks/usePopUpView");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var AppDefine_1 = require("../../public/define/AppDefine");
var useGetHomeInfo_1 = require("../../public/hooks/useGetHomeInfo");
var hooks_1 = require("@react-native-community/hooks");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var OCCall_1 = require("../../public/define/OCHelper/OCBridge/OCCall");
var RedBagItem_1 = require("../../public/components/RedBagItem");
var react_native_autoheight_webview_1 = require("react-native-autoheight-webview");
var RankList_1 = require("../../public/widget/RankList");
var Banner_1 = require("./CP/Banner");
var UgLog_1 = require("../../public/tools/UgLog");
var UGLoadingCP_1 = require("../../public/widget/UGLoadingCP");
var ToastUtils_1 = require("../../public/tools/ToastUtils");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
/**
 *
 * @param param0     UGLotterySelectController * vc = [UGLotterySelectController new];
    vc.didSelectedItemBlock = ^(UGNextIssueModel *nextModel) {
        [NavController1 pushViewControllerWithNextIssueModel:nextModel];
    };
    UGNavigationController * nav = [[UGNavigationController alloc] initWithRootViewController:vc];
    [self presentViewController:nav animated:true completion:nil];
 */
var ZLHomePage = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101, _102, _103, _104, _105, _106, _107, _108, _109, _110, _111, _112, _113, _114, _115, _116, _117, _118, _119, _120, _121, _122, _123;
    var navigation = _a.navigation, setProps = _a.setProps;
    var width = hooks_1.useDimensions().window.width;
    var onPopViewPress = usePopUpView_1.default().onPopViewPress;
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _124 = userStore.uid, uid = _124 === void 0 ? "" : _124;
    var systemStore = UGStore_1.UGStore.globalProps.sysConf;
    var _125 = react_1.useState("\u00A5 2" + (Math.random() * 100000).toFixed(2)), randomString = _125[0], setRandomString = _125[1];
    var _126 = useGetHomeInfo_1.default(), banner = _126.banner, notice = _126.notice, homeGames = _126.homeGames, couponListData = _126.couponListData, rankList = _126.rankList, redBag = _126.redBag, floatAds = _126.floatAds, onlineNum = _126.onlineNum, loading = _126.loading, onRefresh = _126.onRefresh, onlineSwitch = _126.onlineSwitch;
    var _127 = react_1.useState(), originalNoticeString = _127[0], setOriginalNoticeString = _127[1];
    var _128 = react_1.useState(), noticeFormat = _128[0], setnoticeFormat = _128[1];
    var _129 = react_1.useState(-1), selectId = _129[0], setSelectedId = _129[1];
    var _130 = react_1.useState(false), show = _130[0], setShow = _130[1];
    var _131 = react_1.useState(""), content = _131[0], setContent = _131[1];
    var onPromotionItemPress = function (data, type, onPress) {
        if ((data === null || data === void 0 ? void 0 : data.linkUrl) != "") {
            react_native_1.Linking.openURL(data === null || data === void 0 ? void 0 : data.linkUrl);
        }
        else if (data.linkCategory == 0 && data.linkPosition == 0) {
            onPopViewPress(data, type, onPress ? onPress : function () { });
        }
        else {
            PushHelper_1.default.pushCategory(data.linkCategory, data.linkPosition);
        }
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
            case 'ios':
                OCHelper_1.OCHelper.call('UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show', [OCCall_1.NSValue.CGRectMake(20, 60, AppDefine_1.default.width - 40, AppDefine_1.default.height * 0.8)], [dataModel]);
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_POP_NOTICE, data.data);
                break;
        }
    };
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                // const {data } = await APIRouter.system_config()
                // OCHelper.call("NSNotificationCenter.defaultCenter.postNotificationName:[object:]", ["UGNotificationGetSystemConfigComplete", "nil"])
            }
            catch (error) {
            }
            return [2 /*return*/];
        });
    }); };
    react_1.useEffect(function () {
        setProps({
            didFocus: function () { return __awaiter(void 0, void 0, void 0, function () {
                var userInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, APIRouter_1.default.user_info()];
                        case 1:
                            userInfo = (_a.sent()).data;
                            UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data });
                            setProps();
                            UGStore_1.UGStore.save();
                            return [2 /*return*/];
                    }
                });
            }); }
        });
        init();
        var timer = setInterval(function () {
            getRandomString();
        }, 500);
        return (function () { return clearInterval(timer); });
    }, []);
    var getRandomString = function () {
        var num = ((2 + Math.random()) * 100000).toFixed(2);
        setRandomString("¥ " + num);
    };
    var thirdPartGamePress = function (index) {
        var _a, _b, _c, _d;
        if (uid == '') {
            RootNavigation_1.navigate(Navigation_1.PageName.ZLLoginPage, {});
        }
        else {
            PushHelper_1.default.pushHomeGame((_d = (_c = (_b = (_a = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _a === void 0 ? void 0 : _a.icons) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.list) === null || _d === void 0 ? void 0 : _d[index]);
        }
    };
    return (<react_native_1.View style={{ flex: 1, backgroundColor: 'black' }}>
            <ZLHeader />
            <react_native_1.ScrollView refreshControl={<react_native_1.RefreshControl style={{ backgroundColor: 'black' }} tintColor={'white'} refreshing={loading} onRefresh={onRefresh}/>} style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'black' }}>
                
                <UserStatusBar />
                <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colorEnum_1.colorEnum.marqueeBg, paddingLeft: 5 }}>
                    <react_native_elements_1.Icon name="ios-volume-high" type="ionicon" color="white" size={24}/>
                    <react_native_marquee_ab_1.MarqueeHorizontal textStyle={{ color: "white", fontSize: 13.2 }} bgContainerStyle={{ backgroundColor: colorEnum_1.colorEnum.marqueeBg }} width={width - 60} height={34} speed={40} onTextClick={function () {
        setShow(true);
        setContent(originalNoticeString);
        // PushHelper.pushNoticePopUp(originalNoticeString)
    }} textList={noticeFormat}/>
                </react_native_1.View>

                <AcctountDetail />
                <Banner_1.default style={{ marginBottom: 10 }} size={{ width: width - 20, height: 0 }} onlineNum={onlineNum} bannerData={banner} onlineSwitch={onlineSwitch}/>
                <react_native_1.View style={{ flex: 1, height: 223 / 375 * width, flexDirection: 'row', }}>
                    <react_native_1.TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 0)}>
                        <react_native_fast_image_1.default source={{ uri: (_f = (_e = (_d = (_c = (_b = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _b === void 0 ? void 0 : _b.icons) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.list) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.icon }} style={{
        flex: 0.6,
        marginRight: 8,
        borderRadius: 10, paddingLeft: 5, paddingTop: 10,
        justifyContent: 'space-between'
    }}>
                            <react_native_1.Text style={{ color: colorEnum_1.colorEnum.titleColor, fontSize: 16.5 }}>{(_l = (_k = (_j = (_h = (_g = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _g === void 0 ? void 0 : _g.icons) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.list) === null || _k === void 0 ? void 0 : _k[0]) === null || _l === void 0 ? void 0 : _l.name}</react_native_1.Text>
                            <react_native_1.Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>{(_r = (_q = (_p = (_o = (_m = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _m === void 0 ? void 0 : _m.icons) === null || _o === void 0 ? void 0 : _o[0]) === null || _p === void 0 ? void 0 : _p.list) === null || _q === void 0 ? void 0 : _q[0]) === null || _r === void 0 ? void 0 : _r.subtitle}</react_native_1.Text>
                        </react_native_fast_image_1.default>
                    </react_native_1.TouchableWithoutFeedback>

                    <react_native_1.View style={{ flexDirection: 'column', flex: 0.4, justifyContent: 'space-between', borderRadius: 10, }}>
                        <react_native_1.TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 1)}>
                            <react_native_fast_image_1.default source={{ uri: (_w = (_v = (_u = (_t = (_s = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _s === void 0 ? void 0 : _s.icons) === null || _t === void 0 ? void 0 : _t[0]) === null || _u === void 0 ? void 0 : _u.list) === null || _v === void 0 ? void 0 : _v[1]) === null || _w === void 0 ? void 0 : _w.icon }} style={{ flex: 6, marginBottom: 8, borderRadius: 10, paddingLeft: 5, paddingTop: 10, justifyContent: 'space-between' }}>
                                <react_native_1.Text style={{ color: colorEnum_1.colorEnum.titleColor, fontSize: 16.5 }}>{(_1 = (_0 = (_z = (_y = (_x = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _x === void 0 ? void 0 : _x.icons) === null || _y === void 0 ? void 0 : _y[0]) === null || _z === void 0 ? void 0 : _z.list) === null || _0 === void 0 ? void 0 : _0[1]) === null || _1 === void 0 ? void 0 : _1.name}</react_native_1.Text>
                                <react_native_1.Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>{(_6 = (_5 = (_4 = (_3 = (_2 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _2 === void 0 ? void 0 : _2.icons) === null || _3 === void 0 ? void 0 : _3[0]) === null || _4 === void 0 ? void 0 : _4.list) === null || _5 === void 0 ? void 0 : _5[1]) === null || _6 === void 0 ? void 0 : _6.subtitle}</react_native_1.Text>
                            </react_native_fast_image_1.default>
                        </react_native_1.TouchableWithoutFeedback>
                        <react_native_1.TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 2)}>
                            <react_native_fast_image_1.default source={{ uri: (_11 = (_10 = (_9 = (_8 = (_7 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _7 === void 0 ? void 0 : _7.icons) === null || _8 === void 0 ? void 0 : _8[0]) === null || _9 === void 0 ? void 0 : _9.list) === null || _10 === void 0 ? void 0 : _10[2]) === null || _11 === void 0 ? void 0 : _11.icon }} style={{ flex: 4, borderRadius: 10, paddingLeft: 5, paddingTop: 10, justifyContent: 'space-between' }}>
                                <react_native_1.Text style={{ color: colorEnum_1.colorEnum.titleColor, fontSize: 16.5 }}>{(_16 = (_15 = (_14 = (_13 = (_12 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _12 === void 0 ? void 0 : _12.icons) === null || _13 === void 0 ? void 0 : _13[0]) === null || _14 === void 0 ? void 0 : _14.list) === null || _15 === void 0 ? void 0 : _15[2]) === null || _16 === void 0 ? void 0 : _16.name}</react_native_1.Text>
                                <react_native_1.Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>{(_21 = (_20 = (_19 = (_18 = (_17 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _17 === void 0 ? void 0 : _17.icons) === null || _18 === void 0 ? void 0 : _18[0]) === null || _19 === void 0 ? void 0 : _19.list) === null || _20 === void 0 ? void 0 : _20[2]) === null || _21 === void 0 ? void 0 : _21.subtitle}</react_native_1.Text>
                            </react_native_fast_image_1.default>
                        </react_native_1.TouchableWithoutFeedback>
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={{ flexDirection: 'row', height: 136, marginTop: 10 }}>
                    <react_native_1.View style={{ flex: 0.65, backgroundColor: colorEnum_1.colorEnum.gameitemBgColor, borderRadius: 10, marginRight: 8, padding: 5 }}>
                        <react_native_1.View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <react_native_1.View>
                                <react_native_1.Text style={{ textAlign: 'center', fontSize: 12, color: "#d19881", letterSpacing: 2, marginBottom: 5 }}>电子游戏</react_native_1.Text>
                                <react_native_1.Text style={{ textAlign: 'center', fontSize: 12, color: "#d19881", letterSpacing: 2 }}>奖金池</react_native_1.Text>
                            </react_native_1.View>
                            <react_native_1.View style={{
        height: "100%", width: "70%", borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }}>
                                <react_native_1.Text style={{ color: 'white', fontSize: 15 }}>{randomString}</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>
                        <react_native_1.View style={{ height: 0.5, width: "100%", backgroundColor: "#97989d" }}></react_native_1.View>
                        <react_native_1.View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                            <react_native_1.TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 3)}>
                                <react_native_1.View style={{ alignItems: 'center' }}>
                                    <react_native_fast_image_1.default style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: (_26 = (_25 = (_24 = (_23 = (_22 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _22 === void 0 ? void 0 : _22.icons) === null || _23 === void 0 ? void 0 : _23[0]) === null || _24 === void 0 ? void 0 : _24.list) === null || _25 === void 0 ? void 0 : _25[3]) === null || _26 === void 0 ? void 0 : _26.icon }}/>
                                    <react_native_1.Text style={{ fontSize: 12, color: "#97989d" }}>{(_31 = (_30 = (_29 = (_28 = (_27 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _27 === void 0 ? void 0 : _27.icons) === null || _28 === void 0 ? void 0 : _28[0]) === null || _29 === void 0 ? void 0 : _29.list) === null || _30 === void 0 ? void 0 : _30[3]) === null || _31 === void 0 ? void 0 : _31.name}</react_native_1.Text>
                                </react_native_1.View>
                            </react_native_1.TouchableWithoutFeedback>
                            <react_native_1.TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 4)}>
                                <react_native_1.View style={{ alignItems: 'center' }}>
                                    <react_native_fast_image_1.default style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: (_36 = (_35 = (_34 = (_33 = (_32 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _32 === void 0 ? void 0 : _32.icons) === null || _33 === void 0 ? void 0 : _33[0]) === null || _34 === void 0 ? void 0 : _34.list) === null || _35 === void 0 ? void 0 : _35[4]) === null || _36 === void 0 ? void 0 : _36.icon }}/>
                                    <react_native_1.Text style={{ fontSize: 12, color: "#97989d" }}>{(_41 = (_40 = (_39 = (_38 = (_37 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _37 === void 0 ? void 0 : _37.icons) === null || _38 === void 0 ? void 0 : _38[0]) === null || _39 === void 0 ? void 0 : _39.list) === null || _40 === void 0 ? void 0 : _40[4]) === null || _41 === void 0 ? void 0 : _41.name}</react_native_1.Text>
                                </react_native_1.View>
                            </react_native_1.TouchableWithoutFeedback>
                            <react_native_1.TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 5)}>
                                <react_native_1.View style={{ alignItems: 'center' }}>
                                    <react_native_fast_image_1.default style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: (_46 = (_45 = (_44 = (_43 = (_42 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _42 === void 0 ? void 0 : _42.icons) === null || _43 === void 0 ? void 0 : _43[0]) === null || _44 === void 0 ? void 0 : _44.list) === null || _45 === void 0 ? void 0 : _45[5]) === null || _46 === void 0 ? void 0 : _46.icon }}/>
                                    <react_native_1.Text style={{ fontSize: 12, color: "#97989d" }}>{(_51 = (_50 = (_49 = (_48 = (_47 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _47 === void 0 ? void 0 : _47.icons) === null || _48 === void 0 ? void 0 : _48[0]) === null || _49 === void 0 ? void 0 : _49.list) === null || _50 === void 0 ? void 0 : _50[5]) === null || _51 === void 0 ? void 0 : _51.name}</react_native_1.Text>
                                </react_native_1.View>
                            </react_native_1.TouchableWithoutFeedback>
                            <react_native_1.TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 6)}>
                                <react_native_1.View style={{ alignItems: 'center' }}>
                                    <react_native_fast_image_1.default style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: (_56 = (_55 = (_54 = (_53 = (_52 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _52 === void 0 ? void 0 : _52.icons) === null || _53 === void 0 ? void 0 : _53[0]) === null || _54 === void 0 ? void 0 : _54.list) === null || _55 === void 0 ? void 0 : _55[6]) === null || _56 === void 0 ? void 0 : _56.icon }}/>
                                    <react_native_1.Text style={{ fontSize: 12, color: "#97989d" }}>{(_61 = (_60 = (_59 = (_58 = (_57 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _57 === void 0 ? void 0 : _57.icons) === null || _58 === void 0 ? void 0 : _58[0]) === null || _59 === void 0 ? void 0 : _59.list) === null || _60 === void 0 ? void 0 : _60[6]) === null || _61 === void 0 ? void 0 : _61.name}</react_native_1.Text>
                                </react_native_1.View>
                            </react_native_1.TouchableWithoutFeedback>
                        </react_native_1.View>
                    </react_native_1.View>
                    <react_native_1.TouchableWithoutFeedback style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 7)}>
                        <react_native_fast_image_1.default source={{ uri: (_66 = (_65 = (_64 = (_63 = (_62 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _62 === void 0 ? void 0 : _62.icons) === null || _63 === void 0 ? void 0 : _63[0]) === null || _64 === void 0 ? void 0 : _64.list) === null || _65 === void 0 ? void 0 : _65[7]) === null || _66 === void 0 ? void 0 : _66.icon }} style={{ flex: 0.35, borderRadius: 10, paddingLeft: 5, paddingTop: 10, justifyContent: 'space-between' }}>
                            <react_native_1.Text style={{ color: colorEnum_1.colorEnum.titleColor, fontSize: 16.5 }}>{(_71 = (_70 = (_69 = (_68 = (_67 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _67 === void 0 ? void 0 : _67.icons) === null || _68 === void 0 ? void 0 : _68[0]) === null || _69 === void 0 ? void 0 : _69.list) === null || _70 === void 0 ? void 0 : _70[7]) === null || _71 === void 0 ? void 0 : _71.name}</react_native_1.Text>
                            <react_native_1.Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>{(_76 = (_75 = (_74 = (_73 = (_72 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _72 === void 0 ? void 0 : _72.icons) === null || _73 === void 0 ? void 0 : _73[0]) === null || _74 === void 0 ? void 0 : _74.list) === null || _75 === void 0 ? void 0 : _75[7]) === null || _76 === void 0 ? void 0 : _76.subtitle}</react_native_1.Text>
                        </react_native_fast_image_1.default>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>
                <react_native_1.View style={{ flexDirection: 'row', height: 67, marginTop: 7 }}>
                    <react_native_1.TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 8)}>
                        <react_native_1.View style={styles.buttonContainer}>
                            <react_native_fast_image_1.default source={{ uri: (_81 = (_80 = (_79 = (_78 = (_77 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _77 === void 0 ? void 0 : _77.icons) === null || _78 === void 0 ? void 0 : _78[0]) === null || _79 === void 0 ? void 0 : _79.list) === null || _80 === void 0 ? void 0 : _80[8]) === null || _81 === void 0 ? void 0 : _81.icon }} style={{ borderRadius: 10, paddingVertical: 10, paddingLeft: 5, height: 67, }}>
                                <react_native_1.Text style={{ color: colorEnum_1.colorEnum.titleColor, fontSize: 12 }}>{(_86 = (_85 = (_84 = (_83 = (_82 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _82 === void 0 ? void 0 : _82.icons) === null || _83 === void 0 ? void 0 : _83[0]) === null || _84 === void 0 ? void 0 : _84.list) === null || _85 === void 0 ? void 0 : _85[8]) === null || _86 === void 0 ? void 0 : _86.name}</react_native_1.Text>
                                <react_native_1.Text style={{ color: "rgba(167,171,179,.99)", fontSize: 12, marginTop: 10 }}>{(_91 = (_90 = (_89 = (_88 = (_87 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _87 === void 0 ? void 0 : _87.icons) === null || _88 === void 0 ? void 0 : _88[0]) === null || _89 === void 0 ? void 0 : _89.list) === null || _90 === void 0 ? void 0 : _90[8]) === null || _91 === void 0 ? void 0 : _91.subtitle}</react_native_1.Text>
                            </react_native_fast_image_1.default>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                    <react_native_1.TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 9)}>
                        <react_native_1.View style={styles.buttonContainer}>
                            <react_native_fast_image_1.default source={{ uri: (_96 = (_95 = (_94 = (_93 = (_92 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _92 === void 0 ? void 0 : _92.icons) === null || _93 === void 0 ? void 0 : _93[0]) === null || _94 === void 0 ? void 0 : _94.list) === null || _95 === void 0 ? void 0 : _95[9]) === null || _96 === void 0 ? void 0 : _96.icon }} style={{ borderRadius: 10, height: 67, paddingLeft: 5, paddingTop: 10 }}>
                                <react_native_1.Text style={{ color: colorEnum_1.colorEnum.titleColor, fontSize: 12 }}>{(_101 = (_100 = (_99 = (_98 = (_97 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _97 === void 0 ? void 0 : _97.icons) === null || _98 === void 0 ? void 0 : _98[0]) === null || _99 === void 0 ? void 0 : _99.list) === null || _100 === void 0 ? void 0 : _100[9]) === null || _101 === void 0 ? void 0 : _101.name}</react_native_1.Text>
                                <react_native_1.Text style={{ color: "rgba(167,171,179,.99)", fontSize: 12, marginTop: 10 }}>{(_106 = (_105 = (_104 = (_103 = (_102 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _102 === void 0 ? void 0 : _102.icons) === null || _103 === void 0 ? void 0 : _103[0]) === null || _104 === void 0 ? void 0 : _104.list) === null || _105 === void 0 ? void 0 : _105[9]) === null || _106 === void 0 ? void 0 : _106.subtitle}</react_native_1.Text>
                            </react_native_fast_image_1.default>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                    <react_native_1.TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 10)}>
                        <react_native_1.View style={styles.buttonContainer}>
                            <react_native_fast_image_1.default source={{ uri: (_111 = (_110 = (_109 = (_108 = (_107 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _107 === void 0 ? void 0 : _107.icons) === null || _108 === void 0 ? void 0 : _108[0]) === null || _109 === void 0 ? void 0 : _109.list) === null || _110 === void 0 ? void 0 : _110[10]) === null || _111 === void 0 ? void 0 : _111.icon }} style={{ flex: 1, borderRadius: 10, paddingLeft: 5, paddingTop: 10, height: 67, }}>
                                <react_native_1.Text style={{ color: colorEnum_1.colorEnum.titleColor, fontSize: 12 }}>{(_116 = (_115 = (_114 = (_113 = (_112 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _112 === void 0 ? void 0 : _112.icons) === null || _113 === void 0 ? void 0 : _113[0]) === null || _114 === void 0 ? void 0 : _114.list) === null || _115 === void 0 ? void 0 : _115[10]) === null || _116 === void 0 ? void 0 : _116.name}</react_native_1.Text>
                                <react_native_1.Text style={{ color: "rgba(167,171,179,.99)", fontSize: 12, marginTop: 10 }}>{(_121 = (_120 = (_119 = (_118 = (_117 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _117 === void 0 ? void 0 : _117.icons) === null || _118 === void 0 ? void 0 : _118[0]) === null || _119 === void 0 ? void 0 : _119.list) === null || _120 === void 0 ? void 0 : _120[10]) === null || _121 === void 0 ? void 0 : _121.subtitle}</react_native_1.Text>
                            </react_native_fast_image_1.default>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>
                <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <react_native_1.View style={{ flexDirection: 'row' }}>
                        <react_native_1.Image style={{ width: 13, height: 13, tintColor: 'white', marginRight: 5 }} source={{ uri: "礼品-(1)" }}/>
                        <react_native_1.Text style={{ color: 'white', fontWeight: "bold" }}>优惠活动</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.JDPromotionListPage);
    }}>
                        <react_native_1.Text style={{ color: 'white', fontWeight: "bold" }}>{"查看更多>>"}</react_native_1.Text>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>

                <react_native_1.FlatList style={{ marginTop: 10 }} data={(_123 = (_122 = couponListData === null || couponListData === void 0 ? void 0 : couponListData.data) === null || _122 === void 0 ? void 0 : _122.list) === null || _123 === void 0 ? void 0 : _123.filter(function (res, index) { return index < 5; })} renderItem={function (_a) {
        var _b, _c;
        var item = _a.item, index = _a.index;
        return <react_native_1.View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
                        <react_native_1.TouchableWithoutFeedback onPress={onPromotionItemPress.bind(null, item, (_c = (_b = couponListData === null || couponListData === void 0 ? void 0 : couponListData.data) === null || _b === void 0 ? void 0 : _b.style) !== null && _c !== void 0 ? _c : 'popup', function () {
            if (selectId == index) {
                setSelectedId(-1);
            }
            else {
                setSelectedId(index);
            }
        })}>
                            <react_native_1.View>
                                <react_native_1.Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5, color: 'white' }}>{item.title}</react_native_1.Text>
                                <FastImageAutoHeight source={{ uri: item.pic }}/>
                            </react_native_1.View>
                        </react_native_1.TouchableWithoutFeedback>
                        {selectId == index ? <react_native_autoheight_webview_1.default style={{ width: width - 20, backgroundColor: 'white' }} 
        // scalesPageToFit={true}
        viewportContent={'width=device-width, user-scalable=no'} source={{
            html: "<head>\n                        <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>\n                        <style>img{width:auto !important;max-width:100%;height:auto !important}</style>\n                        <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>\n                      </head>" +
                "<script>\n                        window.onload = function () {\n                          window.location.hash = 1;\n                          document.title = document.body.scrollHeight;\n                        }\n                      </script>" + item.content
        }}></react_native_autoheight_webview_1.default> : null}

                    </react_native_1.View>;
    }}/>


                <RankList_1.default timing={10000} backgroundColor={'black'} textColor={'white'} width={width - 24} ranks={rankList}/>

                <react_native_1.View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <react_native_1.Text onPress={function () {
        console.log(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
        PushHelper_1.default.openWebView(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
    }} style={{ color: 'white', textAlign: 'center', marginRight: 20, marginBottom: 5 }}>💻电脑版</react_native_1.Text>
                    <react_native_1.Text style={{ color: 'white', textAlign: 'center' }} onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.JDPromotionListPage);
    }}>🎁优惠活动</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.Text style={{ color: 'white', textAlign: 'center' }}>COPYRIGHT © {systemStore.webName} RESERVED</react_native_1.Text>
                <react_native_1.View style={{ height: 100 }}></react_native_1.View>
            </react_native_1.ScrollView>
            <RedBagItem_1.default loginPage={Navigation_1.PageName.ZLLoginPage} redBag={redBag}/>
            <TurntableListItem />
            <MarqueePopupView onPress={function () {
        setShow(false);
    }} content={content} show={show} onDismiss={function () {
        setShow(false);
    }}/>
        </react_native_1.View>);
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
        var _a, data, status_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.activity_turntableList()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_1 = _a.status;
                    setTurntableList(data.data);
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
    if (turntableListVisiable) {
        return (<react_native_1.TouchableWithoutFeedback onPress={function () {
            if (uid == "") {
                react_native_1.Alert.alert("温馨提示", "您还未登录", [
                    { text: "取消", onPress: function () { }, style: "cancel" },
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
                    { text: "取消", onPress: function () { }, style: "cancel" },
                    {
                        text: "马上登录",
                        onPress: function () {
                            RootNavigation_1.navigate(Navigation_1.PageName.ZLLoginPage, {});
                        },
                    }
                ]);
            }
            else {
                var turntableListModel_1 = Object.assign({ clsName: 'DZPModel' }, turntableList === null || turntableList === void 0 ? void 0 : turntableList[0]);
                switch (react_native_1.Platform.OS) {
                    case 'ios':
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
                        break;
                    case 'android':
                        //TODO
                        break;
                }
            }
        }}>
                <react_native_1.ImageBackground style={{ width: 70, height: 70, position: 'absolute', top: height * 0.4 + 95, right: 20 }} source={{ uri: "dzp_btn" }}>
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
var ZLHeader = function () {
    var _a = hooks_1.useDimensions().window, width = _a.width, height = _a.height;
    var insets = react_native_safe_area_context_1.useSafeArea();
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _b = userStore.uid, uid = _b === void 0 ? "" : _b, unreadMsg = userStore.unreadMsg;
    var sysStore = UGStore_1.UGStore.globalProps.sysConf;
    var _c = sysStore.mobile_logo, mobile_logo = _c === void 0 ? "" : _c;
    var topDistance = 0;
    switch (react_native_1.Platform.OS) {
        case 'ios':
            topDistance = insets.top;
            break;
        case 'android':
            //原生处理了 安全区域，RN 不需要处理
            break;
    }
    return (<react_native_1.View style={{
        width: width,
        height: 68 + topDistance, paddingTop: topDistance, backgroundColor: colorEnum_1.colorEnum.mainColor, justifyContent: 'space-between',
        flexDirection: 'row', shadowColor: "#444", borderBottomWidth: 0.5, alignItems: 'center', borderColor: "#444"
    }}>
            <FastImageAutoWidth style={{ width: 210, height: 50 }} source={{ uri: mobile_logo }}/>
            <react_native_1.View style={{ flexDirection: 'row' }}>
                {uid != "" ? <react_native_1.TouchableOpacity onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.站内信);
    }} style={{ flexDirection: 'column', marginRight: 20 }}>
                        <react_native_elements_1.Icon type={'materialIcon'} color={'white'} name={"notifications"} size={25}/>
                        <react_native_1.Text style={{ color: "#8c9ea7", marginTop: 3 }}>消息</react_native_1.Text>
                        {unreadMsg > 0 ? <react_native_1.View style={{
        position: 'absolute', right: 0, top: 0, backgroundColor: 'red',
        height: 15, width: 15,
        borderRadius: 7.5, justifyContent: 'center', alignItems: 'center'
    }}>
                            <react_native_1.Text style={{ color: 'white', fontSize: 10 }}>{unreadMsg}</react_native_1.Text>
                        </react_native_1.View> : null}

                    </react_native_1.TouchableOpacity> : null}

                <react_native_1.TouchableOpacity onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服);
    }} style={{ flexDirection: 'column', marginRight: 20 }}>
                    <react_native_fast_image_1.default style={{ width: 27, height: 24 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/service1.png" }}/>
                    <react_native_1.Text style={{ color: "#8c9ea7", marginTop: 3 }}>客服</react_native_1.Text>
                </react_native_1.TouchableOpacity>
            </react_native_1.View>
        </react_native_1.View>);
};
var UserStatusBar = function () {
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _a = userStore.uid, uid = _a === void 0 ? "" : _a, curLevelTitle = userStore.curLevelTitle, usr = userStore.usr, curLevelInt = userStore.curLevelInt, nextLevelInt = userStore.nextLevelInt;
    return (<react_native_linear_gradient_1.default colors={colorEnum_1.colorEnum.gradientColor} style={{ height: 62, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            {uid == "" ? <>
                <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.ZLLoginPage);
    }}>
                    <react_native_1.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <react_native_1.Text style={{ fontSize: 18, color: 'white' }}>登录</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.TouchableWithoutFeedback>
                <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.ZLRegisterPage);
    }}>
                    <react_native_1.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <react_native_1.Text style={{ fontSize: 18, color: 'white' }}>注册</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.TouchableWithoutFeedback>
                <react_native_1.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <react_native_1.TouchableOpacity onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.ZLLoginPage);
    }} style={{ width: '90%', height: "70%", backgroundColor: '#B47265', borderRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <>
                            <react_native_elements_1.Icon name="credit-card" type="materialIcon" color="white" size={24}/>
                            <react_native_1.View style={{ backgroundColor: 'white', height: '40%', width: 1 }}></react_native_1.View>
                            <react_native_1.Text style={{ color: 'white' }}>取款</react_native_1.Text>
                        </>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View></> : <react_native_1.TouchableOpacity onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.我的页);
    }} style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1, paddingLeft: 10 }}>

                    <react_native_fast_image_1.default style={{ width: 47, aspectRatio: 1, justifyContent: 'flex-end', alignItems: 'center' }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/memberGrade2.png" }}>
                        <react_native_1.Text style={{ marginBottom: 5, color: '#d68b74' }}>{userStore.curLevelGrade}</react_native_1.Text>
                    </react_native_fast_image_1.default>
                    <react_native_1.View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between', height: 47 }}>
                        <react_native_1.Text style={{ color: 'white', fontSize: 16 }}>{usr}</react_native_1.Text>
                        <react_native_1.Text style={{ color: 'white', fontSize: 14, fontWeight: "400" }}>{parseInt(userStore.nextLevelInt) - parseInt(userStore.taskRewardTotal) <= 0 ? "恭喜您已经是最高等级" : "距离下一级还差" + (parseInt(userStore.nextLevelInt) - parseInt(userStore.taskRewardTotal)).toFixed(2) + "分"}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.TouchableOpacity style={{
        position: 'absolute',
        bottom: 0,
        right: 10
    }}>
                        <react_native_elements_1.Icon name="chevron-right" type="materialIcon" color="#8c9ba7" size={27}/>
                    </react_native_1.TouchableOpacity>
                </react_native_1.TouchableOpacity>}

        </react_native_linear_gradient_1.default>);
};
var AcctountDetail = function () {
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _a = userStore.uid, uid = _a === void 0 ? "" : _a, _b = userStore.balance, balance = _b === void 0 ? 0 : _b, isTest = userStore.isTest;
    var requestBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_2, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading, text: '正在刷新金额...' });
                    return [4 /*yield*/, APIRouter_1.default.user_balance_token()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_2 = _a.status;
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } });
                    // switch (Platform.OS) {
                    //   case 'ios':
                    //       OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['刷新成功！']);
                    //     break;
                    //   case 'android':
                    //     //TODO
                    //     break;
                    // }
                    ToastUtils_1.Toast('刷新成功！');
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    UgLog_1.ugLog(error_2);
                    ToastUtils_1.Toast('刷新失败请稍后再试！');
                    return [3 /*break*/, 3];
                case 3:
                    UGLoadingCP_1.hideLoading();
                    return [2 /*return*/];
            }
        });
    }); };
    if (uid != "") {
        return (<react_native_linear_gradient_1.default start={{ x: 0.5, y: 0.7 }} colors={colorEnum_1.colorEnum.gradientColor} style={{ height: 110, marginBottom: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, marginTop: 10, }}>
                <react_native_1.View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: "100%", justifyContent: 'space-between', paddingHorizontal: 10, }}>
                    <react_native_1.Text style={{ fontSize: 15, color: 'white', }}>我的账户</react_native_1.Text>
                    <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <react_native_1.Text style={{ fontSize: 14, color: 'white', marginRight: 20 }}> ¥ {balance}</react_native_1.Text>
                        <react_native_1.TouchableWithoutFeedback onPress={requestBalance}>
                            <react_native_elements_1.Icon name="refresh" type="materialIcon" color="#8c9ba7" size={24}/>
                        </react_native_1.TouchableWithoutFeedback>
                    </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={{ width: "95%", height: 0.5, backgroundColor: "#8c9ba7" }}></react_native_1.View>
                <react_native_1.View style={{ flex: 1, flexDirection: 'row' }}>
                    <react_native_1.TouchableOpacity onPress={function () {
            if (isTest) {
                react_native_1.Alert.alert("温馨提示", "请先登录您的正式帐号", [
                    { text: "取消", onPress: function () { }, style: "cancel" },
                    {
                        text: "马上登录",
                        onPress: function () {
                            RootNavigation_1.navigate(Navigation_1.PageName.ZLLoginPage, {});
                        },
                    }
                ]);
            }
            else {
                PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款);
            }
        }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <react_native_fast_image_1.default style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/depositlogo.png" }}/>
                        <react_native_1.Text style={{ color: 'white', fontSize: 15.5 }}> 存款</react_native_1.Text>
                    </react_native_1.TouchableOpacity>

                    <react_native_1.TouchableOpacity onPress={function () {
            if (isTest) {
                react_native_1.Alert.alert("温馨提示", "请先登录您的正式帐号", [
                    { text: "取消", onPress: function () { }, style: "cancel" },
                    {
                        text: "马上登录",
                        onPress: function () {
                            RootNavigation_1.navigate(Navigation_1.PageName.ZLLoginPage, {});
                        },
                    }
                ]);
            }
            else {
                PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.额度转换);
            }
        }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <react_native_fast_image_1.default style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/xima.png" }}/>
                        <react_native_1.Text style={{ color: 'white', fontSize: 15.5 }}> 额度转换</react_native_1.Text>

                    </react_native_1.TouchableOpacity>
                    <react_native_1.TouchableOpacity onPress={function () {
            if (isTest) {
                react_native_1.Alert.alert("温馨提示", "请先登录您的正式帐号", [
                    { text: "取消", onPress: function () { }, style: "cancel" },
                    {
                        text: "马上登录",
                        onPress: function () {
                            RootNavigation_1.navigate(Navigation_1.PageName.ZLLoginPage, {});
                        },
                    }
                ]);
            }
            else {
                PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.取款);
            }
        }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <react_native_fast_image_1.default style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/withdrawlogo.png" }}/>
                        <react_native_1.Text style={{ color: 'white', fontSize: 15.5 }}> 取款</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
            </react_native_linear_gradient_1.default>);
    }
    else {
        return null;
    }
};
var MarqueePopupView = function (_a) {
    var content = _a.content, show = _a.show, onPress = _a.onPress, onDismiss = _a.onDismiss;
    var _b = hooks_1.useDimensions().screen, width = _b.width, height = _b.height;
    if (show) {
        return (<react_native_1.View style={{ width: width, height: height, position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1000, marginBottom: 10 }}>
                <react_native_1.View style={{ width: '90%', height: '55%', backgroundColor: 'white', borderRadius: 15 }}>
                    <react_native_1.View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
                        <react_native_1.Text style={{ fontSize: 16, fontWeight: "bold" }}>公告详情</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={{ flex: 1, paddingHorizontal: 10 }}>
                        <react_native_autoheight_webview_1.default style={{ width: width * 0.9 - 20 }} source={{ html: content }}></react_native_autoheight_webview_1.default>
                    </react_native_1.View>
                    <react_native_1.View style={{ height: 70, paddingBottom: 10, paddingHorizontal: 5, justifyContent: 'space-between', width: "100%", flexDirection: 'row' }}>
                        <react_native_1.TouchableOpacity onPress={onDismiss} style={{
            justifyContent: 'center', alignItems: 'center',
            width: "47%", height: 50, backgroundColor: 'white',
            borderRadius: 5, borderColor: "gray", borderWidth: 0.5
        }}>
                            <react_native_1.Text>取消</react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                        <react_native_1.TouchableOpacity onPress={onPress} style={{
            justifyContent: 'center',
            alignItems: 'center', width: "47%", height: 50,
            backgroundColor: '#46A3FF', borderRadius: 5,
            borderColor: "gray", borderWidth: 0.5
        }}>
                            <react_native_1.Text style={{ color: 'white' }}>确定</react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                    </react_native_1.View>
                </react_native_1.View>

            </react_native_1.View>);
    }
    else {
        return null;
    }
};
var FastImageAutoHeight = function (props) {
    var _a = react_1.useState(100), picHeight = _a[0], setPicHeight = _a[1];
    var _b = usePopUpView_1.default(), cardMargin = _b.cardMargin, marginHorizontal = _b.marginHorizontal;
    return (<react_native_fast_image_1.default {...props} style={[props.style, { height: picHeight }]} onLoad={function (e) {
        setPicHeight(((AppDefine_1.default.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height);
    }}/>);
};
var FastImageAutoWidth = function (props) {
    var _a = react_1.useState(210), picWidth = _a[0], setPicWidth = _a[1];
    return (<react_native_fast_image_1.default {...props} style={[props.style, { width: picWidth }]} onLoad={function (e) {
        var _a, _b;
        console.log(((_a = props.style) === null || _a === void 0 ? void 0 : _a.height) / e.nativeEvent.height * e.nativeEvent.width, e.nativeEvent.width);
        setPicWidth(((_b = props.style) === null || _b === void 0 ? void 0 : _b.height) / e.nativeEvent.height * e.nativeEvent.width);
    }}/>);
};
var styles = react_native_1.StyleSheet.create({
    buttonContainer: {
        flex: 1,
        marginRight: 5,
    }
});
exports.default = ZLHomePage;
