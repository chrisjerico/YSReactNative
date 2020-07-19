

export interface TraceBack {
  access: string;
  dispatch?: any;
  fileCfg: string;
  initDi: string;
  loader: string;
  settings?: any;
}

export interface Info {
  runtime: string;
  sqlList: string[];
  sqlTotalNum: number;
  sqlTotalTime: string;
  traceBack: TraceBack;
}

export interface TaskChangeAvatarModel {
  code: number;
  data?: any;
  info: Info;
  msg: string;
}