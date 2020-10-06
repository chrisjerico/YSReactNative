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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var react_1 = require("react");
var Ext_1 = require("../../../public/tools/Ext");
var Feather_1 = require("react-native-vector-icons/Feather");
var UGSkinManagers_1 = require("../../../public/theme/UGSkinManagers");
/**
 * 主页悬浮广告
 */
var HomeFloatAdvComponent = /** @class */ (function (_super) {
    __extends(HomeFloatAdvComponent, _super);
    function HomeFloatAdvComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 隐藏悬浮广告
         * @param index
         * @private
         */
        _this._hideFloatAd = function (index) {
            var _a;
            var hideArr = Ext_1.anyNull((_a = _this.state) === null || _a === void 0 ? void 0 : _a.hideFloatAd) ? [false, false, false, false] : __spreadArrays(_this.state.hideFloatAd);
            hideArr[index] = true;
            _this.setState({
                hideFloatAd: hideArr,
            });
        };
        /**
         * 显示某个广告
         * @param index 广告位置
         * @param arr 广告数据
         * @private
         */
        _this._showFloatAd = function (index, arr) {
            var _a;
            return (arr.length > index && (<react_native_1.View style={[_styles.floatAdItemContainer, { opacity: !Ext_1.anyNull((_a = _this.state) === null || _a === void 0 ? void 0 : _a.hideFloatAd) && _this.state.hideFloatAd[index] ? 0 : 100 }]}>
          <react_native_1.Image style={_styles.floatAdImage} source={{ uri: arr[index].image }}/>
          <Feather_1.default name="x-circle" color={UGSkinManagers_1.Skin1.themeColor} size={25} style={_styles.floatAdClose} onPress={function () {
                _this._hideFloatAd(index);
            }}/>
        </react_native_1.View>));
        };
        return _this;
    }
    /**
     * 绘制广告
     * @private
     */
    HomeFloatAdvComponent.prototype._rendFloatAd = function () {
        var floatAd = this.props.reducerData;
        if (Ext_1.arrayEmpty(floatAd))
            return null;
        return (<react_native_1.View style={_styles.floatAdContainer}>
        <react_native_1.View>
          {this._showFloatAd(0, floatAd)}
          {this._showFloatAd(1, floatAd)}
        </react_native_1.View>
        <react_native_1.View>
          {this._showFloatAd(2, floatAd)}
          {this._showFloatAd(3, floatAd)}
        </react_native_1.View>
      </react_native_1.View>);
    };
    HomeFloatAdvComponent.prototype.render = function () {
        return this._rendFloatAd();
    };
    return HomeFloatAdvComponent;
}(react_1.Component));
exports.default = HomeFloatAdvComponent;
var _styles = react_native_1.StyleSheet.create({
    //悬浮广告
    floatAdContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        top: 230,
        left: 16,
        right: 16,
    },
    floatAdItemContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    floatAdImage: {
        width: 120,
        height: 120,
        marginTop: 12,
        resizeMode: 'contain',
    },
    floatAdClose: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});
