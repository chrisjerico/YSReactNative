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
import {
  parseLMAData,
  parseLMData, parseLWData, parseLXData,
  parsePTWSData,
  parsePTYXData,
  parseTMData, parseTWSData,
  parseZMData,
} from './LotteryParseDataUtil'
import LhcTMComponent from '../../lhc/tm/LhcTMComponent'
import LhcZTComponent from '../../lhc/zt/LhcZTComponent'
import LhcLMAComponent from '../../lhc/lma/LhcLMAComponent'
import LhcSBComponent from '../../lhc/sb/LhcSBComponent'
import LhcPTYXComponent from '../../lhc/ptyx/LhcPTYXComponent'
import LhcHXComponent from '../../lhc/hx/LhcHXComponent'
import LhcZXBZComponent from '../../lhc/zxbz/LhcZXBZComponent'

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
      const code = playOdds?.code
      switch (code) {
        case LotteryConst.TM:  //特码
          listData.push(...parseTMData(true, playOdds, data?.setting?.zodiacNums))
          break

        case LotteryConst.ZM: //正码
        case LotteryConst.ZT:  //正特
          listData.push(...parseZMData(playOdds))
          break

        case LotteryConst.LMA:  //连码
          listData.push(...parseLMAData(playOdds))
          break

        case LotteryConst.LM: //两面
        case LotteryConst.ZM1_6: //正码1T6
        case LotteryConst.SB: //色波
        case LotteryConst.ZOX://总肖
        case LotteryConst.WX:  //五行
          listData.push(...parseLMData(playOdds))
          break

        case LotteryConst.YX: //平特一肖
        case LotteryConst.TX: //特肖
        case LotteryConst.ZX:  //正肖
          listData.push(...parsePTYXData({ data: playOdds }))

          break
        case LotteryConst.WS: //平特尾数
          listData.push(...parsePTWSData(playOdds))

          break
        case LotteryConst.TWS: //头尾数
          listData.push(...parseTWSData(playOdds))

          break;
        case LotteryConst.LX: //连肖
          listData.push(...parseLXData({ data: playOdds }))
          break
        case LotteryConst.LW: //连尾
          listData.push(...parseLWData(playOdds))

          break
        case LotteryConst.HX:  //合肖
          break

        case LotteryConst.ZXBZ:  //自选不中
          break


      }
    })
  }

  return {
    lotteryListData,
    parseData,
  }
}

export default UseParseLotteryDataHelper

