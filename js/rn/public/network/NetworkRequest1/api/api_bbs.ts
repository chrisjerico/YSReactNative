import { CCSessionReq } from './../CCSessionModel';


export class api_bbs {
  c = 'c=bbs&a=';

  // 获取文档列表数据
  gameDocList(params: {
    id: string, // 传入首页游戏列表接口的type参数
    title?: string,// 搜索关键字
    category: string, // 游戏ID（香港六合彩或澳门六合彩的ID）
    page: number// 页码
  }) {
    return CCSessionReq.get(this.c + arguments.callee.name, Object.assign({ rows: 20, }, params));
  }

  // 获取文档
  gameDocDetail(id: string) {
    return CCSessionReq.get(this.c + arguments.callee.name, { id: id });
  }

  // 打赏文档
  gameDocPay(id: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { id: id });
  }
}