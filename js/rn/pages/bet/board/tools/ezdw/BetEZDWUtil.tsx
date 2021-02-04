import * as React from 'react'
import { PlayData, PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
import { CqsscCode, LhcCode } from '../../../const/LotteryConst'
import { gatherSelectedItems } from '../BetUtil'
import { ugLog } from '../../../../../public/tools/UgLog'
import { zodiacPlayX } from '../hx/BetHXUtil'
import { numberToFloatString } from '../../../../../public/tools/StringUtil'
import { BetLotteryData } from '../../../../../public/network/it/bet/IBetLotteryParams'
import { playDataX } from '../zxbz/BetZXBZUtil'
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
    plays: comData?.plays?.filter((play: PlayData, index) => JSON.stringify(play) != JSON.stringify(playData))
  }))

}

/**
 * 重新组合出N组下注数据，如 二字定位[1,2] -> [3,4] 重组成 [13,14,23,34]
 * @param selData
 */
const combineEZDWArray = (...selData: Array<SelectedPlayModel>): Array<string> => {
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

/**
 * 重新组合出N组下注数据，如 二字定位[1,2] -> [3,4] 重组成 [13,14,23,34]，
 * 并且剔除多余的数据将结果返回
 * @param selData
 */
const combineEZDWModel = (selData: Array<SelectedPlayModel>): SelectedPlayModel => {
  if (arrayLength(selData) > 0) {
    return {
      ...selData[0],
      plays: combineEZDWPlayData(selData),
    } as SelectedPlayModel
  }

  return null
}

/**
 * 把多页数据组合成 一维数组
 * @param selData
 * @param plays 追加的彩球数据
 */
const combineEZDWPlayData = (selData?: Array<SelectedPlayModel>, plays?: Array<PlayData>): Array<PlayData> => {
  if (arrayLength(selData) > 1) {
    const arr0 = selData.slice(0, 1) as Array<SelectedPlayModel>
    const arr1 = selData.slice(1) as Array<SelectedPlayModel>
    // ugLog('arr0 = ', JSON.stringify(arr0))
    // ugLog('arr1 = ', JSON.stringify(arr1))
    return arr0[0]?.plays?.map((play) =>
      combineEZDWPlayData(arr1, anyEmpty(plays) ? [play] : [...plays, play])).flat(Infinity) as Array<PlayData>
  } else if (arrayLength(selData) == 1) {
    // ugLog('selData arr = 1 = ', JSON.stringify(selData))
    // ugLog('selData plays = 1 = ', JSON.stringify(plays))
    return selData[0]?.plays?.map((play) =>
      ({
        ...play,
        name: [...plays, play].map((item) => item?.name).toString(),
      } as PlayData))
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
  return Object.keys(selectedData).map((key) => {
    const value = selectedData[key]
    switch (key) {
      case CqsscCode.EZDW: //二字定位，多组数据合成1组数据
        // ugLog('key data - = ', JSON.stringify(Object.values(newSelectedData[key])))
        // ugLog('key data 2 - = ', JSON.stringify(Object.values(newSelectedData[key]).map((data) => Object.values(data))))
        const ezData = (Object.values(value).map((data) => Object.values(data)).flat(Infinity) as Array<SelectedPlayModel>)
        // ugLog('ezData 1 = ', JSON.stringify(ezData))
        const arr = combineEZDWModel(ezData)
        // ugLog('arr 1 = ', JSON.stringify(arr))

        return arr
      // case LhcCode.HX://合肖
      // {
      //   const ezData = (Object.values(value).map((data) => Object.values(data)).flat(Infinity) as Array<SelectedPlayModel>)
      //   const name = ezData[0]?.zodiacs?.map((item) => item?.name).toString()
      //   const playX = playDataX(ezData[0])
      //   return [{...ezData[0], plays: [{...playX, name: name}]} as SelectedPlayModel]
      // }
      //
      // case LhcCode.LMA:  //连码
      // {
      //   const ezData = (Object.values(value).map((data) => Object.values(data)).flat(Infinity) as Array<SelectedPlayModel>)
      //   const name = combineEZDWArray(...ezData).toString()
      //   return [{...ezData[0], plays: [{...ezData[0].plays[0], name: name}]} as SelectedPlayModel]
      // }
      //
      // case LhcCode.ZXBZ:  //自选不中
      // {
      //
      // }
      //   break
      default:
        return gatherSelectedItems(key, selectedData)
    }
  }).flat(Infinity) as Array<SelectedPlayModel>
}

export {
  combineEZDWArray,
  combineSelectedData,
  combineEZDWModel,
  filterPlayData,
}
