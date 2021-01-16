import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import {
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import BetLotteryContext from '../../BetLotteryContext'
import { isSelectedBallOnId } from '../../const/ISelBall'
import LotteryListMode, { ItemType } from '../../../../redux/model/game/LotteryListModel'
import LotteryConst from '../../const/LotteryConst'
import { PlayOdd } from '../../../../public/network/Model/PlayOddDataModel'

/**
 * 彩票解析特码数据
 * @constructor
 */
const UseParseLotteryDataHelper = () => {

  const [lotteryListData, setLotteryListData] = useState<Array<LotteryListMode>>([]) //重新缓存的列表数据

  /**
   * 解析六合彩 特码数据
   */
  const parseTMData = (data?: PlayOddData): Array<LotteryListMode> => {
    const tmArray: Array<LotteryListMode> = []
    if (arrayLength(data?.playGroups) == 6) {
      //特码B A
      const tabs: LotteryListMode = {
        type: ItemType.TAB,
        code: data?.code,
        data: [data?.playGroups[0], data?.playGroups[3]]
      }
      tmArray.push(tabs)

      //12生肖
      const zodiacList: LotteryListMode = {
        type: ItemType.ZODIAC,
        code: data?.code,
        data: [data?.playGroups[0], data?.playGroups[3]]
      }
      tmArray.push(zodiacList)

    }

    return tmArray
  }

  return {
    lotteryListData,
  }
}

export default UseParseLotteryDataHelper

