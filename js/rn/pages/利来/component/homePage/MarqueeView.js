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
exports.MarqueeView = void 0;
var react_native_1 = require("react-native");
var React = __importStar(require("react"));
var react_native_marquee_ab_1 = require("react-native-marquee-ab");
var Foundation_1 = __importDefault(require("react-native-vector-icons/Foundation"));
var react_native_modal_1 = __importDefault(require("react-native-modal"));
var react_1 = require("react");
var width = react_native_1.Dimensions.get('screen').width;
exports.MarqueeView = function (_a) {
    var textArr = _a.textArr;
    var _b = react_1.useState(false), showModal = _b[0], setShowModal = _b[1];
    var _c = react_1.useState(), clickedItem = _c[0], setClickItem = _c[1];
    return (React.createElement(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            marginVertical: 6,
        } },
        React.createElement(Foundation_1.default, { size: 20, style: { color: 'red', marginLeft: 10 }, name: 'volume' }),
        React.createElement(react_native_marquee_ab_1.MarqueeHorizontal, { textList: textArr, separator: width - 90, speed: 60, width: width - 55, height: 30, direction: 'left', reverse: false, textStyle: { fontSize: 16, color: '#000000' }, onTextClick: function (item) {
                setClickItem(item);
                setShowModal(true);
            } }),
        React.createElement(react_native_modal_1.default, { isVisible: showModal },
            React.createElement(react_native_1.View, null,
                React.createElement(react_native_1.View, { style: {
                        backgroundColor: '#e7e7e7',
                        alignItems: 'center',
                        paddingVertical: 16,
                        borderTopRightRadius: 8,
                        borderTopLeftRadius: 8,
                    } },
                    React.createElement(react_native_1.Text, { style: { color: 'black', fontSize: 16 } }, "\u516C\u544A")),
                React.createElement(react_native_1.View, { style: {
                        backgroundColor: 'white', alignItems: 'center', borderBottomRightRadius: 8,
                        borderBottomLeftRadius: 8,
                    } },
                    React.createElement(react_native_1.Text, { style: { paddingVertical: 16, fontSize: 16 } }, (clickedItem === null || clickedItem === void 0 ? void 0 : clickedItem.data) || ''),
                    React.createElement(react_native_1.View, { style: { flexDirection: 'row', paddingVertical: 8 } },
                        React.createElement(react_native_1.TouchableOpacity, { onPress: function () {
                                setShowModal(false);
                            }, style: {
                                borderColor: 'rgb(178, 178, 178)',
                                borderWidth: 1,
                                borderRadius: 6,
                                backgroundColor: '#e7e7e7',
                                paddingVertical: 16,
                                flex: 1,
                                alignItems: 'center',
                                marginHorizontal: 8,
                            } },
                            React.createElement(react_native_1.Text, null, "\u53D6\u6D88")),
                        React.createElement(react_native_1.TouchableOpacity, { onPress: function () {
                                setShowModal(false);
                            }, style: {
                                backgroundColor: '#d82e2f',
                                alignItems: 'center',
                                borderRadius: 6,
                                paddingVertical: 16,
                                flex: 1,
                                marginHorizontal: 8,
                            } },
                            React.createElement(react_native_1.Text, { style: { color: 'white' } }, "\u786E\u5B9A"))))))));
};
//# sourceMappingURL=MarqueeView.js.map