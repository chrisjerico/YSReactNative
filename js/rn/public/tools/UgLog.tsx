/**
 * Arc
 *
 * 是否调试
 */
export const B_DEBUG = __DEV__;

export const ugLog = (...s: any[]) => {
  B_DEBUG && console.log(...s);
};
export const ugError = (...s: any[]) => {
  B_DEBUG && console.error(...s);
};
