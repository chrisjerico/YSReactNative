"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var lottoSetting_1 = require("../../lottoSetting");
var BettingReducer_1 = require("../../../../../../redux/reducer/BettingReducer");
var HKBallsView_1 = require("../HKBallsView");
var HKSBItemView_1 = require("../HKSBItemView");
var HKNormalItemView_1 = require("../HKNormalItemView");
var TMPlayView = function (_a) {
    var setProps = _a.setProps;
    var _b = UGStore_1.UGStore.globalProps.BettingReducer, selectedShengXiao = _b.selectedShengXiao, shengXiaoValue = _b.shengXiaoValue, subPlay = _b.subPlay;
    var _c = react_1.useState("特码A"), label = _c[0], setLabel = _c[1];
    return <react_native_1.SafeAreaView style={{ marginBottom: 50 }}>
        <react_native_1.View>
            <react_native_1.View style={{ height: 40, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <react_native_1.TouchableOpacity activeOpacity={1} onPress={function () {
        UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.subPlayPress, value: "特码A" });
        setLabel("特码A");
        setProps();
    }} style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: label == "特码A" ? "#e6e6e6" : "#dbdbdb",
        height: 40
    }}>
                    <react_native_1.Text style={{}}>特码A</react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity activeOpacity={1} onPress={function () {
        UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.subPlayPress, value: "特码B" });
        setLabel("特码B");
        setProps();
    }} style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: label == "特码B" ? "#e6e6e6" : "#dbdbdb",
        height: 40
    }}>
                    <react_native_1.Text style={{}}>特码B</react_native_1.Text>
                </react_native_1.TouchableOpacity>
            </react_native_1.View>
            <react_native_1.FlatList style={{ height: 40 }} keyExtractor={function (item, index) { return item + index; }} horizontal={true} data={lottoSetting_1.ShengXiaoTitle} renderItem={function (_a) {
        var item = _a.item;
        return (<react_native_1.TouchableWithoutFeedback onPress={function () {
            UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.shengXiaoPress, value: item });
            setProps();
        }}>
                        <react_native_1.View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 20,
            height: 40
        }}>
                            <react_native_1.Image style={{ width: 20, height: 20 }} source={{ uri: (selectedShengXiao === null || selectedShengXiao === void 0 ? void 0 : selectedShengXiao[item]) == shengXiaoValue[item].length ? "RadioButton-Selected" : "RadioButton-Unselected" }}/>
                            <react_native_1.Text>{item}</react_native_1.Text>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>);
    }}/>
        </react_native_1.View>
        <GameGroup label={label} setProps={setProps}/>
    </react_native_1.SafeAreaView>;
};
var GameGroup = function (_a) {
    var _b, _c;
    var _d = _a.label, label = _d === void 0 ? "特码A" : _d, setProps = _a.setProps;
    var currentPlayOdd = UGStore_1.UGStore.globalProps.BettingReducer.currentPlayOdd;
    return (<react_native_1.ScrollView style={{}}>
            {(_c = (_b = currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.playGroups) === null || _b === void 0 ? void 0 : _b.filter(function (res) { var _a; return (_a = res === null || res === void 0 ? void 0 : res.alias) === null || _a === void 0 ? void 0 : _a.includes(label); })) === null || _c === void 0 ? void 0 : _c.map(function (res, index) {
        switch (index) {
            case 0:
                return <HKBallsView_1.default setProps={setProps} key={res.id + index} data={res}/>;
            case 1:
                return <HKNormalItemView_1.default setProps={setProps} key={res.id + index} data={res}/>;
            case 2:
                return <HKSBItemView_1.default setProps={setProps} key={res.id + index} data={res}/>;
            default:
                break;
        }
    })}
        </react_native_1.ScrollView>);
};
exports.default = TMPlayView;
