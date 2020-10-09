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
exports.HomeHeaderButtonBar = void 0;
var react_native_1 = require("react-native");
var React = __importStar(require("react"));
var PushHelper_1 = __importDefault(require("../../../../public/define/PushHelper"));
var UGSysConfModel_1 = require("../../../../redux/model/\u5168\u5C40/UGSysConfModel");
exports.HomeHeaderButtonBar = function (_a) {
    var logoIcon = _a.logoIcon;
    var onPress = function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服);
    };
    return (React.createElement(react_native_1.SafeAreaView, { style: { backgroundColor: "#FFFFFF" } },
        React.createElement(react_native_1.View, { style: { flexDirection: "row", marginHorizontal: 16, marginVertical: 10, backgroundColor: "#FFFFFF" } },
            React.createElement(react_native_1.Image, { style: { width: 90, height: 28, resizeMode: "stretch" }, source: { uri: logoIcon || 'https://a05front.wff9.com//cdn/A05FM/static/img/logo.9f6ba2be.png' } }),
            React.createElement(react_native_1.View, { style: { flex: 1 } }),
            React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: onPress },
                React.createElement(react_native_1.Image, { style: { width: 30, height: 30 }, source: { uri: 'http://test05.6yc.com/views/mobileTemplate/20/images/zxkf2.png' } })))));
};
//# sourceMappingURL=HomeHeaderButtonBar.js.map