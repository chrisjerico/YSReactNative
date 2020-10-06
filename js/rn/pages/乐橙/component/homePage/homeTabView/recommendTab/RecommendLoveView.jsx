"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
exports.RecommendLoveView = function (_a) {
    var list = _a.list, thirdPartGamePress = _a.thirdPartGamePress;
    return (<>
            <react_native_1.View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                <react_native_1.Text style={{ fontWeight: "bold", color: '#333', fontSize: 18 }}>猜你喜欢</react_native_1.Text>
                <react_native_1.Text style={{ fontSize: 15, marginHorizontal: 10 }}>|</react_native_1.Text>
                <react_native_1.Text style={{ fontSize: 16, color: '#333', textAlign: "center" }}>你想玩的，这里都有</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.FlatList bounces={false} style={{ marginTop: 10 }} keyExtractor={function (item, index) { return "love-" + index; }} numColumns={2} data={list} renderItem={function (_a) {
        var item = _a.item;
        return (<react_native_1.TouchableWithoutFeedback style={{ flex: 1 }} onPress={function () { return thirdPartGamePress(item.id, item.gameId); }}>
                        {item.icon == "" ?
            <FontAwesome_1.default style={{ flex: 1, height: 100, width: 100, margin: 5 }} name={'image-inverted'}/> :
            <react_native_1.Image style={{ flex: 1, height: 100, width: 100, margin: 5, resizeMode: 'stretch' }} source={{ uri: item.icon }}/>}
                    </react_native_1.TouchableWithoutFeedback>);
    }}/>
        </>);
};
