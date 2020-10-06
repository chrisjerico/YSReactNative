"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var AppDefine_1 = require("../AppDefine");
var ANEvent_1 = require("./ANEvent");
var httpClient_1 = require("../../network/httpClient");
var CmdDefine_1 = require("./hp/CmdDefine");
var UGSysConfModel_1 = require("../../../redux/model/\u5168\u5C40/UGSysConfModel");
var APIRouter_1 = require("../../network/APIRouter");
var UGStore_1 = require("../../../redux/store/UGStore");
var DataDefine_1 = require("./hp/DataDefine");
var UgLog_1 = require("../../tools/UgLog");
var tars_1 = require("../../tools/tars");
var ANHelper = /** @class */ (function (_super) {
    __extends(ANHelper, _super);
    function ANHelper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * CallBack调用安卓函数
     *
     * @param type 当前类型
     * @param back 返回值
     * @param data 参数
     */
    ANHelper.callSync = function (type, data) {
        return this.core.executeSync(JSON.stringify(__assign({ type: type }, data)));
    };
    /**
     * Promise 调用安卓函数
     *
     * @param type 当前类型
     * @param data 参数
     */
    ANHelper.callAsync = function (type, data) {
        return this.core.executeCmd(JSON.stringify(__assign({ type: type }, data)));
    };
    ANHelper.setup = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        return __awaiter(this, void 0, void 0, function () {
            var res, host, siteId, sysConf_android, userCenterItems, apis, net_response, userInfo, sysConf_net, loginVCode, login_to, adSliderTimer, appDownloadUrl, sysConf, gameLobby, banner;
            var _this = this;
            return __generator(this, function (_r) {
                switch (_r.label) {
                    case 0:
                        _super.setup.call(this);
                        return [4 /*yield*/, Promise.all([
                                // 设置接口域名
                                this.callAsync(CmdDefine_1.CMD.APP_HOST).catch(function (error) {
                                    UgLog_1.ugLog('APP_HOST=', error);
                                }),
                                // 设置站点编号
                                this.callAsync(CmdDefine_1.CMD.APP_SITE).catch(function (error) {
                                    UgLog_1.ugLog('APP_SITE=', error);
                                }),
                                // 加载系统设置
                                this.callAsync(CmdDefine_1.CMD.LOAD_DATA, { key: DataDefine_1.NA_DATA.CONFIG }).catch(function (error) {
                                    UgLog_1.ugLog('CONFIG=', error);
                                }),
                                //加载用户中心条目信息
                                ANHelper.callAsync(CmdDefine_1.CMD.ASK_MINE_ITEMS).catch(function (error) {
                                    UgLog_1.ugLog('ASK_MINE_ITEMS=', error);
                                })
                            ])];
                    case 1:
                        res = _r.sent();
                        host = res[0];
                        siteId = res[1];
                        sysConf_android = (_a = res[2]) !== null && _a !== void 0 ? _a : {};
                        userCenterItems = (_c = (_b = JSON.parse(res[3])) === null || _b === void 0 ? void 0 : _b.map(function (item) { return new UGSysConfModel_1.UGUserCenterItem(item); })) !== null && _c !== void 0 ? _c : [];
                        //ugLog('ANHelper userCenterItems=', userCenterItems)
                        AppDefine_1.default.host = host;
                        httpClient_1.httpClient.defaults.baseURL = host;
                        AppDefine_1.default.siteId = siteId;
                        apis = ['user_info', 'system_config', 'game_homeRecommend', 'system_banners'].map(function (router) { return __awaiter(_this, void 0, void 0, function () {
                            var error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, APIRouter_1.default[router]()];
                                    case 1: return [2 /*return*/, _a.sent()];
                                    case 2:
                                        error_1 = _a.sent();
                                        console.log(error_1);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(apis)
                            //@ts-ignore
                        ];
                    case 2:
                        net_response = _r.sent();
                        userInfo = (_f = (_e = (_d = net_response[0]) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.data) !== null && _f !== void 0 ? _f : {};
                        sysConf_net = (_j = (_h = (_g = net_response[1]) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.data) !== null && _j !== void 0 ? _j : {};
                        loginVCode = sysConf_net.loginVCode, login_to = sysConf_net.login_to, adSliderTimer = sysConf_net.adSliderTimer, appDownloadUrl = sysConf_net.appDownloadUrl;
                        sysConf = Object.assign({}, sysConf_android, { loginVCode: loginVCode, login_to: login_to,
                            adSliderTimer: tars_1.stringToNumber(adSliderTimer), appDownloadUrl: appDownloadUrl, userCenterItems: userCenterItems });
                        gameLobby = (_m = (_l = (_k = net_response[2]) === null || _k === void 0 ? void 0 : _k.data) === null || _l === void 0 ? void 0 : _l.data) !== null && _m !== void 0 ? _m : [];
                        banner = (_q = (_p = (_o = net_response[3]) === null || _o === void 0 ? void 0 : _o.data) === null || _p === void 0 ? void 0 : _p.data) !== null && _q !== void 0 ? _q : {};
                        UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo, sysConf: sysConf, gameLobby: gameLobby, banner: banner, sys: sysConf_net });
                        UGStore_1.UGStore.save();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 监听安卓事件
    ANHelper.addEvent = ANEvent_1.ANEvent.addEvent;
    // 移除安卓事件
    ANHelper.removeEvents = ANEvent_1.ANEvent.removeEvents;
    return ANHelper;
}(ANEvent_1.ANEvent));
exports.ANHelper = ANHelper;
//# sourceMappingURL=ANHelper.js.map