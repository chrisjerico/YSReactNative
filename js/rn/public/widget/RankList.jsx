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
var react_2 = require("react");
var UGStore_1 = require("../../redux/store/UGStore");
var RankListCP = function (_a) {
    var ranks = _a.ranks, width = _a.width, _b = _a.height, height = _b === void 0 ? 200 : _b, _c = _a.titleVisible, titleVisible = _c === void 0 ? true : _c, _d = _a.backgroundColor, backgroundColor = _d === void 0 ? 'white' : _d, _e = _a.textColor, textColor = _e === void 0 ? "black" : _e, _f = _a.timing, timing = _f === void 0 ? 10000 : _f, titleTextStyle = _a.titleTextStyle;
    var _g, _h, _j, _k;
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
    return (<>
      <react_native_1.View style={{ flexDirection: 'column' }}>
        {titleVisible && <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <react_native_1.Image style={{ width: 15, height: 15, tintColor: 'white', marginRight: 5 }} source={{ uri: "outline_analytics_black_18dp" }}/>
          <react_native_1.Text style={__assign({ color: textColor, fontWeight: "bold", fontSize: 16, marginLeft: -7 }, titleTextStyle)}>投注排行榜</react_native_1.Text>
        </react_native_1.View>}
        <react_native_1.View style={{ backgroundColor: backgroundColor, alignSelf: 'center', borderRadius: 8 }}>
          {((_h = (_g = ranks === null || ranks === void 0 ? void 0 : ranks.data) === null || _g === void 0 ? void 0 : _g.list) === null || _h === void 0 ? void 0 : _h.length) > 0 ? <react_native_1.View style={{ flexDirection: 'row', width: width, alignSelf: 'center', }}>

            <react_native_1.Text style={{
        flex: 1,
        color: textColor,
        textAlign: "center",
        paddingVertical: 6,
        fontWeight: "bold",
    }}>用户名称</react_native_1.Text>
            <react_native_1.Text style={{
        flex: 1,
        color: textColor,
        textAlign: "center",
        paddingVertical: 6,
        fontWeight: "bold"
    }}>游戏名称</react_native_1.Text>
            <react_native_1.Text style={{
        flex: 1,
        color: textColor,
        textAlign: "center",
        paddingVertical: 6,
        fontWeight: "bold"
    }}>中奖金额</react_native_1.Text>
          </react_native_1.View> : null}
          <react_native_1.View style={{ width: width, height: height, overflow: "hidden" }}>

            <react_native_1.Animated.View style={{
        transform: [{
                translateY: currentY,
            }]
    }}>
              {(_k = (_j = ranks === null || ranks === void 0 ? void 0 : ranks.data) === null || _j === void 0 ? void 0 : _j.list) === null || _k === void 0 ? void 0 : _k.map(function (item, index) {
        return <react_native_1.View key={item.coin + index} style={{ flexDirection: 'row' }}>
                  <react_native_1.Text style={{
            flex: 1,
            color: textColor,
            textAlign: "center",
            paddingVertical: 6,
            fontWeight: "bold",
            marginRight: 10
        }}>{item.username}</react_native_1.Text>
                  <react_native_1.Text style={{
            flex: 1,
            color: textColor,
            textAlign: "center",
            paddingVertical: 6,
            fontWeight: "bold"
        }}>{item.type}</react_native_1.Text>
                  <react_native_1.Text style={{
            flex: 1,
            color: textColor,
            textAlign: "center",
            paddingVertical: 6,
            fontWeight: "bold"
        }}>{item.coin}</react_native_1.Text></react_native_1.View>;
    })}
            </react_native_1.Animated.View>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>

    </>);
};
exports.default = RankListCP;
