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
exports.LoginButtonBar = void 0;
var React = require("react");
var react_native_1 = require("react-native");
var PushHelper_1 = require("../../../../public/define/PushHelper");
var UGUserModel_1 = require("../../../../redux/model/\u5168\u5C40/UGUserModel");
var APIRouter_1 = require("../../../../public/network/APIRouter");
var UGStore_1 = require("../../../../redux/store/UGStore");
var OCHelper_1 = require("../../../../public/define/OCHelper/OCHelper");
var UGLoadingCP_1 = require("../../../../public/widget/UGLoadingCP");
var ANHelper_1 = require("../../../../public/define/ANHelper/ANHelper");
var ToastUtils_1 = require("../../../../public/tools/ToastUtils");
var DataDefine_1 = require("../../../../public/define/ANHelper/hp/DataDefine");
var CmdDefine_1 = require("../../../../public/define/ANHelper/hp/CmdDefine");
var RootNavigation_1 = require("../../../../public/navigation/RootNavigation");
var Navigation_1 = require("../../../../public/navigation/Navigation");
exports.LoginButtonBar = function () {
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _a = userStore.uid, uid = _a === void 0 ? "" : _a, curLevelTitle = userStore.curLevelTitle, usr = userStore.usr, balance = userStore.balance, isTest = userStore.isTest;
    var testPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, _b, userInfo, _c, error_1;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    _e.trys.push([0, 18, , 19]);
                    UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading, text: '正在登录...' });
                    return [4 /*yield*/, APIRouter_1.default.user_guestLogin()];
                case 1:
                    _a = _e.sent(), data = _a.data, status_1 = _a.status;
                    debugger;
                    _b = react_native_1.Platform.OS;
                    switch (_b) {
                        case "ios": return [3 /*break*/, 2];
                        case "android": return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 12];
                case 2: return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay'])];
                case 3:
                    _e.sent();
                    //@ts-ignore
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(data.data)])];
                case 4:
                    //@ts-ignore
                    _e.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd'])];
                case 5:
                    _e.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName'])];
                case 6:
                    _e.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw'])];
                case 7:
                    _e.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                case 8:
                    _e.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                case 9:
                    _e.sent();
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.LOGIN_INFO }, data === null || data === void 0 ? void 0 : data.data))];
                case 11:
                    _e.sent();
                    return [3 /*break*/, 12];
                case 12: return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 13:
                    userInfo = (_e.sent()).data;
                    _c = react_native_1.Platform.OS;
                    switch (_c) {
                        case "ios": return [3 /*break*/, 14];
                        case "android": return [3 /*break*/, 15];
                    }
                    return [3 /*break*/, 17];
                case 14: 
                //TODO
                return [3 /*break*/, 17];
                case 15: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.USER_INFO }, userInfo === null || userInfo === void 0 ? void 0 : userInfo.data))];
                case 16:
                    _e.sent();
                    return [3 /*break*/, 17];
                case 17:
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data });
                    UGStore_1.UGStore.save();
                    ToastUtils_1.Toast('登录成功！');
                    return [3 /*break*/, 19];
                case 18:
                    error_1 = _e.sent();
                    // OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '登入失败']);
                    ToastUtils_1.Toast((_d = error_1 === null || error_1 === void 0 ? void 0 : error_1.message) !== null && _d !== void 0 ? _d : '登入失败');
                    console.log(error_1);
                    return [3 /*break*/, 19];
                case 19:
                    UGLoadingCP_1.hideLoading();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
            <react_native_1.TouchableWithoutFeedback onPress={function () {
        PushHelper_1.default.pushLogin();
    }}>
                <react_native_1.Text style={{ color: "#333", fontSize: 17.6, lineHeight: 24.6 }}>登录</react_native_1.Text>
            </react_native_1.TouchableWithoutFeedback>
            <react_native_1.View style={{ backgroundColor: "#333", width: 1, height: 20, marginHorizontal: 10, marginVertical: 9 }}/>
            <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.navigate(Navigation_1.PageName.LCRegisterPage);
    }}>
                <react_native_1.Text style={{ color: "#333", fontSize: 17.6, lineHeight: 24.6 }}>注册</react_native_1.Text>
            </react_native_1.TouchableWithoutFeedback>
            <react_native_1.View style={{ backgroundColor: "#333", width: 1, height: 20, marginHorizontal: 10, marginVertical: 9 }}/>
            <react_native_1.TouchableWithoutFeedback onPress={testPlay}>
                <react_native_1.Text style={{ color: "#333", fontSize: 17.6, lineHeight: 24.6 }}>试玩</react_native_1.Text>
            </react_native_1.TouchableWithoutFeedback>
        </react_native_1.View>);
};
