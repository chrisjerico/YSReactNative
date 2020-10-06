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
var react_native_banner_carousel_1 = require("react-native-banner-carousel");
var react_1 = require("react");
var react_native_1 = require("react-native");
var PushHelper_1 = require("../../../public/define/PushHelper");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_2 = require("react");
var Banner = function (_a) {
    var bannerData = _a.bannerData, _b = _a.onlineNum, onlineNum = _b === void 0 ? 0 : _b, onlineSwitch = _a.onlineSwitch, _c = _a.size, size = _c === void 0 ? {
        width: 0, height: 0,
    } : _c, style = _a.style;
    var _d, _e, _f, _g;
    var BannerRef = react_1.useRef();
    var _h = react_1.useState(100), height = _h[0], setHeight = _h[1];
    react_1.useEffect(function () {
        var _a, _b;
        var timer = null;
        if (parseFloat((_a = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _a === void 0 ? void 0 : _a.interval) > 0) {
            timer = setInterval(function () {
                var _a;
                //@ts-ignore
                (_a = BannerRef === null || BannerRef === void 0 ? void 0 : BannerRef.current) === null || _a === void 0 ? void 0 : _a.gotoNextPage();
            }, parseFloat((_b = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _b === void 0 ? void 0 : _b.interval) * 1000);
        }
        return (function () {
            clearInterval(timer);
        });
    }, [bannerData,]);
    if (((_e = (_d = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _d === void 0 ? void 0 : _d.list) === null || _e === void 0 ? void 0 : _e.length) > 0) {
        return (<react_native_1.View style={__assign({}, style)}>

        <react_native_banner_carousel_1.default autoplay index={0} ref={BannerRef} loop pageSize={size.width}>
          {(_g = (_f = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _f === void 0 ? void 0 : _f.list) === null || _g === void 0 ? void 0 : _g.map(function (res, index) {
            return (<react_native_1.TouchableWithoutFeedback onPress={function () {
                PushHelper_1.default.pushCategory(res.linkCategory, res.linkPosition);
            }}>
                <react_native_fast_image_1.default onLoad={function (e) {
                if (!size.height) {
                    setHeight(e.nativeEvent.height * ((size.width) / e.nativeEvent.width));
                }
            }} key={'banner' + index} style={{ width: size.width, height: size.height ? size.height : height, borderRadius: 10 }} source={{ uri: res.pic }}>

                </react_native_fast_image_1.default>
              </react_native_1.TouchableWithoutFeedback>);
        })}
        </react_native_banner_carousel_1.default>
        {onlineSwitch == 1 ? <react_native_1.View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 5 }}>
          <react_native_1.Text style={{ color: 'white' }}>当前在线:{onlineNum}</react_native_1.Text>
        </react_native_1.View> : null}

      </react_native_1.View>);
    }
    else {
        return null;
    }
};
exports.default = Banner;
