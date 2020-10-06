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
var react_1 = require("react");
var react_native_1 = require("react-native");
var AnimatedRankComponent_1 = require("../../public/components/tars/AnimatedRankComponent");
var AutoHeightCouponComponent_1 = require("../../public/components/tars/AutoHeightCouponComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useHomePage_1 = require("../../public/hooks/tars/useHomePage");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var httpClient_1 = require("../../public/network/httpClient");
var LHThemeColor_1 = require("../../public/theme/colors/LHThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var tars_1 = require("../../public/tools/tars");
var Activitys_1 = require("../../public/views/tars/Activitys");
var BannerBlock_1 = require("../../public/views/tars/BannerBlock");
var BottomGap_1 = require("../../public/views/tars/BottomGap");
var BottomLogo_1 = require("../../public/views/tars/BottomLogo");
var CouponBlock_1 = require("../../public/views/tars/CouponBlock");
var GameButton_1 = require("../../public/views/tars/GameButton");
var NoticeBlock_1 = require("../../public/views/tars/NoticeBlock");
var ProgressCircle_1 = require("../../public/views/tars/ProgressCircle");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var TouchableImage_1 = require("../../public/views/tars/TouchableImage");
var UGLotteryModel_1 = require("../../redux/model/\u5168\u5C40/UGLotteryModel");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var HomeGameComponent_1 = require("./components/HomeGameComponent");
var config_1 = require("./config");
var BottomToolBlock_1 = require("./views/BottomToolBlock");
var HomeHeader_1 = require("./views/HomeHeader");
var LotteryBall_1 = require("./views/LotteryBall");
var NavBlock_1 = require("./views/NavBlock");
var LHTHomePage = function () {
    var _a;
    // states
    var _b = react_1.useState(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.preferences), preferenceGames = _b[0], setPreferenceGames = _b[1];
    // functions
    var getHtml5Image = tars_1.useHtml5Image().getHtml5Image;
    var _c = useHomePage_1.default({}), goTo = _c.goTo, value = _c.value, sign = _c.sign, refresh = _c.refresh;
    var signOut = sign.signOut, tryPlay = sign.tryPlay;
    var goToJDPromotionListPage = goTo.goToJDPromotionListPage;
    var loading = value.loading, refreshing = value.refreshing, userInfo = value.userInfo, homeInfo = value.homeInfo, sysInfo = value.sysInfo;
    var lotteryDate = homeInfo.lotteryDate, bannersInterval = homeInfo.bannersInterval, onlineNum = homeInfo.onlineNum, lotterys = homeInfo.lotterys, banners = homeInfo.banners, notices = homeInfo.notices, midBanners = homeInfo.midBanners, announcements = homeInfo.announcements, navs = homeInfo.navs, homeGames = homeInfo.homeGames, coupons = homeInfo.coupons, rankLists = homeInfo.rankLists, floatAds = homeInfo.floatAds, redBag = homeInfo.redBag, redBagLogo = homeInfo.redBagLogo, roulette = homeInfo.roulette;
    var uid = userInfo.uid, usr = userInfo.usr, balance = userInfo.balance, isTest = userInfo.isTest, avatar = userInfo.avatar;
    var mobile_logo = sysInfo.mobile_logo, webName = sysInfo.webName, showCoupon = sysInfo.showCoupon, rankingListType = sysInfo.rankingListType, appDownloadUrl = sysInfo.appDownloadUrl;
    var plusLotterys = __spreadArrays(lotterys.slice(0, 6), [
        {
            showMore: true,
        }
    ], lotterys.slice(6));
    var chooseGames = (_a = preferenceGames === null || preferenceGames === void 0 ? void 0 : preferenceGames.concat(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.moreLottery)) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item.selected; });
    if (loading) {
        return <ProgressCircle_1.default />;
    }
    else {
        return (<>
        <SafeAreaHeader_1.default headerColor={LHThemeColor_1.LHThemeColor.六合厅.themeColor}>
          <HomeHeader_1.default avatar={isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar} name={usr} showLogout={uid ? true : false} leftLogo={mobile_logo} rightLogo={getHtml5Image(14, 'top_yhhd')} onPressSignOut={signOut} onPressSignIn={function () { return RootNavigation_1.push(Navigation_1.PageName.LHTSignInPage); }} onPressSignUp={function () { return RootNavigation_1.push(Navigation_1.PageName.LHTSignUpPage); }} onPressTryPlay={tryPlay} onPressLogo={goToJDPromotionListPage}/>
        </SafeAreaHeader_1.default>
        <react_native_1.ScrollView style={styles.container} showsVerticalScrollIndicator={false} refreshControl={<react_native_1.RefreshControl refreshing={refreshing} onRefresh={function () { return __awaiter(void 0, void 0, void 0, function () {
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
          <BannerBlock_1.default containerStyle={{ aspectRatio: 540 / 230 }} autoplayTimeout={bannersInterval} onlineNum={onlineNum} banners={banners} renderBanner={function (item, index) {
            var linkCategory = item.linkCategory, linkPosition = item.linkPosition, pic = item.pic;
            return (<TouchableImage_1.default key={index} pic={pic} resizeMode={'stretch'} onPress={function () {
                PushHelper_1.default.pushCategory(linkCategory, linkPosition);
            }}/>);
        }}/>
          <react_native_1.View style={styles.contentContainer}>
            <NoticeBlock_1.default containerStyle={[styles.subComponent, { borderRadius: Scale_1.scale(100) }]} iconContainerStyle={{
            width: Scale_1.scale(20),
            marginHorizontal: Scale_1.scale(15),
        }} notices={notices} logo={getHtml5Image(14, 'notice')} onPressNotice={function (_a) {
            var content = _a.content;
            PushHelper_1.default.pushNoticePopUp(content);
        }}/>
            <NavBlock_1.default containerStyle={[styles.subComponent, { borderRadius: Scale_1.scale(20) }]} navs={navs} lotterys={plusLotterys} date={lotteryDate} advertisement={getHtml5Image(14, 'banner', 'gif')} lotteryLogo={getHtml5Image(14, 'tjzx')} balanceLogo={getHtml5Image(14, 'yue')} balance={balance} customerServiceLogo={getHtml5Image(14, 'zxkf')} onPressSavePoint={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款); }} onPressGetPoint={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.取款); }} onPressAd={function () { return PushHelper_1.default.pushLottery(UGLotteryModel_1.LotteryType.新加坡六合彩); }} onPressSmileLogo={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服); }} renderNav={function (item, index) {
            var icon = item.icon, name = item.name, logo = item.logo, gameId = item.gameId;
            return (<GameButton_1.default key={index} showSecondLevelIcon={false} containerStyle={{ width: '25%', height: '50%' }} imageContainerStyle={{ width: '50%' }} enableCircle={false} logo={icon ? icon : logo} title={name} onPress={function () {
                if (gameId == 9) {
                    goToJDPromotionListPage();
                }
                else {
                    PushHelper_1.default.pushHomeGame(item);
                }
            }}/>);
        }} renderLottery={function (item, index) {
            var number = item.number, color = item.color, sx = item.sx, showMore = item.showMore;
            return <LotteryBall_1.default key={index} score={number} color={color} text={sx} showMore={showMore} onPress={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.彩票大厅); }}/>;
        }}/>
            <HomeGameComponent_1.default itemHeight={Scale_1.scale(200)} leftIcon={getHtml5Image(14, 'hot_icon')} rightIcon={getHtml5Image(14, 'cai_icon')} activeTabColor={'#ff6b1b'} unActiveTabColor={'#bbbbbb'} containerStyle={styles.subComponent} leftGames={chooseGames} rightGames={homeGames} renderLeftGame={function (_a) {
            var item = _a.item, index = _a.index;
            var title = item.title, logo = item.logo, des = item.des, gameType = item.gameType, selected = item.selected, gameId = item.gameId;
            var logoUrl = getHtml5Image(14, logo);
            return (<GameButton_1.default key={index} showSecondLevelIcon={false} circleColor={'#b3cde6'} logo={logoUrl} title={title} subTitle={des} showSubTitle containerStyle={{
                width: '33.3%',
                marginBottom: Scale_1.scale(20),
            }} titleContainerStyle={{
                marginTop: Scale_1.scale(5),
                aspectRatio: 3,
            }} imageContainerStyle={{
                width: logo == 'gdcz' ? '50%' : '90%',
                alignSelf: 'center',
            }} titleStyle={{ fontSize: Scale_1.scale(20), fontWeight: '300' }} subTitleStyle={{ fontSize: Scale_1.scale(19) }} onPress={function () {
                if (gameType == 'more') {
                    RootNavigation_1.navigate(Navigation_1.PageName.LHTPreferencePage, {
                        initPreferences: preferenceGames,
                        onPressConfirm: function (preferences) {
                            setPreferenceGames(preferences);
                        },
                    });
                }
                else if (gameType == 'clzx') {
                    PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.长龙助手);
                }
                else if (gameType == 'lmzs') {
                    PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.开奖网);
                }
                else {
                    PushHelper_1.default.pushLottery(gameId);
                }
            }}/>);
        }} renderRightGame={function (_a) {
            var item = _a.item, index = _a.index;
            var logo = item.logo, icon = item.icon, title = item.title, hotIcon = item.hotIcon, tipFlag = item.tipFlag, subType = item.subType;
            var showFlag = parseInt(tipFlag);
            return (<GameButton_1.default key={index} circleColor={'#b3cde6'} showRightTopFlag={showFlag > 0 && showFlag < 4} showCenterFlag={showFlag == 4} showSecondLevelIcon={false} // subType ? true : false
             flagIcon={hotIcon} logo={icon || logo} title={title} showSubTitle={false} containerStyle={{
                width: '33.3%',
                height: Scale_1.scale(180),
                marginBottom: Scale_1.scale(20),
            }} titleContainerStyle={{
                marginTop: Scale_1.scale(5),
                aspectRatio: 3,
            }} flagContainer={{
                right: Scale_1.scale(15),
                top: Scale_1.scale(-5),
            }} titleStyle={{ fontSize: Scale_1.scale(23) }} subTitleStyle={{ fontSize: Scale_1.scale(23) }} onPress={function () { return PushHelper_1.default.pushHomeGame(item); }}/>);
        }}/>
            <CouponBlock_1.default visible={showCoupon} onPressMore={goToJDPromotionListPage} containerStyle={styles.subComponent} listContainerStyle={{ borderRadius: Scale_1.scale(15) }} coupons={coupons} renderCoupon={function (_a) {
            var item = _a.item, index = _a.index;
            var pic = item.pic, linkCategory = item.linkCategory, linkPosition = item.linkPosition, title = item.title, content = item.content, linkUrl = item.linkUrl;
            return (<AutoHeightCouponComponent_1.default key={index} title={title} pic={pic} content={content} onPress={function (setShowPop) {
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
            <AnimatedRankComponent_1.default type={rankingListType} containerStyle={{ marginVertical: Scale_1.scale(10) }} iconTitleContainerStyle={styles.rankBlockIconContainerStyle} rankLists={rankLists}/>
            <BottomLogo_1.default containerStyle={{ marginBottom: Scale_1.scale(30) }} webName={webName} onPressComputer={function () {
            PushHelper_1.default.openWebView(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
        }} onPressPromotion={goToJDPromotionListPage} debug={false} version={'修正Banner比例'}/>
            <BottomToolBlock_1.default tools={config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.bottomTools} renderBottomTool={function (item, index) {
            var logo = item.logo, userCenterType = item.userCenterType;
            return (<TouchableImage_1.default key={index} containerStyle={{
                width: '32%',
                aspectRatio: 165 / 85,
                flex: null,
            }} pic={logo} onPress={function () {
                if (userCenterType) {
                    PushHelper_1.default.pushUserCenterType(userCenterType);
                }
                else {
                    PushHelper_1.default.openWebView(appDownloadUrl);
                }
            }}/>);
        }}/>
            <BottomGap_1.default />
          </react_native_1.View>
        </react_native_1.ScrollView>
        <Activitys_1.default uid={uid} isTest={isTest} refreshing={refreshing} redBagLogo={redBagLogo} redBag={redBag} roulette={roulette} floatAds={floatAds}/>
      </>);
    }
};
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: LHThemeColor_1.LHThemeColor.六合厅.homeContentSubColor,
    },
    contentContainer: {
        paddingHorizontal: Scale_1.scale(10),
        paddingTop: Scale_1.scale(10),
    },
    subComponent: {
        marginBottom: Scale_1.scale(10),
    },
    rankBlockIconContainerStyle: {
        paddingLeft: 0,
        paddingVertical: 0,
        marginBottom: Scale_1.scale(10),
    },
});
exports.default = LHTHomePage;
