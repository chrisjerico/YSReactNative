export interface List {
  id: string;
  isSeal: string;
  isClose: string;
  enable: string;
  name: string;
  title: string;
  customise: string;
  isInstant: string;
  lowFreq: string;
  gameType: string;
  pic: string;
  openCycle: string;
  curIssue: any;
  curOpenTime: string;
  curCloseTime: string;
  displayNumber: any;
  serverTime: string;
  serverTimestamp: string;
}

export interface Data {
  gameType: string;
  gameTypeName: string;
  list: List[];
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

export interface LottoGamesModel {
  code: number;
  msg: string;
  data: Data[];
  info: Info;
}

