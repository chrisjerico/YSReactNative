import { PagePlayOddData, PlayOddData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'

interface ITMData {
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析特码数据
 * 特码取前3个数据 特码 两面 色波
 * @param playOddData
 * @param zodiacNum
 */
const parseHXData = ({ playOddData, zodiacNum }: ITMData): PlayOddData => {
  if(anyEmpty(playOddData?.playGroups)) return playOddData

  return {
    ...playOddData,
    pageData: {
      zodiacNums: zodiacNum,
      groupTri: [playOddData?.playGroups],
    } as PagePlayOddData,
  }

}

export default parseHXData
