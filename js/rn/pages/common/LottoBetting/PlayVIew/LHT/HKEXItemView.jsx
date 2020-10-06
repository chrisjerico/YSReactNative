"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var UGStore_1 = require("../../../../../redux/store/UGStore");
var lottoSetting_1 = require("../lottoSetting");
var BettingReducer_1 = require("../../../../../redux/reducer/BettingReducer");
var AppDefine_1 = require("../../../../../public/define/AppDefine");
var HKEXItemView = function (_a) {
    var data = _a.data, setProps = _a.setProps;
    var _b = UGStore_1.UGStore.globalProps.BettingReducer, shengXiaoValue = _b.shengXiaoValue, bettingResult = _b.bettingResult;
    return (<react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={{
        paddingVertical: 8, width: "100%", textAlign: 'center', color: "#c8222f",
        backgroundColor: "#eee"
    }}>{data.alias}</react_native_1.Text>
            <react_native_1.FlatList style={{ borderLeftColor: "#d1d0d0", borderLeftWidth: 1 }} data={data.plays} renderItem={function (_a) {
        var _b;
        var item = _a.item;
        return (<react_native_1.TouchableWithoutFeedback onPress={function () {
            if (data.enable != "0") {
                UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.itemPress, value: item });
                setProps && setProps();
            }
        }}>
                        <react_native_1.View style={{
            width: Math.floor(((AppDefine_1.default.width / 4 * 3) - 4)),
            height: 40,
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderColor: "#d1d0d0",
            backgroundColor: bettingResult[item.id] ? '#999999' : "#00000000"
        }}>
                            <react_native_1.View style={{ flexDirection: 'row' }}>
                                <react_native_1.Text style={{ fontWeight: "bold", marginHorizontal: 10, fontSize: 16 }}>{item.name}</react_native_1.Text>
                                <react_native_1.Text style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#a9a9a9"
        }}>{item.odds.replace("00", "")}</react_native_1.Text>
                            </react_native_1.View>
                            <react_native_1.View style={{
            flexDirection: 'row',
            marginLeft: 60,
            flex: 1,
            justifyContent: "flex-end",
            marginRight: 4
        }}>
                                {(_b = shengXiaoValue[item === null || item === void 0 ? void 0 : item.name]) === null || _b === void 0 ? void 0 : _b.map(function (res, index) {
            return <react_native_1.View key={res + index + 3} style={{
                marginRight: 3,
                width: 30,
                height: 30,
                borderRadius: 15,
                borderColor: lottoSetting_1.getHKballColor(res < 10 ? "0" + res : res.toString()),
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: bettingResult[item.id] ? lottoSetting_1.getHKballColor(res < 10 ? "0" + res : res.toString()) : "#ffffff"
            }}>
                                        <react_native_1.Text style={{ color: bettingResult[item.id] ? "#ffffff" : "#000000" }}>{res < 10 ? "0" + res : res.toString()}</react_native_1.Text>
                                    </react_native_1.View>;
        })}
                            </react_native_1.View>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>);
    }}/>
        </react_native_1.View>);
};
exports.default = HKEXItemView;
