import { anyEmpty, arrayLength } from '../../../public/tools/Ext'
import {
  PagePlayOddData,
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryConst from '../const/LotteryConst'
import LhcHXComponent from '../lhc/hx/LhcHXComponent'
import LhcZXBZComponent from '../lhc/zxbz/LhcZXBZComponent'
import * as React from 'react'
import LotteryData from '../const/LotteryData'
import { ugLog } from '../../../public/tools/UgLog'
import parseTMData from './ps/ParseTMDataUtil'
import parseHXData from './ps/ParseHXDataUtil'
import parseZTData from './ps/ParseZTDataUtil'
import parseLMAData from './ps/ParseLMADataUtil'
import parseSBData from './ps/ParseSBDataUtil'
import parsePTYXData from './ps/ParsePTYXDataUtil'
import parseWSData from './ps/ParseWSDataUtil'
import parseLXData from './ps/ParseLXDataUtil'
import parseLWData from './ps/ParseLWDataUtil'
import parseZXBZData from './ps/ParseZXBZDataUtil'

interface INameOrAlias {
  name?: string; //鼠
  alias?: string;//鼠
}

/**
 * 根据名字或别名找出生肖
 * @param num
 * @param item
 */
const findZodiacByName = (num?: ZodiacNum[], item?: INameOrAlias): ZodiacNum =>
  num?.find((zodiac) => ((!anyEmpty(item?.name) && zodiac?.name == item?.name)
    || (!anyEmpty(item?.alias) && zodiac?.alias == item?.alias)))

/**
 * 解析下注数据，避免绘制UI的时候再刷新数据，每个界面有 3层数据，
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

    switch (playOddData?.code) {
      case LotteryConst.TM:  //特码
        return parseTMData({ playOddData, zodiacNum })

      case LotteryConst.HX://合肖
        return parseHXData({ playOddData, zodiacNum })

      case LotteryConst.ZM: //正码
      case LotteryConst.ZT:  //正特
        return parseZTData({ playOddData, zodiacNum })

      case LotteryConst.LMA:  //连码
        return parseLMAData({ playOddData, zodiacNum })

      case LotteryConst.LM: //两面
      case LotteryConst.ZM1_6: //正码1T6
      case LotteryConst.SB: //色波
      case LotteryConst.ZOX://总肖
      case LotteryConst.WX:  //五行
        return parseSBData({ playOddData, zodiacNum })

      case LotteryConst.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LotteryConst.TX: //特肖
      case LotteryConst.ZX: //正肖
      case LotteryConst.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LotteryConst.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
        return parsePTYXData({ playOddData, zodiacNum })

      case LotteryConst.LX: //连肖
        return parseLXData({ playOddData, zodiacNum })

      case LotteryConst.LW: //连尾
        return parseLWData({ playOddData, zodiacNum })

      case LotteryConst.ZXBZ:  //自选不中
        return parseZXBZData({ playOddData, zodiacNum })
    }

    return playOddData
  })

}

interface IPageZodiac {
  zodiacNums?: ZodiacNum[] //彩票数据
  playOddData?: PlayOddData //当前彩票
  groupData?: PlayGroupData //群组数据
}

/**
 * 组合玩法每一页的数据和生肖数据
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
    case LotteryConst.YX: //平特一肖
    case LotteryConst.TX: //特肖
    case LotteryConst.ZX: //正肖
      return groupData?.plays.map((item, index) =>
        zodiacNums?.find((zodiac) =>
          zodiac?.name == item?.name))
    case LotteryConst.LX: //连肖
      return groupData?.plays.map((item, index) => {
        let zodiacNum = zodiacNums?.find((zodiac) =>
          zodiac?.name == item?.alias)
        return {
          ...zodiacNum,
          alias: item?.alias,
        }
      })
    case LotteryConst.WS://平特尾数
      return groupData?.plays.map((item, index) => {
        return {
          id: item?.id,
          key: item?.id,
          name: item?.name,
          nums: LotteryData.WS[index],
        } as ZodiacNum
      })
    case LotteryConst.TWS://头尾数
      return groupData?.plays.map((item, index) => {
        return {
          id: item?.id,
          key: item?.id,
          name: item?.name,
          nums: LotteryData.WS[index],
        } as ZodiacNum
      })
    case LotteryConst.LW://连尾
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
  findZodiacByName,
  parseLotteryDetailData,
  combinePlayAndZodiac,
}
