import { PlayGroupData, PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'

/**
 * 将选中的球转换为固定格式存储下来
 *
 * @param playOddData
 * @param selectedBalls
 */
const parseLMASelectedData = (playOddData: PlayOddData, selectedBalls: Array<string>): Array<PlayGroupData> => {
  //选中了哪些球
  const selGroup: Array<PlayGroupData> = []

  playOddData?.pageData?.groupTri?.map((pageData) => {
    const tempGroup: Array<PlayGroupData> = pageData?.map((itemData) => {
      // 优先使用 自定义数组 exPlays
      if (anyEmpty(itemData?.exPlays)) {
        //找出选中的球对应的原始数据
        const selBalls = itemData?.plays?.filter((item) => selectedBalls.includes(item?.id))
        //再用原始数组和彩种数据组合成 新的选中数据
        return anyEmpty(selBalls) ?
          null :
          {
            ...itemData,
            plays: selBalls,
          } as PlayGroupData
      } else {
        //找出选中的球对应的原始数据
        const selBalls = itemData?.exPlays?.filter((item) => selectedBalls.includes(item?.id))
        //再用原始数组和彩种数据组合成 新的选中数据
        return anyEmpty(selBalls) ?
          null :
          {
            ...itemData,
            exPlays: selBalls,
          } as PlayGroupData
      }

    })?.filter((item) => item != null) as Array<PlayGroupData>

    //二维数据变一维数据，比如 选中了 [[两面1，两面2], [色波1，色波2]] 合成 [两面1，两面2, 色波1，色波2]
    !anyEmpty(tempGroup) && selGroup.push(...tempGroup)
  })

  return selGroup
}

export {parseLMASelectedData}
