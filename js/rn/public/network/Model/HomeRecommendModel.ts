export interface Game {
  gameType: string;
  gameTypeName: string;
  id: string;
  isClose: string;
  isHot: string;
  isInstant: string;
  isSeal: string;
  name: string;
  pic: string;
  title: string;
}

export interface Data {
  category: string;
  categoryName: string;
  games: Game[];
}

export interface TwoLevelType {
  id: string;
  code: string;
  name: string;
  pic: string;
}

export interface TraceBack {
  loader: string;
  initDi: string;
  settings?: any;
  fileCfg: string;
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

export interface HomeRecommendModel {
  code: number;
  msg: string;
  data: Data[];
  info: Info;
}

export interface TwoLevelGame {
  code: number;
  msg: string;
  data: TwoLevelType[];
  info: Info;
}

export interface TwoLevelType {
  id: string;
  code: string;
  name: string;
  pic: string;
}


export interface GameHistoryModel {
  code: number;
  msg: string;
  data: GameHistoryData;
}

export interface GameHistoryData {
  list: GameHistorylistBean[]
  total: number
  totalBetAmount: string
  totalWinAmount: string
  totalValidBetAmount: string //有效投注金额
}

export interface GameHistorylistBean {
  lotteryNo: string
  id: string
  gameName: string
  gameTypeName: string
  issue: string
  displayNumber: string
  betTime: string
  date: string
  betAmount: string
  winAmount: string
  bet_details: BetDetailsBean
}

export interface BetDetailsBean {
  status: number;
  url: string;
}

export interface GameUrlModel {
  code: number;
  msg: string;
  data: string;
}
