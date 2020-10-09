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
exports.CheckBox = void 0;
var react_native_1 = require("react-native");
var Entypo_1 = __importDefault(require("react-native-vector-icons/Entypo"));
var React = __importStar(require("react"));
exports.CheckBox = function (_a) {
    var isCheck = _a.isCheck, onCheck = _a.onCheck, style = _a.style, iconColor = _a.iconColor, activeColor = _a.activeColor, unActiveColor = _a.unActiveColor, text = _a.text;
    return (React.createElement(react_native_1.TouchableOpacity, { style: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
        }, onPress: function () {
            onCheck();
        } },
        React.createElement(react_native_1.View, { style: [{
                    width: 18,
                    height: 18,
                    borderColor: "#333",
                    borderWidth: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: isCheck ? activeColor || "#0175fe" : unActiveColor || "#ffffff"
                }, style] },
            React.createElement(Entypo_1.default, { color: iconColor || "white", name: "check" })),
        React.createElement(react_native_1.Text, { style: { color: "#333333", paddingLeft: 8 } }, text)));
};
//# sourceMappingURL=CheckBox.js.map