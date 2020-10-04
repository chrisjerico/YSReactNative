"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_webview_1 = require("react-native-webview");
var AppDefine_1 = require("../../define/AppDefine");
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
        return (<react_native_webview_1.default ref={webViewRef} style={[{ minHeight: height * 1.5 }, containerStyle]} containerStyle={height > 0 ? null : { opacity: 0 }} javaScriptEnabled injectedJavaScript={webViewScript} startInLoadingState source={{
            uri: AppDefine_1.default.host + "/dist/index.html#/swiperverify?platform=native",
        }} onMessage={hadnleMessage}/>);
    }
    else {
        return null;
    }
};
exports.default = react_1.forwardRef(ReloadSlidingVerification);
