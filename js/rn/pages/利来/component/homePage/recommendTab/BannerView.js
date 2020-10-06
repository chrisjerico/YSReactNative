"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_swiper_1 = require("react-native-swiper");
var react_native_1 = require("react-native");
var React = require("react");
var width = react_native_1.Dimensions.get("screen").width;
exports.BannerView = function (_a) {
    var list = _a.list;
    return (React.createElement(react_native_1.View, { style: { height: 150, marginHorizontal: 8, width: react_native_1.Dimensions.get("screen").width - 16 } },
        React.createElement(react_native_swiper_1.default, { style: { height: 150, marginHorizontal: 8, width: react_native_1.Dimensions.get("screen").width - 16 }, autoplay: true, loop: true, dot: React.createElement(react_native_1.View, { style: {
                    backgroundColor: 'rgba(0,0,0,.2)',
                    width: 5,
                    height: 5,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3
                } }), activeDot: React.createElement(react_native_1.View, { style: {
                    backgroundColor: '#000',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginLeft: 3,
                    marginRight: 3,
                    marginTop: 3,
                    marginBottom: 3
                } }), paginationStyle: {
                bottom: -23,
                left: null,
                right: 10
            } }, list.map(function (item) {
            return React.createElement(react_native_1.Image, { style: { width: width, height: 150 }, source: { uri: item.pic } });
        }))));
};
//# sourceMappingURL=BannerView.js.map