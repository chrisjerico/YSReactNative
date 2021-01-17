/**
 * 选中了哪些游戏ID
 */
import { PlayData, PlayGroupData, ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'

interface LotteryListMode {
  data?: PlayGroupData | Array<PlayGroupData> | Array<PlayData> | Array<ZodiacNum> | Array<Array<PlayData>> // 根据实际情况来，一个 list 里面套了不同的类型
  code?: string //属于哪类，特码 两面 正码 等等
  type?: ItemType
}

/**
 * 每个栏目的种类
 */
enum ItemType {
  TAB = 'TAB', //3个及以内就是固定tab，比如特码B 特码A，否则就是滑动TAB，如正特1 2 3 4 5
  ZODIAC = 'ZODIAC', //横向滑动12生肖
  LABEL = 'LABEL', //普通标题栏
  BALLS = 'BALLS', //N个球一行
  LATTICE = 'LATTICE',  //N个格子一行
  TITLE_AND_BALL = 'TITLE_AND_BALL',  //标题和N个格子一行
}

export default LotteryListMode
export {ItemType}
