"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var UGSkinManagers_1 = require("../../public/theme/UGSkinManagers");
var UGThemeColor_1 = require("../../public/theme/UGThemeColor");
var FUtils_1 = require("../../public/tools/FUtils");
var UgLog_1 = require("../../public/tools/UgLog");
var UGNavigationBar_1 = require("../../public/widget/UGNavigationBar");
var UGStore_1 = require("../../redux/store/UGStore");
// HOC
exports.default = (function (Page) {
    return function (props) {
        var _a;
        var _b = props !== null && props !== void 0 ? props : {}, route = _b.route, navigation = _b.navigation, _c = _b.tabbarOpetions, tabbarOpetions = _c === void 0 ? { unmountOnBlur: true } : _c;
        var newProps = react_1.useRef(null);
        var vars = react_1.useRef(null);
        var _d = react_1.useState(null), state = _d[0], setState = _d[1];
        // 监听焦点
        var lastParams;
        navigation.removeListener('focus', null);
        navigation.addListener('focus', function () {
            var _a, _b;
            var name = route.name, params = route.params;
            UgLog_1.ugLog('成为焦点', name, params);
            if (lastParams !== params) {
                // 跳转时参数设置到props
                lastParams = params;
                setProps(params);
            }
            ((_a = newProps.current) === null || _a === void 0 ? void 0 : _a.didFocus) && ((_b = newProps.current) === null || _b === void 0 ? void 0 : _b.didFocus(params));
        });
        //
        navigation.addListener('transitionEnd', function (e) {
            var _a;
            if (e.data.closing && ((_a = RootNavigation_1.navigationRef === null || RootNavigation_1.navigationRef === void 0 ? void 0 : RootNavigation_1.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getRootState().routes.length) == 1) {
                //检查一下Native主页下面的tab是显示还是隐藏
                switch (react_native_1.Platform.OS) {
                    case 'ios':
                        OCHelper_1.OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [false, true]);
                        break;
                    case 'android':
                        ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.VISIBLE_MAIN_TAB, { visibility: 0 });
                        break;
                }
            }
        });
        // 监听dispatch
        var unsubscribe = UGStore_1.UGStore.subscribe(route.name, function () {
            // console.log('渲染' + route.name, newProps.current)
        });
        // 设置props
        var defaultProps = {
            //Android渐变色数量必须 >= 2
            backgroundColor: [UGThemeColor_1.UGColor.BackgroundColor1, UGThemeColor_1.UGColor.BackgroundColor1],
            navbarOpstions: { hidden: true, gradientColor: UGSkinManagers_1.Skin1.navBarBgColor },
        };
        newProps.current = FUtils_1.deepMergeProps(defaultProps, props);
        newProps.current = FUtils_1.deepMergeProps(newProps.current, UGStore_1.UGStore.getPageProps(route.name));
        react_1.useEffect(function () {
            return unsubscribe;
        }, []);
        react_1.useLayoutEffect(function () {
            navigation.setOptions({
                header: function () {
                    return null;
                },
            });
            navigation.jumpTo && navigation.setOptions(tabbarOpetions);
        }, [navigation]);
        var setProps = function (props) {
            UGStore_1.UGStore.dispatch({ type: 'merge', page: route === null || route === void 0 ? void 0 : route.name, props: props });
            newProps.current = FUtils_1.deepMergeProps(newProps.current, UGStore_1.UGStore.getPageProps(route.name));
            setState({});
        };
        var _e = (_a = newProps === null || newProps === void 0 ? void 0 : newProps.current) !== null && _a !== void 0 ? _a : {}, _f = _e.backgroundColor, backgroundColor = _f === void 0 ? [UGThemeColor_1.UGColor.BackgroundColor1, UGThemeColor_1.UGColor.BackgroundColor1] : _f, _g = _e.backgroundImage, backgroundImage = _g === void 0 ? '' : _g, _h = _e.navbarOpstions, navbarOpstions = _h === void 0 ? {} : _h;
        return (<react_native_linear_gradient_1.default colors={backgroundColor} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ flex: 1 }}>
        <react_native_fast_image_1.default source={{ uri: backgroundImage }} style={{ flex: 1 }}>
          {!navbarOpstions.hidden && <UGNavigationBar_1.default {...navbarOpstions}/>}
          <Page {...newProps.current} setProps={setProps} vars={vars.current}/>
        </react_native_fast_image_1.default>
      </react_native_linear_gradient_1.default>);
    };
});
