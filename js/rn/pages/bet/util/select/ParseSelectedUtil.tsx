import { CqsscCode, LCode, LhcCode } from '../../const/LotteryConst'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { ugLog } from '../../../../public/tools/UgLog'
import { UGStore } from '../../../../redux/store/UGStore'
import { PlayGroupData, PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { Toast } from '../../../../public/tools/ToastUtils'
import { arrayLength } from '../../../../public/tools/Ext'

/**
 * 选中的某个玩法
 * @param columnIndex 左侧栏的索引，比如 特码，二字定位
 */
const xPlayOddData = (columnIndex?: number): PlayOddData => UGStore.globalProps?.playOddDetailData.playOdds[columnIndex]

//当前选中的彩种数据 特码 两面 等
const currentPlayOddData = (): PlayOddData => xPlayOddData(UGStore.globalProps?.currentColumnIndex)

//某一个TAB页界面界面
const tabGroupData = (tabIndex?: number): Array<PlayGroupData> =>
  tabIndex < arrayLength(currentPlayOddData()?.pageData?.groupTri)
    ?
    currentPlayOddData()?.pageData?.groupTri[tabIndex]
    :
    []

//当前TAB页界面界面
const currentTabGroupData = (): Array<PlayGroupData> => tabGroupData(UGStore.globalProps?.lotteryTabIndex)

/**
 * 展开选中的数据为一维数据
 * @param selectedData
 */
const expandSelectedData = (selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Array<SelectedPlayModel> => {
  const flatArr: Array<SelectedPlayModel> = Object.values(selectedData).map((data) => Object.values(data)?.map((data2) => Object.values(data2))).flat(Infinity)
  ugLog('expandSelectedData = ', JSON.stringify(flatArr))
  return flatArr
}

/**
 * 彩种计算组合的单位长度，部分彩种需要，比如<二连尾> limitCount=2 表示2个数据为1组进行组合计算，4个数据就有6种组合: [1,2,3,4] -> [1,2],[1,3],[1,4],[2,3],[2,6],[3,4]
 * @param code 特码 二字定位 等等
 * @param tabAlias TAB的名字，如 连肖里的 二连肖 三连肖
 */
const calculateLimitCount = (code?: string, tabAlias?: string): number => {
  const gameType = UGStore.globalProps?.playOddDetailData?.game?.gameType //彩种类别，六合彩 秒秒彩

  let limitCount = -1 //当前彩种的数量限制，如 三连肖 要求选择3个数据为一组
  switch (true) {
    case code == LhcCode.LX: //连肖
      switch (tabAlias) {
        case '二连肖':
          limitCount = 2
          break
        case '三连肖':
          limitCount = 3
          break
        case '四连肖':
          limitCount = 4
          break
        case '五连肖':
          limitCount = 5
          break
      }
      break
    case code == LhcCode.LW: //连尾
      switch (tabAlias) {
        case '二连尾':
          limitCount = 2
          break
        case '三连尾':
          limitCount = 3
          break
        case '四连尾':
          limitCount = 4
          break
        case '五连尾':
          limitCount = 5
          break

      }
      break

    default:
      limitCount = 1
      break
  }

  return limitCount

}

export {
  calculateLimitCount,
  expandSelectedData,
  currentPlayOddData,
  currentTabGroupData,
  xPlayOddData,
  tabGroupData,
}


