"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Scale_1 = require("../../tools/Scale");
var BottomLogo = function (_a) {
    var webName = _a.webName, onPressComputer = _a.onPressComputer, onPressPromotion = _a.onPressPromotion, containerStyle = _a.containerStyle, version = _a.version, _b = _a.debug, debug = _b === void 0 ? true : _b, titleStyle = _a.titleStyle, subTitleStyle = _a.subTitleStyle;
    return (<react_native_1.View style={[styles.containerStyle, containerStyle]}>
      <react_native_1.View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <react_native_1.TouchableWithoutFeedback onPress={onPressComputer}>
          <react_native_1.Text style={[
        {
            color: '#000000',
        },
        titleStyle,
    ]}>
            {'💻电脑版'}
          </react_native_1.Text>
        </react_native_1.TouchableWithoutFeedback>
        <react_native_1.TouchableWithoutFeedback onPress={onPressPromotion}>
          <react_native_1.Text style={[
        {
            color: '#000000',
        },
        titleStyle,
    ]}>
            {'🎁优惠活动'}
          </react_native_1.Text>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.View>
      <react_native_1.Text style={[
        {
            color: '#000000',
            textAlign: 'center',
            paddingTop: Scale_1.scale(10),
        },
        subTitleStyle,
    ]}>
        {'COPYRIGHT © ' + webName + 'RESERVED'}
      </react_native_1.Text>
      {debug ? <react_native_1.Text style={{ color: '#000000', textAlign: 'center' }}>{'VERSION : ' + version}</react_native_1.Text> : null}
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    containerStyle: {
        marginTop: Scale_1.scale(30),
    },
});
exports.default = BottomLogo;
