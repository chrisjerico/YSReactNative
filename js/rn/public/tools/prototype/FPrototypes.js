"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var blueimp_md5_1 = require("blueimp-md5");
var FPrototypes = /** @class */ (function () {
    function FPrototypes() {
    }
    FPrototypes.setupAll = function () {
        this.setupArray();
        this.setupString();
        this.setupDate();
    };
    FPrototypes.setupDate = function () {
        Date.prototype.format = function (fmt) {
            var o = {
                'M+': this.getMonth() + 1,
                'd+': this.getDate(),
                'h+': this.getHours(),
                'm+': this.getMinutes(),
                's+': this.getSeconds(),
                'q+': Math.floor((this.getMonth() + 3) / 3),
                S: this.getMilliseconds(),
            };
            if (/(y+)/.test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
            }
            for (var k in o) {
                if (new RegExp('(' + k + ')').test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
                }
            }
            return fmt;
        };
    };
    FPrototypes.setupArray = function () {
        Array.prototype.remove = function (val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        };
    };
    FPrototypes.setupString = function () {
        // 包含数字
        String.prototype.hasNumber = function () {
            return /\d/.test(this);
        };
        // 包含浮点数
        String.prototype.hasFloat = function () {
            return /\d\./.test(this);
        };
        // 包含ASCII码
        String.prototype.hasASCII = function () {
            return /[\x00-\xFF]/.test(this);
        };
        // 包含中文
        String.prototype.hasChinese = function () {
            return /[\u4e00-\u9fff]/.test(this);
        };
        // 包含字母
        String.prototype.hasLetter = function () {
            return /[A-Za-z]/.test(this);
        };
        // 包含小写字母
        String.prototype.hasLowercaseLetter = function () {
            return /[a-z]/.test(this);
        };
        // 包含大写字母
        String.prototype.hasUppercaseLetter = function () {
            return /[A-Z]/.test(this);
        };
        // 包含特殊字符
        String.prototype.hasSpecialCharacter = function () {
            return /[^\da-zA-Z\u4e00-\u9fff]/.test(this);
        };
        // 含有html标签的检测
        String.prototype.hasHTML = function () {
            return /<[^>]+>/.test(this);
        };
        // 数字
        String.prototype.isNumber = function () {
            return /^[+-]?((\d*\.?\d+)|(\d+\.?\d*))$/.test(this);
        };
        // 浮点数
        String.prototype.isFloat = function () {
            return /^[+-]?((\d*\.\d+)|(\d+\.\d*))$/.test(this);
        };
        // 整数
        String.prototype.isInteger = function () {
            return /^-?\d+$/.test(this);
        };
        // 数字加字母
        String.prototype.isIntegerAndLetter = function () {
            return /^[0-9A-Za-z]+$/.test(this);
        };
        // 可见的ASCII码（数字+字母+符号）
        String.prototype.isVisibleASCII = function () {
            return /^[\x20-\x7E]+$/.test(this);
        };
        // 纯ASCII码
        String.prototype.isASCII = function () {
            return /^[\x00-\xFF]+$/.test(this);
        };
        // 纯中文
        String.prototype.isChinese = function () {
            return /^[\u4e00-\u9fff]+$/.test(this);
        };
        // 纯字母
        String.prototype.isLetter = function () {
            return /^[A-Za-z]+$/.test(this);
        };
        // 纯小写字母
        String.prototype.isLowercaseLetter = function () {
            return /^[a-z]+$/.test(this);
        };
        // 纯大写字母
        String.prototype.isUppercaseLetter = function () {
            return /^[A-Z]+$/.test(this);
        };
        // 纯特殊字符
        String.prototype.isSpecialCharacter = function () {
            return /^[^\da-zA-Z\u4e00-\u9fff]+$/.test(this);
        };
        // Email
        String.prototype.isEmail = function () {
            return /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this);
        };
        // 手机号码
        String.prototype.isMobile = function () {
            return /^[1]([3-9])[0-9]{9}$/.test(this);
        };
        // 身份证号码
        String.prototype.isIDCardNumber = function () {
            if (!/^[0-9]{17}[0-9xX]$/.test(this))
                return false;
            var a = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var b = '10X98765432';
            var num = 0;
            for (var i = 0; i < 17; i++) {
                num += (this[i] - 48) * a[i];
            }
            return b[num % 11] == this[17];
        };
        // 16进制颜色
        String.prototype.isHexColor = function () {
            return /^(#|0x)?([0-9a-fA-F]{3}){1,2}$/.test(this);
        };
        // IP地址
        String.prototype.isIP = function () {
            return this.isIPv4 || this.isIPv6;
        };
        // IPv4地址
        String.prototype.isIPv4 = function () {
            return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(this);
        };
        // IPv6地址
        String.prototype.isIPv6 = function () {
            return /^([0-9A-Fa-f]{0,4}:){2,7}([0-9A-Fa-f]{1,4}$|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4})$/.test(this);
        };
        // 获取md5
        String.prototype.md5 = function () {
            return blueimp_md5_1.default(this);
        };
    };
    return FPrototypes;
}());
exports.default = FPrototypes;
//# sourceMappingURL=FPrototypes.js.map