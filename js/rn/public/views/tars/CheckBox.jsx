"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Feather_1 = require("react-native-vector-icons/Feather");
var Scale_1 = require("../../../public/tools/Scale");
var CheckBox = function (_a) {
    var onPress = _a.onPress, label = _a.label, containerStyle = _a.containerStyle, labelTextStyle = _a.labelTextStyle, _b = _a.defaultValue, defaultValue = _b === void 0 ? false : _b;
    var _c = react_1.useState(defaultValue), check = _c[0], setCheck = _c[1];
    return (<react_native_1.TouchableWithoutFeedback onPress={function () {
        onPress && onPress(!check);
        setCheck(!check);
    }}>
      <react_native_1.View style={[styles.container, containerStyle]}>
        {check ? (<Feather_1.default name={'check'} color={'#ffffff'} style={styles.iconStyle} size={Scale_1.scale(25)}/>) : (<react_native_1.View style={styles.nonCheckContainer}></react_native_1.View>)}
        <react_native_1.Text style={[styles.label, labelTextStyle]}>{label}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        // width: scale(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: { paddingLeft: Scale_1.scale(10) },
    nonCheckContainer: {
        width: Scale_1.scale(25),
        aspectRatio: 1,
        borderColor: 'blue',
        borderWidth: Scale_1.scale(1),
    },
    iconStyle: {
        backgroundColor: 'blue',
        width: Scale_1.scale(25),
        aspectRatio: 1,
    },
});
exports.default = CheckBox;
