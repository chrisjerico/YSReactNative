import * as React from 'react'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength } from '../../../../../public/tools/Ext'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
/**
 * X字定位下注工具类
 */

/**
 * 重新组合出两组下注数据，如 二字定位[1,2] -> [3,4] 重组成 [13,14,23,34]
 * @param selData1 第一组数据
 * @param selData2 第二组数据
 */
const combineEZDWArray = (selData1?: SelectedPlayModel,
                          selData2?: SelectedPlayModel): Array<string> => {
  // return selData1?.plays.map((item1) => selData2?.plays.map((item2) => `${item1?.name},${item2?.name}`))?.flat(Infinity)
  return selData1?.plays?.map((play1) =>
    selData2?.plays?.map((play2) =>
      `${play1.name},${play2.name}`)).flat(2)
}

export {
  combineEZDWArray,
}
