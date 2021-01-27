/**
 * 合并2个对象
 *
 * @param src 源对象
 * @param des 目标对象
 */
import { anyEmpty } from './Ext'

const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
const isArray = (arr) => {
  return Array.isArray(arr)
}
const mergeObject = (target, ...arg) => {
  return arg.reduce((acc, cur) => {
    return Object.keys(cur).reduce((subAcc, key) => {
      const srcVal = cur[key]
      if (isObject(srcVal)) {
        subAcc[key] = mergeObject(subAcc[key] ? subAcc[key] : {}, srcVal)
      } else if (isArray(srcVal)) {
        // series: []，下层数组直接赋值
        subAcc[key] = srcVal.map((item, idx) => {
          if (isObject(item)) {
            const curAccVal = subAcc[key] ? subAcc[key] : []
            return mergeObject(curAccVal[idx] ? curAccVal[idx] : {}, item)
          } else {
            return item
          }
        })
      } else {
        subAcc[key] = srcVal
      }
      return subAcc
    }, acc)
  }, target)
}

export { mergeObject }
