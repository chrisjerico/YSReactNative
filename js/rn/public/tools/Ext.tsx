/**
 * Arc
 *
 * 扩展工具类
 */


import { ugLog } from './UgLog'

/**
 * 检查当前变量是否为 true
 * @param value
 */
export const checkTrue = (value?: any) => value != null && value === true

/**
 * 检查当前变量是否为 空
 * @param value
 */
export const arrayEmpty = (value?: Array<any>) => value == null || value.length <= 0
export const arrayLength = (value?: Array<any>) => arrayEmpty(value) ? 0 : value?.length
export const anyNull = (value?: any) => value == null || value == 'undefined'
export const anyEmpty = (value?: any) => anyNull(value) || value === '' || value.length <= 0 || Object.keys(value).length === 0
export const anyLength = (value?: any) => anyEmpty(value) ? 0 : value.length
  export const dicNull = (value?: any) => JSON.stringify(value) == '{}' ? true : false;

const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]'
const isArray = (arr) => Array.isArray(arr)

/**
 * 合并对象
 * @param src 源对象
 * @param des 新对象
 */
export const mergeObject = (src?: any, des?: any): any => {
  let obj = src
  if ((!anyNull(src) && typeof src != 'object')
    || (!anyNull(des) && typeof des != 'object')
    || JSON.stringify(des) == '{}'
    || anyNull(src)) {
    return des // 如果其中一个不是对象 就返回 des
  }
  if (!anyEmpty(des)) {
    for (let key in des) {
      // 如果target也存在 那就再次合并
      if (src.hasOwnProperty(key)) {
        obj[key] = mergeObject(src[key], des[key])
      } else {
        // 不存在就直接添加
        obj[key] = des[key]
      }
    }
  }
  return obj
}

