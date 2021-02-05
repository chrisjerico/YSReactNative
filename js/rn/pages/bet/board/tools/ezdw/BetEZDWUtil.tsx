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
import { combination, combineArr } from '../../../util/ArithUtil'
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
 * 重新组合下载数据，多维数据转一维数据
 * @param currentPlayOddData
 * @param selectedData
 */
const combineSelectedData = (currentPlayOddData?: PlayOddData,
                             selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Array<SelectedPlayModel> => {
  return Object.keys(selectedData).map((key) => {
    const value = selectedData[key]
    switch (key) {
      case LhcCode.LX://连肖
      case LhcCode.LW://连尾
      {
        const pageData = (Object.values(value).map((data) => Object.values(data)).flat(Infinity) as Array<SelectedPlayModel>)
        ugLog('combineSelectedData pageData = ', JSON.stringify(pageData))
        const newArr = pageData?.map((item) => {
          const newPlays: Array<Array<PlayData>> = combination(item?.plays, item?.limitCount)
          const newPage = {
            ...item,
            plays: newPlays?.map((arr) => ({//只取第一个，其它的串联成名字就可以了
              ...arr[0],
              alias: arr?.map((item) => item?.alias).toString(),
              exPlayIds: arr?.map((item) => item?.id).toString(),
            } as PlayData)),
          }
          // ugLog('combineSelectedData newPage = ', JSON.stringify(newPage))
          return newPage
        })
        ugLog('combineSelectedData newArr = ', JSON.stringify(newArr))

        return newArr
      }
      case CqsscCode.EZDW: //二字定位，多组数据合成1组数据
        // ugLog('key data - = ', JSON.stringify(Object.values(newSelectedData[key])))
        // ugLog('key data 2 - = ', JSON.stringify(Object.values(newSelectedData[key]).map((data) => Object.values(data))))
        const pageData = (Object.values(value).map((data) => Object.values(data)).flat(Infinity) as Array<SelectedPlayModel>)
        const pagePlayArr: Array<Array<PlayData>> = pageData?.map((item) => item?.plays)
        ugLog('pagePlayArr = ', JSON.stringify(pagePlayArr))
        const arr = combineArr(...pagePlayArr)
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
  filterPlayData,
}
