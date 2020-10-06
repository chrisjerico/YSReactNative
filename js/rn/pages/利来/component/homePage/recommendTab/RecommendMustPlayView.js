"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var ImageButton_1 = require("../../../../\u4E50\u6A59/component/ImageButton");
exports.RecommendMustPlayView = function (_a) {
    var list = _a.list;
    return (React.createElement(React.Fragment, null,
        React.createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: "center" } },
            React.createElement(react_native_1.Text, { style: { fontWeight: "bold", color: '#333', fontSize: 18 } }, "\u5FC5\u73A9"),
            React.createElement(react_native_1.Text, { style: { fontSize: 15, marginHorizontal: 10 } }, "|"),
            React.createElement(react_native_1.Text, { style: { fontSize: 16, color: '#333' } }, "\u5168\u6C11\u6765\u73A9")),
        React.createElement(ImageButton_1.ImageButton, { onPress: function () {
            }, imgStyle: { height: 153, width: "100%" }, uri: list[0].icon }),
        React.createElement(react_native_1.View, { style: { flexDirection: 'row', paddingTop: 10 } },
            React.createElement(ImageButton_1.ImageButton, { imgStyle: { width: 186, height: 117, flex: 1, marginRight: 10 }, uri: list[1].icon, onPress: function () {
                } }),
            React.createElement(ImageButton_1.ImageButton, { imgStyle: { width: 186, height: 117, flex: 1 }, uri: list[2].icon, onPress: function () {
                } }))));
};
//# sourceMappingURL=RecommendMustPlayView.js.map