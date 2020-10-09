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
var Scale_1 = require("../../tools/Scale");
var TouchableImage_1 = __importDefault(require("../../views/tars/TouchableImage"));
var AntDesign_1 = __importDefault(require("react-native-vector-icons/AntDesign"));
var ActivityComponent = function (_a) {
    var logo = _a.logo, onPress = _a.onPress, show = _a.show, _b = _a.enableFastImage, enableFastImage = _b === void 0 ? true : _b, containerStyle = _a.containerStyle, refreshing = _a.refreshing;
    var _c = react_1.useState(false), hide = _c[0], setHide = _c[1];
    react_1.useEffect(function () {
        setHide(false);
    }, [refreshing]);
    if (show && !hide) {
        return (react_1.default.createElement(react_native_1.View, { style: [styles.container, containerStyle] },
            react_1.default.createElement(TouchableImage_1.default, { containerStyle: { padding: Scale_1.scale(20) }, enableFastImage: enableFastImage, pic: logo, onPress: onPress, resizeMode: 'contain' }),
            react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () {
                    setHide(true);
                } },
                react_1.default.createElement(react_native_1.View, { style: styles.iconContainer },
                    react_1.default.createElement(AntDesign_1.default, { name: 'closecircleo', size: Scale_1.scale(35), color: 'red' })))));
    }
    else {
        return null;
    }
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: Scale_1.scale(150),
        aspectRatio: 1,
        position: 'absolute',
    },
    iconContainer: {
        width: Scale_1.scale(35),
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Scale_1.scale(35),
        position: 'absolute',
        top: Scale_1.scale(20),
        right: Scale_1.scale(20),
    },
});
exports.default = ActivityComponent;
//# sourceMappingURL=ActivityComponent.js.map