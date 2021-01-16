import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import {
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../public/tools/Ext'
import BetLotteryContext from '../BetLotteryContext'
import { isSelectedBallOnId } from '../const/ISelBall'
import LotteryListMode, { ItemType } from '../../../redux/model/game/LotteryListModel'
import LotteryConst from '../const/LotteryConst'
import { PlayOdd } from '../../../public/network/Model/PlayOddDataModel'

/**
 * 彩票公共处理类
 * @constructor
 */
const UseParseLotteryDataHelper = () => {

  const [lotteryListData, setLotteryListData] = useState<Array<LotteryListMode>>([]) //重新缓存的列表数据


  /**
   * 解析六合彩 特码数据
   */
  const parseTMData = (data?: PlayOddData) => {
    const tabs: LotteryListMode = {
      type: ItemType.TAB,
      code: data?.code,
      data: [data?.playGroups[0]]
    }
  }

  return {
    lotteryListData,
  }
}

export default UseParseLotteryDataHelper

