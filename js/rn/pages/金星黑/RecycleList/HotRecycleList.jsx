"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewTypes = void 0;
var react_1 = require("react");
var hooks_1 = require("@react-native-community/hooks");
var recyclerlistview_1 = require("recyclerlistview");
var Hot1x1Cell_1 = require("../cell/Hot1x1Cell");
var Hot2x1Cell_1 = require("../cell/Hot2x1Cell");
var hotData_1 = require("../dataConfig.ts/hotData");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var Navigation_1 = require("../../../public/navigation/Navigation");
var UGStore_1 = require("../../../redux/store/UGStore");
var ViewTypes;
(function (ViewTypes) {
    ViewTypes[ViewTypes["2x1"] = 0] = "2x1";
    ViewTypes[ViewTypes["1x1L"] = 1] = "1x1L";
    ViewTypes[ViewTypes["1x1R"] = 2] = "1x1R";
})(ViewTypes = exports.ViewTypes || (exports.ViewTypes = {}));
var dataProvider = new recyclerlistview_1.DataProvider(function (r1, r2) {
    return r1 !== r2;
});
var HotRecycleList = function (_a) {
    var homeGames = _a.homeGames;
    var _b = hooks_1.useDimensions().screen, width = _b.width, height = _b.height;
    var _c = UGStore_1.UGStore.globalProps.userInfo, _d = _c.isTest, isTest = _d === void 0 ? false : _d, _e = _c.uid, uid = _e === void 0 ? "" : _e;
    var thirdPartGamePress = function (id, gameID) {
        if (uid != "") {
            console.log(homeGames.data.icons);
            var result = homeGames.data.icons.filter(function (res) { return res.id == id; });
            if (gameID && result.length > 0) {
                var gameData = result[0].list.filter(function (res) { return res.id == gameID; });
                //@ts-ignore
                PushHelper.pushHomeGame(gameData[0]);
            }
            else if (!gameID && result.length > 0) {
            }
            else {
            }
        }
        else {
            RootNavigation_1.push(Navigation_1.PageName.ZLLoginPage);
        }
    };
    var _layoutProvider = new recyclerlistview_1.LayoutProvider(function (index) {
        switch (index) {
            case 0:
            case 3:
            case 4:
            case 7:
                return ViewTypes["2x1"];
                break;
            case 1:
            case 5:
                return ViewTypes["1x1L"];
            case 2:
            case 6:
                return ViewTypes["1x1R"];
            default:
                return ViewTypes["2x1"];
                break;
        }
    }, function (type, dim) {
        switch (type) {
            case ViewTypes["2x1"]:
                dim.width = width - 10;
                dim.height = 134;
                break;
            case ViewTypes["1x1L"]:
            case ViewTypes["1x1R"]:
                dim.width = ((width - 20) / 2);
                dim.height = 114;
                break;
                dim.width = 0;
                dim.height = 0;
        }
    });
    var _rowRenderer = function (type, data) {
        switch (type) {
            case ViewTypes["1x1R"]:
            case ViewTypes["1x1L"]:
                return (<Hot1x1Cell_1.default homeGames={homeGames} thirdPartGamePress={thirdPartGamePress} data={data} type={type}/>);
            case ViewTypes["2x1"]:
                return (<Hot2x1Cell_1.default homeGames={homeGames} thirdPartGamePress={thirdPartGamePress} data={data}/>);
            default:
                return null;
        }
    };
    return (<recyclerlistview_1.RecyclerListView scrollViewProps={{
        scrollEnabled: false
    }} layoutProvider={_layoutProvider} dataProvider={dataProvider.cloneWithRows(hotData_1.hotData)} rowRenderer={_rowRenderer}/>);
};
exports.default = HotRecycleList;
