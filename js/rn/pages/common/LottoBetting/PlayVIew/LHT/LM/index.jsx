"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var react_1 = require("react");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var HKNormalItemView_1 = require("../HKNormalItemView");
var LMContainer = function (_a) {
    var _b, _c, _d;
    var setProps = _a.setProps;
    var currentPlayOdd = UGStore_1.UGStore.globalProps.BettingReducer.currentPlayOdd;
    react_1.useEffect(function () {
        var _a, _b;
        (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.playGroups) && console.log("cc", (_b = (_a = currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.playGroups) === null || _a === void 0 ? void 0 : _a.filter(function (res) { return res.name == currentPlayOdd.name; })) === null || _b === void 0 ? void 0 : _b[0]);
    }, [currentPlayOdd]);
    return (<react_native_1.View style={{ flex: 1, paddingRight: 5 }}>
      <HKNormalItemView_1.default setProps={setProps} data={(_d = (_c = (_b = currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.playGroups) === null || _b === void 0 ? void 0 : _b.filter(function (res) { return res.name == currentPlayOdd.name; })) === null || _c === void 0 ? void 0 : _c[0]) !== null && _d !== void 0 ? _d : undefined}/>
    </react_native_1.View>);
};
exports.default = LMContainer;
