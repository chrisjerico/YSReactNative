import * as React from 'react'
import { PlayData, PlayGroupData, PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength } from '../../../../../public/tools/Ext'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
import { CqsscCode, LhcCode } from '../../../const/LotteryConst'
import { UGStore } from '../../../../../redux/store/UGStore'
import { gatherSelectedItems } from '../BetUtil'
import { numberToFloatString } from '../../../../../public/tools/StringUtil'
import { BetLotteryData } from '../../../../../public/network/it/bet/IBetLotteryParams'
import { zodiacPlayX } from '../hx/BetHXUtil'
import { ugLog } from '../../../../../public/tools/UgLog'
import { playDataX } from '../zxbz/BetZXBZUtil'
/**
 * X字定位下注工具类
 */

/**
 * 重新组合出N组下注数据，如 二字定位[1,2] -> [3,4] 重组成 [13,14,23,34]
 * @param selData
 */
const combineEZDWArray = (...selData: Array<SelectedPlayModel>): Array<string> => {
  // return selData1?.plays.map((item1) => selData2?.plays.map((item2) => `${item1?.name},${item2?.name}`))?.flat(Infinity)
  if (arrayLength(selData) == 1) {
    return selData[0].plays?.map((play) => play?.name)
  } else if (arrayLength(selData) == 2) {
    return selData[0]?.plays?.map((play0) =>
      selData[1]?.plays?.map((play1) =>
        `${play0.name},${play1.name}`)).flat(2)
  } else if (arrayLength(selData) == 3) {
    return selData[0]?.plays?.map((play0) =>
      selData[1]?.plays?.map((play1) =>
        selData[2]?.plays?.map((play2) =>
          `${play0.name},${play1.name},${play2.name}`))).flat(3)
  }
  return null
}

/**
 * 重新组合出N组下注数据，如 二字定位[1,2] -> [3,4] 重组成 [13,14,23,34]，
 * 并且剔除多余的数据将结果返回
 * @param selData
 */
const combineEZDWModel = (...selData: Array<SelectedPlayModel>): Array<string> => {
  // return selData1?.plays.map((item1) => selData2?.plays.map((item2) => `${item1?.name},${item2?.name}`))?.flat(Infinity)
  if (arrayLength(selData) == 1) {
    return selData[0].plays?.map((play) => play?.name)
  } else if (arrayLength(selData) == 2) {
    return selData[0]?.plays?.map((play0) =>
      selData[1]?.plays?.map((play1) =>
        `${play0.name},${play1.name}`)).flat(2)
  } else if (arrayLength(selData) == 3) {
    return selData[0]?.plays?.map((play0) =>
      selData[1]?.plays?.map((play1) =>
        selData[2]?.plays?.map((play2) =>
          `${play0.name},${play1.name},${play2.name}`))).flat(3)
  }
  return null
}

/**
 * 重新组合下载数据，多维数据转一维数据
 * @param currentPlayOddData
 * @param selectedData
 */
const combineSelectedData = (currentPlayOddData?: PlayOddData,
                             selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Array<SelectedPlayModel> => {
  const newSelectedData = JSON.parse(JSON.stringify(selectedData))
  return Object.keys(newSelectedData).map((key) => {
    switch (key) {
      case CqsscCode.EZDW: //二字定位，2组数据合成1组数据
        const data1 = (newSelectedData[key][0][0] as SelectedPlayModel)
        const data2 = (newSelectedData[key][0][1] as SelectedPlayModel)

        break
      default:
        return gatherSelectedItems(key, newSelectedData)
    }
  }).flat(2)
}

export {
  combineEZDWArray,
  combineSelectedData,
}
