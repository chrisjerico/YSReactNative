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
exports.LotteryTabView = void 0;
var React = __importStar(require("react"));
var react_native_1 = require("react-native");
var fillArray_1 = require("../../../utils/fillArray");
var AppDefine_1 = __importDefault(require("../../../../../public/define/AppDefine"));
var PushHelper_1 = __importDefault(require("../../../../../public/define/PushHelper"));
exports.LotteryTabView = function (_a) {
    var list = _a.list;
    return (React.createElement(react_native_1.FlatList, { bounces: false, numColumns: 4, keyExtractor: function (item, index) { return "lottery-" + index; }, data: fillArray_1.fillArray(list, 4), renderItem: function (_a) {
            var item = _a.item;
            return item.icon ? (React.createElement(react_native_1.TouchableWithoutFeedback, { style: {
                    height: 96,
                    width: AppDefine_1.default.width / 4,
                    flex: 1,
                    backgroundColor: "rgba(255, 255, 255, 0.5)"
                }, onPress: function () {
                    console.log(item);
                    PushHelper_1.default.pushCategory(1, item.gameId);
                } },
                React.createElement(react_native_1.View, { style: {
                        flex: 1,
                        height: 91,
                        borderRadius: 6,
                        padding: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "white",
                        margin: 2
                    } },
                    React.createElement(react_native_1.Image, { style: {
                            flex: 1,
                            height: 63,
                            width: 63,
                            resizeMode: "stretch",
                        }, source: { uri: item.icon } }),
                    React.createElement(react_native_1.Text, { style: {
                            fontSize: 12,
                            color: '#333333',
                            fontWeight: 'bold',
                            marginTop: 10
                        } }, item.title)))) : React.createElement(react_native_1.View, { style: { width: AppDefine_1.default.width / 4, } });
        } }));
};
//# sourceMappingURL=LotteryTabView.js.map