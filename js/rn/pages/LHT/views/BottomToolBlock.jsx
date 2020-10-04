"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var BottomToolBlock = function (_a) {
    var renderBottomTool = _a.renderBottomTool, tools = _a.tools, containerStyle = _a.containerStyle;
    return <react_native_1.View style={[styles.container, containerStyle]}>{tools === null || tools === void 0 ? void 0 : tools.map(renderBottomTool)}</react_native_1.View>;
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
exports.default = BottomToolBlock;
