import { PlayGroupData, PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'

/**
 * 将选中的球转换为固定格式存储下来
 *
 * @param playOddData
 * @param selectedBalls
 */
const parseHXSelectedData = (playOddData: PlayOddData,
                             selectedBalls: Array<string>): Array<PlayGroupData> => {
  //选中了哪些球
  const selGroup: Array<PlayGroupData> = []
  const selZodiac = playOddData?.pageData?.zodiacNums?.filter(
    (zodiac) => selectedBalls.includes(zodiac?.id),
  )

  if (!anyEmpty(selZodiac)) {
    //合肖只有一组数据
    selGroup.push({
      ...playOddData?.pageData?.groupTri[0][0],
      exZodiacs: selZodiac,
    } as PlayGroupData)

  }

  return selGroup
}

export { parseHXSelectedData }
