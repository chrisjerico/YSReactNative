/**
 * 游戏大厅数据
 */

export interface HallGameModel {
  code?: number
  msg?: string
  data?: Array<HallGameData>
}

// 彩票大厅接口（game.lotteryGames）
export interface HallGameData {
  gameType?: string //lhc
  gameTypeName?: string // 六合彩系列"
  list?: HallGameModel1[]
}


// 彩票分组接口（game.lotteryGroupGames）
export interface HallGameGroup {
  id?: string
  name?: string
  logo?: string
  lotteries?: HallGameModel2[]
}


export interface HallGameModel1 {
  id?: string //
  isSeal?: string //
  isClose?: string //
  enable?: string //
  name?: string //
  title?: string //"二十分六合彩"
  customise?: string
  isInstant?: string
  lowFreq?: string
  gameType?: string
  pic?: string
  openCycle?: string //"20分钟一期"
  curIssue?: string //"2012200041"
  curOpenTime?: string //"2020-12-20 13:20:00"
  curCloseTime?: string // "2020-12-20 13:19:50"
  displayNumber?: string // 2012200041
  preIssue?: string //"2012200041"
  preOpenTime?: string //"2020-12-20 13:20:00"
  preNum?: string // 40,22,25,33,31,20,27
  preDisplayNumber?: string // 2012200041
  preResult?: string // "鸡,兔,鼠,龙,马,蛇,狗"
  sort?: string //
  serverTime?: string // "2020-12-20 13:17:37"
  serverTimestamp?: string // 1608441457015

  // 自定义参数
  parentGameType?: string //父类游戏类型
}

interface HallGameModel2 {
  isSeal ?: string
  id ?: string
  customise ?: string
  lowFreq ?: string
  serverTimestamp ?: string
  title ?: string
  logo ?: string
  isInstant ?: string
  gameType ?: string
  serverTime ?: string
  isClose ?: string
  name ?: string
}

export type HallGameListData = HallGameModel1 & HallGameModel2