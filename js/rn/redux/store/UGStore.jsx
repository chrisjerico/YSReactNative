"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// import AsyncStorage from '@react-native-community/async-storage';
var react_native_1 = require("react-native");
var BettingReducer_1 = require("../reducer/BettingReducer");
var IGlobalStateHelper_1 = require("./IGlobalStateHelper");
// 更新Props到全局数据
function RootReducer(prevState, act) {
    var state = Object.assign({}, prevState);
    if (act.type == 'reset') {
        act.sysConf && (state.sysConf = act.sysConf);
        act.userInfo && (state.userInfo = act.userInfo);
        act.sign && (state.sign = act.sign);
        act.gameLobby && (state.gameLobby = act.gameLobby);
        act.banner && (state.banner = act.banner);
        act.sys && (state.sys = act.sys);
        act.page && (state[act.page] = act.props);
    }
    else if (act.type == 'merge') {
        state.sysConf = __assign(__assign({}, state.sysConf), act.sysConf);
        state.userInfo = __assign(__assign({}, state.userInfo), act.userInfo);
        state.sign = __assign(__assign({}, state.sign), act.sign);
        act.gameLobby && (state.gameLobby = act.gameLobby);
        state.banner = __assign(__assign({}, state.banner), act.banner);
        state.sys = __assign(__assign({}, state.sys), act.sys);
        act.page && (state[act.page] = __assign(__assign({}, state[act.page]), act.props));
    }
    else {
        // 自定义Reducer写在这里。。。
        state.BettingReducer = BettingReducer_1.default(state.BettingReducer, act);
    }
    return state;
}
var UGStore = /** @class */ (function () {
    function UGStore() {
    }
    UGStore.dispatch = function (act) {
        this.globalProps = RootReducer(this.globalProps, act);
        if (act.page) {
            for (var _i = 0, _a = this.callbacks; _i < _a.length; _i++) {
                var cb = _a[_i];
                cb.page == act.page && cb.callback();
            }
        }
    };
    // 添加监听
    UGStore.subscribe = function (page, callback) {
        var cb = { page: page, callback: callback };
        this.callbacks.push(cb);
        return function () {
            UGStore.callbacks.remove(cb);
        };
    };
    // 获取当前页面Props
    UGStore.getPageProps = function (page) {
        var _a;
        return (_a = this.globalProps[page]) !== null && _a !== void 0 ? _a : {};
    };
    // 从本地获取所有数据，并刷新UI
    UGStore.refreshFromLocalData = function () {
        react_native_1.AsyncStorage.getItem(IGlobalStateHelper_1.AsyncStorageKey.IGlobalState).then(function (value) {
            var gs = JSON.parse(value);
            gs && UGStore.dispatch({ type: 'reset', sysConf: gs === null || gs === void 0 ? void 0 : gs.sysConf, userInfo: gs === null || gs === void 0 ? void 0 : gs.userInfo });
        });
    };
    // 存储到本地
    UGStore.save = function () {
        react_native_1.AsyncStorage.setItem(IGlobalStateHelper_1.AsyncStorageKey.IGlobalState, JSON.stringify(this.globalProps));
    };
    // Store
    UGStore.globalProps = { userInfo: {}, sysConf: {}, sign: {}, gameLobby: [], sys: {} };
    // 发送通知
    UGStore.callbacks = [];
    return UGStore;
}());
exports.UGStore = UGStore;
