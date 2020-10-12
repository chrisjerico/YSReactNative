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
exports.httpClient = exports.CachePolicyEnum = void 0;
var axios_1 = __importDefault(require("axios"));
var react_native_1 = require("react-native");
var UGStore_1 = require("../../redux/store/UGStore");
var ANHelper_1 = require("../define/ANHelper/ANHelper");
var CmdDefine_1 = require("../define/ANHelper/hp/CmdDefine");
var AppDefine_1 = __importDefault(require("../define/AppDefine"));
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var Ext_1 = require("../tools/Ext");
var UgLog_1 = require("../tools/UgLog");
var CachePolicyEnum;
(function (CachePolicyEnum) {
    CachePolicyEnum[CachePolicyEnum["noCache"] = 0] = "noCache";
    CachePolicyEnum[CachePolicyEnum["cacheOnly"] = 1] = "cacheOnly";
    CachePolicyEnum[CachePolicyEnum["cacheByTime"] = 2] = "cacheByTime";
})(CachePolicyEnum = exports.CachePolicyEnum || (exports.CachePolicyEnum = {}));
exports.httpClient = axios_1.default.create({
    baseURL: AppDefine_1.default === null || AppDefine_1.default === void 0 ? void 0 : AppDefine_1.default.host,
    timeout: 3000,
    headers: { 'Content-Type': 'application/json', }
});
var publicParams = {
// 公共参数
// able: "123"
};
var encryptParams = function (params, isEncrypt) { return __awaiter(void 0, void 0, void 0, function () {
    var temp, paramsKey;
    return __generator(this, function (_a) {
        temp = {};
        //过滤掉 null 或 "",
        for (paramsKey in params) {
            if (!Ext_1.anyEmpty(params[paramsKey])) {
                temp[paramsKey] = params[paramsKey];
            }
        }
        if (!isEncrypt) {
            return [2 /*return*/, temp];
        }
        try {
            temp['checkSign'] = 1;
            switch (react_native_1.Platform.OS) {
                case "ios":
                    return [2 /*return*/, OCHelper_1.OCHelper.call('CMNetwork.encryptionCheckSign:', [temp])];
                case "android":
                    return [2 /*return*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.ENCRYPTION_PARAMS, { params: temp })];
            }
        }
        catch (error) {
            console.warn(error);
            return [2 /*return*/, null];
        }
        return [2 /*return*/];
    });
}); };
exports.httpClient.interceptors.response.use(function (response) {
    //@ts-ignore
    var config = response.config;
    switch (react_native_1.Platform.OS) {
        case 'ios':
            break;
        case 'android':
            // ugLog('http success res = ', JSON.stringify(response.request))
            break;
    }
    // ugLog("http ful filled res = ", JSON.stringify(response))
    // if (config.method == 'GET' || 'get') {
    //   if (config?.expiredTime < 1000000000000000) {
    //     if (config.cachePolicy == CachePolicyEnum.cacheByTime) {
    //       const expiredTime = (moment().unix() + config.expiredTime) * 1000
    //       config.expiredTime = expiredTime
    //       try {
    //         AsyncStorage.setItem(config.baseURL + config.url, JSON.stringify(response))
    //       } catch (error) {
    //       }
    //     }
    //   }
    // }
    return response;
}, function (err) {
    var _a, _b;
    if (err && err.response) {
        UgLog_1.ugLog("http error res = ", JSON.stringify(err.response));
        switch (err.response.status) {
            case 401: //请登录后再访问, 帐号已被登出
                console.log("-----------401---------");
                switch (react_native_1.Platform.OS) {
                    case "ios":
                        OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', []).then(function (res) {
                            OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']).then(function (res) {
                                OCHelper_1.OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]).then(function (res) {
                                    UGStore_1.UGStore.dispatch({ type: 'reset', userInfo: {} });
                                    // Toast('帐号已被登出');
                                });
                            });
                        });
                        break;
                    case "android":
                        ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LOG_OUT);
                        break;
                }
                break;
            case 500:
                console.warn('500', err);
                break;
            case 503:
                console.warn('503', err);
                break;
            default:
                console.warn('連接錯誤', err);
        }
    }
    else {
        // console.warn('連接到服務器失敗', err);
    }
    if (((_a = err === null || err === void 0 ? void 0 : err.toString()) === null || _a === void 0 ? void 0 : _a.indexOf('timeout')) != -1) {
        return Promise.reject('伺服器回应超时');
    }
    else {
        return Promise.reject((_b = err === null || err === void 0 ? void 0 : err.response) !== null && _b !== void 0 ? _b : err);
    }
});
exports.httpClient.interceptors.request.use(function (config) { return __awaiter(void 0, void 0, void 0, function () {
    var params, _a, isEncrypt, encryptData, paramsKey;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (!config.url.includes('wjapp')) {
                    config.url = 'wjapp/api.php?' + config.url;
                }
                params = Object.assign({}, publicParams, __assign(__assign({}, config.params), config.data));
                _a = config.isEncrypt, isEncrypt = _a === void 0 ? true : _a;
                switch (react_native_1.Platform.OS) {
                    case 'ios':
                        break;
                    case 'android':
                        isEncrypt = eval(ANHelper_1.ANHelper.callSync(CmdDefine_1.CMD.SITE_ENCRYPTION));
                        // ugLog('http isEncrypt=', isEncrypt)
                        break;
                }
                return [4 /*yield*/, encryptParams(params, isEncrypt)];
            case 1:
                encryptData = _d.sent();
                // ugLog('http isEncrypt=', isEncrypt)
                if (((_b = config === null || config === void 0 ? void 0 : config.method) === null || _b === void 0 ? void 0 : _b.toLowerCase()) == 'get') {
                    if (isEncrypt) {
                        config.url += '&checkSign=1';
                    }
                    Object.keys(encryptData).map(function (res) {
                        if (!config.params) {
                            config.params = {};
                        }
                        config.params[res] = encryptData[res];
                    });
                }
                else if (((_c = config === null || config === void 0 ? void 0 : config.method) === null || _c === void 0 ? void 0 : _c.toLowerCase()) == 'post') {
                    if (isEncrypt) {
                        config.url += '&checkSign=1';
                    }
                    if (!config.params)
                        config.params = {};
                    if (!config.data)
                        config.data = {};
                    if (encryptData["slideCode[nc_sid]"]) {
                        config.data.slideCode = {};
                        config.data.slideCode.nc_sid = "" + encryptData["slideCode[nc_sid]"];
                        config.data.slideCode.nc_sig = "" + encryptData["slideCode[nc_sig]"];
                        config.data.slideCode.nc_token = "" + encryptData["slideCode[nc_token]"];
                        delete encryptData["slideCode[nc_sid]"];
                        delete encryptData["slideCode[nc_sig]"];
                        delete encryptData["slideCode[nc_token]"];
                        delete config.data["slideCode[nc_token]"];
                        delete config.data["slideCode[nc_sig]"];
                        delete config.data["slideCode[nc_sid]"];
                    }
                    if (config.noToken == true) {
                        encryptData === null || encryptData === void 0 ? true : delete encryptData.token;
                    }
                    debugger;
                    for (paramsKey in encryptData) {
                        // if (paramsKey.includes("slideCode")) {
                        //   config.data[paramsKey] = config.data[paramsKey];
                        // } else {
                        config.data[paramsKey] = "" + encryptData[paramsKey];
                        // }
                    }
                }
                // ugLog('http url=', config.method, config.baseURL, config.url)
                // ugLog('http params=', params)
                // ugLog('http encryptData=', encryptData)
                // ugLog('http config.data=', config.data)
                return [2 /*return*/, config];
        }
    });
}); });
//# sourceMappingURL=httpClient.js.map