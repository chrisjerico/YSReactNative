"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_native_modal_1 = require("react-native-modal");
var LottoSelector_1 = require("../LottoSelector/LottoSelector");
var React = require("react");
var react_1 = require("react");
var LottoContext_1 = require("./LottoContext");
var Header_1 = require("./Header");
var hooks_1 = require("@react-native-community/hooks");
var LottoContent_1 = require("./LottoContent");
var LottoBetting = function (_a) {
    var setProps = _a.setProps;
    var _b = react_1.useState(0), tab = _b[0], setTab = _b[1];
    var width = hooks_1.useDimensions().screen.width;
    return (<LottoContext_1.LottoContextProvider>
            <react_native_1.View style={{ backgroundColor: 'white', flex: 1, }}>
                <Header_1.default />
                <react_native_1.View style={{
        width: width,
        height: 45,
        flexDirection: 'row',
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5
    }}>
                    <react_native_1.TouchableWithoutFeedback onPress={function () { return setTab(0); }}>
                        <react_native_1.View style={tab == 0 ? activeTabStyle : tabStyle}>
                            <react_native_1.Text style={{ fontSize: 16, fontWeight: "bold", color: tab == 0 ? '#000000' : "gray" }}>投注区</react_native_1.Text>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                    <react_native_1.TouchableWithoutFeedback onPress={function () { return setTab(1); }}>
                        <react_native_1.View style={tab == 1 ? activeTabStyle : tabStyle}>
                            <react_native_1.Text style={{ fontSize: 16, fontWeight: "bold", color: tab == 1 ? '#000000' : "gray" }}>聊天室</react_native_1.Text>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>
                <LottoContent_1.default setProps={setProps}/>
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
var activeTabStyle = {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center'
};
var tabStyle = {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
};
