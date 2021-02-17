import {
  PagePlayOddData, PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { CqsscCode, Pk10Code } from '../../../const/LotteryConst'

interface ITMData {
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析X字定位等数据
 * @param playOddData
 * @param zodiacNum
 */
const parseYZDWData = ({ playOddData, zodiacNum }: ITMData): PlayOddData => {
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
  const play0Name = play0?.name
  let circleCount = 1 //循环次数，需要生成几组数据
  let titleArr = [play0Name] //标题
  let textHint //提醒文字
  let showOdds = play0?.odds //有的彩种不需要显示赔率

  switch (playOddData?.code) {
    case CqsscCode.EZDW:
      circleCount = 2
      titleArr = [`${play0Name?.slice(0, 1)}定位`, `${play0Name?.slice(1)}定位`]
      break
    case CqsscCode.SZDW:
      circleCount = 3
      if (play0Name == '前三') {
        titleArr = [`万定位`, `千定位`, `百定位`]
      } else if (play0Name == '中三') {
        titleArr = [`千定位`, `百定位`, `十定位`]
      } else if (play0Name == '后三') {
        titleArr = [`百定位`, `十定位`, `个定位`]
      }
      break
    case Pk10Code.GFWF:
      circleCount = 3
      if (play0Name == '猜前二' || play0Name == '猜前三') {
        circleCount = 2
        titleArr = [`单式`, `复式`]
      } else {
        titleArr = [play0Name]
        circleCount = 1
      }
      break
    case CqsscCode.WX://五行 或 五星
      showOdds = null
      if (play0Name == '复式') {
        circleCount = 5
        titleArr = [`第一球（万位）`, `第二球（千位）`, `第三球（百位）`, `第四球（十位）`, `第五球（个位）`]
        textHint = '玩法提示：从万千百十个各选一个号码组成一注'
      } else if (play0Name == '组选120') {
        circleCount = 1
        titleArr = ['选号']
        textHint = '玩法提示：从0~9中任选5个号码组成一注'
      } else if (play0Name == '组选60') {
        circleCount = 2
        titleArr = [`二重号`, `单号`]
        textHint = '玩法提示：选1个二重号，3个单号组成一注'
      } else if (play0Name == '组选30') {
        circleCount = 2
        titleArr = [`二重号`, `单号`]
        textHint = '玩法提示：选2个二重号，1个单号组成一注'
      } else if (play0Name == '组选20') {
        circleCount = 2
        titleArr = [`三重号`, `单号`]
        textHint = '玩法提示：选1个三重号，2个单号组成一注'
      } else if (play0Name == '组选10') {
        circleCount = 2
        titleArr = [`三重号`, `二重号`]
        textHint = '玩法提示：选1个三重号，1个二重号组成一注'
      } else if (play0Name == '组选5') {
        circleCount = 2
        titleArr = [`四重号`, `单号`]
        textHint = '玩法提示：选1个四重号，1个单号组成一注'
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
        id: `${titleArr[i]},${play0?.id},${ballIndex}`,
        name: ballIndex,
        alias: titleArr[i],
        odds: showOdds,
      } as PlayData)
    })
    arrArr.push({...data,
      exHint: textHint,
      exPlays: arr})
  }

  return arrArr
}

export default parseYZDWData
