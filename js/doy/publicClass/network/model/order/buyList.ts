
export default interface Data {
  list: list[],
  total: number
}

interface list {
  id: string,//用不上
  orderNo: string//订单号
  buyer_uid: string// 买方用户ID
  seller_uid: string//卖方用户id
  seller_username: string//卖方昵称
  amount: string//金额
  rechargeAmount: string//充值金额
  notifyUrl: string//通知URL
  returnUrl: string//返回URL
  buyer_ip: string//买方ip
  actionTime: string
  rechargeTime: string//充值时间
  state: "0",
  notifyState: "0",//通知状态
  notifyCount: string//通知数量
  notifyResponse: string
  is_delete: "0",//是否已删除
  admin_id: string
  remark: string//备注
  create_time: string//创建时间
  update_time: string//更新时间
  bank_account: string//银行账号
  bank_realname: string//真实姓名
  bank_address: string//银行地址
  bank_type: "0",//银行类型
  allow_bank_type: "",//允许的银行类型
  pick_time: string//交易时间
  payed_time: string//支付时间
  finish_time: string//结束时间
  type: "1",
  trade_limit: "{\"reg_day\":0,\"success_num\":0,\"comment_score\":0}",
  buyer_username: string
  creditGrade: string// 卖家信用
}