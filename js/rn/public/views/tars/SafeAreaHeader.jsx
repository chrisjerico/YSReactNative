"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Scale_1 = require("../../tools/Scale");
var SafeAreaHeader = function (_a) {
    var headerColor = _a.headerColor, containerStyle = _a.containerStyle, children = _a.children;
    var safeArea = react_native_safe_area_context_1.useSafeArea();
    return (<react_native_1.View style={{ backgroundColor: headerColor }}>
      <react_native_1.View style={[styles.container, containerStyle, {
            marginTop: safeArea === null || safeArea === void 0 ? void 0 : safeArea.top,
            backgroundColor: headerColor
        }]}>
        {children}
      </react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 540 / 70,
        paddingHorizontal: Scale_1.scale(10),
        justifyContent: 'center'
    }
});
exports.default = SafeAreaHeader;
