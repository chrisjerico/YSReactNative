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
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var react_native_elements_1 = require("react-native-elements");
var react_native_webview_1 = require("react-native-webview");
var AppDefine_1 = require("../../public/define/AppDefine");
var NetworkRequest1_1 = require("../../public/network/NetworkRequest1");
var UGUserModel_1 = require("../../redux/model/\u5168\u5C40/UGUserModel");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var UGTextField_1 = require("../../public/widget/UGTextField");
var PushHelper_1 = require("../../public/define/PushHelper");
var Navigation_1 = require("../../public/navigation/Navigation");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var UGSkinManagers_1 = require("../../public/theme/UGSkinManagers");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
// 滑动验证
function SlidingVerification(props) {
    return (<react_native_1.View style={{ marginTop: 13, height: props.hidden ? 0 : 52, borderRadius: 26, overflow: 'hidden' }}>
      <react_native_webview_1.default style={{ marginLeft: -15, marginRight: -14, marginTop: -22, flex: 1 }} javaScriptEnabled startInLoadingState source={{ uri: AppDefine_1.default.host + "/dist/index.html#/swiperverify?platform=native" }} onMessage={function (e) {
        console.log('e=');
        console.log(e);
    }}/>
    </react_native_1.View>);
}
exports.XBJLoginPage = function (props) {
    var setProps = props.setProps, v = props.vars;
    react_1.useEffect(function () {
        function getLocalPwd() {
            return __awaiter(this, void 0, void 0, function () {
                var isRemember, _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            isRemember = false;
                            _a = react_native_1.Platform.OS;
                            switch (_a) {
                                case 'ios': return [3 /*break*/, 1];
                                case 'android': return [3 /*break*/, 6];
                            }
                            return [3 /*break*/, 7];
                        case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.boolForKey:', ['isRememberPsd'])];
                        case 2:
                            isRemember = _d.sent();
                            if (!isRemember) return [3 /*break*/, 5];
                            _b = v;
                            return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userName'])];
                        case 3:
                            _b.account = _d.sent();
                            _c = v;
                            return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw'])];
                        case 4:
                            _c.pwd = _d.sent();
                            _d.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6: 
                        //TODO Android
                        return [3 /*break*/, 7];
                        case 7:
                            if (props.rememberPassword == isRemember) {
                                setProps();
                            }
                            else {
                                setProps({
                                    navbarOpstions: { hidden: false, backgroundColor: 'transparent', hideUnderline: true, back: true },
                                    backgroundColor: UGSkinManagers_1.Skin1.bgColor,
                                    rememberPassword: isRemember
                                });
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        getLocalPwd();
    }, []);
    function onLoginBtnClick() {
        var _a, _b, _c, _d;
        var err;
        if (!((_b = (_a = v.account) === null || _a === void 0 ? void 0 : _a.trim()) === null || _b === void 0 ? void 0 : _b.length)) {
            err = '请输入用户名';
        }
        else if (!((_d = (_c = v.pwd) === null || _c === void 0 ? void 0 : _c.trim()) === null || _d === void 0 ? void 0 : _d.length)) {
            err = '请输入密码';
        }
        else if (v.errorTimes > 3 && !v.slideCode) {
            err = '请完成滑动验证';
        }
        if (err) {
            OCHelper_1.OCHelper.call('HUDHelper.showMsg:', [err]);
            return;
        }
        OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
        NetworkRequest1_1.default.user_login(v.account, v.pwd.md5(), v.googleCode, v.slideCode)
            .then(function (data) {
            console.log('登录成功');
            OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
            function didLogin() {
                return __awaiter(this, void 0, void 0, function () {
                    var user, sessid, simplePwds;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                            case 1:
                                user = _a.sent();
                                if (!user) return [3 /*break*/, 5];
                                console.log('退出旧账号');
                                console.log(user);
                                return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser.sessid')];
                            case 2:
                                sessid = _a.sent();
                                return [4 /*yield*/, OCHelper_1.OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }])];
                            case 3:
                                _a.sent();
                                return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:')];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5: 
                            // 保存数据
                            return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(data)])];
                            case 6:
                                // 保存数据
                                _a.sent();
                                return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [props.rememberPassword, 'isRememberPsd'])];
                            case 7:
                                _a.sent();
                                return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [props.rememberPassword ? v.account : '', 'userName'])];
                            case 8:
                                _a.sent();
                                return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [props.rememberPassword ? v.pwd : '', 'userPsw'])];
                            case 9:
                                _a.sent();
                                return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                            case 10:
                                _a.sent();
                                simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
                                if (!(simplePwds.indexOf(v.pwd) > -1)) return [3 /*break*/, 13];
                                return [4 /*yield*/, OCHelper_1.OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码'])];
                            case 11:
                                _a.sent();
                                return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                                        { selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController'] },
                                        true,
                                    ])];
                            case 12:
                                _a.sent();
                                return [3 /*break*/, 15];
                            case 13: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                            case 14:
                                _a.sent();
                                _a.label = 15;
                            case 15: return [2 /*return*/];
                        }
                    });
                });
            }
            didLogin();
        })
            .catch(function (err) {
            OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [err.message]);
            if ((v.errorTimes += 1) > 3) {
                setProps();
            }
        });
    }
    return (<react_native_1.View style={{ marginTop: AppDefine_1.default.height * 0.08 }}>
      <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/PrsPnxF/m-logo.png' }} style={{ marginLeft: AppDefine_1.default.width * 0.5 - 50, width: 100, height: 36 }}/>
      <react_native_1.View style={{ marginLeft: 24, marginTop: 56, width: AppDefine_1.default.width - 48, borderRadius: 8, overflow: 'hidden', flexDirection: 'row' }}>
        <react_native_1.View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 24 }}>
          <react_native_1.Text style={{ fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center' }}>登录</react_native_1.Text>
          <UGTextField_1.default type="账号" placeholder="请输入账号" containerStyle={{ marginTop: 24 }} defaultValue={v.account} onChangeText={function (text) {
        v.account = text;
    }}/>
          <UGTextField_1.default type="密码" defaultValue={v.pwd} onChangeText={function (text) {
        v.pwd = text;
    }}/>
          <SlidingVerification hidden={v.errorTimes < 4}/>
          <react_native_1.View style={{ marginTop: 18, flexDirection: 'row', justifyContent: 'space-between' }}>
            <react_native_gesture_handler_1.TouchableOpacity style={{ flexDirection: 'row' }} onPress={function () {
        setProps({ rememberPassword: !props.rememberPassword });
    }}>
              {props.rememberPassword ? (<react_native_elements_1.Icon name="radio-button-checked" type="materialIcon" color="rgba(0, 0, 0, 0.8)" size={16}/>) : (<react_native_elements_1.Icon name="radio-button-unchecked" type="materialIcon" color="rgba(0, 0, 0, 0.6)" size={16}/>)}
              <react_native_1.Text style={{ marginLeft: 6, color: 'white' }}>记住密码</react_native_1.Text>
            </react_native_gesture_handler_1.TouchableOpacity>
            <react_native_1.Text style={{ marginTop: -10, marginRight: -5, padding: 10, textAlign: 'right', color: 'white' }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服);
    }}>
              忘记密码
              </react_native_1.Text>
          </react_native_1.View>
          <react_native_elements_1.Button style={{ marginTop: 55 }} buttonStyle={{ borderRadius: 20, height: 40, borderWidth: 0.5, borderColor: '#B0937D' }} ViewComponent={react_native_linear_gradient_1.default} linearGradientProps={{ colors: ['#B0937D', '#997961'], start: { x: 0, y: 1 }, end: { x: 1, y: 1 } }} titleStyle={{ fontSize: 16 }} title="登录" onPress={onLoginBtnClick}/>
          <react_native_elements_1.Button title="免费试玩" buttonStyle={{ marginTop: 15, marginBottom: -5, backgroundColor: 'transparent' }} titleStyle={{ fontSize: 12 }} onPress={function () {
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
                OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
                break;
            case 'android':
                break;
        }
    }}/>
        </react_native_1.View>
        <react_native_gesture_handler_1.TouchableOpacity style={{ width: 52, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center' }} activeOpacity={1} onPress={function () {
        RootNavigation_1.navigate(Navigation_1.PageName.XBJRegisterPage);
    }}>
          <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/W2tbj1Q/entry-login-toggle-btn.png' }} style={{ marginLeft: 17, width: 20, height: 20, opacity: 0.6 }}/>
          <react_native_1.Text style={{ marginLeft: 18, marginTop: 20, width: 20, fontSize: 16, lineHeight: 30, color: 'white', opacity: 0.6 }}>注册新用户</react_native_1.Text>
        </react_native_gesture_handler_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
};
