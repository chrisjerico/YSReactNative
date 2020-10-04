"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Scale_1 = require("../../tools/Scale");
var TouchableImage_1 = require("../../views/tars/TouchableImage");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var ActivityComponent = function (_a) {
    var logo = _a.logo, onPress = _a.onPress, show = _a.show, _b = _a.enableFastImage, enableFastImage = _b === void 0 ? true : _b, containerStyle = _a.containerStyle, refreshing = _a.refreshing;
    var _c = react_1.useState(false), hide = _c[0], setHide = _c[1];
    react_1.useEffect(function () {
        setHide(false);
    }, [refreshing]);
    if (show && !hide) {
        return (<react_native_1.View style={[styles.container, containerStyle]}>
        <TouchableImage_1.default containerStyle={{ padding: Scale_1.scale(20) }} enableFastImage={enableFastImage} pic={logo} onPress={onPress} resizeMode={'contain'}/>
        <react_native_1.TouchableWithoutFeedback onPress={function () {
            setHide(true);
        }}>
          <react_native_1.View style={styles.iconContainer}>
            <AntDesign_1.default name={'closecircleo'} size={Scale_1.scale(35)} color={'red'}/>
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
        width: Scale_1.scale(150),
        aspectRatio: 1,
        position: 'absolute',
    },
    iconContainer: {
        width: Scale_1.scale(35),
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Scale_1.scale(35),
        position: 'absolute',
        top: Scale_1.scale(20),
        right: Scale_1.scale(20),
    },
});
exports.default = ActivityComponent;
