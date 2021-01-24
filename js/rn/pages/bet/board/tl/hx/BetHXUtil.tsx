import * as React from 'react'
import { PlayData, PlayGroupData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { arrayLength } from '../../../../../public/tools/Ext'

/**
 * 合肖根据选中的数据找出对应的赔率
 * @param groupData
 */
const zodiacPlayX = (groupData?: PlayGroupData): PlayData => {
  return groupData.plays[arrayLength(groupData?.exZodiacs) - 2]
}

export {
  zodiacPlayX,
}
