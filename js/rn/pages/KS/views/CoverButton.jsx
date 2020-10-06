"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var Scale_1 = require("../../../public/tools/Scale");
var CoverButton = function (_a) {
    var logo = _a.logo, title = _a.title, containerStyle = _a.containerStyle, titleStyle = _a.titleStyle, onPress = _a.onPress;
    return (<react_native_1.TouchableWithoutFeedback onPress={onPress}>
      <react_native_1.View style={[containerStyle]}>
        <react_native_fast_image_1.default source={{ uri: logo }} style={{ width: '100%', height: '100%' }} resizeMode={'contain'}/>
        <react_native_1.Text style={[styles.title, titleStyle]} numberOfLines={1}>
          {title}
        </react_native_1.Text>
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
var styles = react_native_1.StyleSheet.create({
    title: {
        color: '#ffffff',
        position: 'absolute',
        left: Scale_1.scale(15),
        top: Scale_1.scale(15),
        width: '90%',
    },
});
exports.default = CoverButton;
