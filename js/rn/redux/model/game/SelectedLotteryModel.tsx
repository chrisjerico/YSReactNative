
import { PlayData, PlayGroupData, ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { PlayGroup } from '../../../public/network/Model/PlayOddDataModel'

/**
 * 选中的数据
 */
interface SelectedPlayModel {
  code?: string //大类ID，如 特码 两面
  limitCount?: number, //有的彩种需要组合的数量限制，如 3连尾 要求至少选择3个数据
  playGroups?: PlayGroupData, //球组数据如 特码B, 部分彩种需要使用
  plays?: Array<PlayData>, //彩球格子数据 01, 02, 03
  zodiacs?: Array<ZodiacNum>, //生肖的数据
}

export default SelectedLotteryModel
export {SelectedPlayModel}
