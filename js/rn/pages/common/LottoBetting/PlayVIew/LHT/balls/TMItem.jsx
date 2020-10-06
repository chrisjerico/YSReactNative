"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var lottoSetting_1 = require("../../lottoSetting");
var BettingReducer_1 = require("../../../../../../redux/reducer/BettingReducer");
var TMItem = function (_a) {
    var data = _a.data, setProps = _a.setProps;
    var bettingResult = UGStore_1.UGStore.globalProps.BettingReducer.bettingResult;
    var borderColor = lottoSetting_1.getHKballColor(data.name);
    return (<react_native_1.TouchableWithoutFeedback onPress={function () {
        if (data.enable != "0") {
            UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.itemPress, value: data });
            setProps && setProps();
        }
    }}>
            <react_native_1.View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: bettingResult[data.id] ? '#aaa' : "#00000000"
    }}>
                <react_native_1.View style={{
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: borderColor,
        borderWidth: 1,
        backgroundColor: bettingResult[data.id] ? borderColor : "white",
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    }}>
                    <react_native_1.Text style={{ color: bettingResult[data.id] ? "white" : "black" }}>{data.name}</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.Text>{data.odds.replace(".0000", "").replace(".00", "").replace("00", "")}</react_native_1.Text>
            </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>);
};
exports.default = TMItem;
