export interface List {
  id: string
  mid: string
  type: string
  integral: string
  oldInt: string
  newInt: string
  addTime: string
}

export interface Data {
  list: List[]
  total: number
}

export interface TraceBack {
  loader: string
  initDi: string
  settings?: any
  fileCfg: string
  access: string
  dispatch?: any
}

export interface Info {
  sqlList: string[]
  sqlTotalNum: number
  sqlTotalTime: string
  traceBack: TraceBack
  runtime: string
}

export interface TaskCreditsLogModel {
  code: number
  msg: string
  data: Data
  info: Info
}
