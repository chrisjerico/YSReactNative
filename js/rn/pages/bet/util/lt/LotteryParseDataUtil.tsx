import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryConst from '../../const/LotteryConst'
import { useState } from 'react'
import LotteryListMode, { ItemType } from '../../../../redux/model/game/LotteryListModel'
import { arrayLength } from '../../../../public/tools/Ext'
import { ugLog } from '../../../../public/tools/UgLog'

/**
 * 解析六合彩 特码数据
 */
const parseTMData = (data?: PlayOddData, zodiacNums?: ZodiacNum[]): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []
  if (arrayLength(data?.playGroups) == 6) {
    //特码B A
    const tabs: LotteryListMode = {
      type: ItemType.TAB,
      code: data?.code,
      data: [data?.playGroups[0], data?.playGroups[3]],
    }
    tmArray.push(tabs)

    //12生肖
    const zodiacList: LotteryListMode = {
      type: ItemType.ZODIAC,
      code: data?.code,
      data: zodiacNums,
    }
    tmArray.push(zodiacList)

    tmArray.push(...parseGroupData(
      [data?.playGroups[3], data?.playGroups[4], data?.playGroups[5]], data, 3))

  }

  return tmArray
}

/**
 * 解析六合彩 一组数据，如 特码标题栏+球数据
 *
 * @param groupArray 特码B A 数据列表
 * @param data 特码数据
 * @param N N个数为一组，必须大于 0
 */
const parseGroupData = (groupArray?: Array<PlayGroupData>,
                        data?: PlayOddData,
                        N?: number): Array<LotteryListMode> => {
  const tmArray: Array<LotteryListMode> = []
  groupArray?.map((groupData) => {
    //标题栏
    const labelList: LotteryListMode = {
      type: ItemType.LABEL,
      code: data?.code,
      data: groupData,
    }
    tmArray.push(labelList)

    //每行N个球排列
    tmArray.push(...parseBallData(groupData?.plays, data, N))

  })

  return tmArray
}

/**
 * 解析六合彩 球的数据
 *
 * @param playData 特码球的数据
 * @param data 特码数据
 * @param N N个数为一组，必须大于 0
 */
const parseBallData = (playData?: Array<PlayData>,
                       data?: PlayOddData,
                       N?: number): Array<LotteryListMode> => {
  const playArray: Array<LotteryListMode> = []

  const endCount = arrayLength(playData) % N //不是N的整数倍，有遗漏数据，比如 漏了2个
  const lastIndex = endCount > 0 ? arrayLength(playData) - 1 : -1 // //不是N的整数倍，有遗漏数据

  playData?.map((playData, index, array) => {
    const oppoIndex = index + 1
    let forStart = 0

    if (oppoIndex % N == 0) {//3个球为一组，比如 0 1 2
      forStart = N - 1
    } else if (index == lastIndex) {//最后遗漏的数据 3 4
      forStart = endCount - 1
    }

    if (forStart > 0) {
      const trio = []
      for (let i = forStart; i >= 0; i--) {
        trio.push(array[index - i])
      }
      ugLog('trio = ', JSON.stringify(trio))
      playArray.push({
          type: ItemType.BALLS,
          code: data?.code,
          data: trio,
        },
      )
    }
  })

  return playArray
}

export { parseTMData }
