import { useContext, useEffect, useMemo, useState } from 'react'
import { ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { DeviceEventEmitter } from 'react-native'
import { ugLog } from '../../../public/tools/UgLog'
import { filterSelectedData, specialPlay, usePrevious } from '../util/LotteryUtil'
import { UGStore } from '../../../redux/store/UGStore'
import { SelectedPlayModel } from '../../../redux/model/game/SelectedLotteryModel'
import { currentPlayOddData, tabGroupData, xPlayOddData } from '../util/select/ParseSelectedUtil'

/**
 * 彩票内容
 * @constructor
 */
const UseLotteryContent = () => {

  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据
  const [leftColumnIndex, setLeftColumnIndex] = useState(0) // 左边大类选择了哪个，特码 正码 双面
  const preLeftColumnIndex = usePrevious(leftColumnIndex) //之前的索引值

  useEffect(() => {
    const playOddsData = xPlayOddData(leftColumnIndex) //当前的玩法
    const prePlayOddsData = xPlayOddData(preLeftColumnIndex) //前一次选中的玩法
    //特殊玩法不能和普通玩法混合选择
    if (specialPlay(playOddDetailData?.lotteryLimit?.gameType, playOddsData?.pageData?.groupTri)
      || specialPlay(playOddDetailData?.lotteryLimit?.gameType, prePlayOddsData?.pageData?.groupTri)) {
      UGStore.dispatch({
        type: 'reset',
        selectedData: new Map<string, Map<string, Map<string, SelectedPlayModel>>>(),
        currentColumnIndex: leftColumnIndex,
        inputMoney: 0,
      })
    } else {
      UGStore.dispatch({
        type: 'reset',
        currentColumnIndex: leftColumnIndex,
        inputMoney: 0,
      })
    }
  }, [leftColumnIndex])

  //各彩种选中的数量
  const ballSelected = useMemo(() => {
    return filterSelectedData(UGStore.globalProps?.selectedData)
  }, [UGStore.globalProps?.selectedData])

  return {
    leftColumnIndex,
    setLeftColumnIndex,
    ballSelected, //彩票数据
    playOddDetailData, //彩票数据
  }
}

export default UseLotteryContent
