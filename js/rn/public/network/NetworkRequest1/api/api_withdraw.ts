import { CCSessionReq, SampleAPI } from "../CCSessionModel";

export class api_withdraw {
  static c = new SampleAPI('c=withdraw&a=');

  // 获取提款记录
  static logs(startTime: string, endTime: string, page = 1, rows = 20) {
    return this.c.get('logs', { startTime: startTime, endTime: endTime, page: page, rows: rows });
  }

  // 提款申请
  static apply(
    id: string, // 提款账户ID
    money: number,
    pwd: string,//取款密码
    virtual_amount?: number, //虚拟币金额
  ) {
    return this.c.post('apply', { id: id, money: money, virtual_amount: virtual_amount, pwd: pwd });
  }
}