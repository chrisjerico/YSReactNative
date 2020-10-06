"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
exports.RecommendLoveView = function (_a) {
    var list = _a.list;
    return (React.createElement(React.Fragment, null,
        React.createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: "center", marginTop: 10 } },
            React.createElement(react_native_1.Text, { style: { fontWeight: "bold", color: '#333', fontSize: 18 } }, "\u731C\u4F60\u559C\u6B22"),
            React.createElement(react_native_1.Text, { style: { fontSize: 15, marginHorizontal: 10 } }, "|"),
            React.createElement(react_native_1.Text, { style: { fontSize: 16, color: '#333', textAlign: "center" } }, "\u4F60\u60F3\u73A9\u7684\uFF0C\u8FD9\u91CC\u90FD\u6709")),
        React.createElement(react_native_1.FlatList, { bounces: false, style: { marginTop: 10 }, keyExtractor: function (item, index) { return "love-" + index; }, numColumns: 2, data: list, renderItem: function (_a) {
                var item = _a.item;
                return (React.createElement(react_native_1.TouchableWithoutFeedback, { style: { flex: 1 }, onPress: function () {
                    } }, item.icon == "" ?
                    React.createElement(FontAwesome_1.default, { style: { flex: 1, height: 100, width: 100, margin: 5 }, name: 'image-inverted' }) :
                    React.createElement(react_native_1.Image, { style: { flex: 1, height: 100, width: 100, margin: 5, resizeMode: 'stretch' }, source: { uri: item.icon } })));
            } })));
};
//# sourceMappingURL=RecommendLoveView.js.map