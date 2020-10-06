"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var List = function (props) {
    var uniqueKey = props.uniqueKey, data = props.data;
    return (<react_native_1.FlatList scrollEnabled={false} listKey={uniqueKey} keyExtractor={function (_, index) { return uniqueKey + index.toString(); }} showsVerticalScrollIndicator={false} initialNumToRender={data === null || data === void 0 ? void 0 : data.length} {...props}/>);
};
exports.default = List;
