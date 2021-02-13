import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import { CqsscCode, LhcCode } from '../../const/LotteryConst'
import * as React from 'react'
import { ugError, ugLog } from '../../../../public/tools/UgLog'
import { UGStore } from '../../../../redux/store/UGStore'
import { zodiacPlayX } from './hx/BetHXUtil'
import { playDataX } from './zxbz/BetZXBZUtil'
import { Toast } from '../../../../public/tools/ToastUtils'
import { filterSelectedData, filterSelectedSubData, playDataUniqueId } from '../../util/LotteryUtil'
import { PlayData, PlayGroupData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { combination, combineArr } from '../../util/ArithUtil'
import { BetLotteryData } from '../../../../public/network/it/bet/IBetLotteryParams'
import { combineArrayName } from './ezdw/BetEZDWUtil'
import { BetShareModel, PlayNameArray } from '../../../../redux/model/game/bet/BetShareModel'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import moment from 'moment'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'

/**
 * 过滤出某个选中的数量
 * @param betShareModel //下注数据
 * @param exFlag 唯一标识
 */
const filterShareItem = (betShareModel?: BetShareModel, exFlag?: string): BetShareModel => {
  const newResult = {
    ...betShareModel,
    playNameArray: betShareModel?.playNameArray.filter((item) => item?.exFlag != exFlag),
    betBean: betShareModel?.betBean?.filter((item) => item?.exFlag != exFlag),
  }  as  BetShareModel

  ugLog('filterShareItem betShareModel = ', exFlag, JSON.stringify(betShareModel))
  ugLog('filterShareItem newResult = ', exFlag, JSON.stringify(newResult))

  return newResult

}

/**
 * 计算彩票下注时候，选中的条目数量是否符合要求
 *
 * @param showMsg 显示提示语
 */
const checkBetCount = (showMsg?: boolean): boolean => {
  const currentPlayOddData = UGStore.globalProps?.playOddDetailData.playOdds[UGStore.globalProps?.currentColumnIndex] //当前彩种
  const currentPlayGroupData = currentPlayOddData?.pageData?.groupTri[UGStore.globalProps?.lotteryTabIndex] //当前界面
  const selectedData = UGStore.globalProps?.selectedData //选中的数据
  const keys: Array<string> = selectedData ? Object.keys(selectedData) : null

  ugLog('UGStore.globalProps?.lotteryTabIndex = ', UGStore.globalProps?.lotteryTabIndex)
  // ugLog('currentPlayOddData?.pageData?.groupTri = ', JSON.stringify(currentPlayOddData?.pageData?.groupTri))
  // ugLog('currentPlayGroupData = ', JSON.stringify(currentPlayGroupData))
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
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
      {
        for (let data of currentPlayGroupData) {
          const selCount = filterSelectedSubData(key, data?.alias, selectedData)
          ugLog('selCount = ', selCount, key, data?.alias)
          if (selCount <= 0) {
            Toast(`请选择${data?.alias}数据`)
            return
          }
          switch (data?.alias) {
            case '二连肖':
            case '二连尾':
              if (selCount < 2) {
                Toast(`${data?.alias}需要选择至少2个数据`)
                return
              }
              break
            case '三连肖':
            case '三连尾':
              if (selCount < 3) {
                Toast(`${data?.alias}需要选择至少3个数据`)
                return
              }
              break
            case '四连肖':
            case '四连尾':
              if (selCount < 4) {
                Toast(`${data?.alias}需要选择至少4个数据`)
                return
              }
              break
            case '五连肖':
            case '五连尾':
              if (selCount < 5) {
                Toast(`${data?.alias}需要选择至少5个数据`)
                return
              }
              break

          }
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
        for (let data of currentPlayGroupData) {
          const selCount = filterSelectedSubData(key, data?.alias, selectedData)
          ugLog('selCount = ', selCount, key, data?.alias)
          if (selCount <= 0) {
            Toast(`请选择${data?.alias}数据`)
            return
          }
          switch (data?.alias) {
            case '二全中':
            case '二中特':
            case '特串':
              if (selCount < 2) {
                Toast(`${data?.alias}需要选择至少2个数据`)
                return
              }
              break
            case '三全中':
            case '三中二':
              if (selCount < 3) {
                Toast(`${data?.alias}需要选择至少3个数据`)
                return
              }
              break
            case '四全中':
              if (selCount < 4) {
                Toast(`${data?.alias}需要选择至少4个数据`)
                return
              }
              break

          }
        }
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
 * 重新组合下注数据，多维数据转一维数据
 * @param selectedData 选中的数据
 */
const combineSelectedData = (selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Array<SelectedPlayModel> => {
  return Object.keys(selectedData).map((key) => {
    const value = selectedData[key]
    switch (key) {
      case LhcCode.LX://连肖
      case LhcCode.LW://连尾
      {
        const pageData = (Object.values(value).map((data) => Object.values(data)).flat(Infinity) as Array<SelectedPlayModel>)
        ugLog('combineSelectedData pageData = ', key, JSON.stringify(pageData))
        const newArr = pageData?.map((item) => {
          const newPlays: Array<Array<PlayData>> = combination(item?.plays, item?.limitCount)
          const newPage: SelectedPlayModel = {
            ...item,
            plays: newPlays?.map((arr) => ({//只取第一个，其它的串联成名字就可以了
              ...arr[0],
              alias: arr?.map((item) => item?.alias).toString(),
              exPlayIds: arr?.map((item) => item?.id).toString(),
            } as PlayData)),
          }
          // ugLog('combineSelectedData newPage = ', key, JSON.stringify(newPage))
          return newPage
        })
        ugLog('combineSelectedData newArr = ', key, JSON.stringify(newArr))

        return newArr
      }

      case CqsscCode.EZDW: //二字定位
      case CqsscCode.SZDW: //三字定位
      {
        const pageData = (Object.values(value).map((data) => Object.values(data)).flat(Infinity) as Array<SelectedPlayModel>)
        ugLog('combineSelectedData pageData = ', key, JSON.stringify(pageData))
        if (arrayLength(pageData) > 1) { //二字定位有2页数据，三字定位有3组数据
          const newPlays: Array<Array<PlayData>> = combineArr(...pageData?.map((item) => item?.plays))
          const newPage: SelectedPlayModel = {
            ...pageData[0],
            plays: newPlays?.map((arr) => ({//只取第一个，其它的串联成名字就可以了
              ...arr[0],
              name: arr?.map((item) => item?.name).toString(),
            } as PlayData)),
          }
          // ugLog('combineSelectedData newPage = ', key, JSON.stringify(newPage))
          return newPage

        }
        ugLog('combineSelectedData newArr = ', key, JSON.stringify([pageData]))

        return [pageData]
      }

      default:
        return gatherSelectedItems(key, selectedData)
    }
  }).flat(Infinity) as Array<SelectedPlayModel>
}

/**
 * 根据选中的数据，计算并组合出 下注栏目的名字选项
 * @param nextIssueData 下期数据
 * @param combinationData 重新组合的下注数据
 */
const generateBetNameArray = (nextIssueData?: NextIssueData,
                              combinationData?: Array<SelectedPlayModel>): Array<PlayNameArray> => {

  const playNameArray: Array<PlayNameArray> = [] // 下注彩种条目名字 如特码B
  combinationData?.map((selModel, index) => {
    ugLog('pay board itemViewArr = ', selModel?.code, index)
    switch (selModel?.code) {
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
        selModel?.plays?.map((playData) => {
          playNameArray.push({
            playName1: playData?.alias,
            playName2: playData?.name,
            exFlag: playDataUniqueId(playData),
          } as PlayNameArray)
        })
        break

      case CqsscCode.EZDW:  //二字定位
      case CqsscCode.SZDW:  //三字定位
        selModel?.plays?.map((playData) => {
          playNameArray.push({
            playName1: playData?.alias,
            playName2: playData?.name,
            exFlag: playDataUniqueId(playData),
          } as PlayNameArray)
        })
        break
      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
        selModel?.plays?.map((playData) => {
          playNameArray.push({
            playName2: playData?.alias,
            exFlag: playDataUniqueId(playData),
          } as PlayNameArray)
        })
        break

      case LhcCode.HX://合肖
      {
        const zodiacX = zodiacPlayX(selModel)
        playNameArray.push({
          playName1: zodiacX?.alias,
          playName2: selModel?.zodiacs?.map((item) => item?.name)?.toString(),
          exFlag: playDataUniqueId(zodiacX),
        } as PlayNameArray)
      }
        break

      case LhcCode.LMA:  //连码
      {
        const play0 = selModel?.plays[0]

        playNameArray.push({
          playName1: play0?.alias,
          playName2: combineArrayName(selModel).toString(),
          exFlag: playDataUniqueId(play0),
        } as PlayNameArray)
      }
        break

      case LhcCode.ZXBZ:  //自选不中
      {
        const playX = playDataX(selModel)
        playNameArray.push({
          playName1: playX?.alias,
          playName2: selModel?.zodiacs?.map((item) => item?.name)?.toString(),
          exFlag: playDataUniqueId(playX),
        } as PlayNameArray)
      }
        break
    }

  })

  ugLog('playNameArray = ', JSON.stringify(playNameArray))

  return playNameArray
}


/**
 * 根据选中的数据，计算并组合出 下注信息
 * @param nextIssueData 下期数据
 * @param inputMoney 下注金额
 * @param combinationData 重新组合的下注数据
 */
const generateBetInfoArray = (nextIssueData?: NextIssueData,
                              inputMoney?: string,
                              combinationData?: Array<SelectedPlayModel>): Array<BetLotteryData> => {

  const betBeanArray: Array<BetLotteryData> = [] //下注数据
  combinationData?.map((selModel) => {
    switch (selModel?.code) {
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
        selModel?.plays?.map((playData) => {
          betBeanArray.push({
            money: inputMoney,
            odds: playData?.odds,
            playId: playData?.id,
            playIds: nextIssueData?.id,
            exFlag: playDataUniqueId(playData),
          } as BetLotteryData)
        })
        break

      case LhcCode.LX: //连肖
      case LhcCode.LW: //连尾
        selModel?.plays?.map((playData) => {
          betBeanArray.push({
            money: inputMoney,
            odds: playData?.odds,
            playId: playData?.id,
            playIds: playData?.exPlayIds,
            betInfo: playData?.alias,
            exFlag: playDataUniqueId(playData),
          } as BetLotteryData)
        })
        break

      case LhcCode.HX://合肖
      {
        const zodiacX = zodiacPlayX(selModel)
        betBeanArray.push({
          money: inputMoney,
          playId: zodiacX?.id,
          odds: zodiacX?.odds,
          betInfo: selModel?.zodiacs?.map((item) => item?.name).toString(),
          exFlag: playDataUniqueId(zodiacX),
        } as BetLotteryData)
      }
        break

      case LhcCode.LMA:  //连码
      {
        const groupPlay0 = selModel?.playGroups?.plays[0]
        const play0 = selModel?.plays[0]
        betBeanArray.push({
          money: inputMoney,
          playId: groupPlay0?.id,
          playIds: nextIssueData?.id,
          betInfo: combineArrayName(selModel).toString(),
          exFlag: playDataUniqueId(play0),
        } as BetLotteryData)
      }
        break

      case LhcCode.ZXBZ:  //自选不中
      {
        const playX = playDataX(selModel)
        betBeanArray.push({
          money: inputMoney,
          odds: playX?.odds,
          playId: playX?.id,
          betInfo: combineArrayName(selModel).toString(),
          exFlag: playDataUniqueId(playX),
        } as BetLotteryData)
      }
        break

      case CqsscCode.YZDW:  //一字定位
      {
        const play0 = selModel?.playGroups?.plays[0]
        selModel?.plays?.map((playData) => {
          betBeanArray.push({
            money: inputMoney,
            playId: play0?.id,
            odds: play0?.odds,
            playIds: nextIssueData?.id,
            betInfo: playData?.name,
            exFlag: playDataUniqueId(playData),
          } as BetLotteryData)
        })
      }
        break

      case CqsscCode.EZDW:  //二字定位
      case CqsscCode.SZDW:  //三字定位
      {
        const groupPlay0 = selModel?.playGroups?.plays[0]
        const play0 = selModel?.playGroups?.plays[0]
        selModel?.plays?.map((playData) => {
          betBeanArray.push({
            money: inputMoney,
            playId: groupPlay0?.id,
            odds: play0?.odds,
            betInfo: playData?.name,
            exFlag: playDataUniqueId(playData),
          } as BetLotteryData)
        })
      }
        break
    }
  })

  ugLog('betBeanArray =', JSON.stringify(betBeanArray))

  return betBeanArray
}


/**
 * 根据选中的数据，计算并组合出 下注所需要的数据结构
 * @param nextIssueData 下期数据
 * @param activeReturnCoinRatio 退水
 * @param inputMoney 下注金额
 * @param selectedData 选中的数据
 */
const generateBetArray = (nextIssueData?: NextIssueData,
                          activeReturnCoinRatio?: string,
                          inputMoney?: string,
                          selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): BetShareModel => {

  const combinationData = combineSelectedData(selectedData)
  const playNameArray = generateBetNameArray(nextIssueData, combinationData)
  const betBeanArray = generateBetInfoArray(nextIssueData, inputMoney, combinationData)

  arrayLength(playNameArray) != arrayLength(betBeanArray) && ugError('警告错误数据 playNameArray与betBeanArray 长度应一致')

  const newData = {
    ftime: (moment(nextIssueData?.curCloseTime).toDate().getTime() / 1000).toString(),
    singleAmount: inputMoney,
    isInstant: nextIssueData?.isInstant,
    activeReturnCoinRatio: activeReturnCoinRatio,
    turnNum: nextIssueData?.curIssue,
    issue_displayNumber: nextIssueData?.displayNumber,
    gameName: nextIssueData?.title,
    gameId: nextIssueData?.id,
    playNameArray: playNameArray,
    betBean: betBeanArray,
  } as BetShareModel

  ugLog('下注数据 newData =', JSON.stringify(newData))

  return newData
}

export {
  gatherSelectedItems,
  calculateActualItemCount,
  checkBetCount,
  combineSelectedData,
  generateBetArray,
  filterShareItem,
}
