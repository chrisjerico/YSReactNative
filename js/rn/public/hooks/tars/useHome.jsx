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
var UGStore_1 = require("../../../redux/store/UGStore");
var APIRouter_1 = require("../../network/APIRouter");
var localRouters = [
    'system_rankingList',
    'game_homeGames',
    'notice_latest',
    'system_onlineCount',
    'system_promotions',
    'system_homeAds',
    'lhcdoc_lotteryNumber',
    'game_lotteryGames',
    'activity_turntableList',
    'activity_redBagDetail',
    'system_floatAds',
    'game_homeRecommend',
    'system_config',
    'system_banners',
];
var globalRouters = [
    'game_homeRecommend',
    'system_config',
    'system_banners',
];
var useHome = function () {
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(false), refreshing = _b[0], setRefreshing = _b[1];
    var _c = react_1.useState({}), value = _c[0], setValue = _c[1];
    var updateStore = function (response) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        var gameLobby = (_c = (_b = (_a = response[11]) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.data) !== null && _c !== void 0 ? _c : UGStore_1.UGStore.globalProps.gameLobby;
        var sys = (_f = (_e = (_d = response[12]) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.data) !== null && _f !== void 0 ? _f : UGStore_1.UGStore.globalProps.sys;
        // const {
        //   loginVCode,
        //   login_to,
        //   adSliderTimer,
        //   appDownloadUrl
        // } = sysConf
        var banner = (_j = (_h = (_g = response[13]) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.data) !== null && _j !== void 0 ? _j : UGStore_1.UGStore.globalProps.banner;
        // sysConf: { loginVCode, login_to, adSliderTimer: stringToNumber(adSliderTimer), appDownloadUrl },
        UGStore_1.UGStore.dispatch({ type: 'merge', gameLobby: gameLobby, banner: banner, sys: sys });
        UGStore_1.UGStore.save();
    };
    var callApis = function () { return __awaiter(void 0, void 0, void 0, function () {
        var routers, response, error_1;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    _p.trys.push([0, 2, 3, 4]);
                    !loading && setRefreshing(true);
                    routers = loading ? localRouters : localRouters.concat(globalRouters);
                    return [4 /*yield*/, Promise.all(routers.map(function (router) { return __awaiter(void 0, void 0, void 0, function () {
                            var error_2;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, APIRouter_1.default[router]()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                    case 2:
                                        error_2 = _a.sent();
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    response = _p.sent();
                    !loading && updateStore(response);
                    setValue({
                        rankList: response[0] ? (_a = response[0]) === null || _a === void 0 ? void 0 : _a.data : value === null || value === void 0 ? void 0 : value.rankList,
                        homeGame: response[1] ? (_b = response[1]) === null || _b === void 0 ? void 0 : _b.data : value === null || value === void 0 ? void 0 : value.homeGame,
                        notice: response[2] ? (_c = response[2]) === null || _c === void 0 ? void 0 : _c.data : value === null || value === void 0 ? void 0 : value.notice,
                        onlineNum: response[3] ? (_f = (_e = (_d = response[3]) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.onlineUserCount : value === null || value === void 0 ? void 0 : value.onlineNum,
                        couponList: response[4] ? (_g = response[4]) === null || _g === void 0 ? void 0 : _g.data : value === null || value === void 0 ? void 0 : value.couponList,
                        homeAd: response[5] ? (_h = response[5]) === null || _h === void 0 ? void 0 : _h.data : value === null || value === void 0 ? void 0 : value.homeAd,
                        lotteryNumber: response[6] ? (_j = response[6]) === null || _j === void 0 ? void 0 : _j.data : value === null || value === void 0 ? void 0 : value.lotteryNumber,
                        lotteryGame: response[7] ? (_k = response[7]) === null || _k === void 0 ? void 0 : _k.data : value === null || value === void 0 ? void 0 : value.lotteryGame,
                        turntableList: response[8] ? (_l = response[8]) === null || _l === void 0 ? void 0 : _l.data : value === null || value === void 0 ? void 0 : value.turntableList,
                        redBag: response[9] ? (_m = response[9]) === null || _m === void 0 ? void 0 : _m.data : value === null || value === void 0 ? void 0 : value.redBag,
                        floatAd: response[10] ? (_o = response[10]) === null || _o === void 0 ? void 0 : _o.data : value === null || value === void 0 ? void 0 : value.floatAd
                    });
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _p.sent();
                    console.log("--------useHome init error--------", error_1);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    setRefreshing(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var refresh = callApis;
    react_1.useEffect(function () {
        callApis();
    }, []);
    var rankList = value.rankList, homeGame = value.homeGame, notice = value.notice, onlineNum = value.onlineNum, couponList = value.couponList, homeAd = value.homeAd, lotteryNumber = value.lotteryNumber, lotteryGame = value.lotteryGame, turntableList = value.turntableList, redBag = value.redBag, floatAd = value.floatAd;
    return {
        loading: loading,
        refreshing: refreshing,
        rankList: rankList,
        homeGame: homeGame,
        notice: notice,
        onlineNum: onlineNum,
        couponList: couponList,
        homeAd: homeAd,
        lotteryNumber: lotteryNumber,
        lotteryGame: lotteryGame,
        turntableList: turntableList,
        redBag: redBag,
        floatAd: floatAd,
        refresh: refresh
    };
};
exports.default = useHome;
