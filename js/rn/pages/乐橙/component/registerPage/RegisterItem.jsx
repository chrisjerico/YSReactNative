"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterItem = void 0;
var react_native_1 = require("react-native");
var React = require("react");
var react_native_elements_1 = require("react-native-elements");
exports.RegisterItem = function (_a) {
    var config = _a.config, placeHolder = _a.placeHolder, iconName = _a.iconName, _b = _a.iconType, iconType = _b === void 0 ? "font-awesome" : _b, onChangeText = _a.onChangeText;
    return (<>
            {config === false || config == 0 || config == "0" ?
        <></> :
        <react_native_1.View style={{
            flexDirection: "row",
            paddingVertical: 10,
            borderWidth: 1,
            paddingHorizontal: 12,
            borderColor: "#ddd",
            marginTop: 12
        }}>
                    <react_native_elements_1.Icon type={iconType} size={25} color={"gold"} name={iconName}/>
                    <react_native_1.TextInput onChangeText={function (text) { return onChangeText(text); }} placeholder={placeHolder} style={{ flex: 1, marginLeft: 12 }}/>
                </react_native_1.View>}
        </>);
};
