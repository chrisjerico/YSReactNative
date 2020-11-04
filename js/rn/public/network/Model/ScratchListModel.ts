export interface ScratchListModel {
  code: number
  msg: string
  data?: Data
  info: any
}

export interface Data {
  scratchList: ScratchList[]
  scratchWinList: any[]
}

export interface ScratchList {
  end: string
  id: string
  param: Param
  showType: number
  start: string
  type: string
}

export interface ScratchPrizeArr {
  recharge_coin_levels: string
  scratchCondition: string
  scratchDmlWithRech: string
  scratchGive1: string
  scratchGive2: string
  scratchPrizeId: number
  scratchPrizeName: string
  scratchTimes: string
  sendTimes: string
}

export interface Param {
  activity_show: number
  check_in_user_levels: string
  content_scratch: string
  content_turntable: any[]
  prizeAmountRealShow: string
  prizeAmountVirtuaShow1: string
  prizeAmountVirtuaShow2: string
  prizeShow: string
  prizeShowReal: string
  prizeShowVirtua: string
  recharge_banks: string
  recharge_coin_levels: string
  scratchPrizeArr: ScratchPrizeArr[]
  scrath_model: string
  scrath_send_type: string
  time_between_end: string
  time_between_start: string
}
