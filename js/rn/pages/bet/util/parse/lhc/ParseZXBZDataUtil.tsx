import {
  PagePlayOddData, PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { doubleDigit } from '../../../../../public/tools/StringUtil'

interface ITMData {
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析自选不中等数据
 * @param playOddData
 * @param zodiacNum
 */
const parseZXBZData = ({ playOddData, zodiacNum }: ITMData): PlayOddData => {
  if(anyEmpty(playOddData?.playGroups)) return playOddData

  return {
    ...playOddData,
    pageData: {
      groupTri: playOddData?.playGroups?.map((item) => [{
        ...item,
        exPlays: createBalls(item)
      }]),
    } as PagePlayOddData,
  }
}

/**
 * 创建数数据
 * @param data
 */
const createBalls = (data?: PlayGroupData): Array<PlayData> => {

  const play0 = data?.plays[0]
  return new Array(
    49,
  ).fill(0).map((item, index) => {
    let ballIndex = doubleDigit(index + 1)
    return (
      {
        id: play0?.id + ',' + ballIndex,
        name: ballIndex,
        enable: play0?.enable,
      } as PlayData
    )
  })
}

export default parseZXBZData
