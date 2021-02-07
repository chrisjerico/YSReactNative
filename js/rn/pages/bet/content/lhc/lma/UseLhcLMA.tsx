import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty, arrayLength } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../hp/UseLotteryHelper'
import { PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { ILotteryEBallItem } from '../../../widget/LotteryEBall'


/**
 * 六合彩连码
 * @constructor
 */
const UseLhcLMA = () => {

  const {
    tabIndex,
    setTabIndex,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    selectedBalls,
    setSelectedBalls,
    currentPageData,
    addOrRemoveBall,
    zodiacBallIds,
  } = UseLotteryHelper()

  return {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    currentPageData,
    addOrRemoveBall,
  }
}

export default UseLhcLMA

