"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarqueeView = void 0;
var react_native_1 = require("react-native");
var React = require("react");
var react_native_marquee_ab_1 = require("react-native-marquee-ab");
var Foundation_1 = require("react-native-vector-icons/Foundation");
var react_native_modal_1 = require("react-native-modal");
var react_1 = require("react");
var width = react_native_1.Dimensions.get("screen").width;
exports.MarqueeView = function (_a) {
    var textArr = _a.textArr;
    var _b = react_1.useState(false), showModal = _b[0], setShowModal = _b[1];
    var _c = react_1.useState(), clickedItem = _c[0], setClickItem = _c[1];
    return (<react_native_1.View style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        marginVertical: 6
    }}>
            <Foundation_1.default size={20} style={{ color: "red", marginLeft: 10 }} name={"volume"}/>
            <react_native_marquee_ab_1.MarqueeHorizontal textList={textArr} separator={width - 90} speed={60} width={width - 55} height={30} direction={'left'} reverse={false} textStyle={{ fontSize: 16, color: '#000000' }} onTextClick={function (item) {
        setClickItem(item);
        setShowModal(true);
    }}/>
            <react_native_modal_1.default isVisible={showModal}>
                <react_native_1.View>
                    <react_native_1.View style={{
        backgroundColor: '#e7e7e7',
        alignItems: "center",
        paddingVertical: 16,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8
    }}>
                        <react_native_1.Text style={{ color: 'black', fontSize: 16 }}>公告</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={{
        backgroundColor: "white", alignItems: "center", borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8
    }}>
                        <react_native_1.Text style={{ paddingVertical: 16, fontSize: 16 }}>{(clickedItem === null || clickedItem === void 0 ? void 0 : clickedItem.value) || ""}</react_native_1.Text>
                        <react_native_1.View style={{ flexDirection: "row", paddingVertical: 8 }}>
                            <react_native_1.TouchableOpacity onPress={function () {
        setShowModal(false);
    }} style={{
        borderColor: 'rgb(178, 178, 178)',
        borderWidth: 1,
        borderRadius: 6,
        backgroundColor: "#e7e7e7",
        paddingVertical: 16,
        flex: 1,
        alignItems: "center",
        marginHorizontal: 8
    }}>
                                <react_native_1.Text>取消</react_native_1.Text>
                            </react_native_1.TouchableOpacity>
                            <react_native_1.TouchableOpacity onPress={function () {
        setShowModal(false);
    }} style={{
        backgroundColor: "#d82e2f",
        alignItems: "center",
        borderRadius: 6,
        paddingVertical: 16,
        flex: 1,
        marginHorizontal: 8
    }}>
                                <react_native_1.Text style={{ color: "white" }}>确定</react_native_1.Text>
                            </react_native_1.TouchableOpacity>
                        </react_native_1.View>
                    </react_native_1.View>
                </react_native_1.View>
            </react_native_modal_1.default>
        </react_native_1.View>);
};
