import { anyEmpty, arrayLength, dicNull } from '../../../public/tools/Ext'
import { PlayData, ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import * as React from 'react'
import { ugLog } from '../../../public/tools/UgLog'
import { SelectedPlayModel } from '../../../redux/model/game/SelectedLotteryModel'
import { UGStore } from '../../../redux/store/UGStore'
import { GameTab, HcmTabOption, SingleOption } from '../const/LotteryConst'

interface INameOrAlias {
  name?: string; //鼠
  alias?: string;//鼠
}

/**
 *
 * 是不理 特殊玩法
 * @param lotteryId 六合彩，秒秒彩 等等
 * @param pageData 这个玩法的数据，比如二字定位的数据
 */
const specialPlay = (lotteryId?: string, pageData?: Array<Array<any>>): boolean => {
  //整个六合彩都是特殊玩法, 有多页数据的，比如二字定位有多页多个TAB，也是特殊玩法
  return lotteryId == 'lhc'
    || arrayLength(pageData) > 1

}

/**
 * 根据数据生成唯一识别ID
 * @param play
 */
const playDataUniqueId = (play?: PlayData): string => (
  `${play?.exId},${play?.id},${play?.name},${play?.alias}`
)

/**
 * 赔率串联成名字
 * @param plays
 */
const combineOddsName = (plays?: Array<PlayData>): string => {
  if (arrayLength(plays) > 0) {
    return plays?.map((item) => item?.odds)?.join('/')
  }

  return null
}

/**
 * 退出的时候清除彩票数据
 */
const clearLotteryData = () => {
  ugLog('退出的时候清除彩票数据')
  UGStore.dispatch({
    type: 'reset',
    lotteryId: '0',
    lotteryTabIndex: 0,
    singleTabIndex: null,
    fastTabIndex: null,
    gameTabIndex: GameTab.LOTTERY,
    currentColumnIndex: 0,
    betShareModel: {},
    nextIssueData: {},
    playOddDetailData: {},
    chatRoomIndex: 0,
    chatRoomData: {},
    chatArray: [],
    shareChatModel: {},
    inputMoney: 0,
    betCount: 0,
    sliderValue: 0,
    selectedData: new Map<string, Map<string, Map<string, SelectedPlayModel>>>(),
  })
}


/**
 * 按照某个字符切割字符串成数组
 *
 * @param orgString
 * @param len 只提取len长度的字符串
 */
const parseInputArray = (orgString?: string, len?: number): Array<string> => {
  if (anyEmpty(orgString)) return null
  let wxInputArr = orgString?.split(/[,，;；_ \n]/)

  if (len > 0) {
    wxInputArr = wxInputArr?.filter((item) => item?.length == len) //过滤长度不正确的
  }

  return wxInputArr
}

/**
 * 根据名字或别名找出生肖
 * @param num
 * @param item
 */
const findZodiacByName = (num?: ZodiacNum[], item?: INameOrAlias): ZodiacNum => (
  num?.find((zodiac) => ((!anyEmpty(item?.name) && zodiac?.name == item?.name)
    || (!anyEmpty(item?.alias) && zodiac?.alias == item?.alias)))
)

/**
 * 各彩种选中的数量, 比如特码选中了多少条数据，结构 TM -> 8 条
 * @param selectedData
 */
const filterSelectedDataCount = (selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Map<string, number> => {
  const map = new Map<string, number>()

  if (!dicNull(selectedData)) {
    for (let [key1, value1] of Object.entries(selectedData)) {
      let count = 0
      for (let [key2, value2] of Object.entries(value1)) {
        for (let [key3, value3] of Object.entries(value2)) {
          count += arrayLength(value3?.zodiacs) + arrayLength(value3?.plays)
        }
      }
      map[key1] = count
    }
  }

  ugLog('filterSelectedData map = ', JSON.stringify(map))

  return map
}

/**
 * 过滤出某个类别选中的数量
 * @param subAlias 需要计算的彩种子类别，比如五星玩法 -> 二重号
 * @param selectedBalls 已经选中的球
 */
const subCountOfSelectedBalls = (subAlias?: string, selectedBalls?: Array<PlayData | ZodiacNum>) => (
  arrayLength(selectedBalls?.filter((item) => item?.alias == subAlias))
)

/**
 * 各彩种选中的数量，比如 二字定位 下面的 子类 选中了多少条，结构
 * {
 *   万千 -> 5条
 *   千十 -> 3条
 * }
 * @param code 大类ID，如 二字定位 特码
 * @param alias 小类标题，如 二字定位下面的 万定位
 * @param selectedData
 */
const filterSelectedSubCount = (code?: string, alias?: string, selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): number => {

  if (!dicNull(selectedData)) {
    for (let key1 of Object.keys(selectedData)) {
      for (let value2 of Object.values(selectedData[key1])) {// 如 二字定位的 万千、万百、百十
        for (let value3 of Object.values(value2)) {// 万定位 千定位
          const sel: SelectedPlayModel = value3
          if (code == sel?.code && !anyEmpty(sel?.plays) && (sel?.plays[0]?.alias == alias || sel?.playGroups?.alias == alias)) {
            return arrayLength(sel?.zodiacs) + arrayLength(sel?.plays)
          }
        }
      }
    }
  }

  return 0
}

/**
 *
 * 过滤出某个彩种的数据
 *
 * @param code 大类ID，如 二字定位 特码
 * @param alias 小类标题，如 二字定位下面的 万定位
 * @param selectedData
 */
const filterSelectedSubMap = (code?: string, alias?: string, selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Map<string, SelectedPlayModel> => {

  if (!dicNull(selectedData) && selectedData[code]) {
    return selectedData[code][alias]
  }

  return new Map<string, SelectedPlayModel>()
}

export {
  findZodiacByName,
  filterSelectedDataCount,
  filterSelectedSubCount,
  clearLotteryData,
  combineOddsName,
  playDataUniqueId,
  specialPlay,
  parseInputArray,
  subCountOfSelectedBalls,
  filterSelectedSubMap,

}
