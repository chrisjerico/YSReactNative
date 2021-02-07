import { useContext, useEffect, useMemo, useState } from 'react'
import { ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { DeviceEventEmitter } from 'react-native'
import { ugLog } from '../../../public/tools/UgLog'
import { filterSelectedData } from '../util/LotteryUtil'
import { UGStore } from '../../../redux/store/UGStore'
import { SelectedPlayModel } from '../../../redux/model/game/SelectedLotteryModel'

/**
 * 彩票内容
 * @constructor
 */
const UseLotteryContent = () => {

  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据
  const [leftColumnIndex, setLeftColumnIndex] = useState(0) // 左边大类选择了哪个，特码 正码 双面

  useEffect(() => {
    UGStore.dispatch({
      type: 'reset', selectedData: new Map<string, Map<string, Map<string, SelectedPlayModel>>>(),
      currentColumnIndex: leftColumnIndex,
      inputMoney: 0,
    })
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
