import {TrendData} from "../interface/trendData";
import {Dimensions} from "react-native";
import { GRID_ITEM_HEIGHT, GRID_ITEM_WIDTH, GRID_LEFT_HEADER_WIDTH } from '../components/TrendView'

export const getTrendData_cqssc_qxc_pcdd = (from_name, data, defaultNumber = 0) => {
    const numberArray = []
    let positionArr = []
    let header =[]
    // const {width: screenWidth} = Dimensions.get("screen")

    if(from_name == "pcdd"){
        header = ['百','十', '个']
    } else if(from_name == "cqssc") {
        header = ['万', '千', '百','十', '个']
    } else if(from_name == "qxc"){   //七星彩
        header = ['一', '二', '三','四', '五', '六', '七']
    }

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const lottoryData = element.num.split(",");
        numberArray[i] = [];
        for (let j = 0; j < 10; j++) {
            if (Number(lottoryData[defaultNumber]) == j) {
                numberArray[i][j] = "seat";   //开奖号码占位
            } else {
                numberArray[i][j] = 0;  //遗漏
            }
        }
    }

    let reverseData = numberArray.reverse();  //倒序
    let tabData = [];
    for (let i = 0; i < reverseData.length; i++) {
        let totalData = reverseData[i];
        tabData[i] = [];
        for (let j = 0; j < totalData.length; j++) {
            let sData = totalData[j];
            if (sData == 0) {
                if (i == 0) {    //第一行
                    tabData[i][j] = 1;
                } else {
                    if ((tabData[i - 1][j]) == 'seat') {
                        tabData[i][j] = 1;
                    } else {
                        tabData[i][j] = (tabData[i - 1][j]) + 1;
                    }
                }
            } else {
                tabData[i][j] = sData;
            }
        }
    }

    let thisFinal = tabData.reverse();  //翻转
    //加载单元格
    let newTr = []
    if (data.length > 100 && data.length == 200) {
        for (let i = data.length - 101; i >= 0; i--) {   //取最新100条数据
            let element = data[i];
            let lottoryData = element.num.split(",");
            newTr[i] = []
            for (let j = 0; j < 11; j++) {
                if (j == 0) {
                    if (element.displayNumber) {
                        newTr[i][j] = element.displayNumber
                    } else {
                        newTr[i][j] = element.issue
                    }
                } else {
                    if (Number(lottoryData[defaultNumber]) == j - 1) {
                        positionArr[positionArr.length] = {x: j * GRID_ITEM_WIDTH + GRID_LEFT_HEADER_WIDTH - GRID_ITEM_WIDTH/2,  y: GRID_ITEM_HEIGHT * positionArr.length + GRID_ITEM_HEIGHT*3/2}
                        newTr[i][j] = lottoryData[defaultNumber]
                    } else {   //遗漏
                        newTr[i][j] = thisFinal[i][j - 1]
                    }
                }
            }
        }
    } else if (data.length > 100 && data.length < 200) {
        let dValue = 200 - data.length;
        for (let i = data.length - dValue - 1; i >= 0; i--) {   //取最新100条数据
            let element = data[i];
            let lottoryData = element.num.split(",");
            for (let j = 0; j < 11; j++) {
                if (j == 0) {
                    if (element.displayNumber) {
                        newTr[i][j] = element.displayNumber
                    } else {
                        newTr[i][j] = element.issue
                    }
                } else {
                    if (Number(lottoryData[defaultNumber]) == j - 1) {
                        positionArr[positionArr.length] = {x: j * GRID_ITEM_WIDTH + GRID_LEFT_HEADER_WIDTH - GRID_ITEM_WIDTH/2,  y: GRID_ITEM_HEIGHT * positionArr.length + GRID_ITEM_HEIGHT*3/2}
                        newTr[i][j] = lottoryData[defaultNumber]
                    } else {   //遗漏
                        newTr[i][j] = thisFinal[i][j - 1]
                    }
                }
            }
        }
    } else {
        for (let i = data.length - 1; i >= 0; i--) {   //取最新100条数据
            let element = data[i];
            let lottoryData = element.num.split(",");
            newTr[i] = []
            for (let j = 0; j < 11; j++) {
                if (j == 0) {
                    if (element.displayNumber) {
                        newTr[i][j] = element.displayNumber
                    } else {
                        newTr[i][j] = element.issue
                    }
                } else {
                    if (Number(lottoryData[defaultNumber]) == j - 1) {
                        positionArr[positionArr.length] = {x: j * GRID_ITEM_WIDTH + GRID_LEFT_HEADER_WIDTH - GRID_ITEM_WIDTH/2,  y: GRID_ITEM_HEIGHT * positionArr.length + GRID_ITEM_HEIGHT*3/2}
                        newTr[i][j] = lottoryData[defaultNumber]
                    } else {   //遗漏
                        newTr[i][j] = thisFinal[i][j - 1]
                    }
                }
            }
        }
    }

    let maximumOmission = getMaximumOmission(newTr)
    let maximumConnection = getMaximumConnection(newTr)
    let totalTimes = getTotalTimes(newTr)
    let averageOmission = getAverageOmission(totalTimes)

    return {data: newTr.reverse(), totalTimes, averageOmission, maximumOmission, maximumConnection, positionArr, header}
}

//最大連出
function getMaximumConnection(newTr) {
    let maximumConnection = ["最大连出"]
    let maxCount = 0
    for (let i = 1; i < 11; i++) {
        let count = 1
        newTr.map((item, index) => {
            if (typeof (item[i]) === "string") {
                for (let j = index + 1; j < newTr.length; j++) {
                    if (typeof (newTr[j][i]) === "string") {
                        count++
                    } else {
                        if (maxCount < count) {
                            maxCount = count
                        }
                        count = 1
                        return
                    }
                }
            }
        })
        maximumConnection[i] = maxCount.toString()
        maxCount = 0
    }

    return maximumConnection
}

//總次數
function getTotalTimes(newTr) {
    let totalTimes = ["出现总次数"]
    for (let i = 1; i < 11; i++) {
        let count = 0
        newTr.map((item) => {
            item[i] === (i - 1).toString() && count++
        })
        totalTimes[i] = count.toString()
    }

    return totalTimes
}

//最大遗漏
function getMaximumOmission(newTr) {
    let maximumOmission = ["最大遗漏"]
    let omission = 0
    for (let i = 1; i < 11; i++) {
        if (typeof (newTr[0][i]) !== "string")
            omission = newTr[0][i]
        newTr.map((item, index) => {
            if (typeof (item[i]) === "string") {
                for (let j = index + 1; j < newTr.length; j++) {
                    if (typeof (newTr[j][i]) !== "string") {
                        if (omission < newTr[j][i]) {
                            omission = newTr[j][i]
                            return
                        }
                    }
                }
            }
        })
        maximumOmission[i] = omission.toString()
        omission = 0
    }
    return maximumOmission
}

//平均遗漏
function getAverageOmission(totalTimes) {
    let averageOmission = ["平均遗漏"]
    for (let i = 1; i < 11; i++) {
        averageOmission[i] = Math.round(100 / (parseInt(totalTimes[i]) + 1) ).toString()
    }
    return averageOmission
}
