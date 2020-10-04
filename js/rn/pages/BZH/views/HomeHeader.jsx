"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var Scale_1 = require("../../../public/tools/Scale");
var Button_1 = require("../../../public/views/tars/Button");
var HomeHeader = function (_a) {
    var uid = _a.uid, _b = _a.name, name = _b === void 0 ? '' : _b, _c = _a.balance, balance = _c === void 0 ? '' : _c, onPressSignIn = _a.onPressSignIn, onPressSignUp = _a.onPressSignUp, onPressUser = _a.onPressUser, isTest = _a.isTest, logo = _a.logo;
    return (<>
      {uid ? (<react_native_1.View style={styles.row}>
          <react_native_1.View style={styles.left}>{isTest ? <Button_1.default title={'注 册'} containerStyle={styles.button} titleStyle={styles.buttonTitle} onPress={onPressSignUp}/> : null}</react_native_1.View>
          <react_native_1.View style={styles.imageContainer}>
            <react_native_fast_image_1.default source={{
        uri: logo,
    }} style={styles.logo} resizeMode={'contain'}/>
          </react_native_1.View>
          <react_native_1.TouchableWithoutFeedback onPress={onPressUser}>
            <react_native_1.View style={styles.right}>
              <react_native_1.Text numberOfLines={1} style={{ color: '#ffffff', fontSize: Scale_1.scale(18) }}>
                {name}
              </react_native_1.Text>
              <react_native_1.Text numberOfLines={1} style={{ color: '#ffffff', fontSize: Scale_1.scale(18) }}>
                {'￥' + balance}
              </react_native_1.Text>
            </react_native_1.View>
          </react_native_1.TouchableWithoutFeedback>
        </react_native_1.View>) : (<react_native_1.View style={styles.row}>
            <react_native_1.View style={styles.left}>
              <Button_1.default title={'登 录'} containerStyle={styles.button} titleStyle={styles.buttonTitle} onPress={onPressSignIn}/>
            </react_native_1.View>
            <react_native_1.View style={styles.imageContainer}>
              <react_native_fast_image_1.default source={{
        uri: logo,
    }} style={styles.logo} resizeMode={'contain'}/>
            </react_native_1.View>
            <react_native_1.View style={styles.right}>
              <Button_1.default title={'注 册'} containerStyle={styles.button} titleStyle={styles.buttonTitle} onPress={onPressSignUp}/>
            </react_native_1.View>
          </react_native_1.View>)}
    </>);
};
var styles = react_native_1.StyleSheet.create({
    text: {
        fontSize: Scale_1.scale(20),
        color: '#ffffff',
    },
    button: {
        width: Scale_1.scale(65),
        backgroundColor: '#d82e2f',
        borderColor: '#fefefe',
        borderWidth: Scale_1.scale(1.5),
        paddingVertical: Scale_1.scale(5),
        borderRadius: Scale_1.scale(5),
    },
    buttonTitle: {
        fontSize: Scale_1.scale(18),
        color: '#ffffff',
    },
    logo: {
        width: '100%',
        height: '100%',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    left: { flex: 1 },
    right: { flex: 1, alignItems: 'flex-end' },
});
exports.default = HomeHeader;
