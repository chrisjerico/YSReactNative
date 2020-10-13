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
var AppDefine_1 = require("../../../../../public/define/AppDefine");
exports.HomeTabView = function () {
    var _a;
    var homeGames = useGetHomeInfo_1.default().homeGames;
    var _b = react_1.useState([]), games = _b[0], setGames = _b[1];
    var _c = react_1.useState(77), height = _c[0], setHeight = _c[1];
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _d = userStore.uid, uid = _d === void 0 ? '' : _d;
    react_1.useEffect(function () {
        var _a, _b;
        ((_a = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _a === void 0 ? void 0 : _a.icons) && setGames(homeGames.data.icons);
        ((_b = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _b === void 0 ? void 0 : _b.icons) && calculateHeight(0);
    }, [homeGames]);
    var thirdPartGamePress = function (id, gameID) {
        if (uid != '') {
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
    var calculateHeight = function (index) {
        var _a, _b;
        var h = 56;
        var list = ((_a = games[index]) === null || _a === void 0 ? void 0 : _a.list) ? (_b = games[index]) === null || _b === void 0 ? void 0 : _b.list : [];
        if (index == 0) {
            h = h + 135;
            if (list[0]) {
                h = h + 153;
            }
            if (list[1]) {
                h = h + 117;
            }
            h = h + Math.ceil((list.length - 3) / 2) * 110;
        }
        else if (index == 1) {
            if (list.length > 1) {
                h = h + 108;
            }
            if (list.length > 2) {
                h = h + 28.3;
                h = h + Math.ceil((list.length - 2) / 3) * 100;
            }
        }
        else {
            h = list.length >= 2 ? Math.ceil(list.length / 2) * 125 + h : h;
        }
        setHeight(h);
    };
    var onPress = function (list) {
        var _a;
        list.seriesId != '1'
            ? thirdPartGamePress(list.seriesId, list.gameId)
            : list.gameId
                ? PushHelper_1.default.pushCategory(list.seriesId, list.gameId)
                : PushHelper_1.default.pushCategory(list.seriesId, (_a = list.subType[0]) === null || _a === void 0 ? void 0 : _a.gameId);
    };
    var getTab = function (item, index) {
        return index == 0 ? (<RecommendTabView_1.RecommendTabView onPress={onPress} list={item.list} tabLabel={item.name}/>) : index == 1 ? (<LotteryTabView_1.LotteryTabView onPress={onPress} list={item.list} tabLabel={item.name}/>) : (<GameListView_1.GameListView list={item.list} onPress={onPress} tabLabel={item.name}/>);
    };
    return ((_a = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _a === void 0 ? void 0 : _a.icons) ? (<react_native_scrollable_tab_view_1.default onChangeTab={function (_a) {
        var i = _a.i;
        return calculateHeight(i);
    }} tabBarUnderlineStyle={{ height: 2, backgroundColor: '#3c3c3c' }} tabBarTextStyle={{ color: '#3c3c3c' }} style={{
        height: height,
        marginTop: 8,
        marginHorizontal: 10,
        backgroundColor: '#ffffff',
        borderRadius: 16,
    }} renderTabBar={function (props) { return (<react_native_1.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false} style={{
        height: 56,
        flexDirection: 'row',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    }}>
          {props.tabs.map(function (name, page) {
        var isTabActive = props.activeTab === page;
        var textColor = isTabActive ? '#000000' : '#555';
        var backgroundColor = '#fff';
        return (<react_native_1.TouchableWithoutFeedback key={page} onPress={function () { return props.goToPage(page); }}>
                <react_native_1.View style={{
            backgroundColor: backgroundColor,
            width: AppDefine_1.default.width / 5,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
                  <react_native_1.View style={{
            borderBottomWidth: 2,
            borderBottomColor: isTabActive ? '#000000' : '#fff',
        }}>
                    <react_native_1.Text style={[{ color: textColor, marginVertical: 8, fontSize: 16 }]}>{name}</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>
              </react_native_1.TouchableWithoutFeedback>);
    })}
        </react_native_1.ScrollView>); }}>
      {games.length > 0 ? (games.map(function (item, index) {
        return getTab(item, index);
    })) : (<react_native_1.View />)}
    </react_native_scrollable_tab_view_1.default>) : null;
};
