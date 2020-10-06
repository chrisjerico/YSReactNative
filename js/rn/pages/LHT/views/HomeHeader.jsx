"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var LHThemeColor_1 = require("../../../public/theme/colors/LHThemeColor");
var Scale_1 = require("../../../public/tools/Scale");
var Avatar_1 = require("../../../public/views/tars/Avatar");
var LinearBadge_1 = require("../../../public/views/tars/LinearBadge");
var HomeHeader = function (_a) {
    var _b = _a.avatar, avatar = _b === void 0 ? '' : _b, _c = _a.name, name = _c === void 0 ? '' : _c, _d = _a.leftLogo, leftLogo = _d === void 0 ? '' : _d, _e = _a.rightLogo, rightLogo = _e === void 0 ? '' : _e, _f = _a.showLogout, showLogout = _f === void 0 ? false : _f, onPressSignOut = _a.onPressSignOut, onPressSignIn = _a.onPressSignIn, onPressSignUp = _a.onPressSignUp, onPressTryPlay = _a.onPressTryPlay, onPressLogo = _a.onPressLogo;
    return (<react_native_1.View style={{ flex: 1, flexDirection: 'row' }}>
      <react_native_1.View style={styles.leftContainer}>
        <react_native_fast_image_1.default resizeMode={'stretch'} style={styles.image} source={{ uri: leftLogo }}/>
      </react_native_1.View>
      <react_native_1.View style={styles.rightContainer}>
        {showLogout ? (<>
            <Avatar_1.default uri={avatar} size={40}/>
            <react_native_1.View style={styles.nameContainer}>
              <react_native_1.Text style={styles.nameText} numberOfLines={1}>
                {name}
              </react_native_1.Text>
            </react_native_1.View>
            <LinearBadge_1.default showIcon={false} title={'退出'} colors={['#ffffff', '#ffffff']} containerStyle={styles.badgeContainer} textStyle={{ color: LHThemeColor_1.LHThemeColor.六合厅.themeColor, fontSize: Scale_1.scale(20) }} onPress={onPressSignOut}/>
            <react_native_1.Text style={styles.text}>{' | '}</react_native_1.Text>
            <react_native_1.TouchableWithoutFeedback onPress={onPressLogo}>
              <react_native_fast_image_1.default style={{ width: Scale_1.scale(40), aspectRatio: 1 }} resizeMode={'contain'} source={{ uri: rightLogo }}/>
            </react_native_1.TouchableWithoutFeedback>
          </>) : (<>
            <react_native_1.TouchableWithoutFeedback onPress={onPressLogo}>
              <react_native_fast_image_1.default style={{ width: Scale_1.scale(40), aspectRatio: 1 }} resizeMode={'contain'} source={{ uri: rightLogo }}/>
            </react_native_1.TouchableWithoutFeedback>
            <react_native_1.Text style={styles.text}>{' | '}</react_native_1.Text>
            <react_native_1.TouchableWithoutFeedback onPress={onPressSignIn}>
              <react_native_1.Text style={styles.text}>{'登录'}</react_native_1.Text>
            </react_native_1.TouchableWithoutFeedback>
            <react_native_1.Text style={styles.text}>{' | '}</react_native_1.Text>
            <react_native_1.TouchableWithoutFeedback onPress={onPressSignUp}>
              <react_native_1.Text style={styles.text}>{'注册'}</react_native_1.Text>
            </react_native_1.TouchableWithoutFeedback>
            <react_native_1.Text style={styles.text}>{' | '}</react_native_1.Text>
            <react_native_1.TouchableWithoutFeedback onPress={onPressTryPlay}>
              <react_native_1.Text style={styles.text}>{'试玩'}</react_native_1.Text>
            </react_native_1.TouchableWithoutFeedback>
          </>)}
      </react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: Scale_1.scale(20),
        color: '#ffffff',
    },
    badgeContainer: {
        backgroundColor: '#ffffff',
        paddingLeft: Scale_1.scale(10),
        paddingRight: Scale_1.scale(10),
        width: Scale_1.scale(75),
        height: Scale_1.scale(32),
        borderRadius: Scale_1.scale(75),
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    nameContainer: {
        maxWidth: Scale_1.scale(150),
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameText: {
        color: '#ffffff',
        fontSize: Scale_1.scale(23),
        paddingHorizontal: Scale_1.scale(5),
    },
});
exports.default = HomeHeader;
