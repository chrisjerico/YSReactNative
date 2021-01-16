import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import {
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'
import BetLotteryContext from '../../BetLotteryContext'
import { isSelectedBallOnId } from '../../const/ISelBall'
import LotteryListMode from '../../../../redux/model/game/LotteryListModel'
import LotteryConst from '../../const/LotteryConst'

/**
 * 彩票公共处理类
 * @constructor
 */
const UseParseLotteryDataHelper = () => {

  const [lotteryListData, setLotteryListData] = useState<Array<LotteryListMode>>([]) //重新缓存的列表数据

  /**
   * 解析重新组合列表数据
   * @param data
   */
  const parseData = (data?: PlayOddDetailData) => {
    const listData = []
    data?.playOdds?.map((playOdds) => {
      switch (playOdds?.code) {
        case LotteryConst.TM:

          break
      }
    })
  }

  /**
   * 解析六合彩 特码数据
   */
  const parseTabData = () => {

  }

  /**
   * 解析TAB数据
   */
  const parseTabData = () => {

  }

  return {
    lotteryListData,
    parseData,
  }
}

export default UseParseLotteryDataHelper

