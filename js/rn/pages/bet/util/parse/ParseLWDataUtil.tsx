import {
  PagePlayOddData,
  PlayGroupData,
  PlayOddData,
  ZodiacNum,
} from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, arrayLength } from '../../../../public/tools/Ext'
import { combinePlayAndZodiac } from './ParseLotteryUtil'

interface ITMData {
  playOddData?: PlayOddData
  zodiacNum?: ZodiacNum[]
}

/**
 * 解析连尾等数据
 * @param playOddData
 * @param zodiacNum
 */
const parseLWData = ({ playOddData, zodiacNum }: ITMData): PlayOddData => {
  if(anyEmpty(playOddData?.playGroups)) return playOddData

  //连尾数据缺少一个 尾，补上
  const newGroup = playOddData?.playGroups?.map((item) => ({
    ...item,
    plays: item?.plays?.map((item) => ({
        ...item,
        alias: item?.alias + '尾',
      }
    )),
  }))
  const lwGroup = combinePlayAndZodiac({
    zodiacNums: zodiacNum,
    playOddData: { ...playOddData, playGroups: newGroup },
  })
  return {
    ...playOddData,
    pageData: {
      groupTri: lwGroup?.map((item) => [item]),
    } as PagePlayOddData,
  }
}

export default parseLWData
