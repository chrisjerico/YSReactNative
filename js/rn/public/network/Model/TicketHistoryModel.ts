export interface TicketHistoryModel {
  code: number
  data?: Data
  info: any
  msg: string
}

export interface Data {
  list: any[]
  total: number
  totalBetAmount: string
  totalWinAmount: string
}
