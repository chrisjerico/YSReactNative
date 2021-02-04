import { PlayGroupData, PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { ugLog } from '../../../../public/tools/UgLog'

/**
 * 将选中的球转换为固定格式存储下来
 *
 * 存储格式对应 SelectedLotteryModel
 *
 * @param playOddData
 * @param selectedBalls
 */
const parseHXSelectedData = (playOddData: PlayOddData,
                             selectedBalls: Array<string>): Map<string, Map<string, SelectedPlayModel>> => {

  //选中了哪些球, 3层结构
  const selGroup = new Map<string, Map<string, SelectedPlayModel>>()//重新组合的新数据如 特码TM -> 对应的数据

  //遍历每一TAB的数据 如 特码B和特码A
  playOddData?.pageData?.groupTri?.map((pageData, index) => {
    const tabMap = new Map<string, SelectedPlayModel>() //每一个TAB的数组 如 特码B TMB -> 对应的数据
    selGroup[pageData[0].alias] = tabMap

    ugLog('tabMap code index = ', pageData[0].alias, index)

    //遍历TAB的每一组数据，如特码B里面有 特码数据，两面数据，色波数据
    pageData?.map((groupData) => {

      //找出选中的球对应的原始数据
      const selZodiac = playOddData?.pageData?.zodiacNums?.filter((zodiac) => selectedBalls.includes(zodiac?.id))

      //再用原始数组和彩种数据组合成 新的选中数据
      !anyEmpty(selZodiac) && (
        tabMap[groupData?.code] = {
          playGroups: groupData,
          zodiacs: selZodiac,
          code: playOddData?.code,
        } as SelectedPlayModel //key=取第一组数据的ID作为Tab标识, value=每一组数据，如 特码B里面的 两面, 色波
      )

    })

  })

  return selGroup
}

export { parseHXSelectedData }
