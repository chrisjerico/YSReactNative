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
var react_native_1 = require("react-native");
var UGStore_1 = require("../../redux/store/UGStore");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var RootNavigation_1 = require("../navigation/RootNavigation");
var APIRouter_1 = require("../network/APIRouter");
var ToastUtils_1 = require("../tools/ToastUtils");
var ANHelper_1 = require("../define/ANHelper/ANHelper");
var UGLoadingCP_1 = require("../widget/UGLoadingCP");
var CmdDefine_1 = require("../define/ANHelper/hp/CmdDefine");
var useLoginOut = function (pageName) {
    var requestLoginOut = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 10, , 11]);
                    UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading, text: '正在退出...' });
                    return [4 /*yield*/, APIRouter_1.default.user_logout()];
                case 1:
                    _c.sent();
                    _a = react_native_1.Platform.OS;
                    switch (_a) {
                        case 'ios': return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 6];
                case 2: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [])];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout'])];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0])];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 6];
                case 6:
                    UGStore_1.UGStore.dispatch({ type: 'reset', userInfo: {} });
                    UGStore_1.UGStore.save();
                    UGLoadingCP_1.hideLoading();
                    console.log("---------------登出成功---------------");
                    _b = react_native_1.Platform.OS;
                    switch (_b) {
                        case 'android': return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 9];
                case 7: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LOG_OUT)];
                case 8:
                    _c.sent();
                    return [3 /*break*/, 9];
                case 9:
                    RootNavigation_1.navigate(pageName, {});
                    return [3 /*break*/, 11];
                case 10:
                    error_1 = _c.sent();
                    UGLoadingCP_1.hideLoading();
                    console.log(error_1);
                    ToastUtils_1.Toast('退出失败，请稍后再试');
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    }); };
    var loginOut = function () {
        react_native_1.Alert.alert('温馨提示', '确定退出账号', [
            { text: '取消', style: 'cancel' },
            {
                text: '确定',
                onPress: requestLoginOut,
            },
        ]);
    };
    return { loginOut: loginOut };
};
exports.default = useLoginOut;
