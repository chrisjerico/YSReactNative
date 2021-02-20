import {
  PagePlayOddData, PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../../public/tools/Ext'
import { CqsscCode, FC3d, LCode, LhcCode, Pk10Code } from '../../../const/LotteryConst'

interface ITMData {
  gameType?: string // 六合彩 秒秒彩
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析X字定位等数据
 * @param playOddData
 * @param zodiacNum
 */
const parseYZDWData = ({ gameType, playOddData, zodiacNum }: ITMData): PlayOddData => {
  if (anyEmpty(playOddData?.playGroups)) return playOddData

  return {
    ...playOddData,
    pageData: {
      groupTri: playOddData?.playGroups?.map((item) => createBalls(gameType, playOddData, item)),
    } as PagePlayOddData,
  }
}

/**
 * 创建数数据
 * @param gameType
 * @param playOddData
 * @param data
 */
const createBalls = (gameType?: string, playOddData?: PlayOddData, data?: PlayGroupData): Array<PlayGroupData> => {
  const play0 = data?.plays[0]
  const play0Name = play0?.name
  let circleCount = 1 //循环次数，需要生成几组数据
  let titleArr = [play0Name] //标题
  let textHint //提醒文字
  let showOdds = play0?.odds //有的彩种不需要显示赔率
  let startIndex = 0 //起始编号，有的从 0 开始，有的从 1 开始

  const gameCode = playOddData?.code
  switch (true) {
    case gameCode == LhcCode.ZX && gameType == LCode.gd11x5:  //广东11x5直选
      startIndex = 1
      if (play0Name == '前二直选') {
        circleCount = 2
        titleArr = [`第一球`, `第二球`]
      } else if (play0Name == '前三直选') {
        circleCount = 3
        titleArr = [`第一球`, `第二球`, `第三球`]
      }
      break
    case gameCode == CqsscCode.EZDW: //二字定位
      circleCount = 2
      titleArr = [`${play0Name?.slice(0, 1)}定位`, `${play0Name?.slice(1)}定位`]
      break
    case gameCode == CqsscCode.SZDW: //三字定位
      circleCount = 3
      if (play0Name == '前三') {
        titleArr = [`万定位`, `千定位`, `百定位`]
      } else if (play0Name == '中三') {
        titleArr = [`千定位`, `百定位`, `十定位`]
      } else if (play0Name == '后三') {
        titleArr = [`百定位`, `十定位`, `个定位`]
      }
      break
    case gameType == LCode.fc3d:
      if (gameCode == FC3d.DWD) { //定位胆
        if (play0Name == '复式') {
          circleCount = 3
          titleArr = [`第一球（百位）`, `第二球（十位）`, `第三球（个位）`]
        } else if (play0Name == '组选3') {
          circleCount = 2
          titleArr = [`二重号`, `单号`]
          textHint = '玩法提示：选一个二重号，一个单号组成一注。(单号号码不得与二重号重复)'
        } else {
          if (play0Name == '组选3复式') {
            textHint = '玩法提示：从0~9选择两个号码(或以上)，系统会自动将所选号码的所有组三组合(即三个号中有两个号相同)进行购买，若当期开奖号码的形态为组三且包含了号码，即中奖'
          } else if (play0Name == '组选6') {
            textHint = '玩法提示:任选3个号码组成一注(号码不重复)'
          } else if (play0Name == '组选6复式') {
            textHint = '玩法提示：从0~9选择三个号码或多个号码投注，所选号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖'
          }
          circleCount = 1
          titleArr = [`选号`]
        }

      } else if (gameCode == FC3d.EZ) { //二字
        circleCount = 2
        const nameArr = play0Name?.split('')
        titleArr = [`第一球（${nameArr[0]}位）`, `第二球（${nameArr[1]}位）`]
      }
      break
    case gameCode == Pk10Code.GFWF: //官方玩法
      startIndex = 1
      if (play0Name == '猜前二') {
        circleCount = 3
        titleArr = [`单式`, `冠军`, `亚军`]
      } else if (play0Name == '猜前三') {
        circleCount = 4
        titleArr = [`单式`, `冠军`, `亚军`, `季军`]
      } else {
        titleArr = [play0Name]
        circleCount = 1
      }
      break
    case gameCode == CqsscCode.WX://五行 或 五星
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
      let ballIndex = (index + startIndex).toString()
      return ({
        id: `${titleArr[i]},${play0?.id},${ballIndex}`,
        name: ballIndex,
        alias: titleArr[i],
        odds: showOdds,
        enable: play0?.enable
      } as PlayData)
    })
    arrArr.push({...data,
      exHint: textHint,
      exPlays: arr})
  }

  return arrArr
}

export default parseYZDWData
