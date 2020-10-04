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
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var React = require("react");
var react_1 = require("react");
var UGStore_1 = require("../../redux/store/UGStore");
var Navigation_1 = require("../../public/navigation/Navigation");
var RegisterItem_1 = require("./component/registerPage/RegisterItem");
// @ts-ignore
var blueimp_md5_1 = require("blueimp-md5");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var APIRouter_1 = require("../../public/network/APIRouter");
var UGUserModel_1 = require("../../redux/model/\u5168\u5C40/UGUserModel");
var react_native_event_listeners_1 = require("react-native-event-listeners");
var LCRegisterPage = function (_a) {
    var navigation = _a.navigation, setProps = _a.setProps;
    var _b = react_1.useState("user"), regType = _b[0], setRegType = _b[1];
    var _c = react_1.useState({ acc: "", pwd: "", confirmPwd: "" }), data = _c[0], setData = _c[1];
    var SystemStore = UGStore_1.UGStore.globalProps.sysConf;
    var regex = RegExp("^[A-Za-z0-9]{6,15}$");
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
    smsVerify = SystemStore.smsVerify, // 手机短信验证,
    allowreg = SystemStore.allowreg, closeregreason = SystemStore.closeregreason;
    var onSubmit = function (registerData) { return __awaiter(void 0, void 0, void 0, function () {
        var password, _a, data_1, status_1, user, _b, loginData, status_2, sessid, UserInfo, error_1;
        var _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 18, , 19]);
                    password = blueimp_md5_1.default(registerData.pwd);
                    OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', ['正在注册...']);
                    return [4 /*yield*/, APIRouter_1.default.user_reg({
                            usr: registerData.acc,
                            pwd: password,
                            regType: regType,
                        })];
                case 1:
                    _a = _g.sent(), data_1 = _a.data, status_1 = _a.status;
                    debugger;
                    if ((data_1 === null || data_1 === void 0 ? void 0 : data_1.data) == null)
                        throw { message: data_1 === null || data_1 === void 0 ? void 0 : data_1.msg };
                    if (!((_c = data_1 === null || data_1 === void 0 ? void 0 : data_1.data) === null || _c === void 0 ? void 0 : _c.autoLogin)) return [3 /*break*/, 17];
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser')];
                case 2:
                    user = _g.sent();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["注册成功"]);
                    return [4 /*yield*/, APIRouter_1.default.user_login(data_1.data.usr, password)];
                case 3:
                    _b = _g.sent(), loginData = _b.data, status_2 = _b.status;
                    if (!user) return [3 /*break*/, 8];
                    console.log('退出旧账号');
                    console.log(user);
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser.sessid')];
                case 4:
                    sessid = _g.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }])];
                case 5:
                    _g.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:')];
                case 6:
                    _g.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout'])];
                case 7:
                    _g.sent();
                    UGStore_1.UGStore.dispatch({ type: 'reset' });
                    _g.label = 8;
                case 8: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(loginData === null || loginData === void 0 ? void 0 : loginData.data)])];
                case 9:
                    _g.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd'])];
                case 10:
                    _g.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [registerData.acc, 'userName'])];
                case 11:
                    _g.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [registerData.pwd, 'userPsw'])];
                case 12:
                    _g.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                case 13:
                    _g.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                case 14:
                    _g.sent();
                    return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 15:
                    UserInfo = (_g.sent()).data;
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [__assign(__assign({}, UserInfo.data), UGUserModel_1.default.getYS(loginData === null || loginData === void 0 ? void 0 : loginData.data))])];
                case 16:
                    _g.sent();
                    UGStore_1.UGStore.dispatch({ type: 'merge', props: UserInfo === null || UserInfo === void 0 ? void 0 : UserInfo.data });
                    setProps();
                    UGStore_1.UGStore.save();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
                    RootNavigation_1.popToRoot();
                    _g.label = 17;
                case 17:
                    if (((_d = data_1 === null || data_1 === void 0 ? void 0 : data_1.data) === null || _d === void 0 ? void 0 : _d.autoLogin) == false) {
                        OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [(_e = data_1.msg) !== null && _e !== void 0 ? _e : ""]);
                        RootNavigation_1.popToRoot();
                        RootNavigation_1.navigate(Navigation_1.PageName.LCLoginPage, { usr: registerData.acc, pwd: registerData.pwd });
                    }
                    return [3 /*break*/, 19];
                case 18:
                    error_1 = _g.sent();
                    react_native_event_listeners_1.EventRegister.emit('reload');
                    if (error_1.message.includes("推荐人")) {
                        react_native_1.Alert.alert(error_1 === null || error_1 === void 0 ? void 0 : error_1.message, "");
                        OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [""]);
                    }
                    else {
                        OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_f = error_1 === null || error_1 === void 0 ? void 0 : error_1.message) !== null && _f !== void 0 ? _f : '注册失败']);
                    }
                    return [3 /*break*/, 19];
                case 19: return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={{ flex: 1, backgroundColor: "#f3f3f3" }}>
            <react_native_1.SafeAreaView style={{ backgroundColor: "gold" }}>
                <react_native_1.View style={{
        backgroundColor: "gold",
        width: react_native_1.Dimensions.get("screen").width,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    }}>
                    <react_native_1.Text style={{
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: "center",
        fontSize: 17,
        width: "100%",
        alignSelf: "center"
    }}>注册</react_native_1.Text>
                    <react_native_1.TouchableOpacity style={{ width: 30, position: "absolute", left: 20 }} onPress={function () { return RootNavigation_1.pop(); }}>
                        <FontAwesome_1.default size={33} name={'angle-left'}/>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
                <react_native_1.View style={{ height: 40, backgroundColor: "gold" }}/>
            </react_native_1.SafeAreaView>
            <react_native_1.View style={{
        borderWidth: 1,
        backgroundColor: "white",
        borderColor: "#ddd",
        borderRadius: 12,
        bottom: 30
    }}>
                <react_native_1.SafeAreaView>
                    <react_native_1.ScrollView style={{ marginHorizontal: 12, marginVertical: 20, maxHeight: 550 }}>
                        <react_native_1.Text style={{ color: "red", fontSize: 14 }}>为了您的资金安全，请使用真实资料!</react_native_1.Text>
                        <react_native_1.View style={{
        flexDirection: "row",
        paddingVertical: 10,
        borderWidth: 1,
        paddingHorizontal: 12,
        borderColor: "#ddd",
        marginTop: 12
    }}>
                            <FontAwesome_1.default style={{ marginRight: 12 }} size={25} color={"gold"} name={"user-o"}/>
                            <react_native_1.TextInput onChangeText={function (text) { return setData(__assign(__assign({}, data), { acc: text })); }} placeholder={"帐号"} style={{ flex: 1 }}/>
                        </react_native_1.View>
                        {regex.test(data.acc) ?
        <react_native_1.Text style={{ marginTop: 12, fontSize: 12, color: "#6bab64" }}>*该账号可用</react_native_1.Text> :
        <react_native_1.Text style={{ marginTop: 12, fontSize: 12, color: "red" }}>*请使用6-15位英文或数字的组合</react_native_1.Text>}
                        <react_native_1.View style={{
        flexDirection: "row",
        paddingVertical: 10,
        borderWidth: 1,
        paddingHorizontal: 12,
        borderColor: "#ddd",
        marginTop: 12
    }}>
                            <FontAwesome_1.default style={{ marginRight: 12 }} size={25} color={"gold"} name={"unlock-alt"}/>
                            <react_native_1.TextInput onChangeText={function (text) { return setData(__assign(__assign({}, data), { pwd: text })); }} placeholder={"密码"} style={{ flex: 1 }}/>
                        </react_native_1.View>
                        <react_native_1.Text style={{ marginTop: 12, fontSize: 12, color: "red" }}>*请使用至少6位字符</react_native_1.Text>
                        <react_native_1.View style={{
        flexDirection: "row",
        paddingVertical: 10,
        borderWidth: 1,
        paddingHorizontal: 12,
        borderColor: "#ddd",
        marginTop: 12
    }}>
                            <FontAwesome_1.default style={{ marginRight: 12 }} size={25} color={"gold"} name={"unlock-alt"}/>
                            <react_native_1.TextInput onChangeText={function (text) { return setData(__assign(__assign({}, data), { confirmPwd: text })); }} placeholder={"确认密码"} style={{ flex: 1 }}/>
                        </react_native_1.View>
                        {data.pwd != "" && data.pwd != data.confirmPwd &&
        <react_native_1.Text style={{ marginTop: 12, fontSize: 12, color: "#e00013" }}>*密码不一致</react_native_1.Text>}
                        <RegisterItem_1.RegisterItem placeHolder={"请输入真实姓名"} iconName={"user-o"} config={reg_name} onChangeText={function (text) { return setData(__assign(__assign({}, data), { reg_name: text })); }}/>
                        <RegisterItem_1.RegisterItem placeHolder={"请输入4数字取款密码"} iconName={"unlock-alt"} config={reg_fundpwd} onChangeText={function (text) { return setData(__assign(__assign({}, data), { reg_fundpwd: text })); }}/>
                        <RegisterItem_1.RegisterItem placeHolder={"请输入QQ帐号"} iconName={"qq"} iconType={"AntDesign"} config={reg_qq} onChangeText={function (text) { return setData(__assign(__assign({}, data), { reg_qq: text })); }}/>
                        <RegisterItem_1.RegisterItem placeHolder={"请输入微信号"} iconName={"wechat"} iconType={"AntDesign"} config={reg_wx} onChangeText={function (text) { return setData(__assign(__assign({}, data), { reg_wx: text })); }}/>
                        <RegisterItem_1.RegisterItem placeHolder={"请输入手机号码"} iconName={"mobile"} config={reg_phone} onChangeText={function (text) { return setData(__assign(__assign({}, data), { reg_phone: text })); }}/>
                        <RegisterItem_1.RegisterItem placeHolder={"请输入手机短信验证码"} iconName={"unlock-alt"} config={smsVerify} onChangeText={function (text) { return setData(__assign(__assign({}, data), { reg_vcdoe: text })); }}/>
                        <RegisterItem_1.RegisterItem placeHolder={"请输入邮箱地址"} iconName={"envelope-o"} config={reg_email} onChangeText={function (text) { return setData(__assign(__assign({}, data), { reg_email: text })); }}/>
                        <react_native_1.TouchableOpacity onPress={function () { return onSubmit(data); }} style={{ paddingVertical: 16, marginTop: 12, borderRadius: 8, backgroundColor: "#ff9c06" }}>
                            <react_native_1.Text style={{ alignSelf: "center", color: "white", fontSize: 16 }}>注册</react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                        <react_native_1.TouchableOpacity onPress={function () { return RootNavigation_1.navigate(Navigation_1.PageName.LCLoginPage); }}>
                            <react_native_1.Text style={{ marginTop: 28, alignSelf: "center", color: "#7e7e7e" }}>返回登录</react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                        <react_native_1.TouchableOpacity onPress={function () { return RootNavigation_1.navigate(Navigation_1.PageName.LCHomePage); }}>
                            <react_native_1.Text style={{ marginTop: 28, alignSelf: "center", color: "#7e7e7e" }}>返回首页</react_native_1.Text>
                        </react_native_1.TouchableOpacity>
                    </react_native_1.ScrollView>
                </react_native_1.SafeAreaView>
            </react_native_1.View>
        </react_native_1.View>);
};
exports.default = LCRegisterPage;
