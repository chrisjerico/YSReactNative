import { useContext } from 'react'
import BetLotteryContext from '../BetLotteryContext'

/**
 * 彩票内容
 * @constructor
 */
const UseListContent = () => {

  const {
    lotteryCode,
    playOddDetailData, //彩票数据
  } = useContext(BetLotteryContext)

  return {
    lotteryCode, //彩票id
    playOddDetailData, //彩票数据
  }
}

export default UseListContent
