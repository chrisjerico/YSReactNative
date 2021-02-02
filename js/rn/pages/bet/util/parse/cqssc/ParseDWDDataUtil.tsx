import {
  PagePlayOddData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { ILotteryEBallItem } from '../../../widget/LotteryEBall'
import { CqsscCode } from '../../../const/LotteryConst'

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
  let aliasArr = [play0?.name] //标题

  switch (playOddData?.code) {
    case CqsscCode.EZDW:
      circleCount = 2
      aliasArr = [`${play0?.name?.slice(0, 1)}定位`, `${play0?.name?.slice(1)}定位`]
      break
    case CqsscCode.SZDW:
      circleCount = 3
      if (play0?.name == '前三') {
        aliasArr = [`万定位`, `千定位`, `百定位`]
      } else if (play0?.name == '中三') {
        aliasArr = [`千定位`, `百定位`, `十定位`]
      } else if (play0?.name == '后三') {
        aliasArr = [`百定位`, `十定位`, `个定位`]
      }
      break
  }

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
      } as ILotteryEBallItem)
    })
    arrArr.push({...data, exPlays: arr})
  }

  return arrArr
}

export default parseDWDData
