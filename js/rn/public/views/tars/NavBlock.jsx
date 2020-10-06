"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var NavBlock = function (_a) {
    var renderNav = _a.renderNav, _b = _a.navs, navs = _b === void 0 ? [] : _b, containerStyle = _a.containerStyle, visible = _a.visible;
    if (visible) {
        return (<react_native_1.View style={[styles.container, containerStyle]}>
        {navs.map(renderNav)}
      </react_native_1.View>);
    }
    else {
        return null;
    }
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 540 / 105,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    }
});
exports.default = NavBlock;
