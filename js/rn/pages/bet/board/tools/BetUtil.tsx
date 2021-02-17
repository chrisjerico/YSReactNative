import { anyEmpty, arrayEmpty, arrayLength, dicNull } from '../../../../public/tools/Ext'
import { CqsscCode, LCode, LhcCode } from '../../const/LotteryConst'
import * as React from 'react'
import { ugError, ugLog } from '../../../../public/tools/UgLog'
import { UGStore } from '../../../../redux/store/UGStore'
import { zodiacPlayX } from './hx/BetHXUtil'
import { playDataX } from './zxbz/BetZXBZUtil'
import { Toast } from '../../../../public/tools/ToastUtils'
import { filterSelectedData, filterSelectedSubData, playDataUniqueId } from '../../util/LotteryUtil'
import {
  PlayData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { combination, combineArr } from '../../util/ArithUtil'
import { BetLotteryData } from '../../../../public/network/it/bet/IBetLotteryParams'
import { combineArrayName } from './ezdw/BetEZDWUtil'
import { BetShareModel, PlayNameArray } from '../../../../redux/model/game/bet/BetShareModel'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import moment from 'moment'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { currentPlayOddData, currentTabGroupData } from '../../util/select/ParseSelectedUtil'
import { parseLMASelectedData } from '../../util/select/lhc/ParseLMASelectedUtil'
import { parseHXSelectedData } from '../../util/select/lhc/ParseHXSelectedUtil'
import parseSBData from '../../util/parse/lhc/ParseSBDataUtil'
import parseYZDWData from '../../util/parse/cqssc/ParseYZDWDataUtil'
import { parseWXSelectedUtil } from '../../util/select/cqssc/ParseWXSelectedUtil'

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
  } as BetShareModel

  ugLog('filterShareItem betShareModel = ', exFlag, JSON.stringify(betShareModel))
  ugLog('filterShareItem newResult = ', exFlag, JSON.stringify(newResult))

  return newResult

}

/**
 * 准备下注数据, 生成选中的数据，为下注作准备
 * @param playOddData
 * @param selectedBalls
 */
const prepareSelectedBetData = (playOddData?: PlayOddData, selectedBalls?: Array<PlayData | ZodiacNum>) => {
  //生成选中的数据，为下注作准备
  const newSelectedModel = dicNull(UGStore.globalProps?.selectedData)
    ?
    new Map<string, Map<string, Map<string, SelectedPlayModel>>>()
    :
    JSON.parse(JSON.stringify(UGStore.globalProps?.selectedData))

  switch (playOddData?.code) {
    case LhcCode.HX://合肖
      newSelectedModel[playOddData?.code] = parseHXSelectedData(playOddData, selectedBalls)
      break
    default:
      newSelectedModel[playOddData?.code] = parseLMASelectedData(playOddData, selectedBalls)
      break
  }

  UGStore.dispatch({ type: 'reset', selectedData: newSelectedModel })

  ugLog('选中的数据 selectedBalls = ', JSON.stringify(selectedBalls))
  ugLog(`选中的数据 selectedData = ${playOddData?.name} ${playOddData?.code}`, JSON.stringify(UGStore.globalProps?.selectedData))
}

/**
 * 计算彩票下注时候，选中的条目数量是否符合要求
 *
 * @param showMsg 显示提示语
 */
const checkBetCount = (showMsg?: boolean): boolean => {
  const gameType = UGStore.globalProps?.playOddDetailData?.lotteryLimit?.gameType //彩种类别，六合彩 秒秒彩
  const curTabGroupData = currentTabGroupData() //当前界面
  const key = currentPlayOddData()?.code//只判断当前界面是否选中彩种即可
  const selectedData = UGStore.globalProps?.selectedData //选中的数据

  switch (key) {
    case LhcCode.WX:  //五行 或 五星
      if (gameType == LCode.lhc) { //五行
        const selCountMap = filterSelectedData(selectedData)
        if (selCountMap[key] <= 0) {
          showMsg && Toast('请选择玩法')
          return false
        }
      } else if (gameType == LCode.cqssc) { //五星
        for (let data of curTabGroupData) {
          const subAlias = data?.exPlays[0]?.alias
          const selCount = filterSelectedSubData(key, subAlias, selectedData)
          ugLog('selCount = ', selCount, key)
          switch (data?.alias) {
            case '单式':
              if (selCount < 1) {
                Toast(`请输入1个以上的数据`)
                return false
              }
              break
            case '复式':
              if (selCount < 1) {
                Toast(`请选择至少1个《${subAlias}》数据`)
                return false
              }
              break
            case '组选120':
              if (selCount != 5) {
                Toast(`请选择5个《${subAlias}》数据`)
                return false
              }
              break
            case '组选60':
              if (subAlias == '二重号') {
                if (selCount != 1) {
                  Toast(`请选择1个《${subAlias}》数据`)
                  return false
                }
              } else if (subAlias == '单号') {
                if (selCount != 3) {
                  Toast(`请选择3个《${subAlias}》数据`)
                  return false
                }
              }
              break
            case '组选30':
              if (subAlias == '二重号') {
                if (selCount != 2) {
                  Toast(`请选择2个《${subAlias}》数据`)
                  return false
                }
              } else if (subAlias == '单号') {
                if (selCount != 1) {
                  Toast(`请选择1个《${subAlias}》数据`)
                  return false
                }
              }
              break
            case '组选20':
              if (subAlias == '三重号') {
                if (selCount != 1) {
                  Toast(`请选择1个《${subAlias}》数据`)
                  return false
                }
              } else if (subAlias == '单号') {
                if (selCount != 2) {
                  Toast(`请选择2个《${subAlias}》数据`)
                  return false
                }
              }
              break
            case '组选10':
              if (subAlias == '三重号') {
                if (selCount != 1) {
                  Toast(`请选择1个《${subAlias}》数据`)
                  return false
                }
              } else if (subAlias == '二重号') {
                if (selCount != 1) {
                  Toast(`请选择1个《${subAlias}》数据`)
                  return false
                }
              }
              break
            case '组选5':
              if (subAlias == '四重号') {
                if (selCount != 1) {
                  Toast(`请选择1个《${subAlias}》数据`)
                  return false
                }
              } else if (subAlias == '单号') {
                if (selCount != 1) {
                  Toast(`请选择1个《${subAlias}》数据`)
                  return false
                }
              }
              break
          }
        }
      }
      break

    case LhcCode.LX: //连肖
    case LhcCode.LW: //连尾
    {
      for (let data of curTabGroupData) {
        const selCount = filterSelectedSubData(key, data?.alias, selectedData)
        ugLog('selCount = ', selCount, key, data?.alias)
        if (selCount <= 0) {
          Toast(`请选择${data?.alias}数据`)
          return false
        }
        switch (data?.alias) {
          case '二连肖':
          case '二连尾':
            if (selCount < 2) {
              Toast(`${data?.alias}需要选择至少2个数据`)
              return false
            }
            break
          case '三连肖':
          case '三连尾':
            if (selCount < 3) {
              Toast(`${data?.alias}需要选择至少3个数据`)
              return false
            }
            break
          case '四连肖':
          case '四连尾':
            if (selCount < 4) {
              Toast(`${data?.alias}需要选择至少4个数据`)
              return false
            }
            break
          case '五连肖':
          case '五连尾':
            if (selCount < 5) {
              Toast(`${data?.alias}需要选择至少5个数据`)
              return false
            }
            break

        }
      }
    }
      break

    case CqsscCode.EZDW:  //二字定位
    case CqsscCode.SZDW:  //三字定位
    {
      for (let data of curTabGroupData) {
        const selCount = filterSelectedSubData(key, data?.exPlays[0]?.alias, selectedData)
        ugLog('selCount = ', selCount, key, data?.exPlays[0]?.alias)
        if (selCount <= 0) {
          Toast(`请选择${data?.exPlays[0]?.alias}数据`)
          return false
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
      for (let data of curTabGroupData) {
        const selCount = filterSelectedSubData(key, data?.alias, selectedData)
        ugLog('selCount = ', selCount, key, data?.alias)
        if (selCount <= 0) {
          Toast(`请选择${data?.alias}数据`)
          return false
        }
        switch (data?.alias) {
          case '二全中':
          case '二中特':
          case '特串':
            if (selCount < 2) {
              Toast(`${data?.alias}需要选择至少2个数据`)
              return false
            }
            break
          case '三全中':
          case '三中二':
            if (selCount < 3) {
              Toast(`${data?.alias}需要选择至少3个数据`)
              return false
            }
            break
          case '四全中':
            if (selCount < 4) {
              Toast(`${data?.alias}需要选择至少4个数据`)
              return false
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
    default: {
      const selCountMap = filterSelectedData(selectedData)
      if (selCountMap[key] <= 0) {
        showMsg && Toast('请选择玩法')
        return false
      }
    }
      break
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
  const gameType = UGStore.globalProps?.playOddDetailData?.lotteryLimit?.gameType //彩种类别，六合彩 秒秒彩

  return Object.keys(selectedData).map((key) => {
    const value = selectedData[key]
    const pageData: Array<SelectedPlayModel> = Object.values(value).map((data) => Object.values(data)).flat(Infinity)
    const groupAlias = arrayEmpty(pageData) ? null : pageData[0]?.playGroups?.alias

    switch (true) {
      case key == LhcCode.LX://连肖
      case key == LhcCode.LW://连尾
        return pageData?.map((item) => {
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

      case key == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选120': //五星里的组选120
        return pageData?.map((item) => {
          const newPage: SelectedPlayModel = {
            ...item,
            plays: [{//只取第一个，其它的串联成名字就可以了
              ...item?.plays[0],
              name: item?.plays?.map((item) => item?.name).toString(),
            } as PlayData],
          }
          // ugLog('combineSelectedData newPage = ', key, JSON.stringify(newPage))
          return newPage
        })

      case key == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选60': //五星里的组选60
        //二重号复制2份，其它号码保留
        const newPlays120 = [...pageData[0]?.plays, ...pageData[0]?.plays, ...pageData[1]?.plays]

        return [{
          ...pageData[0],
          plays: [{//只取第一个，其它的串联成名字就可以了
            ...newPlays120,
            name: newPlays120?.map((item) => item?.name).toString(),
          } as PlayData],
        } as SelectedPlayModel]

      case key == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选30': //五星里的组选30
        //二重号复制2份，其它号码保留
        const newPlays60 = [...pageData[0]?.plays?.map((item) => [item, item]).flat(Infinity) as PlayData[], ...pageData[1]?.plays]

        return [{
          ...pageData[0],
          plays: [{//只取第一个，其它的串联成名字就可以了
            ...newPlays60,
            name: newPlays60?.map((item) => item?.name).toString(),
          } as PlayData],
        } as SelectedPlayModel]

      case key == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选20': //五星里的组选20
        //三重号复制3份，其它号码保留
        const newPlays20 = [...pageData[0]?.plays?.map((item) => [item, item, item]).flat(Infinity) as PlayData[], ...pageData[1]?.plays]

        return [{
          ...pageData[0],
          plays: [{//只取第一个，其它的串联成名字就可以了
            ...newPlays20,
            name: newPlays20?.map((item) => item?.name).toString(),
          } as PlayData],
        } as SelectedPlayModel]

      case key == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选10': //五星里的组选10
        //三重号复制3份，二重号复制2份
        const newPlays10 = [...pageData[0]?.plays?.map((item) => [item, item, item]).flat(Infinity) as PlayData[],
          ...pageData[1]?.plays?.map((item) => [item, item]).flat(Infinity) as PlayData[]]

        return [{
          ...pageData[0],
          plays: [{//只取第一个，其它的串联成名字就可以了
            ...newPlays10,
            name: newPlays10?.map((item) => item?.name).toString(),
          } as PlayData],
        } as SelectedPlayModel]

      case key == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选5': //五星里的组选5
        //四重号复制4份，其它号码保留
        const newPlays5 = [...pageData[0]?.plays?.map((item) => [item, item, item, item]).flat(Infinity) as PlayData[], ...pageData[1]?.plays]

        return [{
          ...pageData[0],
          plays: [{//只取第一个，其它的串联成名字就可以了
            ...newPlays5,
            name: newPlays5?.map((item) => item?.name).toString(),
          } as PlayData],
        } as SelectedPlayModel]

      case key == CqsscCode.EZDW: //二字定位
      case key == CqsscCode.SZDW: //三字定位
      case key == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '复式': //五星里的复式
        ugLog('combineSelectedData pageData 2 = ', key, JSON.stringify(pageData))
        if (arrayLength(pageData) > 1) { //二字定位有2组数据，三字定位有3组数据
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

        ugLog('combineSelectedData newArr 2 = ', key, JSON.stringify([pageData]))

        return [pageData]

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
  const gameType = UGStore.globalProps?.playOddDetailData?.lotteryLimit?.gameType //彩种类别，六合彩 秒秒彩

  const playNameArray: Array<PlayNameArray> = [] // 下注彩种条目名字 如特码B
  combinationData?.map((selModel, index) => {
    ugLog('pay board itemViewArr = ', selModel?.code, index)
    const key = selModel?.code
    const groupAlias = selModel?.playGroups?.alias

    switch (true) {
      case key == LhcCode.LX: //连肖
      case key == LhcCode.LW: //连尾
        selModel?.plays?.map((playData) => {
          playNameArray.push({
            playName1: groupAlias,
            playName2: playData?.alias,
            exFlag: playDataUniqueId(playData),
          } as PlayNameArray)
        })

        break

      case key == LhcCode.HX://合肖
        const zodiacX = zodiacPlayX(selModel)
        playNameArray.push({
          playName1: zodiacX?.alias,
          playName2: selModel?.zodiacs?.map((item) => item?.name)?.toString(),
          exFlag: playDataUniqueId(zodiacX),
        } as PlayNameArray)
        break

      case key == LhcCode.LMA:  //连码
        const play0 = selModel?.plays[0]

        playNameArray.push({
          playName1: groupAlias,
          playName2: combineArrayName(selModel).toString(),
          exFlag: playDataUniqueId(play0),
        } as PlayNameArray)
        break

      case key == LhcCode.ZXBZ:  //自选不中
        const playX = playDataX(selModel)
        playNameArray.push({
          playName1: playX?.alias,
          playName2: selModel?.zodiacs?.map((item) => item?.name)?.toString(),
          exFlag: playDataUniqueId(playX),
        } as PlayNameArray)
        break
      default:
        selModel?.plays?.map((playData) => {
          playNameArray.push({
            playName1: groupAlias,
            playName2: playData?.name,
            exFlag: playDataUniqueId(playData),
          } as PlayNameArray)
        })
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
  const gameType = UGStore.globalProps?.playOddDetailData?.lotteryLimit?.gameType //彩种类别，六合彩 秒秒彩

  const betBeanArray: Array<BetLotteryData> = [] //下注数据
  combinationData?.map((selModel) => {
    const key = selModel?.code
    const groupAlias = selModel?.playGroups?.alias

    switch (true) {
      case key == LhcCode.LX: //连肖
      case key == LhcCode.LW: //连尾
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

      case key == LhcCode.HX://合肖
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

      case key == LhcCode.LMA:  //连码
      {
        const groupPlay0 = selModel?.playGroups?.plays[0]
        const play0 = selModel?.plays[0]
        betBeanArray.push({
          money: inputMoney,
          playId: groupPlay0?.id,
          odds: '',//连码不需要传
          playIds: nextIssueData?.id,
          betInfo: combineArrayName(selModel).toString(),
          exFlag: playDataUniqueId(play0),
        } as BetLotteryData)
      }
        break

      case key == LhcCode.ZXBZ:  //自选不中
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

      case key == CqsscCode.YZDW:  //一字定位
      case key == CqsscCode.DWD:  //定位胆
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

      case key == CqsscCode.EZDW:  //二字定位
      case key == CqsscCode.SZDW:  //三字定位
      case key == LhcCode.WX && gameType == LCode.cqssc:  //五星
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
      default:
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
  prepareSelectedBetData,
}
