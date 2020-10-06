"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var hooks_1 = require("@react-native-community/hooks");
var HKSBItemView_1 = require("../HKSBItemView");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var SBContainer = function (_a) {
    var setProps = _a.setProps;
    var currentPlayOdd = UGStore_1.UGStore.globalProps.BettingReducer.currentPlayOdd;
    var width = hooks_1.useDimensions().screen.width;
    return (<react_native_1.ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map(function (res, index) {
        return <HKSBItemView_1.default setProps={setProps} frameWidth={((width / 4 * 3) - 5) / 2} key={res.id + index} data={res}/>;
    })}
    </react_native_1.ScrollView>);
};
exports.default = SBContainer;
