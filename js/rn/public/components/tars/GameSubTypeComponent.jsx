"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var List_1 = require("../../views/tars/List");
var GameSubTypeComponent = function (_a) {
    var _b, _c;
    var _d = _a.games, games = _d === void 0 ? [] : _d, renderGame = _a.renderGame, containerStyle = _a.containerStyle, renderSubType = _a.renderSubType, subTypeContainerStyle = _a.subTypeContainerStyle, numColumns = _a.numColumns, subTypeNumColumns = _a.subTypeNumColumns, _e = _a.uniqueKey, uniqueKey = _e === void 0 ? 'uniqueKey' : _e, contentContainerStyle = _a.contentContainerStyle;
    var _f = react_1.useState(-1), indexHistory = _f[0], setIndexHistory = _f[1];
    var _g = react_1.useState(-1), cutRow = _g[0], setCutRow = _g[1];
    var _h = react_1.useState([]), subType = _h[0], setSubType = _h[1];
    var showGameSubType = function (index) {
        var _a, _b;
        var cutRow = Math.ceil((index + 1) / numColumns);
        if (index == indexHistory) {
            setIndexHistory(null);
            setCutRow(null);
            setSubType([]);
        }
        else {
            var subType_1 = (_b = (_a = games[index]) === null || _a === void 0 ? void 0 : _a.subType) !== null && _b !== void 0 ? _b : [];
            setIndexHistory(index);
            setCutRow(cutRow);
            setSubType(subType_1);
        }
    };
    var sliceCount = cutRow > 0 ? cutRow * numColumns : -1;
    var mainGames = sliceCount == -1 ? games : (_b = games === null || games === void 0 ? void 0 : games.slice(0, sliceCount)) !== null && _b !== void 0 ? _b : [];
    var subGames = sliceCount == -1 ? [] : (_c = games === null || games === void 0 ? void 0 : games.slice(sliceCount, games === null || games === void 0 ? void 0 : games.length)) !== null && _c !== void 0 ? _c : [];
    return (<react_native_1.View style={containerStyle}>
      <List_1.default uniqueKey={uniqueKey + 'mainGames'} contentContainerStyle={contentContainerStyle} legacyImplementation={true} removeClippedSubviews={true} numColumns={numColumns} data={mainGames} renderItem={function (_a) {
        var item = _a.item, index = _a.index;
        return renderGame({ item: item, index: index, showGameSubType: showGameSubType });
    }}/>
      {(subType === null || subType === void 0 ? void 0 : subType.length) > 0 && (<List_1.default uniqueKey={uniqueKey + 'subType'} legacyImplementation removeClippedSubviews={true} numColumns={subTypeNumColumns} style={subTypeContainerStyle} data={subType} renderItem={renderSubType}/>)}
      <List_1.default uniqueKey={uniqueKey + 'subGames'} contentContainerStyle={contentContainerStyle} legacyImplementation removeClippedSubviews={true} numColumns={numColumns} data={subGames} renderItem={function (_a) {
        var _b;
        var item = _a.item, index = _a.index;
        return renderGame({
            item: item,
            index: index + ((_b = mainGames === null || mainGames === void 0 ? void 0 : mainGames.length) !== null && _b !== void 0 ? _b : 0),
            showGameSubType: showGameSubType,
        });
    }}/>
    </react_native_1.View>);
};
exports.default = GameSubTypeComponent;
