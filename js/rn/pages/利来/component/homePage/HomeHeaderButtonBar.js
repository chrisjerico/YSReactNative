"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var PushHelper_1 = require("../../../../public/define/PushHelper");
var UGSysConfModel_1 = require("../../../../redux/model/\u5168\u5C40/UGSysConfModel");
exports.HomeHeaderButtonBar = function (_a) {
    var logoIcon = _a.logoIcon;
    var onPress = function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服);
    };
    return (React.createElement(react_native_1.SafeAreaView, { style: { backgroundColor: "#FFFFFF" } },
        React.createElement(react_native_1.View, { style: { flexDirection: "row", marginHorizontal: 16, marginVertical: 10, backgroundColor: "#FFFFFF" } },
            React.createElement(react_native_1.Image, { style: { width: 90, height: 28, resizeMode: "stretch" }, source: { uri: logoIcon || 'https://a05front.wff9.com//cdn/A05FM/static/img/logo.9f6ba2be.png' } }),
            React.createElement(react_native_1.View, { style: { flex: 1 } }),
            React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: onPress },
                React.createElement(react_native_1.Image, { style: { width: 30, height: 30 }, source: { uri: 'http://test05.6yc.com/views/mobileTemplate/20/images/zxkf2.png' } })))));
};
//# sourceMappingURL=HomeHeaderButtonBar.js.map