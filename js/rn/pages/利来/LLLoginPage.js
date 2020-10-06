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
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var BaseScreen_1 = require("../\u4E50\u6A59/component/BaseScreen");
var CheckBox_1 = require("./component/CheckBox");
var useLoginIn_1 = require("../../public/hooks/useLoginIn");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var APIRouter_1 = require("../../public/network/APIRouter");
var PushHelper_1 = require("../../public/define/PushHelper");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var Navigation_1 = require("../../public/navigation/Navigation");
var react_native_dialog_input_1 = require("react-native-dialog-input");
// @ts-ignore
var blueimp_md5_1 = require("blueimp-md5");
var httpClient_1 = require("../../public/network/httpClient");
var UGUserModel_1 = require("../../redux/model/\u5168\u5C40/UGUserModel");
var UGStore_1 = require("../../redux/store/UGStore");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
var DataDefine_1 = require("../../public/define/ANHelper/hp/DataDefine");
var ToastUtils_1 = require("../../public/tools/ToastUtils");
var errorTimes = 0;
exports.LLLoginPage = function (_a) {
    var route = _a.route, navigation = _a.navigation, setProps = _a.setProps;
    var _b = react_1.useState(""), acc = _b[0], setAcc = _b[1];
    var _c = react_1.useState(""), pwd = _c[0], setPwd = _c[1];
    var loginSuccessHandle = useLoginIn_1.default().loginSuccessHandle;
    var _d = react_1.useState(false), isRemember = _d[0], setIsRemember = _d[1];
    var _e = react_1.useState(false), GGmodalShow = _e[0], setGGModalShow = _e[1];
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, isRemember_1, account, pwd_1, result, loginInfo;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = react_native_1.Platform.OS;
                    switch (_a) {
                        case "ios": return [3 /*break*/, 1];
                        case "android": return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 8];
                case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.boolForKey:', ['isRememberPsd'])];
                case 2:
                    isRemember_1 = _b.sent();
                    setIsRemember(isRemember_1);
                    if (!isRemember_1) return [3 /*break*/, 5];
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userName'])];
                case 3:
                    account = _b.sent();
                    setAcc(account);
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw'])];
                case 4:
                    pwd_1 = _b.sent();
                    setPwd(pwd_1);
                    _b.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LOAD_DATA, { key: DataDefine_1.NA_DATA.LOGIN_INFO })];
                case 7:
                    result = _b.sent();
                    loginInfo = JSON.parse(result);
                    setIsRemember(loginInfo === null || loginInfo === void 0 ? void 0 : loginInfo.isRemember);
                    if (loginInfo === null || loginInfo === void 0 ? void 0 : loginInfo.isRemember) {
                        setAcc(loginInfo === null || loginInfo === void 0 ? void 0 : loginInfo.account);
                        setPwd(loginInfo === null || loginInfo === void 0 ? void 0 : loginInfo.pwd);
                    }
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        var _a, _b, _c, _d;
        init();
        if (((_a = route === null || route === void 0 ? void 0 : route.params) === null || _a === void 0 ? void 0 : _a.usr) && ((_b = route === null || route === void 0 ? void 0 : route.params) === null || _b === void 0 ? void 0 : _b.pwd)) {
            setAcc((_c = route === null || route === void 0 ? void 0 : route.params) === null || _c === void 0 ? void 0 : _c.usr);
            setPwd((_d = route === null || route === void 0 ? void 0 : route.params) === null || _d === void 0 ? void 0 : _d.pwd);
        }
    }, []);
    var testPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status, _b, userInfo, _c, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 19, , 20]);
                    return [4 /*yield*/, APIRouter_1.default.user_guestLogin()];
                case 1:
                    _a = _d.sent(), data = _a.data, status = _a.status;
                    _b = react_native_1.Platform.OS;
                    switch (_b) {
                        case "ios": return [3 /*break*/, 2];
                        case "android": return [3 /*break*/, 10];
                    }
                    return [3 /*break*/, 12];
                case 2: return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay'])];
                case 3:
                    _d.sent();
                    //@ts-ignore
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(data.data)])];
                case 4:
                    //@ts-ignore
                    _d.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd'])];
                case 5:
                    _d.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName'])];
                case 6:
                    _d.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw'])];
                case 7:
                    _d.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                case 8:
                    _d.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                case 9:
                    _d.sent();
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.LOGIN_INFO }, data === null || data === void 0 ? void 0 : data.data))];
                case 11:
                    _d.sent();
                    return [3 /*break*/, 12];
                case 12: return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 13:
                    userInfo = (_d.sent()).data;
                    return [4 /*yield*/, UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data })];
                case 14:
                    _d.sent();
                    UGStore_1.UGStore.save();
                    setProps();
                    _c = react_native_1.Platform.OS;
                    switch (_c) {
                        case 'ios': return [3 /*break*/, 15];
                        case 'android': return [3 /*break*/, 16];
                    }
                    return [3 /*break*/, 18];
                case 15:
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                    return [3 /*break*/, 18];
                case 16: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.USER_INFO }, userInfo === null || userInfo === void 0 ? void 0 : userInfo.data))];
                case 17:
                    _d.sent();
                    return [3 /*break*/, 18];
                case 18: return [3 /*break*/, 20];
                case 19:
                    error_1 = _d.sent();
                    console.log(error_1);
                    return [3 /*break*/, 20];
                case 20:
                    RootNavigation_1.pop();
                    return [2 /*return*/];
            }
        });
    }); };
    var login = function (_a) {
        var account = _a.account, pwd = _a.pwd, _b = _a.googleCode, googleCode = _b === void 0 ? "" : _b, slideCode = _a.slideCode;
        return __awaiter(void 0, void 0, void 0, function () {
            var simplePwds, _c, _d, data, status, error_2;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
                        if (!(simplePwds.indexOf(pwd) > -1)) return [3 /*break*/, 6];
                        _c = react_native_1.Platform.OS;
                        switch (_c) {
                            case 'ios': return [3 /*break*/, 1];
                            case 'android': return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码'])];
                    case 2:
                        _g.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                                { selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController'] },
                                true,
                            ])];
                    case 3:
                        _g.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ToastUtils_1.Toast('你的密码过于简单，可能存在风险，请把密码修改成复杂密码');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                    case 6:
                        _g.trys.push([6, 9, , 10]);
                        switch (react_native_1.Platform.OS) {
                            case 'ios':
                                OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
                                break;
                            case 'android':
                                ToastUtils_1.Toast('正在登录...');
                                break;
                        }
                        return [4 /*yield*/, APIRouter_1.default.user_login(account, blueimp_md5_1.default(pwd), googleCode, slideCode)];
                    case 7:
                        _d = _g.sent(), data = _d.data, status = _d.status;
                        if (data.data == null)
                            throw { message: data === null || data === void 0 ? void 0 : data.msg };
                        if (((_e = data.data) === null || _e === void 0 ? void 0 : _e.ggCheck) == true) {
                            switch (react_native_1.Platform.OS) {
                                case 'ios':
                                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['请输入谷歌验证码']);
                                    break;
                                case 'android':
                                    ToastUtils_1.Toast('请输入谷歌验证码');
                                    break;
                            }
                            setGGModalShow(true);
                            return [2 /*return*/];
                            // Alert.alert("")
                        }
                        switch (react_native_1.Platform.OS) {
                            case 'ios':
                                OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                                break;
                            case 'android':
                                ToastUtils_1.Toast('登录成功！');
                                break;
                        }
                        UGStore_1.UGStore.dispatch({
                            type: 'merge', sign: {
                                remember: isRemember,
                                account: acc ? acc : null,
                                password: pwd ? pwd : null
                            }
                        });
                        setGGModalShow(false);
                        return [4 /*yield*/, loginSuccessHandle(data, { account: account, pwd: pwd, isRemember: isRemember })];
                    case 8:
                        _g.sent();
                        setProps();
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _g.sent();
                        errorTimes += 1;
                        if (errorTimes >= 3) {
                            setAcc("");
                            setPwd("");
                            setGGModalShow(false);
                        }
                        switch (react_native_1.Platform.OS) {
                            case 'ios':
                                OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_f = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _f !== void 0 ? _f : '登入失败']);
                                break;
                            case 'android':
                                ToastUtils_1.Toast('登入失败');
                                break;
                        }
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return (React.createElement(BaseScreen_1.BaseScreen, { screenName: "登录", style: { backgroundColor: "#f5f5f9", alignItems: "center", paddingHorizontal: 28 } },
        React.createElement(react_native_1.StatusBar, { barStyle: "dark-content", translucent: true }),
        React.createElement(react_native_1.View, { style: {
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "rgb(238, 238, 238)",
                paddingTop: 12
            } },
            React.createElement(react_native_1.Image, { style: { height: 18, width: 18, marginRight: 8 }, source: { uri: "https://test10.6yc.com/images/moban9_icon/icon-user.png" } }),
            React.createElement(react_native_1.TextInput, { onChangeText: function (text) { return setAcc(text); }, style: { fontSize: 14, paddingVertical: 20, flex: 1 }, placeholderTextColor: "#333", placeholder: "请输入会员账号" })),
        React.createElement(react_native_1.View, { style: {
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "rgb(238, 238, 238)",
                paddingTop: 12
            } },
            React.createElement(react_native_1.Image, { style: { height: 18, width: 18, marginRight: 8, resizeMode: "stretch" }, source: { uri: "https://test10.6yc.com/images/moban9_icon/icon-pwd.png" } }),
            React.createElement(react_native_1.TextInput, { secureTextEntry: true, onChangeText: function (text) { return setPwd(text); }, style: { fontSize: 14, paddingVertical: 20, flex: 1 }, placeholderTextColor: "#333", placeholder: "请输入密码" })),
        React.createElement(react_native_1.View, { style: { flexDirection: "row" } },
            React.createElement(react_native_1.TouchableHighlight, { onPress: function () { return login({ account: acc, pwd: pwd }); }, underlayColor: "#007aff", style: {
                    backgroundColor: acc != "" && pwd != "" ? "#d82e2f" : "#d19898",
                    height: 47,
                    width: "auto",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 12,
                    borderRadius: 4
                } },
                React.createElement(react_native_1.Text, { style: { color: "white", fontSize: 16 } }, "\u767B \u5F55"))),
        React.createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: "center", marginTop: 12 } },
            React.createElement(CheckBox_1.CheckBox, { onCheck: function () { return setIsRemember(!isRemember); }, text: "记住密码" }),
            React.createElement(react_native_1.View, { style: { flex: 1 } }),
            React.createElement(react_native_1.TouchableOpacity, { style: { flexDirection: "row", alignItems: "center" }, onPress: function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服); } },
                React.createElement(react_native_1.Image, { style: { height: 24, width: 24 }, source: { uri: "https://test10.6yc.com/views/mobileTemplate/20/images/kf.png" } }),
                React.createElement(react_native_1.Text, { style: { color: "#333333", paddingLeft: 8 } }, "\u5728\u7EBF\u5BA2\u670D"))),
        React.createElement(react_native_1.Text, { style: { fontSize: 16, paddingVertical: 24, color: "#3c3c3c" } }, "\u5176\u4ED6"),
        React.createElement(react_native_1.View, { style: { flexDirection: "row", marginHorizontal: 12 } },
            React.createElement(react_native_1.TouchableOpacity, { style: { alignItems: "center" }, onPress: function () {
                    RootNavigation_1.push(Navigation_1.PageName.LLRegisterPage);
                } },
                React.createElement(react_native_1.Image, { style: { height: 64, width: 64 }, source: { uri: "https://test10.6yc.com/views/mobileTemplate/20/images/register.png" } }),
                React.createElement(react_native_1.Text, { style: { marginTop: 8 } }, "\u9A6C\u4E0A\u6CE8\u518C")),
            React.createElement(react_native_1.View, { style: { flex: 1 } }),
            React.createElement(react_native_1.TouchableOpacity, { style: { alignItems: "center" }, onPress: function () { return testPlay(); } },
                React.createElement(react_native_1.Image, { style: { height: 64, width: 64 }, source: { uri: "https://test10.6yc.com/views/mobileTemplate/20/images/mfsw.png" } }),
                React.createElement(react_native_1.Text, { style: { marginTop: 8 } }, "\u514D\u8D39\u8BD5\u73A9")),
            React.createElement(react_native_1.View, { style: { flex: 1 } }),
            React.createElement(react_native_1.TouchableOpacity, { style: { alignItems: "center" }, onPress: function () {
                    PushHelper_1.default.openWebView(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
                } },
                React.createElement(react_native_1.Image, { style: { height: 64, width: 64 }, source: { uri: "https://test10.6yc.com/views/mobileTemplate/20/images/dnb.png" } }),
                React.createElement(react_native_1.Text, { style: { marginTop: 8 } }, "\u7535\u8111\u7248"))),
        React.createElement(react_native_dialog_input_1.default, { isDialogVisible: GGmodalShow, title: "请输入谷歌验证码", message: "", cancelText: "取消", submitText: "確定", hintInput: "请输入谷歌验证码", submitInput: function (inputText) { return login({ account: acc, pwd: pwd, googleCode: inputText }); }, closeDialog: function () {
                setGGModalShow(false);
            } })));
};
//# sourceMappingURL=LLLoginPage.js.map