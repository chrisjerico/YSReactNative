/**
 * 资金明细数据
 */
export interface CapitalDetailModel {
  code?: number
  msg?: string
  data?: CapitalDetailData
}

export interface CapitalDetailData {
  list?: CapitalListData[]
  groups?: CapitalGroupData[]
  total?: number
}

export interface CapitalListData {
  time?: string
  changeMoney?: string
  balance?: string
  category?: string
}

export interface CapitalGroupData {
  id?: string
  name?: string
}
