import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import {
  PagePlayOddData,
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryConst from '../../const/LotteryConst'
import LhcHXComponent from '../../lhc/hx/LhcHXComponent'
import LhcZXBZComponent from '../../lhc/zxbz/LhcZXBZComponent'
import * as React from 'react'
import LotteryData from '../../const/LotteryData'
import { ugLog } from '../../../../public/tools/UgLog'
import parseTMData from '../../util/ps/ParseTMDataUtil'
import parseHXData from '../../util/ps/ParseHXDataUtil'
import parseZTData from '../../util/ps/ParseZTDataUtil'
import parseLMAData from '../../util/ps/ParseLMADataUtil'
import parseSBData from '../../util/ps/ParseSBDataUtil'
import parsePTYXData from '../../util/ps/ParsePTYXDataUtil'
import parseWSData from '../../util/ps/ParseWSDataUtil'
import parseLXData from '../../util/ps/ParseLXDataUtil'
import parseLWData from '../../util/ps/ParseLWDataUtil'
import parseZXBZData from '../../util/ps/ParseZXBZDataUtil'
import { UGStore } from '../../../../redux/store/UGStore'

/**
 * 下注辅助类
 */

/**
 * 计算彩票下注时候，选中的条目数量
 * @param selectedData
 */
const calculateItemCount = (selectedData?: Map<string, Array<PlayGroupData>>): number => {
  let itemCount = 0
  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null
  keys?.map((key) => {
    if (arrayLength(selectedData[key]) > 0) {//该彩种是否有选中的数据
      if (LotteryConst.LMA == key || LotteryConst.HX == key) {//部分彩种 只计算 1条数据
        itemCount++
      } else {
        //选中的数据有多少组
        const value: Array<PlayGroupData> = selectedData[key]
        itemCount += value?.map((item) =>
          arrayLength(item.plays))?.reduce(((previousValue, currentValue) => previousValue + currentValue))
      }
    }
  })

  return itemCount
}

/**
 * 计算彩票下注时候，选中的条目默认金额
 * @param selectedData
 */
const calculateItemMoney = (selectedData?: Map<string, Array<PlayGroupData>>): Map<string, number> => {
  const defaultMoney = UGStore.globalProps?.selectedLotteryModel?.inputMoney ?? 1
  const dataMap = new Map<string, number>()

  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null
  keys?.map((key) => {
    switch (key) {
      case LotteryConst.LMA://部分彩种 只计算 1条数据
      {
        const play0 = (selectedData[key][0] as PlayGroupData).plays[0]
        dataMap[play0?.id] = defaultMoney
      }

        break
      case LotteryConst.HX://部分彩种 只计算 1条数据
      {
        const groupData = (selectedData[key][0] as PlayGroupData)
        const playX = groupData.plays[arrayLength(groupData?.exZodiacs) - 2]
        dataMap[playX?.id] = defaultMoney
      }

        break
      default:
        //选中的数据有多少组
        const value: Array<PlayGroupData> = selectedData[key]
        value?.map((groupData) => {
          groupData?.plays?.map((playData) => {
            dataMap[playData?.id] = defaultMoney
          })
        })

        break
    }
  })

  return dataMap
}


export {
  calculateItemCount,
  calculateItemMoney,
}
