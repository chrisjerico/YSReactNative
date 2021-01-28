import {
  PagePlayOddData, PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
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
    const newGroup = playOddData?.playGroups?.map((group) => ({
      ...group,
      plays: group?.plays?.map((play) => ({
        ...play,
        exId: `${playOddData.code}+${group.alias}+${play.id}` //使用分类ID和PlayID生成唯一识别的ID
      } as PlayData))
    } as PlayGroupData))

    return {
      ...playOddData,
      pageData: {
        zodiacNums: zodiacNum,
        groupTri: [
          [newGroup[3], newGroup[4], newGroup[5]], //特码B
          [newGroup[0], newGroup[1], newGroup[2]], //特码A
        ],
      } as PagePlayOddData,
    }
  }

  return playOddData

}

export default parseTMData
export { ITMData }
