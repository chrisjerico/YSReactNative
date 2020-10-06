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
var React = require("react");
var react_native_swiper_1 = require("react-native-swiper");
var UGThemeColor_1 = require("../../theme/UGThemeColor");
var UGSkinManagers_1 = require("../../theme/UGSkinManagers");
var BaseWidget_1 = require("../base/BaseWidget");
/**
 * 轮播
 */
var UGSwiper = /** @class */ (function (_super) {
    __extends(UGSwiper, _super);
    function UGSwiper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UGSwiper.prototype.render = function () {
        return <react_native_swiper_1.default autoplay showsPagination={false} autoplayTimeout={5} activeDotColor={UGSkinManagers_1.Skin1.themeColor} dotColor={UGThemeColor_1.UGColor.TextColor2} {...this.props}/>;
    };
    return UGSwiper;
}(BaseWidget_1.default));
exports.default = UGSwiper;
