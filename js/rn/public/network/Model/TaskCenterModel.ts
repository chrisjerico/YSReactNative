export interface List {
  algorithmData: any[]
  chat_room_ids: string
  dml: string
  id: string
  integral: string
  ip_limit: string
  is_auto_apply: string
  is_auto_settle: string
  jump_type_id: string
  missionDesc: string
  missionName: string
  missionType: string
  mission_level_id: string
  overTime: string
  rechargeAmount: string
  redbagType: string
  sortId: string
  sortName: string
  sortName2: string
  status: string
  type: string
}

export interface Data {
  list: List[]
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

export interface TaskCenterModel {
  code: number
  msg: string
  data: Data
  info: Info
}
