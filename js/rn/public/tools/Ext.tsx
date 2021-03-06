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
export const anyNull = (value?: any) => value == null || value == 'undefined' || value == undefined
export const arrayEmpty = (value?: Array<any>) => anyNull(value) || value.length <= 0
export const arrayLength = (value?: Array<any>) => arrayEmpty(value) ? 0 : value?.length
export const anyEmpty = (value?: any) => anyNull(value) || value === '' || value.length <= 0
export const anyLength = (value?: any) => anyEmpty(value) ? 0 : value.length
export const anyString = (value?: string) => value?.length ? value : undefined
export const dicNull = (value?: any) => anyNull(value) || JSON.stringify(value) == '{}'

const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]'
const isArray = (arr) => Array.isArray(arr)
export const equalObject = (obj1, obj2) => !anyNull(obj1) && !anyNull(obj2) && JSON.stringify(obj1) == JSON.stringify(obj2)

/**
 * 数组取第一个元素
 * @param array
 */
export const firstObj = (array?: any) => array && array.length ? array[0] : undefined

/**
 * 过滤MAP里面的某个值
 * @param map
 * @param anyKey 需要过滤的值
 */
export const mapFilter = <T,>(map?: Map<string, T>, anyKey?: string) =>
  Object.keys(map)
    .filter((key) => anyKey != key)
    .reduce((obj, key) => {
      obj[key] = map[key]
      return obj
    }, new Map<string, T>())

/**
 * 过滤MAP里面的某些值
 * @param map
 * @param keyArr 需要过滤的值集合
 */
export const mapFilterPlus = <T,>(map?: Map<string, T>, keyArr?: [string]) =>
  Object.keys(map)
    .filter((key) => !keyArr?.includes(key))
    .reduce((obj, key) => {
      obj[key] = map[key]
      return obj
    }, new Map<string, T>())

/**
 * 合并对象
 *
 * 别处的异常可能会导致这里原本正常的递归陷入无限循环
 *
 * @param src 源对象
 * @param des 新对象
 */
export const mergeObject = (src?: any, des?: any): any => {
  if ((!anyNull(src) && typeof src != 'object')
    || (!anyNull(des) && typeof des != 'object')
    || anyNull(src)) {
    return des // 如果其中一个不是对象 就返回 des
  }
  // ugLog('mergeObject 1 = ', JSON.stringify(src))
  // ugLog('mergeObject 2 = ', JSON.stringify(des))
  // ugLog('mergeObject 3 = ', dicNull(des))
  let obj = JSON.parse(JSON.stringify(src))
  if (!dicNull(des)) {
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

