"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var Scale_1 = require("../../tools/Scale");
var LinearBadge = function (_a) {
    var title = _a.title, colors = _a.colors, onPress = _a.onPress, _b = _a.showIcon, showIcon = _b === void 0 ? true : _b, containerStyle = _a.containerStyle, textStyle = _a.textStyle, _c = _a.size, size = _c === void 0 ? 1 : _c, showLogo = _a.showLogo, logoStyle = _a.logoStyle, logo = _a.logo;
    return (<react_native_1.TouchableWithoutFeedback onPress={onPress}>
    <react_native_linear_gradient_1.default start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={colors} // ['#9393FF', 'rgb(91, 91, 220)']
     style={[
        styles.container,
        {
            width: Scale_1.scale(125 * size),
            borderRadius: Scale_1.scale(50 * size),
        },
        containerStyle,
    ]}>
      {showLogo && (<react_native_1.View style={[styles.logo, logoStyle]}>
          <react_native_fast_image_1.default style={{ width: '100%', height: '100%' }} resizeMode={'contain'} source={{ uri: logo }}/>
        </react_native_1.View>)}
      <react_native_1.Text style={[styles.text, textStyle]}>{title}</react_native_1.Text>
      {showIcon && <react_native_elements_1.Icon style={{ marginLeft: Scale_1.scale(5) }} type={'AntDesign'} name={'link'} size={Scale_1.scale(20)} color={'#ffffff'}/>}
    </react_native_linear_gradient_1.default>
  </react_native_1.TouchableWithoutFeedback>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        height: Scale_1.scale(33),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#ffffff',
    },
    logo: {
        width: Scale_1.scale(30),
        height: Scale_1.scale(30),
        marginRight: Scale_1.scale(10),
    },
});
exports.default = LinearBadge;
