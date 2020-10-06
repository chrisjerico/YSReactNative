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
var GameSubTypeComponent_1 = require("../../public/components/tars/GameSubTypeComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useHomePage_1 = require("../../public/hooks/tars/useHomePage");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var httpClient_1 = require("../../public/network/httpClient");
var BZHThemeColor_1 = require("../../public/theme/colors/BZHThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var Activitys_1 = require("../../public/views/tars/Activitys");
var BannerBlock_1 = require("../../public/views/tars/BannerBlock");
var BottomGap_1 = require("../../public/views/tars/BottomGap");
var BottomLogo_1 = require("../../public/views/tars/BottomLogo");
var Button_1 = require("../../public/views/tars/Button");
var CouponBlock_1 = require("../../public/views/tars/CouponBlock");
var GameButton_1 = require("../../public/views/tars/GameButton");
var List_1 = require("../../public/views/tars/List");
var NavBlock_1 = require("../../public/views/tars/NavBlock");
var NoticeBlock_1 = require("../../public/views/tars/NoticeBlock");
var ProgressCircle_1 = require("../../public/views/tars/ProgressCircle");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var TouchableImage_1 = require("../../public/views/tars/TouchableImage");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var GameBlock_1 = require("./views/GameBlock");
var HomeHeader_1 = require("./views/HomeHeader");
var BZHHomePage = function () {
    var _a;
    var _b = useHomePage_1.default({}), goTo = _b.goTo, refresh = _b.refresh, value = _b.value;
    var goToJDPromotionListPage = goTo.goToJDPromotionListPage;
    var loading = value.loading, refreshing = value.refreshing, userInfo = value.userInfo, sysInfo = value.sysInfo, homeInfo = value.homeInfo;
    var bannersInterval = homeInfo.bannersInterval, onlineNum = homeInfo.onlineNum, banners = homeInfo.banners, notices = homeInfo.notices, midBanners = homeInfo.midBanners, announcements = homeInfo.announcements, navs = homeInfo.navs, homeGames = homeInfo.homeGames, gameLobby = homeInfo.gameLobby, coupons = homeInfo.coupons, rankLists = homeInfo.rankLists, floatAds = homeInfo.floatAds, redBag = homeInfo.redBag, redBagLogo = homeInfo.redBagLogo, roulette = homeInfo.roulette;
    var uid = userInfo.uid, usr = userInfo.usr, balance = userInfo.balance, isTest = userInfo.isTest;
    var mobile_logo = sysInfo.mobile_logo, webName = sysInfo.webName, showCoupon = sysInfo.showCoupon, rankingListType = sysInfo.rankingListType, midBannerTimer = sysInfo.midBannerTimer;
    var recommendGameTabs = (_a = gameLobby === null || gameLobby === void 0 ? void 0 : gameLobby.map(function (item) { return item === null || item === void 0 ? void 0 : item.categoryName; })) !== null && _a !== void 0 ? _a : [];
    if (loading) {
        return (<>
        <SafeAreaHeader_1.default headerColor={BZHThemeColor_1.BZHThemeColor.宝石红.themeColor}/>
        <ProgressCircle_1.default />
      </>);
    }
    else {
        return (<>
        <SafeAreaHeader_1.default headerColor={BZHThemeColor_1.BZHThemeColor.宝石红.themeColor}>
          <HomeHeader_1.default logo={mobile_logo} isTest={isTest} uid={uid} name={usr} balance={balance} onPressSignIn={function () { return RootNavigation_1.push(Navigation_1.PageName.BZHSignInPage); }} onPressSignUp={function () { return RootNavigation_1.push(Navigation_1.PageName.BZHSignUpPage); }} onPressUser={function () {
            PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.我的页);
        }}/>
        </SafeAreaHeader_1.default>
        <List_1.default uniqueKey={'BZHHomePage'} scrollEnabled={true} removeClippedSubviews={true} data={homeGames} refreshing={refreshing} onRefresh={function () { return __awaiter(void 0, void 0, void 0, function () {
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
        }); }} ListHeaderComponent={function () { return (<>
              <BannerBlock_1.default containerStyle={{ aspectRatio: 540 / 218 }} badgeStyle={{ top: Scale_1.scale(-210) }} autoplayTimeout={bannersInterval} onlineNum={onlineNum} banners={banners} renderBanner={function (item, index) {
            var linkCategory = item.linkCategory, linkPosition = item.linkPosition, pic = item.pic;
            return (<TouchableImage_1.default key={index} pic={pic} resizeMode={'stretch'} onPress={function () {
                PushHelper_1.default.pushCategory(linkCategory, linkPosition);
            }}/>);
        }}/>
              <NoticeBlock_1.default logoTextStyle={{
            fontSize: Scale_1.scale(18),
            paddingHorizontal: Scale_1.scale(10),
        }} textStyle={{ fontSize: Scale_1.scale(18) }} containerStyle={{ borderRadius: 0 }} notices={notices} onPressNotice={function (_a) {
            var content = _a.content;
            PushHelper_1.default.pushNoticePopUp(content);
        }}/>
              <NavBlock_1.default visible={(navs === null || navs === void 0 ? void 0 : navs.length) > 0} navs={navs} renderNav={function (item, index) {
            var icon = item.icon, name = item.name, logo = item.logo, gameId = item.gameId;
            return (<GameButton_1.default showSubTitle={false} showSecondLevelIcon={false} key={index} containerStyle={{ width: '25%', marginTop: Scale_1.scale(15) }} imageContainerStyle={{ width: '30%' }} enableCircle={false} logo={icon || logo} title={name} titleStyle={{
                fontSize: Scale_1.scale(20),
                fontWeight: '300',
                paddingTop: Scale_1.scale(5),
            }} titleContainerStyle={{ aspectRatio: 5 }} onPress={function () {
                if (gameId == 9) {
                    goToJDPromotionListPage();
                }
                else {
                    PushHelper_1.default.pushHomeGame(item);
                }
            }}/>);
        }}/>
              <BannerBlock_1.default visible={(midBanners === null || midBanners === void 0 ? void 0 : midBanners.length) > 0} autoplayTimeout={midBannerTimer} showOnlineNum={false} banners={midBanners} renderBanner={function (item, index) {
            var linkCategory = item.linkCategory, linkPosition = item.linkPosition, image = item.image;
            return (<TouchableImage_1.default key={index} pic={image} resizeMode={'stretch'} onPress={function () {
                PushHelper_1.default.pushCategory(linkCategory, linkPosition);
            }}/>);
        }}/>
            </>); }} renderItem={function (_a) {
            var item = _a.item, index = _a.index;
            var name = item.name, list = item.list;
            return (<GameBlock_1.default containerStyle={[
                styles.subComponent,
                {
                    marginHorizontal: '1%',
                },
            ]} title={name} onPressTotal={function () {
                if (uid) {
                    var index_1 = 0;
                    if (name == '视讯') {
                        index_1 = recommendGameTabs === null || recommendGameTabs === void 0 ? void 0 : recommendGameTabs.findIndex(function (item) { return item == '真人' || item == '视讯'; });
                    }
                    else {
                        index_1 = recommendGameTabs === null || recommendGameTabs === void 0 ? void 0 : recommendGameTabs.findIndex(function (item) { return item == name; });
                    }
                    var initialTabIndex = index_1 < 0 ? 0 : index_1;
                    RootNavigation_1.push(Navigation_1.PageName.BZHGameLobbyPage, {
                        initialTabIndex: initialTabIndex,
                    });
                }
                else {
                    RootNavigation_1.push(Navigation_1.PageName.BZHSignInPage);
                }
            }} renderGameContent={function () { return (<GameSubTypeComponent_1.default uniqueKey={index.toString()} containerStyle={{ paddingTop: Scale_1.scale(20) }} subTypeContainerStyle={{
                marginBottom: Scale_1.scale(20),
                paddingHorizontal: Scale_1.scale(20),
            }} games={list} numColumns={3} subTypeNumColumns={3} renderSubType={function (_a) {
                var item = _a.item, index = _a.index;
                var title = item.title;
                return (<Button_1.default key={index} containerStyle={{
                    width: '27%',
                    marginLeft: index % 3 == 1 ? '9.5%' : 0,
                    marginRight: index % 3 == 1 ? '9.5%' : 0,
                    marginBottom: Scale_1.scale(20),
                    backgroundColor: BZHThemeColor_1.BZHThemeColor.宝石红.themeLightColor,
                    paddingVertical: Scale_1.scale(20),
                    borderRadius: Scale_1.scale(5),
                }} titleStyle={{
                    color: '#000000',
                    fontSize: Scale_1.scale(15),
                }} title={title} onPress={function () {
                    PushHelper_1.default.pushHomeGame(item);
                }}/>);
            }} renderGame={function (_a) {
                var item = _a.item, index = _a.index, showGameSubType = _a.showGameSubType;
                var title = item.title, logo = item.logo, icon = item.icon, name = item.name, subtitle = item.subtitle, tipFlag = item.tipFlag, hotIcon = item.hotIcon, subType = item.subType;
                var showFlag = parseInt(tipFlag);
                return (<GameButton_1.default key={index} showRightTopFlag={showFlag > 0 && showFlag < 4} showCenterFlag={showFlag == 4} showSecondLevelIcon={subType ? true : false} flagIcon={hotIcon} resizeMode={'contain'} containerStyle={[
                    styles.gameContainer,
                    {
                        marginLeft: index % 3 == 1 ? '5%' : 0,
                        marginRight: index % 3 == 1 ? '5%' : 0,
                    },
                ]} imageContainerStyle={{ width: '50%' }} enableCircle={false} logo={icon || logo} title={name || title} subTitle={subtitle} showSubTitle titleStyle={{
                    fontSize: Scale_1.scale(21),
                }} subTitleStyle={{
                    fontSize: Scale_1.scale(20),
                }} titleContainerStyle={{
                    marginTop: Scale_1.scale(5),
                    aspectRatio: 2.5,
                }} onPress={function () {
                    if (subType) {
                        showGameSubType(index);
                    }
                    else {
                        //@ts-ignore
                        PushHelper_1.default.pushHomeGame(item);
                    }
                }}/>);
            }}/>); }}/>);
        }} ListFooterComponent={function () { return (<>
              <CouponBlock_1.default visible={showCoupon} onPressMore={goToJDPromotionListPage} containerStyle={{
            paddingHorizontal: '1%',
            marginTop: Scale_1.scale(10),
        }} titleContainerStyle={{ backgroundColor: '#ffffff' }} coupons={coupons} renderCoupon={function (_a) {
            var item = _a.item, index = _a.index;
            var pic = item.pic, linkCategory = item.linkCategory, linkPosition = item.linkPosition, title = item.title, content = item.content, linkUrl = item.linkUrl;
            return (<AutoHeightCouponComponent_1.default titleStyle={{ alignSelf: 'center' }} containerStyle={{
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
              <AnimatedRankComponent_1.default type={rankingListType} containerStyle={styles.subComponent} iconTitleContainerStyle={{
            backgroundColor: '#ffffff',
            borderBottomColor: '#d9d9d9',
            borderBottomWidth: Scale_1.scale(1),
        }} contentContainerStyle={{
            width: '95%',
            borderWidth: Scale_1.scale(1),
            borderColor: '#d9d9d9',
            alignSelf: 'center',
            marginBottom: Scale_1.scale(20),
        }} rankLists={rankLists}/>
              <BottomLogo_1.default webName={webName} containerStyle={{ marginBottom: Scale_1.scale(5) }} onPressComputer={function () {
            PushHelper_1.default.openWebView(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
        }} onPressPromotion={goToJDPromotionListPage} debug={false} version={'測試dev設定'}/>
              <BottomGap_1.default />
            </>); }}/>
        <Activitys_1.default uid={uid} isTest={isTest} refreshing={refreshing} redBagLogo={redBagLogo} redBag={redBag} roulette={roulette} floatAds={floatAds}/>
      </>);
    }
};
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: BZHThemeColor_1.BZHThemeColor.宝石红.homeContentSubColor,
    },
    subComponent: {
        marginTop: Scale_1.scale(10),
        backgroundColor: '#ffffff',
    },
    gameContainer: {
        width: '30%',
        height: null,
        marginBottom: Scale_1.scale(20),
    },
});
exports.default = BZHHomePage;
