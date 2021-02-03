import * as React from 'react'
import { PlayData, PlayGroupData, PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength } from '../../../../../public/tools/Ext'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
import { CqsscCode } from '../../../const/LotteryConst'
import { UGStore } from '../../../../../redux/store/UGStore'
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
 * 重新组合下载数据
 * @param currentPlayOddData
 * @param selectedData
 */
const combineSelectedData = (currentPlayOddData?: PlayOddData,
                             selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Map<string, Map<string, Map<string, SelectedPlayModel>>> => {
  const newSelectedData = JSON.parse(JSON.stringify(UGStore.globalProps?.selectedLotteryModel?.selectedData))
  switch (currentPlayOddData?.code) {
    case CqsscCode.EZDW: //二字定位，2组数据合成1组数据

      break

  }

  return newSelectedData
}

export {
  combineEZDWArray,
  combineSelectedData,
}
