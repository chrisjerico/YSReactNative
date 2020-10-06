"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Scale_1 = require("../../../public/tools/Scale");
var ButtonGroup = function (_a) {
    var leftLogo = _a.leftLogo, rightLogo = _a.rightLogo, leftTitle = _a.leftTitle, rightTitle = _a.rightTitle, onPressLeftButton = _a.onPressLeftButton, onPressRightButton = _a.onPressRightButton;
    return (<react_native_1.View style={styles.container}>
      <react_native_1.TouchableWithoutFeedback onPress={onPressLeftButton}>
        <react_native_1.View style={styles.leftButtonContainer}>
          <react_native_1.View style={styles.leftButton}>
            <react_native_1.Image source={{ uri: leftLogo }} style={{ width: Scale_1.scale(34), aspectRatio: 34 / 27 }}/>
            <react_native_1.Text style={{ fontSize: Scale_1.scale(25), paddingLeft: Scale_1.scale(10) }}>{leftTitle}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.TouchableWithoutFeedback>
      <react_native_1.TouchableWithoutFeedback onPress={onPressRightButton}>
        <react_native_1.View style={styles.rightButtonContainer}>
          <react_native_1.Image source={{ uri: rightLogo }} style={{ width: Scale_1.scale(34), aspectRatio: 34 / 27 }}/>
          <react_native_1.Text style={{ fontSize: Scale_1.scale(25), paddingLeft: Scale_1.scale(10) }}>{rightTitle}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableWithoutFeedback>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 500 / 73,
        flexDirection: 'row',
        paddingHorizontal: Scale_1.scale(10),
        marginTop: Scale_1.scale(12),
        marginBottom: Scale_1.scale(7),
    },
    leftButtonContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: Scale_1.scale(5),
        borderBottomLeftRadius: Scale_1.scale(5),
    },
    leftButton: {
        flexDirection: 'row',
        borderRightWidth: Scale_1.scale(1),
        borderRightColor: '#d9d9d9',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        width: '100%',
    },
    rightButtonContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: Scale_1.scale(5),
        borderBottomRightRadius: Scale_1.scale(5),
    },
});
exports.default = ButtonGroup;
