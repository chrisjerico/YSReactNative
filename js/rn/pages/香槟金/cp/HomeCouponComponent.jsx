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
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var react_1 = require("react");
var Ext_1 = require("../../../public/tools/Ext");
var Resources_1 = require("../../../Res/icon/Resources");
var UGThemeColor_1 = require("../../../public/theme/UGThemeColor");
/**
 * 主页优惠活动
 */
var HomeCouponComponent = /** @class */ (function (_super) {
    __extends(HomeCouponComponent, _super);
    function HomeCouponComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 绘制优惠活动
     *
     * @private
     */
    HomeCouponComponent.prototype._renderCoupon = function () {
        var coupon = this.props.reducerData;
        if (Ext_1.arrayEmpty(coupon === null || coupon === void 0 ? void 0 : coupon.list))
            return null;
        return (<react_native_1.View key="_renderCoupon">
        <react_native_1.View style={_styles.couponTitleContainer}>
          <react_native_1.Image style={_styles.couponTitleIcon} source={Resources_1.Res.yhhdIcon}/>
          <react_native_1.Text style={_styles.couponTitleText}>优惠活动</react_native_1.Text>
          <react_native_1.Text style={_styles.couponTitleText2}>查看更多</react_native_1.Text>
          <react_native_1.Image style={_styles.couponTitleArrow} source={Resources_1.Res.yhhdArraw}/>
        </react_native_1.View>
        {coupon.list.map(function (item, index) { return (<react_native_1.View key={index} style={[_styles.couponItemContainer, { backgroundColor: UGThemeColor_1.UGColor.placeholderColor2 }]}>
            <react_native_1.Text style={_styles.couponItemTitle}>{item.title}</react_native_1.Text>
            <react_native_1.Image style={_styles.couponItemImage} source={{ uri: item.pic }}/>
          </react_native_1.View>); })}
      </react_native_1.View>);
    };
    HomeCouponComponent.prototype.render = function () {
        return this._renderCoupon();
    };
    return HomeCouponComponent;
}(react_1.Component));
exports.default = HomeCouponComponent;
var _styles = react_native_1.StyleSheet.create({
    //优惠券
    couponTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
        marginRight: 16,
        marginTop: 12,
        marginBottom: 12,
    },
    couponTitleIcon: {
        width: 16,
        height: 16,
        marginRight: 4,
    },
    couponTitleText: {
        fontSize: 14,
        flex: 1,
        color: 'white',
    },
    couponTitleText2: {
        fontSize: 12,
        color: 'white',
    },
    couponTitleArrow: {
        width: 12,
        height: 12,
        marginLeft: 4,
        resizeMode: 'contain',
    },
    couponItemContainer: {
        borderRadius: 4,
        padding: 12,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 12,
    },
    couponItemTitle: {
        fontSize: 16,
        marginBottom: 12,
    },
    couponItemImage: {
        height: 60,
        resizeMode: 'stretch',
    },
});
