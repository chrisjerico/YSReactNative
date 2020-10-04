"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var HotRecycleList_1 = require("../RecycleList/HotRecycleList");
var react_native_fast_image_1 = require("react-native-fast-image");
var PushHelper_1 = require("../../../public/define/PushHelper");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
var Hot1x1Cell = function (_a) {
    var type = _a.type, data = _a.data, thirdPartGamePress = _a.thirdPartGamePress, homeGames = _a.homeGames;
    var onPress = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        var index = (_b = (_a = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _a === void 0 ? void 0 : _a.icons) === null || _b === void 0 ? void 0 : _b.findIndex(function (res) { return res.id == data.id; });
        var subIndex = (_e = (_d = (_c = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _c === void 0 ? void 0 : _c.icons) === null || _d === void 0 ? void 0 : _d[index]) === null || _e === void 0 ? void 0 : _e.list.findIndex(function (res) { return res.title == data.child[0].title; });
        if (index != -1 && subIndex != -1) {
            PushHelper_1.default.pushHomeGame((_h = (_g = (_f = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _f === void 0 ? void 0 : _f.icons) === null || _g === void 0 ? void 0 : _g[index]) === null || _h === void 0 ? void 0 : _h.list[subIndex]);
        }
        else {
            OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', ['查无游戏']);
        }
    };
    return (<react_native_1.View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, marginRight: type == HotRecycleList_1.ViewTypes["1x1L"] ? 10 : 0, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
      <react_native_1.View style={{ flexDirection: 'column', paddingVertical: 20, }}>
        <react_native_1.Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{data.title}</react_native_1.Text>
        <react_native_1.Text onPress={onPress} style={{ color: "#676767", marginBottom: 10, marginRight: 5 }}>{data.child[0].title}</react_native_1.Text>
      </react_native_1.View>
      <react_native_fast_image_1.default resizeMode={'contain'} source={{ uri: data.image }} style={{ width: 67, height: 104, }}/>

    </react_native_1.View>);
};
exports.default = Hot1x1Cell;
