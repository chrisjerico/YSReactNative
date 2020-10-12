"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaleHeight = exports.scale = void 0;
var AppDefine_1 = __importDefault(require("../../public/define/AppDefine"));
// functions
exports.scale = function (layout) {
    return layout * (AppDefine_1.default.width / 540);
};
exports.scaleHeight = function (layout) {
    return layout * (AppDefine_1.default.height / 540);
};
// export const three = (data: any[], fillEle = { show: false }) => {
//   const remainder = data.length % 3
//   const patch = remainder > 0 ? 3 - (data.length % 3) : 0
//   return data
//     .concat(Array(patch).fill(fillEle))
//     .map((ele, index) => Object.assign({}, { key: index }, ele))
// }
//# sourceMappingURL=Scale.js.map