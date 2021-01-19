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

/**
 * 根据名字或别名找出生肖
 * @param num
 * @param item
 */
const findZodiacByName = (num?: ZodiacNum[], item?: INameOrAlias): ZodiacNum =>
  num?.find((zodiac) => ((!anyEmpty(item?.name) && zodiac?.name == item?.name)
    || (!anyEmpty(item?.alias) && zodiac?.alias == item?.alias)))

interface INameOrAlias {
  name?: string; //鼠
  alias?: string;//鼠
}

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
  return playOddDetailData?.playOdds?.map((playOddData) => {
    switch (playOddData?.code) {
      case LotteryConst.TM:  //特码
        //特码取前3个数据 特码 两面 色波
        if (!anyEmpty(playOddData?.playGroups)) {
          return {
            ...playOddData,
            pageData: {
              zodiacNums: playOddDetailData?.setting?.zodiacNums,
              groupTri: [
                [playOddData?.playGroups[3], playOddData?.playGroups[4], playOddData?.playGroups[5]],
                [playOddData?.playGroups[0], playOddData?.playGroups[1], playOddData?.playGroups[2]],
              ],
            } as PagePlayOddData,
          }
        }
        break

      case LotteryConst.ZM: //正码
      case LotteryConst.ZT:  //正特
        if (arrayLength(playOddData?.playGroups) % 2 == 0) {//长度是偶数
          let newData = new Array<Array<PlayGroupData>>()
          playOddData?.playGroups?.map((item, index) => {
            if (index % 2 == 0) {
              newData.push([
                playOddData?.playGroups[index],
                playOddData?.playGroups[index + 1],
              ])
            }
          })

          return {
            ...playOddData,
            pageData: {
              groupTri: newData,
            } as PagePlayOddData,
          }
        }
        break

      case LotteryConst.LMA:  //连码
      case LotteryConst.ZXBZ:  //自选不中
        return {
          ...playOddData,
          pageData: {
            groupTri: !anyEmpty(playOddData?.playGroups) ?
              playOddData?.playGroups?.map((item) => [item]) :
              [],
          } as PagePlayOddData,
        }

      case LotteryConst.LM: //两面
      case LotteryConst.ZM1_6: //正码1T6
      case LotteryConst.SB: //色波
      case LotteryConst.ZOX://总肖
      case LotteryConst.HX://合肖
      case LotteryConst.WX:  //五行
        return {
          ...playOddData,
          pageData: {
            groupTri: !anyEmpty(playOddData?.playGroups) ?
              [playOddData?.playGroups] :
              [],
          } as PagePlayOddData,
        }

      case LotteryConst.YX: //平特一肖
      case LotteryConst.WS: //平特尾数
      case LotteryConst.TWS: //头尾数
      case LotteryConst.TX: //特肖
      case LotteryConst.LX: //连肖
      case LotteryConst.LW: //连尾
      case LotteryConst.ZX: { //正肖
        //平特一肖 和 平特尾数 只有1个数组，头尾数有2个
        if (!anyEmpty(playOddData?.playGroups)) {
          switch (playOddData?.code) {
            case LotteryConst.YX: //平特一肖
            case LotteryConst.TX: //特肖
            case LotteryConst.ZX: //正肖
              const zxGroup = combinePlayAndZodiac({
                zodiacNums: playOddDetailData.setting.zodiacNums,
                playOddData: playOddData,
              })

              return {
                ...playOddData,
                pageData: {
                  groupTri: [[null, ...zxGroup]],
                } as PagePlayOddData,
              }

            case LotteryConst.WS://平特尾数
              const wsGroup = combinePlayAndZodiac({
                zodiacNums: playOddDetailData.setting.zodiacNums,
                playOddData: playOddData,
              })
              return {
                ...playOddData,
                pageData: {
                  groupTri: [[null, ...wsGroup]],
                } as PagePlayOddData,
              }

            case LotteryConst.TWS://头尾数
              const twsGroup = combinePlayAndZodiac({
                zodiacNums: playOddDetailData.setting.zodiacNums,
                playOddData: playOddData,
              })
              return {
                ...playOddData,
                pageData: {
                  groupTri: [twsGroup],
                } as PagePlayOddData,
              }

            case LotteryConst.LX: //连肖
              const lxGroup = combinePlayAndZodiac({
                zodiacNums: playOddDetailData.setting.zodiacNums,
                playOddData: playOddData,
              })
              return {
                ...playOddData,
                pageData: {
                  groupTri: [[null, ...lxGroup]],
                } as PagePlayOddData,
              }

            case LotteryConst.LW: //连尾
              //连尾数据缺少一个 尾，补上
              const newGroup = playOddData?.playGroups?.map((item) => ({
                ...item,
                plays: item?.plays?.map((item) => ({
                    ...item,
                    alias: item?.alias + '尾',
                  }
                )),
              }))
              const lwGroup = combinePlayAndZodiac({
                zodiacNums: playOddDetailData.setting.zodiacNums,
                playOddData: { ...playOddData, playGroups: newGroup },
              })
              return {
                ...playOddData,
                pageData: {
                  groupTri: [[null, ...lwGroup]],
                } as PagePlayOddData,
              }
          }
        }
        break

      }
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
        exZodiac: newZodiac?.find((zodiac) => zodiac?.name == playData?.name),
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
      return groupData?.plays.map((item) =>
        zodiacNums?.find((zodiac) =>
          zodiac?.name == item?.name))
    case LotteryConst.LX: //连肖
      return groupData?.plays.map((item) => {
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
          key: item?.id,
          name: item?.name,
          nums: LotteryData.WS[index],
        }
      })
    case LotteryConst.TWS://头尾数
      return groupData?.plays.map((item, index) => {
        return {
          key: item?.id,
          name: item?.name,
          nums: LotteryData.WS[index],
        }
      })
    case LotteryConst.LW://连尾
      return groupData?.plays.map((item, index) => {
        return {
          key: item?.id,
          alias: item?.alias,
          nums: LotteryData.WS[index],
        }
      })
  }

  return null

}

export { findZodiacByName, parseLotteryDetailData }
