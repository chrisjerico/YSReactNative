"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UGLoginModel = void 0;
var UGLoginModel = /** @class */ (function () {
    function UGLoginModel() {
    }
    return UGLoginModel;
}());
exports.UGLoginModel = UGLoginModel;
var UGUserModel = /** @class */ (function (_super) {
    __extends(UGUserModel, _super);
    function UGUserModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UGUserModel.getYS = function (user) {
        var temp = Object.assign(new UGUserModel(), user);
        temp['clsName'] = 'UGUserModel';
        temp.sessid = user['API-SID'];
        temp.token = user['API-SID'];
        return temp;
    };
    UGUserModel.mine = new UGUserModel();
    return UGUserModel;
}(UGLoginModel));
exports.default = UGUserModel;
//# sourceMappingURL=UGUserModel.js.map