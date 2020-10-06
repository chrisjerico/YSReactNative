"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var immer_1 = require("immer");
var lottoSetting_1 = require("../../pages/common/LottoBetting/PlayVIew/lottoSetting");
var BettingReducerActions;
(function (BettingReducerActions) {
    BettingReducerActions["itemPress"] = "itemPress";
    BettingReducerActions["shengXiaoPress"] = "shengXiaoPress";
    BettingReducerActions["setCurrentPlayOdd"] = "setCurrentPlayOdd";
    BettingReducerActions["itemGroupPress"] = "itemGroupPress";
    BettingReducerActions["cleanBetGroupResult"] = "cleanBetGroupResult";
})(BettingReducerActions = exports.BettingReducerActions || (exports.BettingReducerActions = {}));
var initialState = {
    bettingResult: {},
    shengXiaoValue: lottoSetting_1.getShengXiaoValue(),
    selectedShengXiao: {},
    currentPlayOdd: undefined,
    betGroupResult: []
};
function BettingReducer(state, action) {
    if (state === void 0) { state = initialState; }
    if (typeof state === 'undefined') {
        return initialState;
    }
    return immer_1.produce(state, function (draftState) {
        var _a, _b;
        if (action.type == BettingReducerActions.itemPress) {
            var value = action.value;
            var fixString = value.code[0] == '0' ? value.code.replace("0", "") : value.code;
            var num = parseInt(fixString);
            var shengXiaoString = lottoSetting_1.getShengXiaoString(num);
            if (!draftState.bettingResult[value.id]) {
                draftState.bettingResult[value.id] = value;
                draftState.selectedShengXiao[shengXiaoString] = state.selectedShengXiao[shengXiaoString] + 1;
            }
            else {
                delete draftState.bettingResult[value.id];
                draftState.selectedShengXiao[shengXiaoString] = state.selectedShengXiao[shengXiaoString] - 1;
            }
        }
        else if (action.type == BettingReducerActions.shengXiaoPress) {
            if (!state.currentPlayOdd)
                return;
            var value_1 = action.value;
            var isExist = ((_a = state.selectedShengXiao) === null || _a === void 0 ? void 0 : _a[value_1]) == state.shengXiaoValue[value_1].length;
            //生肖的id陣列
            var checkArray = (_b = state.shengXiaoValue[value_1]) !== null && _b !== void 0 ? _b : [];
            //抓取當前特碼資料
            var result_1 = state.currentPlayOdd.playGroups.filter(function (res) {
                return res.code == 'TM';
            });
            if (result_1.length == 0) {
                console.warn("彩種錯誤");
                return;
            }
            //抓取特碼及該生肖的資料
            var temp_1 = [];
            checkArray.map(function (res) {
                temp_1.push(result_1[0].plays[res - 1]);
            });
            for (var index = 0; index < temp_1.length; index++) {
                var element = temp_1[index];
                if (state.bettingResult[element.id] == undefined)
                    isExist = false;
            }
            if (isExist) {
                temp_1.map(function (res) {
                    delete draftState.bettingResult[res.id];
                    draftState.selectedShengXiao[value_1] = 0;
                });
            }
            else {
                temp_1.map(function (res) {
                    draftState.bettingResult[res.id] = res;
                });
                draftState.selectedShengXiao[value_1] = state.shengXiaoValue[value_1].length;
            }
        }
        else if (action.type == BettingReducerActions.setCurrentPlayOdd) {
            var value = action.value;
            draftState.currentPlayOdd = value;
            if (value.code == 'TM') {
                for (var index = 0; index < 12; index++) {
                    draftState.selectedShengXiao[lottoSetting_1.ShengXiaoTitle[index]] = 0;
                }
            }
        }
        else if (action.type == BettingReducerActions.itemGroupPress) {
            if (state.betGroupResult.indexOf(action.value)) {
                draftState.betGroupResult.splice(state.betGroupResult.indexOf(action.value), 0);
            }
            else {
                draftState.betGroupResult.push(action.value);
            }
        }
        else if (action.type == BettingReducerActions.cleanBetGroupResult) {
            draftState.betGroupResult = [];
        }
        else {
        }
    });
}
exports.default = BettingReducer;
//# sourceMappingURL=BettingReducer.js.map