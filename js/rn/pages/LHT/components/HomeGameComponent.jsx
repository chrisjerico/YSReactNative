"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var TabComponent_1 = require("../../../public/components/tars/TabComponent");
var LHThemeColor_1 = require("../../../public/theme/colors/LHThemeColor");
var Scale_1 = require("../../../public/tools/Scale");
var List_1 = require("../../../public/views/tars/List");
var HomeGameComponent = function (_a) {
    var renderLeftGame = _a.renderLeftGame, renderRightGame = _a.renderRightGame, _b = _a.leftGames, leftGames = _b === void 0 ? [] : _b, _c = _a.rightGames, rightGames = _c === void 0 ? [] : _c, containerStyle = _a.containerStyle, unActiveTabColor = _a.unActiveTabColor, activeTabColor = _a.activeTabColor, itemHeight = _a.itemHeight, leftIcon = _a.leftIcon, rightIcon = _a.rightIcon;
    var _d = react_1.useState(0), index = _d[0], setIndex = _d[1];
    return (<react_native_1.View style={containerStyle}>
      <react_native_1.View style={styles.mainTabContainer}>
        <react_native_1.TouchableWithoutFeedback onPress={function () { return setIndex(0); }}>
          <react_native_1.View style={[
        styles.mainTab,
        {
            backgroundColor: index ? unActiveTabColor : activeTabColor,
        },
    ]}>
            <react_native_fast_image_1.default style={styles.image} source={{ uri: leftIcon }}/>
            <react_native_1.Text style={styles.tabText}>{'热门资讯'}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
        <react_native_1.TouchableWithoutFeedback onPress={function () { return setIndex(1); }}>
          <react_native_1.View style={[
        styles.mainTab,
        {
            backgroundColor: index ? activeTabColor : unActiveTabColor,
        },
    ]}>
            <react_native_fast_image_1.default style={styles.image} source={{ uri: rightIcon }}/>
            <react_native_1.Text style={styles.tabText}>{'购彩大厅'}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.View>
      {index ? (<TabComponent_1.default numColumns={3} initialTabIndex={0} focusTabColor={LHThemeColor_1.LHThemeColor.六合厅.themeColor} tabGames={rightGames} itemHeight={itemHeight} renderScene={function (_a) {
        var item = _a.item;
        return <List_1.default uniqueKey={'HomeGameComponentRight'} style={styles.list} data={item} renderItem={renderRightGame} numColumns={3}/>;
    }}/>) : (<List_1.default uniqueKey={'HomeGameComponentLeft'} style={styles.list} data={leftGames} renderItem={renderLeftGame} numColumns={3}/>)}
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    mainTabContainer: {
        width: '100%',
        aspectRatio: 540 / 55,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainTab: {
        width: '49%',
        backgroundColor: '#ff6b1b',
        borderTopRightRadius: Scale_1.scale(10),
        borderTopLeftRadius: Scale_1.scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tabText: {
        color: '#ffffff',
        paddingLeft: Scale_1.scale(5),
    },
    scene: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
    },
    image: {
        width: '10%',
        aspectRatio: 1,
    },
    list: {
        paddingTop: Scale_1.scale(25),
        borderBottomRightRadius: Scale_1.scale(15),
        borderBottomLeftRadius: Scale_1.scale(15),
        backgroundColor: '#ffffff',
    },
});
exports.default = HomeGameComponent;
