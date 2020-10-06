"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @Description: 字符串处理
 *
 *
 * @author Arc
 * @date 05/08/2020
 */
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.getInstance = function () {
        return this._instance;
    };
    /**
     * 删除HTML标签
     * @param s
     */
    StringUtils.prototype.deleteHtml = function (s) {
        return s === null || s === void 0 ? void 0 : s.replace(/<[^>]+>/g, "");
    };
    /**
     * 判断是否以某个字符串结尾
     *
     * @param str 字符串
     * @param end 结尾字符串
     */
    StringUtils.prototype.endString = function (str, end) {
        if (str != null && end != null && str.length > end.length) {
            var start = str.length - end.length; //相差长度=字符串长度-特定字符长度
            var char = str.substr(start, end.length); //将相差长度作为开始下标，特定字符长度为截取长度
            return char == end;
        }
        return false;
    };
    StringUtils._instance = new StringUtils();
    return StringUtils;
}());
exports.default = StringUtils;
//# sourceMappingURL=StringUtils.js.map