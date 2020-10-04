"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var BettingReducer_1 = require("../../../../../../redux/reducer/BettingReducer");
var LMItem = function (_a) {
    var data = _a.data, _b = _a.fix, fix = _b === void 0 ? 2 : _b;
    var bettingResult = UGStore_1.UGStore.globalProps.BettingReducer.bettingResult;
    return (<react_native_1.TouchableWithoutFeedback onPress={function () {
        if (data.enable != "0")
            UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.itemPress, value: data });
    }}>
      <react_native_1.View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 5, backgroundColor: bettingResult[data.id] ? 'rgba(151,203,255,0.5)' : "#00000000" }}>
        <react_native_1.Text>{data.name}  {data.enable == "0" ? "--" : parseFloat(data.odds).toFixed(fix)}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
exports.default = LMItem;
