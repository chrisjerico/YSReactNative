"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBox = void 0;
var react_native_1 = require("react-native");
var Entypo_1 = require("react-native-vector-icons/Entypo");
var React = require("react");
var react_1 = require("react");
exports.CheckBox = function (_a) {
    var onCheck = _a.onCheck, style = _a.style, iconColor = _a.iconColor, activeColor = _a.activeColor, unActiveColor = _a.unActiveColor, text = _a.text;
    var _b = react_1.useState(false), active = _b[0], setActive = _b[1];
    react_1.useEffect(function () {
        active && onCheck();
    }, [active]);
    return (<react_native_1.TouchableOpacity style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    }} onPress={function () { return setActive(!active); }}>
            <react_native_1.View style={[{
            width: 18,
            height: 18,
            borderColor: "#333",
            borderWidth: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: active ? activeColor || "#0175fe" : unActiveColor || "#ffffff"
        }, style]}>
                <Entypo_1.default color={iconColor || "white"} name={"check"}/>
            </react_native_1.View>
            <react_native_1.Text style={{ color: "#333333", paddingLeft: 8 }}>{text}</react_native_1.Text>
        </react_native_1.TouchableOpacity>);
};
