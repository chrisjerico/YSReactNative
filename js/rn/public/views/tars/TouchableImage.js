"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var TouchableImage = function (_a) {
    var onPress = _a.onPress, pic = _a.pic, containerStyle = _a.containerStyle, _b = _a.resizeMode, resizeMode = _b === void 0 ? 'cover' : _b, _c = _a.enableFastImage, enableFastImage = _c === void 0 ? true : _c, onLoad = _a.onLoad, onLoadStart = _a.onLoadStart, onLoadEnd = _a.onLoadEnd, onError = _a.onError;
    var ImageComponent = enableFastImage ? react_native_fast_image_1.default : react_native_1.Image;
    return (react_1.default.createElement(react_native_1.TouchableWithoutFeedback, { onPress: onPress },
        react_1.default.createElement(react_native_1.View, { style: [styles.container, containerStyle] },
            react_1.default.createElement(ImageComponent, { style: styles.image, source: { uri: pic }, resizeMode: resizeMode, onLoad: onLoad, onLoadStart: onLoadStart, onLoadEnd: onLoadEnd, onError: onError }))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
exports.default = TouchableImage;
//# sourceMappingURL=TouchableImage.js.map