"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var TabComponent_1 = require("../../public/components/tars/TabComponent");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var PushHelper_1 = require("../../public/define/PushHelper");
var Enum_1 = require("../../public/models/Enum");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var BZHThemeColor_1 = require("../../public/theme/colors/BZHThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var BottomGap_1 = require("../../public/views/tars/BottomGap");
var GameButton_1 = require("../../public/views/tars/GameButton");
var List_1 = require("../../public/views/tars/List");
var MineHeader_1 = require("../../public/views/tars/MineHeader");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var UGStore_1 = require("../../redux/store/UGStore");
var BZHGameLobbyPage = function (_a) {
    var route = _a.route;
    var _b;
    var gameLobby = UGStore_1.UGStore.globalProps.gameLobby;
    var initialTabIndex = ((_b = route === null || route === void 0 ? void 0 : route.params) !== null && _b !== void 0 ? _b : {}).initialTabIndex;
    return (<>
      <GameLobbyPageHeader />
      <react_native_1.ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TabComponent_1.default containerStyle={{
        marginVertical: Scale_1.scale(10),
    }} numColumns={3} initialTabIndex={initialTabIndex ? initialTabIndex : 0} baseHeight={Scale_1.scale(130)} itemHeight={Scale_1.scale(130)} tabGames={gameLobby} focusTabColor={BZHThemeColor_1.BZHThemeColor.宝石红.themeColor} tabTextStyle={{ fontSize: Scale_1.scale(20) }} renderScene={function (_a) {
        var item = _a.item, tab = _a.tab, index = _a.index;
        return (<List_1.default uniqueKey={'BZHGameLobbyPage' + index.toString()} style={{
            backgroundColor: '#ffffff',
            marginTop: Scale_1.scale(10),
            marginHorizontal: Scale_1.scale(10),
            borderRadius: Scale_1.scale(5),
        }} contentContainerStyle={{
            paddingTop: Scale_1.scale(45),
            width: '100%',
        }} numColumns={3} data={item} renderItem={function (_a) {
            var item = _a.item;
            var title = item.title, pic = item.pic, id = item.id;
            return (<GameButton_1.default key={index} resizeMode={'contain'} containerStyle={styles.gameContainer} imageContainerStyle={{ width: '35%' }} enableCircle={false} logo={pic} title={title} showSubTitle={false} titleStyle={{
                fontSize: Scale_1.scale(18),
            }} titleContainerStyle={{
                aspectRatio: 2.8,
            }} onPress={function () {
                return PushHelper_1.default.pushHomeGame(Object.assign({}, item, {
                    seriesId: Enum_1.SeriesId[tab],
                    gameId: id,
                    subId: id,
                }));
            }}/>);
        }}/>);
    }}/>
        <BottomGap_1.default />
      </react_native_1.ScrollView>
    </>);
    //}
};
var GameLobbyPageHeader = function () { return (<SafeAreaHeader_1.default headerColor={BZHThemeColor_1.BZHThemeColor.宝石红.themeColor}>
    <MineHeader_1.default showBackBtn={true} onPressBackBtn={function () {
    OCHelper_1.OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]).then(function () {
        RootNavigation_1.navigate(Navigation_1.PageName.BZHHomePage, {});
    });
}} showRightTitle={false} title={'游戏大厅'}/>
  </SafeAreaHeader_1.default>); };
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BZHThemeColor_1.BZHThemeColor.宝石红.homeContentSubColor,
    },
    gameContainer: {
        width: '33.3%',
        height: Scale_1.scale(130),
        alignSelf: 'center',
    },
});
exports.default = BZHGameLobbyPage;
