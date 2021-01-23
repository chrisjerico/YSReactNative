import * as React from 'react'
import { useEffect, useState } from 'react'
import { PlayOddData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../hp/UseLotteryHelper'
import LotteryConst from '../../const/LotteryConst'
import LotteryData from '../../const/LotteryData'

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

