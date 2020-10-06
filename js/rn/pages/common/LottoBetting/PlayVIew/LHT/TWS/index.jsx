"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var HKWSItemView_1 = require("../HKWSItemView");
var HKTMTItemView_1 = require("../HKTMTItemView");
var TWSContainer = function (_a) {
    var setProps = _a.setProps;
    var currentPlayOdd = UGStore_1.UGStore.globalProps.BettingReducer.currentPlayOdd;
    return (<react_native_1.ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map(function (res, index) {
        if (index == 0) {
            return <HKTMTItemView_1.default setProps={setProps} key={res.id + index} data={res}/>;
        }
        else {
            return <HKWSItemView_1.default setProps={setProps} key={res.id + index} data={res}/>;
        }
    })}
    </react_native_1.ScrollView>);
};
exports.default = TWSContainer;
