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
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'

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

  ugLog('checkBetCount selectedData', JSON.stringify(keys))
  if(anyEmpty(keys)) {
    Toast('请选择玩法')
    return false
  }

  for (let index in keys) {
    const key = keys[index]
    const selCount = calculateItemCount(selectedData)
    ugLog('checkBetCount selCount', selCount)

    switch (key) {
      case LotteryConst.TM:  //特码
      case LotteryConst.LM: //两面
      case LotteryConst.ZM: //正码
      case LotteryConst.ZT:  //正特
      case LotteryConst.ZM1_6: //正码1T6
      case LotteryConst.SB: //色波
      case LotteryConst.ZOX://总肖
      case LotteryConst.WX:  //五行
      case LotteryConst.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LotteryConst.TX: //特肖
      case LotteryConst.ZX: //正肖
      case LotteryConst.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LotteryConst.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LotteryConst.LX: //连肖
      case LotteryConst.LW: //连尾
        if(selCount <= 0) {
          showMsg && Toast('请选择玩法')
          return false
        }
        break

      case LotteryConst.HX://合肖
        if(selCount <= 1) {
          showMsg && Toast('合肖请选择2个以上的数据')
          return false
        }
        break
      case LotteryConst.LMA:  //连码

        break

      case LotteryConst.ZXBZ:  //自选不中
        if(selCount < 5) {
          showMsg && Toast('自选不中请选择5到12个选项')
          return false
        }
        break
    }

  }

  return true
}

/**
 * 将彩种数组集合成一维数据
 * @param code 某个彩种，如 特码TM
 * @param selectedData 如选中的数据
 */
const gatherItems = (code?: string, selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Array<SelectedPlayModel> => {
  //选中的数据有多少组
  const valueArr: Array<Map<string, SelectedPlayModel>> = Object.values(selectedData[code])
  return valueArr?.map((arr) =>
    Object.values(arr)).flat(Infinity).filter((item) => !anyEmpty(item))
}

/**
 * 计算彩票下注时候，选中的条目数量
 * @param selectedData
 */
const calculateItemCount = (selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): number => {
  let itemCount = 0
  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null
  keys?.map((key) => {
    const selData = gatherItems(key, selectedData)
    const scount = selData?.map((item) =>
      arrayLength(item.zodiacs || item.plays))?.reduce(((previousValue, currentValue) => previousValue + currentValue))
    ugLog('calculate valueSel key = ', key, scount)

    if (scount > 0) {//该彩种是否有选中的数据
      if (LotteryConst.LMA == key
        || LotteryConst.HX == key
        || LotteryConst.ZXBZ == key) {//部分彩种 只计算 1条数据
        itemCount++
      } else {
        //选中的数据有多少组
        // const valueSel = gatherItems(key, selectedData)
        itemCount += scount
      }
    }
  })

  return itemCount
}

/**
 * 计算彩票下注时候，初始化选中的条目默认金额
 * @param selectedData
 */
const initItemMoney = (selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Map<string, number> => {
  const defaultMoney = UGStore.globalProps?.selectedLotteryModel?.inputMoney ?? 1
  const dataMap = new Map<string, number>()

  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null
  keys?.map((key) => {
    if (!arrayEmpty(selectedData[key])) {
      switch (key) {
        case LotteryConst.LMA://部分彩种 只计算 1条数据
        {
          // const play0 = (selectedData[key][0] as PlayGroupData).plays[0]
          const play0 = gatherItems(key, selectedData)[0]?.plays[0]
          dataMap[play0?.id] = defaultMoney
        }

          break
        case LotteryConst.HX://部分彩种 只计算 1条数据
        {
          // const groupData = (selectedData[key][0] as PlayGroupData)
          const selData = gatherItems(key, selectedData)[0]
          const playX = zodiacPlayX(selData)
          dataMap[playX?.id] = defaultMoney
        }

          break

        case LotteryConst.ZXBZ://部分彩种 只计算 1条数据
        {
          // const groupData = (selectedData[key][0] as PlayGroupData)
          const selData = gatherItems(key, selectedData)[0]
          const playX = playDataX(selData)
          dataMap[playX?.id] = defaultMoney
        }

          break
        default:
          //选中的数据有多少组
          // const value: Array<PlayGroupData> = selectedData[key]
          const selData = gatherItems(key, selectedData)
          selData?.map((selModel) => {
            selModel?.plays?.map((playData) => {
              dataMap[playData?.exId ?? playData?.id] = defaultMoney
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
  initItemMoney,
  checkBetCount,
}
