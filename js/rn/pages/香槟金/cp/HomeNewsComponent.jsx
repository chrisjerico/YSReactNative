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
var react_native_elements_1 = require("react-native-elements");
var Resources_1 = require("../../../Res/icon/Resources");
var UGThemeColor_1 = require("../../../public/theme/UGThemeColor");
/**
 * 主页投注专栏
 */
var HomeNewsComponent = /** @class */ (function (_super) {
    __extends(HomeNewsComponent, _super);
    function HomeNewsComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * 绘制投注专栏
     *
     * @private
     */
    HomeNewsComponent.prototype._renderNews = function () {
        var _a;
        var movies = (_a = this.props.reducerData) === null || _a === void 0 ? void 0 : _a.movies;
        return (<react_native_1.View key="_renderNews">
        <react_native_1.View style={_styles.betTitleContainer}>
          <react_native_1.Text style={_styles.betTitle}>投注专栏</react_native_1.Text>
        </react_native_1.View>
        {movies.map(function (movie, index) { return (<react_native_1.View style={[_styles.betContainer, { backgroundColor: UGThemeColor_1.UGColor.placeholderColor2 }]} key={index}>
            <react_native_1.View style={_styles.betUserContainer}>
              <react_native_elements_1.Avatar rounded containerStyle={_styles.betUserAvatar} source={Resources_1.Res.home}/>
              <react_native_1.Text style={_styles.betUserName}>j***01</react_native_1.Text>
              <react_native_1.Text style={_styles.betUserDate}>2020-02-12 11:28:44</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={_styles.betMessageContainer}>
              <react_native_1.Image style={_styles.betMessageImage} source={Resources_1.Res.home}/>
              <react_native_1.Text style={_styles.betMessageText}>
                {movie.title}
                <react_native_1.Text style={_styles.betMessageText2}>¥100.00</react_native_1.Text>
                <react_native_1.Text style={_styles.betMessageText}>{movie.title}</react_native_1.Text>
              </react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>); })}
      </react_native_1.View>);
    };
    HomeNewsComponent.prototype.render = function () {
        return this._renderNews();
    };
    return HomeNewsComponent;
}(react_1.Component));
exports.default = HomeNewsComponent;
var _styles = react_native_1.StyleSheet.create({
    //下注
    betTitleContainer: {
        fontSize: 14,
        marginBottom: 12,
        marginLeft: 16,
        marginRight: 16,
    },
    betTitle: {
        fontSize: 14,
        color: 'white',
    },
    betContainer: {
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 12,
        paddingBottom: 12,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 12,
    },
    betUserContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 12,
        paddingBottom: 12,
    },
    betUserAvatar: {
        width: 20,
        height: 20,
    },
    betUserName: {
        fontSize: 12,
        marginLeft: 12,
        flex: 1,
    },
    betUserDate: {
        fontSize: 12,
        marginLeft: 12,
    },
    betUser: {
        fontSize: 12,
    },
    betMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: 'white',
    },
    betMessageImage: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    betMessageText: {
        fontSize: 18,
        flex: 1,
    },
    betMessageText2: {
        fontSize: 18,
        color: 'red',
    },
});
