import React from 'react'
import { NextIssueData } from '../../public/network/Model/lottery/NextIssueModel'
import { PlayOddData, PlayOddDetailData } from '../../public/network/Model/lottery/PlayOddDetailModel'

interface IBetLotteryContext {
  lotteryId?: () => string //当前 彩票ID，香港六合彩 幸运飞艇 等等
  playOddDetailData?: () => PlayOddDetailData //彩票数据
}

const BetLotteryContext = React.createContext<IBetLotteryContext>({})

export default BetLotteryContext
