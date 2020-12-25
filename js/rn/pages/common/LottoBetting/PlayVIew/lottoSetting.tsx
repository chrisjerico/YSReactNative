import { number } from "prop-types";
import { anyEmpty } from '../../../../public/tools/Ext'
import { Res } from '../../../../Res/icon/Res'

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

const redSet = ["01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "30", "34", "35", "40", "45", "46"]
const blueSet = ["03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"]
const greenSet = ["05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"]
export const getHKballColor = (BallName: string) => {
  if (redSet.includes(BallName)) {
    return '#e23'
  } else if (blueSet.includes(BallName)) {
    return '#4bf'
  } else {
    return '#3b6'
  }
}

/**
 * 得到花球
 * @param BallName
 */
export const getColorfulBallPic = (ballName: string) => {
  if (redSet.includes(ballName)) {
    return Res.red_ball
  } else if (blueSet.includes(ballName)) {
    return Res.blue_ball
  } else {
    return Res.green_ball
  }
}

/**
 * 得到骰子
 * @param BallName
 */
export const getSZBallPic = (ballName: string) => {
  const color = SzPics[ballName]
  return !anyEmpty(color) ? color : SzPics['01']
}

/**
 * 得到农场
 * @param BallName
 */
export const getVegetableBallPic = (ballName: string) => {
  const color = VegetablePics[ballName]
  return !anyEmpty(color) ? color : VegetablePics['01']
}

/**
 * 得到方格颜色
 * @param BallName
 */
export const getSQBallColor = (ballName: string) => {
  const color = SquareColors[ballName]
  return !anyEmpty(color) ? color : SquareColors['01']
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

/**
 * 方格颜色
 */
const SquareColors = {
  '01': '#E1D463',
  '02': '#008BF9',
  '03': '#4C4D51',
  '04': '#F47A00',
  '05': '#63D2D2',
  '06': '#420AFF',
  '07': '#AEA6A6',
  '08': '#FF0400',
  '09': '#770100',
  '10': '#2BC610',
}

/**
 * 骰子图片
 */
const SzPics = {
  '01': Res.sz1,
  '02': Res.sz2,
  '03': Res.sz3,
  '04': Res.sz4,
  '05': Res.sz5,
  '06': Res.sz6,
}

/**
 * 农场图片
 */
const VegetablePics = {
  '01': Res.xync_num_01,
  '02': Res.xync_num_02,
  '03': Res.xync_num_03,
  '04': Res.xync_num_04,
  '05': Res.xync_num_05,
  '06': Res.xync_num_06,
  '07': Res.xync_num_07,
  '08': Res.xync_num_08,
  '09': Res.xync_num_09,
  '10': Res.xync_num_10,
  '11': Res.xync_num_11,
  '12': Res.xync_num_12,
  '13': Res.xync_num_13,
  '14': Res.xync_num_14,
  '15': Res.xync_num_15,
  '16': Res.xync_num_16,
  '17': Res.xync_num_17,
  '18': Res.xync_num_18,
  '19': Res.xync_num_19,
  '20': Res.xync_num_20,
}
