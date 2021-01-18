
/**
 * 选中了哪些游戏ID
 */
interface SelectedLotteryModel {
  selectedData: Map<string, SelectedLotterySubData> //群组ID 如 特码 -> 具体的数据
  // allData?: Array<string>
  // typeCode?: string //当前的彩种，六合彩 还是 幸运飞艇 等等
}

/**
 * 选中了哪些游戏ID
 */
interface SelectedLotterySubData {
  groupId: string //群组ID 如 特码
  subGroupId: string//次级ID 如 特码B
  lotteryId: string //彩票id 如 5号球
  lotteryCode: string //彩票code 备用
}

export default SelectedLotteryModel
export {SelectedLotterySubData}
