"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var Ext_1 = require("./Ext");
/**
 * Toast 提示
 * @param s
 * @constructor
 */
exports.Toast = function (s) {
    //空字符串不弹
    if (Ext_1.anyEmpty(s))
        return;
    if (react_native_1.Platform.OS == 'ios') {
        OCHelper_1.OCHelper.call('HUDHelper.showMsg:', [s]);
    }
    else {
        react_native_1.ToastAndroid.show(s, react_native_1.ToastAndroid.SHORT);
    }
};
//# sourceMappingURL=ToastUtils.js.map