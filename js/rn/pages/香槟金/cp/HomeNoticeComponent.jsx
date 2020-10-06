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
var Resources_1 = require("../../../Res/icon/Resources");
var StringUtils_1 = require("../../../public/tools/StringUtils");
/**
 * 主页公告,信息 等等内容
 */
var HomeNoticeComponent = /** @class */ (function (_super) {
    __extends(HomeNoticeComponent, _super);
    function HomeNoticeComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 绘制 公告,信息 等等内容
     * @private
     */
    HomeNoticeComponent.prototype._renderNotice = function () {
        var _a;
        var noticeArr = (_a = this.props.reducerData) === null || _a === void 0 ? void 0 : _a.scroll;
        if (Ext_1.arrayEmpty(noticeArr))
            return null;
        return (<react_native_1.View style={_styles.noticeContainer} key="_renderNotice">
        <react_native_1.Image resizeMode="stretch" style={_styles.noticeTextImage} source={Resources_1.Res.gd}/>
        <react_native_1.Text style={_styles.noticeDesText}>{StringUtils_1.default.getInstance().deleteHtml(noticeArr[0].content)}</react_native_1.Text>
      </react_native_1.View>);
    };
    HomeNoticeComponent.prototype.render = function () {
        return this._renderNotice();
    };
    return HomeNoticeComponent;
}(react_1.Component));
exports.default = HomeNoticeComponent;
var _styles = react_native_1.StyleSheet.create({
    //公告
    noticeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
    },
    noticeTextImage: {
        width: 27,
        height: 13,
        resizeMode: 'contain',
    },
    noticeDesText: {
        fontSize: 12,
        color: 'white',
        paddingLeft: 8,
        paddingRight: 8,
    },
});
