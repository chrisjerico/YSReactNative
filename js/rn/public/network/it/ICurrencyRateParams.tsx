
/**
 * 在线存款
 * amount 金额
 * channel 哪个渠道
 * payee 哪个银行
 * payer 付款人
 * remark 备注
 * depositTime 存款时间
 */
interface ICurrencyRateParams {
  from?: string //  哪种钱
  to?: string //  到哪种钱
  amount?: string //多少钱
  float?: string //汇率 1
}
