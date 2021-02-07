import { IBetLotteryParams } from '../../../it/bet/IBetLotteryParams'

/**
 * 彩票下注结果
 */
export interface LotteryResultModel {
  code?: number
  msg?: string
  data?: LotteryResultData
}

export interface LotteryResultData {
  openNum?: string //09,49,02,40,05,42,07 //结果
  bonus?: string // 0.0000" 金额
  gameType?: string // 六合彩系列" lhc
  color?: string // blue,green,red,red,green,blue,red
  sx?: string // 龙,鼠,猪,鸡,猴,羊,马
  result?: string // 龙,鼠,猪,鸡,猴,羊,马

  betParams?: IBetLotteryParams//下注的参数
}
