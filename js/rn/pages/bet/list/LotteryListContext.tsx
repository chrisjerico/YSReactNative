import React from 'react'
import { PlayOddData } from '../../../public/network/Model/lottery/PlayOddDetailModel'

interface ILotteryListContext {
  // lotteryCode?: () => string //当前的 玩法 ID 特码 连码 等等
  playOddData?: () => PlayOddData // 当前的彩票信息 特码 连码 等等
}

const LotteryListContext = React.createContext<ILotteryListContext>({})

export default LotteryListContext
