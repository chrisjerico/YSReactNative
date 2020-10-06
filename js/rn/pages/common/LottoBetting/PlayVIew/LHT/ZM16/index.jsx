"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var HKNormalWithSBView_1 = require("../HKNormalWithSBView");
var ZMContainer16 = function (_a) {
    var setProps = _a.setProps;
    var currentPlayOdd = UGStore_1.UGStore.globalProps.BettingReducer.currentPlayOdd;
    return (<react_native_1.ScrollView style={{ flex: 1 }}>
      {currentPlayOdd.playGroups.map(function (res, index) {
        return <HKNormalWithSBView_1.default setProps={setProps} key={res.alias + "ZM16"} data={res}/>;
    })}
    </react_native_1.ScrollView>);
};
exports.default = ZMContainer16;
