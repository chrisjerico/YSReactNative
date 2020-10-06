"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_event_listeners_1 = require("react-native-event-listeners");
var react_native_webview_1 = require("react-native-webview");
var AppDefine_1 = require("../define/AppDefine");
var SlidingVerification = function (_a) {
    var onChange = _a.onChange, containerStyle = _a.containerStyle;
    //const host = 'http://test60f.fhptcdn.com'
    var webViewScript = "setTimeout(function() { \n      document.getElementById('app').style.background = 'transparent'\n      window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight); \n    }, 500);\n    true;";
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
        return (function () { return react_native_event_listeners_1.EventRegister.removeEventListener(_this.listener); });
    }, []);
    return (<react_native_webview_1.default ref={webViewRef} style={[{ minHeight: webviewHeight }, containerStyle]} javaScriptEnabled injectedJavaScript={webViewScript} startInLoadingState source={{ uri: AppDefine_1.default.host + "/dist/index.html#/swiperverify?platform=native" }} onMessage={hadnleMessage}/>);
};
exports.default = SlidingVerification;
