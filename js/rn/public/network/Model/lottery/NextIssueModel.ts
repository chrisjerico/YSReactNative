/**
 * 下一期彩票数据
 */
export interface NextIssueModel {
  code?: number
  msg?: string
  data?: NextIssueData
}

export interface NextIssueData {
  id?: string //lhc
  title?: string // 六合彩系列"
  gameType?: string // 六合彩系列"
  isSeal?: string // 是否封盘:1=是，0=否
  lowFreq?: string // 是否 低频彩，1 是
  serverTime?: string
  curIssue?: string //当前第几期
  displayNumber?: string //显示的期号
  curOpenTime?: string
  curCloseTime?: string
  preIsOpen?: string
  preIssue?: string //2101030051
  preDisplayNumber?: string //显示的期号 2101030051
  preOpenTime?: string //2021-01-03 16:40:00
  preNum?: string //29,27,02,08,12,18,35
  preResult?: string //猴,狗,猪,蛇,牛,羊,虎
  adEnable?: string
  adPic?: string
  adLink?: string
  adGameType?: string
  adLinkType?: string
  isClose?: string
  isInstant?: string//：是否是即开彩：1=是，0=否
  serverTimestamp?: string
  zodiacNums?: ZodiacNumsData[]
  fiveElements?: ZodiacNumsData[]
  winningPlayers?: string[]
}

export interface ZodiacNumsData {
  key?: string // rat, metal
  name?: string // 鼠, 金
  nums?: number[] //
}
