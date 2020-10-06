"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_scrollable_tab_view_1 = require("react-native-scrollable-tab-view");
var AppDefine_1 = require("../../define/AppDefine");
var Scale_1 = require("../../tools/Scale");
var StringUtils_1 = require("../../tools/StringUtils");
exports.Scene = function (_a) {
    var data = _a.data, renderItem = _a.renderItem, containerStyle = _a.containerStyle;
    return <react_native_1.View style={[styles.scene, containerStyle]}>{data === null || data === void 0 ? void 0 : data.map(renderItem)}</react_native_1.View>;
};
var minTabWidth = Scale_1.scale(100);
var defaultTabHeight = Scale_1.scale(60);
var TabComponent = function (_a) {
    var _b = _a.tabGames, tabGames = _b === void 0 ? [] : _b, focusTabColor = _a.focusTabColor, _c = _a.baseHeight, baseHeight = _c === void 0 ? defaultTabHeight : _c, _d = _a.initialTabIndex, initialTabIndex = _d === void 0 ? 0 : _d, renderScene = _a.renderScene, tabTextStyle = _a.tabTextStyle, itemHeight = _a.itemHeight, containerStyle = _a.containerStyle, tabWidth = _a.tabWidth, tabStyle = _a.tabStyle, _e = _a.enableAutoScrollTab, enableAutoScrollTab = _e === void 0 ? true : _e, _f = _a.tabScrollEnabled, tabScrollEnabled = _f === void 0 ? true : _f, numColumns = _a.numColumns, renderTabBar = _a.renderTabBar;
    var getSceneHeight = function (index) {
        var _a, _b, _c, _d;
        var games = (_b = (_a = tabGames === null || tabGames === void 0 ? void 0 : tabGames[index]) === null || _a === void 0 ? void 0 : _a.list) !== null && _b !== void 0 ? _b : (_c = tabGames === null || tabGames === void 0 ? void 0 : tabGames[index]) === null || _c === void 0 ? void 0 : _c.games;
        if (games) {
            var gameCount = (_d = games === null || games === void 0 ? void 0 : games.length) !== null && _d !== void 0 ? _d : 0;
            var gameRow = Math.ceil(gameCount / numColumns);
            return itemHeight * gameRow + baseHeight;
        }
        else {
            return 0;
        }
    };
    var _g = react_1.useState(getSceneHeight(initialTabIndex)), height = _g[0], setHeight = _g[1];
    var scroll = react_1.useRef(null);
    var tabRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var _a;
        (_a = tabRef === null || tabRef === void 0 ? void 0 : tabRef.current) === null || _a === void 0 ? void 0 : _a.goToPage(initialTabIndex);
    }, [initialTabIndex]);
    var getTabCount = function () {
        var _a;
        return (_a = tabGames === null || tabGames === void 0 ? void 0 : tabGames.length) !== null && _a !== void 0 ? _a : 0;
    };
    var getTabWidth = function () {
        if (tabWidth) {
            return tabWidth;
        }
        var tabCount = getTabCount();
        var width = tabCount ? AppDefine_1.default.width / tabCount : 0;
        if (width < minTabWidth) {
            return minTabWidth;
        }
        else {
            return width;
        }
    };
    var changeIndex = function (_a) {
        var i = _a.i;
        var height = getSceneHeight(i);
        var x = getTabXPosition(i);
        setHeight(height);
        enableAutoScrollTab && scrollTabTo(x);
    };
    var getTabXPosition = function (index) {
        var width = getTabWidth();
        var tabCount = getTabCount();
        var maxWidth = width * tabCount;
        var windowsContainTab = AppDefine_1.default.width / width;
        var scrllToEndIndex = tabCount - windowsContainTab;
        var halfTab = windowsContainTab / 2;
        var tabIndex = index > scrllToEndIndex ? 2 * index - halfTab - scrllToEndIndex : index - halfTab - 1;
        var x = tabIndex * width;
        if (x >= maxWidth) {
            return maxWidth;
        }
        else if (x <= 0) {
            return 0;
        }
        else {
            return x;
        }
    };
    var scrollTabTo = function (x) {
        var _a;
        (_a = scroll === null || scroll === void 0 ? void 0 : scroll.current) === null || _a === void 0 ? void 0 : _a.scrollTo({
            x: x,
            y: 0,
            animated: true,
        });
    };
    var Scene = function (props) { return renderScene && renderScene(props); };
    return (<react_native_scrollable_tab_view_1.default ref={tabRef} tabBarBackgroundColor={'#ffffff'} style={[containerStyle, { height: height }]} onChangeTab={changeIndex} renderTabBar={function (props) {
        var activeTab = props.activeTab, goToPage = props.goToPage;
        return renderTabBar ? (renderTabBar({ activeTab: activeTab, goToPage: goToPage })) : (<react_native_1.ScrollView scrollEnabled={tabScrollEnabled} ref={scroll} horizontal={true} removeClippedSubviews={true} style={{ flexGrow: 0, backgroundColor: '#ffffff' }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} contentOffset={{ x: getTabXPosition(initialTabIndex), y: 0 }} scrollEventThrottle={5000} disableScrollViewPanResponder={true}>
            <react_native_1.View style={[{ height: defaultTabHeight, flexDirection: 'row' }, tabStyle]}>
              {tabGames === null || tabGames === void 0 ? void 0 : tabGames.map(function (item, index) {
            var _a, _b;
            var title = StringUtils_1.default.getInstance().deleteHtml((_b = (_a = item === null || item === void 0 ? void 0 : item.name) !== null && _a !== void 0 ? _a : item === null || item === void 0 ? void 0 : item.categoryName) !== null && _b !== void 0 ? _b : '');
            return (<react_native_1.TouchableWithoutFeedback key={index} onPress={function () {
                goToPage(index);
            }}>
                    <react_native_1.View style={{
                width: getTabWidth(),
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}>
                      <react_native_1.Text style={[
                styles.tabText,
                tabTextStyle,
                {
                    color: activeTab == index ? focusTabColor : '#000000',
                },
            ]}>
                        {title}
                      </react_native_1.Text>
                      <react_native_1.View style={[
                styles.focusBar,
                {
                    width: '50%',
                    backgroundColor: activeTab == index ? focusTabColor : 'transparent',
                },
            ]}/>
                    </react_native_1.View>
                  </react_native_1.TouchableWithoutFeedback>);
        })}
            </react_native_1.View>
          </react_native_1.ScrollView>);
    }}>
      {tabGames === null || tabGames === void 0 ? void 0 : tabGames.map(function (ele, index) {
        var _a, _b, _c, _d;
        var tab = (_b = (_a = ele === null || ele === void 0 ? void 0 : ele.name) !== null && _a !== void 0 ? _a : ele === null || ele === void 0 ? void 0 : ele.categoryName) !== null && _b !== void 0 ? _b : '';
        var item = (_d = (_c = ele === null || ele === void 0 ? void 0 : ele.list) !== null && _c !== void 0 ? _c : ele === null || ele === void 0 ? void 0 : ele.games) !== null && _d !== void 0 ? _d : [];
        return <Scene key={index} tabLabel={tab} item={item} index={index} tab={tab}/>;
    })}
    </react_native_scrollable_tab_view_1.default>);
};
var styles = react_native_1.StyleSheet.create({
    scene: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        paddingTop: Scale_1.scale(25),
        borderTopColor: '#d9d9d9',
        borderTopWidth: Scale_1.scale(1),
    },
    tabStyle: {
        backgroundColor: '#ffffff',
        height: Scale_1.scale(60),
        padding: 0,
        margin: 0,
    },
    focusedText: {
        color: '#46A3FF',
    },
    text: {
        color: '#000000',
    },
    focusBar: {
        height: Scale_1.scale(2),
        borderRadius: Scale_1.scale(100),
        marginTop: Scale_1.scale(5),
        backgroundColor: '#ffffff',
    },
    tabText: {
        alignSelf: 'auto',
        fontSize: Scale_1.scale(25),
        marginBottom: Scale_1.scale(5),
    },
});
exports.default = TabComponent;
