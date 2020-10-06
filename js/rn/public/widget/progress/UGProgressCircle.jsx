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
        return <Progress.Circle borderWidth={4} size={45} indeterminate={true} borderColor={UGSkinManagers_1.Skin1.themeColor} {...this.props}/>;
    };
    return UGProgressCircle;
}(BaseWidget_1.default));
exports.default = UGProgressCircle;
