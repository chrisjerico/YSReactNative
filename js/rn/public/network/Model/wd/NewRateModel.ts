/**
 * 实时汇率
 */
export interface NewRateModel {
  code?: number
  msg?: string
  data?: NewRateData
}

export interface NewRateData {
  rate?: string
}
