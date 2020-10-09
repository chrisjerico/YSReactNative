"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.UGLoadingCP1 = exports.UGLoadingCP = exports.hideLoading = exports.showLoading = exports.UGLoadingProps = exports.UGLoadingType = void 0;
var react_1 = __importStar(require("react"));
var react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
var AppDefine_1 = __importDefault(require("../define/AppDefine"));
var react_native_1 = require("react-native");
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var UGSkinManagers_1 = require("../theme/UGSkinManagers");
var react_native_elements_1 = require("react-native-elements");
var react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
var Resources_1 = require("../../Res/icon/Resources");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var UGLoadingType;
(function (UGLoadingType) {
    UGLoadingType[UGLoadingType["Message"] = 0] = "Message";
    UGLoadingType[UGLoadingType["Loading"] = 1] = "Loading";
    UGLoadingType[UGLoadingType["Success"] = 2] = "Success";
    UGLoadingType[UGLoadingType["Error"] = 3] = "Error";
    UGLoadingType[UGLoadingType["Reload"] = 4] = "Reload";
})(UGLoadingType = exports.UGLoadingType || (exports.UGLoadingType = {}));
var UGLoadingProps = /** @class */ (function () {
    function UGLoadingProps() {
    }
    return UGLoadingProps;
}());
exports.UGLoadingProps = UGLoadingProps;
var hideLoadingFunc = undefined;
// 在当前页面显示Loading
function showLoading(props) {
    UGLoadingProps.shared = __assign(__assign({}, props), { setHideLoading: function (func) { hideLoadingFunc = func; } });
    refreshLoadingFunc();
}
exports.showLoading = showLoading;
// 隐藏当前页面Loading
function hideLoading() {
    switch (react_native_1.Platform.OS) {
        case 'ios':
            hideLoadingFunc && hideLoadingFunc();
            break;
        case 'android':
            UGLoadingProps.shared = null;
            refreshLoadingFunc();
            break;
    }
}
exports.hideLoading = hideLoading;
// ——————————————————————————————————————————————————————————————————————————————————————————
var refreshLoadingFunc;
var UGLoadingCP = /** @class */ (function (_super) {
    __extends(UGLoadingCP, _super);
    function UGLoadingCP(p) {
        var _this = _super.call(this, p) || this;
        refreshLoadingFunc = (function () {
            _this.setState({});
        }).bind(_this);
        return _this;
    }
    UGLoadingCP.prototype.render = function () {
        if (UGLoadingProps.shared) {
            return react_1.default.createElement(exports.UGLoadingCP1, __assign({}, UGLoadingProps.shared));
        }
        return null;
    };
    return UGLoadingCP;
}(react_1.Component));
exports.UGLoadingCP = UGLoadingCP;
var lastProps;
exports.UGLoadingCP1 = function (props) {
    var type = props.type, text = props.text, _a = props.backgroundColor, backgroundColor = _a === void 0 ? ['transparent', 'transparent'] : _a, reloadClick = props.reloadClick, setHideLoading = props.setHideLoading;
    var _b = react_1.useState(0), zIndex = _b[0], setZIndex = _b[1];
    var fadeInOpacity = new react_native_reanimated_1.default.Value(0);
    var hideLoading = function () {
        react_native_reanimated_1.default.timing(fadeInOpacity, { toValue: 0, duration: 250, easing: react_native_reanimated_1.Easing.linear }).start(); // 淡出
        setTimeout(function () { lastProps === props && setZIndex(-999); }, 250); // 开启点击穿透
        UGLoadingProps.shared = undefined;
    };
    // 显示新样式（重新初始化）
    if (lastProps !== props) {
        lastProps = props;
        setZIndex(0);
    }
    // 初始化
    react_1.useEffect(function () {
        react_native_reanimated_1.default.timing(fadeInOpacity, { toValue: 1, duration: 250, easing: react_native_reanimated_1.Easing.linear }).start(); // 淡入
        setHideLoading(hideLoading);
        switch (type) {
            case UGLoadingType.Message:
            case UGLoadingType.Success:
            case UGLoadingType.Error:
                setTimeout(function () { lastProps === props && hideLoading(); }, 3000);
            case UGLoadingType.Loading:
                setTimeout(function () { lastProps === props && hideLoading(); }, 20000);
            default: ;
        }
    }, [lastProps]);
    return (react_1.default.createElement(react_native_reanimated_1.default.View, { style: [{ position: 'absolute', zIndex: zIndex, width: AppDefine_1.default.width, height: AppDefine_1.default.height }, { opacity: fadeInOpacity }] },
        react_1.default.createElement(react_native_linear_gradient_1.default, { colors: backgroundColor, start: { x: 0, y: 1 }, end: { x: 1, y: 1 }, style: { flex: 1, justifyContent: 'center' } },
            react_1.default.createElement(react_native_1.View, { style: { marginHorizontal: 30, marginTop: -50, backgroundColor: '#eee', alignSelf: 'center', borderRadius: 10, padding: 13 } },
                type == UGLoadingType.Loading && react_1.default.createElement(react_native_fast_image_1.default, { style: [styles.icon, { width: 50, height: 50 }], source: Resources_1.Res.加载中 }),
                type == UGLoadingType.Success && react_1.default.createElement(react_native_fast_image_1.default, { style: [styles.icon, { width: 30, height: 30 }], source: Resources_1.Res.加载成功 }),
                type == UGLoadingType.Error && react_1.default.createElement(react_native_fast_image_1.default, { style: [styles.icon, { width: 30, height: 30 }], source: Resources_1.Res.加载失败 }),
                text && react_1.default.createElement(react_native_1.Text, { style: { color: 'black', textAlign: 'center', fontSize: 15, lineHeight: 18 } }, text),
                type == UGLoadingType.Reload && (react_1.default.createElement(react_native_elements_1.Button, { buttonStyle: { margin: 10, marginTop: 18, marginBottom: 0, paddingHorizontal: 18, backgroundColor: UGSkinManagers_1.Skin1.themeColor, borderRadius: 8 }, titleStyle: { fontSize: 16 }, title: '\u70B9\u51FB\u91CD\u8BD5', onPress: reloadClick })),
                type == UGLoadingType.Reload && (react_1.default.createElement(react_native_1.View, { style: { position: 'absolute', alignSelf: 'flex-end', marginTop: -7, marginLeft: 30 } },
                    react_1.default.createElement(react_native_gesture_handler_1.TouchableOpacity, { containerStyle: [{ width: 44, height: 44 }, { overflow: false }], onPress: hideLoading },
                        react_1.default.createElement(react_native_elements_1.Icon, { size: 30, type: 'antdesign', name: "closecircleo", color: 'black', containerStyle: { alignSelf: 'flex-end', marginRight: -7, backgroundColor: '#eee', borderRadius: 15 } }))))))));
};
var styles = react_native_1.StyleSheet.create({
    icon: {
        marginHorizontal: 20, marginTop: 8, marginBottom: 15, alignSelf: 'center',
    },
});
//# sourceMappingURL=UGLoadingCP.js.map