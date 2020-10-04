"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var HKWSItemView_1 = require("../HKWSItemView");
var WSContainer = function () {
    var currentPlayOdd = UGStore_1.UGStore.globalProps.BettingReducer.currentPlayOdd;
    return (<react_native_1.ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map(function (res, index) {
        return <HKWSItemView_1.default data={res}/>;
    })}
    </react_native_1.ScrollView>);
};
exports.default = WSContainer;
