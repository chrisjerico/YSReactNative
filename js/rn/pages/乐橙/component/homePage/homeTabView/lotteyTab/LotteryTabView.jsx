"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var HotLotteryView_1 = require("./HotLotteryView");
exports.LotteryTabView = function (_a) {
    var list = _a.list, thirdPartGamePress = _a.thirdPartGamePress;
    return (<react_native_1.View>
            <react_native_1.View>
                <react_native_1.Image style={{ width: "100%", height: "100%", flex: 1, resizeMode: 'cover', position: "absolute" }} source={{ uri: 'http://test30.6yc.com/views/mobileTemplate/19/images/cpbg.png' }}/>
                <react_native_1.View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
                    <react_native_1.TouchableWithoutFeedback style={{ flex: 1 }} onPress={function () { return thirdPartGamePress(list[0].id, list[0].gameId); }}>
                        <react_native_1.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <react_native_1.Image style={{
        flex: 1,
        height: 88,
        width: 150,
        resizeMode: "stretch",
    }} source={{ uri: list[0].icon }}/>
                            <react_native_1.View style={{ position: "absolute", alignSelf: "flex-start", left: 30 }}>
                                <react_native_1.Text style={{
        fontSize: 17,
        color: '#ffffff',
        fontWeight: 'bold'
    }}>{list[0].title}</react_native_1.Text>
                                <react_native_1.Text style={{
        fontSize: 13,
        color: '#ffffff',
        marginTop: 22
    }}>{list[0].subtitle}</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                    <react_native_1.TouchableWithoutFeedback style={{ flex: 1 }} onPress={function () { return thirdPartGamePress(list[1].id, list[1].gameId); }}>
                        <react_native_1.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <react_native_1.Image style={{
        flex: 1,
        height: 88,
        width: 150,
        resizeMode: "stretch",
    }} source={{ uri: list[1].icon }}/>
                            <react_native_1.View style={{ position: "absolute", alignSelf: "flex-start", left: 30 }}>
                                <react_native_1.Text style={{
        fontSize: 17,
        color: '#ffffff',
        fontWeight: 'bold'
    }}>{list[1].title}</react_native_1.Text>
                                <react_native_1.Text style={{
        fontSize: 13,
        color: '#ffffff',
        marginTop: 22
    }}>{list[1].subtitle}</react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>
            </react_native_1.View>
            <HotLotteryView_1.HotLotteryView list={list.slice(3, list.length - 1)} thirdPartGamePress={function (id, gameId) { return thirdPartGamePress(id, gameId); }}/>
        </react_native_1.View>);
};
