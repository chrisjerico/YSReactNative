"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
exports.WinningListView = function (_a) {
    var data = _a.data;
    return (React.createElement(react_native_1.FlatList, { keyExtractor: function (item, index) { return "winning-" + index; }, style: { borderRadius: 10, height: 360, backgroundColor: "#ffffff", bottom: 10 }, stickyHeaderIndices: [0], ListHeaderComponent: function () { return (React.createElement(react_native_1.View, { style: { flexDirection: "row", backgroundColor: "#ffffff" } },
            React.createElement(react_native_1.Text, { style: {
                    flex: 1,
                    color: "#3c3c3c",
                    textAlign: "center",
                    paddingVertical: 6,
                    fontWeight: "bold"
                } }, "\u7528\u6237\u540D\u79F0"),
            React.createElement(react_native_1.Text, { style: {
                    flex: 1,
                    color: "#3c3c3c",
                    textAlign: "center",
                    paddingVertical: 6,
                    fontWeight: "bold"
                } }, "\u6E38\u620F\u540D\u79F0"),
            React.createElement(react_native_1.Text, { style: {
                    flex: 1,
                    color: "#3c3c3c",
                    textAlign: "center",
                    paddingVertical: 6,
                    fontWeight: "bold"
                } }, "\u4E2D\u5956\u91D1\u989D"))); }, data: data, renderItem: function (_a) {
            var item = _a.item;
            return (React.createElement(react_native_1.View, { style: { flexDirection: "row" } },
                React.createElement(react_native_1.Text, { style: {
                        flex: 1,
                        color: "#3c3c3c",
                        textAlign: "center",
                        paddingVertical: 6,
                        fontWeight: "bold"
                    } }, item.username),
                React.createElement(react_native_1.Text, { style: {
                        flex: 1,
                        color: "#3c3c3c",
                        textAlign: "center",
                        paddingVertical: 6,
                        fontWeight: "bold"
                    } }, item.type),
                React.createElement(react_native_1.Text, { style: {
                        flex: 1,
                        color: "#3c3c3c",
                        textAlign: "center",
                        paddingVertical: 6,
                        fontWeight: "bold"
                    } }, item.coin)));
        } }));
};
//# sourceMappingURL=WinningListView.js.map