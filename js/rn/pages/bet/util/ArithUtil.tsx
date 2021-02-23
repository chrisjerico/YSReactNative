import { anyEmpty, arrayLength, dicNull } from '../../../public/tools/Ext'
import { ugLog } from '../../../public/tools/UgLog'
//
// /**
//  * 彩种计算组合的数量，比如<二连尾> len=2 表示2个数据为1组进行组合计算，4个数据就有6种组合: [1,2,3,4] -> [1,2],[1,3],[1,4],[2,3],[2,6],[3,4]
//  * @param arr 数组
//  * @param len 组合长度
//  */
// const combination = (arr?: Array<any>, len?: number): Array<any> => {
//   let resultArr = []
//   if (len <= 0 || len > arr.length) {
//     return resultArr
//   }
//   for (let i = 0; i < arr.length; i++) {
//     let tempArr = []
//     tempArr.push(arr[i])
//     if (len === 1) {
//       resultArr.push(tempArr)
//     } else {
//       let x = arr.slice(i + 1)
//       let newArr = combination(x, len - 1)
//       for (let j = 0; j < newArr.length; j++) {
//         resultArr.push(tempArr.concat(newArr[j]))
//       }
//     }
//   }
//   return resultArr
// }



/**
 * 计算排列组合情况，比如 [1, 2, 3] ->  [ [ 1, 2 ], [ 1, 3 ], [ 2, 3 ] ] 或者 [ [ 1, 2 ], [ 1, 3 ], [ 2, 1 ], [ 2, 3 ], [ 3, 1 ], [ 3, 2 ] ]
 * @param {*} source 源数组
 * @param {*} count 长度多少为一项
 * @param {*} isPermutation 是否使用排列的方式
 * @return {any[]} 所有排列组合,格式为 [ [1,2], [1,3]] ...
 */
const combineArray = (source: any[], count: number, isPermutation?: boolean): any[] => {
  //如果只取一位，返回数组中的所有项，例如 [ [1], [2], [3] ]
  let currentList = source.map((item) => [item]);
  if (count === 1) {
    return currentList;
  }
  let result = [];
  //取出第一项后，再取出后面count - 1 项的排列组合，并把第一项的所有可能（currentList）和 后面count-1项所有可能交叉组合
  for (let i = 0; i < currentList.length; i++) {
    let current = currentList[i];
    //如果是排列的方式，在取count-1时，源数组中排除当前项
    let children = [];
    if (isPermutation) {
      children = combineArray(source.filter(item => item !== current[0]), count - 1, isPermutation);
    }
    //如果是组合的方法，在取count-1时，源数组只使用当前项之后的
    else {
      children = combineArray(source.slice(i + 1), count - 1, isPermutation);
    }
    for (let child of children) {
      result.push([...current, ...child]);
    }
  }
  return result;
}

/**
 * N个数组 组成 新的组合，比如 [0,4],[7,8] -> [0,7],[0,8],[4,7],[4,8]
 * @param arg N个数组
 */
const combineArr = (...arg: Array<any>) => {
  let heads = arg[0]
  for (let i = 1, len = arg.length; i < len; i++) {
    heads = addNewResult(heads, arg[i])
  }
  return heads
}

/**
 *
 * @param heads
 * @param choices
 */
const addNewResult = (heads?: any, choices?: any): Array<any> => {
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
  if (anyEmpty(odds)) return ''

  if (odds?.includes('/')) {//有的赔率有2个
    const oddsArr = odds?.split('/')
    if (arrayLength(oddsArr) == 2) {
      return `${calculateSliderValueInside(oddsArr[0], sliderValue)}/${calculateSliderValueInside(oddsArr[1], sliderValue)}`
    }
  }

  return calculateSliderValueInside(odds, sliderValue)
}

/**
 * 计算新的赔率，公式： 新賠率 = 原始賠率 - ( 原始賠率無條件進位至整數位 * 退水)，
 * 如 退水是 0.4% 就应该是 0.0004，公式就是：48.8 - （49 * 0.0004）= 新赔率
 *
 * @param odds 赔率
 * @param sliderValue
 */
const calculateSliderValueInside = (odds?: string, sliderValue?: number): string => {
  if (anyEmpty(odds)) return null

  const oddsNumber = Number(odds)
  const newOdds = Math.ceil(oddsNumber)
  const value = oddsNumber - (newOdds * sliderValue / 100)
  return value.toFixed(4)
}

/**
 * 计算总共选择的数量
 * @param list
 */
const mapTotalCount = (list?: Map<any, number>): number => {
  return dicNull(list)
    ? 0 :
    Object.values(list)?.reduce((previousValue, currentValue) => previousValue + currentValue)
}

export {
  combineArray,
  combineArr,
  randomItem,
  mapTotalCount,
  calculateSliderValue,
}
