"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendMustPlayView = void 0;
var react_native_1 = require("react-native");
var ImageButton_1 = require("../../../ImageButton");
var React = require("react");
exports.RecommendMustPlayView = function (_a) {
    var list = _a.list, onPress = _a.onPress;
    return (<>
            <react_native_1.View style={{ flexDirection: "row", alignItems: "center" }}>
                <react_native_1.Text style={{ fontWeight: "bold", color: '#333', fontSize: 18 }}>必玩</react_native_1.Text>
                <react_native_1.Text style={{ fontSize: 15, marginHorizontal: 10 }}>|</react_native_1.Text>
                <react_native_1.Text style={{ fontSize: 16, color: '#333' }}>全民来玩</react_native_1.Text>
            </react_native_1.View>
            <ImageButton_1.ImageButton onPress={function () { return onPress(list[0]); }} imgStyle={{ height: 153, width: "100%" }} uri={list[0].icon}/>
            <react_native_1.View style={{ flexDirection: 'row', paddingTop: 10 }}>
                {list[1] && <ImageButton_1.ImageButton imgStyle={{ width: 186, height: 117, flex: 1, marginRight: 10 }} uri={list[1].icon} onPress={function () { return onPress(list[1]); }}/>}
                {list[2] && <ImageButton_1.ImageButton imgStyle={{ width: 186, height: 117, flex: 1 }} uri={list[2].icon} onPress={function () { return onPress(list[2]); }}/>}
            </react_native_1.View>
        </>);
};
