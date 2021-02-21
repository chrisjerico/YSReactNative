import {
  PagePlayOddData, PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { CqsscCode, FC3d, HoChiMin, HoChiMinSub, LCode, LhcCode, Pk10Code } from '../../../const/LotteryConst'

interface ITMData {
  gameType?: string // 六合彩 秒秒彩
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析越南彩等数据
 * @param gameType
 * @param playOddData
 */
const parseHCMData = ({ gameType, playOddData }: ITMData): PlayOddData => {
  if (anyEmpty(playOddData?.playGroups)) return playOddData

  return {
    ...playOddData,
    pageData: {
      groupTri: playOddData?.playGroups[0]?.plays?.map((item) => {
        return createBalls(gameType, playOddData, playOddData?.playGroups[0], item)
      }),
    } as PagePlayOddData,
  }
}

/**
 * 创建数数据
 * @param gameType
 * @param playOddData
 * @param groupData
 * @param play0
 */
const createBalls = (gameType?: string, playOddData?: PlayOddData, groupData?: PlayGroupData, play0?: PlayData): Array<PlayGroupData> => {
  const play0Name = play0?.name
  let circleCount = 1 //循环次数，需要生成几组数据
  let titleArr = [play0Name] //标题
  let showOdds = play0?.odds //有的彩种不需要显示赔率
  let startIndex = 0 //起始编号，有的从 0 开始，有的从 1 开始

  const playCode = play0?.code
  const gameCode = playOddData?.code
  switch (true) {
    case gameCode == HoChiMin.TW: //头尾
      circleCount = 1
      titleArr = [`十`]
      break
    case gameCode == HoChiMin.LBXC: //来宾线程
    case playCode == HoChiMinSub.PIHAO2:  //批号2
    case playCode == HoChiMinSub.LOT2FIRST:  //Lot2第一个号码"
    case playCode == HoChiMinSub.DIDUAN2:  //地段2 1K
      circleCount = 2
      titleArr = [`十`, `个`]
      break
    case gameCode == HoChiMin.H_3GD: //3更多
    case playCode == HoChiMinSub.PIHAO3:  //批号3
      circleCount = 3
      titleArr = ['百', `十`, `个`]
      break
    case gameCode == HoChiMin.H_4GD: //4更多
    case playCode == HoChiMinSub.PIHAO4:  //批号4
      circleCount = 4
      titleArr = ['千', '百', `十`, `个`]
      break
  }

  let arrArr = new Array<PlayGroupData>()
  for (let i = 0; i < circleCount; i++) {
    let arr = new Array(
      10,
    ).fill(0).map((item, index) => {
      let ballIndex = (index + startIndex).toString()
      return ({
        id: `${titleArr[i]},${play0?.id},${ballIndex}`,
        name: ballIndex,
        alias: titleArr[i],
        odds: showOdds,
        enable: play0?.enable,
      } as PlayData)
    })
    arrArr.push({
      ...groupData,
      plays: [play0],
      exPlays: arr,
    })
  }

  return arrArr
}

export default parseHCMData
