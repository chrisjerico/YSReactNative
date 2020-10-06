"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var UGStore_1 = require("../../../../../../redux/store/UGStore");
var HKBallsView_1 = require("../HKBallsView");
var HKNormalWithSBView_1 = require("../HKNormalWithSBView");
var ZTContainer = function () {
    var currentPlayOdd = UGStore_1.UGStore.globalProps.BettingReducer.currentPlayOdd;
    react_1.useEffect(function () {
        var playsStringArray = [];
        currentPlayOdd.playGroups.map(function (res) {
            playsStringArray.push(res.alias.slice(0, 3));
        });
        setPlays(playsStringArray.filter(function (res, index) { return playsStringArray.indexOf(res) === index; }));
        setCurrentFilter(playsStringArray[0]);
    }, [currentPlayOdd]);
    //玩法列表
    var _a = react_1.useState([]), plays = _a[0], setPlays = _a[1];
    var _b = react_1.useState(""), currentFilter = _b[0], setCurrentFilter = _b[1];
    return (<react_native_1.ScrollView style={{ flex: 1 }}>
      <react_native_1.View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <react_native_1.FlatList horizontal={true} style={{}} keyExtractor={function (item) { return item; }} data={plays} renderItem={function (_a) {
        var item = _a.item;
        return <react_native_1.TouchableWithoutFeedback onPress={function () {
            setCurrentFilter(item);
        }}>
            <react_native_1.Text style={{ marginLeft: 27, marginTop: 20, marginBottom: 10, fontSize: 14, color: currentFilter == item ? "blue" : "black" }}>{item}</react_native_1.Text>
          </react_native_1.TouchableWithoutFeedback>;
    }}/>
      </react_native_1.View>
      {currentPlayOdd.playGroups.filter(function (res) { return res.alias.includes(currentFilter); }).map(function (res, index) {
        if (index == 0) {
            return <HKBallsView_1.default key={res.id + index} data={res}/>;
        }
        else {
            return <HKNormalWithSBView_1.default key={res.id + index} data={res}/>;
        }
    })}
    </react_native_1.ScrollView>);
};
exports.default = ZTContainer;
