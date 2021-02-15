export interface PlayData {
  id?: string //708501
  name?: string //01
  alias?: string//特码A"
  rebate?: string//0.1000
  code?: string//01
  played_groupid?: string//85
  odds?: string//42.5500
  offlineOdds?: string//43.0000
  minMoney?: string//1
  maxMoney?: string//1000000
  maxTurnMoney?: string//50000000
  isBan?: string//0
  enable?: string//1 //彩种是否开启
  from_id?: string//0

  exPlayIds?: string //部分彩种下注的时候需要联合其它彩种的ID 如 连肖
  exId?: string // 部分彩种的ID不是唯一的，就生成本地唯一识别ID, 优先使用本地ID 避免重复，如 TM-特码B-708550
  // exName?: string//本地定义 名字
  // exOdds?: string//本地定义 赔率
  exZodiac?: ZodiacNum //本地定义 对应的生肖数据

}

export interface PlayGroupData {
  id: string //"86"
  name: string //"两面"
  code: string //"LM"
  isShow: string //"1"
  enable: string //"1" //彩种是否开启
  isBan: string //0
  from_id: string //0
  alias: string //"两面"
  plays: PlayData[]

  exTitle?: string //本地生成的 title
  exHint?: string //本地生成的提醒文字
  exZodiacs?: ZodiacNum[] //本地生成的生肖数据
  exPlays?: PlayData[] //本地生成的彩球数据
}

export interface PlayOddData {
  code?: string // TM
  name?: string //特码
  playGroups?: PlayGroupData[]
  pageData?: PagePlayOddData // 重新组合数据
}

export interface PagePlayOddData { //本地定义本地使用
  zodiacNums: ZodiacNum[] //生肖数据
  groupTri?: Array<Array<PlayGroupData>> // 重新组合数据 1页2页3页...
}

export interface ZodiacNum {
  id?: string//本地使用id
  key?: string //"rat" metal
  name?: string //"鼠" 金
  alias?: string //本地使用别名
  nums?: string[] //["1","13","25","37","49"]

  enable?: string//1 //彩种是否开启，暂时未用
  exId?: string // 生成本地唯一识别ID, 暂时未用
}

// export interface FiveElement {
//   name: string
//   key: string
//   nums: number[]
// }

export interface PlayOddSettingData {
  redBalls: number[]
  greenBalls: number[]
  blueBalls: number[]
  zodiacs: string[] //["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
  zodiacSky: string[] //["兔","马","猴","猪","牛","龙"]
  zodiacEarth: string[] //["蛇","羊","鸡","狗","鼠","虎"]
  zodiacFront: string[] //["蛇","羊","鸡","狗","鼠","虎"]
  zodiacBehind: string[] //["蛇","羊","鸡","狗","鼠","虎"]
  zodiacPoultry: string[] //["蛇","羊","鸡","狗","鼠","虎"]
  zodiacBeast: string[] //["蛇","羊","鸡","狗","鼠","虎"]
  zodiacNums: ZodiacNum[]
  fiveElements: ZodiacNum[]
}

export interface BetNumLimit {
  playId: string //"7010001"
  minSize: string
  maxSize: string
  onlyNumber: string
  allowZero: string
}

export interface LotteryLimit {
  gameType: string //"lhc"
  numbers: number
  min: number
  max: number
  add0: number
}

export interface PlayOddGame {
  isSeal: string
  isClose: string
  title: string //"香港六合彩"
  isInstant: string//：是否是即开彩：1=是，0=否
}

export interface PlayOddDetailData {
  playOdds?: PlayOddData[]
  setting?: PlayOddSettingData
  betNumLimit?: BetNumLimit[]
  lotteryLimit?: LotteryLimit
  game?: PlayOddGame
}

/**
 * 彩票数据
 */
export interface PlayOddDetailModel {
  code: number
  msg: string
  data: PlayOddDetailData
}
