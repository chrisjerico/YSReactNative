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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var react_native_webview_1 = __importDefault(require("react-native-webview"));
var AppDefine_1 = __importDefault(require("../../define/AppDefine"));
var tars_1 = require("../../tools/tars");
var ReloadSlidingVerification = function (_a, ref) {
    var onChange = _a.onChange, containerStyle = _a.containerStyle, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? 'transparent' : _b, show = _a.show;
    var webViewScript = "setTimeout(function() { \n    document.getElementById('app').style.background = '" +
        backgroundColor +
        "'\n    window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight); \n  }, 500);\n  true;";
    var _c = react_1.useState(0), height = _c[0], setHeight = _c[1];
    var hadnleMessage = function (e) {
        var _a;
        var data = (_a = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _a === void 0 ? void 0 : _a.data;
        switch (react_native_1.Platform.OS) {
            case 'ios':
                if (typeof data == 'string') {
                    setHeight(tars_1.stringToNumber(data));
                }
                else {
                    onChange(data);
                }
                break;
            case 'android':
                if ((data === null || data === void 0 ? void 0 : data.startsWith('{')) && (data === null || data === void 0 ? void 0 : data.endsWith('}'))) {
                    onChange(JSON.parse(data));
                }
                else if (typeof data == 'string') {
                    setHeight(tars_1.stringToNumber(data) * 1.5);
                }
                else {
                    onChange(data);
                }
        }
    };
    var webViewRef = react_1.useRef();
    react_1.useImperativeHandle(ref, function () { return ({
        reload: function () {
            var _a;
            (_a = webViewRef === null || webViewRef === void 0 ? void 0 : webViewRef.current) === null || _a === void 0 ? void 0 : _a.reload();
        },
    }); });
    react_1.useEffect(function () {
        var _a;
        (_a = webViewRef === null || webViewRef === void 0 ? void 0 : webViewRef.current) === null || _a === void 0 ? void 0 : _a.reload();
    }, []);
    if (show) {
        return (react_1.default.createElement(react_native_webview_1.default, { ref: webViewRef, style: [{ minHeight: height * 1.5 }, containerStyle], containerStyle: height > 0 ? null : { opacity: 0 }, javaScriptEnabled: true, injectedJavaScript: webViewScript, startInLoadingState: true, source: {
                uri: AppDefine_1.default.host + "/dist/index.html#/swiperverify?platform=native",
            }, onMessage: hadnleMessage }));
    }
    else {
        return null;
    }
};
exports.default = react_1.forwardRef(ReloadSlidingVerification);
//# sourceMappingURL=ReloadSlidingVerification.js.map