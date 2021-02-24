import {
  PagePlayOddData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'

interface ITMData {
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析正特数据
 * 特码取前3个数据 特码 两面 色波
 * @param playOddData
 * @param zodiacNum
 */
const parseZTData = ({ playOddData, zodiacNum }: ITMData): PlayOddData => {
  let newData = new Array<Array<PlayGroupData>>()
  playOddData?.playGroups?.map((item, index) => {
    if (index % 2 == 0) {
      const page2Index = index + 1
      if (page2Index < arrayLength(playOddData?.playGroups)) {//有的一页有2组数据
        newData.push([
          playOddData?.playGroups[index],
          playOddData?.playGroups[index + 1],
        ])

      } else {
        newData.push([
          playOddData?.playGroups[index],
        ])

      }
    }
  })

  return {
    ...playOddData,
    pageData: {
      groupTri: newData,
    } as PagePlayOddData,
  }

  return playOddData
}

export default parseZTData
