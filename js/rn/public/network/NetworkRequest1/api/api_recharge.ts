import { CCSessionReq } from "../CCSessionModel";


export class api_recharge {
  c = 'c=recharge&a=';

  // 获取存款记录
  logs(startTime?:string, endTime?:string, page=1, rows=20) {
    return CCSessionReq.get(this.c + arguments.callee.name, {startTime:startTime, endTime:endTime, page:page, rows:rows});
  }

  // 支付通道列表信息
  cashier() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取在线支付地址
  onlinePay(payId:string, money:number) {
    return CCSessionReq.post(this.c + arguments.callee.name, {payId:payId, money:money});
  }

  // 线下支付（申请充值）
  transfer(
    channel: number, //支付通道ID
    payee: string, // 支付账号
    payer: string, // 支付姓名（银行卡姓名)（虚拟币金额USDT）
    amount:number, //金额
    remark: string, // 备注
    depositTime:string, //存款时间2020-10-03 10:20:52
    
  ) {
    return CCSessionReq.post(this.c + arguments.callee.name, {channel:channel, payee:payee, payer:payer, amount:amount, remark:remark, depositTime:depositTime});
  }
}