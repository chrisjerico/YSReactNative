"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var Scale_1 = require("../../tools/Scale");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var Avatar = function (_a) {
    var onPress = _a.onPress, uri = _a.uri, _b = _a.size, size = _b === void 0 ? 100 : _b, containerStyle = _a.containerStyle;
    return (react_1.default.createElement(react_native_gesture_handler_1.TouchableWithoutFeedback, { onPress: onPress },
        react_1.default.createElement(react_native_1.View, { style: containerStyle },
            react_1.default.createElement(react_native_fast_image_1.default, { source: { uri: uri }, style: {
                    width: Scale_1.scale(size),
                    aspectRatio: 1,
                    borderRadius: Scale_1.scale(size),
                    backgroundColor: '#9D9D9D',
                }, resizeMode: 'contain' }))));
};
exports.default = Avatar;
//# sourceMappingURL=Avatar.js.map