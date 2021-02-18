import {
  PagePlayOddData, PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../../public/tools/Ext'

interface ITMData {
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析定位胆等数据
 * @param playOddData
 * @param zodiacNum
 */
const parseDWDData = ({ playOddData, zodiacNum }: ITMData): PlayOddData => {
  if (anyEmpty(playOddData?.playGroups)) return playOddData

  return {
    ...playOddData,
    pageData: {
      groupTri: playOddData?.playGroups?.map((item) => createBalls(playOddData, item)),
    } as PagePlayOddData,
  }
}

/**
 * 创建数数据
 * @param playOddData
 * @param data
 */
const createBalls = (playOddData?: PlayOddData, data?: PlayGroupData): Array<PlayGroupData> => {
  const play0 = data?.plays[0]
  let circleCount = 1 //循环次数
  let aliasArr = [`${play0?.name}定位: ${play0?.odds}`] //标题

  let arrArr = new Array<PlayGroupData>()
  for (let i = 0; i < circleCount; i++) {
    let arr = new Array(
      10,
    ).fill(0).map((item, index) => {
      let ballIndex = index.toString()
      return ({
        id: `${aliasArr[i]},${play0?.id},${ballIndex}`,
        name: ballIndex,
        alias: aliasArr[i],
        enable: play0?.enable
      } as PlayData)
    })
    arrArr.push({...data, exPlays: arr})
  }

  return arrArr
}

export default parseDWDData
