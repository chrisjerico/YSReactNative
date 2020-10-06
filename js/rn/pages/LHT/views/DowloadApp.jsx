"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var Scale_1 = require("../../../public/tools/Scale");
var DowloadApp = function (_a) {
    var onPressDowload = _a.onPressDowload;
    var _b = react_1.useState(true), show = _b[0], setShow = _b[1];
    if (show) {
        return (<react_native_1.View style={{
            width: '100%',
            aspectRatio: 7,
            position: 'absolute',
            backgroundColor: '#7B7B7B',
            bottom: 0,
            opacity: 0.9,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: Scale_1.scale(10),
            justifyContent: 'space-between',
        }}>
        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign_1.default name={'closecircle'} color={'#ffffff'} size={Scale_1.scale(23)} onPress={function () {
            setShow(false);
        }}/>
          <react_native_1.Text style={{ color: '#ffffff', fontSize: Scale_1.scale(23), marginLeft: Scale_1.scale(5) }}>{'下载App，体验更多购彩乐趣'}</react_native_1.Text>
        </react_native_1.View>
        <react_native_elements_1.Button title={'下載APP'} buttonStyle={{ backgroundColor: '#0072E3' }} onPress={onPressDowload}/>
      </react_native_1.View>);
    }
    else {
        return null;
    }
};
exports.default = DowloadApp;
