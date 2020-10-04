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
var React = require("react");
var react_native_1 = require("react-native");
var BaseScreen_1 = require("./component/BaseScreen");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var react_1 = require("react");
var checkbox_1 = require("@react-native-community/checkbox");
var useLoginIn_1 = require("../../public/hooks/useLoginIn");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var APIRouter_1 = require("../../public/network/APIRouter");
var UGUserModel_1 = require("../../redux/model/\u5168\u5C40/UGUserModel");
var UGStore_1 = require("../../redux/store/UGStore");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
// @ts-ignore
var blueimp_md5_1 = require("blueimp-md5");
var react_native_dialog_input_1 = require("react-native-dialog-input");
var Navigation_1 = require("../../public/navigation/Navigation");
var errorTimes = 0;
var LCLoginPage = function (_a) {
    var route = _a.route, navigation = _a.navigation, setProps = _a.setProps;
    var _b = react_1.useState(false), isRemember = _b[0], setIsRemember = _b[1];
    var _c = react_1.useState(""), acc = _c[0], setAcc = _c[1];
    var _d = react_1.useState(""), pwd = _d[0], setPwd = _d[1];
    var _e = react_1.useState(false), GGmodalShow = _e[0], setGGModalShow = _e[1];
    var loginSuccessHandle = useLoginIn_1.default().loginSuccessHandle;
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        var isRemember, account, pwd_1;
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
                    setAcc(account);
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', ['userPsw'])];
                case 3:
                    pwd_1 = _a.sent();
                    setPwd(pwd_1);
                    _a.label = 4;
                case 4: return [2 /*return*/];
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
        var _a, data, status_1, userInfo, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 12, , 13]);
                    return [4 /*yield*/, APIRouter_1.default.user_guestLogin()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_1 = _a.status;
                    if (!(react_native_1.Platform.OS == 'ios')) return [3 /*break*/, 11];
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay'])];
                case 2:
                    _b.sent();
                    //@ts-ignore
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(data.data)])];
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
                    return [4 /*yield*/, UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data })];
                case 10:
                    _b.sent();
                    UGStore_1.UGStore.save();
                    setProps();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                    _b.label = 11;
                case 11: return [3 /*break*/, 13];
                case 12:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 13];
                case 13:
                    RootNavigation_1.pop();
                    return [2 /*return*/];
            }
        });
    }); };
    var login = function (_a) {
        var account = _a.account, pwd = _a.pwd, _b = _a.googleCode, googleCode = _b === void 0 ? "" : _b, slideCode = _a.slideCode;
        return __awaiter(void 0, void 0, void 0, function () {
            var simplePwds, _c, data, status_2, error_2;
            var _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        simplePwds = ['111111', '000000', '222222', '333333', '444444', '555555', '666666', '777777', '888888', '999999', '123456', '654321', 'abcdef', 'aaaaaa', 'qwe123'];
                        if (!(simplePwds.indexOf(pwd) > -1)) return [3 /*break*/, 3];
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('HUDHelper.showMsg:', ['你的密码过于简单，可能存在风险，请把密码修改成复杂密码'])];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                                { selectors: 'UGSecurityCenterViewController.new[setFromVC:]', args1: ['fromLoginViewController'] },
                                true,
                            ])];
                    case 2:
                        _f.sent();
                        return [2 /*return*/];
                    case 3:
                        _f.trys.push([3, 6, , 7]);
                        OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
                        return [4 /*yield*/, APIRouter_1.default.user_login(account, blueimp_md5_1.default(pwd), googleCode, slideCode)];
                    case 4:
                        _c = _f.sent(), data = _c.data, status_2 = _c.status;
                        if (data.data == null)
                            throw { message: data === null || data === void 0 ? void 0 : data.msg };
                        if (((_d = data.data) === null || _d === void 0 ? void 0 : _d.ggCheck) == true) {
                            OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['请输入谷歌验证码']);
                            setGGModalShow(true);
                            return [2 /*return*/];
                            // Alert.alert("")
                        }
                        OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                        setGGModalShow(false);
                        return [4 /*yield*/, loginSuccessHandle(data, { account: account, pwd: pwd, isRemember: isRemember })];
                    case 5:
                        _f.sent();
                        setProps();
                        return [3 /*break*/, 7];
                    case 6:
                        error_2 = _f.sent();
                        errorTimes += 1;
                        if (errorTimes >= 3) {
                            setAcc("");
                            setPwd("");
                            setGGModalShow(false);
                        }
                        OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_e = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _e !== void 0 ? _e : '登入失败']);
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return (<BaseScreen_1.BaseScreen screenName={"登录"}>
            <react_native_1.View style={{ marginHorizontal: 24, top: 46 }}>
                <react_native_1.View style={{
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderColor: "#dddddd"
    }}>
                    <FontAwesome_1.default style={{ marginRight: 12 }} size={25} color={"gold"} name={"user-o"}/>
                    <react_native_1.TextInput style={{ flex: 1 }} onChangeText={function (text) { return setAcc(text); }} placeholder={'请输入账号'}/>
                </react_native_1.View>
                <react_native_1.View style={{
        marginTop: 8,
        flexDirection: "row",
        paddingVertical: 16,
        paddingHorizontal: 4,
        borderBottomWidth: 1,
        borderColor: "#dddddd"
    }}>
                    <FontAwesome_1.default style={{ marginRight: 12 }} size={25} color={"gold"} name={"unlock-alt"}/>
                    <react_native_1.TextInput style={{ flex: 1 }} onChangeText={function (text) { return setPwd(text); }} placeholder={'请输入密码'}/>
                </react_native_1.View>
                
                <react_native_1.View style={{ flexDirection: "row", alignItems: "center", paddingTop: 24 }}>
                    <checkbox_1.default boxType={'square'} style={{ height: 20, width: 20, borderColor: "black" }} value={isRemember} onValueChange={setIsRemember}/>
                    <react_native_1.Text style={{ paddingLeft: 8 }}>记住密码</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{ paddingTop: 16 }}>
                    {pwd != "" && acc != "" ? <react_native_1.TouchableOpacity style={{
        marginTop: 8,
        backgroundColor: "gold",
        borderRadius: 4,
        borderBottomWidth: 1,
        borderColor: "#dddddd"
    }} onPress={function () { return login({ account: acc, pwd: pwd }); }}>
                        <react_native_1.Text style={{ alignSelf: "center", paddingVertical: 20, color: "black" }}>登录</react_native_1.Text>
                    </react_native_1.TouchableOpacity> : <react_native_1.TouchableOpacity disabled={true} style={{
        marginTop: 8,
        backgroundColor: "#ffefae",
        borderRadius: 4,
        borderBottomWidth: 1,
        borderColor: "#dddddd"
    }}>
                        <react_native_1.Text style={{ alignSelf: "center", paddingVertical: 20, color: "#ddd" }}>登录</react_native_1.Text>
                    </react_native_1.TouchableOpacity>}
                    <react_native_1.TouchableOpacity style={{
        marginTop: 8,
        backgroundColor: "#dedede",
        borderRadius: 4,
        borderBottomWidth: 1,
        borderColor: "#dddddd"
    }}>
                        <react_native_1.Text style={{ alignSelf: "center", paddingVertical: 20, color: "black" }}>马上注册</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                    <react_native_1.TouchableOpacity style={{
        marginTop: 8,
        backgroundColor: "#dedede",
        borderRadius: 4,
        borderBottomWidth: 1,
        borderColor: "#dddddd"
    }} onPress={function () { return testPlay(); }}>
                        <react_native_1.Text style={{ alignSelf: "center", paddingVertical: 20, color: "black" }}>免费试玩</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                    <react_native_1.TouchableOpacity style={{
        marginTop: 8,
        backgroundColor: "#dedede",
        borderRadius: 4,
        borderBottomWidth: 1,
        borderColor: "#dddddd"
    }} onPress={function () { return RootNavigation_1.navigate(Navigation_1.PageName.LCHomePage); }}>
                        <react_native_1.Text style={{ alignSelf: "center", paddingVertical: 20, color: "black" }}>返回首页</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
            </react_native_1.View>
            <react_native_dialog_input_1.default isDialogVisible={GGmodalShow} title={"请输入谷歌验证码"} message={""} cancelText={"取消"} submitText={"確定"} hintInput={"请输入谷歌验证码"} submitInput={function (inputText) { return login({ account: acc, pwd: pwd, googleCode: inputText }); }} closeDialog={function () {
        setGGModalShow(false);
    }}/>
        </BaseScreen_1.BaseScreen>);
};
exports.default = LCLoginPage;
