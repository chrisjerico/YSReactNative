import * as React from 'react'
import { PlayData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength } from '../../../../../public/tools/Ext'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
/**
 * X字定位下注工具类
 */

/**
 * 过滤出某个彩种
 * @param allData 所有数据
 * @param playData 需要过滤的数据
 */
const filterPlayData = (allData?: Array<SelectedPlayModel>, playData?: PlayData): Array<SelectedPlayModel> => {
  return allData?.map((comData) => ({
    ...comData,
    plays: comData?.plays?.filter((play: PlayData, index) => JSON.stringify(play) != JSON.stringify(playData)),
  }))

}

/**
 * 重新组合数组的名字
 * @param selData
 */
const combineArrayName = (...selData: Array<SelectedPlayModel>): Array<string> => {
  // return selData1?.plays.map((item1) => selData2?.plays.map((item2) => `${item1?.name},${item2?.name}`))?.flat(Infinity)
  if (arrayLength(selData) == 1) {
    return selData[0].plays?.map((play) => play?.name)
  }
  // else if (arrayLength(selData) == 2) {
  //   return selData[0]?.plays?.map((play0) =>
  //     selData[1]?.plays?.map((play1) =>
  //       `${play0.name},${play1.name}`)).flat(2)
  // } else if (arrayLength(selData) == 3) {
  //   return selData[0]?.plays?.map((play0) =>
  //     selData[1]?.plays?.map((play1) =>
  //       selData[2]?.plays?.map((play2) =>
  //         `${play0.name},${play1.name},${play2.name}`))).flat(3)
  // }
  return null
}

export {
  combineArrayName,
  filterPlayData,
}
