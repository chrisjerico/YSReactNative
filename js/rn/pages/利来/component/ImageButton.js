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
exports.ImageButton = void 0;
var react_native_1 = require("react-native");
var React = __importStar(require("react"));
var defaultImgStyle = {
    height: "100%",
    width: "100%",
    resizeMode: "stretch",
};
exports.ImageButton = function (_a) {
    var uri = _a.uri, imgStyle = _a.imgStyle, source = _a.source, onPress = _a.onPress;
    return (React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () { return onPress(); } },
        React.createElement(react_native_1.Image, { style: [defaultImgStyle, imgStyle], source: source || { uri: uri } })));
};
//# sourceMappingURL=ImageButton.js.map