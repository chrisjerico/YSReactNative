export interface PlayData {
  id?: string; //708501
  name?: string; //01
  alias?: string;//特码A"
  rebate?: string;//0.1000
  code?: string;//01
  played_groupid?: string;//85
  odds?: string;//42.5500
  offlineOdds?: string;//43.0000
  minMoney?: string;//1
  maxMoney?: string;//1000000
  maxTurnMoney?: string;//50000000
  isBan?: string;//0
  enable?: string;//1
  from_id?: string;//0

  // exId?: string //本地定义 id
  // exName?: string//本地定义 名字
  // exOdds?: string//本地定义 赔率
  exZodiac?: ZodiacNum; //本地定义 对应的生肖数据

}

export interface PlayGroupData {
  id: string; //"86"
  name: string; //"两面"
  code: string; //"LM"
  isShow: string; //"1"
  enable: string; //"1"
  isBan: string; //0
  from_id: string; //0
  alias: string; //"两面"
  plays: PlayData[];

  exZodiacs: ZodiacNum[]; //本地生成的生肖数据
  exPlays: PlayData[]; //本地生成的彩球数据
}

export interface PlayOddData {
  code?: string; // TM
  name?: string; //特码
  playGroups?: PlayGroupData[];
  pageData?: PagePlayOddData // 重新组合数据
}

export interface PagePlayOddData { //本地定义本地使用
  zodiacNums: ZodiacNum[] //生肖数据
  groupTri?: Array<Array<PlayGroupData>> // 重新组合数据 1页2页3页...
}

export interface ZodiacNum {
  id?: string//本地使用id
  key?: string; //"rat" metal
  name?: string; //"鼠" 金
  alias?: string; //本地使用别名
  nums?: string[]; //["1","13","25","37","49"]
}

// export interface FiveElement {
//   name: string;
//   key: string;
//   nums: number[];
// }

export interface PlayOddSettingData {
  redBalls: number[];
  greenBalls: number[];
  blueBalls: number[];
  zodiacs: string[]; //["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
  zodiacSky: string[]; //["兔","马","猴","猪","牛","龙"]
  zodiacEarth: string[]; //["蛇","羊","鸡","狗","鼠","虎"]
  zodiacFront: string[]; //["蛇","羊","鸡","狗","鼠","虎"]
  zodiacBehind: string[]; //["蛇","羊","鸡","狗","鼠","虎"]
  zodiacPoultry: string[]; //["蛇","羊","鸡","狗","鼠","虎"]
  zodiacBeast: string[]; //["蛇","羊","鸡","狗","鼠","虎"]
  zodiacNums: ZodiacNum[];
  fiveElements: ZodiacNum[];
}

export interface BetNumLimit {
  playId: string; //"7010001"
  minSize: string;
  maxSize: string;
  onlyNumber: string;
  allowZero: string;
}

export interface LotteryLimit {
  gameType: string; //"lhc"
  numbers: number;
  min: number;
  max: number;
  add0: number;
}

export interface PlayOddGame {
  isSeal: string;
  isClose: string;
  title: string; //"香港六合彩"
  isInstant: string;
}

export interface PlayOddDetailData {
  playOdds?: PlayOddData[];
  setting?: PlayOddSettingData;
  betNumLimit?: BetNumLimit[];
  lotteryLimit?: LotteryLimit;
  game?: PlayOddGame;
}

/**
 * 彩票数据
 */
export interface PlayOddDetailModel {
  code: number;
  msg: string;
  data: PlayOddDetailData;
}
