import md5 from 'blueimp-md5';

export default class FPrototypes {
  static setupAll() {
    this.setupArray();
    this.setupString();
    this.setupDate();
  }

  static setupDate() {
    Date.prototype.format = function (fmt) {
      var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds(), //毫秒
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
  }

  static setupArray() {
    Array.prototype.remove = function (val) {
      var index = this.indexOf(val);
      if (index > -1) {
        this.splice(index, 1);
      }
    };
  }

  static setupString() {
    // 包含数字
    String.prototype.hasNumber = function (): boolean {
      return /\d/.test(this);
    };

    // 包含浮点数
    String.prototype.hasFloat = function (): boolean {
      return /\d\./.test(this);
    };

    // 包含ASCII码
    String.prototype.hasASCII = function (): boolean {
      return /[\x00-\xFF]/.test(this);
    };

    // 包含中文
    String.prototype.hasChinese = function (): boolean {
      return /[\u4e00-\u9fff]/.test(this);
    };

    // 包含字母
    String.prototype.hasLetter = function (): boolean {
      return /[A-Za-z]/.test(this);
    };

    // 包含小写字母
    String.prototype.hasLowercaseLetter = function (): boolean {
      return /[a-z]/.test(this);
    };

    // 包含大写字母
    String.prototype.hasUppercaseLetter = function (): boolean {
      return /[A-Z]/.test(this);
    };

    // 包含特殊字符
    String.prototype.hasSpecialCharacter = function (): boolean {
      return /[^\da-zA-Z\u4e00-\u9fff]/.test(this);
    };

    // 含有html标签的检测
    String.prototype.hasHTML = function (): boolean {
      return /<[^>]+>/.test(this);
    };

    // 数字
    String.prototype.isNumber = function (): boolean {
      return /^[+-]?((\d*\.?\d+)|(\d+\.?\d*))$/.test(this);
    };

    // 浮点数
    String.prototype.isFloat = function (): boolean {
      return /^[+-]?((\d*\.\d+)|(\d+\.\d*))$/.test(this);
    };

    // 整数
    String.prototype.isInteger = function (): boolean {
      return /^-?\d+$/.test(this);
    };

    // 数字加字母
    String.prototype.isIntegerAndLetter = function (): boolean {
      return /^[0-9A-Za-z]+$/.test(this);
    };

    // 可见的ASCII码（数字+字母+符号）
    String.prototype.isVisibleASCII = function (): boolean {
      return /^[\x20-\x7E]+$/.test(this);
    };

    // 纯ASCII码
    String.prototype.isASCII = function (): boolean {
      return /^[\x00-\xFF]+$/.test(this);
    };

    // 纯中文
    String.prototype.isChinese = function (): boolean {
      return /^[\u4e00-\u9fff]+$/.test(this);
    };

    // 纯字母
    String.prototype.isLetter = function (): boolean {
      return /^[A-Za-z]+$/.test(this);
    };

    // 纯小写字母
    String.prototype.isLowercaseLetter = function (): boolean {
      return /^[a-z]+$/.test(this);
    };

    // 纯大写字母
    String.prototype.isUppercaseLetter = function (): boolean {
      return /^[A-Z]+$/.test(this);
    };

    // 纯特殊字符
    String.prototype.isSpecialCharacter = function (): boolean {
      return /^[^\da-zA-Z\u4e00-\u9fff]+$/.test(this);
    };

    // Email
    String.prototype.isEmail = function (): boolean {
      return /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this);
    };

    // 手机号码
    String.prototype.isMobile = function (): boolean {
      return /^[1]([3-9])[0-9]{9}$/.test(this);
    };

    // 身份证号码
    String.prototype.isIDCardNumber = function (): boolean {
      if (!/^[0-9]{17}[0-9xX]$/.test(this)) return false;

      let a: Array<number> = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      let b = '10X98765432';
      let num = 0;
      for (let i = 0; i < 17; i++) {
        num += (this[i] - 48) * a[i];
      }
      return b[num % 11] == this[17];
    };

    // 16进制颜色
    String.prototype.isHexColor = function (): boolean {
      return /^(#|0x)?([0-9a-fA-F]{3}){1,2}$/.test(this);
    };

    // IP地址
    String.prototype.isIP = function (): boolean {
      return this.isIPv4 || this.isIPv6;
    };

    // IPv4地址
    String.prototype.isIPv4 = function (): boolean {
      return /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(this);
    };

    // IPv6地址
    String.prototype.isIPv6 = function (): boolean {
      return /^([0-9A-Fa-f]{0,4}:){2,7}([0-9A-Fa-f]{1,4}$|((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4})$/.test(this);
    };

    // 获取md5
    String.prototype.md5 = function (): string {
      return md5(this);
    };

    // 时间戳 => 多久以前
    String.prototype.timeAgoSinceNow = function (): string {
      const timespan: number = this
      const dateTime = new Date(timespan * 1000);
      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1;
      const day = dateTime.getDate();
      const hour = dateTime.getHours();
      const minute = dateTime.getMinutes();
      //@ts-ignore 当前时间
      const now = Date.parse(new Date()); //typescript转换写法
      let milliseconds = 0;
      let timeSpanStr;
      //计算时间差
      milliseconds = (now / 1000) - timespan;

      //一分钟以内
      if (milliseconds <= 60) {
        timeSpanStr = '刚刚';
      }
      //大于一分钟小于一小时
      else if (60 < milliseconds && milliseconds <= 60 * 60) {
        timeSpanStr = Math.ceil((milliseconds / (60))) + '分钟前';
      }
      //大于一小时小于等于一天
      else if (60 * 60 < milliseconds && milliseconds <= 60 * 60 * 24) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60)) + '小时前';
      }
      //大于一天小于等于15天
      else if (60 * 60 * 24 < milliseconds && milliseconds <= 60 * 60 * 24 * 30) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24)) + '天前';
      }
      //大于一个月小于一年
      else if (60 * 60 * 24 * 30 < milliseconds && milliseconds <= 60 * 60 * 24 * 30 * 12) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24 * 30)) + '个月前';
      }
      //超过一年显示
      else {
        timeSpanStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute;
      }
      return timeSpanStr;
    }
  }
}
