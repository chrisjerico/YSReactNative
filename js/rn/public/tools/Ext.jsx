"use strict";
/**
 * Arc
 *
 * 扩展工具类
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.anyLength = exports.anyEmpty = exports.anyNull = exports.arrayLength = exports.arrayEmpty = exports.checkTrue = void 0;
/**
 * 检查当前变量是否为 true
 * @param value
 */
exports.checkTrue = function (value) { return value != null && value === true; };
/**
 * 检查当前变量是否为 空
 * @param value
 */
exports.arrayEmpty = function (value) { return value == null || value.length <= 0; };
exports.arrayLength = function (value) { return exports.arrayEmpty(value) ? 0 : value.length; };
exports.anyNull = function (value) { return value == null; };
exports.anyEmpty = function (value) { return value == null || value == ""; };
exports.anyLength = function (value) { return exports.anyEmpty(value) ? 0 : value.length; };
