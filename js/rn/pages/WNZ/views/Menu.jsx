"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_dash_1 = require("react-native-dash");
var Scale_1 = require("../../../public/tools/Scale");
var Menu = function (_a) {
    var color = _a.color, title = _a.title, onPress = _a.onPress;
    return (<react_native_1.TouchableWithoutFeedback onPress={onPress}>
      <react_native_1.View>
        <react_native_1.View style={styles.menuConatiner}>
          <react_native_1.Text style={{
        fontSize: Scale_1.scale(23),
        color: color,
    }}>
            {title}
          </react_native_1.Text>
        </react_native_1.View>
        <react_native_dash_1.default style={{ width: '100%', height: Scale_1.scale(1) }} dashGap={2} dashLength={4} dashThickness={1} dashColor={'#d9d9d9'}/>
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
var styles = react_native_1.StyleSheet.create({
    menuConatiner: {
        width: '100%',
        aspectRatio: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
exports.default = Menu;
