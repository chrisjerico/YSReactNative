"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 滑动验证字段
var SlideCodeModel = /** @class */ (function () {
    function SlideCodeModel() {
    }
    SlideCodeModel.get = function (scm) {
        var _a, _b, _c;
        var temp = new SlideCodeModel();
        temp['slideCode[nc_sid]'] = (_a = scm['slideCode[nc_sid]']) !== null && _a !== void 0 ? _a : scm.nc_csessionid;
        temp['slideCode[nc_sig]'] = (_b = scm['slideCode[nc_sig]']) !== null && _b !== void 0 ? _b : scm.nc_value;
        temp['slideCode[nc_token]'] = (_c = scm['slideCode[nc_token]']) !== null && _c !== void 0 ? _c : scm.nc_token;
        return temp;
    };
    return SlideCodeModel;
}());
exports.default = SlideCodeModel;
