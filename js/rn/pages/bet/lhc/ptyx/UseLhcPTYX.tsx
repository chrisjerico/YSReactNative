import * as React from 'react'
import { useState } from 'react'
import { ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import UseLotteryHelper from '../hp/UseLotteryHelper'

/**
 * 六合彩 平特一肖, 平特尾数, 头尾数, 特肖 等等
 * @constructor
 */
const UseLhcPTYX = () => {

  const {
    tabIndex,
    setTabIndex,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    currentPageData,
  } = UseLotteryHelper()

  const [zodiacData, setZodiacData] = useState<Array<ZodiacNum>>([]) //选中了生肖数据

  return {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    currentPageData,
  }
}

export default UseLhcPTYX

