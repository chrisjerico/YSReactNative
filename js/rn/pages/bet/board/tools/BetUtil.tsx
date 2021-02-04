import { anyEmpty, arrayEmpty, arrayLength } from '../../../../public/tools/Ext'
import { CqsscCode, LhcCode } from '../../const/LotteryConst'
import * as React from 'react'
import { ugLog } from '../../../../public/tools/UgLog'
import { UGStore } from '../../../../redux/store/UGStore'
import { zodiacPlayX } from './hx/BetHXUtil'
import { playDataX } from './zxbz/BetZXBZUtil'
import { Toast } from '../../../../public/tools/ToastUtils'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { filterSelectedData, filterSelectedSubData } from '../../util/LotteryUtil'

/**
 * 下注辅助类
 */

/**
 * 计算彩票下注时候，选中的条目数量是否符合要求
 *
 * @param showMsg 显示提示语
 */
const checkBetCount = (showMsg?: boolean): boolean => {
  const currentPlayGroupData = UGStore.globalProps?.currentPlayGroupData //当前界面
  const currentPlayOddData = UGStore.globalProps?.currentPlayOddData //当前彩种
  const selectedData = UGStore.globalProps?.selectedLotteryModel?.selectedData //选中的数据
  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null

  ugLog('checkBetCount selectedData', JSON.stringify(keys))
  if (anyEmpty(keys)) {
    Toast('请选择玩法')
    return false
  }

  for (let index in keys) {
    const key = keys[index]

    switch (key) {
      case LhcCode.TM:  //特码
      case LhcCode.LM: //两面
      case LhcCode.ZM: //正码
      case LhcCode.ZT:  //正特
      case LhcCode.ZM1_6: //正码1T6
      case LhcCode.SB: //色波
      case LhcCode.ZOX://总肖
      case LhcCode.WX:  //五行 或 五星
      case LhcCode.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TX: //特肖
      case LhcCode.ZX: //正肖
      case LhcCode.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
      case CqsscCode.ALL:  //1-5球
      case CqsscCode.Q1:  //第1球
      case CqsscCode.Q2:  //第2球
      case CqsscCode.Q3:  //第3球
      case CqsscCode.Q4:  //第4球
      case CqsscCode.Q5:  //第5球
      case CqsscCode.QZH:  //前中后
      case CqsscCode.DN:  //斗牛
      case CqsscCode.SH:  //梭哈
      case CqsscCode.LHD:  //龙虎斗
      case CqsscCode.YZDW:  //一字定位
      case CqsscCode.BDW:  //不定位
      case CqsscCode.DWD:  //定位胆
      {
        const selCountMap = filterSelectedData(selectedData)
        if (selCountMap[key] <= 0) {
          showMsg && Toast('请选择玩法')
          return false
        }
      }
        break

      case CqsscCode.EZDW:  //二字定位
      case CqsscCode.SZDW:  //三字定位
      {
        for (let data of currentPlayGroupData) {
          const selCount = filterSelectedSubData(key, data?.exPlays[0]?.alias, selectedData)
          ugLog('selCount = ', selCount, key, data?.exPlays[0]?.alias)
          if (selCount <= 0) {
            Toast(`请选择${data?.exPlays[0]?.alias}数据`)
          }
        }
      }
        break

      case LhcCode.HX://合肖
      {
        const selCountMap = filterSelectedData(selectedData)
        if (selCountMap[key] <= 1) {
          showMsg && Toast('合肖请选择2个以上的数据')
          return false
        }
      }
        break
      case LhcCode.LMA:  //连码

        break

      case LhcCode.ZXBZ:  //自选不中
      {
        const selCountMap = filterSelectedData(selectedData)
        if (selCountMap[key] < 5) {
          showMsg && Toast('自选不中请选择5到12个选项')
          return false
        }
      }
        break
    }

  }

  return true
}

/**
 * 将彩种数组集合成一维数据
 * @param code 某个彩种，如 特码TM
 * @param selectedData 如选中的数据
 */
const gatherSelectedItems = (code?: string, selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Array<SelectedPlayModel> => {
  //选中的数据有多少组
  const valueArr: Array<Map<string, SelectedPlayModel>> = Object.values(selectedData[code])
  return valueArr?.map((arr) =>
    Object.values(arr)).flat(Infinity).filter((item) => !anyEmpty(item))
}

/**
 * 计算彩票下注时候，选中的条目占位数量，有的彩票计算实际数量，有的彩票计算相对数量
 * @param selectedCombineData
 */
const calculateItemCount = (selectedCombineData?: Array<SelectedPlayModel>): number => {
  let itemCount = 0
  selectedCombineData?.map((selModel) => {
    const scount = arrayLength(selModel.zodiacs || selModel.plays)
    if (scount > 0) {//该彩种是否有选中的数据
      const key = selModel?.code
      if (LhcCode.LMA == key
        || LhcCode.HX == key
        || LhcCode.ZXBZ == key) {//部分彩种 只计算 1条数据
        itemCount++
      } else {
        //选中的数据有多少组
        itemCount += scount
      }
    }
  })

  return itemCount
}

/**
 * 计算彩票下注时候，选中的条目实际数量
 * @param selectedCombineData
 */
const calculateActualItemCount = (selectedCombineData?: Array<SelectedPlayModel>): number => {
  let itemCount = 0
  selectedCombineData?.map((selModel) => {
    const scount = arrayLength(selModel.zodiacs || selModel.plays)
    if (scount > 0) {//该彩种是否有选中的数据
      itemCount += scount
    }
  })

  return itemCount
}

/**
 * 计算彩票下注时候，初始化选中的条目默认金额
 * @param selectedCombineData
 */
const initItemMoney = (selectedCombineData?: Array<SelectedPlayModel>): Map<string, number> => {
  const defaultMoney = UGStore.globalProps?.selectedLotteryModel?.inputMoney ?? 1
  const moneyMap = new Map<string, number>()

  selectedCombineData?.map((selModel) => {
    const key = selModel?.code
    switch (key) {
      case LhcCode.LMA://部分彩种 只计算 1条数据
      {
        const play0 = selModel?.plays[0]
        moneyMap[play0?.exId ?? play0?.id] = defaultMoney
      }

        break
      case LhcCode.HX://部分彩种 只计算 1条数据
      {
        const playX = zodiacPlayX(selModel)
        moneyMap[playX?.exId ?? playX?.id] = defaultMoney
      }

        break

      case LhcCode.ZXBZ://部分彩种 只计算 1条数据
      {
        const playX = playDataX(selModel)
        moneyMap[playX?.exId ?? playX?.id] = defaultMoney
      }

        break
      default:
        //选中的数据有多少组
        selModel?.plays?.map((playData) => {
          moneyMap[playData?.exId ?? playData?.id] = defaultMoney
        })

        break
    }

  })

  ugLog('moneyMap = ', JSON.stringify(moneyMap))
  return moneyMap
}


export {
  gatherSelectedItems,
  calculateItemCount,
  calculateActualItemCount,
  initItemMoney,
  checkBetCount,
}
