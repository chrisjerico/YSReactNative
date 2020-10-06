"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UGSkinManagers_1 = require("../../../public/theme/UGSkinManagers");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var react_native_1 = require("react-native");
var hooks_1 = require("@react-native-community/hooks");
var react_1 = require("react");
var LottoContext_1 = require("../LottoBetting/LottoContext");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Header = function () {
    var width = hooks_1.useDimensions().screen.width;
    var top = react_native_safe_area_context_1.useSafeArea().top;
    var value = LottoContext_1.useLottoContext();
    return (<react_native_linear_gradient_1.default colors={UGSkinManagers_1.Skin1.navBarBgColor}>
      <react_native_1.View style={{ height: top, width: width }}></react_native_1.View>
      <react_native_1.View style={{
        height: 44, width: width,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    }}>
        <react_native_1.TouchableWithoutFeedback onPress={function () {
        value.setShowModal(false);
    }}>
          <react_native_1.Image style={{ width: 25, height: 25, }} source={{ uri: "back_icon" }}/>
        </react_native_1.TouchableWithoutFeedback>
        <react_native_1.Text style={{ fontSize: 18, fontWeight: "bold", color: 'white' }}>点击图标切换彩票</react_native_1.Text>
        <react_native_1.TouchableWithoutFeedback onPress={function () {
        value.setShowModal(false);
    }}>
          <react_native_1.Text style={{ color: 'white', fontSize: 16 }}>取消</react_native_1.Text>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.View>
    </react_native_linear_gradient_1.default>);
};
exports.default = Header;
