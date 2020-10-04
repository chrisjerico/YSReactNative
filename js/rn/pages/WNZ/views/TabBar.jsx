"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var AppDefine_1 = require("../../../public/define/AppDefine");
var Scale_1 = require("../../../public/tools/Scale");
var tars_1 = require("../../../public/tools/tars");
var getHtml5Image = tars_1.useHtml5Image('http://test10.6yc.com').getHtml5Image;
var tabs = [
    {
        name: '官方玩法',
        logo: getHtml5Image(23, 'home/gfwf'),
    },
    {
        name: '信用玩法',
        logo: getHtml5Image(23, 'home/xywf'),
    },
];
var Tab = function (_a) {
    var logo = _a.logo, name = _a.name, focused = _a.focused, onPress = _a.onPress;
    return (<react_native_gesture_handler_1.TouchableWithoutFeedback onPress={onPress}>
      <>
        <react_native_1.View style={styles.tabContainer}>
          <react_native_1.View style={styles.titleContainer}>
            <react_native_fast_image_1.default source={{ uri: logo }} style={{ width: Scale_1.scale(55), aspectRatio: 1 }} resizeMode={'contain'}/>
            <react_native_1.Text style={styles.titleText}>{name}</react_native_1.Text>
          </react_native_1.View>
          {name == '官方玩法' && <react_native_1.View style={styles.grayLineContainer}/>}
        </react_native_1.View>
        <react_native_1.View style={[
        styles.bottomLineContainer,
        {
            backgroundColor: focused ? (name == '官方玩法' ? '#80c025' : '#f44600') : 'transparent',
        },
    ]}/>
      </>
    </react_native_gesture_handler_1.TouchableWithoutFeedback>);
};
var TabBar = function (_a) {
    var activeTab = _a.activeTab, goToPage = _a.goToPage;
    return (<react_native_1.View style={{ flexDirection: 'row' }}>
      {tabs === null || tabs === void 0 ? void 0 : tabs.map(function (item, index) {
        var logo = item.logo, name = item.name;
        return <Tab key={index} logo={logo} name={name} focused={index == activeTab} onPress={function () { return goToPage(index); }}/>;
    })}
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    tabContainer: {
        width: AppDefine_1.default.width / 2,
        flexDirection: 'row',
        height: Scale_1.scale(80),
    },
    titleText: {
        paddingLeft: Scale_1.scale(10),
        fontSize: Scale_1.scale(23),
        fontWeight: '300',
    },
    grayLineContainer: {
        width: Scale_1.scale(1),
        backgroundColor: '#d9d9d9',
        height: '80%',
        alignSelf: 'flex-end',
        marginBottom: Scale_1.scale(5),
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Scale_1.scale(15),
        paddingLeft: Scale_1.scale(15),
    },
    bottomLineContainer: {
        height: Scale_1.scale(2),
        width: '70%',
        borderRadius: Scale_1.scale(100),
        alignSelf: 'center',
    },
});
exports.default = TabBar;
