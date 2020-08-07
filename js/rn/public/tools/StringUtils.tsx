/**
 * @Description: 字符串处理
 *
 *
 * @author Arc
 * @date 05/08/2020
 */
export default class StringUtils {
  static _instance = new StringUtils();

  static getInstance() {
    return this._instance;
  }

  /**
   * 删除HTML标签
   * @param s
   */
  deleteHtml(s?: string): string {
    return s?.replace(/<[^>]+>/g, "");
  }

  /**
   * 判断是否以某个字符串结尾
   *
   * @param str 字符串
   * @param end 结尾字符串
   */
  endString(str?: string, end?: string): boolean {
    if (str != null && end != null && str.length > end.length) {
      let start = str.length - end.length;  //相差长度=字符串长度-特定字符长度
      let char = str.substr(start, end.length);//将相差长度作为开始下标，特定字符长度为截取长度

      return char == end;
    }
    return false;
  }


}
