"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UGBridge = void 0;
var react_native_1 = require("react-native");
var UGBridge = /** @class */ (function () {
    function UGBridge() {
    }
    UGBridge.setup = function () { };
    UGBridge.core = react_native_1.NativeModules.ReactNativeHelper; // 原生桥梁
    UGBridge.emitter = new react_native_1.NativeEventEmitter(UGBridge.core); // 原生事件监听器
    return UGBridge;
}());
exports.UGBridge = UGBridge;
//# sourceMappingURL=UGBridge.js.map