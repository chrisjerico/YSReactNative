"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseScreen = void 0;
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var FontAwesome_1 = __importDefault(require("react-native-vector-icons/FontAwesome"));
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
exports.BaseScreen = function (_a) {
    var children = _a.children, screenName = _a.screenName, style = _a.style, icon = _a.icon;
    return (React.createElement(react_native_1.View, { style: [{ flex: 1 }, style] },
        React.createElement(react_native_1.SafeAreaView, { style: { backgroundColor: "#ffffff", borderBottomColor: "#cccccc", borderBottomWidth: 1 } },
            React.createElement(react_native_1.View, { style: {
                    backgroundColor: "#ffffff",
                    width: react_native_1.Dimensions.get("screen").width,
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                } },
                React.createElement(react_native_1.Text, { style: {
                        paddingTop: 15,
                        paddingBottom: 15,
                        textAlign: "center",
                        fontSize: 17,
                        width: "100%",
                        alignSelf: "center"
                    } }, screenName),
                React.createElement(react_native_1.TouchableOpacity, { style: { width: 30, position: "absolute", left: 20 }, onPress: function () {
                        RootNavigation_1.pop();
                        switch (react_native_1.Platform.OS) {
                            case 'ios':
                                OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                                break;
                            case 'android':
                                break;
                        }
                    } },
                    React.createElement(FontAwesome_1.default, { size: 33, name: icon || 'angle-left' })))),
        children));
};
//# sourceMappingURL=BaseScreen.js.map