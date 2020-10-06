"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var hooks_1 = require("@react-native-community/hooks");
var LMItem_1 = require("./balls/LMItem");
var UGStore_1 = require("../../../../../redux/store/UGStore");
var itemSize = 40;
var HKTMTItemView = function (_a) {
    var data = _a.data, setProps = _a.setProps;
    var width = hooks_1.useDimensions().screen.width;
    var bettingResult = UGStore_1.UGStore.globalProps.BettingReducer.bettingResult;
    return (<react_native_1.View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            <react_native_1.Text style={{
        textAlign: 'center', paddingVertical: 10, width: "100%", color: "#c8222f",
        backgroundColor: "#eee"
    }}>{data.alias}</react_native_1.Text>
            <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.plays.map(function (data, index) {
        if (index > 1) {
            return <react_native_1.View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{
                width: Math.floor(((width / 4 * 3) - 5) / 3),
                height: itemSize,
                alignItems: "center",
                backgroundColor: bettingResult[data.id] ? "#999999" : "white"
            }}>
                                <LMItem_1.default setProps={setProps} fix={1} data={data}/>
                            </react_native_1.View>;
        }
        else {
            return <react_native_1.View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{
                width: Math.floor(((width / 4 * 3) - 5) / 2),
                height: itemSize,
                borderBottomWidth: 1,
                borderBottomColor: "#d1d0d0",
                alignItems: "center",
                backgroundColor: bettingResult[data.id] ? "#999999" : "white"
            }}>
                                <LMItem_1.default setProps={setProps} fix={1} data={data}/>
                            </react_native_1.View>;
        }
    })}
            </react_native_1.View>
        </react_native_1.View>);
};
exports.default = HKTMTItemView;
