"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var MaterialCommunityIcons_1 = require("react-native-vector-icons/MaterialCommunityIcons");
var Scale_1 = require("../../../public/tools/Scale");
var SignHeader = function (_a) {
    var onPressLeftTool = _a.onPressLeftTool, onPressMenu = _a.onPressMenu, onPressSign = _a.onPressSign;
    return (<react_native_1.View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
      <react_native_1.TouchableWithoutFeedback onPress={onPressLeftTool}>
        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', height: '100%' }}>
          <AntDesign_1.default name={'left'} color={'#ffffff'} size={Scale_1.scale(25)}/>
          <react_native_1.Text style={{
        color: '#ffffff',
        paddingLeft: Scale_1.scale(10),
        fontSize: Scale_1.scale(20),
    }}>
            {'返回'}
          </react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableWithoutFeedback>
      <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <react_native_1.TouchableWithoutFeedback onPress={onPressSign}>
          <react_native_1.View style={{
        paddingRight: Scale_1.scale(10),
        height: '100%',
        justifyContent: 'center',
    }}>
            <react_native_1.Text style={{ color: '#ffffff', fontSize: Scale_1.scale(20) }}>{'登录/注册'}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
        <react_native_1.TouchableWithoutFeedback onPress={onPressMenu}>
          <react_native_1.View style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    }}>
            <MaterialCommunityIcons_1.default name={'settings-outline'} size={Scale_1.scale(20)} style={{ marginRight: Scale_1.scale(5) }} color={'#ffffff'}/>
            <react_native_1.Text style={{ fontSize: Scale_1.scale(20), color: '#ffffff' }}>{'菜单'}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = SignHeader;
