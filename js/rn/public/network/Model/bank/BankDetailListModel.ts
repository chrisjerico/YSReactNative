/**
 * 活动彩金数据
 */

export interface BankDetailListModel {
  code?: number
  msg?: string
  data?: BankDetailListData[]
}

export interface BankDetailListData {
  id?: string // 1
  code?: string //
  name?: string //工商银行
  logo?: string //
  home?: string //http://www.icbc.com.cn
  rate?: string //0.00
  isDelete?: string //0
  currencyRate?: string //0
}
