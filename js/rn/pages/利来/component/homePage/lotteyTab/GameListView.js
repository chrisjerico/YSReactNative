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
exports.GameListView = void 0;
var react_native_1 = require("react-native");
var React = __importStar(require("react"));
var ImageButton_1 = require("../../../../\u4E50\u6A59/component/ImageButton");
var fillArray_1 = require("../../../utils/fillArray");
var PushHelper_1 = __importDefault(require("../../../../../public/define/PushHelper"));
exports.GameListView = function (_a) {
    var list = _a.list;
    var onPress = function (list) {
        var _a;
        list.seriesId != '1' ? PushHelper_1.default.pushHomeGame(list) :
            list.gameId ?
                PushHelper_1.default.pushCategory(list.seriesId, list.gameId) :
                PushHelper_1.default.pushCategory(list.seriesId, (_a = list.subType[0]) === null || _a === void 0 ? void 0 : _a.gameId);
    };
    return (React.createElement(react_native_1.FlatList, { scrollEnabled: false, style: { height: 375 }, keyExtractor: function (item, index) { return "boardGame-" + index; }, numColumns: 2, data: fillArray_1.fillArray(list, 2), renderItem: function (_a) {
            var item = _a.item, index = _a.index;
            return (React.createElement(ImageButton_1.ImageButton, { imgStyle: { height: 105, margin: 10, flex: 1 }, uri: item.icon, onPress: function () { return onPress(item); } }));
        } }));
};
//# sourceMappingURL=GameListView.js.map