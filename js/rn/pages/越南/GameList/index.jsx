"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
var OCCall_1 = require("../../../public/define/OCHelper/OCBridge/OCCall");
var AppDefine_1 = require("../../../public/define/AppDefine");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var hooks_1 = require("@react-native-community/hooks");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var react_native_elements_1 = require("react-native-elements");
var react_native_fast_image_1 = require("react-native-fast-image");
var PushHelper_1 = require("../../../public/define/PushHelper");
var GameList = function (_a) {
    var _b, _c, _d, _e;
    var route = _a.route, navigation = _a.navigation;
    var _f = route === null || route === void 0 ? void 0 : route.params, homeGames = _f.homeGames, index = _f.index;
    var width = hooks_1.useDimensions().screen.width;
    var openSideBar = function () {
        OCHelper_1.OCHelper.call("UGYYRightMenuView.alloc.initWithFrame:[show]", [OCCall_1.NSValue.CGRectMake(AppDefine_1.default.width / 2, 0, AppDefine_1.default.width / 2, AppDefine_1.default.height)]);
    };
    var _g = react_1.useState(index), tbx = _g[0], setTbx = _g[1];
    return (<react_native_1.View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      <react_native_1.View style={{ flex: 1, flexDirection: 'row' }}>
        <react_native_1.FlatList style={{ width: 77, }} data={(_b = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _b === void 0 ? void 0 : _b.icons} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return <react_native_gesture_handler_1.TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderBottomColor: "#3c3c3c", borderBottomWidth: 1 }} onPress={function () {
            setTbx(index);
        }}>
            <react_native_fast_image_1.default style={{ width: 33, height: 33 }} source={{ uri: item.logo }}/>
            <react_native_1.Text style={{ color: '#3871f5', marginBottom: 10 }}>{item.name}</react_native_1.Text>
          </react_native_gesture_handler_1.TouchableOpacity>;
    }}></react_native_1.FlatList>
        <react_native_1.FlatList style={{ width: width - 38, backgroundColor: '#f2f2f2' }} data={(_e = (_d = (_c = homeGames === null || homeGames === void 0 ? void 0 : homeGames.data) === null || _c === void 0 ? void 0 : _c.icons) === null || _d === void 0 ? void 0 : _d[tbx]) === null || _e === void 0 ? void 0 : _e.list} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return <react_native_gesture_handler_1.TouchableOpacity onPress={function () {
            PushHelper_1.default.pushHomeGame(item);
        }} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <FastImageAutoHeight resizeMode={'contain'} style={{ width: width - 90, marginBottom: 10 }} source={{ uri: item.logo }}/>
            <react_native_1.Text style={{ color: '#3871f5', fontSize: 14 }}>{item.name}</react_native_1.Text>
          </react_native_gesture_handler_1.TouchableOpacity>;
    }}></react_native_1.FlatList>
      </react_native_1.View>
    </react_native_1.View>);
};
var Header = function () {
    var top = react_native_safe_area_context_1.useSafeArea().top;
    var width = hooks_1.useDimensions().screen.width;
    return (<react_native_1.View style={{ width: width, }}>
      <react_native_1.View style={{ height: top }}></react_native_1.View>
      <react_native_1.View style={{ width: width, height: 45, flexDirection: 'row' }}>
        <react_native_gesture_handler_1.TouchableOpacity style={{ marginLeft: 15 }} onPress={function () {
        RootNavigation_1.pop();
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                break;
            case 'android':
                break;
        }
    }}>
          <react_native_elements_1.Icon name='ios-arrow-back' type="ionicon" color="rgba(142, 142, 147,1)" size={30}/>
        </react_native_gesture_handler_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
};
var FastImageAutoHeight = function (props) {
    var _a = react_1.useState(100), picHeight = _a[0], setPicHeight = _a[1];
    return (<react_native_fast_image_1.default {...props} style={[props.style, { height: picHeight }]} onLoad={function (e) {
        setPicHeight((((AppDefine_1.default.width - 20)) / e.nativeEvent.width) * e.nativeEvent.height);
    }}/>);
};
exports.default = GameList;
