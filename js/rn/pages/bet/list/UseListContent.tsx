import { useContext } from 'react'
import BetLotteryContext from '../BetLotteryContext'

/**
 * 彩票内容
 * @constructor
 */
const UseListContent = () => {

  const {
    playOddDetailData, //彩票数据
  } = useContext(BetLotteryContext)

  return {
    playOddDetailData, //彩票数据
  }
}

export default UseListContent
