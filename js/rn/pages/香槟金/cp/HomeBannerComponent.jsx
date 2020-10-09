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
var UGSwiper_1 = require("../../../public/widget/swp/UGSwiper");
var PushHelper_1 = require("../../../public/define/PushHelper");
var UGThemeColor_1 = require("../../../public/theme/UGThemeColor");
/**
 * 主页banner
 */
var HomeBannerComponent = /** @class */ (function (_super) {
    __extends(HomeBannerComponent, _super);
    function HomeBannerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 广告跳转
         * @param adv
         * @private
         */
        _this._gotoBanner = function (adv) {
            //TODO 安卓
            PushHelper_1.default.pushCategory(adv.linkCategory, adv.linkPosition);
        };
        return _this;
    }
    /**
     * 绘制滑屏
     */
    HomeBannerComponent.prototype._renderBanner = function () {
        var _this = this;
        var _a;
        var pics = (_a = this.props.reducerData) === null || _a === void 0 ? void 0 : _a.list;
        if (Ext_1.anyNull(pics))
            return null;
        return (<react_native_1.View style={_styles.bannerWrapper} key={pics.toString()}>
        <UGSwiper_1.default>
          {pics.map(function (adv) {
            return (<react_native_1.TouchableOpacity onPress={function () {
                _this._gotoBanner(adv);
            }}>
                <react_native_1.View key={adv.pic} style={[_styles.bannerContainer, { backgroundColor: UGThemeColor_1.UGColor.placeholderColor2 }]}>
                  <react_native_1.Image style={_styles.bannerImage} source={{ uri: adv.pic }}/>
                </react_native_1.View>
              </react_native_1.TouchableOpacity>);
        })}
        </UGSwiper_1.default>
      </react_native_1.View>);
    };
    HomeBannerComponent.prototype.render = function () {
        return this._renderBanner();
    };
    return HomeBannerComponent;
}(react_1.Component));
exports.default = HomeBannerComponent;
var _styles = react_native_1.StyleSheet.create({
    //滑屏
    bannerWrapper: {
        aspectRatio: 343 / 153,
    },
    bannerContainer: {
        flex: 1,
        margin: 8,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'stretch',
    },
});
