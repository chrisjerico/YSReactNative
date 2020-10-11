"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Scale_1 = require("../../tools/Scale");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var UserCenterItem = function (_a) {
    var _b = _a.logo, logo = _b === void 0 ? '' : _b, title = _a.title, onPress = _a.onPress, containerStyle = _a.containerStyle, _c = _a.showUnReadMsg, showUnReadMsg = _c === void 0 ? false : _c, unreadMsg = _a.unreadMsg, _d = _a.arrowColor, arrowColor = _d === void 0 ? '#000000' : _d, titleStyle = _a.titleStyle;
    return (<react_native_1.TouchableWithoutFeedback onPress={onPress}>
      <react_native_1.View style={[styles.container, containerStyle]}>
        <react_native_1.View style={styles.imageContainer}>
          <react_native_1.Image resizeMode={'contain'} style={styles.image} source={{ uri: logo }}/>
          <react_native_1.Text style={[styles.title, titleStyle]}>{title}</react_native_1.Text>
        </react_native_1.View>
        {showUnReadMsg ? (<react_native_1.View style={styles.unReadContainer}>
            <react_native_1.Text style={styles.unReadText}>{unreadMsg > 99 ? 99 : unreadMsg}</react_native_1.Text>
          </react_native_1.View>) : (<AntDesign_1.default name={'right'} color={arrowColor} size={Scale_1.scale(20)}/>)}
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 490 / 75,
        borderBottomColor: '#F0F0F0',
        borderBottomWidth: Scale_1.scale(1),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Scale_1.scale(15),
        alignSelf: 'center',
    },
    imageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: Scale_1.scale(35),
        aspectRatio: 1,
    },
    text: {
        fontSize: Scale_1.scale(25),
    },
    title: {
        fontSize: Scale_1.scale(30),
        fontWeight: '300',
        paddingLeft: Scale_1.scale(25),
    },
    unReadContainer: {
        width: Scale_1.scale(30),
        aspectRatio: 1,
        borderRadius: Scale_1.scale(30),
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unReadText: {
        color: '#ffffff',
        fontSize: Scale_1.scale(20),
    },
});
exports.default = UserCenterItem;
