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
var Feather_1 = require("react-native-vector-icons/Feather");
var UGSkinManagers_1 = require("../../../public/theme/UGSkinManagers");
/**
 * 主页红包
 */
var HomeRedBagComponent = /** @class */ (function (_super) {
    __extends(HomeRedBagComponent, _super);
    function HomeRedBagComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 绘制红包
     * @private
     */
    HomeRedBagComponent.prototype._rendRedBag = function () {
        var _this = this;
        var _a;
        var redBag = this.props.reducerData;
        if (Ext_1.checkTrue((_a = this.state) === null || _a === void 0 ? void 0 : _a.hideRedBag) || Ext_1.anyNull(redBag))
            return null;
        return (<react_native_1.View style={_styles.redContainer}>
        <react_native_1.Image style={_styles.redImage} source={{ uri: redBag.redBagLogo }}/>
        <Feather_1.default name="x-circle" color={UGSkinManagers_1.Skin1.themeColor} size={25} style={_styles.redImageClose} onPress={function () {
            _this.setState({
                hideRedBag: true,
            });
        }}/>
      </react_native_1.View>);
    };
    HomeRedBagComponent.prototype.render = function () {
        return this._rendRedBag();
    };
    return HomeRedBagComponent;
}(react_1.Component));
exports.default = HomeRedBagComponent;
var _styles = react_native_1.StyleSheet.create({
    //红包
    redContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'flex-end',
        top: 150,
        right: 16,
    },
    redImage: {
        width: 60,
        height: 60,
        marginTop: 12,
        resizeMode: 'contain',
    },
    redImageClose: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
});
