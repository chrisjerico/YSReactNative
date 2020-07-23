

export interface Data {
  balance: string;
  giftBalance: string;
  lastSettleTime: string;
  annualizedRate: string;
  yuebaoName: string;
  todayProfit: string;
  weekProfit: string;
  monthProfit: string;
  totalProfit: string;
  minTransferInMoney: string;
  maxTransferOutMoney: string;
  intro: string;
}

export interface TraceBack {
  loader: string;
  initDi: string;
  settings: string;
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

export interface YueBaoStatModel {
  code: number;
  msg: string;
  data: Data;
  info: Info;
}



