import {
  PagePlayOddData, PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import { doubleDigit } from '../../../../../public/tools/StringUtil'
import { LCode } from '../../../const/LotteryConst'

interface ITMData {
  gameType?: string // 六合彩 秒秒彩
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析连码等数据
 * @param gameType 六合彩 秒秒彩
 * @param playOddData 当前彩种数据
 * @param zodiacNum 生肖
 */
const parseLMAData = ({ gameType, playOddData, zodiacNum }: ITMData): PlayOddData => {
  if (anyEmpty(playOddData?.playGroups)) return playOddData

  return {
    ...playOddData,
    pageData: {
      groupTri: playOddData?.playGroups?.map((item) => [{
        ...item,
        exPlays: createBalls(gameType, item),
      }]),
    } as PagePlayOddData,
  }
}

/**
 * 创建数数据
 * @param gameType
 * @param data
 */
const createBalls = (gameType?: string, data?: PlayGroupData): Array<PlayData> => {
  let arr: Array<PlayData>
  let ballCount = 11
  switch (gameType) {
    case LCode.lhc:
      //多个赔率的生成47个球，否则49个球
      ballCount = arrayLength(data?.plays) > 1 ? 47 : 49
      break
  }
  const play0 = data?.plays[0]

  arr = new Array(ballCount).fill(0).map((item, index) => {
    let ballIndex = doubleDigit(index + 1)
    return ({
      id: play0?.id + ballIndex,
      name: ballIndex,
      odds: play0?.odds,
      enable: play0?.enable,
    } as PlayData)
  })

  return arr
}

export default parseLMAData
