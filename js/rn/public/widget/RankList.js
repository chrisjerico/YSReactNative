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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var react_2 = __importDefault(require("react"));
var UGStore_1 = require("../../redux/store/UGStore");
var RankListCP = function (_a) {
    var _b, _c, _d, _e;
    var ranks = _a.ranks, width = _a.width, _f = _a.height, height = _f === void 0 ? 200 : _f, _g = _a.titleVisible, titleVisible = _g === void 0 ? true : _g, _h = _a.backgroundColor, backgroundColor = _h === void 0 ? 'white' : _h, _j = _a.textColor, textColor = _j === void 0 ? "black" : _j, _k = _a.timing, timing = _k === void 0 ? 10000 : _k, titleTextStyle = _a.titleTextStyle;
    var currentY = react_1.useState(new react_native_1.Animated.Value(height))[0];
    var rankingListSwitch = UGStore_1.UGStore.globalProps.sysConf.rankingListSwitch;
    react_1.useEffect(function () {
        var _a, _b, _c, _d, _e;
        var value = react_native_1.Animated.loop(react_native_1.Animated.timing(currentY, {
            toValue: (_c = -25 * (((_b = (_a = ranks === null || ranks === void 0 ? void 0 : ranks.data) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.length) + 5)) !== null && _c !== void 0 ? _c : 0,
            duration: timing,
            useNativeDriver: true
        }));
        if (((_e = (_d = ranks === null || ranks === void 0 ? void 0 : ranks.data) === null || _d === void 0 ? void 0 : _d.list) === null || _e === void 0 ? void 0 : _e.length) > 0) {
            value.start();
        }
        return (function () {
            value.stop();
        });
    }, [ranks]);
    if (rankingListSwitch == 0)
        return null;
    return (react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement(react_native_1.View, { style: { flexDirection: 'column' } },
            titleVisible && react_2.default.createElement(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 } },
                react_2.default.createElement(react_native_1.Image, { style: { width: 15, height: 15, tintColor: 'white', marginRight: 5 }, source: { uri: "outline_analytics_black_18dp" } }),
                react_2.default.createElement(react_native_1.Text, { style: __assign({ color: textColor, fontWeight: "bold", fontSize: 16, marginLeft: -7 }, titleTextStyle) }, "\u6295\u6CE8\u6392\u884C\u699C")),
            react_2.default.createElement(react_native_1.View, { style: { backgroundColor: backgroundColor, alignSelf: 'center', borderRadius: 8 } },
                ((_c = (_b = ranks === null || ranks === void 0 ? void 0 : ranks.data) === null || _b === void 0 ? void 0 : _b.list) === null || _c === void 0 ? void 0 : _c.length) > 0 ? react_2.default.createElement(react_native_1.View, { style: { flexDirection: 'row', width: width, alignSelf: 'center', } },
                    react_2.default.createElement(react_native_1.Text, { style: {
                            flex: 1,
                            color: textColor,
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold",
                        } }, "\u7528\u6237\u540D\u79F0"),
                    react_2.default.createElement(react_native_1.Text, { style: {
                            flex: 1,
                            color: textColor,
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold"
                        } }, "\u6E38\u620F\u540D\u79F0"),
                    react_2.default.createElement(react_native_1.Text, { style: {
                            flex: 1,
                            color: textColor,
                            textAlign: "center",
                            paddingVertical: 6,
                            fontWeight: "bold"
                        } }, "\u4E2D\u5956\u91D1\u989D")) : null,
                react_2.default.createElement(react_native_1.View, { style: { width: width, height: height, overflow: "hidden" } },
                    react_2.default.createElement(react_native_1.Animated.View, { style: {
                            transform: [{
                                    translateY: currentY,
                                }]
                        } }, (_e = (_d = ranks === null || ranks === void 0 ? void 0 : ranks.data) === null || _d === void 0 ? void 0 : _d.list) === null || _e === void 0 ? void 0 : _e.map(function (item, index) {
                        return react_2.default.createElement(react_native_1.View, { key: item.coin + index, style: { flexDirection: 'row' } },
                            react_2.default.createElement(react_native_1.Text, { style: {
                                    flex: 1,
                                    color: textColor,
                                    textAlign: "center",
                                    paddingVertical: 6,
                                    fontWeight: "bold",
                                    marginRight: 10
                                } }, item.username),
                            react_2.default.createElement(react_native_1.Text, { style: {
                                    flex: 1,
                                    color: textColor,
                                    textAlign: "center",
                                    paddingVertical: 6,
                                    fontWeight: "bold"
                                } }, item.type),
                            react_2.default.createElement(react_native_1.Text, { style: {
                                    flex: 1,
                                    color: textColor,
                                    textAlign: "center",
                                    paddingVertical: 6,
                                    fontWeight: "bold"
                                } }, item.coin));
                    })))))));
};
exports.default = RankListCP;
//# sourceMappingURL=RankList.js.map