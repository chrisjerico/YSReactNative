"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_elements_1 = require("react-native-elements");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var FUtils_1 = require("../tools/FUtils");
var react_native_1 = require("react-native");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var RootNavigation_1 = require("../navigation/RootNavigation");
var UGNavigationBar = /** @class */ (function (_super) {
    __extends(UGNavigationBar, _super);
    function UGNavigationBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.newProps = {
            placement: 'center',
            statusBarProps: {
                translucent: true,
                backgroundColor: 'transparent',
            },
        };
        return _this;
    }
    // 返回按钮
    UGNavigationBar.prototype.BackButton = function (_a) {
        var style = _a.style;
        return (react_1.default.createElement(react_native_elements_1.Button, { icon: { name: 'ios-arrow-back', type: 'ionicon', color: 'white' }, buttonStyle: [{ backgroundColor: 'transparent', marginLeft: -8 }, style], onPress: function () {
                RootNavigation_1.pop();
                switch (react_native_1.Platform.OS) {
                    case 'ios':
                        OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                        break;
                }
            } }));
    };
    UGNavigationBar.prototype.render = function () {
        var props = Object.assign(this.newProps, this.props);
        // 标题
        if (props.title) {
            Object.assign(props, { centerComponent: { text: props.title, style: { color: 'white', fontSize: 18 } } });
        }
        // 左侧按钮
        props.leftComponent = (react_1.default.createElement(react_native_1.View, { style: { flexDirection: 'row' } },
            react_1.default.createElement(this.BackButton, { style: { height: this.props.back ? 40 : 0 } }),
            this.props.leftComponent));
        // 隐藏下划线
        if (props.hideUnderline) {
            props = FUtils_1.deepMergeProps(props, { containerStyle: { borderBottomWidth: 0 } });
        }
        // 渐变色
        if (props.gradientColor) {
            props = FUtils_1.deepMergeProps(props, { ViewComponent: react_native_linear_gradient_1.default, linearGradientProps: { colors: props.gradientColor, start: { x: 0, y: 1 }, end: { x: 1, y: 1 } } });
        }
        return react_1.default.createElement(react_native_elements_1.Header, __assign({}, props));
    };
    return UGNavigationBar;
}(react_1.Component));
exports.default = UGNavigationBar;
//# sourceMappingURL=UGNavigationBar.js.map