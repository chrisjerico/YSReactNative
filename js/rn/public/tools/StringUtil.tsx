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
 * 转换2位小数形式
 */
const numberToFloatString = (x?: number): string => {
  if (!x) return '0.00'
  const i = Math.floor(x)
  const d = x?.toString()?.split('.')[1] || '00'
  return i.toLocaleString('en-US') + '.' + d
}

export {
  deleteHtml,
  endString,
  numberToFloatString,
  doubleDigit,
}
