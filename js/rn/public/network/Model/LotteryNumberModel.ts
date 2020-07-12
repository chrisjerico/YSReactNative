export interface LotteryNumberModel {
  code: number
  data: Data
}

export interface Data {
  auto: boolean
  endtime: string
  gameId: number
  isFinish: number
  issue: string
  lhcdocLotteryNo: string
  lotteryStr: string
  lotteryTime: string
  numColor: string
  numSx: string
  numbers: string
  serverTime: string
}