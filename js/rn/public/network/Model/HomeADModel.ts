
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

export interface Data {
  image: string;
  linkCategory: string;
  linkPosition: string;
  lotteryGameType: string;
  realIsPopup: number;
  realSupportTrial: number;
}

export interface HomeADModel {
  code: number;
  msg: string;
  data?: Data[];
  info: Info;
}

