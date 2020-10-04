"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageButton = void 0;
var react_native_1 = require("react-native");
var React = require("react");
var defaultImgStyle = {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center"
};
exports.ImageButton = function (_a) {
    var uri = _a.uri, imgStyle = _a.imgStyle, source = _a.source, onPress = _a.onPress;
    return (<react_native_1.TouchableWithoutFeedback onPress={function () { return onPress(); }}>
            <react_native_1.Image style={[defaultImgStyle, imgStyle]} source={source || { uri: uri }}/>
        </react_native_1.TouchableWithoutFeedback>);
};
