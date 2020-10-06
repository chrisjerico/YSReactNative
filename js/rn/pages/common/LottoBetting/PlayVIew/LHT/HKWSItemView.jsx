"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var UGStore_1 = require("../../../../../redux/store/UGStore");
var lottoSetting_1 = require("../lottoSetting");
var BettingReducer_1 = require("../../../../../redux/reducer/BettingReducer");
var HKWSItemView = function (_a) {
    var data = _a.data;
    var _b = UGStore_1.UGStore.globalProps.BettingReducer, shengXiaoValue = _b.shengXiaoValue, bettingResult = _b.bettingResult;
    return (<react_native_1.View style={{ flex: 1 }}>
      <react_native_1.FlatList ListHeaderComponent={function () {
        return <react_native_1.Text style={{ marginVertical: 10, width: "100%", textAlign: 'center' }}>{data.alias}</react_native_1.Text>;
    }} data={data.plays} renderItem={function (_a) {
        var item = _a.item;
        return (<react_native_1.TouchableWithoutFeedback onPress={function () {
            if (data.enable != "0")
                UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.itemPress, value: item });
        }}>
              <react_native_1.View style={{ width: "100%", height: 40, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: "gray", backgroundColor: bettingResult[item.id] ? 'rgba(151,203,255,0.5)' : "#00000000" }}>
                <react_native_1.View style={{ flexDirection: 'row' }}>
                  <react_native_1.Text style={{ fontWeight: "bold", marginHorizontal: 10, fontSize: 16 }}>{item.name}</react_native_1.Text>
                  <react_native_1.Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.odds.replace("00", "")}</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{ flexDirection: 'row', marginLeft: 50, }}>
                  {Array.from({ length: 49 }).map(function (res, index) { return index + 1; }).filter(function (res) { return (res % 10).toString() == item.name.replace("尾", ""); }).map(function (res, index) {
            return <react_native_1.View key={res + index + 3} style={{
                marginRight: 3,
                width: 30, height: 30, borderRadius: 15, borderColor: lottoSetting_1.getHKballColor(res < 10 ? "0" + res : res.toString()),
                borderWidth: 1, justifyContent: 'center', alignItems: 'center',
            }}>
                      <react_native_1.Text>{res < 10 ? "0" + res : res.toString()}</react_native_1.Text>
                    </react_native_1.View>;
        })}
                </react_native_1.View>
              </react_native_1.View>
            </react_native_1.TouchableWithoutFeedback>);
    }}/>
    </react_native_1.View>);
};
exports.default = HKWSItemView;
