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
var UGUserModel_1 = require("../../redux/model/\u5168\u5C40/UGUserModel");
var UGStore_1 = require("../../redux/store/UGStore");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var RootNavigation_1 = require("../navigation/RootNavigation");
var APIRouter_1 = require("../network/APIRouter");
var react_native_1 = require("react-native");
var ANHelper_1 = require("../define/ANHelper/ANHelper");
var UgLog_1 = require("../tools/UgLog");
var DataDefine_1 = require("../define/ANHelper/hp/DataDefine");
var CmdDefine_1 = require("../define/ANHelper/hp/CmdDefine");
var useLoginIn = function (params) {
    if (params === void 0) { params = { onSuccess: RootNavigation_1.popToRoot }; }
    var onSuccess = params.onSuccess, onError = params.onError;
    var loginSuccessHandle = function (data, accountData, options) {
        if (options === void 0) { options = { enableCleanOldUser: true, enableNativeNotification: true }; }
        return __awaiter(void 0, void 0, void 0, function () {
            var account, pwd, isRemember, enableCleanOldUser, enableNativeNotification, _a, user, sessid, _b, UserInfo, _c, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        account = accountData.account, pwd = accountData.pwd, isRemember = accountData.isRemember;
                        enableCleanOldUser = options.enableCleanOldUser, enableNativeNotification = options.enableNativeNotification;
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 24, , 25]);
                        _a = react_native_1.Platform.OS;
                        switch (_a) {
                            case "ios": return [3 /*break*/, 2];
                            case "android": return [3 /*break*/, 15];
                        }
                        return [3 /*break*/, 17];
                    case 2: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                    case 3:
                        user = _d.sent();
                        if (!(enableCleanOldUser && user)) return [3 /*break*/, 7];
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser.sessid')];
                    case 4:
                        sessid = _d.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }])];
                    case 5:
                        _d.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:')];
                    case 6:
                        _d.sent();
                        _d.label = 7;
                    case 7: 
                    // 保存数据
                    //@ts-ignore
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(data === null || data === void 0 ? void 0 : data.data)])];
                    case 8:
                        // 保存数据
                        //@ts-ignore
                        _d.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [isRemember, 'isRememberPsd'])];
                    case 9:
                        _d.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [isRemember ? account : '', 'userName'])];
                    case 10:
                        _d.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [isRemember ? pwd : '', 'userPsw'])];
                    case 11:
                        _d.sent();
                        _b = enableNativeNotification;
                        if (!_b) return [3 /*break*/, 13];
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                    case 12:
                        _b = (_d.sent());
                        _d.label = 13;
                    case 13:
                        _b;
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                    case 14:
                        _d.sent();
                        return [3 /*break*/, 17];
                    case 15: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign(__assign({ key: DataDefine_1.NA_DATA.LOGIN_INFO }, accountData), data === null || data === void 0 ? void 0 : data.data))];
                    case 16:
                        _d.sent();
                        return [3 /*break*/, 17];
                    case 17: return [4 /*yield*/, APIRouter_1.default.user_info()];
                    case 18:
                        UserInfo = (_d.sent()).data;
                        _c = react_native_1.Platform.OS;
                        switch (_c) {
                            case "ios": return [3 /*break*/, 19];
                            case "android": return [3 /*break*/, 21];
                        }
                        return [3 /*break*/, 23];
                    case 19: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [__assign(__assign({}, UserInfo === null || UserInfo === void 0 ? void 0 : UserInfo.data), UGUserModel_1.default.getYS(data === null || data === void 0 ? void 0 : data.data))])];
                    case 20:
                        _d.sent();
                        return [3 /*break*/, 23];
                    case 21: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.USER_INFO }, data === null || data === void 0 ? void 0 : data.data))];
                    case 22:
                        _d.sent();
                        return [3 /*break*/, 23];
                    case 23:
                        UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: UserInfo === null || UserInfo === void 0 ? void 0 : UserInfo.data });
                        UGStore_1.UGStore.save();
                        onSuccess && onSuccess();
                        onSuccess && onSuccess();
                        return [3 /*break*/, 25];
                    case 24:
                        error_1 = _d.sent();
                        UgLog_1.ugError(error_1);
                        onError && onError(error_1);
                        return [3 /*break*/, 25];
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    return { loginSuccessHandle: loginSuccessHandle };
};
exports.default = useLoginIn;
