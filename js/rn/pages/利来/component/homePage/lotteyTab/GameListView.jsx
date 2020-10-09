"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameListView = void 0;
var react_native_1 = require("react-native");
var React = require("react");
var ImageButton_1 = require("../../../../\u4E50\u6A59/component/ImageButton");
var fillArray_1 = require("../../../utils/fillArray");
var PushHelper_1 = require("../../../../../public/define/PushHelper");
exports.GameListView = function (_a) {
    var list = _a.list;
    var onPress = function (list) {
        var _a;
        list.seriesId != '1' ? PushHelper_1.default.pushHomeGame(list) :
            list.gameId ?
                PushHelper_1.default.pushCategory(list.seriesId, list.gameId) :
                PushHelper_1.default.pushCategory(list.seriesId, (_a = list.subType[0]) === null || _a === void 0 ? void 0 : _a.gameId);
    };
    return (<react_native_1.FlatList scrollEnabled={false} style={{ height: 375 }} keyExtractor={function (item, index) { return "boardGame-" + index; }} numColumns={2} data={fillArray_1.fillArray(list, 2)} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return (<ImageButton_1.ImageButton imgStyle={{ height: 105, margin: 10, flex: 1 }} uri={item.icon} onPress={function () { return onPress(item); }}/>);
    }}/>);
};
