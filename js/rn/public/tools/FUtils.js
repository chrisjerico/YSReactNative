"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var FUtils = /** @class */ (function () {
    function FUtils() {
    }
    // 深度比较
    FUtils.isExactlyEqual = function (x, y) {
        // 指向同一内存时
        if (x === y) {
            return true;
        }
        else if (typeof x == 'object' && x != null && typeof y == 'object' && y != null) {
            if (Object.keys(x).length != Object.keys(y).length)
                return false;
            for (var prop in x) {
                if (y.hasOwnProperty(prop)) {
                    if (!this.isExactlyEqual(x[prop], y[prop]))
                        return false;
                }
                else
                    return false;
            }
            return true;
        }
        else
            return false;
    };
    return FUtils;
}());
exports.default = FUtils;
// 深度合并Props
function deepMergeProps() {
    var propsArray = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        propsArray[_i] = arguments[_i];
    }
    var retProps = {};
    // 合并
    propsArray.forEach(function (props) {
        if (!(props instanceof Object))
            return;
        for (var k in props) {
            var currentValue = retProps[k];
            var newValue = props[k];
            if (typeof k == 'string' && k.toLowerCase().indexOf('style') != -1 && (currentValue instanceof Array || newValue instanceof Array)) {
                if (currentValue instanceof Array && newValue instanceof Array) {
                    currentValue = deepMergeProps.apply(void 0, __spreadArrays(currentValue, newValue));
                }
                else if (currentValue instanceof Array) {
                    currentValue = deepMergeProps.apply(void 0, __spreadArrays(currentValue, [newValue]));
                }
                else if (newValue instanceof Array) {
                    currentValue = deepMergeProps.apply(void 0, __spreadArrays([currentValue], newValue));
                }
            }
            else if (typeof currentValue == 'object' && typeof newValue == 'object' && !(currentValue instanceof Array) && !(newValue instanceof Array)) {
                currentValue = deepMergeProps(currentValue, newValue);
            }
            else {
                currentValue = newValue;
            }
            retProps[k] = currentValue;
        }
    });
    return retProps;
}
exports.deepMergeProps = deepMergeProps;
//# sourceMappingURL=FUtils.js.map