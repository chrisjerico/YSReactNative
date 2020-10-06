"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hooks_1 = require("@react-native-community/hooks");
var react_native_1 = require("react-native");
var react_native_autoheight_webview_1 = require("react-native-autoheight-webview");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_1 = require("react");
var MarqueePopupView = function (_a) {
    var content = _a.content, show = _a.show, onPress = _a.onPress, onDismiss = _a.onDismiss;
    var _b = hooks_1.useDimensions().screen, width = _b.width, height = _b.height;
    if (show) {
        return (<react_native_1.View style={{ width: width, height: height, position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1000, marginBottom: 10 }}>
        <react_native_1.View style={{ width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 15 }}>
          <react_native_1.View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
            <react_native_1.Text style={{ fontSize: 16, fontWeight: "bold" }}>公告详情</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1, paddingHorizontal: 10 }}>
            <react_native_autoheight_webview_1.default style={{ width: width * 0.9 - 20 }} source={{ html: content }}></react_native_autoheight_webview_1.default>
          </react_native_1.View>
          <react_native_1.View style={{ height: 70, paddingBottom: 10, paddingHorizontal: 5, justifyContent: 'space-between', width: "100%", flexDirection: 'row' }}>
            <react_native_gesture_handler_1.TouchableOpacity onPress={onDismiss} style={{
            justifyContent: 'center', alignItems: 'center',
            width: "47%", height: 50, backgroundColor: 'white',
            borderRadius: 5, borderColor: "gray", borderWidth: 0.5
        }}>
              <react_native_1.Text>取消</react_native_1.Text>
            </react_native_gesture_handler_1.TouchableOpacity>
            <react_native_gesture_handler_1.TouchableOpacity onPress={onPress} style={{
            justifyContent: 'center',
            alignItems: 'center', width: "47%", height: 50,
            backgroundColor: '#46A3FF', borderRadius: 5,
            borderColor: "gray", borderWidth: 0.5
        }}>
              <react_native_1.Text style={{ color: 'white' }}>确定</react_native_1.Text>
            </react_native_gesture_handler_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>

      </react_native_1.View>);
    }
    else {
        return null;
    }
};
exports.default = MarqueePopupView;
