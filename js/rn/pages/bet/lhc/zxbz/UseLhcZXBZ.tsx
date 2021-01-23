import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../hp/UseLotteryHelper'
import { PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ILotteryEBallItem } from '../../widget/LotteryEBall'


/**
 * 六合彩 自选不中
 * @constructor
 */
const UseLhcZXBZ = () => {

  const {
    tabIndex,
    setTabIndex,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    // curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    zodiacBallIds,
    currentPageData,
  } = UseLotteryHelper()

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

export default UseLhcZXBZ

