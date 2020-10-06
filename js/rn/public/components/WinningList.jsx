"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinningList = void 0;
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
exports.WinningList = react_1.memo(function (_a) {
    var data = _a.data, _b = _a.style, style = _b === void 0 ? {} : _b, _c = _a.contentContainerStyle, contentContainerStyle = _c === void 0 ? {} : _c;
    var currentPosition = 0;
    var itemHeight = 29.3;
    var ticker = react_1.useRef();
    var activeInterval;
    react_1.useEffect(function () {
        startScrolls();
        return function () {
            clearInterval(activeInterval);
        };
    });
    var startScrolls = function () {
        activeInterval = setInterval(scrolling, 32);
    };
    var scrolling = function () {
        var current = currentPosition;
        if (currentPosition < 0) {
            current = 0;
        }
        if (data.length > 1) {
            var position = current + 2;
            ticker.current.scrollToOffset({ offset: position, animated: false });
            var maxOffset = data.length * itemHeight;
            if (current > maxOffset) {
                var offset = current - maxOffset;
                ticker.current.scrollToOffset({
                    offset: offset,
                    animated: false,
                });
                currentPosition = offset;
            }
            else {
                currentPosition = position;
            }
        }
    };
    var getWrappedData = function () {
        var overlappingNo = getOverlappingNo();
        return {
            data: __spreadArrays(data, data.slice(0, overlappingNo)),
        };
    };
    var getOverlappingNo = function () {
        var overlappingNo = 10;
        if (data.length < 10) {
            overlappingNo = data.length;
        }
        return overlappingNo;
    };
    var wrappedData = getWrappedData().data;
    return data.length > 0 ? (<react_native_1.FlatList showsVerticalScrollIndicator={false} scrollEnabled={false} contentContainerStyle={contentContainerStyle} ListHeaderComponent={function () { return <react_native_1.View style={{ backgroundColor: "white", flexDirection: "row", paddingHorizontal: 5, paddingVertical: 2 }}>
                <react_native_1.Text style={{
        flex: 1,
        color: "#3c3c3c",
        textAlign: "center",
        paddingVertical: 6,
        fontWeight: "bold"
    }}>用户名称</react_native_1.Text>
                <react_native_1.Text style={{
        flex: 1,
        color: "#3c3c3c",
        textAlign: "center",
        paddingVertical: 6,
        fontWeight: "bold"
    }}>游戏名称</react_native_1.Text>
                <react_native_1.Text style={{
        flex: 1,
        color: "#3c3c3c",
        textAlign: "center",
        paddingVertical: 6,
        fontWeight: "bold"
    }}>中奖金额</react_native_1.Text>
            </react_native_1.View>; }} getItemLayout={function (_, index) { return ({
        length: data.length,
        offset: itemHeight * index,
        index: index,
    }); }} ref={ticker} showsHorizontalScrollIndicator={false} data={wrappedData} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return <react_native_1.View style={{ flexDirection: "row", paddingHorizontal: 5 }}>
                    <react_native_1.Text style={{
            flex: 1,
            color: "#3c3c3c",
            textAlign: "center",
            paddingVertical: 6,
            fontWeight: "bold"
        }}>{item.username}</react_native_1.Text>
                    <react_native_1.Text style={{
            flex: 1,
            color: "#3c3c3c",
            textAlign: "center",
            paddingVertical: 6,
            fontWeight: "bold"
        }}>{item.type}</react_native_1.Text>
                    <react_native_1.Text style={{
            flex: 1,
            color: "#3c3c3c",
            textAlign: "center",
            paddingVertical: 6,
            fontWeight: "bold"
        }}>{item.coin}</react_native_1.Text>
                </react_native_1.View>;
    }} horizontal={false} style={[{
            width: '100%',
            height: data.length == 1 ? 58.6 : 29.3 * data.length,
            flexGrow: 0,
            backgroundColor: "#ffffff",
            marginVertical: 8,
            borderRadius: 8
        }, style]} stickyHeaderIndices={[0]} keyExtractor={function (item, index) { return item.type + index; }}/>) : <react_native_1.View />;
});
