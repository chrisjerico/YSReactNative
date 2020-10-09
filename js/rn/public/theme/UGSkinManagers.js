"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Skin1 = void 0;
var chroma_js_1 = __importDefault(require("chroma-js"));
var react_native_1 = require("react-native");
var config_1 = require("../../../../config");
var AppDefine_1 = __importDefault(require("../define/AppDefine"));
var OCCall_1 = require("../define/OCHelper/OCBridge/OCCall");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var FUtils_1 = __importDefault(require("../tools/FUtils"));
var BZHThemeColor_1 = require("./colors/BZHThemeColor");
var GDBThemeColor_1 = require("./colors/GDBThemeColor");
var JDThemeColor_1 = require("./colors/JDThemeColor");
var JYThemeColor_1 = require("./colors/JYThemeColor");
var KSThemeColor_1 = require("./colors/KSThemeColor");
var LCThemeColor_1 = require("./colors/LCThemeColor");
var LHThemeColor_1 = require("./colors/LHThemeColor");
var LLThemeCololr_1 = require("./colors/LLThemeCololr");
var OtherThemeColor_1 = require("./colors/OtherThemeColor");
var PYThemeColor_1 = require("./colors/PYThemeColor");
var VietnamThemeColors_1 = require("./colors/VietnamThemeColors");
var WNZThemeColor_1 = require("./colors/WNZThemeColor");
var XBJThemeColor_1 = require("./colors/XBJThemeColor");
var XNHThemeColor_1 = require("./colors/XNHThemeColor");
var ZLThemeColor_1 = require("./colors/ZLThemeColor");
var UGThemeColor_1 = require("./UGThemeColor");
var UGSkinManagers = /** @class */ (function (_super) {
    __extends(UGSkinManagers, _super);
    function UGSkinManagers() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 更新皮肤
    UGSkinManagers.updateSkin = function (sysConf) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var mobileTemplateCategory, mobileTemplateBackground, mobileTemplateStyle, mobileTemplateLhcStyle, dict, key, theme, skin;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        mobileTemplateCategory = sysConf.mobileTemplateCategory, mobileTemplateBackground = sysConf.mobileTemplateBackground, mobileTemplateStyle = sysConf.mobileTemplateStyle, mobileTemplateLhcStyle = sysConf.mobileTemplateLhcStyle;
                        dict = {
                            1: "\u7ECF\u5178" + mobileTemplateBackground,
                            2: "\u65B0\u5E74\u7EA2" + mobileTemplateStyle,
                            3: '石榴红',
                            4: "\u516D\u5408\u8D44\u6599" + mobileTemplateLhcStyle,
                            5: '黑色模板',
                            6: '金沙主题',
                            7: '火山橙',
                            8: "\u9999\u69DF\u91D1" + mobileTemplateStyle,
                            9: "\u7B80\u7EA6\u6A21\u677F" + mobileTemplateStyle,
                            12: '综合体育',
                            14: "\u516D\u5408\u5385",
                            16: "\u5C0A\u9F99",
                            18: "\u91D1\u661F\u9ED1",
                            19: "\u4E50\u6A59",
                            20: "\u5229\u6765",
                            22: "\u51EF\u65F6",
                            21: "\u5B9D\u77F3\u7EA2",
                            23: "\u5A01\u5C3C\u65AF",
                            25: '天空蓝',
                            26: "\u767D\u66DC",
                            27: "\u8D8A\u5357",
                        };
                        console.log('pi fu =', mobileTemplateCategory);
                        key = dict[mobileTemplateCategory];
                        key = (_a = config_1.releaseConfig.skinKeys[AppDefine_1.default.siteId]) !== null && _a !== void 0 ? _a : key;
                        if (config_1.devConfig.isDebug) {
                            (config_1.devConfig === null || config_1.devConfig === void 0 ? void 0 : config_1.devConfig.skinKey) && (key = config_1.devConfig === null || config_1.devConfig === void 0 ? void 0 : config_1.devConfig.skinKey);
                        }
                        theme = __assign(__assign({}, new UGThemeColor_1.UGThemeColor()), this.allThemeColor[key]);
                        theme.themeColor = (_b = theme.themeColor) !== null && _b !== void 0 ? _b : chroma_js_1.default.scale(theme.navBarBgColor)(0.5).hex();
                        theme.themeDarkColor = (_c = theme.themeDarkColor) !== null && _c !== void 0 ? _c : chroma_js_1.default(theme.themeColor).darken().hex();
                        theme.themeLightColor = (_d = theme.themeLightColor) !== null && _d !== void 0 ? _d : chroma_js_1.default(theme.themeColor).brighten().hex();
                        theme.bgTextColor =
                            chroma_js_1.default(theme.bgColor[0]).hex() == '#ffffff' ? '#999' : 'white';
                        skin = new UGSkinManagers();
                        Object.assign(skin, exports.Skin1);
                        Object.assign(skin, theme);
                        if (!FUtils_1.default.isExactlyEqual(skin, exports.Skin1)) {
                            exports.Skin1 = skin;
                            console.log('当前为皮肤：' + skin.skitString, skin);
                        }
                        return [4 /*yield*/, this.updateOcSkin()];
                    case 1:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 应用主题色到iOS原生代码
    UGSkinManagers.updateOcSkin = function () {
        return __awaiter(this, void 0, void 0, function () {
            var skin, isOnlineSkin, ok, _a, _b, _i, k, v, key, c1, a1, c2, a2, c, a;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        skin = exports.Skin1;
                        if (react_native_1.Platform.OS != 'ios')
                            return [2 /*return*/];
                        isOnlineSkin = skin.skitType.indexOf('尊龙') != -1 ||
                            skin.skitType.indexOf('宝石红') != -1;
                        ok = config_1.devConfig.isDebug || config_1.devConfig.isTest() || isOnlineSkin;
                        if (!ok)
                            return [2 /*return*/];
                        //
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGSkinManagers.currentSkin.setValuesWithDictionary:', [
                                skin,
                            ])];
                    case 1:
                        //
                        _c.sent();
                        _a = [];
                        for (_b in skin)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 11];
                        k = _a[_i];
                        if (!(k.toLowerCase().indexOf('color') != -1)) return [3 /*break*/, 8];
                        v = skin[k];
                        key = "_" + k;
                        if (!(v instanceof Array)) return [3 /*break*/, 4];
                        c1 = chroma_js_1.default(v[0]).hex().slice(0, 7);
                        a1 = chroma_js_1.default(v[0]).alpha();
                        c2 = chroma_js_1.default(v[1]).hex().slice(0, 7);
                        a2 = chroma_js_1.default(v[1]).alpha();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGSkinManagers.currentSkin.setValue:forKey:', [
                                {
                                    selectors: 'UIColor.colorWithPatternImage:',
                                    args1: [
                                        {
                                            selectors: 'UIImage.gradientImageWithBounds:andColors:andGradientType:',
                                            args1: [
                                                OCCall_1.NSValue.CGRectMake(0, 0, AppDefine_1.default.width, AppDefine_1.default.height),
                                                [
                                                    {
                                                        selectors: 'UIColor.colorWithHexString:.colorWithAlphaComponent:',
                                                        args1: [c1],
                                                        args2: [a1],
                                                    },
                                                    {
                                                        selectors: 'UIColor.colorWithHexString:.colorWithAlphaComponent:',
                                                        args1: [c2],
                                                        args2: [a2],
                                                    },
                                                ],
                                                1,
                                            ],
                                        },
                                    ],
                                },
                                key,
                            ])];
                    case 3:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        c = chroma_js_1.default(v).hex().slice(0, 7);
                        a = chroma_js_1.default(v).alpha();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGSkinManagers.currentSkin.setValue:forKey:', [
                                {
                                    selectors: 'UIColor.colorWithHexString:.colorWithAlphaComponent:',
                                    args1: [c],
                                    args2: [a],
                                },
                                key,
                            ])];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6: return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationWithSkinSuccess'])];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8: return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationWithSkinSuccess'])];
                    case 9:
                        _c.sent();
                        _c.label = 10;
                    case 10:
                        _i++;
                        return [3 /*break*/, 2];
                    case 11: 
                    // 刷新标签栏、导航条
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGTabbarController.shared.setTabbarStyle')
                        // 刷新状态栏
                    ];
                    case 12:
                        // 刷新标签栏、导航条
                        _c.sent();
                        // 刷新状态栏
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGTabbarController.shared.view.viewWithTagString:.setBackgroundColor:', [
                                '状态栏背景View',
                                { selectors: 'UGSkinManagers.currentSkin.navBarBgColor' },
                            ])];
                    case 13:
                        // 刷新状态栏
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UGSkinManagers.allThemeColor = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({}, JDThemeColor_1.JDThemeColor), JYThemeColor_1.JYThemeColor), LHThemeColor_1.LHThemeColor), XBJThemeColor_1.XBJThemeColor), XNHThemeColor_1.XNHThemeColor), ZLThemeColor_1.ZLThemeColor), GDBThemeColor_1.GDBThemeColor), OtherThemeColor_1.OtherThemeColor), LCThemeColor_1.LCThemeColor), KSThemeColor_1.KSThemeColor), WNZThemeColor_1.WNZThemeColor), PYThemeColor_1.PYThemeColor), BZHThemeColor_1.BZHThemeColor), LLThemeCololr_1.LLThemeColor), VietnamThemeColors_1.VietnamThemeColors);
    return UGSkinManagers;
}(UGThemeColor_1.UGThemeColor));
exports.default = UGSkinManagers;
exports.Skin1 = new UGSkinManagers();
//# sourceMappingURL=UGSkinManagers.js.map