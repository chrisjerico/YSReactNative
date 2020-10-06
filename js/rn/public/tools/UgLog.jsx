"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ugError = exports.ugLog = exports.B_DEBUG = void 0;
/**
 * Arc
 *
 * 是否调试
 */
exports.B_DEBUG = __DEV__;
exports.ugLog = function () {
    var s = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        s[_i] = arguments[_i];
    }
    if (exports.B_DEBUG)
        console.log.apply(console, s);
};
exports.ugError = function () {
    var s = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        s[_i] = arguments[_i];
    }
    if (exports.B_DEBUG)
        console.error.apply(console, s);
};
