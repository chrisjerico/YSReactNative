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
exports.updateUserInfo = exports.IGlobalStateHelper = exports.AsyncStorageKey = void 0;
var APIRouter_1 = __importDefault(require("../../public/network/APIRouter"));
var NetworkRequest1_1 = __importDefault(require("../../public/network/NetworkRequest1"));
var UGStore_1 = require("./UGStore");
var react_native_1 = require("react-native");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
var DataDefine_1 = require("../../public/define/ANHelper/hp/DataDefine");
exports.AsyncStorageKey = {
    IGlobalState: 'IGlobalState',
};
var IGlobalStateHelper = /** @class */ (function () {
    function IGlobalStateHelper() {
    }
    IGlobalStateHelper.updateUserInfo = function () {
        NetworkRequest1_1.default.user_info().then(function (user) {
            UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: user });
            UGStore_1.UGStore.save();
        });
    };
    return IGlobalStateHelper;
}());
exports.IGlobalStateHelper = IGlobalStateHelper;
function updateUserInfo() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var response, data, msg, _c, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 1:
                    response = _d.sent();
                    data = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data;
                    msg = (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.msg;
                    if (!data) return [3 /*break*/, 5];
                    _c = react_native_1.Platform.OS;
                    switch (_c) {
                        case "android": return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.USER_INFO }, data))];
                case 3:
                    _d.sent();
                    return [3 /*break*/, 4];
                case 4:
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: data });
                    UGStore_1.UGStore.save();
                    return [2 /*return*/, data];
                case 5: throw { message: msg !== null && msg !== void 0 ? msg : '更新使用者失败' };
                case 6: return [3 /*break*/, 8];
                case 7:
                    error_1 = _d.sent();
                    console.log("-------------updateUserInfo error-------------", error_1);
                    throw error_1;
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserInfo = updateUserInfo;
//# sourceMappingURL=IGlobalStateHelper.js.map