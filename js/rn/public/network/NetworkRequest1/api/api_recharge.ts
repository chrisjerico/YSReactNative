import { CCSessionReq, SampleAPI } from "../CCSessionModel";


export class api_recharge {
  static c = new SampleAPI('c=recharge&a=');

  // 获取存款记录
  static logs(startTime?:string, endTime?:string, page=1, rows=20) {
    return this.c.get('logs', {startTime:startTime, endTime:endTime, page:page, rows:rows});
  }

  // 支付通道列表信息
  static cashier() {
    return this.c.get('cashier');
  }

  // 获取在线支付地址
  static onlinePay(payId:string, money:number) {
    return this.c.post('onlinePay', {payId:payId, money:money});
  }

  // 线下支付（申请充值）
  static transfer(
    channel: number, //支付通道ID
    payee: string, // 支付账号
    payer: string, // 支付姓名（银行卡姓名)（虚拟币金额USDT）
    amount:number, //金额
    remark: string, // 备注
    depositTime:string, //存款时间2020-10-03 10:20:52
    
  ) {
    return this.c.post('transfer', {channel:channel, payee:payee, payer:payer, amount:amount, remark:remark, depositTime:depositTime});
  }
}