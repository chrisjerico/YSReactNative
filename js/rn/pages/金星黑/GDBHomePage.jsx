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
var PushHelper_1 = require("../../public/define/PushHelper");
var react_native_marquee_ab_1 = require("react-native-marquee-ab");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var Navigation_1 = require("../../public/navigation/Navigation");
var UGStore_1 = require("../../redux/store/UGStore");
var APIRouter_1 = require("../../public/network/APIRouter");
var react_native_elements_1 = require("react-native-elements");
var usePopUpView_1 = require("../../public/hooks/usePopUpView");
var UGUserModel_1 = require("../../redux/model/\u5168\u5C40/UGUserModel");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var AppDefine_1 = require("../../public/define/AppDefine");
var useGetHomeInfo_1 = require("../../public/hooks/useGetHomeInfo");
var hooks_1 = require("@react-native-community/hooks");
var useAutoReNewUserInfo_1 = require("../../public/hooks/useAutoReNewUserInfo");
var react_native_scrollable_tab_view_1 = require("react-native-scrollable-tab-view");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var HomeBase_1 = require("../../public/components/HomeBase");
var RankList_1 = require("../../public/widget/RankList");
var react_native_autoheight_webview_1 = require("react-native-autoheight-webview");
var OCCall_1 = require("../../public/define/OCHelper/OCBridge/OCCall");
var Banner_1 = require("../\u5C0A\u9F99/CP/Banner");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
var GDBHomePage = function (_a) {
    var _b, _c, _d, _e, _f, _g;
    var navigation = _a.navigation;
    var _h = hooks_1.useDimensions().window, width = _h.width, height = _h.height;
    var onPopViewPress = usePopUpView_1.default().onPopViewPress;
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _j = userStore.uid, uid = _j === void 0 ? "" : _j;
    var _k = react_1.useState(false), show = _k[0], setShow = _k[1];
    var _l = useGetHomeInfo_1.default(), banner = _l.banner, notice = _l.notice, homeGames = _l.homeGames, couponListData = _l.couponListData, rankList = _l.rankList, redBag = _l.redBag, floatAds = _l.floatAds, onlineNum = _l.onlineNum, loading = _l.loading, onlineSwitch = _l.onlineSwitch;
    var _m = react_1.useState(), originalNoticeString = _m[0], setOriginalNoticeString = _m[1];
    var _o = react_1.useState(), noticeFormat = _o[0], setnoticeFormat = _o[1];
    var top = react_native_safe_area_context_1.useSafeArea().top;
    var _p = react_1.useState(-1), selectId = _p[0], setSelectedId = _p[1];
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
    var _q = react_1.useState(""), content = _q[0], setContent = _q[1];
    var _r = useAutoReNewUserInfo_1.default(navigation);
    var _s = react_1.useState(0), tbxIndex = _s[0], setTbxIndex = _s[1];
    return (<HomeBase_1.default globalEvents={<MarqueePopupView onPress={function () {
        setShow(false);
    }} content={content} show={show} onDismiss={function () {
        setShow(false);
    }}/>} loginPage={Navigation_1.PageName.GDLoginPage} header={<react_native_1.View style={{ height: top }}></react_native_1.View>} backgroundSource={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/bg-black.png" }}>
      <Banner_1.default size={{ width: width - 20, height: 0 }} onlineSwitch={onlineSwitch} onlineNum={onlineNum} bannerData={banner}/>
      <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <react_native_1.Text style={{ color: '#999999', fontSize: 12 }}>公告:</react_native_1.Text>
        <react_native_marquee_ab_1.MarqueeHorizontal bgContainerStyle={{ backgroundColor: '#00000000', }} textStyle={{ color: "white", fontSize: 12 }} width={width - 50} height={34} speed={35} onTextClick={function () {
        setShow(true);
        setContent(originalNoticeString);
    }} textList={noticeFormat}/>
      </react_native_1.View>

      <AcctountDetail />
      {((_c = (_b = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _b === void 0 ? void 0 : _b.icons) === null || _c === void 0 ? void 0 : _c.length) > 0 ? <react_native_scrollable_tab_view_1.default onChangeTab={function (_a) {
        var i = _a.i;
        setTbxIndex(i);
    }} style={{ borderBottomWidth: 0, height: homeGames.data.icons[tbxIndex].name == "热门" || homeGames.data.icons[tbxIndex].name == '热门游戏' ? 900 : (Math.round(homeGames.data.icons[tbxIndex].list.length / 2)) * 143 + 20 }} initialPage={0} tabBarUnderlineStyle={{ backgroundColor: "#cfa461", marginBottom: 10, height: 2, }} tabBarTextStyle={{ fontSize: 13.2, textAlign: 'center' }} renderTabBar={function () { return <react_native_scrollable_tab_view_1.ScrollableTabBar style={{ borderWidth: 0, }} inactiveTextColor={'white'} activeTextColor={"#cfa461"}/>; }}>
        {(_e = (_d = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _d === void 0 ? void 0 : _d.icons) === null || _e === void 0 ? void 0 : _e.map(function (res) {
        return <TabContainer homeGames={homeGames} isHot={homeGames.data.icons[tbxIndex].name == "热门" || homeGames.data.icons[tbxIndex].name == '热门游戏'} tabLabel={res.name} data={res.list}/>;
    })}
      </react_native_scrollable_tab_view_1.default> : null}
      <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <react_native_1.View style={{ flexDirection: 'row' }}>
          <react_native_1.Image style={{ width: 13, height: 13, tintColor: 'white', marginRight: 5 }} source={{ uri: "礼品-(1)" }}/>
          <react_native_1.Text style={{ color: 'white', fontWeight: "bold" }}>优惠活动</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.JDPromotionListPage);
    }}>
          <react_native_1.Text style={{ color: 'white', fontWeight: "bold" }}>查看更多>></react_native_1.Text>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.View>
      <react_native_1.FlatList style={{ marginTop: 10 }} data={(_g = (_f = couponListData === null || couponListData === void 0 ? void 0 : couponListData.data) === null || _f === void 0 ? void 0 : _f.list) === null || _g === void 0 ? void 0 : _g.filter(function (res, index) { return index < 5; })} renderItem={function (_a) {
        var _b, _c;
        var item = _a.item, index = _a.index;
        return <react_native_1.View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
          <react_native_1.TouchableWithoutFeedback onPress={onPopViewPress.bind(null, item, (_c = (_b = couponListData === null || couponListData === void 0 ? void 0 : couponListData.data) === null || _b === void 0 ? void 0 : _b.style) !== null && _c !== void 0 ? _c : 'popup', function () {
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
      <RankList_1.default timing={10000} backgroundColor={'white'} titleTextStyle={{
        color: 'white', fontWeight: "bold",
        fontSize: 14,
        marginLeft: -20
    }} textColor={'black'} width={width - 24} ranks={rankList}/>

      <react_native_1.View style={{ height: 100 }}></react_native_1.View>

    </HomeBase_1.default>);
};
var TabContainer = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75;
    var data = _a.data, isHot = _a.isHot, homeGames = _a.homeGames;
    var width = hooks_1.useDimensions().screen.width;
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _76 = userStore.uid, uid = _76 === void 0 ? "" : _76;
    var thirdPartGamePress = function (subIndex, index) {
        var _a, _b, _c, _d;
        if (uid == '') {
            RootNavigation_1.navigate(Navigation_1.PageName.GDLoginPage, {});
        }
        else {
            PushHelper_1.default.pushHomeGame((_d = (_c = (_b = (_a = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _a === void 0 ? void 0 : _a.icons) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.list) === null || _d === void 0 ? void 0 : _d[subIndex].subType[index]);
        }
    };
    if (isHot) {
        return (<react_native_1.View style={{ flex: 1 }}>
        <react_native_1.View style={{ backgroundColor: "#282828", borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
          <react_native_1.View style={{ flexDirection: 'column', paddingTop: 20, }}>
            <react_native_1.Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{(_f = (_e = (_d = (_c = (_b = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _b === void 0 ? void 0 : _b.icons) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.list) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.name}</react_native_1.Text>

            <react_native_1.FlatList keyExtractor={function (item) { return item.title; }} style={{ width: (width - 20) * 0.6 }} columnWrapperStyle={{ justifyContent: 'space-between', }} scrollEnabled={false} data={(_k = (_j = (_h = (_g = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _g === void 0 ? void 0 : _g.icons) === null || _h === void 0 ? void 0 : _h[0]) === null || _j === void 0 ? void 0 : _j.list[0].subType) !== null && _k !== void 0 ? _k : []} numColumns={3} renderItem={function (_a) {
            var item = _a.item, index = _a.index;
            return <react_native_1.Text onPress={thirdPartGamePress.bind(null, 0, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</react_native_1.Text>;
        }}/>
          </react_native_1.View>
          <react_native_fast_image_1.default resizeMode={'contain'} style={{ width: 129, height: 106 }} source={{ uri: (_o = (_m = (_l = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _l === void 0 ? void 0 : _l.icons) === null || _m === void 0 ? void 0 : _m[0]) === null || _o === void 0 ? void 0 : _o.logo }}/>
        </react_native_1.View>
        <react_native_1.View style={{ flexDirection: 'row' }}>

          <react_native_1.View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, marginRight: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
            <react_native_1.View style={{ flexDirection: 'column', paddingVertical: 20, }}>
              <react_native_1.Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{(_t = (_s = (_r = (_q = (_p = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _p === void 0 ? void 0 : _p.icons) === null || _q === void 0 ? void 0 : _q[0]) === null || _r === void 0 ? void 0 : _r.list) === null || _s === void 0 ? void 0 : _s[1]) === null || _t === void 0 ? void 0 : _t.name}</react_native_1.Text>
              <react_native_1.FlatList keyExtractor={function (item) { return item.title; }} scrollEnabled={false} data={(_y = (_x = (_w = (_v = (_u = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _u === void 0 ? void 0 : _u.icons) === null || _v === void 0 ? void 0 : _v[0]) === null || _w === void 0 ? void 0 : _w.list[1]) === null || _x === void 0 ? void 0 : _x.subType) !== null && _y !== void 0 ? _y : []} renderItem={function (_a) {
            var item = _a.item, index = _a.index;
            return <react_native_1.Text onPress={thirdPartGamePress.bind(null, 1, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</react_native_1.Text>;
        }}/>
            </react_native_1.View>
            <react_native_fast_image_1.default resizeMode={'contain'} source={{ uri: (_0 = (_z = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _z === void 0 ? void 0 : _z.icons) === null || _0 === void 0 ? void 0 : _0[1].logo }} style={{ width: 67, height: 104, }}/>

          </react_native_1.View>

          <react_native_1.View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
            <react_native_1.View style={{ flexDirection: 'column', paddingVertical: 20, }}>
              <react_native_1.Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{(_5 = (_4 = (_3 = (_2 = (_1 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _1 === void 0 ? void 0 : _1.icons) === null || _2 === void 0 ? void 0 : _2[0]) === null || _3 === void 0 ? void 0 : _3.list) === null || _4 === void 0 ? void 0 : _4[2]) === null || _5 === void 0 ? void 0 : _5.name}</react_native_1.Text>
              <react_native_1.FlatList keyExtractor={function (item) { return item.title; }} scrollEnabled={false} data={(_10 = (_9 = (_8 = (_7 = (_6 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _6 === void 0 ? void 0 : _6.icons) === null || _7 === void 0 ? void 0 : _7[0]) === null || _8 === void 0 ? void 0 : _8.list[2]) === null || _9 === void 0 ? void 0 : _9.subType) !== null && _10 !== void 0 ? _10 : []} renderItem={function (_a) {
            var item = _a.item, index = _a.index;
            return <react_native_1.Text onPress={thirdPartGamePress.bind(null, 2, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</react_native_1.Text>;
        }}/>
            </react_native_1.View>
            <react_native_fast_image_1.default resizeMode={'contain'} source={{ uri: (_12 = (_11 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _11 === void 0 ? void 0 : _11.icons) === null || _12 === void 0 ? void 0 : _12[1].logo }} style={{ width: 67, height: 104, }}/>

          </react_native_1.View>


        </react_native_1.View>

        <react_native_1.View style={{ backgroundColor: "#282828", borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
          <react_native_1.View style={{ flexDirection: 'column', paddingTop: 20, }}>
            <react_native_1.Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{(_17 = (_16 = (_15 = (_14 = (_13 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _13 === void 0 ? void 0 : _13.icons) === null || _14 === void 0 ? void 0 : _14[0]) === null || _15 === void 0 ? void 0 : _15.list) === null || _16 === void 0 ? void 0 : _16[3]) === null || _17 === void 0 ? void 0 : _17.name}</react_native_1.Text>

            <react_native_1.FlatList keyExtractor={function (item) { return item.title; }} style={{ width: (width - 20) * 0.6 }} columnWrapperStyle={{ justifyContent: 'space-between', }} scrollEnabled={false} data={(_22 = (_21 = (_20 = (_19 = (_18 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _18 === void 0 ? void 0 : _18.icons) === null || _19 === void 0 ? void 0 : _19[0]) === null || _20 === void 0 ? void 0 : _20.list[3]) === null || _21 === void 0 ? void 0 : _21.subType) !== null && _22 !== void 0 ? _22 : []} numColumns={3} renderItem={function (_a) {
            var item = _a.item, index = _a.index;
            return <react_native_1.Text onPress={thirdPartGamePress.bind(null, 3, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</react_native_1.Text>;
        }}/>
          </react_native_1.View>
          <react_native_fast_image_1.default resizeMode={'contain'} style={{ width: 129, height: 106 }} source={{ uri: (_25 = (_24 = (_23 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _23 === void 0 ? void 0 : _23.icons) === null || _24 === void 0 ? void 0 : _24[0]) === null || _25 === void 0 ? void 0 : _25.logo }}/>
        </react_native_1.View>

        <react_native_1.View style={{ backgroundColor: "#282828", borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
          <react_native_1.View style={{ flexDirection: 'column', paddingTop: 20, }}>
            <react_native_1.Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{(_30 = (_29 = (_28 = (_27 = (_26 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _26 === void 0 ? void 0 : _26.icons) === null || _27 === void 0 ? void 0 : _27[0]) === null || _28 === void 0 ? void 0 : _28.list) === null || _29 === void 0 ? void 0 : _29[4]) === null || _30 === void 0 ? void 0 : _30.name}</react_native_1.Text>

            <react_native_1.FlatList keyExtractor={function (item) { return item.title; }} style={{ width: (width - 20) * 0.6 }} columnWrapperStyle={{ justifyContent: 'space-between', }} scrollEnabled={false} data={(_35 = (_34 = (_33 = (_32 = (_31 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _31 === void 0 ? void 0 : _31.icons) === null || _32 === void 0 ? void 0 : _32[0]) === null || _33 === void 0 ? void 0 : _33.list[4]) === null || _34 === void 0 ? void 0 : _34.subType) !== null && _35 !== void 0 ? _35 : []} numColumns={3} renderItem={function (_a) {
            var item = _a.item, index = _a.index;
            return <react_native_1.Text onPress={thirdPartGamePress.bind(null, 4, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</react_native_1.Text>;
        }}/>
          </react_native_1.View>
          <react_native_fast_image_1.default resizeMode={'contain'} style={{ width: 129, height: 106 }} source={{ uri: (_38 = (_37 = (_36 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _36 === void 0 ? void 0 : _36.icons) === null || _37 === void 0 ? void 0 : _37[0]) === null || _38 === void 0 ? void 0 : _38.logo }}/>
        </react_native_1.View>
        <react_native_1.View style={{ flexDirection: 'row' }}>

          <react_native_1.View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, marginRight: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
            <react_native_1.View style={{ flexDirection: 'column', paddingVertical: 20, }}>
              <react_native_1.Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{(_43 = (_42 = (_41 = (_40 = (_39 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _39 === void 0 ? void 0 : _39.icons) === null || _40 === void 0 ? void 0 : _40[0]) === null || _41 === void 0 ? void 0 : _41.list) === null || _42 === void 0 ? void 0 : _42[5]) === null || _43 === void 0 ? void 0 : _43.name}</react_native_1.Text>
              <react_native_1.FlatList keyExtractor={function (item) { return item.title; }} scrollEnabled={false} data={(_48 = (_47 = (_46 = (_45 = (_44 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _44 === void 0 ? void 0 : _44.icons) === null || _45 === void 0 ? void 0 : _45[0]) === null || _46 === void 0 ? void 0 : _46.list[5]) === null || _47 === void 0 ? void 0 : _47.subType) !== null && _48 !== void 0 ? _48 : []} renderItem={function (_a) {
            var item = _a.item, index = _a.index;
            return <react_native_1.Text onPress={thirdPartGamePress.bind(null, 5, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</react_native_1.Text>;
        }}/>
            </react_native_1.View>
            <react_native_fast_image_1.default resizeMode={'contain'} source={{ uri: (_50 = (_49 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _49 === void 0 ? void 0 : _49.icons) === null || _50 === void 0 ? void 0 : _50[1].logo }} style={{ width: 67, height: 104, }}/>

          </react_native_1.View>

          <react_native_1.View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
            <react_native_1.View style={{ flexDirection: 'column', paddingVertical: 20, }}>
              <react_native_1.Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{(_55 = (_54 = (_53 = (_52 = (_51 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _51 === void 0 ? void 0 : _51.icons) === null || _52 === void 0 ? void 0 : _52[0]) === null || _53 === void 0 ? void 0 : _53.list) === null || _54 === void 0 ? void 0 : _54[6]) === null || _55 === void 0 ? void 0 : _55.name}</react_native_1.Text>
              <react_native_1.FlatList keyExtractor={function (item) { return item.title; }} scrollEnabled={false} data={(_60 = (_59 = (_58 = (_57 = (_56 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _56 === void 0 ? void 0 : _56.icons) === null || _57 === void 0 ? void 0 : _57[0]) === null || _58 === void 0 ? void 0 : _58.list[6]) === null || _59 === void 0 ? void 0 : _59.subType) !== null && _60 !== void 0 ? _60 : []} renderItem={function (_a) {
            var item = _a.item, index = _a.index;
            return <react_native_1.Text onPress={thirdPartGamePress.bind(null, 6, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</react_native_1.Text>;
        }}/>
            </react_native_1.View>
            <react_native_fast_image_1.default resizeMode={'contain'} source={{ uri: (_62 = (_61 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _61 === void 0 ? void 0 : _61.icons) === null || _62 === void 0 ? void 0 : _62[1].logo }} style={{ width: 67, height: 104, }}/>

          </react_native_1.View>


        </react_native_1.View>
        <react_native_1.View style={{ backgroundColor: "#282828", borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
          <react_native_1.View style={{ flexDirection: 'column', paddingTop: 20, }}>
            <react_native_1.Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{(_67 = (_66 = (_65 = (_64 = (_63 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _63 === void 0 ? void 0 : _63.icons) === null || _64 === void 0 ? void 0 : _64[0]) === null || _65 === void 0 ? void 0 : _65.list) === null || _66 === void 0 ? void 0 : _66[7]) === null || _67 === void 0 ? void 0 : _67.name}</react_native_1.Text>

            <react_native_1.FlatList keyExtractor={function (item) { return item.title; }} style={{ width: (width - 20) * 0.6 }} columnWrapperStyle={{ justifyContent: 'space-between', }} scrollEnabled={false} data={(_72 = (_71 = (_70 = (_69 = (_68 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _68 === void 0 ? void 0 : _68.icons) === null || _69 === void 0 ? void 0 : _69[0]) === null || _70 === void 0 ? void 0 : _70.list[7]) === null || _71 === void 0 ? void 0 : _71.subType) !== null && _72 !== void 0 ? _72 : []} numColumns={3} renderItem={function (_a) {
            var item = _a.item, index = _a.index;
            return <react_native_1.Text onPress={thirdPartGamePress.bind(null, 7, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</react_native_1.Text>;
        }}/>
          </react_native_1.View>
          <react_native_fast_image_1.default resizeMode={'contain'} style={{ width: 129, height: 106 }} source={{ uri: (_75 = (_74 = (_73 = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _73 === void 0 ? void 0 : _73.icons) === null || _74 === void 0 ? void 0 : _74[0]) === null || _75 === void 0 ? void 0 : _75.logo }}/>
        </react_native_1.View>
      </react_native_1.View>);
    }
    else {
        return (<react_native_1.FlatList style={{ flex: 1 }} scrollEnabled={false} numColumns={2} renderItem={function (_a) {
            var item = _a.item;
            return (<react_native_1.TouchableOpacity onPress={function () {
                PushHelper_1.default.pushHomeGame(item);
            }} style={{ width: (width - 20) / 2 }}>
            <react_native_fast_image_1.default source={{ uri: item.logo }} style={{ width: (width - 20) / 2, aspectRatio: 1.44, marginBottom: 20 }}/>
          </react_native_1.TouchableOpacity>);
        }} data={data !== null && data !== void 0 ? data : []}/>);
    }
};
var AcctountDetail = function () {
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _a = userStore.uid, uid = _a === void 0 ? "" : _a, _b = userStore.balance, balance = _b === void 0 ? 0 : _b;
    var _c = react_1.useState(false), hideAmount = _c[0], setHideAmount = _c[1];
    var requestBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.user_balance_token()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_1 = _a.status;
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var testPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_2, userInfo, error_2;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 11, , 12]);
                    OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
                    return [4 /*yield*/, APIRouter_1.default.user_guestLogin()];
                case 1:
                    _a = _c.sent(), data = _a.data, status_2 = _a.status;
                    debugger;
                    if (!(react_native_1.Platform.OS == 'ios')) return [3 /*break*/, 10];
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay'])];
                case 2:
                    _c.sent();
                    //@ts-ignore
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(data.data)])];
                case 3:
                    //@ts-ignore
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd'])];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName'])];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw'])];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 9:
                    userInfo = (_c.sent()).data;
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data });
                    UGStore_1.UGStore.save();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                    _c.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_2 = _c.sent();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_b = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _b !== void 0 ? _b : '登入失败']);
                    console.log(error_2);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); };
    var getHideAmount = function () {
        var str = "";
        for (var index = 0; index < userStore.balance.length; index++) {
            var element = userStore.balance[index];
            str += "*";
        }
        return str;
    };
    if (uid != "") {
        return (<react_native_1.View style={{ width: "100%", backgroundColor: "#2a2a2a", borderRadius: 8 }}>
        <react_native_1.View style={{ height: 38, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <react_native_fast_image_1.default style={{ width: 25, height: 25, borderRadius: 12.6 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/money-2.png" }}/>
            <react_native_1.Text style={{ color: '#a0a0a0', fontSize: 13.2, marginLeft: 3 }}>{userStore.curLevelTitle}</react_native_1.Text>
            <react_native_1.View style={{ height: 18, backgroundColor: "#cfa461", padding: 3, borderRadius: 2, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
              <react_native_1.Text style={{ fontSize: 12 }}>{userStore.curLevelGrade}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.TouchableOpacity onPress={function () {
            RootNavigation_1.push(Navigation_1.PageName.JDPromotionListPage);
        }}>
            <react_native_fast_image_1.default style={{ width: 86, height: 24 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/yhdh.png" }}/>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
        <react_native_1.View style={{ backgroundColor: "#242424", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: 20, paddingVertical: 10 }}>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <react_native_1.Text style={{ fontSize: 12.54, color: "#676767" }}>账户余额</react_native_1.Text>
            <react_native_1.TouchableOpacity onPress={function () {
            setHideAmount(function (hideAmount) { return !hideAmount; });
        }}>
              <react_native_elements_1.Icon name={hideAmount ? 'md-eye-off' : 'md-eye'} type="ionicon" size={15} color={"rgba(255, 255, 255, 0.3)"} containerStyle={{ marginLeft: 15, marginRight: 4 }}/>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>

          <react_native_1.Text style={{ fontSize: 27.5, color: "#cfa461" }}>{hideAmount ? getHideAmount() : userStore.balance}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={{ height: 38, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <react_native_1.TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={function () {
            PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款);
        }}>
            <react_native_fast_image_1.default style={{ width: 22, height: 22 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/chong%20Zhi.png" }}/>
            <react_native_1.Text style={{ color: '#cfa461', fontSize: 12, marginLeft: 3 }}>充值</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={function () {
            PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.取款);
        }}>
            <react_native_fast_image_1.default style={{ width: 22, height: 22 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/tiSian.png" }}/>
            <react_native_1.Text style={{ color: '#a0a0a0', fontSize: 12, marginLeft: 3 }}>提现</react_native_1.Text>
          </react_native_1.TouchableOpacity>

        </react_native_1.View>
      </react_native_1.View>);
    }
    else {
        return <react_native_1.View style={{ width: "100%", backgroundColor: "#2a2a2a", borderRadius: 8 }}>
      <react_native_1.View style={{ height: 38, paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
        <react_native_fast_image_1.default style={{ width: 25, height: 25, borderRadius: 12.6 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/money-2.png" }}/>
        <react_native_1.Text style={{ color: '#a0a0a0', fontSize: 13.2, marginLeft: 3 }}>尊敬的来宾，您好，请登录</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={{ height: 66, backgroundColor: "#242424", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <react_native_1.TouchableOpacity onPress={function () {
            RootNavigation_1.navigate(Navigation_1.PageName.GDLoginPage, {});
        }} style={{ backgroundColor: '#cfa461', width: 115, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
          <react_native_1.Text style={{ color: 'white', fontSize: 16.5, marginLeft: 3 }}>登录A</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity onPress={function () {
            RootNavigation_1.navigate(Navigation_1.PageName.GDRegisterPage, {});
        }} style={{ borderWidth: 1, borderColor: '#cfa461', width: 115, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
          <react_native_1.Text style={{ color: '#cfa461', fontSize: 16.5, marginLeft: 3 }}>注册</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
      <react_native_1.View style={{ height: 38, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <react_native_1.Text style={{ color: '#a0a0a0', fontSize: 12, marginLeft: 3 }}>忘记密码</react_native_1.Text>
        <react_native_1.TouchableOpacity onPress={testPlay}>
          <react_native_1.Text style={{ color: '#cfa461', fontSize: 12, marginLeft: 3 }}>免费试玩</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>;
    }
};
var FastImageAutoHeight = function (props) {
    var _a = react_1.useState(100), picHeight = _a[0], setPicHeight = _a[1];
    var _b = usePopUpView_1.default(), cardMargin = _b.cardMargin, marginHorizontal = _b.marginHorizontal;
    return (<react_native_fast_image_1.default {...props} style={[props.style, { height: picHeight }]} onLoad={function (e) {
        setPicHeight(((AppDefine_1.default.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height);
    }}/>);
};
var MarqueePopupView = function (_a) {
    var content = _a.content, show = _a.show, onPress = _a.onPress, onDismiss = _a.onDismiss;
    var _b = hooks_1.useDimensions().screen, width = _b.width, height = _b.height;
    if (show) {
        return (<react_native_1.View style={{ width: width, height: height, position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1000, marginBottom: 10 }}>
        <react_native_1.View style={{ width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 15 }}>
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
exports.default = GDBHomePage;
