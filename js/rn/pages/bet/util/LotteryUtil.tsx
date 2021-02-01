import { anyEmpty, arrayLength, dicNull } from '../../../public/tools/Ext'
import {
  PagePlayOddData,
  PlayGroupData,
  PlayOddData,
  PlayOddDetailData,
  ZodiacNum,
} from '../../../public/network/Model/lottery/PlayOddDetailModel'
import LotteryConst from '../const/LotteryConst'
import LhcHXComponent from '../lhc/hx/LhcHXComponent'
import LhcZXBZComponent from '../lhc/zxbz/LhcZXBZComponent'
import * as React from 'react'
import LotteryData from '../const/LotteryData'
import { ugLog } from '../../../public/tools/UgLog'
import parseTMData from './ps/ParseTMDataUtil'
import parseHXData from './ps/ParseHXDataUtil'
import parseZTData from './ps/ParseZTDataUtil'
import parseLMAData from './ps/ParseLMADataUtil'
import parseSBData from './ps/ParseSBDataUtil'
import parsePTYXData from './ps/ParsePTYXDataUtil'
import parseWSData from './ps/ParseWSDataUtil'
import parseLXData from './ps/ParseLXDataUtil'
import parseLWData from './ps/ParseLWDataUtil'
import parseZXBZData from './ps/ParseZXBZDataUtil'
import { SelectedPlayModel } from '../../../redux/model/game/SelectedLotteryModel'
import { UGStore } from '../../../redux/store/UGStore'

interface INameOrAlias {
  name?: string; //鼠
  alias?: string;//鼠
}

/**
 * 退出的时候清除彩票数据
 */
const clearLotteryData = () => {
  UGStore.dispatch({ type: 'reset', lotteryId: '-1' })
  UGStore.dispatch({ type: 'reset', currentPlayOddData: {} })
  UGStore.dispatch({ type: 'reset', nextIssueData: {} })
  UGStore.dispatch({ type: 'reset', playOddDetailData: {} })
  UGStore.dispatch({ type: 'reset', selectedLotteryModel: {} })
}

/**
 * 根据名字或别名找出生肖
 * @param num
 * @param item
 */
const findZodiacByName = (num?: ZodiacNum[], item?: INameOrAlias): ZodiacNum =>
  num?.find((zodiac) => ((!anyEmpty(item?.name) && zodiac?.name == item?.name)
    || (!anyEmpty(item?.alias) && zodiac?.alias == item?.alias)))

/**
 * 各彩种选中的数量
 * @param selectedData
 */
const filterSelectedData = (selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Map<string, number> => {
  const map = new Map<string, number>()

  if (!dicNull(selectedData)) {
    for (let key1 of Object.keys(selectedData)) {
      let count = 0
      for (let value2 of Object.values(selectedData[key1])) {
        for (let value3 of Object.values(value2)) {
          count += arrayLength(value3?.zodiacs) + arrayLength(value3?.plays)
        }
      }
      map[key1] = count
    }
  }

  ugLog('filterSelectedData map = ', JSON.stringify(map))

  return map
}

export {
  findZodiacByName,
  filterSelectedData,
  clearLotteryData,
}
