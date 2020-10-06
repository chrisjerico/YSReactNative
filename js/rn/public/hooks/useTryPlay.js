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
var react_native_1 = require("react-native");
var UGUserModel_1 = require("../../redux/model/\u5168\u5C40/UGUserModel");
var IGlobalStateHelper_1 = require("../../redux/store/IGlobalStateHelper");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var APIRouter_1 = require("../network/APIRouter");
var ToastUtils_1 = require("../tools/ToastUtils");
var ANHelper_1 = require("../define/ANHelper/ANHelper");
var CmdDefine_1 = require("../define/ANHelper/hp/CmdDefine");
var DataDefine_1 = require("../define/ANHelper/hp/DataDefine");
var useTryPlay = function (params) {
    var onSuccess = params.onSuccess, onError = params.onError;
    var tryPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, _a, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 13, , 14]);
                    switch (react_native_1.Platform.OS) {
                        case 'ios':
                            OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
                            break;
                        case 'android':
                            ToastUtils_1.Toast('正在登录...');
                            break;
                    }
                    return [4 /*yield*/, APIRouter_1.default.user_guestLogin()];
                case 1:
                    data = (_b.sent()).data;
                    _a = react_native_1.Platform.OS;
                    switch (_a) {
                        case 'ios': return [3 /*break*/, 2];
                        case 'android': return [3 /*break*/, 9];
                    }
                    return [3 /*break*/, 11];
                case 2: 
                // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
                //@ts-ignore
                return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(data === null || data === void 0 ? void 0 : data.data)])];
                case 3:
                    // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
                    //@ts-ignore
                    _b.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd'])];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName'])];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw'])];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.LOGIN_INFO }, data === null || data === void 0 ? void 0 : data.data))];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 11: return [4 /*yield*/, IGlobalStateHelper_1.updateUserInfo()];
                case 12:
                    _b.sent();
                    onSuccess && onSuccess();
                    return [3 /*break*/, 14];
                case 13:
                    error_1 = _b.sent();
                    console.log(error_1);
                    onError && onError(error_1);
                    return [3 /*break*/, 14];
                case 14: return [2 /*return*/];
            }
        });
    }); };
    return { tryPlay: tryPlay };
};
exports.default = useTryPlay;
//# sourceMappingURL=useTryPlay.js.map