import { number } from "prop-types";

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