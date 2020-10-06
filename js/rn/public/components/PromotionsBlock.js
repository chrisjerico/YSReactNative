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
var react_native_1 = require("react-native");
var react_1 = require("react");
var useGetHomeInfo_1 = require("../hooks/useGetHomeInfo");
var usePopUpView_1 = require("../hooks/usePopUpView");
var react_native_fast_image_1 = require("react-native-fast-image");
var AppDefine_1 = require("../define/AppDefine");
var react_native_autoheight_webview_1 = require("react-native-autoheight-webview");
var hooks_1 = require("@react-native-community/hooks");
var httpClient_1 = require("../network/httpClient");
var PushHelper_1 = require("../define/PushHelper");
var PromotionsBlock = function (_a) {
    var _b = _a.horizontal, horizontal = _b === void 0 ? false : _b, _c = _a.titleVisible, titleVisible = _c === void 0 ? true : _c;
    var _d, _e;
    var couponListData = useGetHomeInfo_1.default(['system_promotions']).couponListData;
    var _f = react_1.useState(-1), selectId = _f[0], setSelectedId = _f[1];
    var onPopViewPress = usePopUpView_1.default().onPopViewPress;
    var _g = hooks_1.useDimensions().screen, width = _g.width, height = _g.height;
    var onPromotionItemPress = function (data, type, onPress) {
        if ((data === null || data === void 0 ? void 0 : data.linkUrl) != "") {
            react_native_1.Linking.openURL(data === null || data === void 0 ? void 0 : data.linkUrl);
        }
        else if (data.linkCategory == 0 && data.linkPosition == 0) {
            onPopViewPress(data, type, onPress ? onPress : function () {
            });
        }
        else {
            PushHelper_1.default.pushCategory(data.linkCategory, data.linkPosition);
        }
    };
    return (react_1.default.createElement(react_native_1.FlatList, { horizontal: horizontal, style: { marginTop: 10 }, data: (_e = (_d = couponListData === null || couponListData === void 0 ? void 0 : couponListData.data) === null || _d === void 0 ? void 0 : _d.list) === null || _e === void 0 ? void 0 : _e.filter(function (res, index) { return index < 5; }), renderItem: function (_a) {
            var item = _a.item, index = _a.index;
            var _b, _c;
            return react_1.default.createElement(react_native_1.View, { style: { paddingHorizontal: 10, marginBottom: 10 } },
                react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: onPromotionItemPress.bind(null, item, (_c = (_b = couponListData === null || couponListData === void 0 ? void 0 : couponListData.data) === null || _b === void 0 ? void 0 : _b.style) !== null && _c !== void 0 ? _c : 'popup', function () {
                        console.log("onpress::", item);
                        if (selectId == index) {
                            setSelectedId(-1);
                        }
                        else {
                            setSelectedId(index);
                        }
                    }) },
                    react_1.default.createElement(react_native_1.View, null,
                        titleVisible && react_1.default.createElement(react_native_1.Text, { style: {
                                fontWeight: "bold",
                                fontSize: 16,
                                marginBottom: 5,
                                color: 'black'
                            } }, item.title),
                        react_1.default.createElement(FastImageAutoHeight, { resizeMode: "stretch", style: horizontal && { width: 200, height: 150 }, source: { uri: item.pic } }))),
                selectId == index ?
                    react_1.default.createElement(react_native_1.View, null,
                        react_1.default.createElement(react_native_autoheight_webview_1.default, { style: { width: width - 20, backgroundColor: 'white' }, viewportContent: 'width=device-width, user-scalable=no', source: {
                                html: "<head><meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'><style>img{width:auto !important;max-width:100%;height:auto !important}</style><style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style></head>" + "<script>window.onload = function () {window.location.hash = 1;document.title = document.body.scrollHeight;}</script>" + ("" + item.content)
                            } }),
                        item.linkUrl && item.linkUrl !== "" ?
                            react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: function () {
                                    react_native_1.Linking.openURL(item.linkUrl);
                                } },
                                react_1.default.createElement(react_native_fast_image_1.default, { style: { height: 100, width: 150, alignSelf: "center" }, source: { uri: httpClient_1.httpClient.defaults.baseURL + "/images/more.gif" } })) : react_1.default.createElement(react_1.default.Fragment, null)) :
                    react_1.default.createElement(react_1.default.Fragment, null));
        } }));
};
var FastImageAutoHeight = function (props) {
    var _a = react_1.useState(100), picHeight = _a[0], setPicHeight = _a[1];
    var _b = usePopUpView_1.default(), cardMargin = _b.cardMargin, marginHorizontal = _b.marginHorizontal;
    return (react_1.default.createElement(react_native_fast_image_1.default, __assign({}, props, { style: [{ height: picHeight }, props.style], onLoad: function (e) {
            setPicHeight(((AppDefine_1.default.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height);
        } })));
};
exports.default = PromotionsBlock;
//# sourceMappingURL=PromotionsBlock.js.map