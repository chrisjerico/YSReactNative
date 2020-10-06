"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var hooks_1 = require("@react-native-community/hooks");
var TMItem_1 = require("./balls/TMItem");
var UGStore_1 = require("../../../../../redux/store/UGStore");
var itemSize = 40;
var HKBallsView = function (_a) {
    var data = _a.data, setProps = _a.setProps;
    var width = hooks_1.useDimensions().screen.width;
    var bettingResult = UGStore_1.UGStore.globalProps.BettingReducer.bettingResult;
    return (<react_native_1.View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
            <react_native_1.Text style={{
        textAlign: 'center',
        width: "100%",
        color: "#c8222f",
        backgroundColor: "#eee",
        paddingVertical: 8
    }}>{data.alias}</react_native_1.Text>
            <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {data.plays.map(function (data, index) {
        return <react_native_1.View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{
            width: Math.floor(((width / 4 * 3) - 4) / 3),
            height: itemSize,
            backgroundColor: bettingResult[data.id] ? '#aaa' : "#00000000"
        }}>
                            <TMItem_1.default setProps={setProps} data={data}/>
                        </react_native_1.View>;
    })}
            </react_native_1.View>
        </react_native_1.View>);
};
exports.default = HKBallsView;
