"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
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