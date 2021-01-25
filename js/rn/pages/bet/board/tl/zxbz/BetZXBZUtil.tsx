import * as React from 'react'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength } from '../../../../../public/tools/Ext'
/**
 * 自选不中下注工具类
 */

/**
 * 自选不中根据选中的数据找出对应的赔率
 * @param groupData
 */
const playDataX = (groupData?: PlayGroupData): PlayData => {
  return groupData.plays[arrayLength(groupData?.plays) - 5]
}

export {
  playDataX,
}
