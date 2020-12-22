export interface Debug {
  code: number
  file: string
  line: number
}

export interface TraceBack {
  access?: any
  dispatch?: any
  fileCfg: string
  initDi: string
  loader: string
  settings?: any
}

export interface Info {
  debug: Debug
  runtime: string
  sqlList: string[]
  traceBack: TraceBack
}

export interface UserChangeLoginPwdModel {
  code: number
  data?: any
  info: Info
  msg: string
}
