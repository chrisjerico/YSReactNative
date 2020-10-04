"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var CCSessionModel_1 = require("./CCSessionModel");
var SlideCodeModel_1 = require("../../redux/model/other/SlideCodeModel");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var react_native_1 = require("react-native");
var ANHelper_1 = require("../define/ANHelper/ANHelper");
var CmdDefine_1 = require("../define/ANHelper/hp/CmdDefine");
var NetworkRequest1 = /** @class */ (function () {
    function NetworkRequest1() {
    }
    // 拿我的頁列表
    NetworkRequest1.userCenterList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, OCHelper_1.OCHelper.call('UGSystemConfigModel.currentConfig.userCenter')];
            });
        });
    };
    // 獲取中獎號碼
    NetworkRequest1.lotteryNumber = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CCSessionModel_1.default.req('c=lhcdoc&a=lotteryNumber')];
                    case 1: return [2 /*return*/, _a.sent()]; // c=game&a=lotteryHistoryy
                }
            });
        });
    };
    // 获取首页游戏列表
    NetworkRequest1.game_homeGames = function () {
        return CCSessionModel_1.default.req('c=game&a=homeGames');
    };
    // 获取帖子详情
    NetworkRequest1.lhdoc_contentDetail = function (id) {
        return CCSessionModel_1.default.req('c=lhcdoc&a=contentDetail', { id: id }, false);
    };
    // 获取优惠券
    NetworkRequest1.couponList = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CCSessionModel_1.default.req('c=system&a=promotions')];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // 获取主页数据
    NetworkRequest1.homeInfo = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response1, banner, notice, game, coupon, redBag, floatAd, responseJson1, bean;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://facebook.github.io/react-native/movies.json')];
                    case 1:
                        response1 = _a.sent();
                        return [4 /*yield*/, CCSessionModel_1.default.req('c=system&a=banners')];
                    case 2:
                        banner = _a.sent();
                        return [4 /*yield*/, CCSessionModel_1.default.req('c=notice&a=latest')];
                    case 3:
                        notice = _a.sent();
                        return [4 /*yield*/, CCSessionModel_1.default.req('c=game&a=homeGames')];
                    case 4:
                        game = _a.sent();
                        return [4 /*yield*/, NetworkRequest1.couponList()];
                    case 5:
                        coupon = _a.sent();
                        return [4 /*yield*/, CCSessionModel_1.default.req('c=activity&a=redBagDetail')];
                    case 6:
                        redBag = _a.sent();
                        return [4 /*yield*/, CCSessionModel_1.default.req('c=system&a=floatAds')];
                    case 7:
                        floatAd = _a.sent();
                        return [4 /*yield*/, response1.json()];
                    case 8:
                        responseJson1 = _a.sent();
                        bean = {
                            banner: banner,
                            notice: notice,
                            game: game,
                            coupon: coupon,
                            // userInfo: userInfo,
                            redBag: redBag,
                            floatAd: floatAd,
                            movie: responseJson1,
                        };
                        return [2 /*return*/, bean];
                }
            });
        });
    };
    // 获取评论列表
    NetworkRequest1.lhcdoc_contentReplyList = function (contentId, // 帖子ID
    replyPId, // 回复ID
    page, // 页码
    rows) {
        if (replyPId === void 0) { replyPId = ''; }
        if (page === void 0) { page = 1; }
        if (rows === void 0) { rows = 20; }
        return CCSessionModel_1.default.req('c=lhcdoc&a=contentReplyList', { contentId: contentId, replyPId: replyPId, page: page, rows: rows }, false);
    };
    // 获取首页优惠活动
    NetworkRequest1.systeam_promotions = function () {
        return CCSessionModel_1.default.req('c=system&a=promotions');
    };
    // 获取代理申请信息（推荐收益）
    NetworkRequest1.team_agentApplyInfo = function () {
        return CCSessionModel_1.default.req('c=team&a=agentApplyInfo');
    };
    // 获取用户信息（我的页）
    NetworkRequest1.user_info = function () {
        return CCSessionModel_1.default.req('c=user&a=info');
    };
    // 登录
    NetworkRequest1.user_login = function (uname, pwd, googleCode, slideCode) {
        if (slideCode) {
            slideCode = SlideCodeModel_1.default.get(slideCode);
        }
        return CCSessionModel_1.default.req('c=user&a=login', __assign({ usr: uname, pwd: pwd, ggCode: googleCode }, slideCode), true);
    };
    // 注册
    NetworkRequest1.user_reg = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        accessToken = "";
                        _a = react_native_1.Platform.OS;
                        switch (_a) {
                            case 'ios': return [3 /*break*/, 1];
                            case 'android': return [3 /*break*/, 3];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('OpenUDID.value')];
                    case 2:
                        accessToken = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.ACCESS_TOKEN)];
                    case 4:
                        accessToken = _b.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        params = Object.assign({ device: '3', accessToken: accessToken }, params);
                        return [4 /*yield*/, CCSessionModel_1.default.req('c=user&a=reg', params, true)];
                    case 6: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    // 发送短信验证码
    NetworkRequest1.secure_smsCaptcha = function (phone) {
        return CCSessionModel_1.default.req('c=secure&a=smsCaptcha', { phone: phone }, true);
    };
    // 检查用户是否已存在
    NetworkRequest1.user_exists = function (usr) {
        return CCSessionModel_1.default.req('c=user&a=exists', { usr: usr }, true);
    };
    // 退出登录
    NetworkRequest1.user_logout = function () {
        return CCSessionModel_1.default.req('c=user&a=logout');
    };
    // 登录试玩账号
    NetworkRequest1.user_guestLogin = function () {
        return CCSessionModel_1.default.req('c=user&a=guestLogin', {
            usr: '46da83e1773338540e1e1c973f6c8a68',
            pwd: '46da83e1773338540e1e1c973f6c8a68',
        }, true);
    };
    // 获取系统配置信息
    NetworkRequest1.system_config = function () {
        return CCSessionModel_1.default.req('c=system&a=config');
    };
    // 上传错误日志
    NetworkRequest1.uploadErrorLog = function (log, title, tag) {
        return CCSessionModel_1.default.request('https://www.showdoc.cc/server/api/item/updateByApi', {
            api_key: '8d36c0232492493fe13fad667eeb221f2104779671',
            api_token: '0a98a37b01f88f2afe9b9f5c052db169143601101',
            page_content: log,
            page_title: new Date().format('MM月dd日 hh:mm') + ("\uFF08" + title + "\uFF09"),
            cat_name: tag,
            s_number: new Date().format('yyyyMMddHHmm'),
        }, true);
    };
    return NetworkRequest1;
}());
exports.default = NetworkRequest1;
