"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var MarqueeView_1 = require("../MarqueeView");
var ImageButton_1 = require("../../ImageButton");
var PushHelper_1 = require("../../../../../public/define/PushHelper");
var hooks_1 = require("@react-native-community/hooks");
var react_native_banner_carousel_1 = require("react-native-banner-carousel");
var react_native_fast_image_1 = require("react-native-fast-image");
exports.RecommendTabView = function (_a) {
    var list = _a.list, marquee = _a.marquee, banner = _a.banner, onlineNum = _a.onlineNum;
    var _b, _c, _d, _e, _f, _g, _h, _j;
    var onPress = function (list) {
        var _a;
        list.seriesId != '1' ? PushHelper_1.default.pushHomeGame(list) :
            list.gameId ?
                PushHelper_1.default.pushCategory(list.seriesId, list.gameId) :
                PushHelper_1.default.pushCategory(list.seriesId, (_a = list.subType[0]) === null || _a === void 0 ? void 0 : _a.gameId);
    };
    return (<react_native_1.View style={{ paddingTop: 10, flex: 1 }}>
            {banner ? <Banner onlineNum={onlineNum} bannerData={banner}/> :
        <react_native_1.View style={{ height: 150, marginHorizontal: 8, width: react_native_1.Dimensions.get("screen").width - 16 }}/>}
            <MarqueeView_1.MarqueeView textArr={marquee}/>
            <react_native_1.View style={{ marginHorizontal: 12, flex: 1 }}>
                <react_native_1.Text style={{ color: "#3C3C3C", fontSize: 18, fontWeight: "bold", paddingVertical: 8 }}>真人娱乐</react_native_1.Text>
                <ImageButton_1.ImageButton imgStyle={{ height: 140, resizeMode: "stretch" }} uri={(_b = list[0]) === null || _b === void 0 ? void 0 : _b.icon} onPress={function () { return onPress(list[0]); }}/>
                <ImageButton_1.ImageButton imgStyle={{ height: 140, marginTop: 8, resizeMode: "stretch" }} uri={(_c = list[1]) === null || _c === void 0 ? void 0 : _c.icon} onPress={function () { return onPress(list[1]); }}/>
                <react_native_1.View style={{ flexDirection: "row", marginTop: 8, flex: 1 }}>
                    <ImageButton_1.ImageButton imgStyle={{ flex: 2 / 3, height: 100, width: "auto", resizeMode: "stretch" }} uri={((_d = list[2]) === null || _d === void 0 ? void 0 : _d.icon) || ((_f = (_e = list[2]) === null || _e === void 0 ? void 0 : _e.subType[0]) === null || _f === void 0 ? void 0 : _f.icon)} onPress={function () { return onPress(list[2]); }}/>
                    <ImageButton_1.ImageButton imgStyle={{ flex: 1 / 3, height: 100, width: "auto", marginLeft: 4, resizeMode: "stretch" }} uri={((_g = list[3]) === null || _g === void 0 ? void 0 : _g.icon) || ((_j = (_h = list[3]) === null || _h === void 0 ? void 0 : _h.subType[0]) === null || _j === void 0 ? void 0 : _j.icon)} onPress={function () { return onPress(list[3]); }}/>
                </react_native_1.View>
            </react_native_1.View>
        </react_native_1.View>);
};
var Banner = function (_a) {
    var bannerData = _a.bannerData, _b = _a.onlineNum, onlineNum = _b === void 0 ? 0 : _b;
    var _c, _d, _e, _f;
    var width = hooks_1.useDimensions().window.width;
    var BannerRef = React.useRef();
    var _g = react_1.useState(100), height = _g[0], setHeight = _g[1];
    react_1.useEffect(function () {
        var timer = setInterval(function () {
            var _a;
            //@ts-ignore
            (_a = BannerRef === null || BannerRef === void 0 ? void 0 : BannerRef.current) === null || _a === void 0 ? void 0 : _a.gotoNextPage();
        }, 2000);
        return (function () {
            clearInterval(timer);
        });
    }, [bannerData]);
    if (((_d = (_c = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _c === void 0 ? void 0 : _c.list) === null || _d === void 0 ? void 0 : _d.length) > 0) {
        return (<react_native_1.View style={{ marginBottom: 10, }}>
                <react_native_banner_carousel_1.default autoplay index={0} ref={BannerRef} loop pageSize={width}>
                    {(_f = (_e = bannerData === null || bannerData === void 0 ? void 0 : bannerData.data) === null || _e === void 0 ? void 0 : _e.list) === null || _f === void 0 ? void 0 : _f.map(function (res, index) {
            return (<react_native_1.TouchableWithoutFeedback onPress={function () {
                PushHelper_1.default.pushCategory(res.linkCategory, res.linkPosition);
            }}>
                                <react_native_fast_image_1.default onLoad={function (e) {
                console.log(e.nativeEvent.height, e.nativeEvent.width, e.nativeEvent.height * ((width) / e.nativeEvent.width));
                setHeight(e.nativeEvent.height * ((width) / e.nativeEvent.width));
            }} key={'banner' + index} style={{ width: width, height: height, }} source={{ uri: res.pic }}>
                                </react_native_fast_image_1.default>
                            </react_native_1.TouchableWithoutFeedback>);
        })}
                </react_native_banner_carousel_1.default>
                <react_native_1.View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 5 }}>
                    <react_native_1.Text style={{ color: 'white' }}>当前在线:{onlineNum}</react_native_1.Text>
                </react_native_1.View>
            </react_native_1.View>);
    }
    else {
        return <react_native_1.View style={{ height: (react_native_1.Dimensions.get("screen").width) / 2, }}/>;
    }
};
