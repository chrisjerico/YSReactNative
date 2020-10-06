"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var ImageButton_1 = require("../../../ImageButton");
var React = require("react");
var fillArray_1 = require("../../../../utils/fillArray");
exports.GameListView = function (_a) {
    var list = _a.list, thirdPartGamePress = _a.thirdPartGamePress;
    return (<react_native_1.FlatList scrollEnabled={false} style={{ flex: 1 }} keyExtractor={function (item, index) { return "boardGame-" + index; }} numColumns={2} data={fillArray_1.fillArray(list, 2)} renderItem={function (_a) {
        var item = _a.item;
        return (<ImageButton_1.ImageButton imgStyle={{ height: 105, margin: 10, flex: 0.5 }} uri={item.icon} onPress={function () { return thirdPartGamePress(item.id, item.gameId); }}/>);
    }}/>);
};
