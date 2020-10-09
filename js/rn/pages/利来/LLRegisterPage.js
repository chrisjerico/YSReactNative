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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLRegisterPage = void 0;
var React = __importStar(require("react"));
var react_1 = require("react");
var react_native_1 = require("react-native");
var BaseScreen_1 = require("../\u4E50\u6A59/component/BaseScreen");
var AppDefine_1 = __importDefault(require("../../public/define/AppDefine"));
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var Navigation_1 = require("../../public/navigation/Navigation");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var APIRouter_1 = __importDefault(require("../../public/network/APIRouter"));
var UGStore_1 = require("../../redux/store/UGStore");
var UGUserModel_1 = __importDefault(require("../../redux/model/\u5168\u5C40/UGUserModel"));
var react_native_event_listeners_1 = require("react-native-event-listeners");
// @ts-ignore
var blueimp_md5_1 = __importDefault(require("blueimp-md5"));
var ToastUtils_1 = require("../../public/tools/ToastUtils");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
var DataDefine_1 = require("../../public/define/ANHelper/hp/DataDefine");
var react_native_webview_1 = __importDefault(require("react-native-webview"));
var UgLog_1 = require("../../public/tools/UgLog");
var react_native_elements_1 = require("react-native-elements");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var UGLoadingCP_1 = require("../../public/widget/UGLoadingCP");
var LLRegisterInput_1 = require("./component/registerPage/LLRegisterInput");
var httpClient_1 = require("../../public/network/httpClient");
exports.LLRegisterPage = function () {
    var _a = react_1.useState(""), acc = _a[0], setAcc = _a[1];
    var _b = react_1.useState(""), pwd = _b[0], setPwd = _b[1];
    var _c = react_1.useState(""), code = _c[0], setCode = _c[1];
    var _d = react_1.useState(""), name = _d[0], setName = _d[1];
    var _e = react_1.useState(""), fundPwd = _e[0], setFundPwd = _e[1];
    var _f = react_1.useState(""), phone = _f[0], setPhone = _f[1];
    var _g = react_1.useState(""), QQ = _g[0], setQQ = _g[1];
    var _h = react_1.useState(""), wx = _h[0], setWx = _h[1];
    var _j = react_1.useState(""), smsCode = _j[0], setSmsCode = _j[1];
    var _k = react_1.useState(""), imgCode = _k[0], setImgCode = _k[1];
    var _l = react_1.useState(""), email = _l[0], setEmail = _l[1];
    var _m = react_1.useState(""), inviter = _m[0], setInviter = _m[1];
    var _o = react_1.useState(""), confirmPwd = _o[0], setConfirmPwd = _o[1];
    var _p = react_1.useState("user"), regType = _p[0], setRegType = _p[1];
    var regex = RegExp("^[A-Za-z0-9]{6,15}$");
    var SystemStore = UGStore_1.UGStore.globalProps.sysConf;
    var _q = react_1.useState(), slideCode = _q[0], setSlideCode = _q[1];
    var _r = SystemStore.mobile_logo, mobile_logo = _r === void 0 ? "" : _r, rankingListSwitch = SystemStore.rankingListSwitch, hide_reco = SystemStore.hide_reco, // 代理人 0不填，1选填，2必填
    reg_name = SystemStore.reg_name, // 真实姓名 0不填，1选填，2必填
    reg_fundpwd = SystemStore.reg_fundpwd, // 取款密码 0不填，1选填，2必填
    reg_qq = SystemStore.reg_qq, // QQ 0不填，1选填，2必填
    reg_wx = SystemStore.reg_wx, // 微信 0不填，1选填，2必填
    reg_phone = SystemStore.reg_phone, // 手机 0不填，1选填，2必填
    reg_email = SystemStore.reg_email, // 邮箱 0不填，1选填，2必填
    reg_vcode = SystemStore.reg_vcode, // 0无验证码，1图形验证码 2滑块验证码 3点击显示图形验证码
    pass_limit = SystemStore.pass_limit, // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
    pass_length_min = SystemStore.pass_length_min, // 注册密码最小长度
    pass_length_max = SystemStore.pass_length_max, // 注册密码最大长度,
    agentRegbutton = SystemStore.agentRegbutton, // 是否开启代理注册，0=关闭；1=开启
    smsVerify = SystemStore.smsVerify, // 手机短信验证
    allowreg = SystemStore.allowreg, closeregreason = SystemStore.closeregreason;
    react_1.useEffect(function () {
        if (reg_vcode == 1) {
            reRenderCode();
        }
    }, [reg_vcode]);
    react_1.useEffect(function () {
        if (allowreg == false) {
            react_native_1.Alert.alert(closeregreason, "", [{
                    text: "确定",
                    onPress: function () {
                        RootNavigation_1.popToRoot();
                    }
                }]);
        }
    }, [allowreg]);
    var reRenderCode = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.secure_imgCaptcha()];
                case 1:
                    _a = _b.sent(), data = _a.data, status = _a.status;
                    setCode(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var getVcode = react_1.useMemo(function () {
        UgLog_1.ugLog('sliding reg_vcode=', reg_vcode);
        if (reg_vcode == 0) {
            return null;
        }
        else if (reg_vcode == 3 || reg_vcode == 1) {
            return React.createElement(LetterVerificationCode, { reg_vcode: reg_vcode, onPress: reRenderCode, code: code });
        }
        else {
            return React.createElement(SlidingVerification, { onChange: function (args) {
                    UgLog_1.ugLog('sliding code=', args);
                    setSlideCode(args);
                } });
        }
    }, [reg_vcode, code]);
    var onSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var password, smsCode_, imgCode_, _a, data, status, user, _b, _c, loginData, status_1, _d, sessid, _e, UserInfo, _f, error_2;
        var _g, _h, _j, _k, _l, _m, _o;
        return __generator(this, function (_p) {
            switch (_p.label) {
                case 0:
                    _p.trys.push([0, 34, , 35]);
                    password = blueimp_md5_1.default(pwd);
                    smsCode_ = smsCode;
                    imgCode_ = imgCode;
                    UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading, text: '正在注册...' });
                    if (slideCode) {
                        smsCode_ = "";
                        imgCode_ = "";
                        console.log(slideCode);
                    }
                    return [4 /*yield*/, APIRouter_1.default.user_reg({
                            usr: acc,
                            pwd: password,
                            phone: phone,
                            fullName: name,
                            fundPwd: fundPwd,
                            qq: QQ,
                            wx: wx,
                            regType: regType,
                            "slideCode[nc_sid]": slideCode ? slideCode["nc_csessionid"] : "",
                            "slideCode[nc_token]": slideCode ? slideCode["nc_token"] : "",
                            "slideCode[nc_sig]": slideCode ? slideCode["nc_sig"] : "",
                            smsCode: smsCode_,
                            imgCode: imgCode_,
                            email: email,
                            inviter: inviter
                        })];
                case 1:
                    _a = _p.sent(), data = _a.data, status = _a.status;
                    reRenderCode();
                    if ((data === null || data === void 0 ? void 0 : data.data) == null)
                        throw { message: data === null || data === void 0 ? void 0 : data.msg };
                    UgLog_1.ugLog('data?.data?.autoLogin=', (_g = data === null || data === void 0 ? void 0 : data.data) === null || _g === void 0 ? void 0 : _g.autoLogin);
                    if (!((_h = data === null || data === void 0 ? void 0 : data.data) === null || _h === void 0 ? void 0 : _h.autoLogin)) return [3 /*break*/, 33];
                    user = void 0;
                    _b = react_native_1.Platform.OS;
                    switch (_b) {
                        case 'ios': return [3 /*break*/, 2];
                        case 'android': return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 6];
                case 2: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                case 3:
                    user = _p.sent();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["注册成功"]);
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LOAD_DATA, { key: DataDefine_1.NA_DATA.USER_INFO })];
                case 5:
                    user = _p.sent();
                    ToastUtils_1.Toast('注册成功');
                    return [3 /*break*/, 6];
                case 6: return [4 /*yield*/, APIRouter_1.default.user_login(data.data.usr, password)];
                case 7:
                    _c = _p.sent(), loginData = _c.data, status_1 = _c.status;
                    if (!user) return [3 /*break*/, 16];
                    console.log('退出旧账号: ', user);
                    _d = react_native_1.Platform.OS;
                    switch (_d) {
                        case 'ios': return [3 /*break*/, 8];
                        case 'android': return [3 /*break*/, 12];
                    }
                    return [3 /*break*/, 15];
                case 8: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser.sessid')];
                case 9:
                    sessid = _p.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }])];
                case 10:
                    _p.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:')];
                case 11:
                    _p.sent();
                    return [3 /*break*/, 15];
                case 12: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, { key: DataDefine_1.NA_DATA.LOGIN_INFO })];
                case 13:
                    _p.sent();
                    return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, { key: DataDefine_1.NA_DATA.USER_INFO })];
                case 14:
                    _p.sent();
                    return [3 /*break*/, 15];
                case 15:
                    UGStore_1.UGStore.dispatch({ type: 'reset' });
                    _p.label = 16;
                case 16:
                    _e = react_native_1.Platform.OS;
                    switch (_e) {
                        case 'ios': return [3 /*break*/, 17];
                        case 'android': return [3 /*break*/, 24];
                    }
                    return [3 /*break*/, 26];
                case 17: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(loginData === null || loginData === void 0 ? void 0 : loginData.data)])];
                case 18:
                    _p.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd'])];
                case 19:
                    _p.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [acc, 'userName'])];
                case 20:
                    _p.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [pwd, 'userPsw'])];
                case 21:
                    _p.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                case 22:
                    _p.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                case 23:
                    _p.sent();
                    return [3 /*break*/, 26];
                case 24: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.LOGIN_INFO }, loginData === null || loginData === void 0 ? void 0 : loginData.data))];
                case 25:
                    _p.sent();
                    return [3 /*break*/, 26];
                case 26: return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 27:
                    UserInfo = (_p.sent()).data;
                    _f = react_native_1.Platform.OS;
                    switch (_f) {
                        case 'ios': return [3 /*break*/, 28];
                        case 'android': return [3 /*break*/, 30];
                    }
                    return [3 /*break*/, 32];
                case 28: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [__assign(__assign({}, UserInfo.data), UGUserModel_1.default.getYS(loginData === null || loginData === void 0 ? void 0 : loginData.data))])];
                case 29:
                    _p.sent();
                    return [3 /*break*/, 32];
                case 30: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.USER_INFO }, UserInfo === null || UserInfo === void 0 ? void 0 : UserInfo.data))];
                case 31:
                    _p.sent();
                    return [3 /*break*/, 32];
                case 32:
                    UGStore_1.UGStore.dispatch({ type: 'merge', props: UserInfo === null || UserInfo === void 0 ? void 0 : UserInfo.data });
                    UGStore_1.UGStore.save();
                    switch (react_native_1.Platform.OS) {
                        case 'ios':
                            OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
                            break;
                        case 'android':
                            ToastUtils_1.Toast('登录成功');
                            break;
                    }
                    UGLoadingCP_1.hideLoading();
                    RootNavigation_1.popToRoot();
                    _p.label = 33;
                case 33:
                    if (((_j = data === null || data === void 0 ? void 0 : data.data) === null || _j === void 0 ? void 0 : _j.autoLogin) == false) {
                        switch (react_native_1.Platform.OS) {
                            case 'ios':
                                OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [(_k = data.msg) !== null && _k !== void 0 ? _k : ""]);
                                break;
                            case 'android':
                                ToastUtils_1.Toast((_l = data.msg) !== null && _l !== void 0 ? _l : "");
                                break;
                        }
                        UGLoadingCP_1.hideLoading();
                        RootNavigation_1.popToRoot();
                        RootNavigation_1.navigate(Navigation_1.PageName.LLLoginPage, { usr: acc, pwd: pwd });
                    }
                    return [3 /*break*/, 35];
                case 34:
                    error_2 = _p.sent();
                    UGLoadingCP_1.hideLoading();
                    react_native_event_listeners_1.EventRegister.emit('reload');
                    if (error_2.message.includes("推荐人")) {
                        react_native_1.Alert.alert(error_2 === null || error_2 === void 0 ? void 0 : error_2.message, "");
                        switch (react_native_1.Platform.OS) {
                            case 'ios':
                                OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [""]);
                                break;
                            case 'android':
                                break;
                        }
                    }
                    else {
                        switch (react_native_1.Platform.OS) {
                            case 'ios':
                                OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_m = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _m !== void 0 ? _m : '注册失败']);
                                break;
                            case 'android':
                                ToastUtils_1.Toast((_o = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _o !== void 0 ? _o : '注册失败');
                                break;
                        }
                    }
                    return [3 /*break*/, 35];
                case 35: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(BaseScreen_1.BaseScreen, { screenName: "注册" },
        React.createElement(react_native_1.StatusBar, { barStyle: "dark-content", translucent: true }),
        React.createElement(react_native_1.View, { style: { alignItems: "center", width: AppDefine_1.default.width, height: 140 } },
            React.createElement(react_native_1.Image, { style: { width: AppDefine_1.default.width, height: 182, resizeMode: "stretch", position: "absolute" }, source: { uri: httpClient_1.httpClient.defaults.baseURL + "/views/mobileTemplate/20/images/login-blue-bg.png" } }),
            React.createElement(react_native_1.Image, { style: { width: 150, height: 150, resizeMode: "stretch" }, source: { uri: mobile_logo } })),
        React.createElement(react_native_1.ScrollView, { showsVerticalScrollIndicator: false, bounces: false, style: { marginHorizontal: 36, marginTop: 28, marginBottom: 30 } },
            React.createElement(LLRegisterInput_1.LLRegisterInput, { visible: hide_reco != 0, onChangeText: function (text) { return setInviter(text); }, placeholder: "推荐人或上级代理", img: httpClient_1.httpClient.defaults.baseURL + "/images/moban9_icon/icon-reco.png" }),
            inviter == "" && React.createElement(react_native_1.View, { style: { flexDirection: "row" } },
                React.createElement(react_native_1.Text, { style: {
                        color: "red",
                        fontSize: 12,
                        textAlign: "left",
                        flex: 1,
                        paddingVertical: 4
                    } }, "*\u8BF7\u586B\u5199\u63A8\u8350\u4EBAID")),
            React.createElement(LLRegisterInput_1.LLRegisterInput, { onChangeText: function (text) { return setAcc(text); }, placeholder: "请输入会员账号（6-15位字母或数字)", img: httpClient_1.httpClient.defaults.baseURL + "/images/moban9_icon/icon-user.png" }),
            !regex.test(acc) && React.createElement(react_native_1.View, { style: { flexDirection: "row" } },
                React.createElement(react_native_1.Text, { style: {
                        color: "red",
                        fontSize: 12,
                        textAlign: "left",
                        flex: 1,
                        paddingVertical: 4
                    } }, "*\u8BF7\u4F7F\u75286-15\u4F4D\u82F1\u6587\u6216\u6570\u5B57\u7684\u7EC4\u5408")),
            React.createElement(LLRegisterInput_1.LLRegisterInput, { isPwd: true, onChangeText: function (text) { return setPwd(text); }, placeholder: "请输入密码（长度不能低于6位)", img: httpClient_1.httpClient.defaults.baseURL + "/images/moban9_icon/icon-pwd.png" }),
            React.createElement(LLRegisterInput_1.LLRegisterInput, { isPwd: true, onChangeText: function (text) { return setConfirmPwd(text); }, placeholder: "请确认密码", img: httpClient_1.httpClient.defaults.baseURL + "/images/moban9_icon/icon-pwd.png" }),
            React.createElement(LLRegisterInput_1.LLRegisterInput, { visible: reg_email != 0, onChangeText: function (text) { return setEmail(text); }, placeholder: "请输入电子邮件", img: httpClient_1.httpClient.defaults.baseURL + "/images/moban9_icon/icon-email.png" }),
            reg_fundpwd ? React.createElement(LLRegisterInput_1.LLRegisterInput, { isPwd: true, onChangeText: function (text) { return setFundPwd(text); }, placeholder: "请输入取款密码", img: httpClient_1.httpClient.defaults.baseURL + "/images/moban9_icon/icon-pwd.png" }) : null,
            reg_name ? React.createElement(LLRegisterInput_1.LLRegisterInput, { isPwd: true, onChangeText: function (text) { return setName(text); }, placeholder: "请输入真实姓名", img: httpClient_1.httpClient.defaults.baseURL + "/images/moban9_icon/icon-user.png" }) : null,
            reg_qq ? React.createElement(LLRegisterInput_1.LLRegisterInput, { isPwd: true, onChangeText: function (text) { return setQQ(text); }, placeholder: "请输入QQ号", img: httpClient_1.httpClient.defaults.baseURL + "/images/moban9_icon/icon-user.png" }) : null,
            reg_wx ? React.createElement(LLRegisterInput_1.LLRegisterInput, { isPwd: true, onChangeText: function (text) { return setWx(text); }, placeholder: "请输入微信号", img: httpClient_1.httpClient.defaults.baseURL + "/images/moban9_icon/icon-user.png" }) : null,
            reg_phone ? React.createElement(LLRegisterInput_1.LLRegisterInput, { isPwd: true, onChangeText: function (text) { return setPhone(text); }, placeholder: "请输入手机", img: httpClient_1.httpClient.defaults.baseURL + "/images/moban9_icon/icon-user.png" }) : null,
            getVcode,
            React.createElement(react_native_1.View, { style: { flexDirection: "row" } },
                React.createElement(react_native_1.TouchableOpacity, { style: { flex: 1, backgroundColor: "#d19898", borderRadius: 30, marginTop: 12 }, onPress: function () {
                        onSubmit();
                    } },
                    React.createElement(react_native_1.Text, { style: {
                            fontSize: 16,
                            color: "white",
                            textAlign: "center",
                            paddingVertical: 16
                        } }, "\u7ACB\u5373\u5F00\u6237"))),
            React.createElement(react_native_1.View, { style: { alignItems: "center" } },
                React.createElement(react_native_1.View, { style: { flexDirection: "row", marginTop: 16 } },
                    React.createElement(react_native_1.Text, { style: { color: "#3c3c3c", fontSize: 14 } }, "\u5DF2\u6709\u8D26\u53F7\uFF1F"),
                    React.createElement(react_native_1.Text, { style: { color: "#387ef5", fontSize: 14 }, onPress: function () {
                            RootNavigation_1.navigate(Navigation_1.PageName.LLLoginPage, "");
                        } }, "\u9A6C\u4E0A\u767B\u5F55")),
                React.createElement(react_native_1.Text, { style: { color: "#666", marginTop: 16, fontSize: 14 } }, "Copyright \u00A92012-2020 All Right Reserved")))));
};
var SlidingVerification = function (_a) {
    var onChange = _a.onChange;
    var webViewScript = "setTimeout(function() {\n            document.getElementById('app').style.background = 'white'\n            window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight);\n          }, 500);\n          true;";
    var _b = react_1.useState(0), webviewHeight = _b[0], setWebViewHeight = _b[1];
    var hadnleMessage = function (e) {
        var _a;
        var eData = (_a = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _a === void 0 ? void 0 : _a.data;
        console.log("sliding response: " + eData);
        if (typeof eData == 'string') {
            setWebViewHeight(parseInt(eData) * 1.5);
        }
        else {
            onChange(eData);
        }
    };
    var webViewRef = react_1.useRef();
    react_1.useEffect(function () {
        var listener = react_native_event_listeners_1.EventRegister.addEventListener('reload', function (data) {
            var _a;
            (_a = webViewRef === null || webViewRef === void 0 ? void 0 : webViewRef.current) === null || _a === void 0 ? void 0 : _a.reload();
        });
        return (function () { return react_native_event_listeners_1.EventRegister.removeEventListener(_this.listener); });
    }, []);
    var slidingUrl = AppDefine_1.default.host + "/dist/index.html#/swiperverify?platform=native";
    UgLog_1.ugLog('slidingUrl=' + slidingUrl);
    return (React.createElement(react_native_1.View, { style: { height: webviewHeight } },
        React.createElement(react_native_webview_1.default, { ref: webViewRef, style: { minHeight: webviewHeight, backgroundColor: 'white' }, containerStyle: { backgroundColor: 'white', height: 10 }, javaScriptEnabled: true, injectedJavaScript: webViewScript, startInLoadingState: true, source: { uri: slidingUrl }, onMessage: hadnleMessage })));
};
var LetterVerificationCode = function (_a) {
    var code = _a.code, onPress = _a.onPress, reg_vcode = _a.reg_vcode;
    var _b = react_1.useState(reg_vcode == 1 ? false : true), hide = _b[0], setHide = _b[1];
    return (React.createElement(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            height: 50,
            backgroundColor: 'gray',
            borderRadius: 4,
            borderColor: 'white',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10
        } },
        React.createElement(react_native_1.View, { style: { width: 40, justifyContent: 'center', alignItems: 'center' } },
            React.createElement(react_native_elements_1.Icon, { name: "Safety", type: "antdesign", color: "black", size: 24 })),
        React.createElement(react_native_1.View, { style: { height: "90%", width: 0.5, backgroundColor: 'black', marginHorizontal: 5 } }),
        !hide ? React.createElement(react_native_gesture_handler_1.TouchableWithoutFeedback, { onPress: onPress },
            React.createElement(react_native_1.Image, { resizeMode: 'contain', style: { height: "100%", aspectRatio: 2 }, source: { uri: code } })) : React.createElement(react_native_gesture_handler_1.TouchableWithoutFeedback, { onPress: function () {
                setHide(false);
                onPress();
            } },
            React.createElement(react_native_1.Text, null, "\u70B9\u51FB\u663E\u793A\u9A8C\u8BC1\u7801"))));
};
//# sourceMappingURL=LLRegisterPage.js.map