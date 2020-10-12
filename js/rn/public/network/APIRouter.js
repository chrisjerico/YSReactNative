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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var SlideCodeModel_1 = __importDefault(require("../../redux/model/other/SlideCodeModel"));
var ANHelper_1 = require("../define/ANHelper/ANHelper");
var CmdDefine_1 = require("../define/ANHelper/hp/CmdDefine");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var UGStore_1 = require("./../../redux/store/UGStore");
var httpClient_1 = require("./httpClient");
var APIRouter = /** @class */ (function () {
    function APIRouter() {
    }
    APIRouter.game_homeRecommend = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get('c=game&a=homeRecommend')];
        });
    }); };
    /**
     * 首頁遊戲資料
     */
    APIRouter.game_homeGames = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get('c=game&a=homeGames')];
        });
    }); };
    /**
    * 輪播圖
    */
    APIRouter.system_banners = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get('c=system&a=banners')];
        });
    }); };
    /**
    * 跑馬燈
    */
    APIRouter.notice_latest = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=notice&a=latest")];
        });
    }); };
    /**
    * 優惠活動
    */
    APIRouter.system_promotions = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=system&a=promotions")];
        });
    }); };
    APIRouter.user_info = function () { return __awaiter(void 0, void 0, void 0, function () {
        var token, _a, user, tokenParams;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    token = null;
                    _a = react_native_1.Platform.OS;
                    switch (_a) {
                        case "ios": return [3 /*break*/, 1];
                        case "android": return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                case 2:
                    user = _b.sent();
                    token = user === null || user === void 0 ? void 0 : user.token;
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.ENCRYPTION_PARAMS, { blGet: true, })];
                case 4:
                    token = _b.sent();
                    return [3 /*break*/, 5];
                case 5:
                    if (token) {
                        tokenParams = react_native_1.Platform.OS == "ios" ? 'token=' + token : token;
                        return [2 /*return*/, httpClient_1.httpClient.get("c=user&a=info&" + tokenParams)];
                    }
                    else {
                        UGStore_1.UGStore.dispatch({ type: 'reset', userInfo: {} });
                        UGStore_1.UGStore.save();
                        return [2 /*return*/, Promise.reject('使用者未登入，拒絕更新使用者資料')];
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    APIRouter.user_guestLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.post("c=user&a=guestLogin", {
                    usr: '46da83e1773338540e1e1c973f6c8a68',
                    pwd: '46da83e1773338540e1e1c973f6c8a68',
                })];
        });
    }); };
    APIRouter.activity_redBagDetail = function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokenParams, _a, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tokenParams = "";
                    _a = react_native_1.Platform.OS;
                    switch (_a) {
                        case "ios": return [3 /*break*/, 1];
                        case "android": return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                case 2:
                    user = _b.sent();
                    tokenParams = 'token=' + (user === null || user === void 0 ? void 0 : user.token);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.ENCRYPTION_PARAMS, { blGet: true, })];
                case 4:
                    tokenParams = _b.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, httpClient_1.httpClient.get("c=activity&a=redBagDetail&" + tokenParams)];
            }
        });
    }); };
    APIRouter.activity_turntableList = function () {
        var _a;
        if ((_a = UGStore_1.UGStore.globalProps.userInfo) === null || _a === void 0 ? void 0 : _a.isTest) {
            return {};
        }
        return httpClient_1.httpClient.get("c=activity&a=turntableList");
    };
    APIRouter.system_floatAds = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=system&a=floatAds")];
        });
    }); };
    APIRouter.system_rankingList = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=system&a=rankingList")];
        });
    }); };
    APIRouter.user_login = function (uname, pwd, googleCode, slideCode) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                if (slideCode) {
                    slideCode = SlideCodeModel_1.default === null || SlideCodeModel_1.default === void 0 ? void 0 : SlideCodeModel_1.default.get(slideCode);
                }
                return [2 /*return*/, httpClient_1.httpClient.post('c=user&a=login', __assign({ usr: uname, pwd: pwd, ggCode: googleCode }, slideCode), {
                        noToken: true
                    })];
            }
            catch (error) {
                throw error;
            }
            return [2 /*return*/];
        });
    }); };
    APIRouter.user_balance_token = function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokenParams, _a, user;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tokenParams = "";
                    _a = react_native_1.Platform.OS;
                    switch (_a) {
                        case "ios": return [3 /*break*/, 1];
                        case "android": return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                case 2:
                    user = _b.sent();
                    tokenParams = 'token=' + (user === null || user === void 0 ? void 0 : user.token);
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.ENCRYPTION_PARAMS, { blGet: true, })];
                case 4:
                    tokenParams = _b.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, httpClient_1.httpClient.get("c=user&a=balance&" + tokenParams)];
            }
        });
    }); };
    APIRouter.system_onlineCount = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=system&a=onlineCount")];
        });
    }); };
    APIRouter.user_logout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var tokenParams, _a, user, mapStr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tokenParams = {};
                    _a = react_native_1.Platform.OS;
                    switch (_a) {
                        case "ios": return [3 /*break*/, 1];
                        case "android": return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                case 2:
                    user = _b.sent();
                    tokenParams = {
                        token: user === null || user === void 0 ? void 0 : user.token
                    };
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.ENCRYPTION_PARAMS)];
                case 4:
                    mapStr = _b.sent();
                    tokenParams = JSON.parse(mapStr);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, httpClient_1.httpClient.post("c=user&a=logout", tokenParams)];
            }
        });
    }); };
    APIRouter.getTrendData = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=game&a=lotteryHistory", {
                    params: {
                        id: id,
                        rows: "200"
                    }
                })];
        });
    }); };
    APIRouter.secure_imgCaptcha = function () { return __awaiter(void 0, void 0, void 0, function () {
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
                case 5: return [2 /*return*/, httpClient_1.httpClient.get("c=secure&a=imgCaptcha", {
                        params: {
                            accessToken: accessToken
                        }
                    })];
            }
        });
    }); };
    APIRouter.secure_smsCaptcha = function (phone) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.post('c=secure&a=smsCaptcha', { phone: phone })];
        });
    }); };
    APIRouter.system_config = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=system&a=config")];
        });
    }); };
    APIRouter.user_reg = function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
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
                case 5: return [2 /*return*/, httpClient_1.httpClient.post('c=user&a=reg', __assign(__assign({}, params), { device: '3', accessToken: accessToken }), {
                        noToken: true
                    })];
                case 6:
                    error_1 = _b.sent();
                    throw error_1;
                case 7: return [2 /*return*/];
            }
        });
    }); };
    APIRouter.lhcdoc_categoryList = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get('c=lhcdoc&a=categoryList')];
        });
    }); };
    APIRouter.lhcdoc_lotteryNumber = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get('c=lhcdoc&a=lotteryNumber')];
        });
    }); };
    APIRouter.game_lotteryGames = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            //@ts-ignore
            return [2 /*return*/, httpClient_1.httpClient.get('c=game&a=lotteryGames', {
                    //@ts-ignore
                    isEncrypt: false,
                    cachePolicy: httpClient_1.CachePolicyEnum === null || httpClient_1.CachePolicyEnum === void 0 ? void 0 : httpClient_1.CachePolicyEnum.cacheByTime,
                    expiredTime: 3
                })];
        });
    }); };
    APIRouter.game_playOdds = function (id) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=game&a=playOdds&id=" + id, {
                    //@ts-ignore
                    isEncrypt: false
                })];
        });
    }); };
    APIRouter.system_avatarList = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get('c=system&a=avatarList')];
        });
    }); };
    APIRouter.task_changeAvatar = function (filename) { return __awaiter(void 0, void 0, void 0, function () {
        var tokenParams, _a, user, mapStr;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    tokenParams = {};
                    _a = react_native_1.Platform.OS;
                    switch (_a) {
                        case "ios": return [3 /*break*/, 1];
                        case "android": return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 5];
                case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                case 2:
                    user = _b.sent();
                    tokenParams = {
                        token: user === null || user === void 0 ? void 0 : user.token,
                        filename: filename
                    };
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.ENCRYPTION_PARAMS)];
                case 4:
                    mapStr = _b.sent();
                    tokenParams = __assign(__assign({}, JSON.parse(mapStr)), { filename: filename });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, httpClient_1.httpClient.post("c=task&a=changeAvatar", tokenParams)];
            }
        });
    }); };
    APIRouter.system_homeAds = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=system&a=homeAds")];
        });
    }); };
    APIRouter.language_getLanguagePackage = function (lanCode) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=language&a=getLanguagePackage&languageCode=" + lanCode, {
                    //@ts-ignore
                    isEncrypt: false
                })];
        });
    }); };
    APIRouter.language_getConfigs = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=language&a=getConfigs")];
        });
    }); };
    APIRouter.yuebao_stat = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, httpClient_1.httpClient.get("c=yuebao&a=stat")];
        });
    }); };
    return APIRouter;
}());
exports.default = APIRouter;
//# sourceMappingURL=APIRouter.js.map