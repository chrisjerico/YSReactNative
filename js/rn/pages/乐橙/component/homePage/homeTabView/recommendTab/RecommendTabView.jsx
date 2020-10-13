"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendTabView = void 0;
var React = require("react");
var react_native_1 = require("react-native");
var MonthlyBonus_1 = require("../MonthlyBonus");
var RecommendLoveView_1 = require("./RecommendLoveView");
var RecommendMustPlayView_1 = require("./RecommendMustPlayView");
exports.RecommendTabView = function (_a) {
    var list = _a.list, onPress = _a.onPress;
    return (<react_native_1.View style={{ paddingHorizontal: 8, borderTopColor: '#c7c7c7', borderTopWidth: 1 }}>
      <react_native_1.View style={{ paddingTop: 8 }}>
        <RecommendMustPlayView_1.RecommendMustPlayView onPress={onPress} list={list.slice(0, 3)}/>
      </react_native_1.View>
      <MonthlyBonus_1.MonthlyBonus />
      <RecommendLoveView_1.RecommendLoveView onPress={onPress} list={list.slice(3, list.length)}/>
    </react_native_1.View>);
};
