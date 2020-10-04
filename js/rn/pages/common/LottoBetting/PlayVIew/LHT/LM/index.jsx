"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var HKNormalItemView_1 = require("../HKNormalItemView");
var LMContainer = function () {
    var _a, _b, _c;
    var currentPlayOdd = UGStore_1.UGStore.globalProps.BettingReducer.currentPlayOdd;
    return (<react_native_1.View style={{ flex: 1, paddingRight: 5 }}>
      <HKNormalItemView_1.default data={(_c = (_b = (_a = currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.playGroups) === null || _a === void 0 ? void 0 : _a.filter(function (res) { return res.name == currentPlayOdd.name; })) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : undefined}/>
    </react_native_1.View>);
};
exports.default = LMContainer;
