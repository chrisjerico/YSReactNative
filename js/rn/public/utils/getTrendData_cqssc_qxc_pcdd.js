"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
exports.getTrendData_cqssc_qxc_pcdd = function (from_name, data, defaultNumber) {
    if (defaultNumber === void 0) { defaultNumber = 0; }
    var numberArray = [];
    var positionArr = [];
    var header = [];
    var screenWidth = react_native_1.Dimensions.get("screen").width;
    if (from_name == "pcdd") {
        header = ['百', '十', '个'];
    }
    else if (from_name == "cqssc") {
        header = ['万', '千', '百', '十', '个'];
    }
    else if (from_name == "qxc") { //七星彩
        header = ['一', '二', '三', '四', '五', '六', '七'];
    }
    for (var i = 0; i < data.length; i++) {
        var element = data[i];
        var lottoryData = element.num.split(",");
        numberArray[i] = [];
        for (var j = 0; j < 10; j++) {
            if (Number(lottoryData[defaultNumber]) == j) {
                numberArray[i][j] = "seat"; //开奖号码占位
            }
            else {
                numberArray[i][j] = 0; //遗漏
            }
        }
    }
    var reverseData = numberArray.reverse(); //倒序
    var tabData = [];
    for (var i = 0; i < reverseData.length; i++) {
        var totalData = reverseData[i];
        tabData[i] = [];
        for (var j = 0; j < totalData.length; j++) {
            var sData = totalData[j];
            if (sData == 0) {
                if (i == 0) { //第一行
                    tabData[i][j] = 1;
                }
                else {
                    if ((tabData[i - 1][j]) == 'seat') {
                        tabData[i][j] = 1;
                    }
                    else {
                        tabData[i][j] = (tabData[i - 1][j]) + 1;
                    }
                }
            }
            else {
                tabData[i][j] = sData;
            }
        }
    }
    var thisFinal = tabData.reverse(); //翻转
    //加载单元格
    var newTr = [];
    if (data.length > 100 && data.length == 200) {
        for (var i = data.length - 101; i >= 0; i--) { //取最新100条数据
            var element = data[i];
            var lottoryData = element.num.split(",");
            newTr[i] = [];
            for (var j = 0; j < 11; j++) {
                if (j == 0) {
                    if (element.displayNumber) {
                        newTr[i][j] = element.displayNumber;
                    }
                    else {
                        newTr[i][j] = element.issue;
                    }
                }
                else {
                    if (Number(lottoryData[defaultNumber]) == j - 1) {
                        positionArr[positionArr.length] = { x: j * (screenWidth - 120) / 6 + 100, y: 34.5 * positionArr.length + 51.75 };
                        newTr[i][j] = lottoryData[defaultNumber];
                    }
                    else { //遗漏
                        newTr[i][j] = thisFinal[i][j - 1];
                    }
                }
            }
        }
    }
    else if (data.length > 100 && data.length < 200) {
        var dValue = 200 - data.length;
        for (var i = data.length - dValue - 1; i >= 0; i--) { //取最新100条数据
            var element = data[i];
            var lottoryData = element.num.split(",");
            for (var j = 0; j < 11; j++) {
                if (j == 0) {
                    if (element.displayNumber) {
                        newTr[i][j] = element.displayNumber;
                    }
                    else {
                        newTr[i][j] = element.issue;
                    }
                }
                else {
                    if (Number(lottoryData[defaultNumber]) == j - 1) {
                        positionArr[positionArr.length] = { x: j * (screenWidth - 120) / 6 + 100, y: 34.5 * positionArr.length + 51.75 };
                        newTr[i][j] = lottoryData[defaultNumber];
                    }
                    else { //遗漏
                        newTr[i][j] = thisFinal[i][j - 1];
                    }
                }
            }
        }
    }
    else {
        for (var i = data.length - 1; i >= 0; i--) { //取最新100条数据
            var element = data[i];
            var lottoryData = element.num.split(",");
            newTr[i] = [];
            for (var j = 0; j < 11; j++) {
                if (j == 0) {
                    if (element.displayNumber) {
                        newTr[i][j] = element.displayNumber;
                    }
                    else {
                        newTr[i][j] = element.issue;
                    }
                }
                else {
                    if (Number(lottoryData[defaultNumber]) == j - 1) {
                        positionArr[positionArr.length] = { x: j * (screenWidth - 120) / 6 + 100, y: 34.5 * positionArr.length + 51.75 };
                        newTr[i][j] = lottoryData[defaultNumber];
                    }
                    else { //遗漏
                        newTr[i][j] = thisFinal[i][j - 1];
                    }
                }
            }
        }
    }
    var maximumOmission = getMaximumOmission(newTr);
    var maximumConnection = getMaximumConnection(newTr);
    var totalTimes = getTotalTimes(newTr);
    var averageOmission = getAverageOmission(totalTimes);
    return { data: newTr.reverse(), totalTimes: totalTimes, averageOmission: averageOmission, maximumOmission: maximumOmission, maximumConnection: maximumConnection, positionArr: positionArr, header: header };
};
//最大連出
function getMaximumConnection(newTr) {
    var maximumConnection = ["最大连出"];
    var maxCount = 0;
    var _loop_1 = function (i) {
        var count = 1;
        newTr.map(function (item, index) {
            if (typeof (item[i]) === "string") {
                for (var j = index + 1; j < newTr.length; j++) {
                    if (typeof (newTr[j][i]) === "string") {
                        count++;
                    }
                    else {
                        if (maxCount < count) {
                            maxCount = count;
                        }
                        count = 1;
                        return;
                    }
                }
            }
        });
        maximumConnection[i] = maxCount.toString();
        maxCount = 0;
    };
    for (var i = 1; i < 11; i++) {
        _loop_1(i);
    }
    return maximumConnection;
}
//總次數
function getTotalTimes(newTr) {
    var totalTimes = ["出现总次数"];
    var _loop_2 = function (i) {
        var count = 0;
        newTr.map(function (item) {
            item[i] === (i - 1).toString() && count++;
        });
        totalTimes[i] = count.toString();
    };
    for (var i = 1; i < 11; i++) {
        _loop_2(i);
    }
    return totalTimes;
}
//最大遗漏
function getMaximumOmission(newTr) {
    var maximumOmission = ["最大遗漏"];
    var omission = 0;
    var _loop_3 = function (i) {
        if (typeof (newTr[0][i]) !== "string")
            omission = newTr[0][i];
        newTr.map(function (item, index) {
            if (typeof (item[i]) === "string") {
                for (var j = index + 1; j < newTr.length; j++) {
                    if (typeof (newTr[j][i]) !== "string") {
                        if (omission < newTr[j][i]) {
                            omission = newTr[j][i];
                            return;
                        }
                    }
                }
            }
        });
        maximumOmission[i] = omission.toString();
        omission = 0;
    };
    for (var i = 1; i < 11; i++) {
        _loop_3(i);
    }
    return maximumOmission;
}
//平均遗漏
function getAverageOmission(totalTimes) {
    var averageOmission = ["平均遗漏"];
    for (var i = 1; i < 11; i++) {
        averageOmission[i] = Math.round(100 / (parseInt(totalTimes[i]) + 1)).toString();
    }
    return averageOmission;
}
