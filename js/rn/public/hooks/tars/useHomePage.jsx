"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var UgLog_1 = require("../../../public/tools/UgLog");
var UGStore_1 = require("../../../redux/store/UGStore");
var PushHelper_1 = require("../../define/PushHelper");
var Navigation_1 = require("../../navigation/Navigation");
var tars_1 = require("../../tools/tars");
var UGLoadingCP_1 = require("../../widget/UGLoadingCP");
var useTryPlay_1 = require("../useTryPlay");
var useHome_1 = require("./useHome");
var useLogOut_1 = require("./useLogOut");
var useSys_1 = require("./useSys");
var useHomePage = function (_a) {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    var onSuccessSignOut = _a.onSuccessSignOut, onSuccessTryPlay = _a.onSuccessTryPlay;
    var _8 = useHome_1.default(), loading = _8.loading, refreshing = _8.refreshing, rankList = _8.rankList, homeGame = _8.homeGame, notice = _8.notice, onlineNum = _8.onlineNum, couponList = _8.couponList, homeAd = _8.homeAd, turntableList = _8.turntableList, redBag = _8.redBag, floatAd = _8.floatAd, lotteryGame = _8.lotteryGame, lotteryNumber = _8.lotteryNumber, refresh = _8.refresh;
    var goToJDPromotionListPage = function () {
        RootNavigation_1.push(Navigation_1.PageName.JDPromotionListPage, {
            containerStyle: {
                backgroundColor: '#ffffff',
            },
        });
    };
    var tryPlay = useTryPlay_1.default({
        onSuccess: function () {
            tars_1.ToastSuccess('登录成功！');
            onSuccessTryPlay && onSuccessTryPlay();
        },
        onError: function (error) {
            tars_1.ToastError(error !== null && error !== void 0 ? error : '試玩失败');
        },
    }).tryPlay;
    var logOut = useLogOut_1.default({
        onStart: function () {
            UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading });
        },
        onSuccess: function () {
            UGLoadingCP_1.hideLoading();
            onSuccessSignOut();
        },
        onError: function (error) {
            UGLoadingCP_1.hideLoading();
            tars_1.ToastError(error || '登出失败');
            console.log('--------登出失败--------', error);
        },
    }).logOut;
    var signOut = logOut;
    var sys = useSys_1.default({}).sys;
    // stores
    var userInfo = UGStore_1.UGStore.globalProps.userInfo;
    var gameLobby = UGStore_1.UGStore.globalProps.gameLobby;
    var banner = UGStore_1.UGStore.globalProps.banner;
    // data handle
    var bannersInterval = parseInt(banner === null || banner === void 0 ? void 0 : banner.interval);
    var banners = (_b = banner === null || banner === void 0 ? void 0 : banner.list) !== null && _b !== void 0 ? _b : [];
    var notices = (_d = (_c = notice === null || notice === void 0 ? void 0 : notice.data) === null || _c === void 0 ? void 0 : _c.scroll) !== null && _d !== void 0 ? _d : [];
    var announcements = (_g = (_f = (_e = notice === null || notice === void 0 ? void 0 : notice.data) === null || _e === void 0 ? void 0 : _e.popup) === null || _f === void 0 ? void 0 : _f.map(function (item) {
        return Object.assign({ clsName: 'UGNoticeModel', hiddenBottomLine: 'No' }, item);
    })) !== null && _g !== void 0 ? _g : [];
    var navs = (_l = (_k = (_j = (_h = homeGame === null || homeGame === void 0 ? void 0 : homeGame.data) === null || _h === void 0 ? void 0 : _h.navs) === null || _j === void 0 ? void 0 : _j.sort(function (a, b) { return a.sort - b.sort; })) === null || _k === void 0 ? void 0 : _k.slice(0, 4)) !== null && _l !== void 0 ? _l : [];
    var homeGames = (_o = (_m = homeGame === null || homeGame === void 0 ? void 0 : homeGame.data) === null || _m === void 0 ? void 0 : _m.icons) !== null && _o !== void 0 ? _o : [];
    var rankLists = (_q = (_p = rankList === null || rankList === void 0 ? void 0 : rankList.data) === null || _p === void 0 ? void 0 : _p.list) !== null && _q !== void 0 ? _q : [];
    var redBagLogo = (_r = redBag === null || redBag === void 0 ? void 0 : redBag.data) === null || _r === void 0 ? void 0 : _r.redBagLogo;
    var coupons = (_u = (_t = (_s = couponList === null || couponList === void 0 ? void 0 : couponList.data) === null || _s === void 0 ? void 0 : _s.list) === null || _t === void 0 ? void 0 : _t.slice(0, 5)) !== null && _u !== void 0 ? _u : [];
    var midBanners = (_v = homeAd === null || homeAd === void 0 ? void 0 : homeAd.data) !== null && _v !== void 0 ? _v : [];
    var floatAds = (_w = floatAd === null || floatAd === void 0 ? void 0 : floatAd.data) !== null && _w !== void 0 ? _w : [];
    var roulette = turntableList === null || turntableList === void 0 ? void 0 : turntableList.data;
    var lotteryDate = (_x = lotteryNumber === null || lotteryNumber === void 0 ? void 0 : lotteryNumber.data) === null || _x === void 0 ? void 0 : _x.issue;
    var lotteryNumbers = (_0 = (_z = (_y = lotteryNumber === null || lotteryNumber === void 0 ? void 0 : lotteryNumber.data) === null || _y === void 0 ? void 0 : _y.numbers) === null || _z === void 0 ? void 0 : _z.split(',')) !== null && _0 !== void 0 ? _0 : [];
    var numColors = (_3 = (_2 = (_1 = lotteryNumber === null || lotteryNumber === void 0 ? void 0 : lotteryNumber.data) === null || _1 === void 0 ? void 0 : _1.numColor) === null || _2 === void 0 ? void 0 : _2.split(',')) !== null && _3 !== void 0 ? _3 : [];
    var numSxs = (_6 = (_5 = (_4 = lotteryNumber === null || lotteryNumber === void 0 ? void 0 : lotteryNumber.data) === null || _4 === void 0 ? void 0 : _4.numSx) === null || _5 === void 0 ? void 0 : _5.split(',')) !== null && _6 !== void 0 ? _6 : [];
    var lotterys = lotteryNumbers === null || lotteryNumbers === void 0 ? void 0 : lotteryNumbers.map(function (item, index) { return ({ number: item, color: numColors[index], sx: numSxs[index] }); });
    // 官 信
    var official_customise_games = [];
    (_7 = lotteryGame === null || lotteryGame === void 0 ? void 0 : lotteryGame.data) === null || _7 === void 0 ? void 0 : _7.forEach(function (ele) { return (official_customise_games = official_customise_games === null || official_customise_games === void 0 ? void 0 : official_customise_games.concat(ele === null || ele === void 0 ? void 0 : ele.list)); });
    var officialGames = official_customise_games === null || official_customise_games === void 0 ? void 0 : official_customise_games.filter(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.customise) == '0'; }); // 官
    var customiseGames = official_customise_games === null || official_customise_games === void 0 ? void 0 : official_customise_games.filter(function (ele) { return (ele === null || ele === void 0 ? void 0 : ele.customise) == '2'; }); // 信
    react_1.useEffect(function () {
        var _a;
        if (((_a = notice === null || notice === void 0 ? void 0 : notice.data) === null || _a === void 0 ? void 0 : _a.popup) && !UgLog_1.B_DEBUG) {
            PushHelper_1.default.pushAnnouncement(announcements);
        }
    }, [notice]);
    var goTo = {
        goToJDPromotionListPage: goToJDPromotionListPage
    };
    var sign = {
        tryPlay: tryPlay,
        signOut: signOut
    };
    var value = {
        loading: loading,
        refreshing: refreshing,
        lotteryDate: lotteryDate,
        onlineNum: onlineNum,
        bannersInterval: bannersInterval,
        lotterys: lotterys,
        banners: banners,
        notices: notices,
        midBanners: midBanners,
        announcements: announcements,
        navs: navs,
        homeGames: homeGames,
        gameLobby: gameLobby,
        officialGames: officialGames,
        customiseGames: customiseGames,
        coupons: coupons,
        rankLists: rankLists,
        redBag: redBag,
        redBagLogo: redBagLogo,
        roulette: roulette,
        floatAds: floatAds,
        userInfo: userInfo,
        sys: sys
    };
    return {
        goTo: goTo,
        sign: sign,
        value: value,
        refresh: refresh
    };
};
exports.default = useHomePage;
