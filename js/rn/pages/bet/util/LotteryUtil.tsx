import { anyEmpty, arrayLength } from '../../../public/tools/Ext'
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

interface INameOrAlias {
  name?: string; //鼠
  alias?: string;//鼠
}

/**
 * 根据名字或别名找出生肖
 * @param num
 * @param item
 */
const findZodiacByName = (num?: ZodiacNum[], item?: INameOrAlias): ZodiacNum =>
  num?.find((zodiac) => ((!anyEmpty(item?.name) && zodiac?.name == item?.name)
    || (!anyEmpty(item?.alias) && zodiac?.alias == item?.alias)))

export {
  findZodiacByName,
}
