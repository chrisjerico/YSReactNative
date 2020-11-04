export interface GoldenEggListModel {
  code: number
  msg: string
  data?: Data[]
  info: any
}

export interface Param {
  buy: string
  buy_amount: number
  check_in_user_levels: string
  content_turntable: any[]
  golden_egg_times: number
  membergame: string
  prizeArr: any[]
}

export interface Data {
  end: string
  id: string
  integral: number
  param: Param
  start: string
  type: string
}
