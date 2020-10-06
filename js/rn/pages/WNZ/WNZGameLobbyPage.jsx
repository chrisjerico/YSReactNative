"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var PushHelper_1 = require("../../public/define/PushHelper");
var Enum_1 = require("../../public/models/Enum");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var WNZThemeColor_1 = require("../../public/theme/colors/WNZThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var tars_1 = require("../../public/tools/tars");
var BannerBlock_1 = require("../../public/views/tars/BannerBlock");
var BottomGap_1 = require("../../public/views/tars/BottomGap");
var GameButton_1 = require("../../public/views/tars/GameButton");
var List_1 = require("../../public/views/tars/List");
var MineHeader_1 = require("../../public/views/tars/MineHeader");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var TouchableImage_1 = require("../../public/views/tars/TouchableImage");
var UGStore_1 = require("../../redux/store/UGStore");
var WNZGameLobbyPage = function (_a) {
    var route = _a.route;
    var _b, _c;
    var title = ((_b = route === null || route === void 0 ? void 0 : route.params) !== null && _b !== void 0 ? _b : { title: '棋牌游戏' }).title;
    var gameLobby = UGStore_1.UGStore.globalProps.gameLobby;
    var banner = UGStore_1.UGStore.globalProps.banner;
    var bannersInterval = tars_1.stringToNumber(banner === null || banner === void 0 ? void 0 : banner.interval);
    var banners = (_c = banner === null || banner === void 0 ? void 0 : banner.list) !== null && _c !== void 0 ? _c : [];
    var item = gameLobby === null || gameLobby === void 0 ? void 0 : gameLobby.find(function (item) { return title.includes(item === null || item === void 0 ? void 0 : item.categoryName); });
    var _d = item !== null && item !== void 0 ? item : {}, games = _d.games, categoryName = _d.categoryName;
    return (<>
      <SafeAreaHeader_1.default headerColor={WNZThemeColor_1.WNZThemeColor.威尼斯.themeColor}>
        <MineHeader_1.default showBackBtn={true} onPressBackBtn={function () {
        OCHelper_1.OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]).then(function () {
            RootNavigation_1.navigate(Navigation_1.PageName.WNZHomePage, {});
        });
    }} title={title}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView showsVerticalScrollIndicator={false}>
        <BannerBlock_1.default containerStyle={{ aspectRatio: 540 / 230 }} badgeStyle={{ top: Scale_1.scale(-230) }} autoplayTimeout={bannersInterval} showOnlineNum={false} showsPagination={false} banners={banners} renderBanner={function (item, index) {
        var linkCategory = item.linkCategory, linkPosition = item.linkPosition, pic = item.pic;
        return (<TouchableImage_1.default key={index} pic={pic} resizeMode={'stretch'} onPress={function () {
            PushHelper_1.default.pushCategory(linkCategory, linkPosition);
        }}/>);
    }}/>
        <List_1.default uniqueKey={'WNZGameLobbyPage' + title} style={{ marginTop: Scale_1.scale(45) }} data={games} numColumns={4} renderItem={function (_a) {
        var item = _a.item;
        var title = item.title, pic = item.pic, id = item.id;
        return (<GameButton_1.default title={title} enableCircle={false} logo={pic} containerStyle={{ width: '25%', marginBottom: Scale_1.scale(20) }} imageContainerStyle={{ width: '60%' }} showSubTitle={false} titleContainerStyle={{ aspectRatio: 2.5 }} titleStyle={{ fontSize: Scale_1.scale(20), fontWeight: '300' }} onPress={function () {
            PushHelper_1.default.pushHomeGame(Object.assign({}, item, {
                seriesId: Enum_1.SeriesId[categoryName],
                gameId: id,
                subId: id,
            }));
        }}/>);
    }}/>
        <BottomGap_1.default />
      </react_native_1.ScrollView>
    </>);
};
exports.default = WNZGameLobbyPage;
