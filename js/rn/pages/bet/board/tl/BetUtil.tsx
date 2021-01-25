import { anyEmpty, arrayEmpty, arrayLength } from '../../../../public/tools/Ext'
import {
  PagePlayOddData,
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryConst from '../../const/LotteryConst'
import LhcHXComponent from '../../lhc/hx/LhcHXComponent'
import LhcZXBZComponent from '../../lhc/zxbz/LhcZXBZComponent'
import * as React from 'react'
import LotteryData from '../../const/LotteryData'
import { ugLog } from '../../../../public/tools/UgLog'
import parseTMData from '../../util/ps/ParseTMDataUtil'
import parseHXData from '../../util/ps/ParseHXDataUtil'
import parseZTData from '../../util/ps/ParseZTDataUtil'
import parseLMAData from '../../util/ps/ParseLMADataUtil'
import parseSBData from '../../util/ps/ParseSBDataUtil'
import parsePTYXData from '../../util/ps/ParsePTYXDataUtil'
import parseWSData from '../../util/ps/ParseWSDataUtil'
import parseLXData from '../../util/ps/ParseLXDataUtil'
import parseLWData from '../../util/ps/ParseLWDataUtil'
import parseZXBZData from '../../util/ps/ParseZXBZDataUtil'
import { UGStore } from '../../../../redux/store/UGStore'
import { zodiacPlayX } from './hx/BetHXUtil'
import { playDataX } from './zxbz/BetZXBZUtil'
import { numberToFloatString } from '../../../../public/tools/StringUtil'
import { BetLotteryData } from '../../../../public/network/it/bet/IBetLotteryParams'
import { Toast } from '../../../../public/tools/ToastUtils'

/**
 * 下注辅助类
 */

/**
 * 计算彩票下注时候，选中的条目数量是否符合要求
 *
 * @param showMsg 显示提示语
 */
const checkBetCount = (showMsg?: boolean): boolean => {
  const selectedData = UGStore.globalProps?.selectedLotteryModel?.selectedData
  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null

  ugLog('key key selectedData = ', JSON.stringify(selectedData))
  ugLog('keys = ', JSON.stringify(keys))
  if(anyEmpty(keys)) {
    Toast('请选择玩法')
    return false
  }

  for (let index in keys) {
    const key = keys[index]
    ugLog('key index = ', key, JSON.stringify(selectedData[key]))
    switch (key) {
      // case LotteryConst.TM:  //特码
      // case LotteryConst.LM: //两面
      // case LotteryConst.ZM: //正码
      // case LotteryConst.ZT:  //正特
      // case LotteryConst.ZM1_6: //正码1T6
      // case LotteryConst.SB: //色波
      // case LotteryConst.ZOX://总肖
      // case LotteryConst.WX:  //五行
      // case LotteryConst.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      // case LotteryConst.TX: //特肖
      // case LotteryConst.ZX: //正肖
      // case LotteryConst.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      // case LotteryConst.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      // case LotteryConst.LX: //连肖
      // case LotteryConst.LW: //连尾
      //   ugLog('key key = selectedData[key] ', JSON.stringify(selectedData[key]))
      //   if(arrayLength(selectedData[key]) <= 0) {
      //     Toast('请选择玩法')
      //     return false
      //   }
      //   break
      //
      // case LotteryConst.HX://合肖
      //   if(arrayLength(selectedData[key][0]?.exZodiacs) <= 1) {
      //     Toast('合肖请选择2个以上的数据')
      //     return false
      //   }
      //   break
      // case LotteryConst.LMA:  //连码
      //
      //   break

      case LotteryConst.ZXBZ:  //自选不中
        if(arrayLength(selectedData[key][0]?.exPlays) < 5) {
          Toast('自选不中请选择5到12个数据')
          return false
        }
        break
    }

  }

  return true
}

/**
 * 计算彩票下注时候，选中的条目数量
 * @param selectedData
 */
const calculateItemCount = (selectedData?: Map<string, Array<PlayGroupData>>): number => {
  let itemCount = 0
  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null
  keys?.map((key) => {
    if (arrayLength(selectedData[key]) > 0) {//该彩种是否有选中的数据
      if (LotteryConst.LMA == key
        || LotteryConst.HX == key
        || LotteryConst.ZXBZ == key) {//部分彩种 只计算 1条数据
        itemCount++
      } else {
        //选中的数据有多少组
        const value: Array<PlayGroupData> = selectedData[key]
        itemCount += value?.map((item) =>
          arrayLength(item.plays))?.reduce(((previousValue, currentValue) => previousValue + currentValue))
      }
    }
  })

  return itemCount
}

/**
 * 计算彩票下注时候，选中的条目默认金额
 * @param selectedData
 */
const calculateItemMoney = (selectedData?: Map<string, Array<PlayGroupData>>): Map<string, number> => {
  const defaultMoney = UGStore.globalProps?.selectedLotteryModel?.inputMoney ?? 1
  const dataMap = new Map<string, number>()

  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null
  keys?.map((key) => {
    if (!arrayEmpty(selectedData[key])) {
      switch (key) {
        case LotteryConst.LMA://部分彩种 只计算 1条数据
        {
          const play0 = (selectedData[key][0] as PlayGroupData).plays[0]
          dataMap[play0?.id] = defaultMoney
        }

          break
        case LotteryConst.HX://部分彩种 只计算 1条数据
        {
          const groupData = (selectedData[key][0] as PlayGroupData)
          const playX = zodiacPlayX(groupData)
          dataMap[playX?.id] = defaultMoney
        }

          break

        case LotteryConst.ZXBZ://部分彩种 只计算 1条数据
        {
          const groupData = (selectedData[key][0] as PlayGroupData)
          const playX = playDataX(groupData)
          dataMap[playX?.id] = defaultMoney
        }

          break
        default:
          //选中的数据有多少组
          const value: Array<PlayGroupData> = selectedData[key]
          value?.map((groupData) => {
            groupData?.plays?.map((playData) => {
              dataMap[playData?.id] = defaultMoney
            })
          })

          break
      }

    }
  })

  return dataMap
}


export {
  calculateItemCount,
  calculateItemMoney,
  checkBetCount,
}
