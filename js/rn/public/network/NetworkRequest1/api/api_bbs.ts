import { SampleAPI } from './../CCSessionModel';


export class api_bbs {
  static c = new SampleAPI('c=bbs&a=');

  // 获取文档列表数据
  static gameDocList(params: {
    id: string, // 传入首页游戏列表接口的type参数
    title?: string,// 搜索关键字
    category: string, // 游戏ID（香港六合彩或澳门六合彩的ID）
    page: number// 页码
  }) {
    return this.c.get('gameDocList', Object.assign({ rows: 20, }, params));
  }

  // 获取文档
  static gameDocDetail(id: string) {
    return this.c.get('gameDocDetail', { id: id });
  }

  // 打赏文档
  static gameDocPay(id: string) {
    return this.c.post('gameDocPay', { id: id });
  }
}