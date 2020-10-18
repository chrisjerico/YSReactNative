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
var UGUserModel_1 = __importDefault(require("../../../redux/model/\u5168\u5C40/UGUserModel"));
var UGStore_1 = require("../../../redux/store/UGStore");
var ANHelper_1 = require("../../define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../define/ANHelper/hp/CmdDefine");
var DataDefine_1 = require("../../define/ANHelper/hp/DataDefine");
var OCHelper_1 = require("../../define/OCHelper/OCHelper");
var APIRouter_1 = __importDefault(require("../../network/APIRouter"));
var useLogIn = function (options) {
    if (options === void 0) { options = {}; }
    var onSuccess = options.onSuccess, onError = options.onError, onStart = options.onStart;
    var logIn = function (_a) {
        var account = _a.account, password = _a.password, slideCode = _a.slideCode;
        return __awaiter(void 0, void 0, void 0, function () {
            var user_login_response, user_login_data, user_login_msg, _b, response, user_info_data, user_info_msg, currentUser, _c, error_1;
            var _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 17, , 18]);
                        onStart && onStart();
                        return [4 /*yield*/, APIRouter_1.default.user_login(account, password, undefined, slideCode)];
                    case 1:
                        user_login_response = _h.sent();
                        user_login_data = (_d = user_login_response === null || user_login_response === void 0 ? void 0 : user_login_response.data) === null || _d === void 0 ? void 0 : _d.data;
                        user_login_msg = (_e = user_login_response === null || user_login_response === void 0 ? void 0 : user_login_response.data) === null || _e === void 0 ? void 0 : _e.msg;
                        if (!(user_login_data && (user_login_data === null || user_login_data === void 0 ? void 0 : user_login_data['API-SID']) && (user_login_data === null || user_login_data === void 0 ? void 0 : user_login_data['API-TOKEN']))) return [3 /*break*/, 15];
                        _b = react_native_1.Platform.OS;
                        switch (_b) {
                            case 'ios': return [3 /*break*/, 2];
                            case 'android': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(user_login_data)])];
                    case 3:
                        _h.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.LOGIN_INFO }, user_login_data))];
                    case 5:
                        _h.sent();
                        return [3 /*break*/, 6];
                    case 6: return [4 /*yield*/, APIRouter_1.default.user_info()];
                    case 7:
                        response = _h.sent();
                        user_info_data = (_f = response === null || response === void 0 ? void 0 : response.data) === null || _f === void 0 ? void 0 : _f.data;
                        user_info_msg = (_g = response === null || response === void 0 ? void 0 : response.data) === null || _g === void 0 ? void 0 : _g.msg;
                        if (!user_info_data) return [3 /*break*/, 13];
                        currentUser = [__assign(__assign({}, user_info_data), UGUserModel_1.default.getYS(user_login_data))];
                        _c = react_native_1.Platform.OS;
                        switch (_c) {
                            case 'ios': return [3 /*break*/, 8];
                            case 'android': return [3 /*break*/, 10];
                        }
                        return [3 /*break*/, 12];
                    case 8: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', currentUser)];
                    case 9:
                        _h.sent();
                        return [3 /*break*/, 12];
                    case 10: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.USER_INFO }, user_info_data))];
                    case 11:
                        _h.sent();
                        return [3 /*break*/, 12];
                    case 12:
                        UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: user_info_data });
                        UGStore_1.UGStore.save();
                        onSuccess && onSuccess();
                        return [3 /*break*/, 14];
                    case 13:
                        // 登录失敗
                        onError && onError(user_info_msg);
                        _h.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        // 登录失敗
                        onError && onError(user_login_msg);
                        _h.label = 16;
                    case 16: return [3 /*break*/, 18];
                    case 17:
                        error_1 = _h.sent();
                        onError && onError(error_1);
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    return { logIn: logIn };
};
exports.default = useLogIn;
//# sourceMappingURL=useLogIn.js.map