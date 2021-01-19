import { useContext } from 'react'
import BetLotteryContext from '../BetLotteryContext'

/**
 * 彩票内容
 * @constructor
 */
const UseListContent = () => {

  const {
    nextIssueData, // 下一期数据
    playOddDetailData, //彩票数据
    // curPlayOddData, //当前选中的，特码 连码 等等
  } = useContext(BetLotteryContext)

  return {
    nextIssueData, // 下一期数据
    playOddDetailData, //彩票数据
    // curPlayOddData, //当前选中的，特码 连码 等等
  }
}

export default UseListContent
