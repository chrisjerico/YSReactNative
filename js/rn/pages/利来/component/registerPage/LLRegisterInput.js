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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLRegisterInput = void 0;
var react_native_1 = require("react-native");
var React = __importStar(require("react"));
var httpClient_1 = require("../../../../public/network/httpClient");
var react_1 = require("react");
exports.LLRegisterInput = function (_a) {
    var onChangeText = _a.onChangeText, placeholder = _a.placeholder, img = _a.img, _b = _a.visible, visible = _b === void 0 ? true : _b, _c = _a.isPwd, isPwd = _c === void 0 ? false : _c;
    var _d = react_1.useState(false), showPwd = _d[0], setShowPwd = _d[1];
    return visible ? (React.createElement(react_native_1.View, { style: {
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#d1d0d0",
            paddingTop: 12
        } },
        React.createElement(react_native_1.Image, { style: { height: 18, width: 18, marginRight: 8, resizeMode: "stretch" }, source: { uri: img } }),
        React.createElement(react_native_1.TextInput, { secureTextEntry: !showPwd, maxLength: 15, onChangeText: onChangeText, style: { fontSize: 14, paddingVertical: 20, flex: 1 }, placeholderTextColor: "#333", placeholder: placeholder }),
        isPwd &&
            React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () { return setShowPwd(!showPwd); } },
                React.createElement(react_native_1.Image, { style: { height: 15, width: 18, marginRight: 8, resizeMode: "stretch" }, source: { uri: showPwd ? httpClient_1.httpClient.defaults.baseURL + "/images/icon-eyes.png" : httpClient_1.httpClient.defaults.baseURL + "/images/icon-eye.png" } })))) :
        null;
};
//# sourceMappingURL=LLRegisterInput.js.map