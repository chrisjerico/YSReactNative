import { useContext, useEffect, useMemo, useState } from 'react'
import { ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { DeviceEventEmitter } from 'react-native'
import { ugLog } from '../../../public/tools/UgLog'
import { filterSelectedData } from '../util/LotteryUtil'
import { UGStore } from '../../../redux/store/UGStore'

/**
 * 彩票内容
 * @constructor
 */
const UseListContent = () => {

  const playOddDetailData = UGStore.globalProps?.playOddDetailData//彩票数据

  //各彩种选中的数量
  const ballSelected = useMemo(() => {
    return filterSelectedData(UGStore.globalProps?.selectedLotteryModel?.selectedData)
  }, [UGStore.globalProps?.selectedLotteryModel?.selectedData])

  return {
    ballSelected, //彩票数据
    playOddDetailData, //彩票数据
  }
}

export default UseListContent
