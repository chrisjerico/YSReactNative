import { SampleAPI } from "../DoySessionModel";
import buyList from "../model/order/buyList";
import getDetail from "../model/order/getDetail";
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
  static addBuy(p: {
    payType: payType,
    num: string,
    remark?: string,
    'limit[regDay]': string,
    'limit[commentNum]': string,
    'limit[sucNum]': string,
  }) {
    return this.c.post<null>('addBuy', p)
  }

  //创建卖单
  static addSell(p: {
    payType: payType,
    num: string,
    remark?: string,
    'limit[regDay]': string,// 注册天数
    'limit[commentNum]': string,// 评价
    'limit[sucNum]': string,// 成功交易多少笔
  }) {
    return this.c.post<null>('addSell', p)
  }

  //订单详情
  static getDetail(orderNo: string) {
    return this.c.get<getDetail>('getDetail', { orderNo })
  }

  //交易下单
  static pick(orderNo: string) {
    return this.c.get<null>('pick', { orderNo })
  }
}