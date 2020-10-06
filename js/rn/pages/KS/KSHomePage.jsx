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
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var AnimatedRankComponent_1 = require("../../public/components/tars/AnimatedRankComponent");
var AutoHeightCouponComponent_1 = require("../../public/components/tars/AutoHeightCouponComponent");
var RandomText_1 = require("../../public/components/tars/RandomText");
var ReLoadBalanceComponent_1 = require("../../public/components/tars/ReLoadBalanceComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useHomePage_1 = require("../../public/hooks/tars/useHomePage");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var httpClient_1 = require("../../public/network/httpClient");
var KSThemeColor_1 = require("../../public/theme/colors/KSThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var tars_1 = require("../../public/tools/tars");
var Activitys_1 = require("../../public/views/tars/Activitys");
var BannerBlock_1 = require("../../public/views/tars/BannerBlock");
var BottomGap_1 = require("../../public/views/tars/BottomGap");
var BottomLogo_1 = require("../../public/views/tars/BottomLogo");
var CouponBlock_1 = require("../../public/views/tars/CouponBlock");
var GameButton_1 = require("../../public/views/tars/GameButton");
var LinearBadge_1 = require("../../public/views/tars/LinearBadge");
var NoticeBlock_1 = require("../../public/views/tars/NoticeBlock");
var ProgressCircle_1 = require("../../public/views/tars/ProgressCircle");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var TouchableImage_1 = require("../../public/views/tars/TouchableImage");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var CoverButton_1 = require("./views/CoverButton");
var HomeHeader_1 = require("./views/HomeHeader");
var MoreGameButton_1 = require("./views/MoreGameButton");
var buttonHeight = Scale_1.scale(82);
var KSHomePage = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    var getHtml5Image = tars_1.useHtml5Image().getHtml5Image;
    var _w = useHomePage_1.default({}), goTo = _w.goTo, refresh = _w.refresh, value = _w.value, sign = _w.sign;
    var goToJDPromotionListPage = goTo.goToJDPromotionListPage;
    var loading = value.loading, refreshing = value.refreshing, userInfo = value.userInfo, sysInfo = value.sysInfo, homeInfo = value.homeInfo;
    var bannersInterval = homeInfo.bannersInterval, onlineNum = homeInfo.onlineNum, banners = homeInfo.banners, notices = homeInfo.notices, announcements = homeInfo.announcements, homeGames = homeInfo.homeGames, coupons = homeInfo.coupons, rankLists = homeInfo.rankLists, floatAds = homeInfo.floatAds, redBag = homeInfo.redBag, redBagLogo = homeInfo.redBagLogo, roulette = homeInfo.roulette;
    var uid = userInfo.uid, usr = userInfo.usr, balance = userInfo.balance, isTest = userInfo.isTest, curLevelTitle = userInfo.curLevelTitle, unreadMsg = userInfo.unreadMsg;
    var mobile_logo = sysInfo.mobile_logo, webName = sysInfo.webName, showCoupon = sysInfo.showCoupon, rankingListType = sysInfo.rankingListType;
    var lotterys = (_b = (_a = homeGames[0]) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : [];
    var smallLotterys = (_c = lotterys === null || lotterys === void 0 ? void 0 : lotterys.slice(4, 8)) !== null && _c !== void 0 ? _c : [];
    var moreGames = (_d = lotterys === null || lotterys === void 0 ? void 0 : lotterys.slice(8, lotterys === null || lotterys === void 0 ? void 0 : lotterys.length)) !== null && _d !== void 0 ? _d : [];
    var tryPlay = sign.tryPlay;
    if (loading) {
        return (<>
        <SafeAreaHeader_1.default headerColor={KSThemeColor_1.KSThemeColor.凯时.themeColor}/>
        <ProgressCircle_1.default />
      </>);
    }
    else {
        return (<>
        <SafeAreaHeader_1.default headerColor={KSThemeColor_1.KSThemeColor.凯时.themeColor}></SafeAreaHeader_1.default>
        <react_native_1.ScrollView style={{ backgroundColor: KSThemeColor_1.KSThemeColor.凯时.themeColor }} showsVerticalScrollIndicator={false} refreshControl={<react_native_1.RefreshControl tintColor={'#ffffff'} refreshing={refreshing} onRefresh={function () { return __awaiter(void 0, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, refresh()];
                    case 1:
                        _a.sent();
                        PushHelper_1.default.pushAnnouncement(announcements);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log('-------error------', error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); }}/>}>
          <NoticeBlock_1.default containerStyle={{ backgroundColor: KSThemeColor_1.KSThemeColor.凯时.themeColor, borderRadius: 0 }} bgContainerStyle={{ backgroundColor: KSThemeColor_1.KSThemeColor.凯时.themeColor }} logoTextStyle={{
            color: '#95979f',
            fontSize: Scale_1.scale(20),
            paddingHorizontal: Scale_1.scale(5),
        }} textStyle={{
            color: '#95979f',
            fontSize: Scale_1.scale(18),
        }} notices={notices} onPressNotice={function (_a) {
            var content = _a.content;
            PushHelper_1.default.pushNoticePopUp(content);
        }}/>
          <HomeHeader_1.default logo={mobile_logo}/>
          <react_native_1.View style={[styles.toolBlock, { marginTop: Scale_1.scale(5) }]}>
            {uid ? (<react_native_linear_gradient_1.default colors={['#eb5d4d', '#fb2464']} style={{ flex: 1, borderRadius: Scale_1.scale(5), marginHorizontal: '1%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: Scale_1.scale(35) }}>
                <react_native_1.View style={{ flexDirection: 'row', height: '100%', alignItems: 'center' }}>
                  <react_native_fast_image_1.default source={{ uri: getHtml5Image(22, 'touxiang') }} style={{ height: '50%', aspectRatio: 1 }}/>
                  <react_native_1.View style={{ marginLeft: Scale_1.scale(20), height: '100%' }}>
                    <react_native_1.View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', marginBottom: Scale_1.scale(1) }}>
                      <react_native_1.Text style={{ color: '#ffffff', fontWeight: '600' }}>{usr}</react_native_1.Text>
                      <LinearBadge_1.default title={curLevelTitle} colors={['#ffffff', '#ffffff']} textStyle={{ color: '#f83060', padding: Scale_1.scale(3), fontSize: Scale_1.scale(18) }} containerStyle={{ borderRadius: Scale_1.scale(5), width: null, marginLeft: Scale_1.scale(5), height: null, aspectRatio: null }} showIcon={false}/>
                    </react_native_1.View>
                    <react_native_1.View style={{ flexDirection: 'row', flex: 1, marginTop: Scale_1.scale(1) }}>
                      <ReLoadBalanceComponent_1.default title={'总金额¥ '} titleStyle={{ color: '#ffffff', fontSize: Scale_1.scale(20), fontWeight: '500' }} balance={balance} balanceStyle={{ color: '#ffffff', fontSize: Scale_1.scale(20), fontWeight: '500' }} color={'#ffffff'} size={20}/>
                    </react_native_1.View>
                  </react_native_1.View>
                </react_native_1.View>
                <react_native_1.View style={{ aspectRatio: 1, height: '50%' }}>
                  <react_native_fast_image_1.default source={{ uri: getHtml5Image(22, 'xiaoxi') }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'}/>
                  <react_native_1.View style={{
            width: Scale_1.scale(30),
            aspectRatio: 1,
            borderRadius: Scale_1.scale(30),
            position: 'absolute',
            backgroundColor: '#ffffff',
            right: -Scale_1.scale(10),
            top: -Scale_1.scale(10),
            justifyContent: 'center',
            alignItems: 'center',
        }}>
                    <react_native_1.Text style={{ fontSize: Scale_1.scale(20), color: '#fe3333' }}>{unreadMsg > 99 ? 99 : unreadMsg}</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>
              </react_native_linear_gradient_1.default>) : (<>
                <LinearBadge_1.default colors={['#3a3a41', '#3a3a41']} containerStyle={[styles.toolButton, { marginLeft: '1%' }]} title={'登录'} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(22) }} showIcon={false} onPress={function () {
            RootNavigation_1.navigate(Navigation_1.PageName.KSSignInPage);
        }}/>
                <LinearBadge_1.default colors={['#eb5d4d', '#fb7a24']} containerStyle={styles.toolButton} title={'注册'} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(22) }} showIcon={false} onPress={function () {
            RootNavigation_1.navigate(Navigation_1.PageName.KSSignUpPage);
        }}/>
                <LinearBadge_1.default colors={['#eb5d4d', '#fb2464']} containerStyle={[styles.toolButton, { marginRight: '1%' }]} title={'试玩'} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(22) }} showIcon={false} onPress={tryPlay}/>
              </>)}
          </react_native_1.View>
          <react_native_1.View style={styles.toolBlock}>
            <LinearBadge_1.default colors={['#eb5d4d', '#fb7a24']} containerStyle={[styles.toolButton, { marginLeft: '1%' }]} title={'存款'} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(20) }} showIcon={false} showLogo={true} logo={getHtml5Image(22, 'depositlogo')} onPress={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款); }}/>
            <LinearBadge_1.default colors={['#3a3a41', '#3a3a41']} containerStyle={styles.toolButton} title={'额度转换'} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(20) }} showIcon={false} showLogo={true} logo={getHtml5Image(22, 'xima')} onPress={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.额度转换); }}/>
            <LinearBadge_1.default colors={['#3a3a41', '#3a3a41']} containerStyle={[styles.toolButton, { marginRight: '1%' }]} title={'取款'} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(20) }} showIcon={false} showLogo={true} logo={getHtml5Image(22, 'withdrawlogo')} onPress={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.取款); }}/>
          </react_native_1.View>
          <react_native_1.View style={[styles.toolBlock, { height: Scale_1.scale(158) }]}>
            <react_native_1.View style={{ alignItems: 'center', marginLeft: '1%', marginRight: '0.5%', width: '32%', justifyContent: 'space-between' }}>
              <LinearBadge_1.default colors={['#3a3a41', '#3a3a41']} containerStyle={[styles.toolButton, { marginHorizontal: null, width: '100%', height: Scale_1.scale(76) }]} title={'利息宝'} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(20) }} showIcon={false} showLogo={true} logo={getHtml5Image(22, 'lxb')} onPress={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.利息宝); }}/>
              <LinearBadge_1.default colors={['#3a3a41', '#3a3a41']} containerStyle={[styles.toolButton, { marginHorizontal: null, width: '100%', height: Scale_1.scale(76) }]} title={'游戏大厅'} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(20) }} showIcon={false} showLogo={true} logo={getHtml5Image(22, 'yxdt')} onPress={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.彩票大厅); }}/>
            </react_native_1.View>
            <BannerBlock_1.default containerStyle={{ marginLeft: '0.5%', width: '65%', marginRight: '1%', aspectRatio: null, height: '100%' }} autoplayTimeout={bannersInterval} badgeStyle={{ top: -Scale_1.scale(150) }} onlineNum={onlineNum} showOnlineNum={true} banners={banners} renderBanner={function (item, index) {
            var linkCategory = item.linkCategory, linkPosition = item.linkPosition, pic = item.pic;
            return (<TouchableImage_1.default key={index} pic={pic} containerStyle={{ width: '100%', height: '100%' }} resizeMode={'stretch'} onPress={function () {
                PushHelper_1.default.pushCategory(linkCategory, linkPosition);
            }}/>);
        }}/>
          </react_native_1.View>
          <react_native_1.View style={[styles.toolBlock, { height: Scale_1.scale(212) }]}>
            <CoverButton_1.default logo={((_e = lotterys[0]) === null || _e === void 0 ? void 0 : _e.logo) || ((_f = lotterys[0]) === null || _f === void 0 ? void 0 : _f.icon)} title={((_g = lotterys[0]) === null || _g === void 0 ? void 0 : _g.name) || ((_h = lotterys[0]) === null || _h === void 0 ? void 0 : _h.title)} containerStyle={{ marginLeft: '1%', width: '60%', marginRight: '0.5%', height: '100%', backgroundColor: '#3a3a41', borderRadius: Scale_1.scale(5) }} titleStyle={{ fontSize: Scale_1.scale(25) }} onPress={function () { return PushHelper_1.default.pushHomeGame(lotterys[0]); }}/>
            <react_native_1.View style={{ alignItems: 'center', marginRight: '1%', marginLeft: '0.5%', width: '37%', justifyContent: 'space-between' }}>
              <CoverButton_1.default logo={((_j = lotterys[1]) === null || _j === void 0 ? void 0 : _j.logo) || ((_k = lotterys[1]) === null || _k === void 0 ? void 0 : _k.icon)} title={((_l = lotterys[1]) === null || _l === void 0 ? void 0 : _l.name) || ((_m = lotterys[1]) === null || _m === void 0 ? void 0 : _m.title)} containerStyle={{ width: '100%', height: Scale_1.scale(102), backgroundColor: '#3a3a41', borderRadius: Scale_1.scale(5) }} titleStyle={{ fontSize: Scale_1.scale(25) }} onPress={function () { return PushHelper_1.default.pushHomeGame(lotterys[1]); }}/>
              <CoverButton_1.default logo={((_o = lotterys[2]) === null || _o === void 0 ? void 0 : _o.logo) || ((_p = lotterys[2]) === null || _p === void 0 ? void 0 : _p.icon)} title={((_q = lotterys[2]) === null || _q === void 0 ? void 0 : _q.name) || ((_r = lotterys[2]) === null || _r === void 0 ? void 0 : _r.title)} containerStyle={{ width: '100%', height: Scale_1.scale(102), backgroundColor: '#3a3a41', borderRadius: Scale_1.scale(5) }} titleStyle={{ fontSize: Scale_1.scale(25) }} onPress={function () { return PushHelper_1.default.pushHomeGame(lotterys[2]); }}/>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.View style={[styles.toolBlock, { height: Scale_1.scale(205) }]}>
            <react_native_1.View style={{ marginLeft: '1%', width: '77%', marginRight: '0.5%', height: '100%', backgroundColor: '#3a3a41', borderRadius: Scale_1.scale(5) }}>
              <react_native_1.View style={{ flex: 1 }}>
                <react_native_1.ImageBackground source={{ uri: 'https://a06frontweb.cathayfund.com/cdn/A06FM/img/pmd.57681c5.gif' }} style={{ width: '100%', height: '100%' }} resizeMode={'stretch'}>
                  <react_native_1.View style={{ flex: 1, flexDirection: 'row' }}>
                    <react_native_1.View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                      <react_native_1.Text style={{ fontSize: Scale_1.scale(15), color: '#ffffff', marginBottom: Scale_1.scale(5) }}>{'电子游戏'}</react_native_1.Text>
                      <react_native_1.Text style={{ fontSize: Scale_1.scale(15), color: '#ffffff', marginTop: Scale_1.scale(5) }}>{'总奖金池'}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={{ flex: 7, justifyContent: 'center', alignItems: 'flex-start' }}>
                      <RandomText_1.default style={{ color: '#ffb029', fontSize: Scale_1.scale(25) }}/>
                    </react_native_1.View>
                  </react_native_1.View>
                </react_native_1.ImageBackground>
              </react_native_1.View>
              <react_native_1.View style={{ flex: 1.5, flexDirection: 'row' }}>
                {smallLotterys === null || smallLotterys === void 0 ? void 0 : smallLotterys.map(function (item, index) {
            var logo = item.logo, name = item.name, icon = item.icon, title = item.title;
            return (<GameButton_1.default key={index} containerStyle={{ width: '25%', height: '100%', marginTop: Scale_1.scale(5) }} imageContainerStyle={{ width: '70%', aspectRatio: 1 }} titleStyle={{ color: '#97989d' }} enableCircle={false} logo={logo || icon} title={name || title} showSecondLevelIcon={false} showSubTitle={false} showUnReadMsg={false} showCenterFlag={false} showRightTopFlag={false}/>);
        })}
              </react_native_1.View>
            </react_native_1.View>
            <CoverButton_1.default logo={((_s = lotterys[3]) === null || _s === void 0 ? void 0 : _s.logo) || ((_t = lotterys[3]) === null || _t === void 0 ? void 0 : _t.icon)} title={((_u = lotterys[3]) === null || _u === void 0 ? void 0 : _u.name) || ((_v = lotterys[3]) === null || _v === void 0 ? void 0 : _v.title)} containerStyle={{ marginRight: '1%', marginLeft: '0.5%', width: '20%', height: '100%', backgroundColor: '#3a3a41', borderRadius: Scale_1.scale(5) }} titleStyle={{ fontSize: Scale_1.scale(25) }} onPress={function () { return PushHelper_1.default.pushHomeGame(lotterys[3]); }}/>
          </react_native_1.View>
          <react_native_1.View style={[styles.toolBlock, { backgroundColor: '#3a3a41', marginHorizontal: '1%', borderRadius: Scale_1.scale(5), flexDirection: 'column', width: null, height: null, alignItems: 'center' }]}>
            <react_native_1.View style={{ width: '90%' }}>
              <react_native_1.Text style={{ color: '#ffffff', fontSize: Scale_1.scale(22), marginVertical: Scale_1.scale(20), fontWeight: '500' }}>{'更多游戏'}</react_native_1.Text>
            </react_native_1.View>
            {moreGames === null || moreGames === void 0 ? void 0 : moreGames.map(function (item, index) {
            var name = item.name, logo = item.logo, title = item.title, icon = item.icon;
            return (<MoreGameButton_1.default key={index} title={name || title} logo={logo || icon} onPress={function () {
                PushHelper_1.default.pushHomeGame(item);
            }}/>);
        })}
          </react_native_1.View>
          <CouponBlock_1.default visible={showCoupon} onPressMore={goToJDPromotionListPage} containerStyle={{
            marginHorizontal: '1%',
            marginTop: Scale_1.scale(10),
            width: null,
        }} titleContainerStyle={{ backgroundColor: '#3a3a41', borderTopLeftRadius: Scale_1.scale(10), borderTopRightRadius: Scale_1.scale(10) }} listContainerStyle={{ backgroundColor: '#3a3a41', borderBottomLeftRadius: Scale_1.scale(10), borderBottomRightRadius: Scale_1.scale(10) }} titleStyle={{ color: '#ffffff' }} coupons={coupons} renderCoupon={function (_a) {
            var item = _a.item, index = _a.index;
            var pic = item.pic, linkCategory = item.linkCategory, linkPosition = item.linkPosition, title = item.title, content = item.content, linkUrl = item.linkUrl;
            return (<AutoHeightCouponComponent_1.default titleStyle={{ alignSelf: 'center', color: '#ffffff' }} containerStyle={{
                borderColor: '#d9d9d9',
                borderWidth: Scale_1.scale(1),
                marginBottom: Scale_1.scale(20),
                padding: Scale_1.scale(5),
                borderRadius: Scale_1.scale(5),
                paddingBottom: Scale_1.scale(20),
            }} key={index} title={title} pic={pic} content={content} onPress={function (setShowPop) {
                if (linkUrl) {
                    PushHelper_1.default.openWebView(linkUrl);
                }
                else if (!linkCategory && !linkPosition) {
                    setShowPop(true);
                }
                else {
                    PushHelper_1.default.pushCategory(linkCategory, linkPosition);
                }
            }}/>);
        }}/>
          <AnimatedRankComponent_1.default type={rankingListType} iconColor={'#ffffff'} iconTitleStyle={{ color: '#ffffff' }} containerStyle={{ marginTop: Scale_1.scale(10), backgroundColor: '#3a3a41', marginHorizontal: '1%', borderRadius: Scale_1.scale(10) }} contentTitleStyle={{ color: '#ffffff' }} iconTitleContainerStyle={{
            backgroundColor: '#3a3a41',
            borderTopLeftRadius: Scale_1.scale(10),
            borderTopRightRadius: Scale_1.scale(10),
        }} contentContainerStyle={{
            width: '95%',
            alignSelf: 'center',
            marginBottom: Scale_1.scale(20),
            backgroundColor: '#3a3a41',
        }} rankLists={rankLists}/>
          <BottomLogo_1.default webName={webName} containerStyle={{ marginBottom: Scale_1.scale(5) }} titleStyle={{ color: '#ffffff' }} subTitleStyle={{ color: '#97989d' }} onPressComputer={function () {
            PushHelper_1.default.openWebView(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
        }} onPressPromotion={goToJDPromotionListPage} debug={false}/>
          <BottomGap_1.default />
        </react_native_1.ScrollView>
        <Activitys_1.default uid={uid} isTest={isTest} refreshing={refreshing} redBagLogo={redBagLogo} redBag={redBag} roulette={roulette} floatAds={floatAds}/>
      </>);
    }
};
var styles = react_native_1.StyleSheet.create({
    toolBlock: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: Scale_1.scale(8),
        height: buttonHeight,
    },
    toolButton: {
        width: '32%',
        borderRadius: Scale_1.scale(5),
        height: '100%',
        marginHorizontal: '0.5%',
    },
});
exports.default = KSHomePage;
