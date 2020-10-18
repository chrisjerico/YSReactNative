"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLLoginPage = void 0;
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var BaseScreen_1 = require("../\u4E50\u6A59/component/BaseScreen");
var CheckBox_1 = require("./component/CheckBox");
var PushHelper_1 = __importDefault(require("../../public/define/PushHelper"));
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var Navigation_1 = require("../../public/navigation/Navigation");
// @ts-ignore
var httpClient_1 = require("../../public/network/httpClient");
var ReloadSlidingVerification_1 = __importDefault(require("../../public/components/tars/ReloadSlidingVerification"));
var useSignInPage_1 = __importDefault(require("../../public/hooks/tars/useSignInPage"));
var react_1 = require("react");
var react_native_webview_1 = __importDefault(require("react-native-webview"));
var react_native_event_listeners_1 = require("react-native-event-listeners");
var AppDefine_1 = __importDefault(require("../../public/define/AppDefine"));
var UgLog_1 = require("../../public/tools/UgLog");
exports.LLLoginPage = function (_a) {
    var setProps = _a.setProps;
    var _b = useSignInPage_1.default({
        homePage: Navigation_1.PageName.LLHomePage,
        signUpPage: Navigation_1.PageName.LLRegisterPage,
    }), onChange = _b.onChange, show = _b.show, slideCodeRef = _b.slideCodeRef, sign = _b.sign, valid = _b.valid, navigateTo = _b.navigateTo, value = _b.value;
    var onChangePassword = onChange.onChangePassword, onChangeAccount = onChange.onChangeAccount, onChangeRemember = onChange.onChangeRemember, onChangeSlideCode = onChange.onChangeSlideCode;
    var signIn = sign.signIn, tryPlay = sign.tryPlay;
    var loginVCode = show.loginVCode;
    var remember = value.remember, account = value.account, password = value.password;
    var navigateToSignUpPage = navigateTo.navigateToSignUpPage;
    console.log("loginVCode", loginVCode);
    return (React.createElement(BaseScreen_1.BaseScreen, { screenName: '登录', style: {
            backgroundColor: '#f5f5f9',
            alignItems: 'center',
            paddingHorizontal: 28,
        } },
        React.createElement(react_native_1.StatusBar, { barStyle: "dark-content", translucent: true }),
        React.createElement(react_native_1.View, { style: {
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'rgb(238, 238, 238)',
                paddingTop: 12,
            } },
            React.createElement(react_native_1.Image, { style: { height: 18, width: 18, marginRight: 8 }, source: {
                    uri: 'https://test10.6yc.com/images/moban9_icon/icon-user.png',
                } }),
            React.createElement(react_native_1.TextInput, { value: account, onChangeText: function (text) { return onChangeAccount(text); }, style: { fontSize: 14, paddingVertical: 20, flex: 1 }, placeholderTextColor: '#333', placeholder: '请输入会员账号' })),
        React.createElement(react_native_1.View, { style: {
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: 'rgb(238, 238, 238)',
                paddingTop: 12,
            } },
            React.createElement(react_native_1.Image, { style: {
                    height: 18,
                    width: 18,
                    marginRight: 8,
                    resizeMode: 'stretch',
                }, source: {
                    uri: 'https://test10.6yc.com/images/moban9_icon/icon-pwd.png',
                } }),
            React.createElement(react_native_1.TextInput, { value: password, secureTextEntry: true, onChangeText: function (text) { return onChangePassword(text); }, style: { fontSize: 14, paddingVertical: 20, flex: 1 }, placeholderTextColor: '#333', placeholder: '请输入密码' })),
        React.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
            React.createElement(react_native_1.TouchableHighlight, { onPress: function () { return signIn(); }, underlayColor: '#007aff', style: {
                    backgroundColor: valid ? '#d82e2f' : '#d19898',
                    height: 47,
                    width: 'auto',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 12,
                    borderRadius: 4,
                } },
                React.createElement(react_native_1.Text, { style: { color: 'white', fontSize: 16 } }, "\u767B \u5F55"))),
        React.createElement(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', marginTop: 12 } },
            React.createElement(CheckBox_1.CheckBox, { isCheck: remember, onCheck: function () {
                    onChangeRemember(!remember);
                    setProps();
                }, text: '记住密码' }),
            React.createElement(react_native_1.View, { style: { flex: 1 } }),
            React.createElement(react_native_1.TouchableOpacity, { style: { flexDirection: 'row', alignItems: 'center' }, onPress: function () {
                    return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服);
                } },
                React.createElement(react_native_1.Image, { style: { height: 24, width: 24 }, source: {
                        uri: 'https://test10.6yc.com/views/mobileTemplate/20/images/kf.png',
                    } }),
                React.createElement(react_native_1.Text, { style: { color: '#333333', paddingLeft: 8 } }, "\u5728\u7EBF\u5BA2\u670D"))),
        React.createElement(ReloadSlidingVerification_1.default, { ref: slideCodeRef, show: true, onChange: onChangeSlideCode, backgroundColor: '#ffffff', containerStyle: {
                backgroundColor: '#ffffff',
            } }),
        React.createElement(react_native_1.Text, { style: { fontSize: 16, paddingVertical: 24, color: '#3c3c3c' } }, "\u5176\u4ED6"),
        React.createElement(react_native_1.View, { style: { flexDirection: 'row', marginHorizontal: 12 } },
            React.createElement(react_native_1.TouchableOpacity, { style: { alignItems: 'center' }, onPress: function () {
                    navigateToSignUpPage();
                } },
                React.createElement(react_native_1.Image, { style: { height: 64, width: 64 }, source: {
                        uri: 'https://test10.6yc.com/views/mobileTemplate/20/images/register.png',
                    } }),
                React.createElement(react_native_1.Text, { style: { marginTop: 8 } }, "\u9A6C\u4E0A\u6CE8\u518C")),
            React.createElement(react_native_1.View, { style: { flex: 1 } }),
            React.createElement(react_native_1.TouchableOpacity, { style: { alignItems: 'center' }, onPress: function () { return tryPlay(); } },
                React.createElement(react_native_1.Image, { style: { height: 64, width: 64 }, source: {
                        uri: 'https://test10.6yc.com/views/mobileTemplate/20/images/mfsw.png',
                    } }),
                React.createElement(react_native_1.Text, { style: { marginTop: 8 } }, "\u514D\u8D39\u8BD5\u73A9")),
            React.createElement(react_native_1.View, { style: { flex: 1 } }),
            React.createElement(react_native_1.TouchableOpacity, { style: { alignItems: 'center' }, onPress: function () {
                    PushHelper_1.default.openWebView(httpClient_1.httpClient.defaults.baseURL + '/index2.php');
                } },
                React.createElement(react_native_1.Image, { style: { height: 64, width: 64 }, source: {
                        uri: 'https://test10.6yc.com/views/mobileTemplate/20/images/dnb.png',
                    } }),
                React.createElement(react_native_1.Text, { style: { marginTop: 8 } }, "\u7535\u8111\u7248")))));
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
//# sourceMappingURL=LLLoginPage.js.map