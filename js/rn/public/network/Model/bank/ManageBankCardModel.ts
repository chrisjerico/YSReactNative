/**
 * 银行列表数据
 */

export interface ManageBankCardModel {
  code?: number
  msg?: string
  data?: ManageBankCardData
}

export interface ManageBankCardData {
  allAccountList?: AllAccountListData[]
  id?: string //
  uid?: string //
  type?: string //
  admin?: string //
  enable?: string //
  bankId?: string //
  editEnable?: string //
  xgtime?: string //
  bdtime?: string //
  ownerName?: string //
  bankCard?: string //
  bankAddr?: string //
  bankName?: string //
  bankCode?: string //
  bankBackgroundImage?: string //
}

export interface AllAccountListData {
  type?: number
  name?: string
  isshow?: boolean
  ismore?: boolean
  number?: string
  minWithdrawMoney?: string
  maxWithdrawMoney?: string

  data?: BankInfoParam[]
}

export interface BankInfoParam {
  parentTypeName?: string// 本地使用，父类名字，比如 银行卡
  id?: string //
  uid?: string //
  type?: string //
  admin?: string //
  enable?: string //
  bankId?: string //
  editEnable?: string //
  xgtime?: string //
  bdtime?: string //
  ownerName?: string //
  bankCard?: string //
  bankAddr?: string //
  bankName?: string //
  bankCode?: string //
  bankBackgroundImage?: string //

  notBind?: boolean //本地使用，未绑定数据
}
