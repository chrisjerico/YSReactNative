import { PlayData, PlayGroupData, PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
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
const parseLMASelectedData = (playOddData: PlayOddData, selectedBalls: Array<string>): Map<string, Map<string, Array<SelectedPlayModel>>> => {
  //选中了哪些球, 3层结构
  const selGroup = new Map<string, Map<string, Array<SelectedPlayModel>>>()//重新组合的新数据如 特码TM -> 对应的数据

  // ugLog('playOddData?.pageData?.groupTri = ', JSON.stringify(playOddData?.pageData?.groupTri))

  //遍历每一TAB的数据 如 特码B和特码A
  playOddData?.pageData?.groupTri?.map((pageData, index) => {
    // ugLog('pageData = ', JSON.stringify(pageData))

    const tabMap = new Map<string, Array<SelectedPlayModel>>() //每一个TAB的数组 如 特码B TMB -> 对应的数据
    selGroup[pageData[0].alias] = tabMap

    ugLog('tabMap code index = ', pageData[0].alias, index)

    //遍历TAB的每一组数据，如特码B里面有 特码数据，两面数据，色波数据
    pageData?.map((groupData) => {
      const pageArr = new Array<SelectedPlayModel>() //每一组数据，如 特码B里面的 两面, 色波
      tabMap[groupData?.code] = pageArr //取第一组数据的ID作为Tab标识

      // // 优先使用 自定义数组 exPlays
      // if (!anyEmpty(groupData?.exPlays)) {
      //
      //   return anyEmpty(selBalls) ?
      //     null :
      //     {
      //       ...groupData,
      //       exPlays: selBalls,
      //     } as PlayGroupData
      //
      // } else {
      //
      //   return anyEmpty(selBalls) ?
      //     null :
      //     {
      //       ...groupData,
      //       plays: selBalls,
      //     } as PlayGroupData
      // }

      //找出选中的球对应的原始数据, 优先使用 自定义数组 exPlays
      const selBalls = !anyEmpty(groupData?.exPlays) ?
        groupData?.exPlays?.filter((item) => selectedBalls.includes(item?.id)) :
        groupData?.plays?.filter((item) => selectedBalls.includes(item?.id))

      // ugLog('selBalls = ', groupData.code, JSON.stringify(selBalls))

      //再用原始数组和彩种数据组合成 新的选中数据
      !anyEmpty(selBalls) && pageArr.push({
        playGroups: groupData,
        plays: selBalls
      } as SelectedPlayModel)

      // ugLog('pageArr = ', groupData.code, JSON.stringify(pageArr))

    })

    // //二维数据变一维数据，比如 选中了 [[两面1，两面2], [色波1，色波2]] 合成 [两面1，两面2, 色波1，色波2]
    // !anyEmpty(tempGroup) && selGroup.push(...tempGroup)
  })

  return selGroup
}

export {parseLMASelectedData}
