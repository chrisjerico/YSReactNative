export interface PlayData {
  issue: string; //2021003
  displayNumber: string //2021003
  openTime: string; //"2021-01-08 21:30:00"
  num: string //"33,29,34,32,19,05,43"
  gameType: string //lhc
  result: string //龙,猴,兔,蛇,马,猴,马"
}

export interface LotteryHistoryData {
  list: PlayData[];
  redBalls?: number[];
  greenBalls?: number[];
  blueBalls?: number[];
}

/**
 * 彩票开奖记录
 */
export interface LotteryHistoryModel {
  code: number;
  msg: string;
  data: LotteryHistoryData;
}
