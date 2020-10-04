"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combination = exports.factorial = exports.getHKballColor = exports.getShengXiaoString = exports.getShengXiaoValue = exports.ShengXiaoValue = exports.ShengXiaoTitle = void 0;
exports.ShengXiaoTitle = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪");
exports.ShengXiaoValue = new Array("猪", "狗", "鸡", "猴", "羊", "马", "蛇", "龙", "兔", "虎", "牛", "鼠");
exports.getShengXiaoValue = function () {
    var result = {};
    exports.ShengXiaoTitle.map(function (res) {
        result[res] = Array.from(new Array((12 * 4) + getIndex(res) > 49 ? 4 : 5), function (x, index) {
            var value = index * 12 + getIndex(res);
            return value;
        });
    });
    return result;
};
function getIndex(ShengXiao) {
    var now = new Date();
    var year = now.getFullYear();
    var ss = year - 2008;
    var ssyear = new Array("猪", "狗", "鸡", "猴", "羊", "马", "蛇", "龙", "兔", "虎", "牛", "鼠");
    var ShengXiaoNumber = ssyear.indexOf(ShengXiao) + 1;
    return Math.abs(ShengXiaoNumber + 12 + ss) % 12 + 1;
}
exports.getShengXiaoString = function (num) {
    var absNumber = num - 2 > 0 ? num - 2 : num + 10;
    return exports.ShengXiaoValue[((absNumber % 12))];
};
exports.getHKballColor = function (BallName) {
    var redSet = ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "30", "34", "35", "40", "45", "46"];
    var blueSet = ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"];
    var greenSet = ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"];
    if (redSet.includes(BallName)) {
        return 'rgba(197, 52, 60,1)';
    }
    else if (blueSet.includes(BallName)) {
        return 'rgba(86, 170, 236,1)';
    }
    else {
        return 'rgba(96, 174, 108,1)';
    }
};
function factorial(m, n) {
    var num = 1;
    var count = 0;
    for (var i = m; i > 0; i--) {
        if (count == n) {
            break;
        }
        num = num * i;
        count++;
    }
    return num;
}
exports.factorial = factorial;
function combination(m, n) {
    return factorial(m, n) / factorial(n, n);
}
exports.combination = combination;
