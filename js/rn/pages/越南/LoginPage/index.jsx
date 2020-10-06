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
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_elements_1 = require("react-native-elements");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_hook_form_1 = require("react-hook-form");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
var APIRouter_1 = require("../../../public/network/APIRouter");
var UGStore_1 = require("../../../redux/store/UGStore");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var useLoginIn_1 = require("../../../public/hooks/useLoginIn");
var UGSysConfModel_1 = require("../../../redux/model/\u5168\u5C40/UGSysConfModel");
var PushHelper_1 = require("../../../public/define/PushHelper");
var Navigation_1 = require("../../../public/navigation/Navigation");
var errorTimes = 0;
var VietnamLogin = function (_a) {
    var route = _a.route, navigation = _a.navigation;
    var _b = react_hook_form_1.useForm(), control = _b.control, errors = _b.errors, handleSubmit = _b.handleSubmit;
    var _c = react_1.useState(false), accountFocus = _c[0], setAccountFocus = _c[1];
    var _d = react_1.useState(false), pwdFocus = _d[0], setPwdFocus = _d[1];
    var _e = react_1.useState(false), isRemember = _e[0], setIsRemember = _e[1];
    var _f = react_1.useState(true), secureTextEntry = _f[0], setSecureTextEntry = _f[1];
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isRemember, account, pwd;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.boolForKey:', ['isRememberPsd'])];
                case 1:
                    isRemember = _a.sent();
                    setIsRemember(isRemember);
                    if (!isRemember) return [3 /*break*/, 4];
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userName'])];
                case 2:
                    account = _a.sent();
                    control.setValue("account", account);
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw'])];
                case 3:
                    pwd = _a.sent();
                    control.setValue("pwd", pwd);
                    _a.label = 4;
                case 4: return [2 /*return*/];
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
        var _a, _b;
        if (errors === null || errors === void 0 ? void 0 : errors.account) {
            OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [(_a = errors === null || errors === void 0 ? void 0 : errors.account) === null || _a === void 0 ? void 0 : _a.message]);
            return;
        }
        if (errors === null || errors === void 0 ? void 0 : errors.pwd) {
            OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [(_b = errors === null || errors === void 0 ? void 0 : errors.pwd) === null || _b === void 0 ? void 0 : _b.message]);
            return;
        }
    }, [errors]);
    var testPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, userInfo, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    return [4 /*yield*/, APIRouter_1.default.user_guestLogin()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_1 = _a.status;
                    if (!(react_native_1.Platform.OS == 'ios')) return [3 /*break*/, 10];
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay'])];
                case 2:
                    _b.sent();
                    //@ts-ignore
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data.data)])];
                case 3:
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
                    return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 9:
                    userInfo = (_b.sent()).data;
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo.data });
                    UGStore_1.UGStore.save();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 12];
                case 12:
                    RootNavigation_1.pop();
                    return [2 /*return*/];
            }
        });
    }); };
    var loginSuccessHandle = useLoginIn_1.default().loginSuccessHandle;
    var onSubmit = function (_a) {
        var account = _a.account, pwd = _a.pwd;
        return __awaiter(void 0, void 0, void 0, function () {
            var simplePwds, _b, data, status_2, error_2;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
                        if (!(simplePwds.indexOf(this.pwd) > -1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码'])];
                    case 1:
                        _d.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                                { selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController'] },
                                true,
                            ])];
                    case 2:
                        _d.sent();
                        return [2 /*return*/];
                    case 3:
                        _d.trys.push([3, 6, , 7]);
                        OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
                        return [4 /*yield*/, APIRouter_1.default.user_login(account, pwd.md5(), "")];
                    case 4:
                        _b = _d.sent(), data = _b.data, status_2 = _b.status;
                        if (data.data == null)
                            throw { message: data === null || data === void 0 ? void 0 : data.msg };
                        OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                        return [4 /*yield*/, loginSuccessHandle(data, { account: account, pwd: pwd, isRemember: isRemember })];
                    case 5:
                        _d.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _d.sent();
                        errorTimes += 1;
                        if (errorTimes >= 3) {
                            control.setValue("account", "");
                            control.setValue("pwd", "");
                        }
                        OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_c = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _c !== void 0 ? _c : '登入失败']);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return (<react_native_1.View style={{ backgroundColor: 'white', flex: 1 }}>
      <Header />
      <react_native_1.ScrollView style={{ flex: 1, paddingHorizontal: 15 }}>
        <react_native_1.View>
          <react_native_1.View style={{ flexDirection: 'column', marginTop: 30 }}>
            <react_native_1.View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
              <react_native_fast_image_1.default resizeMode={'contain'} source={{ uri: "http://test24.6yc.com/images/icon-user-24.png" }} style={{ width: 25, height: 25, }}/>
              <react_native_1.Text style={{ color: "#000000", fontSize: 19, fontWeight: "bold" }}>用户名</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={{ backgroundColor: '#e8f0fe', height: 50, borderRadius: 4, borderColor: '#34393c', borderWidth: 0, flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
              <react_hook_form_1.Controller onBlur={function () {
        setAccountFocus(false);
    }} onChange={function (args) {
        return args[0].nativeEvent.text;
    }} style={{ flex: 1, color: 'black' }} as={<react_native_1.TextInput placeholderTextColor={'#8e8e93'} onFocus={function () {
        setAccountFocus(true);
    }}/>} rules={{
        required: {
            value: true, message: "请输入用户名"
        }
    }} name="account" control={control} defaultValue="" placeholder={'帐号'}/>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={{ flexDirection: 'column', marginTop: 20, }}>
          <react_native_1.View style={{ flexDirection: 'row', marginBottom: 5, alignItems: 'center' }}>
            <react_native_fast_image_1.default resizeMode={'contain'} source={{ uri: "http://test24.6yc.com/images/icon-pwd-24.png" }} style={{ width: 25, height: 25, }}/>
            <react_native_1.Text style={{ color: "#000000", fontSize: 19, fontWeight: "bold" }}>密码</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={{ backgroundColor: '#e8f0fe', height: 50, borderRadius: 4, borderColor: '#34393c', borderWidth: 0, flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}>
            <react_hook_form_1.Controller onBlur={function () {
        setPwdFocus(false);
    }} onChange={function (args) {
        return args[0].nativeEvent.text;
    }} style={{ flex: 1, color: 'black' }} as={<react_native_1.TextInput secureTextEntry={secureTextEntry} placeholderTextColor={'#8e8e93'} onFocus={function () {
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
        borderWidth: 1, borderColor: '#298dff',
        width: 18, height: 18,
        borderRadius: 5
    }}>
                {isRemember ? (<react_native_elements_1.Icon name='check' type='foundation' color="#298dff" size={13}/>) : null}
              </react_native_1.View>
              <react_native_1.Text style={{ color: '#8e8e93', fontSize: 14, marginLeft: 3 }}>记住密码</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.TouchableWithoutFeedback>
        </react_native_1.View>
        <react_native_1.TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <react_native_1.View style={{
        flex: 1,
        height: 50, backgroundColor: "#298dff",
        borderRadius: 16,
        marginTop: 20, justifyContent: 'center', alignItems: 'center'
    }}>
            <react_native_1.Text style={{ color: "white", fontSize: 20 }}>{"登录"}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
        <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.navigate(Navigation_1.PageName.VietnamRegister, {});
    }}>
          <react_native_1.View style={{
        flex: 1,
        height: 50, borderColor: "#298dff",
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 20, justifyContent: 'center', alignItems: 'center'
    }}>
            <react_native_1.Text style={{ color: "#298dff", fontSize: 20 }}>{"注册"}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
        <react_native_1.TouchableWithoutFeedback onPress={testPlay}>
          <react_native_1.View style={{
        flex: 1,
        height: 50, borderColor: "#298dff",
        borderWidth: 1,
        borderRadius: 30,
        marginTop: 20, justifyContent: 'center', alignItems: 'center'
    }}>
            <react_native_1.Text style={{ color: "#298dff", fontSize: 20 }}>{"试玩"}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.ScrollView>
    </react_native_1.View>);
};
var Header = function () {
    var top = react_native_safe_area_context_1.useSafeArea().top;
    return (<react_native_1.View>
      <react_native_1.View style={{ height: top }}></react_native_1.View>
      <react_native_1.View style={{ height: 45, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
        <react_native_1.TouchableOpacity style={{ position: 'absolute', left: 15 }} onPress={function () {
        RootNavigation_1.pop();
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                break;
            case 'android':
                break;
        }
    }}>
          <react_native_elements_1.Icon name='ios-arrow-back' type="ionicon" color="rgba(142, 142, 147,1)" size={30}/>
        </react_native_1.TouchableOpacity>
        <react_native_1.Text style={{ color: "#000000", fontSize: 18, fontWeight: "bold" }}>{"登录"}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = VietnamLogin;
