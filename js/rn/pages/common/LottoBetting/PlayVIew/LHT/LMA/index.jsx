"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var react_1 = require("react");
var hooks_1 = require("@react-native-community/hooks");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var lottoSetting_1 = require("../../lottoSetting");
var BettingReducer_1 = require("../../../../../../redux/reducer/BettingReducer");
var itemSize = 40;
var LMAContainer = function (_a) {
    var setProps = _a.setProps;
    var _b = UGStore_1.UGStore.globalProps.BettingReducer, currentPlayOdd = _b.currentPlayOdd, subPlay = _b.subPlay;
    var _c = react_1.useState([]), plays = _c[0], setPlays = _c[1];
    var _d = react_1.useState(""), currentFilter = _d[0], setCurrentFilter = _d[1];
    var width = hooks_1.useDimensions().screen.width;
    var _e = react_1.useState(""), currentOdd = _e[0], setCurrentOdd = _e[1];
    react_1.useEffect(function () {
        var playsStringArray = [];
        currentPlayOdd.playGroups.map(function (res) {
            playsStringArray.push(res.alias.slice(0, 3));
        });
        setPlays(playsStringArray.filter(function (res, index) { return playsStringArray.indexOf(res) === index; }));
        setCurrentFilter(playsStringArray[0]);
    }, [currentPlayOdd]);
    react_1.useEffect(function () {
        var _a, _b, _c, _d;
        var result = currentPlayOdd.playGroups.filter(function (res) { return res.alias.slice(0, 3) == currentFilter; });
        if (result.length > 0) {
            setCurrentOdd((_d = (_c = (_b = (_a = result[0]) === null || _a === void 0 ? void 0 : _a.plays) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.odds.replace("00", "").replace(".00", "")) !== null && _d !== void 0 ? _d : "");
        }
        UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.cleanBetGroupResult });
    }, [currentFilter]);
    //玩法列表
    return (<react_native_1.ScrollView style={{ flex: 1 }}>
            <react_native_1.View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <react_native_1.FlatList showsHorizontalScrollIndicator={false} horizontal={true} style={{}} keyExtractor={function (item) { return item; }} data={plays !== null && plays !== void 0 ? plays : []} renderItem={function (_a) {
        var item = _a.item;
        return <react_native_1.TouchableWithoutFeedback onPress={function () {
            setCurrentFilter(item);
        }}>
                                  <react_native_1.Text style={{
            paddingHorizontal: 12,
            paddingTop: 20,
            paddingBottom: 10,
            fontSize: 14,
            backgroundColor: currentFilter == item ? "#e6e6e6" : "#dbdbdb",
        }}>{item}</react_native_1.Text>
                              </react_native_1.TouchableWithoutFeedback>;
    }}/>
            </react_native_1.View>
            <react_native_1.Text style={{
        textAlign: 'center',
        paddingVertical: 10,
        color: "#c8222f",
        backgroundColor: "#eee"
    }}>{currentFilter}</react_native_1.Text>
            <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {Array.from({ length: 49 }).map(function (res, index) { return index + 1; }).map(function (res, index) {
        if (index < 45) {
            return (<react_native_1.TouchableWithoutFeedback onPress={function () {
                UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.itemPress, value: res });
                setProps && setProps();
            }}>
                                <react_native_1.View key={index} style={{
                width: ((width / 4 * 3) - 5) / 3,
                borderWidth: 1,
                borderColor: '#444',
                height: itemSize
            }}>
                                    <react_native_1.View style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#444',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: "#00000000"
            }}>
                                        <react_native_1.View style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                borderColor: lottoSetting_1.getHKballColor(res < 10 ? "0" + res : res.toString()),
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5
            }}>
                                            <react_native_1.Text>{res < 10 ? "0" + res : res.toString()}</react_native_1.Text>
                                        </react_native_1.View>
                                        <react_native_1.Text>{currentOdd}</react_native_1.Text>
                                    </react_native_1.View>
                                </react_native_1.View>
                            </react_native_1.TouchableWithoutFeedback>);
        }
        else {
            return (<react_native_1.TouchableWithoutFeedback onPress={function () {
                UGStore_1.UGStore.dispatch({ type: BettingReducer_1.BettingReducerActions.itemGroupPress, value: res });
                setProps && setProps();
            }}>
                                <react_native_1.View key={index} style={{
                width: ((width / 4 * 3) - 5) / 2,
                borderWidth: 1,
                borderColor: '#444',
                height: itemSize
            }}>
                                    <react_native_1.View style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#444',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: "#00000000"
            }}>
                                        <react_native_1.View style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                borderColor: lottoSetting_1.getHKballColor(res < 10 ? "0" + res : res.toString()),
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 5
            }}>
                                            <react_native_1.Text>{res < 10 ? "0" + res : res.toString()}</react_native_1.Text>
                                        </react_native_1.View>
                                        <react_native_1.Text>{currentOdd}</react_native_1.Text>
                                    </react_native_1.View>
                                </react_native_1.View>
                            </react_native_1.TouchableWithoutFeedback>);
        }
    })}
            </react_native_1.View>
        </react_native_1.ScrollView>);
};
exports.default = LMAContainer;
