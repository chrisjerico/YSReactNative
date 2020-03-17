/**
 * 是否调试
 */
export const B_DEBUG = __DEV__;

export const ugLog = (s: string) => {
  if(B_DEBUG) console.log(s)
};
export const ugError = (s: string) => {
  if(B_DEBUG) console.error(s)
};
