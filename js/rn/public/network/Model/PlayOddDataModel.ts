export interface Play {
  id: string;
  name: string;
  alias: string;
  rebate: string;
  code: string;
  played_groupid: string;
  odds: string;
  offlineOdds: string;
  minMoney: string;
  maxMoney: string;
  maxTurnMoney: string;
  isBan: string;
  enable: string;
  from_id: string;
}

export interface PlayGroup {
  id: string;
  name: string;
  code: string;
  isShow: string;
  enable: string;
  isBan: string;
  from_id: string;
  alias: string;
  plays: Play[];
}

export interface PlayOdd {
  code: string;
  name: string;
  playGroups: PlayGroup[];
}

export interface ZodiacNum {
  key: string;
  name: string;
  nums: number[];
}

export interface FiveElement {
  name: string;
  key: string;
  nums: number[];
}

export interface Setting {
  redBalls: number[];
  greenBalls: number[];
  blueBalls: number[];
  zodiacs: string[];
  zodiacSky: string[];
  zodiacEarth: string[];
  zodiacFront: string[];
  zodiacBehind: string[];
  zodiacPoultry: string[];
  zodiacBeast: string[];
  zodiacNums: ZodiacNum[];
  fiveElements: FiveElement[];
}

export interface BetNumLimit {
  playId: string;
  minSize: string;
  maxSize: string;
  onlyNumber: string;
  allowZero: string;
}

export interface LotteryLimit {
  gameType: string;
  numbers: number;
  min: number;
  max: number;
  add0: number;
}

export interface Game {
  isSeal: string;
  isClose: string;
  title: string;
  isInstant: string;
}

export interface Data {
  playOdds: PlayOdd[];
  setting: Setting;
  betNumLimit: BetNumLimit[];
  lotteryLimit: LotteryLimit;
  game: Game;
}

export interface TraceBack {
  loader: string;
  initDi: string;
  settings?: any;
  access: string;
  dispatch?: any;
}

export interface Info {
  sqlList: string[];
  sqlTotalNum: number;
  sqlTotalTime: string;
  traceBack: TraceBack;
  runtime: string;
}

export interface PlayOddDataModel {
  code: number;
  msg: string;
  data: Data;
  info: Info;
}
