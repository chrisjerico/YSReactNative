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
var BaseWidget_1 = require("../base/BaseWidget");
var Progress = require("react-native-progress");
var React = require("react");
var UGSkinManagers_1 = require("../../theme/UGSkinManagers");
/**
 * 转圈等待框
 */
var UGProgressCircle = /** @class */ (function (_super) {
    __extends(UGProgressCircle, _super);
    function UGProgressCircle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UGProgressCircle.prototype.render = function () {
        return React.createElement(Progress.Circle, __assign({ borderWidth: 4, size: 45, indeterminate: true, borderColor: UGSkinManagers_1.Skin1.themeColor }, this.props));
    };
    return UGProgressCircle;
}(BaseWidget_1.default));
exports.default = UGProgressCircle;
//# sourceMappingURL=UGProgressCircle.js.map