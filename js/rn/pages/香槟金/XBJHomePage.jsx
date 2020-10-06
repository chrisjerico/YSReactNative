"use strict";
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
var React = require("react");
var react_native_1 = require("react-native");
var HomeMyInfoComponent_1 = require("./cp/HomeMyInfoComponent");
var HomeGameComponent_1 = require("./cp/HomeGameComponent");
var HomeBannerComponent_1 = require("./cp/HomeBannerComponent");
var HomeCouponComponent_1 = require("./cp/HomeCouponComponent");
var HomeFloatAdvComponent_1 = require("./cp/HomeFloatAdvComponent");
var HomeNewsComponent_1 = require("./cp/HomeNewsComponent");
var HomeRedBagComponent_1 = require("./cp/HomeRedBagComponent");
var HomeNoticeComponent_1 = require("./cp/HomeNoticeComponent");
var NetworkRequest1_1 = require("../../public/network/NetworkRequest1");
var IGlobalStateHelper_1 = require("../../redux/store/IGlobalStateHelper");
var UGLoadingCP_1 = require("../../public/widget/UGLoadingCP");
exports.XBJHomePage = function (props) {
    var setProps = props.setProps;
    UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading });
    var _a = React.useState(true), scrollEnable = _a[0], setScrollEnable = _a[1];
    function requestData() {
        IGlobalStateHelper_1.IGlobalStateHelper.updateUserInfo();
        NetworkRequest1_1.default.homeInfo()
            .then(function (value) {
            UGLoadingCP_1.hideLoading();
            setProps(__assign({}, value));
        })
            .catch(function (error) {
            UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Reload, text: error });
        });
    }
    var banner = props.banner, notice = props.notice, userInfo = props.userInfo, game = props.game, coupon = props.coupon, movie = props.movie, redBag = props.redBag, floatAd = props.floatAd;
    if (banner == null)
        return null;
    var bRefreshing = false;
    return (<react_native_1.View style={_styles.container}>
      <react_native_1.ScrollView scrollEnabled={scrollEnable} refreshControl={<react_native_1.RefreshControl refreshing={bRefreshing} onRefresh={function () {
        requestData();
    }}/>}>
        <HomeBannerComponent_1.default reducerData={banner}/>
        <HomeNoticeComponent_1.default reducerData={notice}/>
        <HomeMyInfoComponent_1.default reducerData={userInfo}/>
        <HomeGameComponent_1.default reducerData={game} setScrollable={function (bl) {
        setScrollEnable(bl);
    }}/>
        <HomeCouponComponent_1.default reducerData={coupon}/>
        <HomeNewsComponent_1.default reducerData={movie}/>
      </react_native_1.ScrollView>

      <HomeRedBagComponent_1.default reducerData={redBag}/>
      <HomeFloatAdvComponent_1.default reducerData={floatAd}/>
    </react_native_1.View>);
};
var _styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
});
