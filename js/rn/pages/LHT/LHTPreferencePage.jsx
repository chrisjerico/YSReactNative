"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var LHThemeColor_1 = require("../../public/theme/colors/LHThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var tars_1 = require("../../public/tools/tars");
var Button_1 = require("../../public/views/tars/Button");
var MineHeader_1 = require("../../public/views/tars/MineHeader");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var PreferenceButton_1 = require("./views/PreferenceButton");
var LHTPreferencePage = function (_a) {
    var _b;
    var route = _a.route;
    var _c = (_b = route === null || route === void 0 ? void 0 : route.params) !== null && _b !== void 0 ? _b : {}, onPressConfirm = _c.onPressConfirm, initPreferences = _c.initPreferences;
    var _d = react_1.useState(initPreferences), preferences = _d[0], setPreferences = _d[1];
    react_1.useEffect(function () {
        setPreferences(initPreferences);
    }, [initPreferences]);
    return (<react_native_1.View style={{ flex: 1 }}>
      <SafeAreaHeader_1.default headerColor={LHThemeColor_1.LHThemeColor.六合厅.themeColor} containerStyle={{ paddingHorizontal: Scale_1.scale(10) }}>
        <MineHeader_1.default title={'偏好设置'} onPressBackBtn={RootNavigation_1.pop} showRightTitle={false} showBackBtn={true}/>
      </SafeAreaHeader_1.default>
      <react_native_1.View style={{ flex: 1, backgroundColor: '#E0E0E0' }}>
        <react_native_1.Text style={styles.title}>{'选择您感兴趣的彩种'}</react_native_1.Text>
        <react_native_1.View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    }}>
          {preferences === null || preferences === void 0 ? void 0 : preferences.map(function (item, index) {
        var title = item.title, selected = item.selected;
        return (<PreferenceButton_1.default key={index} title={title} selected={selected} onPress={function () {
            var newPreferences = preferences === null || preferences === void 0 ? void 0 : preferences.map(function (ele, _index) {
                if (index == _index) {
                    return Object.assign({}, item, {
                        selected: !(ele === null || ele === void 0 ? void 0 : ele.selected),
                    });
                }
                else {
                    return ele;
                }
            });
            var selectedPreferences = newPreferences.filter(function (ele) { return ele === null || ele === void 0 ? void 0 : ele.selected; });
            if ((selectedPreferences === null || selectedPreferences === void 0 ? void 0 : selectedPreferences.length) > 11) {
                tars_1.ToastError('最多设置11个常用资讯');
            }
            else if ((selectedPreferences === null || selectedPreferences === void 0 ? void 0 : selectedPreferences.length) < 2) {
                tars_1.ToastError('最少设置2个常用资讯');
            }
            else {
                setPreferences(newPreferences);
            }
        }}/>);
    })}
        </react_native_1.View>
        <Button_1.default title={'确定'} containerStyle={{
        backgroundColor: '#ff8610',
        marginHorizontal: Scale_1.scale(15),
        aspectRatio: 9,
        borderRadius: Scale_1.scale(5),
    }} titleStyle={{
        color: '#ffffff',
        fontSize: Scale_1.scale(25),
    }} onPress={function () {
        RootNavigation_1.pop();
        onPressConfirm && onPressConfirm(preferences);
    }}/>
      </react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    title: {
        fontSize: Scale_1.scale(24),
        color: '#999999',
        textAlign: 'center',
        marginTop: Scale_1.scale(20),
        marginBottom: Scale_1.scale(32),
        fontWeight: '900',
    },
});
exports.default = LHTPreferencePage;
