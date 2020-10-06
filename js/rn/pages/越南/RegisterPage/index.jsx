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
var react_native_1 = require("react-native");
var react_1 = require("react");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_elements_1 = require("react-native-elements");
var react_hook_form_1 = require("react-hook-form");
var react_native_webview_1 = require("react-native-webview");
var react_native_event_listeners_1 = require("react-native-event-listeners");
var UGStore_1 = require("../../../redux/store/UGStore");
var APIRouter_1 = require("../../../public/network/APIRouter");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
var UGUserModel_1 = require("../../../redux/model/\u5168\u5C40/UGUserModel");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var Navigation_1 = require("../../../public/navigation/Navigation");
var AppDefine_1 = require("../../../public/define/AppDefine");
var react_native_fast_image_1 = require("react-native-fast-image");
var LanguageContextProvider_1 = require("../../../public/context/LanguageContextProvider");
var FormName;
(function (FormName) {
    FormName["inviter"] = "inviter";
    FormName["usr"] = "usr";
    FormName["pwd"] = "pwd";
    FormName["repwd"] = "repwd";
    FormName["account"] = "account";
    FormName["fundPwd"] = "fundPwd";
    FormName["fullName"] = "fullName";
    FormName["qq"] = "qq";
    FormName["wx"] = "wx";
    FormName["phone"] = "phone";
    FormName["smsCode"] = "smsCode";
    FormName["imgCode"] = "imgCode";
    FormName["slideCode"] = "slideCode";
    FormName["email"] = "email";
})(FormName || (FormName = {}));
var VietnamRegister = function () {
    var _a = react_hook_form_1.useForm(), control = _a.control, register = _a.register, getValues = _a.getValues, errors = _a.errors, triggerValidation = _a.triggerValidation, handleSubmit = _a.handleSubmit;
    var _b = react_1.useState("user"), regType = _b[0], setRegType = _b[1];
    var _c = react_1.useState(true), secureTextEntry = _c[0], setSecureTextEntry = _c[1];
    var _d = react_1.useState(true), repwdSecureTextEntry = _d[0], setRepwdSecureTextEntry = _d[1];
    var SystemStore = UGStore_1.UGStore.globalProps.sysConf;
    var _e = react_1.useState(""), code = _e[0], setCode = _e[1];
    var hide_reco = SystemStore.hide_reco, // 代理人 0不填，1选填，2必填
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
    smsVerify = SystemStore.smsVerify // 手机短信验证
    ;
    var onSubmit = function (requestData) { return __awaiter(void 0, void 0, void 0, function () {
        var password, fundPwd, _a, data, status_1, user, _b, loginData, status_2, sessid, UserInfo, error_1;
        var _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _j.trys.push([0, 17, , 18]);
                    password = (_c = requestData === null || requestData === void 0 ? void 0 : requestData.pwd) === null || _c === void 0 ? void 0 : _c.md5();
                    fundPwd = (_d = requestData === null || requestData === void 0 ? void 0 : requestData.fundPwd) === null || _d === void 0 ? void 0 : _d.md5();
                    requestData === null || requestData === void 0 ? true : delete requestData.repwd;
                    OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', ['正在注册...']);
                    console.log(requestData);
                    console.log('requestData.slideCode: ', requestData.slideCode);
                    if (requestData.slideCode) {
                        requestData.smsCode = "";
                        requestData.imgCode = "";
                        requestData["slideCode[nc_sid]"] = requestData.slideCode["nc_csessionid"];
                        requestData["slideCode[nc_token]"] = requestData.slideCode["nc_token"];
                        requestData["slideCode[nc_sig]"] = requestData.slideCode["nc_sig"];
                        delete requestData.slideCode;
                    }
                    return [4 /*yield*/, APIRouter_1.default.user_reg(__assign(__assign({}, requestData), { pwd: password, regType: regType, fundPwd: fundPwd }))];
                case 1:
                    _a = _j.sent(), data = _a.data, status_1 = _a.status;
                    reRenderCode();
                    if ((data === null || data === void 0 ? void 0 : data.data) == null)
                        throw { message: data === null || data === void 0 ? void 0 : data.msg };
                    if (!((_e = data === null || data === void 0 ? void 0 : data.data) === null || _e === void 0 ? void 0 : _e.autoLogin)) return [3 /*break*/, 16];
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                case 2:
                    user = _j.sent();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["注册成功"]);
                    return [4 /*yield*/, APIRouter_1.default.user_login(data.data.usr, password)];
                case 3:
                    _b = _j.sent(), loginData = _b.data, status_2 = _b.status;
                    if (!user) return [3 /*break*/, 7];
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser.sessid')];
                case 4:
                    sessid = _j.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }])];
                case 5:
                    _j.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:')];
                case 6:
                    _j.sent();
                    UGStore_1.UGStore.dispatch({ type: 'reset', userInfo: {} });
                    _j.label = 7;
                case 7: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(loginData === null || loginData === void 0 ? void 0 : loginData.data)])];
                case 8:
                    _j.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd'])];
                case 9:
                    _j.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [requestData[FormName.usr], 'userName'])];
                case 10:
                    _j.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [requestData[FormName.pwd], 'userPsw'])];
                case 11:
                    _j.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                case 12:
                    _j.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                case 13:
                    _j.sent();
                    return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 14:
                    UserInfo = (_j.sent()).data;
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [__assign(__assign({}, UserInfo.data), UGUserModel_1.default.getYS(loginData === null || loginData === void 0 ? void 0 : loginData.data))])];
                case 15:
                    _j.sent();
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: UserInfo === null || UserInfo === void 0 ? void 0 : UserInfo.data });
                    UGStore_1.UGStore.save();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
                    RootNavigation_1.popToRoot();
                    _j.label = 16;
                case 16:
                    if (((_f = data === null || data === void 0 ? void 0 : data.data) === null || _f === void 0 ? void 0 : _f.autoLogin) == false) {
                        OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [(_g = data.msg) !== null && _g !== void 0 ? _g : ""]);
                        RootNavigation_1.popToRoot();
                        RootNavigation_1.navigate(Navigation_1.PageName.ZLLoginPage, { usr: requestData[FormName.usr], pwd: requestData[FormName.pwd] });
                    }
                    return [3 /*break*/, 18];
                case 17:
                    error_1 = _j.sent();
                    react_native_event_listeners_1.EventRegister.emit('reload');
                    reRenderCode();
                    if (error_1.message.includes("推荐人")) {
                        react_native_1.Alert.alert(error_1 === null || error_1 === void 0 ? void 0 : error_1.message, "");
                        OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [""]);
                    }
                    else {
                        OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_h = error_1 === null || error_1 === void 0 ? void 0 : error_1.message) !== null && _h !== void 0 ? _h : '']);
                    }
                    return [3 /*break*/, 18];
                case 18: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (reg_vcode == 1) {
            reRenderCode();
        }
    }, [reg_vcode]);
    var reRenderCode = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_3, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.secure_imgCaptcha()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_3 = _a.status;
                    setCode(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var SlidingVerification = function (_a) {
        var onChange = _a.onChange;
        var webViewScript = "setTimeout(function() { \n            document.getElementById('app').style.background = 'white'\n            window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight); \n          }, 500);\n          true;";
        var _b = react_1.useState(0), webviewHeight = _b[0], setWebViewHeight = _b[1];
        var hadnleMessage = function (e) {
            var _a;
            // if (typeof e?.nativeEvent?.data == 'string') {
            //   setWebViewHeight(parseInt(e?.nativeEvent?.data) * 1.5)
            // } else {
            //   console.log("response" + JSON.stringify(e.nativeEvent.data))
            //   onChange(e?.nativeEvent?.data)
            // }
            var eData = (_a = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _a === void 0 ? void 0 : _a.data;
            console.log("sliding response: " + eData);
            if ((eData === null || eData === void 0 ? void 0 : eData.startsWith('{')) && (eData === null || eData === void 0 ? void 0 : eData.endsWith('}'))) {
                onChange(JSON.parse(eData));
            }
            else if (typeof eData == 'string') {
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
            return (function () { return listener ? react_native_event_listeners_1.EventRegister.removeEventListener(listener) : null; });
        }, []);
        return (<react_native_webview_1.default ref={webViewRef} style={{ flex: 1, minHeight: webviewHeight, backgroundColor: 'white' }} containerStyle={{ backgroundColor: 'white' }} javaScriptEnabled injectedJavaScript={webViewScript} source={{ uri: AppDefine_1.default.host + "/dist/index.html#/swiperverify?platform=native" }} onMessage={hadnleMessage}/>);
    };
    var getVcode = react_1.useMemo(function () {
        if (reg_vcode == 0) {
            return null;
        }
        else if (reg_vcode == 3 || reg_vcode == 1) {
            return <LetterVerificationCode reg_vcode={reg_vcode} onPress={reRenderCode} control={control} code={code}/>;
        }
        else {
            return <react_hook_form_1.Controller control={control} onChange={function (args) {
                return args[0];
            }} as={SlidingVerification} name={"slideCode"}/>;
        }
    }, [reg_vcode, code]);
    react_1.useEffect(function () {
        console.log(errors);
        Object.keys(errors).map(function (res) {
            var _a;
            OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_a = errors === null || errors === void 0 ? void 0 : errors[res]) === null || _a === void 0 ? void 0 : _a.message]);
            return;
        });
    }, [errors]);
    var currcentLanguagePackage = LanguageContextProvider_1.useLanguageContext().currcentLanguagePackage;
    return (<react_native_1.View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <react_native_1.ScrollView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 10 }}>
        
        <react_native_1.Text style={{ textAlign: 'left', color: '#3c3c3c', fontSize: 14, marginTop: 15, marginBottom: 10, marginLeft: 15 }}>{currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.for.safety.your.funds"]}!</react_native_1.Text>
        <ZLRegInput tip={"请输入推荐人ID"} iconImage={"http://test24.6yc.com/images/icon-reco-24.png"} iconName={"user"} message={currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.please.enter.referrerid"]} placeholder={currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.please.enter.referrerid"]} regConfig={hide_reco} control={control} name={FormName.inviter}/>
        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: 'white', borderRadius: 4, borderBottomColor: '#f2f2f2', borderBottomWidth: 1, marginBottom: 10, marginHorizontal: 10 }}>
          <react_native_1.View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
            <react_native_fast_image_1.default style={{ width: 24, height: 24 }} source={{ uri: "http://test24.6yc.com/images/icon-user-24.png" }}/>
          </react_native_1.View>
          <react_hook_form_1.Controller maxLength={15} onChange={function (args) {
        return args[0].nativeEvent.text;
    }} style={{ flex: 1 }} placeholderTextColor={'#3c3c3c'} as={react_native_1.TextInput} rules={{
        required: {
            value: true, message: "请输入"
        },
        maxLength: {
            value: 15,
            message: "6-1" + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.english.or.numbers"])
        },
        minLength: {
            value: 6,
            message: "6-1" + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.english.or.numbers"])
        },
    }} name={FormName.usr} control={control} defaultValue="" placeholder={'帐号'}/>
        </react_native_1.View>
        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: 'white', borderRadius: 4, marginBottom: 10, borderBottomWidth: 1, marginHorizontal: 10, borderBottomColor: '#f2f2f2', }}>
          <react_native_1.View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
            <react_native_fast_image_1.default style={{ width: 24, height: 24 }} source={{ uri: "http://test24.6yc.com/images/icon-pwd-24.png" }}/>
          </react_native_1.View>
          <react_hook_form_1.Controller maxLength={15} placeholderTextColor={'#3c3c3c'} onChange={function (args) {
        return args[0].nativeEvent.text;
    }} style={{ flex: 1 }} as={react_native_1.TextInput} secureTextEntry={secureTextEntry} rules={{
        required: {
            value: true, message: currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.input.new.pwd"]
        },
        maxLength: {
            value: pass_length_max,
            message: (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.most"]) + pass_length_max + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.english.or.numbers"])
        },
        minLength: {
            value: pass_length_min,
            message: (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.least"]) + pass_length_min + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.english.or.numbers"])
        },
        validate: function (value) {
            console.log(pass_limit);
            if (pass_limit == 0) {
                return true;
            }
            else if (pass_limit == 1) {
                var regex = /^(?=.*\d)(?=.*[a-zA-Z])/;
                return regex.test(value) || '密码须有数字及字母';
            }
            else if (pass_limit == 2) {
                var regex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/;
                return regex.test(value) || '密码须有数字及字母及字符';
            }
        }
    }} name={FormName.pwd} control={control} defaultValue="" placeholder={pass_length_min + '-' + pass_length_max + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.english.or.numbers"])}/>
          <react_native_1.TouchableOpacity style={{}} onPress={function () {
        setSecureTextEntry(function (secureTextEntry) { return !secureTextEntry; });
    }}>
            <react_native_elements_1.Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"#444"} containerStyle={{ marginLeft: 15, marginRight: 4 }}/>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', height: 50, backgroundColor: 'white', borderRadius: 4, marginBottom: 10, borderBottomWidth: 1, marginHorizontal: 10, borderBottomColor: '#f2f2f2', }}>
          <react_native_1.View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
            <react_native_fast_image_1.default style={{ width: 24, height: 24 }} source={{ uri: "http://test24.6yc.com/images/icon-pwd-24.png" }}/>
          </react_native_1.View>
          <react_hook_form_1.Controller secureTextEntry={repwdSecureTextEntry} placeholderTextColor={'#3c3c3c'} onChange={function (args) {
        triggerValidation(FormName.repwd);
        return args[0].nativeEvent.text;
    }} style={{ flex: 1 }} as={react_native_1.TextInput} maxLength={15} rules={{
        required: {
            value: true,
            message: currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.password.incorrect.reenter"]
        },
        validate: function (value) {
            var passwordValue = getValues("pwd");
            return value === passwordValue || (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.password.incorrect.reenter"]);
        }
    }} onBlur={function () {
        triggerValidation("repwd");
    }} name={FormName.repwd} control={control} defaultValue="" placeholder={"匹配密码"}/>
          <react_native_1.TouchableOpacity style={{}} onPress={function () {
        setRepwdSecureTextEntry(function (secureTextEntry) { return !secureTextEntry; });
    }}>
            <react_native_elements_1.Icon name={repwdSecureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"#444"} containerStyle={{ marginLeft: 15, marginRight: 4 }}/>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
        <ZLRegInput tip={"必须与您的银行帐户名称相同，否则不能出款!"} iconImage={"http://test24.6yc.com/images/icon-user-24.png"} iconName={"user"} message={"请输入账号"} placeholder={"请输入账号"} regConfig={reg_name} control={control} name={FormName.fullName}/>
        
        <ZLRegInput tip={"请先设置取款密码"} iconName={"lock"} iconImage={"http://test24.6yc.com/images/icon-pwd-24.png"} isPassword={true} message={"请先设置取款密码"} placeholder={"请先设置取款密码"} regConfig={reg_fundpwd} control={control} name={FormName.fundPwd}/>
        <ZLRegInput tip={"请填写正确的QQ号"} iconName={"qq"} iconImage={"http://test24.6yc.com/images/icon-qq-24.png"} message={"请填写正确的QQ号"} placeholder={"请填写正确的QQ号"} regConfig={reg_qq} control={control} name={FormName.qq}/>
        <ZLRegInput tip={(currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.please.enter"]) + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.wechat"])} iconName={"wechat"} iconImage={"http://test24.6yc.com/images/icon-wx-24.png"} message={(currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.please.enter"]) + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.wechat"])} placeholder={(currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.please.enter"]) + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.wechat"])} regConfig={reg_wx} control={control} name={FormName.wx}/>
        <ZLRegInput iconType={"octicon"} iconName={"device-mobile"} iconImage={"http://test24.6yc.com/images/icon-phone-24.png"} message={(currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.please.enter"]) + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.wechat"])} placeholder={(currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.please.enter"]) + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.phone.number"])} regConfig={reg_phone} control={control} name={FormName.phone}/>
        <ZLRegInput iconType={"octicon"} iconName={"device-mobile"} iconImage={"http://test24.6yc.com/images/icon-pwd-24.png"} message={currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.sms.verification.code"]} placeholder={currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.sms.verification.code"]} regConfig={smsVerify} control={control} name={FormName.smsCode}/>
        <ZLRegInput iconName={"mail"} iconType={'entypo'} iconImage={"http://test24.6yc.com/images/icon-email-24.png"} message={currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.input.your.email"]} placeholder={currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.input.your.email"]} regConfig={reg_email} control={control} name={FormName.email}/>
        {getVcode}

        {agentRegbutton == "1" ? <react_native_1.View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <react_native_1.TouchableOpacity onPress={function () {
        setRegType('user');
    }} style={{ backgroundColor: regType == 'user' ? 'blue' : '#3c3c3c', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 4 }}>
            <react_native_1.Text style={{ color: 'white' }}>普通用户</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity onPress={function () {
        setRegType('agent');
    }} style={{ backgroundColor: regType == 'agent' ? 'blue' : '#3c3c3c', justifyContent: 'center', alignItems: 'center', padding: 5, borderRadius: 4 }}>
            <react_native_1.Text style={{ color: 'white' }}>注册代理</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View> : null}


        <react_native_gesture_handler_1.TouchableWithoutFeedback onPress={handleSubmit(onSubmit)}>
          <react_native_1.View style={{
        flex: 1,
        height: 50, backgroundColor: "#298dff",
        borderRadius: 8,
        marginTop: 20, justifyContent: 'center', alignItems: 'center',
        marginHorizontal: 20
    }}>
            <react_native_1.Text style={{ color: "white", fontSize: 20 }}>{currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.registered"]}</react_native_1.Text>
          </react_native_1.View>
        </react_native_gesture_handler_1.TouchableWithoutFeedback>
        <react_native_gesture_handler_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.VietnamLogin);
    }}>
          <react_native_1.View style={{
        flex: 1,
        height: 40, borderColor: "#298dff",
        borderWidth: 1,
        borderRadius: 16,
        marginTop: 20, justifyContent: 'center', alignItems: 'center',
        marginHorizontal: 20
    }}>
            <react_native_1.Text style={{ color: "#298dff", fontSize: 15 }}>{currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.log.in"]}</react_native_1.Text>
          </react_native_1.View>
        </react_native_gesture_handler_1.TouchableWithoutFeedback>
        <react_native_1.View style={{ height: 100 }}></react_native_1.View>
      </react_native_1.ScrollView>
    </react_native_1.View>);
};
var Header = function () {
    var top = react_native_safe_area_context_1.useSafeArea().top;
    return (<react_native_1.View>
      <react_native_1.View style={{ height: top }}></react_native_1.View>
      <react_native_1.View style={{ height: 68, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
        <react_native_1.TouchableOpacity style={{ position: 'absolute', left: 20 }} onPress={function () {
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
        <react_native_1.Text style={{ fontSize: 20, fontWeight: "bold", }}>{"注册"}</react_native_1.Text>
        <react_native_1.TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={function () {
        RootNavigation_1.navigate(Navigation_1.PageName.VietnamHome, {});
    }}>
          <react_native_1.Text style={{ color: "#4290ff", fontSize: 15, fontWeight: "bold" }}>{"返回首页"}</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
};
var ZLRegInput = function (_a) {
    var regConfig = _a.regConfig, name = _a.name, control = _a.control, placeholder = _a.placeholder, _b = _a.message, message = _b === void 0 ? "" : _b, isPassword = _a.isPassword, _c = _a.iconType, iconType = _c === void 0 ? "font-awesome" : _c, _d = _a.iconName, iconName = _d === void 0 ? "" : _d, _e = _a.tip, tip = _e === void 0 ? "" : _e, iconImage = _a.iconImage;
    var _f;
    var _g = react_1.useState(true), secureTextEntry = _g[0], setSecureTextEntry = _g[1];
    var currcentLanguagePackage = LanguageContextProvider_1.useLanguageContext().currcentLanguagePackage;
    var requestSms = function () { return __awaiter(void 0, void 0, void 0, function () {
        var phone, _a, data, status_4, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    phone = control.getValues(FormName.phone);
                    return [4 /*yield*/, APIRouter_1.default.secure_smsCaptcha(phone)];
                case 1:
                    _a = _b.sent(), data = _a.data, status_4 = _a.status;
                    if ((data === null || data === void 0 ? void 0 : data.code) != 0) {
                        throw { message: data.msg };
                    }
                    else {
                        OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data === null || data === void 0 ? void 0 : data.msg]);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error_3.message]);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    if (regConfig == 0 || regConfig == "0" || regConfig == false) {
        return null;
    }
    else {
        return <react_native_1.View style={{ flexDirection: 'column', paddingHorizontal: 10 }}>
      <react_native_1.View style={{
            flexDirection: 'row', alignItems: 'center', height: 50,
            backgroundColor: 'white', borderRadius: 4, borderColor: 'white', borderWidth: 1, marginBottom: 5,
            borderBottomColor: "#f2f2f2", borderBottomWidth: 1
        }}>
        <react_native_1.View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
          {iconImage ? <react_native_fast_image_1.default style={{ width: 24, height: 24 }} source={{ uri: iconImage }}/> : <react_native_elements_1.Icon name={iconName} type={iconType} color="#3c3c3c" size={24}/>}

        </react_native_1.View>
        <react_hook_form_1.Controller placeholderTextColor={'#3c3c3c'} onChange={function (args) {
            return args[0].nativeEvent.text;
        }} secureTextEntry={isPassword ? secureTextEntry : false} style={{ flex: 1 }} as={react_native_1.TextInput} rules={{
            required: {
                value: regConfig == 2 || regConfig == '2', message: message
            }
        }} name={name} control={control} defaultValue="" placeholder={placeholder + (regConfig == 1 || regConfig == '1' ? "(" + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.options"]) + ")" : "")}/>
        {name == FormName.smsCode ? <react_native_1.TouchableOpacity onPress={requestSms}>
          <react_native_1.Text>{"获取验证码"}</react_native_1.Text>
        </react_native_1.TouchableOpacity> : null}
        {isPassword ? <react_native_1.TouchableOpacity style={{}} onPress={function () {
            setSecureTextEntry(function (secureTextEntry) { return !secureTextEntry; });
        }}>
          <react_native_elements_1.Icon name={secureTextEntry ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"#444"} containerStyle={{ marginLeft: 15, marginRight: 4 }}/>
        </react_native_1.TouchableOpacity> : null}

      </react_native_1.View>
      <react_native_1.Text style={{ color: "#000000", fontSize: 12, marginLeft: 10 }}>{(_f = ((regConfig == 1 || regConfig == '1') && tip != "" ? "*" : "") + tip) !== null && _f !== void 0 ? _f : ""}</react_native_1.Text>
    </react_native_1.View>;
    }
};
var LetterVerificationCode = function (_a) {
    var control = _a.control, code = _a.code, onPress = _a.onPress, reg_vcode = _a.reg_vcode;
    var _b = react_1.useState(reg_vcode == 1 ? false : true), hide = _b[0], setHide = _b[1];
    var currcentLanguagePackage = LanguageContextProvider_1.useLanguageContext().currcentLanguagePackage;
    return (<react_native_1.View style={{
        flexDirection: 'row', alignItems: 'center', height: 50,
        backgroundColor: 'white', borderRadius: 4, borderColor: 'white', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10
    }}>
      <react_native_1.View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
        <react_native_elements_1.Icon name={"Safety"} type={"antdesign"} color="#3c3c3c" size={24}/>
      </react_native_1.View>
      <react_hook_form_1.Controller placeholderTextColor={'#3c3c3c'} onChange={function (args) {
        return args[0].nativeEvent.text;
    }} secureTextEntry={false} style={{ flex: 1 }} as={react_native_1.TextInput} rules={{
        required: {
            value: true, message: (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.please.enter"]) + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.captcha"])
        }
    }} name={FormName.imgCode} control={control} defaultValue="" placeholder={(currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.please.enter"]) + (currcentLanguagePackage === null || currcentLanguagePackage === void 0 ? void 0 : currcentLanguagePackage["app.captcha"])}/>
      {!hide ? <react_native_gesture_handler_1.TouchableWithoutFeedback onPress={onPress}>
        <react_native_1.Image resizeMode={'contain'} style={{ height: "100%", aspectRatio: 2 }} source={{ uri: code }}/>
      </react_native_gesture_handler_1.TouchableWithoutFeedback> : <react_native_gesture_handler_1.TouchableWithoutFeedback onPress={function () {
        setHide(false);
        onPress();
    }}>
          <react_native_1.Text>{"获取验证码"}</react_native_1.Text>
        </react_native_gesture_handler_1.TouchableWithoutFeedback>}

    </react_native_1.View>);
};
exports.default = VietnamRegister;
