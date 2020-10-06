"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UGSkinManagers_1 = require("../../../public/theme/UGSkinManagers");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var react_native_1 = require("react-native");
var hooks_1 = require("@react-native-community/hooks");
var react_1 = require("react");
var LottoContext_1 = require("../LottoBetting/LottoContext");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var Header = function () {
    var width = hooks_1.useDimensions().screen.width;
    var top = react_native_safe_area_context_1.useSafeArea().top;
    var _a = LottoContext_1.useLottoContext(), lottoData = _a.lottoData, setShowModal = _a.setShowModal;
    return (<react_native_linear_gradient_1.default colors={UGSkinManagers_1.Skin1.navBarBgColor}>
      <react_native_1.View style={{ height: top, width: width }}></react_native_1.View>
      <react_native_1.View style={{
        height: 44, width: width,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    }}>
        <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <react_native_1.TouchableOpacity onPress={function () {
        RootNavigation_1.pop();
    }}>
            <react_native_1.Image style={{ width: 25, height: 25, }} source={{ uri: "back_icon" }}/>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={{ flexDirection: 'row' }} onPress={function () {
        setShowModal(true);
    }}>
            <react_native_1.Text style={{ fontSize: 18, color: 'white', marginLeft: 20 }}>{lottoData === null || lottoData === void 0 ? void 0 : lottoData.title}</react_native_1.Text>
            <react_native_1.Image style={{ width: 20, height: 20, tintColor: 'white' }} source={{ uri: "arrow_down" }}/>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>

        
      </react_native_1.View>
    </react_native_linear_gradient_1.default>);
};
exports.default = Header;
