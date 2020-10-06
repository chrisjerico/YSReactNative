"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_autoheight_webview_1 = require("react-native-autoheight-webview");
var react_native_elements_1 = require("react-native-elements");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var Scale_1 = require("../../tools/Scale");
var TouchableImage_1 = require("../../views/tars/TouchableImage");
var AutoHeightCouponComponent = function (_a) {
    var title = _a.title, pic = _a.pic, onPress = _a.onPress, content = _a.content, containerStyle = _a.containerStyle, titleStyle = _a.titleStyle;
    var _b = react_1.useState(undefined), aspectRatio = _b[0], setAspectRatio = _b[1];
    var _c = react_1.useState(false), showPop = _c[0], setShowPop = _c[1];
    var _d = react_1.useState(true), show = _d[0], setShow = _d[1];
    if (show) {
        return (<react_native_1.View style={[{ width: '100%' }, containerStyle]}>
        <react_native_1.Text style={[styles.title, titleStyle]}>{title}</react_native_1.Text>
        <TouchableImage_1.default pic={pic} containerStyle={{ width: '100%', aspectRatio: aspectRatio }} resizeMode={'cover'} onPress={function () {
            onPress && onPress(setShowPop);
        }} onLoad={function (e) {
            var _a, _b, _c, _d;
            var width = (_b = (_a = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : 0;
            var height = (_d = (_c = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : 0;
            setAspectRatio(height == 0 || width == 0 ? undefined : width / height);
        }} onError={function () {
            setShow(false);
        }}/>
        <react_native_1.Modal visible={showPop} transparent={true}>
          <react_native_1.View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
            <react_native_1.View style={{
            width: '90%',
            height: '80%',
            backgroundColor: '#ffffff',
            borderRadius: Scale_1.scale(10),
        }}>
              <react_native_1.View style={{
            flex: 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E0E0E0',
            borderTopRightRadius: Scale_1.scale(10),
            borderTopLeftRadius: Scale_1.scale(10),
        }}>
                <react_native_1.Text style={{ fontSize: Scale_1.scale(20) }}>{title}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={{ flex: 8 }}>
                <react_native_gesture_handler_1.ScrollView showsVerticalScrollIndicator={true}>
                  <react_native_autoheight_webview_1.default style={{ width: '100%' }} scalesPageToFit={true} 
        // onSizeUpdated={size => setHeight(size?.height)}
        viewportContent={'width=device-width, user-scalable=no'} source={{
            html: "<head>\n  <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>\n  <style>img{width:auto !important;max-width:100%;height:auto !important}</style>\n  <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>\n  </head>" +
                "<script>\n  window.onload = function () {\n    window.location.hash = 1;\n    document.title = document.body.scrollHeight;\n  }\n  </script>" +
                content,
        }}/>
                </react_native_gesture_handler_1.ScrollView>
              </react_native_1.View>
              <react_native_1.View style={styles.buttonContainer}>
                <react_native_elements_1.Button activeOpacity={1} title={'取消'} onPress={function () {
            setShowPop(false);
        }} titleStyle={{ color: '#000000' }} buttonStyle={styles.cancelButton}/>
                <react_native_elements_1.Button activeOpacity={1} title={'確認'} onPress={function () {
            setShowPop(false);
        }} buttonStyle={styles.confirmButton}/>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.Modal>
      </react_native_1.View>);
    }
    else {
        return null;
    }
};
var styles = react_native_1.StyleSheet.create({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    cancelButton: {
        backgroundColor: '#FCFCFC',
        borderColor: '#8E8E8E',
        borderWidth: Scale_1.scale(1),
        width: Scale_1.scale(220),
    },
    confirmButton: {
        borderWidth: Scale_1.scale(1),
        borderColor: '#8E8E8E',
        width: Scale_1.scale(220),
    },
    title: {
        fontSize: Scale_1.scale(25),
        marginVertical: Scale_1.scale(10),
    },
});
exports.default = AutoHeightCouponComponent;
