import { SampleAPI } from "../DoySessionModel";
import sellList from "../model/order/sellList";


export class api_order {
  static c = new SampleAPI('order');

  // 登录
  static sellList() {
    return this.c.get<sellList>('sellList',)
  }
}