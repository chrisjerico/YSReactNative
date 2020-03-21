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
export const textEmpty = (value?: string) => value == null || value.length <= 0;
export const anyNull = (value?: any) => value == null;
