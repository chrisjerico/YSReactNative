"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var Scale_1 = require("../../../public/tools/Scale");
var tars_1 = require("../../../public/tools/tars");
var getHtml5Image = tars_1.useHtml5Image().getHtml5Image;
var PreferenceButton = function (_a) {
    var title = _a.title, _b = _a.selected, selected = _b === void 0 ? false : _b, onPress = _a.onPress;
    return (<react_native_1.View style={{ width: '30%', marginBottom: Scale_1.scale(31) }}>
      <react_native_1.TouchableWithoutFeedback onPress={onPress}>
        <react_native_1.View style={[
        styles.buttonContainer,
        {
            backgroundColor: selected ? '#c21632' : '#D0D0D0',
        },
    ]}>
          <react_native_1.Text style={{
        fontSize: Scale_1.scale(20),
        color: selected ? '#ffffff' : '#7B7B7B',
    }}>
            {title}
          </react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableWithoutFeedback>
      {selected && (<react_native_fast_image_1.default source={{ uri: getHtml5Image(14, 'choose') }} style={{
        width: Scale_1.scale(25),
        aspectRatio: 1,
        position: 'absolute',
        right: Scale_1.scale(-5),
        top: Scale_1.scale(-15),
    }} resizeMode={'contain'}/>)}
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    buttonContainer: {
        width: '100%',
        aspectRatio: 2.8,
        borderRadius: Scale_1.scale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
});
exports.default = PreferenceButton;
