
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

export interface HomeRecommend {
  category: string;
  categoryName: string;
  games: Game[];
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
  data: HomeRecommend[];
  info: Info;
}
