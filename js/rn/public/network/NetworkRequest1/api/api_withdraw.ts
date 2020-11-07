import { CCSessionReq } from "../CCSessionModel";

export class api_withdraw {
  c = 'c=withdraw&a=';

  // 获取提款记录
  logs(startTime: string, endTime: string, page = 1, rows = 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { startTime: startTime, endTime: endTime, page: page, rows: rows });
  }

  // 提款申请
  apply(
    id: string, // 提款账户ID
    money: number,
    pwd: string,//取款密码
    virtual_amount?: number, //虚拟币金额
  ) {
    return CCSessionReq.post(this.c + arguments.callee.name, { id: id, money: money, virtual_amount: virtual_amount, pwd: pwd });
  }
}