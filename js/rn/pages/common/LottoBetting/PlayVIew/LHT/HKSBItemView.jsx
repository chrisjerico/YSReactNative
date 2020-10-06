"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var hooks_1 = require("@react-native-community/hooks");
var LMItem_1 = require("./balls/LMItem");
var UGStore_1 = require("../../../../../redux/store/UGStore");
var BettingReducer_1 = require("../../../../../redux/reducer/BettingReducer");
var itemSize = 40;
var HKSBItemView = function (_a) {
    var data = _a.data, frameWidth = _a.frameWidth, setProps = _a.setProps;
    var width = hooks_1.useDimensions().screen.width;
    var bettingResult = UGStore_1.UGStore.globalProps.BettingReducer.bettingResult;
    return (<react_native_1.View style={{ flex: 1, flexWrap: 'wrap' }}>
            <react_native_1.Text style={{
        textAlign: 'center',
        width: "100%",
        color: "#c8222f",
        backgroundColor: "#eee",
        paddingVertical: 8,
        flex: 1
    }}>{data.alias}</react_native_1.Text>
            <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
                {data.plays.map(function (data, index) {
        return <react_native_1.TouchableWithoutFeedback key={"HKSB-" + index} onPress={function () {
            if (data.enable != "0") {
                UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.itemPress, value: data });
                setProps && setProps();
            }
        }}>
                            <react_native_1.View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{
            width: Math.floor(((width / 4 * 3) - 4) / 2),
            height: itemSize,
            alignItems: "center",
            backgroundColor: bettingResult[data.id] ? '#9a9a9a' : "#00000000"
        }}>
                                <LMItem_1.default setProps={setProps} fix={1} data={data}/>
                            </react_native_1.View>
                        </react_native_1.TouchableWithoutFeedback>;
    })}
            </react_native_1.View>
        </react_native_1.View>);
};
exports.default = HKSBItemView;
