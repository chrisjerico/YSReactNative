import { PlayData, PlayGroupData, PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { ugLog } from '../../../../public/tools/UgLog'
import { CqsscCode, LhcCode } from '../../const/LotteryConst'
import { filterSelectedData, filterSelectedSubData } from '../LotteryUtil'
import { Toast } from '../../../../public/tools/ToastUtils'
import { calculateLimitCount } from './ParseSelectedUtil'

/**
 * 将选中的球转换为固定格式存储下来
 *
 * 存储格式对应 UGStore.selectedData
 *
 * @param playOddData
 * @param selectedBalls
 */
const parseLMASelectedData = (playOddData: PlayOddData, selectedBalls: Array<string>): Map<string, Map<string, SelectedPlayModel>> => {
  //选中了哪些球, 3层结构
  const selGroup = new Map<string, Map<string, SelectedPlayModel>>()//重新组合的新数据如 特码TM -> 对应的数据

  ugLog(' playOddData ======== ', JSON.stringify(playOddData))
  //遍历每一TAB的数据 如 特码B和特码A
  playOddData?.pageData?.groupTri?.map((pageData, index) => {
    const tabMap = new Map<string, SelectedPlayModel>() //每一个TAB的数组 如 特码B TMB -> 对应的数据
    selGroup[pageData[0].alias] = tabMap

    ugLog('tabMap code index = ', pageData[0].alias, index)

    //遍历TAB的每一组数据，如特码B里面有 特码数据，两面数据，色波数据
    pageData?.map((groupData, index) => {

      //找出选中的球对应的原始数据, 优先使用 自定义数组 exPlays
      const selBalls = !anyEmpty(groupData?.exPlays) ?
        groupData?.exPlays?.filter((item) => selectedBalls.includes(item?.exId ?? item?.id)) :
        groupData?.plays?.filter((item) => selectedBalls.includes(item?.exId ?? item?.id))

      const pageAlias = `${groupData?.alias},${index}` //当前页的唯一识别
      ugLog('pageAlias = ', pageAlias)

      let limitCount = calculateLimitCount(playOddData?.code, groupData?.alias)

      //再用原始数组和彩种数据组合成 新的选中数据
      !anyEmpty(selBalls) && (
        tabMap[pageAlias] = {
          playGroups: groupData,
          plays: selBalls,
          code: playOddData?.code,
          limitCount: limitCount,
        } as SelectedPlayModel //key=取第一组数据的ID作为Tab标识, value=每一组数据，如 特码B里面的 两面, 色波
      )

    })

    // //二维数据变一维数据，比如 选中了 [[两面1，两面2], [色波1，色波2]] 合成 [两面1，两面2, 色波1，色波2]
    // !anyEmpty(tempGroup) && selGroup.push(...tempGroup)
  })

  return selGroup
}

export { parseLMASelectedData }