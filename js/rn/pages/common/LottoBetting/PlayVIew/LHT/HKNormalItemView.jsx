"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var hooks_1 = require("@react-native-community/hooks");
var LMItem_1 = require("./balls/LMItem");
var UGStore_1 = require("../../../../../redux/store/UGStore");
var BettingReducer_1 = require("../../../../../redux/reducer/BettingReducer");
var itemSize = 40;
var HKNormalItemView = function (_a) {
    var data = _a.data, setProps = _a.setProps;
    var width = hooks_1.useDimensions().screen.width;
    var bettingResult = UGStore_1.UGStore.globalProps.BettingReducer.bettingResult;
    return (<react_native_1.View style={{ flex: 1, }}>
            <react_native_1.Text style={{
        textAlign: 'center',
        width: "100%",
        color: "#c8222f",
        backgroundColor: "#eee",
        paddingVertical: 8
    }}>{data.alias}</react_native_1.Text>
            <react_native_1.FlatList style={{ borderTopColor: "#e0e0e0", borderTopWidth: 1 }} data={data.plays} numColumns={2} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return (<react_native_1.TouchableWithoutFeedback onPress={function () {
            if (item.enable != "0") {
                UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.itemPress, value: item });
                setProps && setProps();
            }
        }}>
                        <react_native_1.View key={item.from_id + item.isBan + item.code + item.name + item.alias} style={{
            width: Math.floor(((width / 4 * 3) - 4) / 2),
            height: itemSize,
            alignItems: "center",
            backgroundColor: bettingResult[item.id] ? '#9a9a9a' : "#00000000",
            borderBottomColor: "#e0e0e0",
            borderBottomWidth: 1
        }}>
                            <LMItem_1.default setProps={setProps} fix={2} data={item}/>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>);
    }}/>
        </react_native_1.View>);
};
exports.default = HKNormalItemView;
