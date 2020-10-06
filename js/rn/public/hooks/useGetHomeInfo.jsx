"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var react_1 = require("react");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var APIRouter_1 = require("../network/APIRouter");
var httpClient_1 = require("../network/httpClient");
var react_native_1 = require("react-native");
var AppDefine_1 = require("../define/AppDefine");
var OCCall_1 = require("../define/OCHelper/OCBridge/OCCall");
var ANHelper_1 = require("../define/ANHelper/ANHelper");
var CmdDefine_1 = require("../define/ANHelper/hp/CmdDefine");
var useGetHomeInfo = function (coustomArray) {
    var _a = react_1.useState(0), onlineNum = _a[0], setOnlineNum = _a[1];
    var _b = react_1.useState(0), onlineSwitch = _b[0], setOnlineSwitch = _b[1];
    var _c = react_1.useState(), redBag = _c[0], setRedBag = _c[1];
    var _d = react_1.useState(), floatAds = _d[0], setFloatAds = _d[1];
    var _e = react_1.useState(), homeGames = _e[0], setHomeGames = _e[1];
    var _f = react_1.useState(), banner = _f[0], setBanner = _f[1];
    var _g = react_1.useState(), notice = _g[0], setNotice = _g[1];
    var _h = react_1.useState(), couponListData = _h[0], setCouponListData = _h[1];
    var _j = react_1.useState(), rankList = _j[0], setRankList = _j[1];
    var _k = react_1.useState(true), loading = _k[0], setLoading = _k[1];
    var _l = react_1.useState(), lotteryNumber = _l[0], setLotteryNumber = _l[1];
    var _m = react_1.useState(), categoryList = _m[0], setCategoryList = _m[1];
    var _o = react_1.useState(), turntableList = _o[0], setTurntableList = _o[1];
    var _p = react_1.useState(), lotteryGames = _p[0], setLotteryGames = _p[1];
    var _q = react_1.useState(), systemConfig = _q[0], setSystemConfig = _q[1];
    var _r = react_1.useState(), systemHomeAds = _r[0], setSystemHomeAds = _r[1];
    var _s = react_1.useState(), originalNoticeString = _s[0], setOriginalNoticeString = _s[1];
    var _t = react_1.useState(), noticeFormat = _t[0], setnoticeFormat = _t[1];
    react_1.useEffect(function () {
        setTimeout(function () {
            init();
        }, 1000);
    }, []);
    react_1.useEffect(function () {
        var _a, _b, _c, _d;
        var string = "";
        var noticeData = (_c = (_b = (_a = notice === null || notice === void 0 ? void 0 : notice.data) === null || _a === void 0 ? void 0 : _a.scroll) === null || _b === void 0 ? void 0 : _b.map(function (res) {
            string += res.content;
            return { label: res.id, value: res.title };
        })) !== null && _c !== void 0 ? _c : [];
        if ((_d = notice === null || notice === void 0 ? void 0 : notice.data) === null || _d === void 0 ? void 0 : _d.popup) {
            // openPopup(notice)
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
    var init = function () {
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('AppDefine.shared.Host').then(function (host) {
                    initHost(host);
                });
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.APP_HOST).then(function (host) {
                    initHost(host);
                });
                break;
        }
    };
    var initHost = function (host) {
        httpClient_1.httpClient.defaults.baseURL = host;
        if ((coustomArray === null || coustomArray === void 0 ? void 0 : coustomArray.length) > 0) {
            var requests = [];
            for (var key in coustomArray) {
                if (coustomArray.hasOwnProperty(key)) {
                    var element = coustomArray[key];
                    requests.push(APIRouter_1.default[element]());
                }
            }
            axios_1.default.all(requests)
                .then(axios_1.default.spread(function () {
                var res = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    res[_i] = arguments[_i];
                }
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
                for (var key in coustomArray) {
                    if (coustomArray.hasOwnProperty(key)) {
                        var element = coustomArray[key];
                        switch (element) {
                            case 'game_homeGames':
                                setHomeGames((_a = res[key]) === null || _a === void 0 ? void 0 : _a.data);
                                break;
                            case 'system_banners':
                                setBanner((_b = res[key]) === null || _b === void 0 ? void 0 : _b.data);
                                break;
                            case 'notice_latest':
                                setNotice((_c = res[key]) === null || _c === void 0 ? void 0 : _c.data);
                                break;
                            case 'system_promotions':
                                setCouponListData((_d = res[key]) === null || _d === void 0 ? void 0 : _d.data);
                                break;
                            case 'system_rankingList':
                                setRankList((_e = res[key]) === null || _e === void 0 ? void 0 : _e.data);
                                break;
                            case 'activity_redBagDetail':
                                setRedBag((_f = res[key]) === null || _f === void 0 ? void 0 : _f.data);
                                break;
                            case 'system_floatAds':
                                setFloatAds((_g = res[key]) === null || _g === void 0 ? void 0 : _g.data);
                                break;
                            case 'system_onlineCount':
                                setOnlineNum((_k = (_j = (_h = res[key]) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.onlineUserCount);
                                setOnlineSwitch((_o = (_m = (_l = res[key]) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.data) === null || _o === void 0 ? void 0 : _o.onlineSwitch);
                                break;
                            case 'lhcdoc_lotteryNumber':
                                setLotteryNumber((_p = res[key]) === null || _p === void 0 ? void 0 : _p.data);
                                break;
                            case 'lhcdoc_categoryList':
                                setCategoryList((_q = res[key]) === null || _q === void 0 ? void 0 : _q.data);
                                break;
                            case 'activity_turntableList':
                                setTurntableList((_r = res[key]) === null || _r === void 0 ? void 0 : _r.data);
                                break;
                            case 'game_lotteryGames':
                                setLotteryGames((_s = res[key]) === null || _s === void 0 ? void 0 : _s.data);
                                break;
                            case 'system_config':
                                setSystemConfig((_t = res[key]) === null || _t === void 0 ? void 0 : _t.data);
                                break;
                            case 'system_homeAds':
                                setSystemHomeAds((_u = res[key]) === null || _u === void 0 ? void 0 : _u.data);
                                break;
                            default:
                                break;
                        }
                    }
                    setLoading(false);
                }
            }))
                .catch(function (error) {
                setLoading(false);
                console.log(error);
            });
        }
        else {
            axios_1.default.all([
                APIRouter_1.default.game_homeGames(),
                APIRouter_1.default.system_banners(),
                APIRouter_1.default.notice_latest(),
                APIRouter_1.default.system_promotions(),
                APIRouter_1.default.system_rankingList(),
                APIRouter_1.default.system_onlineCount(),
                APIRouter_1.default.activity_redBagDetail(),
                APIRouter_1.default.system_floatAds(),
            ])
                .then(axios_1.default.spread(function () {
                var res = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    res[_i] = arguments[_i];
                }
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                setHomeGames((_a = res === null || res === void 0 ? void 0 : res[0]) === null || _a === void 0 ? void 0 : _a.data);
                setBanner((_b = res === null || res === void 0 ? void 0 : res[1]) === null || _b === void 0 ? void 0 : _b.data);
                setCouponListData((_c = res === null || res === void 0 ? void 0 : res[3]) === null || _c === void 0 ? void 0 : _c.data);
                setRankList((_d = res === null || res === void 0 ? void 0 : res[4]) === null || _d === void 0 ? void 0 : _d.data);
                setRedBag((_e = res === null || res === void 0 ? void 0 : res[6]) === null || _e === void 0 ? void 0 : _e.data);
                setFloatAds((_f = res === null || res === void 0 ? void 0 : res[7]) === null || _f === void 0 ? void 0 : _f.data);
                setNotice((_g = res === null || res === void 0 ? void 0 : res[2]) === null || _g === void 0 ? void 0 : _g.data);
                setOnlineNum((_k = (_j = (_h = res === null || res === void 0 ? void 0 : res[5]) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.onlineUserCount);
                setOnlineSwitch((_o = (_m = (_l = res[5]) === null || _l === void 0 ? void 0 : _l.data) === null || _m === void 0 ? void 0 : _m.data) === null || _o === void 0 ? void 0 : _o.onlineSwitch);
                setLoading(false);
            }))
                .catch(function (err) {
                setLoading(false);
            });
        }
    };
    var onRefresh = function () {
        init();
    };
    return {
        onlineNum: onlineNum,
        redBag: redBag,
        floatAds: floatAds,
        homeGames: homeGames,
        banner: banner,
        notice: notice,
        rankList: rankList,
        loading: loading,
        couponListData: couponListData,
        lotteryNumber: lotteryNumber,
        categoryList: categoryList,
        turntableList: turntableList,
        lotteryGames: lotteryGames,
        systemConfig: systemConfig,
        systemHomeAds: systemHomeAds,
        onRefresh: onRefresh,
        noticeFormat: noticeFormat,
        originalNoticeString: originalNoticeString,
        onlineSwitch: onlineSwitch
    };
};
exports.default = useGetHomeInfo;
