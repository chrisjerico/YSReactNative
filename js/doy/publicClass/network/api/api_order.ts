import { SampleAPI } from "../DoySessionModel";
import buyList from "../model/order/buyList";
import sellList from "../model/order/sellList";


export enum payType {
  银行卡 = 1,
  支付宝 = 2,
  微信 = 3,
}

export class api_order {
  static c = new SampleAPI('order');

  // 我要卖（买单）列表
  static sellList(payType?: payType, page?: number, rows = 20) {
    return this.c.get<sellList>('sellList', { payType, page, rows })
  }

  // 我要买（卖单）列表
  static buyList(payType?: payType, num?: string, page?: number, rows = 20) {
    return this.c.get<buyList>('buyList', { payType, num, page, rows })
  }

  //创建买单
  static addBuy() {
    return this.c.post<addBuy>('addBuy',)
  }

  //创建卖单
  static addSell() {
    return this.c.post<addSell>('addSell',)
  }

  //订单详情
  static getDetail(id: string) {
    return this.c.get<getDetail>('getDetail', { id })
  }

  //交易下单
  static pick() {
    return this.c.get<pick>('pick',)
  }
}