import * as React from 'react'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength } from '../../../../../public/tools/Ext'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
/**
 * 合肖下注工具类
 */

/**
 * 合肖根据选中的数据找出对应的赔率
 * @param selData
 */
const zodiacPlayX = (selData?: SelectedPlayModel): PlayData => {
  // return groupData.plays[arrayLength(groupData?.exZodiacs) - 2]
  return selData?.playGroups?.plays[arrayLength(selData?.zodiacs) - 2]
}

export {
  zodiacPlayX,
}
