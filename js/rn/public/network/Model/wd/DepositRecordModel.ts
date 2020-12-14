/**
 * 存款记录数据
 */
export interface DepositRecordModel {
  code?: number
  msg?: string
  data?: DepositRecordData
}

export interface DepositRecordData {
  list?: DepositListData[]
  total?: number
}

export interface DepositListData {
  orderNo?: string
  amount?: string
  applyTime?: string
  arriveTime?: string
  status?: string
  category?: string
  remark?: string
  username?: string
  fee?: string
}
