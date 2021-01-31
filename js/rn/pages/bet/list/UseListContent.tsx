import { useContext, useEffect, useState } from 'react'
import BetLotteryContext from '../BetLotteryContext'
import { ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'
import { DeviceEventEmitter } from 'react-native'
import { ugLog } from '../../../public/tools/UgLog'

/**
 * 彩票内容
 * @constructor
 */
const UseListContent = () => {

  const {
    playOddDetailData, //彩票数据
  } = useContext(BetLotteryContext)

  const [ballSelected, setBallSelected] = useState(false) //是否有数据被选中了

  useEffect(() => {
    const emitterId = DeviceEventEmitter.addListener('select status', (sel?: boolean) => {
      ugLog('selectedBalls boolean = ', sel)
      setBallSelected(s => sel)
    })

    return () => {DeviceEventEmitter.removeSubscription(emitterId)}
  }, [])

  return {
    ballSelected, //彩票数据
    playOddDetailData, //彩票数据
  }
}

export default UseListContent
