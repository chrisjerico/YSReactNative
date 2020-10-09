"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeTabView = void 0;
var react_native_scrollable_tab_view_1 = __importStar(require("react-native-scrollable-tab-view"));
var React = __importStar(require("react"));
var react_1 = require("react");
var react_native_1 = require("react-native");
var useGetHomeInfo_1 = __importDefault(require("../../../../public/hooks/useGetHomeInfo"));
var LotteryTabView_1 = require("./lotteyTab/LotteryTabView");
var GameListView_1 = require("./lotteyTab/GameListView");
var RecommendTabView_1 = require("./recommendTab/RecommendTabView");
var removeHTMLTag_1 = require("../../../../public/tools/removeHTMLTag");
exports.HomeTabView = function () {
    var _a = useGetHomeInfo_1.default(), homeGames = _a.homeGames, notice = _a.notice, banner = _a.banner, onlineNum = _a.onlineNum;
    var _b = react_1.useState(775), height = _b[0], setHeight = _b[1];
    var _c = react_1.useState([]), games = _c[0], setGames = _c[1];
    var _d = react_1.useState([]), marquee = _d[0], setMarquee = _d[1];
    var _e = react_1.useState([]), gamesIndex = _e[0], setGamesIndex = _e[1];
    react_1.useEffect(function () {
        notice && getMarquee();
    }, [notice]);
    var getMarquee = function () {
        var arr = [];
        notice && notice.data && notice.data.scroll.map(function (item, index) {
            arr.push({ label: index, value: removeHTMLTag_1.removeHTMLTag(item.content) });
        });
        setMarquee(arr);
    };
    react_1.useEffect(function () {
        if (homeGames && homeGames.data && homeGames.data.icons) {
            var index = homeGames.data.icons.findIndex(function (item) { return item.name.indexOf("推荐") != -1 || item.name.indexOf("热门") != -1; });
            var arr = [];
            index != -1 && arr.push(homeGames.data.icons[index]);
            arr = arr.concat(homeGames.data.icons.filter(function (item) { return item.name.indexOf("推荐") == -1 && item.name.indexOf("热门") == -1; }));
            setGames(arr);
            var indexs_1 = [];
            arr.map(function (item) {
                return indexs_1.push(item.name);
            });
            setGamesIndex(indexs_1);
        }
    }, [homeGames]);
    var getTab = function (item, index) {
        return index == 0 ?
            React.createElement(RecommendTabView_1.RecommendTabView, { banner: banner, list: item.list, marquee: marquee, onlineNum: onlineNum, tabLabel: "\u7CBE\u9009" }) :
            item.name.indexOf("彩票") != -1 ?
                React.createElement(LotteryTabView_1.LotteryTabView, { list: item.list, tabLabel: "\u5F69\u7968" }) :
                React.createElement(GameListView_1.GameListView, { list: item.list, tabLabel: item.name });
    };
    var calculateHeight = function (i) {
        i == 0 ?
            setHeight(825) :
            gamesIndex[i].indexOf("彩票") != -1 ?
                setHeight(Math.ceil(games[i].list.length / 4) * 95 + 50) :
                setHeight(Math.ceil(games[i].list.length / 2) * 125 + 50);
    };
    return (React.createElement(React.Fragment, null, (games === null || games === void 0 ? void 0 : games.length) > 0 &&
        React.createElement(react_native_scrollable_tab_view_1.default, { onChangeTab: function (_a) {
                var i = _a.i;
                return calculateHeight(i);
            }, tabBarUnderlineStyle: { height: 2, backgroundColor: "red" }, tabBarTextStyle: { color: "#666666", fontWeight: "bold" }, style: [{ flex: 1, height: height }], renderTabBar: function () { return React.createElement(react_native_scrollable_tab_view_1.ScrollableTabBar, { style: { backgroundColor: "#ffffff" } }); } }, games.length > 0 ? games.map(function (item, index) {
            return getTab(item, index);
        }) : React.createElement(react_native_1.View, null))));
};
//# sourceMappingURL=HomeTabView.js.map