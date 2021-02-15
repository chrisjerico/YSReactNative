
interface ScratchWinModel {
  amount: string,
  scratchId: string,
  add_time: string,
  prize_name: string,
  aid: string,
}

interface ScratchModel {
  gameID: string,
  start: string,
  end: string,
  type: string,
  param: object,
  showType: number,
  aviliableCount: number,
}

// 刮刮乐数据
export default interface ScratchDataModel {
  scratchWinList: ScratchWinModel[],
  scratchList: ScratchModel[],
}
