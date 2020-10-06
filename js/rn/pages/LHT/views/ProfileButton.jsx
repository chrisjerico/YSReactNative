"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var Scale_1 = require("../../../public/tools/Scale");
var ProfileButton = function (_a) {
    var _b = _a.title, title = _b === void 0 ? 'title' : _b, _c = _a.logo, logo = _c === void 0 ? '' : _c, onPress = _a.onPress;
    return (<react_native_1.TouchableWithoutFeedback onPress={onPress}>
      <react_native_1.View style={styles.container}>
        <react_native_1.Text style={styles.title}>{title}</react_native_1.Text>
        <react_native_fast_image_1.default style={styles.image} resizeMode={'contain'} source={{
        uri: logo,
    }}/>
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: Scale_1.scale(158),
        aspectRatio: 2.8,
        backgroundColor: '#ff6b1b',
        borderRadius: Scale_1.scale(10),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '15%',
        aspectRatio: 1,
        paddingLeft: Scale_1.scale(5),
    },
    title: {
        paddingRight: Scale_1.scale(5),
        color: '#ffffff',
        fontWeight: '500',
    },
});
exports.default = ProfileButton;
