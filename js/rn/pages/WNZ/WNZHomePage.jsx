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
var ActivityComponent_1 = require("../../public/components/tars/ActivityComponent");
var AnimatedRankComponent_1 = require("../../public/components/tars/AnimatedRankComponent");
var AutoHeightCouponComponent_1 = require("../../public/components/tars/AutoHeightCouponComponent");
var GameSubTypeComponent_1 = require("../../public/components/tars/GameSubTypeComponent");
var TabComponent_1 = require("../../public/components/tars/TabComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useHomePage_1 = require("../../public/hooks/tars/useHomePage");
var useRerender_1 = require("../../public/hooks/tars/useRerender");
var httpClient_1 = require("../../public/network/httpClient");
var WNZThemeColor_1 = require("../../public/theme/colors/WNZThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var tars_1 = require("../../public/tools/tars");
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
var MenuModalComponent_1 = require("./components/MenuModalComponent");
var config_1 = require("./config");
var HomeHeader_1 = require("./views/HomeHeader");
var Menu_1 = require("./views/Menu");
var RowGameButtom_1 = require("./views/RowGameButtom");
var TabBar_1 = require("./views/TabBar");
var getHtml5Image = tars_1.useHtml5Image('http://test10.6yc.com').getHtml5Image;
var WNZHomePage = function () {
    var _a, _b;
    // LogBox.ignoreAllLogs()
    var menu = react_1.useRef(null);
    var rerender = useRerender_1.default().rerender;
    var _c = useHomePage_1.default({
        onSuccessSignOut: function () {
            var _a;
            (_a = menu === null || menu === void 0 ? void 0 : menu.current) === null || _a === void 0 ? void 0 : _a.close();
            rerender();
        },
    }), goTo = _c.goTo, refresh = _c.refresh, value = _c.value, sign = _c.sign;
    var goToJDPromotionListPage = goTo.goToJDPromotionListPage;
    var loading = value.loading, refreshing = value.refreshing, userInfo = value.userInfo, sys = value.sys, bannersInterval = value.bannersInterval, onlineNum = value.onlineNum, banners = value.banners, notices = value.notices, midBanners = value.midBanners, announcements = value.announcements, navs = value.navs, homeGames = value.homeGames, coupons = value.coupons, rankLists = value.rankLists, floatAds = value.floatAds, redBag = value.redBag, redBagLogo = value.redBagLogo, roulette = value.roulette, officialGames = value.officialGames, customiseGames = value.customiseGames;
    var signOut = sign.signOut;
    var uid = userInfo.uid, usr = userInfo.usr, balance = userInfo.balance, isTest = userInfo.isTest;
    var mobile_logo = sys.mobile_logo, webName = sys.webName, showCoupon = sys.showCoupon, rankingListType = sys.rankingListType, midBannerTimer = sys.midBannerTimer;
    var homeGamesConcat = [];
    homeGames.forEach(function (item) { var _a; return (homeGamesConcat = (_a = homeGamesConcat.concat(item === null || item === void 0 ? void 0 : item.list)) !== null && _a !== void 0 ? _a : []); });
    var tabGames = [
        {
            name: '官方玩法',
            logo: getHtml5Image(23, 'home/gfwf'),
            games: officialGames,
        },
        {
            name: '信用玩法',
            logo: getHtml5Image(23, 'home/xywf'),
            games: customiseGames,
        },
    ];
    var menus = uid
        ? (_a = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.menus) === null || _a === void 0 ? void 0 : _a.concat(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.menuSignOut) : // @ts-ignore
     (_b = config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.menuSignIn) === null || _b === void 0 ? void 0 : _b.concat(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.menus);
    if (loading) {
        return (<>
        <SafeAreaHeader_1.default headerColor={WNZThemeColor_1.WNZThemeColor.威尼斯.themeColor}/>
        <ProgressCircle_1.default />
      </>);
    }
    else {
        return (<>
        <SafeAreaHeader_1.default headerColor={WNZThemeColor_1.WNZThemeColor.威尼斯.themeColor}>
          <HomeHeader_1.default uid={uid} showBackBtn={false} name={usr} logo={mobile_logo} balance={balance} onPressMenu={function () {
            var _a;
            (_a = menu === null || menu === void 0 ? void 0 : menu.current) === null || _a === void 0 ? void 0 : _a.open();
        }} onPressComment={function () {
            PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.聊天室);
        }} onPressUser={function () {
            PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.我的页);
        }}/>
        </SafeAreaHeader_1.default>
        <react_native_1.ScrollView showsVerticalScrollIndicator={false} style={styles.container} refreshControl={<react_native_1.RefreshControl refreshing={refreshing} onRefresh={function () { return __awaiter(void 0, void 0, void 0, function () {
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
          <BannerBlock_1.default containerStyle={{ aspectRatio: 540 / 240 }} badgeStyle={{ top: Scale_1.scale(-230) }} autoplayTimeout={bannersInterval} onlineNum={onlineNum} banners={banners} renderBanner={function (item, index) {
            var linkCategory = item.linkCategory, linkPosition = item.linkPosition, pic = item.pic;
            return (<TouchableImage_1.default key={index} pic={pic} resizeMode={'stretch'} onPress={function () {
                PushHelper_1.default.pushCategory(linkCategory, linkPosition);
            }}/>);
        }}/>
          <NoticeBlock_1.default containerStyle={{
            borderRadius: 0,
            marginBottom: Scale_1.scale(5),
            aspectRatio: 540 / 35,
        }} iconContainerStyle={{
            borderColor: '#ef473a',
            borderWidth: Scale_1.scale(1),
            marginHorizontal: Scale_1.scale(10),
            borderRadius: Scale_1.scale(2),
        }} notices={notices} onPressNotice={function (_a) {
            var content = _a.content;
            PushHelper_1.default.pushNoticePopUp(content);
        }} logoTextStyle={{
            color: 'red',
            fontSize: Scale_1.scale(16),
            padding: Scale_1.scale(5),
        }} textStyle={{ fontSize: Scale_1.scale(16) }}/>
          <NavBlock_1.default visible={(navs === null || navs === void 0 ? void 0 : navs.length) > 0} navs={navs} renderNav={function (item, index) {
            var icon = item.icon, name = item.name, logo = item.logo, gameId = item.gameId;
            return (<GameButton_1.default key={index} logo={icon || logo} title={name} containerStyle={{
                width: '20%',
                backgroundColor: '#ffffff',
                justifyContent: 'center',
            }} titleContainerStyle={{ aspectRatio: 5 }} titleStyle={{
                color: config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.navColors[index],
                fontSize: Scale_1.scale(23),
            }} circleColor={'transparent'} onPress={function () {
                if (gameId == 9) {
                    goToJDPromotionListPage();
                }
                else {
                    PushHelper_1.default.pushHomeGame(item);
                }
            }}/>);
        }}/>
          <BannerBlock_1.default containerStyle={{ aspectRatio: 540 / 110, marginTop: Scale_1.scale(5) }} visible={(midBanners === null || midBanners === void 0 ? void 0 : midBanners.length) > 0} autoplayTimeout={midBannerTimer} showOnlineNum={false} banners={midBanners} renderBanner={function (item, index) {
            var linkCategory = item.linkCategory, linkPosition = item.linkPosition, image = item.image;
            return (<TouchableImage_1.default key={index} pic={image} resizeMode={'stretch'} onPress={function () {
                PushHelper_1.default.pushCategory(linkCategory, linkPosition);
            }}/>);
        }}/>
          <GameSubTypeComponent_1.default uniqueKey={'WNZHomePage_GameSubTypeComponent'} containerStyle={{ paddingVertical: Scale_1.scale(5) }} numColumns={4} games={homeGamesConcat} subTypeContainerStyle={{
            marginTop: Scale_1.scale(10),
            paddingHorizontal: Scale_1.scale(10),
        }} subTypeNumColumns={4} renderSubType={function (_a) {
            var item = _a.item, index = _a.index;
            var title = item.title;
            return (<Button_1.default key={index} containerStyle={styles.subTypeButton} titleStyle={{ color: '#ffffff', fontSize: Scale_1.scale(15) }} title={title} onPress={function () {
                PushHelper_1.default.pushHomeGame(item);
            }}/>);
        }} renderGame={function (_a) {
            var item = _a.item, index = _a.index, showGameSubType = _a.showGameSubType;
            var logo = item.logo, name = item.name, hotIcon = item.hotIcon, tipFlag = item.tipFlag, subType = item.subType, icon = item.icon;
            var flagType = parseInt(tipFlag);
            return (<react_native_1.View style={styles.gameContainer}>
                  <GameButton_1.default logo={icon || logo} showSecondLevelIcon={subType ? true : false} showRightTopFlag={flagType > 0 && flagType < 4} showCenterFlag={flagType == 4} flagIcon={hotIcon} title={name} containerStyle={{
                width: '100%',
                backgroundColor: '#ffffff',
                aspectRatio: 0.9,
                borderRadius: Scale_1.scale(10),
                justifyContent: 'center',
            }} titleContainerStyle={{
                aspectRatio: 5,
                paddingTop: Scale_1.scale(5),
            }} secondLevelIconContainerStyle={{
                right: -Scale_1.scale(10),
                top: null,
                bottom: 0,
            }} enableCircle={false} onPress={function () {
                if (subType) {
                    showGameSubType(index);
                }
                else {
                    //@ts-ignore
                    PushHelper_1.default.pushHomeGame(item);
                }
            }}/>
                </react_native_1.View>);
        }}/>
          <TabComponent_1.default tabGames={tabGames} numColumns={2} enableAutoScrollTab={false} tabScrollEnabled={false} initialTabIndex={0} baseHeight={Scale_1.scale(82)} itemHeight={Scale_1.scale(100)} renderTabBar={TabBar_1.default} renderScene={function (_a) {
            var item = _a.item, tab = _a.tab;
            return (<List_1.default uniqueKey={'WNZHomePage' + tab} legacyImplementation={true} removeClippedSubviews={true} style={{ backgroundColor: '#ffffff' }} numColumns={2} 
            //@ts-ignore
            data={item} renderItem={function (_a) {
                var item = _a.item, index = _a.index;
                //@ts-ignore
                var title = item.title, pic = item.pic, openCycle = item.openCycle, id = item.id;
                return (<RowGameButtom_1.default showRightBorder={index % 2 == 0} logo={pic} name={title} desc={openCycle} logoBallText={tab == '官方玩法' ? '官' : '信'} onPress={function () {
                    PushHelper_1.default.pushLottery(tars_1.stringToNumber(id));
                }}/>);
            }}/>);
        }}/>
          <CouponBlock_1.default visible={showCoupon} onPressMore={goToJDPromotionListPage} containerStyle={styles.subComponent} coupons={coupons} renderCoupon={function (_a) {
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
          <AnimatedRankComponent_1.default type={rankingListType} rankLists={rankLists} contentContainerStyle={{ borderRadius: 0 }}/>
          <BottomLogo_1.default webName={webName} onPressComputer={function () {
            PushHelper_1.default.openWebView(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
        }} onPressPromotion={goToJDPromotionListPage} debug={false}/>
          <BottomGap_1.default />
        </react_native_1.ScrollView>
        <ActivityComponent_1.default refreshing={refreshing} containerStyle={{ top: Scale_1.scale(250), right: 0 }} show={uid && redBagLogo && !isTest} logo={redBagLogo} onPress={function () {
            PushHelper_1.default.pushRedBag(redBag);
        }}/>
        <ActivityComponent_1.default refreshing={refreshing} containerStyle={{ top: Scale_1.scale(400), right: 0 }} enableFastImage={false} show={uid && roulette && !isTest} logo={'dzp_btn'} onPress={function () {
            PushHelper_1.default.pushWheel(roulette);
        }}/>
        {floatAds === null || floatAds === void 0 ? void 0 : floatAds.map(function (item, index) {
            var image = item.image, position = item.position, linkCategory = item.linkCategory, linkPosition = item.linkPosition;
            return (<ActivityComponent_1.default key={index} refreshing={refreshing} containerStyle={tars_1.getActivityPosition(position)} enableFastImage={true} show={uid && !isTest} logo={image} onPress={function () {
                PushHelper_1.default.pushCategory(linkCategory, linkPosition);
            }}/>);
        })}
        <MenuModalComponent_1.default ref={menu} menus={menus} renderMenu={function (_a) {
            var item = _a.item;
            var title = item.title, onPress = item.onPress;
            return (<Menu_1.default color={WNZThemeColor_1.WNZThemeColor.威尼斯.themeColor} title={title} onPress={function () {
                var _a;
                if (title == '安全退出') {
                    signOut();
                }
                else {
                    (_a = menu === null || menu === void 0 ? void 0 : menu.current) === null || _a === void 0 ? void 0 : _a.close();
                    onPress && onPress();
                }
            }}/>);
        }}/>
      </>);
    }
};
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
    },
    gameContainer: {
        width: '25%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: Scale_1.scale(5),
    },
    subComponent: {
        marginTop: Scale_1.scale(10),
        backgroundColor: '#ffffff',
    },
    subTypeButton: {
        width: '20%',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        marginBottom: Scale_1.scale(20),
        backgroundColor: WNZThemeColor_1.WNZThemeColor.威尼斯.themeColor,
        paddingVertical: Scale_1.scale(20),
        borderRadius: Scale_1.scale(5),
    },
});
exports.default = WNZHomePage;
