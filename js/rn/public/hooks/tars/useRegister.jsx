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
var APIRouter_1 = require("../../network/APIRouter");
var tars_1 = require("../../tools/tars");
var useLogIn_1 = require("./useLogIn");
var useRegister = function (options) {
    if (options === void 0) { options = {}; }
    var logIn = useLogIn_1.default({
        onStart: function () {
            tars_1.ToastStatus('注册成功，正在登录...');
        },
        onSuccess: function () {
            tars_1.ToastSuccess('登录成功');
        },
        onError: function (error) {
            tars_1.ToastError(error !== null && error !== void 0 ? error : '自动登录失败');
        },
    }).logIn;
    var onSuccessWithAutoLogin = options.onSuccessWithAutoLogin, onStart = options.onStart, onSuccess = options.onSuccess, onError = options.onError;
    var register = function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var usr, pwd, user_reg_response, user_reg_data, msg_reg_msg, autoLogin, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 7, , 8]);
                    if (!((react_native_1.Platform === null || react_native_1.Platform === void 0 ? void 0 : react_native_1.Platform.OS) == 'ios')) return [3 /*break*/, 6];
                    onStart && onStart();
                    usr = params.usr, pwd = params.pwd;
                    return [4 /*yield*/, APIRouter_1.default.user_reg(params)];
                case 1:
                    user_reg_response = _c.sent();
                    user_reg_data = (_a = user_reg_response === null || user_reg_response === void 0 ? void 0 : user_reg_response.data) === null || _a === void 0 ? void 0 : _a.data;
                    msg_reg_msg = (_b = user_reg_response === null || user_reg_response === void 0 ? void 0 : user_reg_response.data) === null || _b === void 0 ? void 0 : _b.msg;
                    if (!user_reg_data) return [3 /*break*/, 5];
                    autoLogin = user_reg_data.autoLogin;
                    if (!autoLogin) return [3 /*break*/, 3];
                    //登陸
                    return [4 /*yield*/, logIn({
                            account: usr,
                            password: pwd,
                        })];
                case 2:
                    //登陸
                    _c.sent();
                    onSuccessWithAutoLogin && onSuccessWithAutoLogin();
                    return [3 /*break*/, 4];
                case 3:
                    onSuccess && onSuccess();
                    _c.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    onError && onError(msg_reg_msg);
                    _c.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _c.sent();
                    onError && onError(error_1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    return { register: register };
};
exports.default = useRegister;
