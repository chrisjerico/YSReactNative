import { anyEmpty, arrayEmpty, arrayLength } from '../../../../public/tools/Ext'
import {LhcCode} from '../../const/LotteryConst'
import * as React from 'react'
import { ugLog } from '../../../../public/tools/UgLog'
import { UGStore } from '../../../../redux/store/UGStore'
import { zodiacPlayX } from './hx/BetHXUtil'
import { playDataX } from './zxbz/BetZXBZUtil'
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
      case LhcCode.TM:  //特码
      case LhcCode.LM: //两面
      case LhcCode.ZM: //正码
      case LhcCode.ZT:  //正特
      case LhcCode.ZM1_6: //正码1T6
      case LhcCode.SB: //色波
      case LhcCode.ZOX://总肖
      case LhcCode.WX:  //五行
      case LhcCode.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TX: //特肖
      case LhcCode.ZX: //正肖
      case LhcCode.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
        if(selCount <= 0) {
          showMsg && Toast('请选择玩法')
          return false
        }
        break

      case LhcCode.HX://合肖
        if(selCount <= 1) {
          showMsg && Toast('合肖请选择2个以上的数据')
          return false
        }
        break
      case LhcCode.LMA:  //连码

        break

      case LhcCode.ZXBZ:  //自选不中
        const count = calculateActualItemCount(selectedData)
        if(count < 5) {
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
const gatherSelectedItems = (code?: string, selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Array<SelectedPlayModel> => {
  //选中的数据有多少组
  const valueArr: Array<Map<string, SelectedPlayModel>> = Object.values(selectedData[code])
  return valueArr?.map((arr) =>
    Object.values(arr)).flat(Infinity).filter((item) => !anyEmpty(item))
}

/**
 * 计算彩票下注时候，选中的条目占位数量，有的彩票计算实际数量，有的彩票计算相对数量
 * @param selectedData
 */
const calculateItemCount = (selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): number => {
  let itemCount = 0
  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null
  keys?.map((key) => {
    const selData = gatherSelectedItems(key, selectedData)
    const scount = selData?.map((item) =>
      arrayLength(item.zodiacs || item.plays))?.reduce(((previousValue, currentValue) => previousValue + currentValue))
    ugLog('calculateItemCount valueSel key = ', key, scount)

    if (scount > 0) {//该彩种是否有选中的数据
      if (LhcCode.LMA == key
        || LhcCode.HX == key
        || LhcCode.ZXBZ == key) {//部分彩种 只计算 1条数据
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
 * 计算彩票下注时候，选中的条目实际数量
 * @param selectedData
 */
const calculateActualItemCount = (selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): number => {
  let itemCount = 0
  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null
  keys?.map((key) => {
    const selData = gatherSelectedItems(key, selectedData)
    const scount = selData?.map((item) =>
      arrayLength(item.zodiacs || item.plays))?.reduce(((previousValue, currentValue) => previousValue + currentValue))
    ugLog('calculateActualItemCount valueSel key = ', key, scount)

    if (scount > 0) {//该彩种是否有选中的数据
      //选中的数据有多少组
      // const valueSel = gatherItems(key, selectedData)
      itemCount += scount
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
  const moneyMap = new Map<string, number>()

  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null
  keys?.map((key) => {
    if (!arrayEmpty(selectedData[key])) {
      switch (key) {
        case LhcCode.LMA://部分彩种 只计算 1条数据
        {
          // const play0 = (selectedData[key][0] as PlayGroupData).plays[0]
          const play0 = gatherSelectedItems(key, selectedData)[0]?.plays[0]
          moneyMap[play0?.exId ?? play0?.id] = defaultMoney
        }

          break
        case LhcCode.HX://部分彩种 只计算 1条数据
        {
          // const groupData = (selectedData[key][0] as PlayGroupData)
          const selData = gatherSelectedItems(key, selectedData)[0]
          const playX = zodiacPlayX(selData)
          moneyMap[playX?.exId ?? playX?.id] = defaultMoney
        }

          break

        case LhcCode.ZXBZ://部分彩种 只计算 1条数据
        {
          // const groupData = (selectedData[key][0] as PlayGroupData)
          const selData = gatherSelectedItems(key, selectedData)[0]
          const playX = playDataX(selData)
          moneyMap[playX?.exId ?? playX?.id] = defaultMoney
        }

          break
        default:
          //选中的数据有多少组
          // const value: Array<PlayGroupData> = selectedData[key]
          const selData = gatherSelectedItems(key, selectedData)
          selData?.map((selModel) => {
            selModel?.plays?.map((playData) => {
              moneyMap[playData?.exId ?? playData?.id] = defaultMoney
            })
          })

          break
      }

    }
  })

  return moneyMap
}


export {
  gatherSelectedItems,
  calculateItemCount,
  calculateActualItemCount,
  initItemMoney,
  checkBetCount,
}
