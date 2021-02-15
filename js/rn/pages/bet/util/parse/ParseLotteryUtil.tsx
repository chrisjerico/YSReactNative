import LotteryData from '../../const/LotteryData'

import {
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'
import { CqsscCode, LCode, LhcCode } from '../../const/LotteryConst'
import parseTMData from './lhc/ParseTMDataUtil'
import parseHXData from './lhc/ParseHXDataUtil'
import parseZTData from './lhc/ParseZTDataUtil'
import parseLMAData from './lhc/ParseLMADataUtil'
import parseSBData from './lhc/ParseSBDataUtil'
import parsePTYXData from './lhc/ParsePTYXDataUtil'
import parseLXData from './lhc/ParseLXDataUtil'
import parseLWData from './lhc/ParseLWDataUtil'
import parseZXBZData from './lhc/ParseZXBZDataUtil'
import parseYZDWData from './cqssc/ParseYZDWDataUtil'
import parseDWDData from './cqssc/ParseDWDDataUtil'

interface IPageZodiac {
  zodiacNums?: ZodiacNum[] //彩票数据
  playOddData?: PlayOddData //当前彩票
  groupData?: PlayGroupData //群组数据
}

/**
 *
 *
 * 解析下注数据，每个界面有 3层数据，
 *
 * [ tab1, tab2, tab3 ...
 *  [ 圆形，方格
 *    具有数据
 *  ]
 * ]
 */
const parseLotteryDetailData = (playOddDetailData?: PlayOddDetailData): PlayOddData[] => {
  //给生肖生成id
  const zodiacNum = playOddDetailData?.setting?.zodiacNums?.map((item, index) => ({
    ...item,
    id: index.toString(),
  }))

  return playOddDetailData?.playOdds?.map((playOddData) => {
    if (anyEmpty(playOddData?.playGroups)) return playOddData

    const gameType = playOddDetailData?.lotteryLimit?.gameType //彩种类别，六合彩 秒秒彩
    const gameCode = playOddData?.code //彩种ID，特码 两面 等等

    //注意有些彩种的 CODE 完全一样
    switch (gameCode) {
      case LhcCode.TM:  //特码
        return parseTMData({ playOddData, zodiacNum })

      case LhcCode.HX://合肖
        return parseHXData({ playOddData, zodiacNum })

      case LhcCode.ZM: //正码
      case LhcCode.ZT:  //正特
        return parseZTData({ playOddData, zodiacNum })

      case LhcCode.LMA:  //连码
        return parseLMAData({ playOddData, zodiacNum })

      case LhcCode.LM: //两面
      case LhcCode.ZM1_6: //正码1T6
      case LhcCode.SB: //色波
      case LhcCode.ZOX://总肖
      case CqsscCode.ALL:  //1-5球
      case CqsscCode.Q1:  //第1球
      case CqsscCode.Q2:  //第2球
      case CqsscCode.Q3:  //第3球
      case CqsscCode.Q4:  //第4球
      case CqsscCode.Q5:  //第5球
      case CqsscCode.QZH:  //前中后
      case CqsscCode.DN:  //斗牛
      case CqsscCode.SH:  //梭哈
      case CqsscCode.LHD:  //龙虎斗
        return parseSBData({ playOddData, zodiacNum })

      case CqsscCode.YZDW:  //一字定位
      case CqsscCode.EZDW:  //二字定位
      case CqsscCode.SZDW:  //三字定位
      case CqsscCode.BDW:  //不定位
        return parseYZDWData({ playOddData, zodiacNum })

      case LhcCode.WX:
        if (gameType == LCode.lhc) { //五行
          return parseSBData({ playOddData, zodiacNum })
        } else if (gameType == LCode.cqssc) { //五星
          return parseYZDWData({ playOddData, zodiacNum })
        }
        break

      case CqsscCode.DWD:  //定位胆
        return parseDWDData({ playOddData, zodiacNum })

      case LhcCode.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TX: //特肖
      case LhcCode.ZX: //正肖
      case LhcCode.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
        return parsePTYXData({ playOddData, zodiacNum })

      case LhcCode.LX: //连肖
        return parseLXData({ playOddData, zodiacNum })

      case LhcCode.LW: //连尾
        return parseLWData({ playOddData, zodiacNum })

      case LhcCode.ZXBZ:  //自选不中
        return parseZXBZData({ playOddData, zodiacNum })
    }

    return playOddData
  })

}

/**
 * 组合玩法每一页的数据和生肖数据，比如 平特一肖 等，需要根据PlayData找到对应的生肖数据
 *
 * @param zodiacNums 生肖数据
 * @param playOddData  玩法数据
 */
const combinePlayAndZodiac = ({ zodiacNums, playOddData }: IPageZodiac): PlayGroupData[] => {
  return playOddData?.playGroups?.map((groupData) => {
    const newZodiac = parsePageZodiac({
      zodiacNums: zodiacNums,
      playOddData: playOddData,
      groupData: groupData,
    })

    const newGroup: PlayGroupData = {
      ...groupData,
      plays: groupData?.plays?.map((playData) => ({
        ...playData,
        exZodiac: newZodiac?.find((zodiac) =>
          zodiac?.name == playData?.name || zodiac?.name == playData?.alias || zodiac?.alias == playData?.alias),
      })),
    }

    return newGroup
  })
}

/**
 * 解析界面的生肖数据
 * 取出生肖数据，生成对应的数据，根据给出的数据的顺序，重新排列生肖的顺序
 * @param playOddDetailData
 * @param playOddData
 * @param groupData
 */
const parsePageZodiac = ({ zodiacNums, playOddData, groupData }: IPageZodiac): ZodiacNum[] => {
  switch (playOddData?.code) {
    case LhcCode.YX: //平特一肖
    case LhcCode.TX: //特肖
    case LhcCode.ZX: //正肖
      return groupData?.plays.map((item, index) =>
        zodiacNums?.find((zodiac) =>
          zodiac?.name == item?.name))
    case LhcCode.LX: //连肖
      return groupData?.plays.map((item, index) => {
        let zodiacNum = zodiacNums?.find((zodiac) =>
          zodiac?.name == item?.alias)
        return {
          ...zodiacNum,
          alias: item?.alias,
        }
      })
    case LhcCode.WS://平特尾数
      return groupData?.plays.map((item, index) => {
        return {
          id: item?.id,
          key: item?.id,
          name: item?.name,
          nums: LotteryData.WS[index],
        } as ZodiacNum
      })
    case LhcCode.TWS://头尾数
      return groupData?.plays.map((item, index) => {
        return {
          id: item?.id,
          key: item?.id,
          name: item?.name,
          nums: LotteryData.WS[index],
        } as ZodiacNum
      })
    case LhcCode.LW://连尾
      return groupData?.plays.map((item, index) => {
        return {
          id: item?.id,
          key: item?.id,
          alias: item?.alias,
          nums: LotteryData.WS[index],
        } as ZodiacNum
      })
  }

  return zodiacNums

}

export {
  parseLotteryDetailData,
  combinePlayAndZodiac,
}


