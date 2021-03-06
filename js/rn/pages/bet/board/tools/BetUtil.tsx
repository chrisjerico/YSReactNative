import { anyEmpty, arrayEmpty, arrayLength, dicNull } from '../../../../public/tools/Ext'
import { CqsscCode, FC3d, LCode, LhcCode, Pk10Code, SingleOption } from '../../const/LotteryConst'
import * as React from 'react'
import { ugError, ugLog } from '../../../../public/tools/UgLog'
import { UGStore } from '../../../../redux/store/UGStore'
import { zodiacPlayX } from './hx/BetHXUtil'
import { playDataX } from './zxbz/BetZXBZUtil'
import { Toast } from '../../../../public/tools/ToastUtils'
import {
  filterSelectedDataCount,
  filterSelectedSubCount, filterSelectedSubMap,
  playDataUniqueId,
  subCountOfSelectedBalls,
} from '../../util/LotteryUtil'
import { PlayData, PlayOddData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { combineArr, combineArray } from '../../util/ArithUtil'
import { BetLotteryData } from '../../../../public/network/it/bet/IBetLotteryParams'
import { combineArrayName } from './ezdw/BetEZDWUtil'
import { BetShareModel, PlayNameArray } from '../../../../redux/model/game/bet/BetShareModel'
import { NextIssueData } from '../../../../public/network/Model/lottery/NextIssueModel'
import moment from 'moment'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { currentPlayOddData, currentTabGroupData } from '../../util/select/ParseSelectedUtil'
import { parseLMASelectedData } from '../../util/select/lhc/ParseLMASelectedUtil'
import { parseHXSelectedData } from '../../util/select/lhc/ParseHXSelectedUtil'
import { showHintToast } from '../../../../public/tools/StringUtil'

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
 * 计算点击选择时候，选中的条目数量是否符合要求
 *
 * @param ballData 这次点击的球
 * @param playOddData 当前彩种
 * @param selectedBalls 当前彩种选中的球
 *
 * return true 可以选择, false 不能再选择了
 */
const checkClickCount = (ballData?: PlayData | ZodiacNum, playOddData?: PlayOddData, selectedBalls?: Array<PlayData | ZodiacNum>): boolean => {
  const gameType = UGStore.globalProps?.playOddDetailData?.game?.gameType //彩种类别，六合彩 秒秒彩
  const selCount = arrayLength(selectedBalls) //总共选中的数据
  const gameCode = playOddData?.code
  const subAlias = ballData?.alias
  const groupData = currentTabGroupData() //当前的页数据
  const groupAlias = groupData[0]?.alias

  switch (true) {
    case gameCode == LhcCode.HX:  //合肖 最多只能选中11个
      if (selCount > 10) return
      break
    case gameCode == LhcCode.ZXBZ:  //自选不中 最多只能选中12个
      if (selCount > 11) return
      break
    case gameCode == LhcCode.LMA:  //连码
      switch (groupAlias) {
        case '二中二':
          if (selCount >= 2) return
          break
        case '三中三':
          if (selCount >= 3) return
          break
        case '四中四':
          if (selCount >= 4) return
          break
        case '任选四':
        case '任选五':
        case '五中五':
        case '前二组选':
        case '前三组选':
          if (selCount >= 5) return
          break
        case '六中五':
          if (selCount >= 6) return
          break
        case '任选二':
        case '选二连组':
        case '任选三':
        case '选三前组':
        case '七中五':
          if (selCount >= 7) return
          break
        case '八中五':
          if (selCount >= 8) return
          break
      }

      break
    case gameCode == LhcCode.WX && gameType == LCode.cqssc:  // 五星
      switch (groupAlias) {
        case '组选120':
          if (selCount >= 5) return
          break
        case '组选60':
          if (subAlias == '二重号') {
            if (subCountOfSelectedBalls('二重号', selectedBalls) >= 1) {
              return
            }
          } else if (subAlias == '单号') {
            if (subCountOfSelectedBalls('单号', selectedBalls) >= 3) {
              return
            }
          }
          break
        case '组选30':
          if (subAlias == '二重号') {
            if (subCountOfSelectedBalls('二重号', selectedBalls) >= 2) {
              return
            }
          } else if (subAlias == '单号') {
            if (subCountOfSelectedBalls('单号', selectedBalls) >= 1) {
              return
            }
          }
          break
        case '组选20':
          if (subAlias == '三重号') {
            if (subCountOfSelectedBalls('三重号', selectedBalls) >= 1) {
              return
            }
          } else if (subAlias == '单号') {
            if (subCountOfSelectedBalls('单号', selectedBalls) >= 2) {
              return
            }
          }
          break
        case '组选10':
          if (subAlias == '三重号') {
            if (subCountOfSelectedBalls('三重号', selectedBalls) >= 1) {
              return
            }
          } else if (subAlias == '二重号') {
            if (subCountOfSelectedBalls('二重号', selectedBalls) >= 1) {
              return
            }
          }
          break
        case '组选5':
          if (subAlias == '四重号') {
            if (subCountOfSelectedBalls('四重号', selectedBalls) >= 1) {
              return
            }
          } else if (subAlias == '单号') {
            if (subCountOfSelectedBalls('单号', selectedBalls) >= 1) {
              return
            }
          }
          break
      }


      break
    case gameCode == Pk10Code.GFWF:  //官方玩法
      const tabAlias = groupAlias //当前tab的名字

      switch (tabAlias) {
        case '猜冠军':
          if (selCount >= 1)  return
          break
        case '猜前二':
        case '猜前三':
          if (subAlias == '单式') {
            const numberSingle = subCountOfSelectedBalls('单式', selectedBalls)
            if (tabAlias == '猜前二' && numberSingle >= 2) {
              return
            } else if (tabAlias == '猜前三' && numberSingle >= 3) {
              return
            }
          } else {
            const selFS1 = selectedBalls?.filter((item) => item?.alias == '冠军') //复式冠军选择了哪些
            const selFS2 = selectedBalls?.filter((item) => item?.alias == '亚军') //复式亚军选择了哪些
            const selFS3 = selectedBalls?.filter((item) => item?.alias == '季军') //复式季军选择了哪些
            if (subAlias?.startsWith('冠军')) {
              if (selFS2?.find((item) => item?.name == ballData?.name)
                || selFS3?.find((item) => item?.name == ballData?.name)) {//不能选择重复的号
                Toast('不能选择相同的号码')
                return
              }
            } else if (subAlias?.startsWith('亚军')) {
              if (selFS1?.find((item) => item?.name == ballData?.name)
                || selFS3?.find((item) => item?.name == ballData?.name)) {//不能选择重复的号
                Toast('不能选择相同的号码')
                return
              }
            } else if (subAlias?.startsWith('季军')) {
              if (selFS1?.find((item) => item?.name == ballData?.name)
                || selFS2?.find((item) => item?.name == ballData?.name)) {//不能选择重复的号
                Toast('不能选择相同的号码')
                return
              }
            }
          }
          break
        case '猜前四':
          if (selCount >= 4) return
          break
        case '猜前五':
          if (selCount >= 5) return
          break
      }

      break
    case gameCode == LhcCode.ZX && gameType == LCode.gd11x5:  //广东11x5直选
    {
      const selFS1 = selectedBalls?.filter((item) => item?.alias == '第一球') //复式第一球选择了哪些
      const selFS2 = selectedBalls?.filter((item) => item?.alias == '第二球') //复式第二球选择了哪些
      const selFS3 = selectedBalls?.filter((item) => item?.alias == '第三球') //复式第三球选择了哪些
      if (subAlias?.startsWith('第一球')) {
        if (selFS2?.find((item) => item?.name == ballData?.name)
          || selFS3?.find((item) => item?.name == ballData?.name)) {//不能选择重复的号
          Toast('不能选择相同的号码')
          return
        }
      } else if (subAlias?.startsWith('第二球')) {
        if (selFS1?.find((item) => item?.name == ballData?.name)
          || selFS3?.find((item) => item?.name == ballData?.name)) {//不能选择重复的号
          Toast('不能选择相同的号码')
          return
        }
      } else if (subAlias?.startsWith('第三球')) {
        if (selFS1?.find((item) => item?.name == ballData?.name)
          || selFS2?.find((item) => item?.name == ballData?.name)) {//不能选择重复的号
          Toast('不能选择相同的号码')
          return
        }
      }
    }

      break
    case gameCode == FC3d.DWD && gameType == LCode.fc3d:  //福彩3d 定位胆
    {
      if (groupAlias == '组选3') {
        const selFS1 = selectedBalls?.filter((item) => item?.alias == '二重号') //二重号选择了哪些
        const selFS2 = selectedBalls?.filter((item) => item?.alias == '单号') //单号选择了哪些
        if (subAlias?.startsWith('二重号')) {
          if (selFS2?.find((item) => item?.name == ballData?.name)) {//不能选择重复的号
            Toast('不能选择相同的号码')
            return
          }

          if (subCountOfSelectedBalls('二重号', selectedBalls) >= 1) {
            return
          }
        } else if (subAlias?.startsWith('单号')) {
          if (selFS1?.find((item) => item?.name == ballData?.name)) {//不能选择重复的号
            Toast('不能选择相同的号码')
            return
          }

          if (subCountOfSelectedBalls('单号', selectedBalls) >= 1) {
            return
          }
        }
      } else if (groupAlias == '组选6') {
        if (selCount >= 3) {
          return
        }
      }
    }

      break

  }

  return true
}

/**
 * 越南彩选中了多少个
 */
const vietnamSelectedCount = (): number => {
  //选中的条目，如 {'TM' -> {}, 'TM2' -> {}}
  const gameCode = currentPlayOddData()?.code
  const gameAlias = currentTabGroupData()[0]?.alias
  const mapData = filterSelectedSubMap(gameCode, gameAlias, UGStore.globalProps?.selectedData)

  //选中的条目，如 [[1,2], [3,4]]
  const pageArr = dicNull(mapData) ? null : (Object.values(mapData) as SelectedPlayModel[]).map((item) => item.plays)

  const flatArr = pageArr?.flat(Infinity) as PlayData[] //转一维数组
  if (!arrayEmpty(flatArr) && flatArr[0]?.exFast) {//快速生成的数据，一个算一条，不用交叉计算，比如 宝路 -> 批号2 -> 快速选择
    return arrayLength(flatArr)
  }

  //计算组合的数量
  const newArr = dicNull(pageArr) ? null : combineArr(...pageArr)

  //每个条目都需要选数据，才计算，比如 批号2 十 个 都选择了数据
  if (arrayLength(pageArr) == arrayLength(currentTabGroupData())) {
    return arrayLength(newArr)
  }

  return 0
}


/**
 * 计算彩票下注时候，选中的条目数量是否符合要求
 *
 * return true 可以下注，false 不能再下注了
 */
const checkBetCount = (): boolean => {
  const gameType = UGStore.globalProps?.playOddDetailData?.game?.gameType //彩种类别，六合彩 秒秒彩
  const singleTabIndex = UGStore.globalProps?.singleTabIndex //当前的彩种处于TAB的单式还是复式
  const curTabGroupData = currentTabGroupData() //当前界面
  const gameCode = currentPlayOddData()?.code//只判断当前界面是否选中彩种即可
  const selectedData = UGStore.globalProps?.selectedData //选中的数据

  switch (true) {
    case gameType == LCode.ofclvn_hochiminhvip || gameType == LCode.ofclvn_haboivip:  // 越南彩
      const vieCount = vietnamSelectedCount()
      if(vieCount < 1) {
        showHintToast(1, curTabGroupData[0]?.alias)
        return false
      }

      break

    case gameCode == LhcCode.WX && gameType == LCode.cqssc:  //五星
      for (let data of curTabGroupData) {
        const subAlias = data?.exPlays[0]?.alias
        const groupAlias = data?.alias
        const selCount = filterSelectedSubCount(gameCode, subAlias, selectedData)
        ugLog('selCount = ', selCount, gameCode)

        switch (groupAlias) {
          case '单式':
            if (selCount < 1) {
              showHintToast(1, groupAlias)
              return false
            }
            break
          case '复式':
            if (selCount < 1) {
              showHintToast(1, subAlias)
              return false
            }
            break
          case '组选120':
            if (selCount != 5) {
              showHintToast(5, subAlias)
              return false
            }
            break
          case '组选60':
            if (subAlias == '二重号') {
              if (selCount != 1) {
                showHintToast(1, subAlias)
                return false
              }
            } else if (subAlias == '单号') {
              if (selCount != 3) {
                showHintToast(3, subAlias)
                return false
              }
            }
            break
          case '组选30':
            if (subAlias == '二重号') {
              if (selCount != 2) {
                showHintToast(2, subAlias)
                return false
              }
            } else if (subAlias == '单号') {
              if (selCount != 1) {
                showHintToast(1, subAlias)
                return false
              }
            }
            break
          case '组选20':
            if (subAlias == '三重号') {
              if (selCount != 1) {
                showHintToast(1, subAlias)
                return false
              }
            } else if (subAlias == '单号') {
              if (selCount != 2) {
                showHintToast(2, subAlias)
                return false
              }
            }
            break
          case '组选10':
            if (subAlias == '三重号') {
              if (selCount != 1) {
                showHintToast(1, subAlias)
                return false
              }
            } else if (subAlias == '二重号') {
              if (selCount != 1) {
                showHintToast(1, subAlias)
                return false
              }
            }
            break
          case '组选5':
            if (subAlias == '四重号') {
              if (selCount != 1) {
                showHintToast(1, subAlias)
                return false
              }
            } else if (subAlias == '单号') {
              if (selCount != 1) {
                showHintToast(1, subAlias)
                return false
              }
            }
            break
        }
      }

      break

    case gameCode == Pk10Code.GFWF:  //官方玩法
      for (let [key, value] of curTabGroupData?.entries()) {
        const subAlias = value?.exPlays[0]?.alias
        const selCount = filterSelectedSubCount(gameCode, subAlias, selectedData)
        ugLog('selCount = ', selCount, gameCode)
        const tabAlias = value?.alias //当前tab的名字

        switch (tabAlias) {
          case '猜冠军':
            if (selCount < 1) {
              showHintToast(1, subAlias)
              return false
            }
            break
          case '猜前二':
          case '猜前三':
            if (singleTabIndex == SingleOption.SINGLE && key == 0) {//单式只考虑第1组数据，23为 冠亚季军
              if (tabAlias == '猜前二' && selCount < 2) {
                showHintToast(2, subAlias)
                return false
              } else if (tabAlias == '猜前三' && selCount < 3) {
                showHintToast(3, subAlias)
                return false
              }
            } else if (singleTabIndex == SingleOption.COMPLEX && key > 0) {//复式不考虑第1组数据，234为 冠亚季军
              if (selCount < 1) {
                showHintToast(1, subAlias)
                return false
              } else {

              }
            }
            break
        }
      }

      break


    case gameCode == LhcCode.LX: //连肖
    case gameCode == LhcCode.LW: //连尾
    {
      for (let data of curTabGroupData) {
        const subAlias = data?.alias
        const selCount = filterSelectedSubCount(gameCode, subAlias, selectedData)
        ugLog('selCount = ', selCount, gameCode, subAlias)
        if (selCount <= 0) {
          showHintToast()
          return false
        }
        switch (subAlias) {
          case '二连肖':
          case '二连尾':
            if (selCount < 2) {
              showHintToast(2, subAlias)
              return false
            }
            break
          case '三连肖':
          case '三连尾':
            if (selCount < 3) {
              showHintToast(3, subAlias)
              return false
            }
            break
          case '四连肖':
          case '四连尾':
            if (selCount < 4) {
              showHintToast(4, subAlias)
              return false
            }
            break
          case '五连肖':
          case '五连尾':
            if (selCount < 5) {
              showHintToast(5, subAlias)
              return false
            }
            break

        }
      }
    }
      break

    case gameCode == CqsscCode.EZDW:  //二字定位
    case gameCode == CqsscCode.SZDW:  //三字定位
    case gameCode == FC3d.EZ:  //二字
    case gameCode == LhcCode.ZX && gameType == LCode.gd11x5:  //广东11x5直选
    {
      for (let data of curTabGroupData) {
        const rowAlias = data?.exPlays[0]?.alias //小类标题，如 二字定位下面的 万定位
        const selCount = filterSelectedSubCount(gameCode, rowAlias, selectedData)
        ugLog('selCount = ', selCount, gameCode, rowAlias)
        if (selCount <= 0) {
          showHintToast()
          return false
        }
      }
    }
      break

    case gameCode == FC3d.DWD && gameType == LCode.fc3d:  //福彩3D里面的定位胆
      for (let data of curTabGroupData) {
        const subAlias = data?.alias
        const rowAlias = data?.exPlays[0]?.alias //小类标题，如 二字定位下面的 万定位
        const selCount = filterSelectedSubCount(gameCode, rowAlias, selectedData)
        ugLog('selCount = ', selCount, gameCode, rowAlias)
        if (selCount <= 0) {
          showHintToast()
          return false
        }

        switch (subAlias) {
          case '组选3复式':
            if (selCount < 2) {
              showHintToast(2, subAlias)
              return false
            }
            break
          case '组选6':
            if (selCount < 3) {
              showHintToast(3, subAlias)
              return false
            }
            break
          case '组选6复式':
            if (selCount < 3) {
              showHintToast(3, subAlias)
              return false
            }
            break
        }
      }

      break

    case gameCode == LhcCode.HX://合肖
    {
      const selCountMap = filterSelectedDataCount(selectedData)
      if (selCountMap[gameCode] <= 1) {
        showHintToast(2, '合肖')
        return false
      }
    }
      break
    case gameCode == LhcCode.LMA:  //连码
      for (let data of curTabGroupData) {
        const subAlias = data?.alias
        const selCount = filterSelectedSubCount(gameCode, subAlias, selectedData)
        ugLog('selCount = ', selCount, gameCode, subAlias)
        if (selCount <= 0) {
          showHintToast()
          return false
        }
        switch (subAlias) {
          case '任选二':
          case '选二连组':
          case '二中二':
          case '二全中':
          case '二中特':
          case '特串':
            if (selCount < 2) {
              showHintToast(2, subAlias)
              return false
            }
            break
          case '任选三':
          case '选三前组':
          case '三中三':
          case '三全中':
          case '三中二':
            if (selCount < 3) {
              showHintToast(3, subAlias)
              return false
            }
            break
          case '任选四':
          case '四中四':
          case '四全中':
            if (selCount < 4) {
              showHintToast(4, subAlias)
              return false
            }
            break
          case '任选五':
          case '五中五':
          case '前二组选':
          case '前三组选':
            if (selCount < 5) {
              showHintToast(5, subAlias)
              return false
            }
            break
          case '六中五':
            if (selCount < 6) {
              showHintToast(6, subAlias)
              return false
            }
            break
          case '七中五':
            if (selCount < 7) {
              showHintToast(7, subAlias)
              return false
            }
            break
          case '八中五':
            if (selCount < 8) {
              showHintToast(8, subAlias)
              return false
            }
            break
          default:
            if (selCount < 3) {
              showHintToast(3, subAlias)
              return false
            }
            break

        }
      }
      break

    case gameCode == LhcCode.ZXBZ:  //自选不中
    {
      const selCountMap = filterSelectedDataCount(selectedData)
      if (selCountMap[gameCode] < 5) {
        Toast('自选不中请选择5到12个选项')
        return false
      }
    }
      break
    default: {
      const selCountMap = filterSelectedDataCount(selectedData)
      if (selCountMap[gameCode] <= 0) {
        showHintToast()
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
  const gameType = UGStore.globalProps?.playOddDetailData?.game?.gameType //彩种类别，六合彩 秒秒彩
  const singleTabIndex = UGStore.globalProps?.singleTabIndex //当前的彩种处于TAB的单式还是复式

  return Object.keys(selectedData).map((gameCode) => {
    const value = selectedData[gameCode]
    const pageData: Array<SelectedPlayModel> = Object.values(value).map((data) => Object.values(data)).flat(Infinity)
    const groupAlias = arrayEmpty(pageData) ? null : pageData[0]?.playGroups?.alias

    switch (true) {
      case gameType == LCode.ofclvn_hochiminhvip || gameType == LCode.ofclvn_haboivip: // 越南彩
        if (pageData[0]?.vieSelectFastly) {//快速选择
          const viePlays = [pageData[0].plays] //只有一组数据 [[11, 22, 33]]
          const newPlays: Array<Array<PlayData>> = viePlays[0].map((item) => [item])//重组后的新数据 [[11],[22],[33]]

          const newPage: SelectedPlayModel = {
            ...pageData[0],
            viePlays: viePlays,
            plays: newPlays?.map((arr) => ({//只取第一个，其它的串联成名字就可以了
              ...arr[0],
              name: arr?.map((item) => item?.name).join(';'),
            } as PlayData)),
          }
          return newPage

        }

        //选择号码
        const viePlays = pageData?.map((item) => item?.plays) //原来的数据有几组，[[0,4],[7,8]]
        const newPlays: Array<Array<PlayData>> = combineArr(...viePlays)//重组后的新数据 [[0,7],[0,8],[4,7],[4,8]]

        const newPage: SelectedPlayModel = {
          ...pageData[0],
          viePlays: viePlays,
          plays: newPlays?.map((arr) => ({//只取第一个，其它的串联成名字就可以了
            ...arr[0],
            name: arr?.map((item) => item?.name).join('|'), //最后生成的组合情况 0|1, 2|2, 2|5
          } as PlayData)),
        }
        return newPage

      case gameCode == LhcCode.LX://连肖
      case gameCode == LhcCode.LW://连尾
        return pageData?.map((item) => {
          const newPlays: Array<Array<PlayData>> = combineArray(item?.plays, item?.limitCount)
          const newPage: SelectedPlayModel = {
            ...item,
            plays: newPlays?.map((arr) => ({//只取第一个，其它的串联成名字就可以了
              ...arr[0],
              alias: arr?.map((item) => item?.alias).toString(),
              exPlayIds: arr?.map((item) => item?.id).toString(),
            } as PlayData)),
          }
          // ugLog('combineSelectedData newPage = ', gameCode, JSON.stringify(newPage))
          return newPage
        })

      /** ------ */
      case gameCode == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选60': //五星里的组选60
      case gameCode == FC3d.DWD && gameType == LCode.fc3d && groupAlias == '组选3': //福彩3D 定位胆
        //二重号复制2份，其它号码保留
        const newPlays60 = [...pageData[0]?.plays, ...pageData[0]?.plays, ...pageData[1]?.plays]

        return [{
          ...pageData[0],
          plays: [{//只取第一个，其它的串联成名字就可以了
            ...newPlays60,
            name: newPlays60?.map((item) => item?.name).toString(),
          } as PlayData],
        } as SelectedPlayModel]

      /** ------ */
      case gameCode == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选30': //五星里的组选30
        //二重号复制2份，其它号码保留
        const newPlays30 = [...pageData[0]?.plays?.map((item) => [item, item]).flat(Infinity) as PlayData[], ...pageData[1]?.plays]

        return [{
          ...pageData[0],
          plays: [{//只取第一个，其它的串联成名字就可以了
            ...newPlays30,
            name: newPlays30?.map((item) => item?.name).toString(),
          } as PlayData],
        } as SelectedPlayModel]

      /** ------ */
      case gameCode == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选20': //五星里的组选20
        //三重号复制3份，其它号码保留
        const newPlays20 = [...pageData[0]?.plays?.map((item) => [item, item, item]).flat(Infinity) as PlayData[], ...pageData[1]?.plays]

        return [{
          ...pageData[0],
          plays: [{//只取第一个，其它的串联成名字就可以了
            ...newPlays20,
            name: newPlays20?.map((item) => item?.name).toString(),
          } as PlayData],
        } as SelectedPlayModel]

      /** ------ */
      case gameCode == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选10': //五星里的组选10
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

      /** ------ */
      case gameCode == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选5': //五星里的组选5
        //四重号复制4份，其它号码保留
        const newPlays5 = [...pageData[0]?.plays?.map((item) => [item, item, item, item]).flat(Infinity) as PlayData[], ...pageData[1]?.plays]

        return [{
          ...pageData[0],
          plays: [{//只取第一个，其它的串联成名字就可以了
            ...newPlays5,
            name: newPlays5?.map((item) => item?.name).toString(),
          } as PlayData],
        } as SelectedPlayModel]

      /** ------ */
      case gameCode == CqsscCode.EZDW: //二字定位
      case gameCode == CqsscCode.SZDW: //三字定位
      case gameCode == FC3d.EZ:  //二字
      case gameCode == FC3d.DWD && gameType == LCode.fc3d && groupAlias == '复式': //福彩3D 定位胆
      case gameCode == LhcCode.ZX && gameType == LCode.gd11x5:  //广东11x5直选
      case gameCode == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '复式': //五星里的复式
      case gameCode == Pk10Code.GFWF && gameType == LCode.pk10 && singleTabIndex == SingleOption.COMPLEX: //官方玩法 复式
        //ugLog('combineSelectedData pageData 2 = ', gameCode, JSON.stringify(pageData))
        if (arrayLength(pageData) > 1) { //至少2组数据，二字定位有2组数据，三字定位有3组数据
          const newPlays: Array<Array<PlayData>> = combineArr(...pageData?.map((item) => item?.plays))
          const newPage: SelectedPlayModel = {
            ...pageData[0],
            plays: newPlays?.map((arr) => ({//只取第一个，其它的串联成名字就可以了
              ...arr[0],
              name: arr?.map((item) => item?.name).toString(),
            } as PlayData)),
          }
          // ugLog('combineSelectedData newPage = ', gameCode, JSON.stringify(newPage))
          return newPage
        }

        //ugLog('combineSelectedData newArr 2 = ', gameCode, JSON.stringify([pageData]))

        return [pageData]

      /** ------ */
      default:
        return gatherSelectedItems(gameCode, selectedData)
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
  const gameType = UGStore.globalProps?.playOddDetailData?.game?.gameType //彩种类别，六合彩 秒秒彩
  const singleTabIndex = UGStore.globalProps?.singleTabIndex //当前的彩种处于TAB的单式还是复式

  const playNameArray: Array<PlayNameArray> = [] // 下注彩种条目名字 如特码B
  combinationData?.map((selModel, index) => {
    ugLog('pay board itemViewArr = ', selModel?.code, index)
    const gameCode = selModel?.code
    const groupAlias = selModel?.playGroups?.alias

    switch (true) {
      case gameType == LCode.ofclvn_hochiminhvip || gameType == LCode.ofclvn_haboivip: // 越南彩
        playNameArray.push({
          playName1: groupAlias,
          vieName: selModel?.plays?.map((play) => play?.name),
          exFlag: '0',
        } as PlayNameArray)
        break

      case gameCode == LhcCode.LX: //连肖
      case gameCode == LhcCode.LW: //连尾
        selModel?.plays?.map((playData) => {
          playNameArray.push({
            playName1: groupAlias,
            playName2: playData?.alias,
            exFlag: playDataUniqueId(playData),
          } as PlayNameArray)
        })

        break

      case gameCode == LhcCode.HX://合肖
        const zodiacX = zodiacPlayX(selModel)
        playNameArray.push({
          playName1: zodiacX?.alias,
          playName2: selModel?.zodiacs?.map((item) => item?.name)?.toString(),
          exFlag: playDataUniqueId(zodiacX),
        } as PlayNameArray)
        break

      case gameCode == LhcCode.LMA:  //连码
      case gameCode == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选120': //五星里的组选120
      case gameCode == Pk10Code.GFWF && gameType == LCode.pk10 && singleTabIndex == SingleOption.SINGLE: //官方玩法 单式
      case gameCode == FC3d.DWD && gameType == LCode.fc3d && (groupAlias == '组选3复式' || groupAlias == '组选6' || groupAlias == '组选6复式'): //福彩3D 组选3 组选6 组选6复式
        const play0 = selModel?.plays[0]

        playNameArray.push({
          playName1: groupAlias,
          playName2: combineArrayName(selModel).toString(),
          exFlag: playDataUniqueId(play0),
        } as PlayNameArray)
        break

      case gameCode == LhcCode.ZXBZ:  //自选不中
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
  const gameType = UGStore.globalProps?.playOddDetailData?.game?.gameType //彩种类别，六合彩 秒秒彩
  const singleTabIndex = UGStore.globalProps?.singleTabIndex //当前的彩种处于TAB的单式还是复式

  const betBeanArray: Array<BetLotteryData> = [] //下注数据
  combinationData?.map((selModel) => {
    const gameCode = selModel?.code
    const groupAlias = selModel?.playGroups?.alias

    switch (true) {
      case gameType == LCode.ofclvn_hochiminhvip || gameType == LCode.ofclvn_haboivip: // 越南彩
      {
        if (selModel?.vieSelectFastly) { //快速选择
          const groupPlay0 = selModel?.playGroups?.plays[0]
          const play0 = selModel?.plays[0]
          const nameArr = selModel?.viePlays?.map((itemArr) => itemArr?.map((play) => play?.name))
          const name = nameArr?.join(';') // 00;33

          betBeanArray.push({
            money: inputMoney,
            playId: groupPlay0?.id,
            odds: play0?.odds,//连码可以不传
            playIds: nextIssueData?.id,
            betInfo: name,
            exFlag: playDataUniqueId(play0),
          } as BetLotteryData)

        } else { //普通选择
          const groupPlay0 = selModel?.playGroups?.plays[0]
          const play0 = selModel?.plays[0]
          const nameArr = selModel?.viePlays?.map((itemArr) => itemArr?.map((play) => play?.name).toString())
          const name = nameArr?.join('|') // 0,1,1 | 3,4,5

          betBeanArray.push({
            money: inputMoney,
            playId: groupPlay0?.id,
            odds: play0?.odds,//连码可以不传
            playIds: nextIssueData?.id,
            betInfo: name,
            exFlag: playDataUniqueId(play0),
          } as BetLotteryData)
        }
      }
        break

      case gameCode == LhcCode.LX: //连肖
      case gameCode == LhcCode.LW: //连尾
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

      case gameCode == LhcCode.HX://合肖
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

      case gameCode == LhcCode.LMA:  //连码
      case gameCode == CqsscCode.WX && gameType == LCode.cqssc && groupAlias == '组选120': //五星里的组选120
      case gameCode == Pk10Code.GFWF && gameType == LCode.pk10 && singleTabIndex == SingleOption.SINGLE: //官方玩法 单式
      case gameCode == FC3d.DWD && gameType == LCode.fc3d && (groupAlias == '组选3复式' || groupAlias == '组选6' || groupAlias == '组选6复式'): //福彩3D 组选3 组选6 组选6复式
      {
        const groupPlay0 = selModel?.playGroups?.plays[0]
        const play0 = selModel?.plays[0]
        betBeanArray.push({
          money: inputMoney,
          playId: groupPlay0?.id,
          odds: play0?.odds,//连码可以不传
          playIds: nextIssueData?.id,
          betInfo: combineArrayName(selModel).toString(),
          exFlag: playDataUniqueId(play0),
        } as BetLotteryData)
      }
        break

      case gameCode == LhcCode.ZXBZ:  //自选不中
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

      case gameCode == CqsscCode.YZDW:  //一字定位
      case gameCode == CqsscCode.DWD:  //定位胆
      case gameCode == Pk10Code.GFWF:  //官方玩法
      case gameCode == CqsscCode.EZDW:  //二字定位
      case gameCode == CqsscCode.SZDW:  //三字定位
      case gameCode == FC3d.EZ:  //二字
      case gameCode == FC3d.DWD && gameType == LCode.fc3d:  //福彩3D 定位胆
      case gameCode == LhcCode.ZX && gameType == LCode.gd11x5:  //广东11x5直选
      case gameCode == LhcCode.WX && gameType == LCode.cqssc:  //五星
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
 * @param betCount 下注数量，比如越南彩
 */
const generateBetArray = (nextIssueData?: NextIssueData,
                          activeReturnCoinRatio?: string,
                          inputMoney?: string,
                          selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>,
                          betCount?: number): BetShareModel => {
  const gameType = UGStore.globalProps?.playOddDetailData?.game?.gameType //彩种类别，六合彩 秒秒彩

  const combinationData = combineSelectedData(selectedData)

  if(arrayLength(combinationData) <= 0) return

  const playNameArray = generateBetNameArray(nextIssueData, combinationData)
  const betBeanArray = generateBetInfoArray(nextIssueData, inputMoney, combinationData)

  arrayLength(playNameArray) != arrayLength(betBeanArray) && ugError('警告错误数据 playNameArray与betBeanArray 长度应一致')

  const playModel0 = combinationData[0]
  const groupAlias = playModel0?.playGroups?.alias
  const gameCode = playModel0?.code
  //有的彩种 显示数量和实际数量不一致，需要计算，比如广东11选5里面的前二组选
  let totalNum: string
  switch (true) {
    case gameCode == LhcCode.LMA://连码
      if (groupAlias == '前二组选' || groupAlias == '任选二' || groupAlias == '选二连组') {
        totalNum = arrayLength(combineArray(playModel0?.plays, 2)).toString()
      } else if (groupAlias == '任选三' || groupAlias == '选三前组') {
        totalNum = arrayLength(combineArray(playModel0?.plays, 3)).toString()
      } else if (groupAlias == '任选四') {
        totalNum = arrayLength(combineArray(playModel0?.plays, 4)).toString()
      } else if (groupAlias == '任选五') {
        totalNum = arrayLength(combineArray(playModel0?.plays, 5)).toString()
      } else {
        totalNum = arrayLength(combineArray(playModel0?.plays, 3)).toString()
      }
      break
    case gameCode == FC3d.DWD && gameType == LCode.fc3d: //福彩3D
      if (groupAlias == '组选3复式') {
        totalNum = arrayLength(combineArray(playModel0?.plays, 2, true)).toString()
      } else if (groupAlias == '组选6复式') {
        totalNum = arrayLength(combineArray(playModel0?.plays, 3)).toString()
      }
      break
  }

  const vieSelectFastly = combinationData[0]?.vieSelectFastly
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
    totalNums: totalNum,
    betCount: betCount,
    vieSelectFastly
  } as BetShareModel

  ugLog('下注数据 newData =', JSON.stringify(newData))

  return newData
}

export {
  gatherSelectedItems,
  calculateActualItemCount,
  checkClickCount,
  checkBetCount,
  combineSelectedData,
  generateBetArray,
  filterShareItem,
  prepareSelectedBetData,
  vietnamSelectedCount,
}
