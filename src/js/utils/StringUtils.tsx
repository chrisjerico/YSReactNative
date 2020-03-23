
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
    return s?.replace(/<[^>]+>/g,"");
  }
}
