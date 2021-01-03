
/**
 * 提现
 * amount 金额
 * pwd 密码
 * id 哪个银行或者虚拟币
 * virtual_amount 虚拟币类型
 */
interface IRequestWithdrawParams {
  money?: string
  pwd?: string
  id?: string
  virtual_amount?: string
}
