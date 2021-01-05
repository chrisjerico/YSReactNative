
/**
 * 银行卡和虚拟币等信息
 * type: 增加银行卡，虚拟币，微信，支付宝
 * bank_id:
 * bank_card:
 * bank_addr:
 * pwd:
 * owner_name:
 */
interface IAddBankParams {
  type?: string
  bank_id?: string
  bank_card?: string
  bank_addr?: string
  pwd?: string
  owner_name?: string
}
