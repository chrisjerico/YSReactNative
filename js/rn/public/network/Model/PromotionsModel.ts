export interface List {
  id: string;
  category: string;
  title: string;
  content: string;
  pic: string;
  linkCategory: number;
  linkPosition: number;
  linkUrl: string;
}

export interface Categories {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
}

export interface newCategory {
  id: number,
  name: string,
  sort: number,
}

export interface Data {
  list: List[];
  style: string;
  showCategory: boolean;
  categories: Categories;
  newCategories: newCategory[];
}

export interface TraceBack {
  loader: string;
  initDi: string;
  settings: string;
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

export interface PromotionsModel {
  code: number;
  msg: string;
  data: Data;
  info: Info;
}
