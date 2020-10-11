"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var Scale_1 = require("../../../public/tools/Scale");
var MoreGameButton = function (_a) {
    var onPress = _a.onPress, title = _a.title, logo = _a.logo;
    return (<react_native_1.TouchableWithoutFeedback onPress={onPress}>
      <react_native_1.View style={{
        width: '90%',
        flexDirection: 'row',
        aspectRatio: 4.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: Scale_1.scale(1),
        borderColor: '#5B5B5B',
        paddingVertical: Scale_1.scale(10),
        alignSelf: 'center',
    }}>
        <react_native_1.View style={{ flex: 4, flexDirection: 'row', height: '100%' }}>
          <react_native_fast_image_1.default source={{ uri: logo }} style={{ height: '100%', aspectRatio: 1 }} resizeMode={'contain'}/>
          <react_native_1.View style={{ justifyContent: 'center', paddingLeft: Scale_1.scale(10) }}>
            <react_native_1.Text style={{ color: '#ffffff' }}>{title}</react_native_1.Text>
            
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={{ flex: 1, borderColor: '#fb5858', justifyContent: 'center', alignItems: 'center', borderWidth: Scale_1.scale(1), height: '50%', borderRadius: Scale_1.scale(5) }}>
          <react_native_1.Text style={{ color: '#fb5858' }}>{'去游戏'}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
exports.default = MoreGameButton;
