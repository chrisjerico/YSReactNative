/**
 * 活动彩金数据
 */

export interface ActivityJackpotModel {
  code?: number
  msg?: string
  data?: ActivityJackpotData
}

export interface ActivityJackpotData {
  list?: ActivityJackpotList[]
  total?: number //当前总共有多少条数据
}

export interface ActivityJackpotList {
  adminComment?: string
  amount?: string
  state?: string
  updateTime?: string
  userComment?: string
  winId?: string
  winName?: string

  id?: string
  enable?: string
  type?: string
  name?: string
  start?: string
  end?: string
  show_time?: string
  category?: string //彩金分类
  categoryName?: string //彩金分类名字
  param?: ActivityParam
  max_amount?: string
  used_amount?: string
  max_member?: string
  used_member?: string
  times_limit?: string
  winSort?: string
}

export interface ActivityParam {
  quickAmount1?: string
  quickAmount2?: string
  quickAmount3?: string
  quickAmount4?: string
  quickAmount5?: string
  quickAmount6?: string
  quickAmount7?: string
  quickAmount8?: string
  quickAmount9?: string
  quickAmount10?: string
  quickAmount11?: string
  quickAmount12?: string
  joinType?: string
  joinCount?: number
  min_reg_coin?: string
  max_reg_coin?: string
  win_apply_image?: string
  win_apply_content?: string
  timeInterval?: string
  minWinAmount?: string
  maxWinAmount?: string
  winSort?: string
  showWinAmount?: string
  min_recharge?: string
  min_recharge_day?: string
  min_recharge_act?: string
  recharge_banks?: string
  levels?: string
  min_coin?: string
  max_coin?: string
  virtual_amount?: string
  virtual_count?: string
  intro?: string
  rechargeMore?: string
  recharge_coin_levels?: string
}
