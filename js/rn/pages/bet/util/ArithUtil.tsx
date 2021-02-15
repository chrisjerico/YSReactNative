
import { anyEmpty, arrayLength, dicNull } from '../../../public/tools/Ext'
import { ugLog } from '../../../public/tools/UgLog'

/**
 * 得到组合数量
 * @param arr 数组
 * @param len 组合长度
 */
const combination = (arr?: Array<any>, len?: number) => {
  let resultArr = []
  if (len <= 0 || len > arr.length) {
    return resultArr
  }
  for (let i = 0; i < arr.length; i++) {
    let tempArr = []
    tempArr.push(arr[i])
    if (len === 1) {
      resultArr.push(tempArr)
    } else {
      let x = arr.slice(i + 1)
      let newArr = combination(x, len - 1)
      for (let j = 0; j < newArr.length; j++) {
        resultArr.push(tempArr.concat(newArr[j]))
      }
    }
  }
  return resultArr
}

/**
 * N个数组 组成 新的组合
 * @param arg N个数组
 */
const combineArr = (...arg: Array<any>) => {
  let heads = arg[0]
  for (let i = 1, len = arg.length; i < len; i++) {
    heads = addNewType(heads, arg[i])
  }
  return heads
}

/**
 *
 * @param heads
 * @param choices
 */
const addNewType = (heads?: any, choices?: any) => {
  let result = []
  for (let i = 0, lenI = heads.length; i < lenI; i++) {
    for (let j = 0, lenJ = choices.length; j < lenJ; j++) {
      result.push([heads[i], choices[j]].flat(Infinity))
    }
  }
  return result
}

/**
 * 从数据中随机选择N个成员出来
 * @param list
 * @param count 需要随机几个数
 */
const randomItem = (list?: Array<any>, count: number = 1): Array<any> => {
  if (anyEmpty(list) || count > arrayLength(list)) return null

  let tempArr = list.slice(0)
  let newArrList = []
  for (let i = 0; i < count; i++) {
    let random = Math.floor(Math.random() * (tempArr.length - 1))
    let arr = tempArr[random]
    tempArr.splice(random, 1)
    newArrList.push(arr)
  }

  ugLog('randomItem = ', newArrList)
  return newArrList
}

/**
 * 计算新的赔率，公式： 新賠率 = 原始賠率 - ( 原始賠率無條件進位至整數位 * 退水)，
 * 如 退水是 0.4% 就应该是 0.0004，公式就是：48.8 - （49 * 0.0004）= 新赔率
 *
 * @param odds 赔率
 * @param sliderValue
 */
const calculateSliderValue = (odds?: string, sliderValue?: number): string => {
  const oddsNumber = Number(odds)
  const newOdds = Math.ceil(oddsNumber)
  return (oddsNumber - (newOdds * sliderValue / 100)).toFixed(4)
}

/**
 * 计算总共选择的数量
 * @param list
 */
const mapTotalCount = (list?: Map<any, number>): number => {
  return dicNull(list) ? 0 :
    Object.values(list)?.reduce((previousValue, currentValue) => previousValue + currentValue)
}

export {
  combination,
  combineArr,
  randomItem,
  mapTotalCount,
  calculateSliderValue,
}
