"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var react_1 = require("react");
var Ext_1 = require("../../../public/tools/Ext");
var react_native_super_grid_1 = require("react-native-super-grid");
var PushHelper_1 = require("../../../public/define/PushHelper");
var UGThemeColor_1 = require("../../../public/theme/UGThemeColor");
var UGSkinManagers_1 = require("../../../public/theme/UGSkinManagers");
/**
 * 主页游戏列表
 */
var HomeGameComponent = /** @class */ (function (_super) {
    __extends(HomeGameComponent, _super);
    function HomeGameComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 切换tab
         * @param index
         * @private
         */
        _this._changeTab = function (index) {
            _this.setState({
                gameTabIndex: index,
            });
        };
        return _this;
    }
    // 点击了游戏图标
    HomeGameComponent.prototype.didGameItemClick = function (item) {
        // Todo 安卓
        PushHelper_1.default.pushHomeGame(item);
    };
    /**
     * 绘制 彩票、游戏、视讯 等等内容
     * @private
     */
    HomeGameComponent.prototype._renderGames = function () {
        var _this = this;
        var _a, _b, _c;
        var games = (_a = this.props.reducerData) === null || _a === void 0 ? void 0 : _a.icons;
        if (Ext_1.arrayEmpty(games))
            return null;
        var gameTabIndex = (_c = (_b = this.state) === null || _b === void 0 ? void 0 : _b.gameTabIndex) !== null && _c !== void 0 ? _c : 0;
        var menuArr = games.map(function (item) {
            return {
                text: item.name,
                url: item.logo,
            };
        });
        var gameIcons = games[gameTabIndex].list;
        var tabHeight = 44; //每块高度
        var tabSpacing = 4; //间隙
        //game栏的总高度
        var gameContainerHeight = menuArr.length * (tabHeight + tabSpacing);
        return (<react_native_1.View style={[_styles.gameContainer, { height: gameContainerHeight }]} key="_renderGames">
        
        <react_native_1.View>
          {menuArr.map(function (item, index) {
            return (<react_native_1.TouchableOpacity key={index} onPress={function () {
                _this._changeTab(index);
            }}>
                <react_native_1.View style={[
                _styles.gameHeightLeftTab,
                {
                    backgroundColor: gameTabIndex == index ? UGSkinManagers_1.Skin1.themeColor : UGThemeColor_1.UGColor.placeholderColor2,
                    marginTop: tabSpacing,
                    height: tabHeight,
                },
            ]}>
                  <react_native_1.Image source={{ uri: item.url }} style={[_styles.gameHeightLeftIcon, { tintColor: gameTabIndex == index ? 'white' : UGSkinManagers_1.Skin1.themeColor }]}/>
                  <react_native_1.Text style={[_styles.gameHeightLeftText, { color: gameTabIndex == index ? 'white' : UGSkinManagers_1.Skin1.themeColor }]}>{item.text}</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.TouchableOpacity>);
        })}
        </react_native_1.View>
        
        <react_native_super_grid_1.FlatGrid showsVerticalScrollIndicator={false} onTouchStart={function () {
            _this.props.setScrollable(false);
        }} onTouchCancel={function () {
            _this.props.setScrollable(true);
        }} spacing={tabSpacing} style={_styles.flatGrid} itemContainerStyle={[_styles.gameHeightRightTab, { height: tabHeight, backgroundColor: UGThemeColor_1.UGColor.placeholderColor2 }]} items={gameIcons} renderItem={function (_a) {
            var item = _a.item;
            return (<react_native_1.TouchableOpacity onPress={function () {
                _this.didGameItemClick(item);
            }}>
              <react_native_1.Image style={_styles.gameHeightTabImage} source={{ uri: item.icon }} key={item.title}/>
            </react_native_1.TouchableOpacity>);
        }}/>
      </react_native_1.View>);
    };
    HomeGameComponent.prototype.render = function () {
        return this._renderGames();
    };
    return HomeGameComponent;
}(react_1.Component));
exports.default = HomeGameComponent;
var _styles = react_native_1.StyleSheet.create({
    //游戏彩票
    gameContainer: {
        flexDirection: 'row',
        paddingLeft: 16,
        paddingRight: 12,
    },
    gameHeightLeftTab: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    gameHeightLeftIcon: {
        width: 18,
        height: 18,
        marginRight: 4,
        resizeMode: 'contain',
    },
    gameHeightLeftText: {
        fontSize: 12,
    },
    gameHeightTabImage: {
        flex: 1,
        borderRadius: 4,
        resizeMode: 'stretch',
    },
    flatGrid: {
        marginTop: 0,
        padding: 0,
        margin: 0,
    },
    gameHeightRightTab: {
        borderRadius: 4,
        aspectRatio: 116 / 92,
    },
});
