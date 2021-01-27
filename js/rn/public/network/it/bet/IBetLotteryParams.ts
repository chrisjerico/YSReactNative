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
  isInstant?: string//：是否是即开彩：1=是，0=否

  betBean?: Array<BetLotteryData>

  isTest?: boolean //是不是试玩账号
}

export interface BetLotteryData {
  betInfo?: string // 连码等累计选中的数字 7,6,3
  money?: string // 金额10.00
  odds?: string // 赔率48.8000
  playId?: string // 当前彩球id 7127749
  playIds?: string // 230 彩票ID
}
