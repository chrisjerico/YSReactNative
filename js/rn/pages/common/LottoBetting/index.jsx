"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_native_modal_1 = require("react-native-modal");
var LottoSelector_1 = require("../LottoSelector/LottoSelector");
var react_1 = require("react");
var LottoContext_1 = require("./LottoContext");
var Header_1 = require("./Header");
var hooks_1 = require("@react-native-community/hooks");
var LottoContent_1 = require("./LottoContent");
var LottoBetting = function () {
    var _a = react_1.useState(0), tab = _a[0], setTab = _a[1];
    var width = hooks_1.useDimensions().screen.width;
    return (<LottoContext_1.LottoContextProvider>
      <react_native_1.View style={{ backgroundColor: 'white', flex: 1, }}>
        <Header_1.default />
        <react_native_1.View style={{ width: width, height: 45, flexDirection: 'row', borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
          <react_native_1.View style={{ flex: 1, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
            <react_native_1.Text style={{ fontSize: 16, fontWeight: "bold" }}>投注区</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
            <react_native_1.Text style={{ fontSize: 16, fontWeight: "bold", color: "gray" }}>聊天室</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <LottoContent_1.default />
        <LottoContext_1.LottoContext.Consumer>
          {function (value) {
        return (<>
                <react_native_modal_1.default hideModalContentWhileAnimating={false} hasBackdrop={false} swipeDirection={null} style={{ margin: 0 }} isVisible={value.showModal}>
                  <LottoSelector_1.default />
                </react_native_modal_1.default>
              </>);
    }}
        </LottoContext_1.LottoContext.Consumer>

      </react_native_1.View>
    </LottoContext_1.LottoContextProvider>);
};
exports.default = LottoBetting;
