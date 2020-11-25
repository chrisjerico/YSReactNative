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
export const anyEmpty = (value?: any) => anyNull(value) || value == "" || value.length <= 0;
export const anyLength = (value?: any) => anyEmpty(value) ? 0 : value.length;

