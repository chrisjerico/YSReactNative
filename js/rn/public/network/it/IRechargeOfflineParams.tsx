
/**
 * 在线存款
 * amount 金额
 * channel 哪个渠道
 * payee 哪个银行
 * payer 付款人
 * remark 备注
 * depositTime 存款时间
 */
interface IRechargeOfflineParams {
  amount?: string
  channel?: string
  payee?: string
  payer?: string
  remark?: string
  depositTime?: string
}
