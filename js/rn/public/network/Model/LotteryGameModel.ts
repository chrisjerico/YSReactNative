export interface LotteryGameModel {
  code: number;
  data: Data[];
  info: Info;
  msg: string;
}

export interface Info {
  runtime: string;
  sqlList: string[];
  sqlTotalNum: number;
  sqlTotalTime: string;
  traceBack: TraceBack;
}

export interface TraceBack {
  access: string;
  dispatch?: any;
  initDi: string;
  loader: string;
  settings?: any;
}

export interface Data {
  gameType: string;
  gameTypeName: string;
  list: Game[];
}

export interface Game {
  curCloseTime: string;
  curIssue: string;
  curOpenTime: string;
  customise: string;
  displayNumber: string;
  enable: string;
  gameType: string;
  id: string;
  isClose: string;
  isInstant: string;
  isSeal: string;
  lowFreq: string;
  name: string;
  openCycle: string;
  pic: string;
  serverTime: string;
  serverTimestamp: string;
  title: string;
}