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
var react_1 = require("react");
var react_native_1 = require("react-native");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var react_native_fast_image_1 = require("react-native-fast-image");
var PushHelper_1 = require("../../public/define/PushHelper");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var Navigation_1 = require("../../public/navigation/Navigation");
var react_native_elements_1 = require("react-native-elements");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_hook_form_1 = require("react-hook-form");
var APIRouter_1 = require("../../public/network/APIRouter");
var useLoginIn_1 = require("../../public/hooks/useLoginIn");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var UGUserModel_1 = require("../../redux/model/\u5168\u5C40/UGUserModel");
var UGStore_1 = require("../../redux/store/UGStore");
var react_native_dialog_input_1 = require("react-native-dialog-input");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var ToastUtils_1 = require("../../public/tools/ToastUtils");
var UgLog_1 = require("../../public/tools/UgLog");
var UGLoadingCP_1 = require("../../public/widget/UGLoadingCP");
var DataDefine_1 = require("../../public/define/ANHelper/hp/DataDefine");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
var errorTimes = 0;
var ZLLoginPage = function (_a) {
    var route = _a.route, navigation = _a.navigation;
    var _b = react_hook_form_1.useForm(), control = _b.control, errors = _b.errors, handleSubmit = _b.handleSubmit;
    var _c = react_1.useState(false), accountFocus = _c[0], setAccountFocus = _c[1];
    var _d = react_1.useState(false), pwdFocus = _d[0], setPwdFocus = _d[1];
    var _e = react_1.useState(false), isRemember = _e[0], setIsRemember = _e[1];
    var _f = react_1.useState(true), secureTextEntry = _f[0], setSecureTextEntry = _f[1];
    var _g = react_1.useState(false), GGmodalShow = _g[0], setGGModalShow = _g[1];
    var isTest = UGStore_1.UGStore.globalProps.userInfo.isTest;
    var userData = UGStore_1.UGStore.globalProps.userInfo;
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, isRemember_1, account, pwd, result, loginInfo;
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
                    control.setValue("account", account);
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw'])];
                case 4:
                    pwd = _b.sent();
                    control.setValue("pwd", pwd);
                    _b.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LOAD_DATA, { key: DataDefine_1.NA_DATA.LOGIN_INFO })];
                case 7:
                    result = _b.sent();
                    loginInfo = JSON.parse(result);
                    setIsRemember(loginInfo === null || loginInfo === void 0 ? void 0 : loginInfo.isRemember);
                    if (loginInfo === null || loginInfo === void 0 ? void 0 : loginInfo.isRemember) {
                        control.setValue("account", loginInfo === null || loginInfo === void 0 ? void 0 : loginInfo.account);
                        control.setValue("pwd", loginInfo === null || loginInfo === void 0 ? void 0 : loginInfo.pwd);
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
            control.setValue("account", (_c = route === null || route === void 0 ? void 0 : route.params) === null || _c === void 0 ? void 0 : _c.usr);
            control.setValue("pwd", (_d = route === null || route === void 0 ? void 0 : route.params) === null || _d === void 0 ? void 0 : _d.pwd);
        }
    }, []);
    react_1.useEffect(function () {
        var _a, _b, _c, _d, _e;
        switch (react_native_1.Platform.OS) {
            case "ios":
                if (errors === null || errors === void 0 ? void 0 : errors.account) {
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [(_a = errors === null || errors === void 0 ? void 0 : errors.account) === null || _a === void 0 ? void 0 : _a.message]);
                    return;
                }
                if (errors === null || errors === void 0 ? void 0 : errors.pwd) {
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [(_b = errors === null || errors === void 0 ? void 0 : errors.pwd) === null || _b === void 0 ? void 0 : _b.message]);
                    return;
                }
                break;
            case "android":
                ToastUtils_1.Toast((_d = (_c = errors === null || errors === void 0 ? void 0 : errors.account) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : (_e = errors === null || errors === void 0 ? void 0 : errors.pwd) === null || _e === void 0 ? void 0 : _e.message);
                break;
        }
    }, [errors]);
    var testPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, _b, userInfo, _c, error_1;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 17, , 18]);
                    UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading });
                    return [4 /*yield*/, APIRouter_1.default.user_guestLogin()];
                case 1:
                    _a = _d.sent(), data = _a.data, status_1 = _a.status;
                    UgLog_1.ugLog("data=", data, status_1);
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
                    _c = react_native_1.Platform.OS;
                    switch (_c) {
                        case "android": return [3 /*break*/, 14];
                    }
                    return [3 /*break*/, 16];
                case 14: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.SAVE_DATA, __assign({ key: DataDefine_1.NA_DATA.USER_INFO }, userInfo === null || userInfo === void 0 ? void 0 : userInfo.data))];
                case 15:
                    _d.sent();
                    return [3 /*break*/, 16];
                case 16:
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data });
                    UGStore_1.UGStore.save();
                    ToastUtils_1.Toast('登录成功！');
                    // switch (Platform.OS) {
                    //     case "ios":
                    //         OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                    //         break;
                    //     case "android":
                    //         Toast('登录成功！')
                    //         break;
                    // }
                    RootNavigation_1.pop();
                    return [3 /*break*/, 18];
                case 17:
                    error_1 = _d.sent();
                    console.log(error_1);
                    return [3 /*break*/, 18];
                case 18:
                    UGLoadingCP_1.hideLoading();
                    return [2 /*return*/];
            }
        });
    }); };
    var loginSuccessHandle = useLoginIn_1.default().loginSuccessHandle;
    var onSubmit = function (_a) {
        var account = _a.account, pwd = _a.pwd, _b = _a.googleCode, googleCode = _b === void 0 ? "" : _b, slideCode = _a.slideCode;
        return __awaiter(void 0, void 0, void 0, function () {
            var simplePwds, _c, _d, data, status_2, error_2;
            var _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
                        if (!(simplePwds.indexOf(pwd) > -1)) return [3 /*break*/, 6];
                        _c = react_native_1.Platform.OS;
                        switch (_c) {
                            case "ios": return [3 /*break*/, 1];
                            case "android": return [3 /*break*/, 4];
                        }
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码'])];
                    case 2:
                        _h.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                                { selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController'] },
                                true,
                            ])];
                    case 3:
                        _h.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        ToastUtils_1.Toast('你的密码过于简单，可能存在风险，请把密码修改成复杂密码');
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                    case 6:
                        _h.trys.push([6, 9, , 10]);
                        // switch (Platform.OS) {
                        //     case "ios":
                        //         OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
                        //         break;
                        //     case "android":
                        //         Toast('正在登录...')
                        //         break;
                        //
                        // }
                        UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading, text: '正在登录...' });
                        return [4 /*yield*/, APIRouter_1.default.user_login(account, pwd.md5(), googleCode, slideCode)];
                    case 7:
                        _d = _h.sent(), data = _d.data, status_2 = _d.status;
                        if (data.data == null)
                            throw { message: data === null || data === void 0 ? void 0 : data.msg };
                        if (((_e = data.data) === null || _e === void 0 ? void 0 : _e.ggCheck) == true) {
                            switch (react_native_1.Platform.OS) {
                                case "ios":
                                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['请输入谷歌验证码']);
                                    break;
                                case "android":
                                    ToastUtils_1.Toast('请输入谷歌验证码');
                                    break;
                            }
                            setGGModalShow(true);
                            return [2 /*return*/];
                            // Alert.alert("")
                        }
                        switch (react_native_1.Platform.OS) {
                            case "ios":
                                OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                                break;
                            case "android":
                                ToastUtils_1.Toast('登录成功！');
                                break;
                        }
                        setGGModalShow(false);
                        return [4 /*yield*/, loginSuccessHandle(data, { account: account, pwd: pwd, isRemember: isRemember })];
                    case 8:
                        _h.sent();
                        return [3 /*break*/, 10];
                    case 9:
                        error_2 = _h.sent();
                        errorTimes += 1;
                        if (errorTimes >= 3) {
                            control.setValue("account", "");
                            control.setValue("pwd", "");
                            setGGModalShow(false);
                        }
                        switch (react_native_1.Platform.OS) {
                            case "ios":
                                OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_f = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _f !== void 0 ? _f : '登入失败']);
                                break;
                            case "android":
                                ToastUtils_1.Toast((_g = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _g !== void 0 ? _g : '登入失败');
                                break;
                        }
                        return [3 /*break*/, 10];
                    case 10:
                        UGLoadingCP_1.hideLoading();
                        return [2 /*return*/];
                }
            });
        });
    };
    return (<react_native_1.View style={{ backgroundColor: '#1a1a1e', flex: 1 }}>
            <Header />
            <react_native_1.ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
                <react_native_1.Text style={{ textAlign: 'center', color: 'white', fontSize: 20, marginTop: 10, marginBottom: 20, fontWeight: "bold" }}>账号登录</react_native_1.Text>
                <react_native_1.View style={{ backgroundColor: accountFocus ? "white" : '#34393c', height: 50, borderRadius: 4, borderColor: '#34393c', borderWidth: 0, flexDirection: 'row', alignItems: 'center' }}>
                    <react_native_fast_image_1.default style={{ width: 14, height: 15, marginHorizontal: 15 }} tintColor={accountFocus ? 'black' : 'white'} source={{ uri: "http://test10.6yc.com/images/icon-user.png" }}></react_native_fast_image_1.default>
                    <react_native_1.View style={{ height: '40%', width: 1, backgroundColor: accountFocus ? '#8e8e93' : "white", marginRight: 5 }}></react_native_1.View>
                    <react_hook_form_1.Controller onBlur={function () {
        setAccountFocus(false);
    }} onChange={function (args) {
        return args[0].nativeEvent.text;
    }} style={{ flex: 1, color: !accountFocus ? 'white' : 'black' }} as={<react_native_1.TextInput placeholderTextColor={accountFocus ? '#8e8e93' : "white"} onFocus={function () {
        setAccountFocus(true);
    }}/>} rules={{
        required: {
            value: true,
            message: "请输入用户名"
        }
    }} name="account" control={control} defaultValue="" placeholder={'帐号'}/>
                </react_native_1.View>
                <react_native_1.View style={{ backgroundColor: pwdFocus ? "white" : '#34393c', height: 50, marginTop: 20, borderRadius: 4, borderColor: '#34393c', borderWidth: 0, flexDirection: 'row', alignItems: 'center' }}>
                    <react_native_fast_image_1.default style={{ width: 14, height: 15, marginHorizontal: 15 }} tintColor={pwdFocus ? 'black' : 'white'} source={{ uri: "http://test10.6yc.com/images/icon-pwd.png" }}></react_native_fast_image_1.default>
                    <react_native_1.View style={{ height: '40%', width: 1, backgroundColor: pwdFocus ? '#8e8e93' : "white", marginRight: 5 }}></react_native_1.View>
                    <react_hook_form_1.Controller onBlur={function () {
        setPwdFocus(false);
    }} onChange={function (args) {
        return args[0].nativeEvent.text;
    }} style={{ flex: 1, color: !pwdFocus ? 'white' : 'black' }} as={<react_native_1.TextInput secureTextEntry={secureTextEntry} placeholderTextColor={pwdFocus ? '#8e8e93' : "white"} onFocus={function () {
        setPwdFocus(true);
    }}/>} name="pwd" rules={{
        required: {
            value: true, message: "请输入密码"
        }
    }} control={control} defaultValue="" placeholder={'密码'}/>
                    <react_native_1.TouchableOpacity style={{ marginRight: 20 }} onPress={function () {
        setSecureTextEntry(function (secureTextEntry) { return !secureTextEntry; });
    }}>
                        <react_native_elements_1.Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={pwdFocus ? "#8e8e93" : "rgba(255, 255, 255, 0.3)"} containerStyle={{ marginLeft: 15, marginRight: 4 }}/>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>

                <react_native_1.View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <react_native_1.Text onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服);
    }} style={{ color: '#8e8e93', fontSize: 14 }}>忘记密码?</react_native_1.Text>
                    <react_native_1.TouchableWithoutFeedback onPress={function () {
        setIsRemember(function (isRemember) { return !isRemember; });
    }}>
                        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <react_native_1.View style={{
        borderWidth: 1, borderColor: 'white',
        width: 18, height: 18,
        borderRadius: 5
    }}>
                                {isRemember ? (<react_native_elements_1.Icon name='check' type='foundation' color="white" size={13}/>) : null}
                            </react_native_1.View>
                            <react_native_1.Text style={{ color: '#8e8e93', fontSize: 14, marginLeft: 3 }}>记住密码</react_native_1.Text>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>
                <react_native_1.TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
                    <react_native_1.View style={{
        flex: 1,
        height: 50, backgroundColor: "#b67866",
        borderRadius: 8,
        marginTop: 20, justifyContent: 'center', alignItems: 'center'
    }}>
                        <react_native_1.Text style={{ color: "white", fontSize: 20 }}>登录</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.TouchableWithoutFeedback>
                <react_native_1.TouchableWithoutFeedback onPress={testPlay}>
                    <react_native_1.View style={{
        flex: 1,
        height: 50, backgroundColor: "#a09e9d",
        borderRadius: 8,
        marginTop: 20, justifyContent: 'center', alignItems: 'center'
    }}>
                        <react_native_1.Text style={{ color: "white", fontSize: 20 }}>免费试玩</react_native_1.Text>
                    </react_native_1.View>
                </react_native_1.TouchableWithoutFeedback>
            </react_native_1.ScrollView>
            <react_native_dialog_input_1.default isDialogVisible={GGmodalShow} title={"请输入谷歌验证码"} message={""} cancelText={"取消"} submitText={"確定"} hintInput={"请输入谷歌验证码"} submitInput={function (inputText) { return onSubmit({ account: control.getValues("account"), pwd: control.getValues("pwd"), googleCode: inputText }); }} closeDialog={function () { setGGModalShow(false); }}>
            </react_native_dialog_input_1.default>
        </react_native_1.View>);
};
var Header = function () {
    var top = react_native_safe_area_context_1.useSafeArea().top;
    return (<react_native_1.View style={{ height: 68 + top, paddingTop: top, backgroundColor: "#1a1a1e", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15 }}>
            <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.pop();
        switch (react_native_1.Platform.OS) {
            case "ios":
                OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                break;
        }
    }}>
                <react_native_elements_1.Icon name="close" type="materialIcon" color="rgba(142, 142, 147,1)" size={30}/>
            </react_native_1.TouchableWithoutFeedback>
            <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.ZLRegisterPage);
    }}>
                <react_native_1.Text style={{ color: "#68abf9", fontSize: 18, fontWeight: "bold" }}>注册</react_native_1.Text>
            </react_native_1.TouchableWithoutFeedback>
        </react_native_1.View>);
};
exports.default = ZLLoginPage;
