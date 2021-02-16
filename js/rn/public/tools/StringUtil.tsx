/**
 * 转成2位数
 */
const doubleDigit = (value?: string | number) => ('0' + value).slice(-2)

/**
 * 删除HTML标签
 * @param s
 */
const deleteHtml = (s?: string): string => {
  return s?.replace(/<[^>]+>/g, '')
}

/**
 * 判断是否以某个字符串结尾
 *
 * @param str 字符串
 * @param end 结尾字符串
 */
const endString = (str?: string, end?: string): boolean => {
  if (str != null && end != null && str.length > end.length) {
    let start = str.length - end.length  //相差长度=字符串长度-特定字符长度
    let char = str.substr(start, end.length)//将相差长度作为开始下标，特定字符长度为截取长度

    return char == end
  }
  return false
}

/**
 * 转换n位小数形式
 */
const numberToFloatString = (x?: number, len: number = 2): string => {
  return x ? x.toFixed(len) : Number(0).toFixed(len)
}

export {
  deleteHtml,
  endString,
  numberToFloatString,
  doubleDigit,
}
