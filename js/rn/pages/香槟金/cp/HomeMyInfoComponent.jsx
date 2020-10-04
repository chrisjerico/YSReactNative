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
var react_native_elements_1 = require("react-native-elements");
var Resources_1 = require("../../../Res/icon/Resources");
var PushHelper_1 = require("../../../public/define/PushHelper");
var UGSysConfModel_1 = require("../../../redux/model/\u5168\u5C40/UGSysConfModel");
var UGThemeColor_1 = require("../../../public/theme/UGThemeColor");
var UGSkinManagers_1 = require("../../../public/theme/UGSkinManagers");
var Navigation_1 = require("../../../public/navigation/Navigation");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
/**
 * 主页个人信息
 */
var HomeMyInfoComponent = /** @class */ (function (_super) {
    __extends(HomeMyInfoComponent, _super);
    function HomeMyInfoComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * 个人菜单
         */
        _this.myInfoMenuArr = [
            {
                url: Resources_1.Res.ck,
                text: '存款',
                onPress: function () {
                    //TODO 安卓
                    PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款);
                },
            },
            {
                url: Resources_1.Res.edzh,
                text: '额度转换',
                onPress: function () {
                    //TODO 安卓
                    PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.额度转换);
                },
            },
            {
                url: Resources_1.Res.qk,
                text: '取款',
                onPress: function () {
                    //TODO 安卓
                    PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.取款);
                },
            },
            {
                url: Resources_1.Res.zjmx,
                text: '资金明细',
                onPress: function () {
                    //TODO 安卓
                    PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.资金明细);
                },
            },
        ];
        /**
         * 绘制存款 取款 等图标
         * @param url
         * @param text
         * @private
         */
        _this._renderMyInfoIcon = function (item) {
            var skin = UGSkinManagers_1.Skin1;
            return (<react_native_1.TouchableOpacity onPress={item.onPress}>
        <react_native_1.View key={item.text} style={_styles.myInfoBottomWalletIconContainer}>
          <react_native_1.Image resizeMode="stretch" style={[_styles.myInfoBottomWalletIcon, { tintColor: skin.themeColor }]} source={item.url}/>
          <react_native_1.Text style={[_styles.myInfoBottomWalletIconText, { color: skin.themeColor }]}>{item.text}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>);
        };
        /**
         * 跳转个人中心
         * @private
         */
        _this._gotoMyInfo = function () {
            RootNavigation_1.navigate(Navigation_1.PageName.XBJMinePage);
        };
        return _this;
    }
    /**
     * 绘制 个个信息 存款 等等内容
     * @private
     */
    HomeMyInfoComponent.prototype._renderMyInfo = function () {
        var userInfo = this.props.reducerData;
        if (Ext_1.anyNull(userInfo))
            return null;
        return (<react_native_1.View style={_styles.myInfoContainer} key="_renderMyInfo">
        <react_native_1.View style={[_styles.myInfoTopContainer, { backgroundColor: UGSkinManagers_1.Skin1.themeLightColor }]}>
          <react_native_1.Text style={_styles.myInfoTopText}>{"\u665A\u4E0A\u597D\uFF0C" + userInfo.usr}</react_native_1.Text>
          <react_native_1.TouchableOpacity onPress={this._gotoMyInfo}>
            <react_native_1.View style={_styles.myInfoTopButton}>
              <react_native_1.Text style={_styles.myInfoTopText}>个人资料</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
        <react_native_1.View style={[_styles.myInfoBottomContainer, { backgroundColor: UGThemeColor_1.UGColor.placeholderColor2 }]}>
          <react_native_1.View>
            <react_native_1.View style={_styles.myInfoBottomWalletMoneyContainer}>
              <react_native_1.Text style={[_styles.myInfoBottomWalletMoneyFlag, { color: '#3f5bcd' }]}>¥</react_native_1.Text>
              <react_native_1.Text style={[_styles.myInfoBottomWalletMoney, { color: '#3f5bcd' }]}>{userInfo.balance}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Text style={_styles.myInfoBottomWalletMe}>我的钱包</react_native_1.Text>
          </react_native_1.View>
          <react_native_elements_1.Divider style={_styles.myInfoBottomWalletDivider}/>
          {this.myInfoMenuArr.map(this._renderMyInfoIcon)}
        </react_native_1.View>
      </react_native_1.View>);
    };
    HomeMyInfoComponent.prototype.render = function () {
        return this._renderMyInfo();
    };
    return HomeMyInfoComponent;
}(react_1.Component));
exports.default = HomeMyInfoComponent;
var _styles = react_native_1.StyleSheet.create({
    //个人钱包
    myInfoContainer: {
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 8,
    },
    myInfoTopContainer: {
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 4,
        paddingBottom: 4,
    },
    myInfoTopText: {
        flex: 1,
        fontSize: 12,
        color: 'white',
    },
    myInfoTopButton: {
        borderWidth: 1,
        borderRadius: 999,
        borderColor: 'white',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 2,
        paddingBottom: 2,
    },
    myInfoBottomContainer: {
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 26,
        paddingRight: 12,
        paddingTop: 16,
        paddingBottom: 16,
    },
    myInfoBottomWalletContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    myInfoBottomWalletMoneyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    myInfoBottomWalletMoneyFlag: {
        fontSize: 14,
    },
    myInfoBottomWalletMoney: {
        fontSize: 20,
    },
    myInfoBottomWalletMe: {
        fontSize: 12,
        marginTop: 6,
    },
    myInfoBottomWalletDivider: {
        width: 1,
        height: 38,
    },
    myInfoBottomWalletIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    myInfoBottomWalletIcon: {
        width: 24,
        height: 18,
    },
    myInfoBottomWalletIconText: {
        fontSize: 12,
        marginTop: 8,
    },
});
