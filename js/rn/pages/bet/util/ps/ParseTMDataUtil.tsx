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
const parseTMData = ({ playOddData, zodiacNum }: ITMData): PlayOddData => {
  //特码取前3个数据 特码 两面 色波
  if (arrayLength(playOddData?.playGroups) == 6) {
    return {
      ...playOddData,
      pageData: {
        zodiacNums: zodiacNum,
        groupTri: [
          [playOddData?.playGroups[3], playOddData?.playGroups[4], playOddData?.playGroups[5]],
          [playOddData?.playGroups[0], playOddData?.playGroups[1], playOddData?.playGroups[2]],
        ],
      } as PagePlayOddData,
    }
  }

  return playOddData

}

export default parseTMData
export { ITMData }
