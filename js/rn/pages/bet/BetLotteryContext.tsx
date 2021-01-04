import React from 'react'
import { NextIssueData } from '../../public/network/Model/lottery/NextIssueModel'
import { PlayOddData, PlayOddDetailData } from '../../public/network/Model/lottery/PlayOddDetailModel'

interface IBetLotteryContext {
  nextIssueData?: () => NextIssueData //下一期数据
  playOddDetailData?: () => PlayOddDetailData //彩票数据
  playOddData?: () => PlayOddData //当前 彩票彩种数据，特码，双面
}

const BetLotteryContext = React.createContext<IBetLotteryContext>({})

export default BetLotteryContext
