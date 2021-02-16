import * as React from 'react'
import { useEffect, useState } from 'react'
import { anyEmpty, arrayLength, equalObject } from '../../../../../public/tools/Ext'
import UseLotteryHelper from '../../assist/UseLotteryHelper'
import { PlayData, PlayOddData } from '../../../../../public/network/Model/lottery/PlayOddDetailModel'
import { UGStore } from '../../../../../redux/store/UGStore'
import { parseInputArray } from '../../../util/LotteryUtil'
import { usePrevious } from '../../../util/usePrevious'

/**
 * 五星
 * @constructor
 */
const UseCqsscWX = () => {

  const [wxInputNumber, setWxInputNumber] = useState<string>(null) //输入的单式五星玩法

  const {
    tabIndex,
    setTabIndex,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    // curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addAndRemoveBallList,
    addOrRemoveBall,
    currentPageData,
  } = UseLotteryHelper()

  /**
   * 输入的单式五星玩法有变化
   */
  useEffect(() => {
    const wxInputArr = parseInputArray(wxInputNumber, [' ', ',', '，', '\n'], 5)

    if (arrayLength(wxInputArr) > 0) {
      addAndRemoveBallList(wxInputArr?.map((item, index) => {
        const name = item.split('').toString()
        return {
          exId: item + ',' + index,
          alias: name,
          name: name,
        } as PlayData
      }), selectedBalls)
    } else {
      addAndRemoveBallList(null, selectedBalls)
    }

  }, [wxInputNumber])

  return {
    setPlayOddData,
    tabIndex,
    setTabIndex,
    selectedBalls,
    setSelectedBalls,
    wxInputNumber,
    setWxInputNumber,
    addOrRemoveBall,
    currentPageData,
  }
}

export default UseCqsscWX

