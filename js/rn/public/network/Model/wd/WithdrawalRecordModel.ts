/**
 * 取款记录数据
 */
export interface WithdrawalRecordModel {
  code?: number
  msg?: string
  data?: WithdrawalRecordData
}

export interface WithdrawalRecordData {
  list?: WithdrawalListData[]
  total?: number
}

export interface WithdrawalListData {
  type?: string
  orderNo?: string
  bankName?: string
  bankCard?: string
  bankAccount?: string
  amount?: string
  status?: string
  applyTime?: string
  remark?: string
  arriveTime?: string
  fee?: string
}
