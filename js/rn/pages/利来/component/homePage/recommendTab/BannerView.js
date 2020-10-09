"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerView = void 0;
var react_native_swiper_1 = __importDefault(require("react-native-swiper"));
var react_native_1 = require("react-native");
var React = __importStar(require("react"));
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