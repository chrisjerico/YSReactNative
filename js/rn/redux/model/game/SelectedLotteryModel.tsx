/**
 * 选中了哪些游戏ID
 */
import { PlayData, PlayGroupData } from '../../../public/network/Model/lottery/PlayOddDetailModel'

interface SelectedLotteryModel {
  selectedData?: Map<string, Array<PlayGroupData>> //群组ID 如 色波 -> 红波，蓝波
  inputMoney?: number //输入的游戏金额
  // allData?: Array<string>
  // typeCode?: string //当前的彩种，六合彩 还是 幸运飞艇 等等
}

export default SelectedLotteryModel
