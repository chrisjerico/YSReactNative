"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotLotteryView = void 0;
var React = require("react");
var react_native_1 = require("react-native");
exports.HotLotteryView = function (_a) {
    var list = _a.list, onPress = _a.onPress;
    return (<react_native_1.View style={{ padding: 10 }}>
            <react_native_1.Text style={{ fontSize: 18, color: '#3c3c3c', fontWeight: "bold" }}>热门彩种</react_native_1.Text>
            <react_native_1.FlatList scrollEnabled={false} numColumns={3} keyExtractor={function (item, key) { return "hotLottery-" + key; }} data={list} renderItem={function (_a) {
        var item = _a.item;
        return (<react_native_1.TouchableWithoutFeedback onPress={function () { return onPress(item); }}>
                        <react_native_1.Image source={{ uri: item.icon }} style={{ width: 100, height: 90, resizeMode: "stretch", flex: 1 / 3, margin: 5 }}/>
                    </react_native_1.TouchableWithoutFeedback>);
    }}/>
        </react_native_1.View>);
};
