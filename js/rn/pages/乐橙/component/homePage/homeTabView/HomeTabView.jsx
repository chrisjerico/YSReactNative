"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeTabView = void 0;
var react_native_scrollable_tab_view_1 = require("react-native-scrollable-tab-view");
var React = require("react");
var react_1 = require("react");
var RecommendTabView_1 = require("./recommendTab/RecommendTabView");
var LotteryTabView_1 = require("./lotteyTab/LotteryTabView");
var GameListView_1 = require("./lotteyTab/GameListView");
var useGetHomeInfo_1 = require("../../../../../public/hooks/useGetHomeInfo");
var react_native_1 = require("react-native");
var UGStore_1 = require("../../../../../redux/store/UGStore");
var PushHelper_1 = require("../../../../../public/define/PushHelper");
exports.HomeTabView = function () {
    var homeGames = useGetHomeInfo_1.default().homeGames;
    var _a = react_1.useState([]), games = _a[0], setGames = _a[1];
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _b = userStore.uid, uid = _b === void 0 ? "" : _b;
    react_1.useEffect(function () {
        if (homeGames && homeGames.data && homeGames.data.icons) {
            var index = homeGames.data.icons.findIndex(function (item) { return item.name.indexOf("推荐") != -1 || item.name.indexOf("热门") != -1; });
            var arr = [];
            index != -1 && arr.push(homeGames.data.icons[index]);
            arr = arr.concat(homeGames.data.icons.filter(function (item) { return item.name.indexOf("推荐") == -1 && item.name.indexOf("热门") == -1; }));
            setGames(arr);
        }
    }, [homeGames]);
    var thirdPartGamePress = function (id, gameID) {
        if (uid != "") {
            var result = homeGames.data.icons.filter(function (res) { return res.id == id; });
            if (gameID && result.length > 0) {
                var gameData = result[0].list.filter(function (res) { return res.id == gameID; });
                //@ts-ignore
                PushHelper_1.default.pushHomeGame(gameData[0]);
            }
            else if (!gameID && result.length > 0) {
            }
            else {
            }
        }
        else {
            PushHelper_1.default.pushLogin();
        }
    };
    var getTab = function (item) {
        return item.name.indexOf("推荐") != -1 || item.name.indexOf("热门") != -1 ?
            <RecommendTabView_1.RecommendTabView thirdPartGamePress={thirdPartGamePress} list={item.list} tabLabel="推荐"/> :
            item.name.indexOf("彩票") != -1 ?
                <LotteryTabView_1.LotteryTabView thirdPartGamePress={thirdPartGamePress} list={item.list} tabLabel="彩票"/> :
                <GameListView_1.GameListView list={item.list} thirdPartGamePress={thirdPartGamePress} tabLabel={item.name}/>;
    };
    return (<react_native_scrollable_tab_view_1.default tabBarUnderlineStyle={{ height: 2, backgroundColor: "#3c3c3c" }} tabBarTextStyle={{ color: "#3c3c3c" }} style={[{ marginHorizontal: 10, backgroundColor: "#ffffff", borderRadius: 10, flex: 1 }]} renderTabBar={function () { return <react_native_scrollable_tab_view_1.ScrollableTabBar />; }}>
            {games.length > 0 ? games.map(function (item) {
        return getTab(item);
    }) : <react_native_1.View />}
        </react_native_scrollable_tab_view_1.default>);
};
