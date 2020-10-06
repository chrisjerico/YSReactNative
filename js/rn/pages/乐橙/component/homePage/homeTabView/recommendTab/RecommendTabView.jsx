"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendTabView = void 0;
var React = require("react");
var react_native_1 = require("react-native");
var MonthlyBonus_1 = require("../MonthlyBonus");
var RecommendLoveView_1 = require("./RecommendLoveView");
var RecommendMustPlayView_1 = require("./RecommendMustPlayView");
exports.RecommendTabView = function (_a) {
    var list = _a.list, thirdPartGamePress = _a.thirdPartGamePress;
    return (<react_native_1.View style={{ paddingHorizontal: 8, paddingVertical: 10 }}>
            <RecommendMustPlayView_1.RecommendMustPlayView thirdPartGamePress={thirdPartGamePress} list={list.slice(0, 3)}/>
            <MonthlyBonus_1.MonthlyBonus />
            <RecommendLoveView_1.RecommendLoveView thirdPartGamePress={thirdPartGamePress} list={list.slice(3, list.length)}/>
        </react_native_1.View>);
};
