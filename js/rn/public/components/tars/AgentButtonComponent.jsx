"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Scale_1 = require("../../tools/Scale");
var Enum_1 = require("../../models/Enum");
var AgentButtonComponent = function (_a) {
    var onChangeAgent = _a.onChangeAgent, visible = _a.visible, containerStyle = _a.containerStyle, enableToggleContainerStyle = _a.enableToggleContainerStyle, enableTextStyle = _a.enableTextStyle;
    var _b = react_1.useState(Enum_1.AgentType.用户注册), toggle = _b[0], setToggle = _b[1];
    react_1.useEffect(function () {
        onChangeAgent && onChangeAgent(toggle);
    }, []);
    if (visible) {
        return (<react_native_1.View style={[styles.container, containerStyle]}>
        <react_native_1.TouchableWithoutFeedback onPress={function () {
            setToggle(Enum_1.AgentType.用户注册);
            onChangeAgent && onChangeAgent(Enum_1.AgentType.用户注册);
        }}>
          <react_native_1.View style={[styles.toggleContainer, styles.leftButton, toggle == Enum_1.AgentType.用户注册 ? [styles.enableToggleContainer, enableToggleContainerStyle] : [styles.disableToggleContainer]]}>
            <react_native_1.Text style={[styles.text, toggle == Enum_1.AgentType.用户注册 ? [styles.enableText, enableTextStyle] : {}]}>{'普通用戶'}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
        <react_native_1.TouchableWithoutFeedback onPress={function () {
            setToggle(Enum_1.AgentType.代理注册);
            onChangeAgent && onChangeAgent(Enum_1.AgentType.代理注册);
        }}>
          <react_native_1.View style={[styles.toggleContainer, styles.rightButton, toggle == Enum_1.AgentType.代理注册 ? [styles.enableToggleContainer, enableToggleContainerStyle] : [styles.disableToggleContainer]]}>
            <react_native_1.Text style={[styles.text, toggle == Enum_1.AgentType.代理注册 ? [styles.enableText, enableTextStyle] : {}]}>{'注册代理'}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.View>);
    }
    else {
        return null;
    }
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: Scale_1.scale(150),
        aspectRatio: 5,
        // borderRadius: scale(5),
        alignSelf: 'center',
    },
    toggleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: Scale_1.scale(15),
    },
    enableText: {
        color: '#ffffff',
    },
    enableToggleContainer: {
        backgroundColor: '#007aff',
    },
    leftButton: {
        borderTopLeftRadius: Scale_1.scale(5),
        borderBottomLeftRadius: Scale_1.scale(5),
        borderColor: '#d9d9d9',
        borderWidth: Scale_1.scale(0.5),
        borderRightWidth: 0,
    },
    rightButton: {
        borderTopRightRadius: Scale_1.scale(5),
        borderBottomRightRadius: Scale_1.scale(5),
        borderColor: '#d9d9d9',
        borderWidth: Scale_1.scale(0.5),
        borderLeftWidth: 0,
    },
    disableToggleContainer: {
        backgroundColor: '#ffffff',
    },
});
exports.default = AgentButtonComponent;
