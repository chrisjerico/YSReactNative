import * as React from 'react'
import { useEffect } from 'react'
import { anyEmpty } from '../../../../public/tools/Ext'
import UseLotteryHelper from '../../util/UseLotteryHelper'
import { PlayOddData } from '../../../../public/network/Model/lottery/PlayOddDetailModel'

/**
 * 色波, 两面, 正码1-6, 总肖, 五行
 * @constructor
 */
const UseLhcSB = () => {

  const {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    playOddData,
    setPlayOddData,
    playOddDetailData,
    // curPlayOddData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
  } = UseLotteryHelper()

  useEffect(() => {
    !anyEmpty(pageData) && setCurData(pageData[tabIndex])
  }, [tabIndex, pageData])

  /**
   * 更新数据
   * @param playOddData
   */
  const updatePlayOddData = (playOddData?: PlayOddData) => {
    setPlayOddData(playOddData)
    !anyEmpty(playOddData?.playGroups) && setPageData([playOddData?.playGroups])
  }

  return {
    tabIndex,
    setTabIndex,
    curData,
    setCurData,
    pageData,
    setPageData,
    selectedBalls,
    setSelectedBalls,
    addOrRemoveBall,
    updatePlayOddData,
  }
}

export default UseLhcSB

