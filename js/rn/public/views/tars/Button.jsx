"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button = function (_a) {
    var containerStyle = _a.containerStyle, disabledContainerStyle = _a.disabledContainerStyle, titleStyle = _a.titleStyle, title = _a.title, _b = _a.numberOfLines, numberOfLines = _b === void 0 ? 1 : _b, onPress = _a.onPress, _c = _a.disabled, disabled = _c === void 0 ? false : _c;
    return (<react_native_1.TouchableWithoutFeedback onPress={disabled ? null : onPress}>
      <react_native_1.View style={disabled ? [styles.disabledContainer, disabledContainerStyle] : [styles.container, containerStyle]}>
        <react_native_1.Text style={[styles.title, titleStyle]} numberOfLines={numberOfLines}>{title}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {},
    disabledContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c6c6c6'
    }
});
exports.default = Button;
