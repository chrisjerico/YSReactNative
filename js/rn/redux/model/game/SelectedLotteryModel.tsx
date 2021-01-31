/**
 * 选中了哪些游戏ID
 */
import { PlayData, PlayGroupData, ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { PlayGroup } from '../../../public/network/Model/PlayOddDataModel'

interface SelectedLotteryModel {
  //选中了哪些数据，3层结构(code -> code -> value), 如 TM -> 特码B/特码A -> TM/LM/SB -> GroupData
  selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>

  inputMoney?: number //输入的游戏金额
  // allData?: Array<string>
  // typeCode?: string //当前的彩种，六合彩 还是 幸运飞艇 等等
}

/**
 * 选中的数据
 */
interface SelectedPlayModel {
  playGroups?: PlayGroupData, //球组数据如 特码B, 部分彩种需要使用
  plays?: Array<PlayData>, //彩球格子数据 01, 02, 03
  zodiacs?: Array<ZodiacNum>, //生肖的数据
}

export default SelectedLotteryModel
export {SelectedPlayModel}
