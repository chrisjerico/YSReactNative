"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var fillArray_1 = require("../../../utils/fillArray");
var AppDefine_1 = require("../../../../../public/define/AppDefine");
var PushHelper_1 = require("../../../../../public/define/PushHelper");
exports.LotteryTabView = function (_a) {
    var list = _a.list;
    return (React.createElement(react_native_1.FlatList, { bounces: false, numColumns: 4, keyExtractor: function (item, index) { return "lottery-" + index; }, data: fillArray_1.fillArray(list, 4), renderItem: function (_a) {
            var item = _a.item;
            return item.icon ? (React.createElement(react_native_1.TouchableWithoutFeedback, { style: {
                    height: 96,
                    width: AppDefine_1.default.width / 4,
                    flex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.5)"
                }, onPress: function () {
                    console.log(item);
                    PushHelper_1.default.pushCategory(1, item.gameId);
                } },
                React.createElement(react_native_1.View, { style: {
                        flex: 1,
                        height: 91,
                        borderRadius: 6,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "white",
                        margin: 2
                    } },
                    React.createElement(react_native_1.Image, { style: {
                            flex: 1,
                            height: 63,
                            width: 63,
                            resizeMode: "stretch",
                        }, source: { uri: item.icon } }),
                    React.createElement(react_native_1.Text, { style: {
                            fontSize: 12,
                            color: '#333333',
                            fontWeight: 'bold',
                            marginTop: 10
                        } }, item.title)))) : React.createElement(react_native_1.View, { style: { width: AppDefine_1.default.width / 4, } });
        } }));
};
//# sourceMappingURL=LotteryTabView.js.map