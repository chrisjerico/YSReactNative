import { number } from "prop-types";
import {anyLength} from "../../../../public/tools/Ext";
import {ugLog} from "../../../../public/tools/UgLog";

export type ShengXiaoType = "鼠" | "牛" | "虎" | "兔" | "龙" | "蛇" | "马" | "羊" | "猴" | "鸡" | "狗" | "猪"
export interface ShengXiaoValueProps {
  title: ShengXiaoType,
  value: string[]
}
export interface ResultProps {
  [key: string]: number[]
}
export const ShengXiaoTitle: ShengXiaoType[] = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪",);
export const ShengXiaoValue: ShengXiaoType[] = new Array("猪", "狗", "鸡", "猴", "羊", "马", "蛇", "龙", "兔", "虎", "牛", "鼠",);
export const getShengXiaoValue = () => {
  let result: ResultProps = {}
  ShengXiaoTitle.map((res: ShengXiaoType) => {
    result[res] = Array.from(new Array((12 * 4) + getIndex(res) > 49 ? 4 : 5), (x, index) => {
      let value = index * 12 + getIndex(res)
      return value

    })
  })
  return result
}

function getIndex(ShengXiao: ShengXiaoType) {
  const now = new Date();
  const year = now.getFullYear();
  const ss = year - 2008;
  const ssyear = new Array("猪", "狗", "鸡", "猴", "羊", "马", "蛇", "龙", "兔", "虎", "牛", "鼠",);
  const ShengXiaoNumber = ssyear.indexOf(ShengXiao) + 1
  return Math.abs(ShengXiaoNumber + 12 + ss) % 12 + 1
}

export const getShengXiaoString = (num: number): ShengXiaoType => {
  const absNumber = num - 2 > 0 ? num - 2 : num + 10
  return ShengXiaoValue[((absNumber % 12))]
}

export const getHKballColor = (BallName: string) => {
  if(anyLength(BallName) < 2) {
    BallName = '0' + BallName
  }

  const redSet = ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "30", "34", "35", "40", "45", "46"]
  const blueSet = ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"]
  const greenSet = ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"]
  if (redSet.includes(BallName)) {
    return '#e23'
  } else if (blueSet.includes(BallName)) {
    return '#4bf'
  } else {
    return '#3b6'
  }
}

export function factorial(m, n) {
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

export function combination(m, n) {
  return factorial(m, n) / factorial(n, n);
}

