"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Scale_1 = require("../../tools/Scale");
var BottomGap = function () {
    var safeArea = react_native_safe_area_context_1.useSafeArea();
    return (<react_native_1.View style={{ height: Scale_1.scaleHeight(25) + safeArea.top, backgroundColor: 'transparent' }}></react_native_1.View>);
};
exports.default = BottomGap;
