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
var AnimatedRankComponent_1 = require("../../public/components/tars/AnimatedRankComponent");
var AutoHeightCouponComponent_1 = require("../../public/components/tars/AutoHeightCouponComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useHomePage_1 = require("../../public/hooks/tars/useHomePage");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var httpClient_1 = require("../../public/network/httpClient");
var KSThemeColor_1 = require("../../public/theme/colors/KSThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var tars_1 = require("../../public/tools/tars");
var Activitys_1 = require("../../public/views/tars/Activitys");
var Avatar_1 = require("../../public/views/tars/Avatar");
var BannerBlock_1 = require("../../public/views/tars/BannerBlock");
var BottomGap_1 = require("../../public/views/tars/BottomGap");
var BottomLogo_1 = require("../../public/views/tars/BottomLogo");
var Button_1 = require("../../public/views/tars/Button");
var CouponBlock_1 = require("../../public/views/tars/CouponBlock");
var LinearBadge_1 = require("../../public/views/tars/LinearBadge");
var NoticeBlock_1 = require("../../public/views/tars/NoticeBlock");
var ProgressCircle_1 = require("../../public/views/tars/ProgressCircle");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var TouchableImage_1 = require("../../public/views/tars/TouchableImage");
var JXHHomePage = function () {
    var _a, _b, _c, _d;
    var getHtml5Image = tars_1.useHtml5Image().getHtml5Image;
    var _e = useHomePage_1.default({}), goTo = _e.goTo, refresh = _e.refresh, value = _e.value, sign = _e.sign;
    var goToJDPromotionListPage = goTo.goToJDPromotionListPage;
    var loading = value.loading, refreshing = value.refreshing, userInfo = value.userInfo, sysInfo = value.sysInfo, homeInfo = value.homeInfo;
    var bannersInterval = homeInfo.bannersInterval, onlineNum = homeInfo.onlineNum, banners = homeInfo.banners, notices = homeInfo.notices, announcements = homeInfo.announcements, homeGames = homeInfo.homeGames, coupons = homeInfo.coupons, rankLists = homeInfo.rankLists, floatAds = homeInfo.floatAds, redBag = homeInfo.redBag, redBagLogo = homeInfo.redBagLogo, roulette = homeInfo.roulette;
    var uid = userInfo.uid, usr = userInfo.usr, balance = userInfo.balance, isTest = userInfo.isTest, curLevelTitle = userInfo.curLevelTitle, unreadMsg = userInfo.unreadMsg, avatar = userInfo.avatar;
    var mobile_logo = sysInfo.mobile_logo, webName = sysInfo.webName, showCoupon = sysInfo.showCoupon, rankingListType = sysInfo.rankingListType;
    var lotterys = (_b = (_a = homeGames[0]) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : [];
    var smallLotterys = (_c = lotterys === null || lotterys === void 0 ? void 0 : lotterys.slice(4, 8)) !== null && _c !== void 0 ? _c : [];
    var moreGames = (_d = lotterys === null || lotterys === void 0 ? void 0 : lotterys.slice(8, lotterys === null || lotterys === void 0 ? void 0 : lotterys.length)) !== null && _d !== void 0 ? _d : [];
    var tryPlay = sign.tryPlay;
    if (loading) {
        return (<>
        <SafeAreaHeader_1.default headerColor={'#000000'}/>
        <ProgressCircle_1.default />
      </>);
    }
    else {
        return (<>
        <SafeAreaHeader_1.default headerColor={'#000000'}/>
        <react_native_1.ScrollView style={{ backgroundColor: '#000000', paddingHorizontal: Scale_1.scale(10) }} showsVerticalScrollIndicator={false} refreshControl={<react_native_1.RefreshControl tintColor={'#ffffff'} refreshing={refreshing} onRefresh={function () { return __awaiter(void 0, void 0, void 0, function () {
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
          <BannerBlock_1.default containerStyle={{ aspectRatio: 540 / 218 }} badgeStyle={{ top: Scale_1.scale(-210) }} autoplayTimeout={bannersInterval} onlineNum={onlineNum} banners={banners} renderBanner={function (item, index) {
            var linkCategory = item.linkCategory, linkPosition = item.linkPosition, pic = item.pic;
            return (<TouchableImage_1.default key={index} pic={pic} resizeMode={'stretch'} onPress={function () {
                PushHelper_1.default.pushCategory(linkCategory, linkPosition);
            }}/>);
        }}/>
          <NoticeBlock_1.default containerStyle={{ backgroundColor: KSThemeColor_1.KSThemeColor.凯时.themeColor, borderRadius: 0 }} bgContainerStyle={{ backgroundColor: KSThemeColor_1.KSThemeColor.凯时.themeColor }} logoTextStyle={{
            color: '#95979f',
            fontSize: Scale_1.scale(18),
            paddingHorizontal: Scale_1.scale(5),
        }} textStyle={{
            color: '#95979f',
            fontSize: Scale_1.scale(18),
        }} notices={notices} onPressNotice={function (_a) {
            var content = _a.content;
            PushHelper_1.default.pushNoticePopUp(content);
        }}/>
          <react_native_1.View style={{ width: '100%', aspectRatio: 2.3, backgroundColor: '#111111', borderRadius: Scale_1.scale(10), overflow: 'hidden' }}>
            <react_native_1.View style={{ flex: 1, backgroundColor: '#333333', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Scale_1.scale(10) }}>
              {uid ? (<>
                  <react_native_1.View style={{ flexDirection: 'row' }}>
                    <Avatar_1.default size={30} uri={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}/>
                    <react_native_1.Text style={{ color: '#ffffff' }}>{'tars1987'}</react_native_1.Text>
                    <LinearBadge_1.default title={'VIP0'} colors={['#cfa461', '#cfa461']} showIcon={false} containerStyle={{ borderRadius: Scale_1.scale(5), width: null, height: Scale_1.scale(25), paddingHorizontal: Scale_1.scale(5) }} textStyle={{ color: '#000000', fontSize: Scale_1.scale(15) }}/>
                  </react_native_1.View>
                  <react_native_1.View style={{ flexDirection: 'row' }}>
                    <react_native_1.Text style={{ color: '#ffffff' }}>{'优惠兑换'}</react_native_1.Text>
                  </react_native_1.View>
                </>) : (<react_native_1.View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Avatar_1.default size={30} uri={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar}/>
                  <react_native_1.Text style={{ color: '#c7c7c7', fontSize: Scale_1.scale(18), marginLeft: Scale_1.scale(10) }}>{'尊敬的来宾，您好，请登录'}</react_native_1.Text>
                </react_native_1.View>)}
            </react_native_1.View>

            <react_native_1.View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
              <Button_1.default title={'登录'} containerStyle={[styles.signButton, { backgroundColor: '#cfa461' }]} titleStyle={{ color: '#ffffff', fontSize: Scale_1.scale(20) }} onPress={function () {
            RootNavigation_1.navigate(Navigation_1.PageName.JXHSignInPage);
        }}/>
              <Button_1.default title={'注册'} containerStyle={[styles.signButton, { backgroundColor: '#000000', borderColor: '#cfa461', borderWidth: Scale_1.scale(1) }]} titleStyle={{ color: '#cfa461', fontSize: Scale_1.scale(20) }} onPress={function () {
            RootNavigation_1.navigate(Navigation_1.PageName.JXHSignUpPage);
        }}/>
            </react_native_1.View>
            <react_native_1.View style={{ flex: 1, backgroundColor: '#333333', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <react_native_1.Text style={{ color: '#c7c7c7' }}>{'忘记密码'}</react_native_1.Text>
              <react_native_1.Text style={{ color: '#cfa461' }}>{'免费试玩'}</react_native_1.Text>
            </react_native_1.View>
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
    signButton: {
        width: '30%',
        aspectRatio: 3,
        borderRadius: Scale_1.scale(5),
    },
});
exports.default = JXHHomePage;
