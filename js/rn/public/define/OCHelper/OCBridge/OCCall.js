"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UGBridge_1 = require("../../ANHelper/UGBridge");
var UgLog_1 = require("../../../tools/UgLog");
var react_native_1 = require("react-native");
// 变量
var OCFuncVariable = /** @class */ (function () {
    function OCFuncVariable() {
        this.vc = '';
        this.ret = '';
    }
    OCFuncVariable.init = function () {
        var obj = {};
        for (var key in new OCFuncVariable()) {
            obj[key] = "OCFuncVariable." + key;
        }
        return obj;
    };
    return OCFuncVariable;
}());
// 调用原生OC函数
var OCCall = /** @class */ (function (_super) {
    __extends(OCCall, _super);
    function OCCall() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OCCall.setup = function () {
        _super.setup.call(this);
    };
    OCCall.call = function (selectors, args1, args2, args3) {
        if (args1 === void 0) { args1 = []; }
        if (args2 === void 0) { args2 = []; }
        if (args3 === void 0) { args3 = []; }
        var array = [];
        var temp;
        if (typeof selectors === 'function') {
            temp = selectors(OCFuncVariable.init());
        }
        else {
            var sel = { selectors: selectors };
            args1.length && (sel['args1'] = args1);
            args2.length && (sel['args2'] = args2);
            args3.length && (sel['args3'] = args3);
            temp = { ret: sel };
        }
        for (var k in temp) {
            var obj = {};
            obj[k] = temp[k];
            array.push(obj);
        }
        switch (react_native_1.Platform.OS) {
            case 'ios':
                break;
            case 'android':
                UgLog_1.ugLog('iOS call=', JSON.stringify(array));
                break;
        }
        return this.core.performSelectors(array);
    };
    return OCCall;
}(UGBridge_1.UGBridge));
exports.OCCall = OCCall;
// ————————————————————————————————————
// OC结构体转换器
var NSValue = /** @class */ (function () {
    function NSValue(valueType, string) {
        this.valueType = valueType;
        this.string = string;
    }
    NSValue.CGRectMake = function (x, y, w, h) {
        return new NSValue('CGRect', "{{" + x + ", " + y + "}, {" + w + ", " + h + "}}");
    };
    NSValue.CGPointMake = function (x, y) {
        return new NSValue('CGPoint', "{{" + x + ", " + y + "}}");
    };
    NSValue.CGSizeMake = function (w, h) {
        return new NSValue('CGSize', "{{" + w + ", " + h + "}}");
    };
    NSValue.UIEdgeInsetsMake = function (top, left, bottom, right) {
        return new NSValue('UIEdgeInsets', "{" + top + ", " + left + ", " + bottom + ", " + right + "}");
    };
    NSValue.UIOffsetMake = function (horizontal, vertical) {
        return new NSValue('UIOffset', "{" + horizontal + ", " + vertical + "}");
    };
    NSValue.CGAffineTransformMake = function (a, b, c, d, tx, ty) {
        return new NSValue('CGAffineTransform', "[" + a + ", " + b + ", " + c + ", " + d + ", " + tx + ", " + ty + "]");
    };
    NSValue.CGVectorMake = function (dx, dy) {
        return new NSValue('CGVector', "{" + dx + ", " + dy + "}");
    };
    return NSValue;
}());
exports.NSValue = NSValue;
//# sourceMappingURL=OCCall.js.map