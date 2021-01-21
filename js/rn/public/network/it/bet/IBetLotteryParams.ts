/**
 * 下注数据
 */
export interface IBetLotteryParams {
  activeReturnCoinRatio?: string
  betIssue?: string //期号
  endTime?: string //封盘时间 1611210600
  gameId?: string // 彩票ID，香港六合彩 230
  token?: string // s6ugQHBhQapsrPR66kmRr7GH
  totalMoney?: string //总金额
  totalNum?: string //选中数据

  betBean?: Array<BetLotteryData>

  isTest?: boolean //是不是试玩账号
}

export interface BetLotteryData {
  money?: string // 金额10.00
  odds?: string // 赔率48.8000
  playId?: string // 当前彩球id 7127749
  playIds?: string // 230 彩票ID
}
