/**
 * Arc
 *
 * 扩展工具类
 */


/**
 * 检查当前变量是否为 true
 * @param value
 */
export const checkTrue = (value?: any) => value != null && value === true;

/**
 * 检查当前变量是否为 空
 * @param value
 */
export const arrayEmpty = (value?: Array<any>) => value == null || value.length <= 0;
export const arrayLength = (value?: Array<any>) => arrayEmpty(value) ? 0 : value.length;
export const anyNull = (value?: any) => value == null || value == 'undefined';
export const anyEmpty = (value?: any) => anyNull(value) || value === '' || value.length <= 0 || Object.keys(value).length === 0
export const anyLength = (value?: any) => anyEmpty(value) ? 0 : value.length;


const isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
const isArray = (arr) => {
  return Array.isArray(arr)
}

/**
 * 合并对象
 * @param target 新对象
 * @param arg 需要合并的对象
 */
export const mergeObject = (target: any, ...arg): any => {
  return arg?.reduce((acc, cur) => {
    return anyEmpty(cur) ? null : Object.keys(cur).reduce((subAcc, key) => {
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

