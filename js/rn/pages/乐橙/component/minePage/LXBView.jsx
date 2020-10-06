"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseScreen_1 = require("../BaseScreen");
var React = require("react");
var react_native_1 = require("react-native");
var LXBView = function () {
    return (<BaseScreen_1.BaseScreen style={{ backgroundColor: "#ffffff" }} screenName={"利息宝"} icon={'home'}>
            <react_native_1.View style={{ alignItems: 'center', marginVertical: 20 }}>
                <react_native_1.Text style={{ color: "#333333", fontSize: 14, marginVertical: 10 }}>今日收益(元)</react_native_1.Text>
                <react_native_1.Text style={{ fontSize: 30, color: "#333333", fontWeight: "bold", paddingBottom: 10 }}>0</react_native_1.Text>
                <react_native_1.View style={{ flexDirection: "row", paddingBottom: 10 }}>
                    <react_native_1.Text style={{ color: "#333333", fontSize: 14 }}>利息宝余额：</react_native_1.Text>
                    <react_native_1.Text style={{ color: "#F70C0D", fontSize: 14 }}>0.0000000000元</react_native_1.Text>
                    <react_native_1.Text style={{ color: "#333333", fontSize: 14 }}>,年化率：</react_native_1.Text>
                    <react_native_1.Text style={{ color: "#F70C0D", fontSize: 14 }}>12%</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{ flexDirection: "row", paddingBottom: 10 }}>
                    <react_native_1.Text style={{ color: "#333333", fontSize: 14 }}>体验金：</react_native_1.Text>
                    <react_native_1.Text style={{ color: "#F70C0D", fontSize: 14 }}>0.00元</react_native_1.Text>
                </react_native_1.View>
            </react_native_1.View>
            <react_native_1.View style={{ flexDirection: "row", borderTopWidth: 1, borderColor: "#DEDEDE", borderBottomWidth: 1 }}>
                <react_native_1.View style={{ height: 114, flex: 1 / 3, alignItems: "center", justifyContent: "center" }}>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B", paddingBottom: 20 }}>0</react_native_1.Text>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B" }}>本周收益</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{
        flex: 1 / 3,
        alignItems: "center",
        borderColor: "#DEDEDE",
        borderRightWidth: 1,
        borderLeftWidth: 1,
        justifyContent: "center"
    }}>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B", paddingBottom: 20 }}>0</react_native_1.Text>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B" }}>本月收益</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{ height: 114, flex: 1 / 3, alignItems: "center", justifyContent: "center" }}>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B", paddingBottom: 20 }}>0</react_native_1.Text>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B" }}>
                        总收益
                    </react_native_1.Text>
                </react_native_1.View>
            </react_native_1.View>
            <react_native_1.View style={{ flexDirection: "row", borderColor: "#DEDEDE", borderBottomWidth: 1 }}>
                <react_native_1.View style={{ height: 114, flex: 1 / 3, alignItems: "center", justifyContent: "center" }}>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B", paddingBottom: 20 }}>0</react_native_1.Text>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B" }}>本周收益</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{
        flex: 1 / 3,
        alignItems: "center",
        borderColor: "#DEDEDE",
        borderRightWidth: 1,
        borderLeftWidth: 1,
        justifyContent: "center"
    }}>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B", paddingBottom: 20 }}>0</react_native_1.Text>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B" }}>本月收益</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={{ height: 114, flex: 1 / 3, alignItems: "center", justifyContent: "center" }}>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B", paddingBottom: 20 }}>0</react_native_1.Text>
                    <react_native_1.Text style={{ fontSize: 14, color: "#47535B" }}>
                        总收益
                    </react_native_1.Text>
                </react_native_1.View>
            </react_native_1.View>
        </BaseScreen_1.BaseScreen>);
};
exports.default = LXBView;
