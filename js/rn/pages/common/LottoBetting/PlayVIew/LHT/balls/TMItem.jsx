"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var lottoSetting_1 = require("../../lottoSetting");
var BettingReducer_1 = require("../../../../../../redux/reducer/BettingReducer");
var TMItem = function (_a) {
    var data = _a.data;
    var bettingResult = UGStore_1.UGStore.globalProps.BettingReducer.bettingResult;
    var borderColor = lottoSetting_1.getHKballColor(data.name);
    return (<react_native_1.TouchableWithoutFeedback onPress={function () {
        if (data.enable != "0")
            UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.itemPress, value: data });
    }}>
      <react_native_1.View style={{ flex: 1, borderWidth: 1, borderColor: '#444', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', backgroundColor: bettingResult[data.id] ? 'rgba(151,203,255,0.5)' : "#00000000" }}>
        <react_native_1.View style={{ width: 30, height: 30, borderRadius: 15, borderColor: borderColor, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: 5 }}>
          <react_native_1.Text>{data.name}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text>{data.odds.replace(".0000", "").replace(".00", "").replace("00", "")}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
exports.default = TMItem;
