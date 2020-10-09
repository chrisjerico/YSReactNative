"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var UGProgressCircle_1 = __importDefault(require("../../widget/progress/UGProgressCircle"));
var ProgressCircle = function () { return (react_1.default.createElement(react_native_1.View, { style: styles.container },
    react_1.default.createElement(UGProgressCircle_1.default, null))); };
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
exports.default = ProgressCircle;
//# sourceMappingURL=ProgressCircle.js.map