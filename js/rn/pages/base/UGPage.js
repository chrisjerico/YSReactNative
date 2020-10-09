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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProps = void 0;
var React = __importStar(require("react"));
var UGStore_1 = require("../../redux/store/UGStore");
var UGThemeColor_1 = require("../../public/theme/UGThemeColor");
var FUtils_1 = require("../../public/tools/FUtils");
var UGNavigationBar_1 = __importDefault(require("../../public/widget/UGNavigationBar"));
var react_native_linear_gradient_1 = __importDefault(require("react-native-linear-gradient"));
var react_native_fast_image_1 = __importDefault(require("react-native-fast-image"));
var UGSkinManagers_1 = require("../../public/theme/UGSkinManagers");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var UgLog_1 = require("../../public/tools/UgLog");
var react_native_1 = require("react-native");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
// HOC
exports.default = (function (Page) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            var _this = _super.call(this, props) || this;
            _this.newProps = null;
            _this.vars = {};
            var navigation = props.navigation, route = props.route;
            // 监听焦点
            var lastParams;
            navigation.removeListener("focus", null);
            navigation.addListener("focus", function () {
                var _a = _this.props.route, name = _a.name, params = _a.params;
                UgLog_1.ugLog("成为焦点", name, params);
                if (lastParams !== params) {
                    // 跳转时参数设置到props
                    lastParams = params;
                    _this.setProps(params);
                }
                _this.newProps.didFocus && _this.newProps.didFocus(params);
            });
            navigation.removeListener("transitionEnd", null);
            navigation.addListener("transitionEnd", function (e) {
                var _a;
                if (e.data.closing && ((_a = RootNavigation_1.navigationRef === null || RootNavigation_1.navigationRef === void 0 ? void 0 : RootNavigation_1.navigationRef.current) === null || _a === void 0 ? void 0 : _a.getRootState().routes.length) == 1) {
                    //检查一下Native主页下面的tab是显示还是隐藏
                    switch (react_native_1.Platform.OS) {
                        case "ios":
                            OCHelper_1.OCHelper.call("ReactNativeVC.setTabbarHidden:animated:", [false, true]);
                            break;
                        case "android":
                            ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.VISIBLE_MAIN_TAB, { visibility: 0 });
                            break;
                    }
                }
            });
            // 监听dispatch
            _this.unsubscribe = UGStore_1.UGStore.subscribe(route.name, (function () {
                _this.newProps = FUtils_1.deepMergeProps(_this.newProps, UGStore_1.UGStore.getPageProps(route.name));
                _this.setState({});
            }).bind(_this));
            // 设置props
            var defaultProps = {
                //Android渐变色数量必须 >= 2
                backgroundColor: [UGThemeColor_1.UGColor.BackgroundColor1, UGThemeColor_1.UGColor.BackgroundColor1],
                navbarOpstions: { hidden: true, gradientColor: UGSkinManagers_1.Skin1.navBarBgColor },
            };
            _this.newProps = FUtils_1.deepMergeProps(defaultProps, _this.props);
            _this.newProps = FUtils_1.deepMergeProps(_this.newProps, UGStore_1.UGStore.getPageProps(route.name));
            return _this;
        }
        // 取消监听
        class_1.prototype.componentWillUnmount = function () {
            this.unsubscribe && this.unsubscribe();
        };
        class_1.prototype.setProps = function (props) {
            // console.log('setProps, name = ', this.props.route.name, props);
            UGStore_1.UGStore.dispatch({ type: "merge", page: this.props.route.name, props: props });
        };
        class_1.prototype.render = function () {
            // console.log('渲染', this.props.route.name);
            var _a = this.newProps, _b = _a.backgroundColor, backgroundColor = _b === void 0 ? [UGThemeColor_1.UGColor.BackgroundColor1, UGThemeColor_1.UGColor.BackgroundColor1] : _b, _c = _a.backgroundImage, backgroundImage = _c === void 0 ? "" : _c, _d = _a.navbarOpstions, navbarOpstions = _d === void 0 ? {} : _d;
            return (React.createElement(react_native_linear_gradient_1.default, { colors: backgroundColor, start: { x: 0, y: 1 }, end: { x: 1, y: 1 }, style: { flex: 1 } },
                React.createElement(react_native_fast_image_1.default, { source: { uri: backgroundImage }, style: { flex: 1 } },
                    !navbarOpstions.hidden && React.createElement(UGNavigationBar_1.default, __assign({}, navbarOpstions)),
                    React.createElement(Page, __assign({}, this.newProps, { setProps: this.setProps.bind(this), vars: this.vars }))))); // navigation={this.props.navigation}
        };
        return class_1;
    }(React.Component));
});
// 全局使用的setProps （刷新当前正在显示的页面）
function setProps(props, willRender) {
    UGStore_1.UGStore.dispatch({ type: "merge", page: RootNavigation_1.getCurrentPage(), props: props });
}
exports.setProps = setProps;
//# sourceMappingURL=UGPage.js.map