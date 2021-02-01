import * as React from 'react'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength } from '../../../../../public/tools/Ext'
import { SelectedPlayModel } from '../../../../../redux/model/game/SelectedLotteryModel'
/**
 * 自选不中下注工具类
 */

/**
 * 自选不中根据选中的数据找出对应的赔率
 * @param selData
 */
const playDataX = (selData?: SelectedPlayModel): PlayData => {
  return selData.playGroups.plays[arrayLength(selData?.plays) - 5]
}

export {
  playDataX,
}
