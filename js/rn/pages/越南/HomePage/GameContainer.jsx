"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var hooks_1 = require("@react-native-community/hooks");
var react_native_1 = require("react-native");
var PushHelper_1 = require("../../../public/define/PushHelper");
var react_native_fast_image_1 = require("react-native-fast-image");
var HomeConfig_1 = require("./HomeConfig");
var TabContainer = function (_a) {
    var _b, _c, _d, _e, _f;
    var data = _a.data, filter = _a.filter, homeGames = _a.homeGames;
    var width = hooks_1.useDimensions().screen.width;
    var people = react_1.useMemo(function () { return (Math.random() * 400 + 200).toFixed(0); }, []);
    return (<react_native_1.FlatList style={{ flex: 1 }} scrollEnabled={false} renderItem={function (_a) {
        var item = _a.item;
        return (<react_native_1.TouchableOpacity onPress={function () {
            PushHelper_1.default.pushHomeGame(item);
        }} style={{ width: (width - 20) / 2 }}>
          <react_native_1.View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
            <react_native_fast_image_1.default source={{ uri: item === null || item === void 0 ? void 0 : item.logo }} style={{ width: 65, aspectRatio: 1, }}/>
            <react_native_1.View style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#f2f2f2", paddingBottom: 20, marginLeft: 6, alignItems: 'flex-end', justifyContent: 'space-between', width: width - 130 }}>
              <react_native_1.View style={{ flexDirection: 'column', }}>
                <react_native_1.Text style={{ color: "#3b3b3b", fontSize: 18, marginVertical: 10, width: '50%' }}>{item.name}</react_native_1.Text>
                {HomeConfig_1.seriesId[item.seriesId] ? <react_native_1.Text style={{ color: "#8a8d96", fontSize: 12 }}>{HomeConfig_1.seriesId[item.seriesId]} |  </react_native_1.Text> : null}
                <react_native_1.Text style={{ color: "#fb9608", fontWeight: "bold" }}>{people}人在玩</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={{ width: 86, height: 28, borderRadius: 16, backgroundColor: "#71abff", justifyContent: 'center', alignItems: 'center' }}>
                <react_native_1.Text style={{ color: 'white' }}>进入游戏</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>

        </react_native_1.TouchableOpacity>);
    }} data={(_f = (_e = (_d = (_c = (_b = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _b === void 0 ? void 0 : _b.icons) === null || _c === void 0 ? void 0 : _c.filter(function (res) { return res.id == filter; })) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.list) !== null && _f !== void 0 ? _f : []}/>);
};
exports.default = TabContainer;
