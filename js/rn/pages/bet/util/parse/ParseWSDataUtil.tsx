import {
  PagePlayOddData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import { combinePlayAndZodiac } from './ParseLotteryUtil'

interface ITMData {
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析尾数等数据
 * 特码取前3个数据 特码 两面 色波
 * @param playOddData
 * @param zodiacNum
 */
const parseWSData = ({ playOddData, zodiacNum }: ITMData): PlayOddData => {
  if(anyEmpty(playOddData?.playGroups)) return playOddData

  const wsGroup = combinePlayAndZodiac({
    zodiacNums: zodiacNum,
    playOddData: playOddData,
  })

  return {
    ...playOddData,
    pageData: {
      groupTri: [wsGroup],
    } as PagePlayOddData,
  }
}

export default parseWSData
