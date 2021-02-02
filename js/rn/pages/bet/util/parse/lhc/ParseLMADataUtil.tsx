import {
  PagePlayOddData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import { ILotteryEBallItem } from '../../../widget/LotteryEBall'
import { ugLog } from '../../../../../public/tools/UgLog'

interface ITMData {
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析连码等数据
 * @param playOddData
 * @param zodiacNum
 */
const parseLMAData = ({ playOddData, zodiacNum }: ITMData): PlayOddData => {
  if (anyEmpty(playOddData?.playGroups)) return playOddData

  return {
    ...playOddData,
    pageData: {
      groupTri: playOddData?.playGroups?.map((item) => [{
        ...item,
        exPlays: createBalls(item),
      }]),
    } as PagePlayOddData,
  }
}

/**
 * 创建数数据
 * @param data
 */
const createBalls = (data?: PlayGroupData): Array<ILotteryEBallItem> => {
  let arr: Array<ILotteryEBallItem>

  const play0 = data?.plays[0]
  //多个赔率的生成47个球，否则49个球
  if (arrayLength(data?.plays) > 1) {
    arr = new Array(
      47,
    ).fill(0).map((item, index) => {
      let ballIndex = ('0' + (index + 1)).slice(-2)
      return ({
        id: `${play0?.id},${ballIndex}`,
        name: ballIndex,
        odds: `${play0?.odds}\n${data?.plays[1]?.odds}`,
      } as ILotteryEBallItem)
    })
  } else {
    arr = new Array(
      49,
    ).fill(0).map((item, index) => {
      let ballIndex = ('0' + index).slice(-2)
      return ({
        id: play0?.id + ballIndex,
        name: ballIndex,
        odds: play0?.odds,
      } as ILotteryEBallItem)
    })
  }

  return arr
}

export default parseLMAData
